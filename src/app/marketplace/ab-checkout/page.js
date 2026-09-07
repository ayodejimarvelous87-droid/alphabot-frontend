"use client";

import { useMemo, useState } from "react";
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
  });

  const [shippingData, setShippingData] = useState({});
  const [selectedCouriers, setSelectedCouriers] = useState({});
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

  const deliveryFee = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const selected = selectedCouriers[item.id];
        return sum + Number(selected?.amount || 0);
      }, 0),
    [cart, selectedCouriers]
  );

  const protectionFee = 500;
  const total = subtotal + deliveryFee + protectionFee;

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setShippingData({});
    setSelectedCouriers({});
    setShippingError("");
  };

  const getShippingRates = async () => {
    if (!cart.length) {
      setShippingError(
        "There are no AB Marketplace products in your cart."
      );
      return;
    }

    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "state",
    ];

    const missing = requiredFields.find(
      (field) => !String(form[field] || "").trim()
    );

    if (missing) {
      setShippingError(
        "Please complete your delivery address first."
      );
      return;
    }

    try {
      setShippingLoading(true);
      setShippingError("");
      setShippingData({});
      setSelectedCouriers({});

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please log in before calculating delivery."
        );
      }

      const results = {};

      for (const item of cart) {
        const res = await fetch(
          `${API}/marketplace/ab/shipping/quote`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: item.id,
              quantity: Number(item.quantity || 1),
              deliveryAddress: {
                name: form.name.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                address: form.address.trim(),
                city: form.city.trim(),
                state: form.state.trim(),
                country: "NG",
              },
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(
            data.message ||
              `Unable to calculate delivery for ${item.name}.`
          );
        }

        const rates = getRateCards(data.shipping);

        if (!rates.length) {
          throw new Error(
            `No delivery options were returned for ${item.name}.`
          );
        }

        results[item.id] = {
          receiverAddressCode: data.receiverAddressCode,
          pickupAddressCode: data.pickupAddressCode,
          rates,
        };
      }

      setShippingData(results);
    } catch (error) {
      console.error("AB SHIPPING ERROR:", error);
      setShippingError(
        error.message ||
          "Unable to calculate delivery."
      );
    } finally {
      setShippingLoading(false);
    }
  };

  const selectCourier = (itemId, rate) => {
    setSelectedCouriers((current) => ({
      ...current,
      [itemId]: {
        courierId: getCourierId(rate),
        serviceCode: getServiceCode(rate),
        courierName: getCourierName(rate),
        serviceType: getServiceName(rate),
        amount: getShippingAmount(rate),
      },
    }));
  };

  const placeOrder = async () => {
    if (!cart.length) {
      alert(
        "There are no AB Marketplace products to checkout."
      );
      return;
    }

    if (
      Object.keys(selectedCouriers).length !== cart.length
    ) {
      alert(
        "Please calculate delivery and select a courier for every product."
      );
      return;
    }

    try {
      setPlacingOrder(true);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please log in before placing your order."
        );
      }

      const pickupDate = new Date();
      pickupDate.setDate(pickupDate.getDate() + 1);

      const pickupDateString = pickupDate
        .toISOString()
        .slice(0, 10);

      const createdOrderIds = [];

      for (const item of cart) {
        const selected = selectedCouriers[item.id];

        if (
          !selected?.courierId ||
          !selected?.serviceCode
        ) {
          throw new Error(
            `Please select a valid courier for ${item.name}.`
          );
        }

        const res = await fetch(
          `${API}/marketplace/ab/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: item.id,
              quantity: Number(item.quantity || 1),
              pickupDate: pickupDateString,
              courierId: selected.courierId,
              serviceCode: selected.serviceCode,
              deliveryAddress: {
                name: form.name.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                address: form.address.trim(),
                city: form.city.trim(),
                state: form.state.trim(),
                country: "NG",
              },
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.order?._id) {
          throw new Error(
            data.message ||
              `Failed to create AB Marketplace order for ${item.name}.`
          );
        }

        createdOrderIds.push(data.order._id);
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
            orderIds: createdOrderIds,
          }),
        }
      );

      const checkoutData = await checkoutRes.json();

      if (
        !checkoutRes.ok ||
        !checkoutData.checkout?._id
      ) {
        throw new Error(
          checkoutData.message ||
            "Failed to create AB Marketplace payment checkout."
        );
      }

      const checkout = checkoutData.checkout;

      const paymentRes = await fetch(
        `${API}/marketplace/ab/checkout/${checkout._id}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok || !paymentData.paymentLink) {
        throw new Error(
          paymentData.message ||
            "Failed to initialize AB Marketplace payment."
        );
      }

      localStorage.setItem(
        "alphabotMarketplaceActiveCheckout",
        JSON.stringify({
          checkoutId: checkout._id,
          txRef: paymentData.txRef,
          checkoutType: "ab-marketplace",
          orderIds: createdOrderIds,
        })
      );

      window.location.href = paymentData.paymentLink;
    } catch (error) {
      console.error(
        "AB MARKETPLACE CHECKOUT ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to place AB Marketplace order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!cart.length) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white px-4 py-10">
        <div className="max-w-2xl mx-auto pt-12 text-center">
          <div className="text-5xl mb-5">🛍️</div>

          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500">
            AB MARKETPLACE
          </p>

          <h1 className="text-2xl font-black mt-2">
            No AB Marketplace products
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3">
            Add an AB Marketplace product to your cart before checking out.
          </p>

          <Link
            href="/marketplace/cart"
            className="mt-7 inline-flex h-12 px-6 rounded-2xl bg-yellow-400 text-black items-center justify-center text-xs font-black"
          >
            Back to cart
          </Link>
        </div>
      </main>
    );
  }

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
              ["address", "Delivery address"],
              ["city", "City"],
              ["state", "State"],
            ].map(([field, label]) => (
              <div
                key={field}
                className={field === "address" ? "sm:col-span-2" : ""}
              >
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

        {cart.map((item) => {
          const itemShipping = shippingData[item.id];
          const rates = itemShipping?.rates || [];

          if (!rates.length) {
            return null;
          }

          return (
            <section
              key={`shipping-${item.id}`}
              className="mt-4 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-yellow-500">
                    Delivery option
                  </p>

                  <h2 className="text-sm font-black mt-1">
                    {item.name}
                  </h2>
                </div>

                <span className="text-[9px] font-black uppercase px-2 py-1 rounded-full bg-yellow-400 text-black">
                  AB
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {rates.map((rate, index) => {
                  const courierId = getCourierId(rate);
                  const serviceCode = getServiceCode(rate);
                  const amount = getShippingAmount(rate);

                  const key = `${courierId || "courier"}-${serviceCode || index}`;

                  const selected =
                    selectedCouriers[item.id]?.courierId === courierId &&
                    selectedCouriers[item.id]?.serviceCode === serviceCode;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => selectCourier(item.id, rate)}
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
          );
        })}

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

            <div className="flex justify-between">
              <span className="text-zinc-500">Buyer protection</span>
              <span className="font-bold">
                {formatMoney(protectionFee)}
              </span>
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
              Object.keys(selectedCouriers).length !== cart.length
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
