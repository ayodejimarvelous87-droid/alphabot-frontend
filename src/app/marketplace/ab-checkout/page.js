"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API = "https://api.alphabothq.com";

const formatMoney = (value) =>
  `₦${Number(value || 0).toLocaleString("en-NG")}`;

const getRateCards = (shipping) => {
  const data = shipping?.data || shipping || {};

  const candidates = [
    data?.rates,
    data?.rate_cards,
    data?.rateCards,
    data?.couriers,
    data?.available_rates,
    data?.availableRates,
    data?.shipping_rates,
    data?.shippingRates,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length) {
      return candidate;
    }
  }

  return Array.isArray(data) ? data : [];
};

const getRateValue = (rate, keys) => {
  for (const key of keys) {
    const value = rate?.[key];

    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      Number.isFinite(Number(value))
    ) {
      return Number(value);
    }
  }

  return 0;
};

const getCourierId = (rate) =>
  rate?.courier_id ??
  rate?.courierId ??
  rate?.courier?.id ??
  rate?.courier?.courier_id ??
  null;

const getServiceCode = (rate) =>
  rate?.service_code ??
  rate?.serviceCode ??
  rate?.service?.code ??
  null;

const getCourierName = (rate) =>
  rate?.courier_name ||
  rate?.courierName ||
  rate?.courier?.name ||
  rate?.courier?.courier_name ||
  "Courier";

const getServiceName = (rate) =>
  rate?.service_type ||
  rate?.serviceType ||
  rate?.service_name ||
  rate?.serviceName ||
  rate?.service?.name ||
  "Delivery service";

const getShippingAmount = (rate) =>
  getRateValue(rate, [
    "rate_card_amount",
    "rateCardAmount",
    "amount",
    "price",
    "shipping_fee",
    "shippingFee",
    "delivery_fee",
    "deliveryFee",
  ]);

const formatDeliveryRange = (estimate) => {
  if (!estimate?.expectedFrom || !estimate?.expectedTo) {
    return null;
  }

  const from = new Date(estimate.expectedFrom);
  const to = new Date(estimate.expectedTo);

  if (
    Number.isNaN(from.getTime()) ||
    Number.isNaN(to.getTime())
  ) {
    return null;
  }

  const sameYear =
    from.getFullYear() === to.getFullYear();

  const options = sameYear
    ? { day: "numeric", month: "long" }
    : { day: "numeric", month: "long", year: "numeric" };

  const fromText = from.toLocaleDateString(
    "en-NG",
    options
  );

  const toText = to.toLocaleDateString(
    "en-NG",
    options
  );

  return fromText === toText
    ? fromText
    : `${fromText} – ${toText}`;
};

export default function ABMarketplaceCheckoutPage() {
  const [cart] = useState(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("alphabotMarketplaceCart") || "[]"
      );

      return Array.isArray(savedCart)
        ? savedCart.filter(
            (item) => item.sourceType === "jumia"
          )
        : [];
    } catch (error) {
      console.error("AB CHECKOUT CART ERROR:", error);
      return [];
    }
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    latitude: "",
    longitude: "",
  });

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const [shippingData, setShippingData] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);


  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
            Number(item.quantity || 1),
        0
      ),
    [cart]
  );

  const deliveryFee = Number(
    selectedCourier?.amount || 0
  );

  const total = subtotal + deliveryFee;

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "address"
        ? {
            city: "",
            state: "",
            postalCode: "",
            latitude: "",
            longitude: "",
          }
        : {}),
    }));

    if (field === "address") {
      setLocationSuggestions([]);
      setShowLocationSuggestions(true);
    }

    setShippingData(null);
    setSelectedCourier(null);
    setShippingError("");
  };

  useEffect(() => {
    const query = String(form.address || "").trim();

    if (query.length < 3) {
      return;
    }

    if (
      form.latitude &&
      form.longitude
    ) {
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLocationLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
          setLocationSuggestions([]);
          return;
        }

        const response = await fetch(
          `${API}/marketplace/ab/address/search?q=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Unable to search locations."
          );
        }

        setLocationSuggestions(
          Array.isArray(data?.suggestions)
            ? data.suggestions
            : []
        );
        setShowLocationSuggestions(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "AB LOCATION SEARCH ERROR:",
            error
          );
          setLocationSuggestions([]);
        }
      } finally {
        setLocationLoading(false);
      }
    }, 450);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [form.address, form.latitude, form.longitude]);

  const selectLocation = (location) => {
    setForm((current) => ({
      ...current,
      address: location.displayName || current.address,
      city: location.address?.city || "",
      state: location.address?.state || "",
      postalCode: location.address?.postalCode || "",
      latitude: String(location.latitude || ""),
      longitude: String(location.longitude || ""),
    }));

    setLocationSuggestions([]);
    setShowLocationSuggestions(false);
    setShippingData(null);
    setSelectedCourier(null);
    setShippingError("");
  };

  const getShippingRates = async () => {
    try {
      setShippingLoading(true);
      setShippingError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in again.");
      }

      const res = await fetch(
        `${API}/marketplace/ab/shipping/quote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cart.map((item) => ({
              productId: item.id,
              quantity: Number(item.quantity || 1),
            })),
            deliveryAddress: {
              name: form.name.trim(),
              phone: form.phone.trim(),
              email: form.email.trim(),
              address: form.address.trim(),
              city: form.city.trim(),
              state: form.state.trim(),
              postalCode: form.postalCode.trim(),
              latitude: form.latitude
                ? Number(form.latitude)
                : null,
              longitude: form.longitude
                ? Number(form.longitude)
                : null,
              country: "NG",
            },
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to calculate combined delivery."
        );
      }

      const rates = Array.isArray(data?.shipping?.couriers)
        ? data.shipping.couriers
        : getRateCards(data.shipping);

      if (!rates.length) {
        throw new Error(
          "No combined delivery options were returned."
        );
      }

      setShippingData({
        receiverAddressCode:
          data.receiverAddressCode ||
          data.shipping?.receiverAddressCode ||
          null,
        pickupAddressCode:
          data.pickupAddressCode ||
          data.shipping?.pickupAddressCode ||
          null,
        products: data.products || [],
        rates,
      });

      setSelectedCourier(null);
    } catch (error) {
      console.error("AB COMBINED SHIPPING ERROR:", error);
      setShippingData(null);
      setSelectedCourier(null);
      setShippingError(
        error.message ||
          "Unable to calculate combined delivery."
      );
    } finally {
      setShippingLoading(false);
    }
  };

  const selectCourier = (rate) => {
    setSelectedCourier({
      courierId: getCourierId(rate),
      serviceCode: getServiceCode(rate),
      courierName: getCourierName(rate),
      serviceType: getServiceName(rate),
      amount: getShippingAmount(rate),
      deliveryEta:
        rate?.delivery_eta ||
        rate?.deliveryEta ||
        null,
      deliveryEstimate:
        rate?.deliveryEstimate || null,
      requestToken:
        rate?.request_token ||
        rate?.requestToken ||
        null,
      currency: rate?.currency || "NGN",
      pickupEta: rate?.pickup_eta || null,
    });
  };

  const placeOrder = async () => {
    try {
      setPlacingOrder(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in again.");
      }

      if (!selectedCourier) {
        throw new Error("Please select a delivery option.");
      }

      if (!shippingData?.receiverAddressCode) {
        throw new Error("Please calculate delivery first.");
      }

      const items = cart.map((item) => ({
        productId: item.id,
        quantity: Number(item.quantity || 1),
      }));

      const deliveryAddress = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        postalCode: form.postalCode.trim(),
        latitude: form.latitude
          ? Number(form.latitude)
          : null,
        longitude: form.longitude
          ? Number(form.longitude)
          : null,
        country: "NG",
      };

      const shippingQuote = {
        amount: Number(selectedCourier.amount || 0),
        currency: selectedCourier.currency || "NGN",
        courierId: selectedCourier.courierId,
        courierName: selectedCourier.courierName,
        serviceCode: selectedCourier.serviceCode,
        serviceType: selectedCourier.serviceType,
        requestToken: selectedCourier.requestToken,
        pickupAddressCode: shippingData.pickupAddressCode,
        receiverAddressCode: shippingData.receiverAddressCode,
        deliveryEta: selectedCourier.deliveryEta,
        pickupEta: selectedCourier.pickupEta,
        deliveryEstimate: selectedCourier.deliveryEstimate,
      };

      const orderRes = await fetch(
        `${API}/marketplace/ab/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items,
            pickupDate: new Date().toISOString().slice(0, 10),
            courierId: selectedCourier.courierId,
            serviceCode: selectedCourier.serviceCode,
            deliveryAddress,
            shippingQuote,
          }),
        }
      );

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(
          orderData.message ||
            "Unable to create AB Marketplace order."
        );
      }

      const orderIds = (orderData.orders || []).map(
        (order) => order._id
      );

      if (!orderIds.length) {
        throw new Error("No AB Marketplace orders were created.");
      }

      const checkoutRes = await fetch(
        `${API}/marketplace/ab/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderIds,
            shipping: {
              amount: shippingQuote.amount,
              currency: shippingQuote.currency,
              courierId: shippingQuote.courierId,
              courierName: shippingQuote.courierName,
              serviceCode: shippingQuote.serviceCode,
              serviceType: shippingQuote.serviceType,
              requestToken: shippingQuote.requestToken,
              pickupAddress: {
                addressCode: shippingData.pickupAddressCode,
              },
              deliveryAddress: {
                ...deliveryAddress,
                addressCode: shippingData.receiverAddressCode,
              },
              deliveryPeriod:
                shippingQuote.deliveryEstimate || {},
            },
          }),
        }
      );

      const checkoutData = await checkoutRes.json();

      if (!checkoutRes.ok || !checkoutData.success) {
        throw new Error(
          checkoutData.message ||
            "Unable to create AB Marketplace checkout."
        );
      }

      const checkout = checkoutData.checkout;

      const paymentRes = await fetch(
        `${API}/marketplace/ab/checkout/${checkout._id}/pay`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok || !paymentData.success) {
        throw new Error(
          paymentData.message ||
            "Unable to initialize payment."
        );
      }

      localStorage.setItem(
        "alphabotMarketplaceActiveCheckout",
        JSON.stringify({
          ...checkout,
          checkoutType: "ab-marketplace",
          orderIds,
        })
      );

      window.location.href = paymentData.paymentLink;
    } catch (error) {
      console.error("AB MARKETPLACE ORDER ERROR:", error);
      setError(
        error.message ||
          "Unable to place your AB Marketplace order."
      );
    } finally {
      setPlacingOrder(false);
    }
  };


  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-7">
          <Link
            href="/marketplace/cart"
            className="text-xs font-bold text-zinc-500 hover:text-yellow-500"
          >
            ← Back to cart
          </Link>

          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500 mt-6">
            OFFICIAL STORE
          </p>

          <h1 className="text-3xl font-black mt-1">
            AB Marketplace Checkout
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Your AB Marketplace products are processed separately from local
            seller orders.
          </p>
        </div>

        <section className="bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5">
          <h2 className="text-sm font-black uppercase tracking-wide">
            Your AB Marketplace items
          </h2>

          <div className="mt-4 space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 items-center border-b border-zinc-100 dark:border-zinc-800 pb-3 last:border-0 last:pb-0"
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black truncate">
                    {item.name}
                  </p>

                  <p className="text-xs text-zinc-500 mt-1">
                    Qty: {Number(item.quantity || 1)}
                  </p>
                </div>

                <p className="text-sm font-black">
                  {formatMoney(
                    Number(item.price || 0) *
                      Number(item.quantity || 1)
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5">
          <h2 className="text-sm font-black uppercase tracking-wide">
            Delivery details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {[
              ["name", "Full name"],
              ["email", "Email"],
              ["phone", "Phone number"],
            ].map(([field, label]) => (
              <div key={field}>
                <label className="text-[10px] font-black uppercase tracking-wide text-zinc-500">
                  {label}
                </label>

                <input
                  value={form[field]}
                  onChange={(event) =>
                    updateForm(field, event.target.value)
                  }
                  type={field === "email" ? "email" : "text"}
                  placeholder={label}
                  className="mt-1 w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-sm outline-none focus:border-yellow-400"
                />
              </div>
            ))}

            <div className="sm:col-span-2 relative">
              <label className="text-[10px] font-black uppercase tracking-wide text-zinc-500">
                Delivery location
              </label>

              <input
                value={form.address}
                onChange={(event) =>
                  updateForm("address", event.target.value)
                }
                onFocus={() => {
                  if (locationSuggestions.length) {
                    setShowLocationSuggestions(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(
                    () => setShowLocationSuggestions(false),
                    180
                  );
                }}
                type="text"
                placeholder="Search your delivery location"
                autoComplete="off"
                className="mt-1 w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-sm outline-none focus:border-yellow-400"
              />

              {showLocationSuggestions &&
                (locationLoading ||
                  locationSuggestions.length > 0) && (
                  <div className="absolute z-30 left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl">
                    {locationLoading && (
                      <div className="px-4 py-3 text-xs font-bold text-zinc-500">
                        Searching locations...
                      </div>
                    )}

                    {!locationLoading &&
                      locationSuggestions.map((location, index) => (
                        <button
                          key={`${location.latitude}-${location.longitude}-${index}`}
                          type="button"
                          onMouseDown={(event) =>
                            event.preventDefault()
                          }
                          onClick={() =>
                            selectLocation(location)
                          }
                          className="w-full text-left px-4 py-3 border-b last:border-b-0 border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        >
                          <p className="text-xs font-black">
                            {location.displayName}
                          </p>

                          <p className="mt-1 text-[10px] text-zinc-500">
                            {[
                              location.address?.city,
                              location.address?.state,
                              location.address?.postalCode,
                            ]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        </button>
                      ))}
                  </div>
                )}
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wide text-zinc-500">
                City
              </label>

              <input
                value={form.city}
                onChange={(event) =>
                  updateForm("city", event.target.value)
                }
                type="text"
                placeholder="City"
                className="mt-1 w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-sm outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wide text-zinc-500">
                State
              </label>

              <input
                value={form.state}
                onChange={(event) =>
                  updateForm("state", event.target.value)
                }
                type="text"
                placeholder="State"
                className="mt-1 w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-sm outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {shippingError && (
            <div className="mt-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-xs font-bold text-red-600 dark:text-red-300">
              {shippingError}
            </div>
          )}

          <button
            type="button"
            onClick={getShippingRates}
            disabled={shippingLoading || placingOrder}
            className="mt-5 w-full h-12 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-black text-xs font-black disabled:opacity-50"
          >
            {shippingLoading
              ? "Calculating delivery..."
              : "Calculate delivery"}
          </button>
        </section>

        {shippingData && (
          <section className="mt-4 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-yellow-500">
                  Delivery option
                </p>

                <h2 className="text-sm font-black mt-1">
                  Combined AB Marketplace delivery
                </h2>

                <p className="text-[10px] text-zinc-500 mt-1">
                  One shipment for {cart.length} product{cart.length === 1 ? "" : "s"}
                </p>
              </div>

              <span className="text-[9px] font-black uppercase px-2 py-1 rounded-full bg-yellow-400 text-black">
                AB
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {(Array.isArray(shippingData?.rates)
                ? shippingData.rates
                : []
              ).map((rate, index) => {
                const courierId = getCourierId(rate);
                const serviceCode = getServiceCode(rate);
                const amount = getShippingAmount(rate);
                const deliveryEstimate =
                  rate?.deliveryEstimate || null;
                const expectedDelivery =
                  formatDeliveryRange(deliveryEstimate);

                const key =
                  `${courierId || "courier"}-${serviceCode || index}`;

                const selected =
                  selectedCourier?.courierId === courierId &&
                  selectedCourier?.serviceCode === serviceCode;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectCourier(rate)}
                    className={`w-full text-left rounded-2xl border p-4 transition ${
                      selected
                        ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20"
                        : "border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-black">
                          {getCourierName(rate)}
                        </p>

                        <p className="text-[11px] text-zinc-500 mt-1">
                          {getServiceName(rate)}
                        </p>

                        {expectedDelivery && (
                          <p className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 mt-2">
                            Expected delivery: {expectedDelivery}
                          </p>
                        )}

                        {deliveryEstimate?.shipbubbleEta && (
                          <p className="text-[9px] text-zinc-400 mt-1">
                            Courier ETA: {deliveryEstimate.shipbubbleEta}
                          </p>
                        )}
                      </div>

                      <p className="text-sm font-black">
                        {formatMoney(amount)}
                      </p>
                    </div>

                    {selected && (
                      <p className="text-[9px] font-black uppercase tracking-wide text-yellow-600 dark:text-yellow-400 mt-2">
                        Selected
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-4 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5">
          <h2 className="text-sm font-black uppercase tracking-wide">
            Order summary
          </h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Products</span>
              <span className="font-bold">{formatMoney(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Delivery</span>
              <span className="font-bold">{formatMoney(deliveryFee)}</span>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between">
              <span className="font-black">Total</span>

              <span className="text-lg font-black">
                {formatMoney(total)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={placeOrder}
            disabled={
              placingOrder ||
              shippingLoading ||
              !selectedCourier
            }
            className="mt-5 w-full h-13 rounded-2xl bg-yellow-400 text-black text-sm font-black disabled:opacity-50 active:scale-[0.99] transition"
          >
            {placingOrder
              ? "Preparing secure payment..."
              : `Pay ${formatMoney(total)}`}
          </button>

          <p className="text-[10px] text-zinc-500 text-center mt-3 leading-5">
            Your payment is processed securely through Flutterwave.
          </p>
        </section>

      </div>
    </main>
  );
}
