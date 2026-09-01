"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });

  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedCart = JSON.parse(
      localStorage.getItem("alphabotMarketplaceCart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const deliveryFee = 0;
  const total = subtotal;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address || !form.city) {
      alert("Please complete your delivery details.");
      return;
    }

    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in before placing an order.");
        return;
      }

      const createdOrders = [];

      for (const item of cart) {
        const res = await fetch(
          "https://api.alphabothq.com/marketplace/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: item.id,
              quantity: Number(item.quantity || 1),
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.order) {
          throw new Error(
            data.message || `Failed to create order for ${item.name}.`
          );
        }

        createdOrders.push(data.order);
      }

      // Create one payment checkout for the entire cart
      const checkoutRes = await fetch(
        "https://api.alphabothq.com/marketplace/orders/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderIds: createdOrders.map(
              (order) => order._id
            ),
          }),
        }
      );

      const checkoutData = await checkoutRes.json();

      if (!checkoutRes.ok || !checkoutData.checkout) {
        throw new Error(
          checkoutData.message ||
            "Failed to create Marketplace payment checkout."
        );
      }

      const checkout = checkoutData.checkout;

      const localOrder = {
        id: `AB-${Date.now()}`,
        items: cart,
        customer: form,
        subtotal,
        deliveryFee,
        total,
        createdAt: new Date().toISOString(),
        status: "Pending",
        marketplaceOrders: createdOrders.map(
          (order) => order._id
        ),
        checkoutId: checkout._id,
      };

      const savedOrders = JSON.parse(
        localStorage.getItem("alphabotMarketplaceOrders") || "[]"
      );

      const updatedOrders = [
        localOrder,
        ...savedOrders.filter(
          (savedOrder) => savedOrder.id !== localOrder.id
        ),
      ];

      localStorage.setItem(
        "alphabotMarketplaceOrders",
        JSON.stringify(updatedOrders)
      );

      localStorage.setItem(
        "alphabotMarketplaceLastOrder",
        JSON.stringify(localOrder)
      );

      // Initialize one Flutterwave payment for the entire cart
      const paymentRes = await fetch(
        `https://api.alphabothq.com/marketplace/orders/checkout/${checkout._id}/pay`,
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
            "Failed to initialize Marketplace payment."
        );
      }

      // Save checkout reference before leaving for Flutterwave
      localStorage.setItem(
        "alphabotMarketplaceActiveCheckout",
        JSON.stringify({
          checkoutId: checkout._id,
          txRef: paymentData.txRef,
          orderIds: createdOrders.map(
            (order) => order._id
          ),
        })
      );

      // Redirect buyer to Flutterwave
      window.location.href = paymentData.paymentLink;
    } catch (error) {
      console.error("CREATE MARKETPLACE ORDER ERROR:", error);
      alert(error.message || "Unable to place order. Please try again.");
    }
  };

  if (!mounted) {
    return null;
  }

  if (placed) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white px-4 py-10">

        <div className="max-w-2xl mx-auto">

          <div className="text-center pt-12">

            <div className="mx-auto w-20 h-20 rounded-full bg-yellow-400 text-black flex items-center justify-center text-4xl">
              ✓
            </div>

            <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500 mt-6">
              ALPHABOT MARKETPLACE
            </p>

            <h1 className="text-2xl font-black mt-2">
              Order received
            </h1>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 max-w-sm mx-auto leading-6">
              Your order has been saved successfully. We’ll keep you updated
              as your order progresses.
            </p>

          </div>

          <div className="mt-8 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] font-black text-zinc-500">
                  ORDER TOTAL
                </p>

                <p className="text-xl font-black mt-1">
                  ₦{total.toLocaleString()}
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-yellow-400 text-black text-[9px] font-black">
                PENDING
              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">

            <Link
              href="/marketplace"
              className="h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs font-black active:scale-95 transition"
            >
              Continue shopping
            </Link>

            <Link
              href="/marketplace/orders"
              className="h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xs font-black active:scale-95 transition"
            >
              View orders →
            </Link>

          </div>

        </div>

      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white flex items-center justify-center px-5">

        <div className="text-center">

          <div className="text-5xl">
            🛒
          </div>

          <h1 className="text-xl font-black mt-4">
            Your cart is empty
          </h1>

          <p className="text-xs text-zinc-500 mt-2">
            Add something to your cart before checking out.
          </p>

          <Link
            href="/marketplace"
            className="inline-flex mt-5 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black"
          >
            Browse Marketplace
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-12">

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">

        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">

          <Link
            href="/marketplace/cart"
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center active:scale-95 transition"
          >
            ←
          </Link>

          <div>
            <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
              ALPHABOT
            </p>

            <h1 className="font-black text-sm">
              Checkout
            </h1>
          </div>

        </div>

      </header>

      <div className="max-w-2xl mx-auto px-4">

        {/* PROGRESS */}

        <div className="flex items-center gap-2 mt-5">

          <div className="h-1.5 flex-1 rounded-full bg-yellow-400" />

          <div className="h-1.5 flex-1 rounded-full bg-yellow-400" />

          <div className="h-1.5 flex-1 rounded-full bg-yellow-400" />

        </div>

        <p className="text-[9px] text-zinc-500 mt-2 text-right font-bold">
          Checkout
        </p>


        {/* DELIVERY DETAILS */}

        <section className="mt-6">

          <div className="mb-3">

            <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
              DELIVERY
            </p>

            <h2 className="text-lg font-black">
              Delivery details
            </h2>

          </div>

          <form onSubmit={handlePlaceOrder}>

            <div className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">

              <div>

                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">
                  Full name
                </label>

                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2 w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400 transition"
                />

              </div>

              <div>

                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">
                  Phone number
                </label>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="08012345678"
                  className="mt-2 w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400 transition"
                />

              </div>

              <div>

                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">
                  Delivery address
                </label>

                <textarea
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="House number, street, landmark..."
                  rows={3}
                  className="mt-2 w-full rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm outline-none focus:border-yellow-400 transition resize-none"
                />

              </div>

              <div>

                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">
                  City
                </label>

                <input
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g. Lagos"
                  className="mt-2 w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400 transition"
                />

              </div>

              <div>

                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wide">
                  Delivery note
                  <span className="text-zinc-400 font-normal ml-1">
                    Optional
                  </span>
                </label>

                <textarea
                  value={form.note}
                  onChange={(e) => updateField("note", e.target.value)}
                  placeholder="Anything the seller should know?"
                  rows={2}
                  className="mt-2 w-full rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm outline-none focus:border-yellow-400 transition resize-none"
                />

              </div>

            </div>


            {/* ORDER SUMMARY */}

            <section className="mt-6">

              <div className="mb-3">

                <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
                  YOUR ORDER
                </p>

                <h2 className="text-lg font-black">
                  Order summary
                </h2>

              </div>

              <div className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4">

                <div className="space-y-4">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center gap-3"
                    >

                      <div className="w-14 h-14 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden">

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">
                            📦
                          </div>
                        )}

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-xs font-black truncate">
                          {item.name}
                        </p>

                        <p className="text-[10px] text-zinc-500 mt-1">
                          Qty: {item.quantity || 1}
                        </p>

                      </div>

                      <p className="text-xs font-black">
                        ₦{(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        ).toLocaleString()}
                      </p>

                    </div>

                  ))}

                </div>

                <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-5" />

                <div className="space-y-3 text-xs">

                  <div className="flex justify-between">
                    <span className="text-zinc-500">
                      Subtotal
                    </span>

                    <span className="font-bold">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-500">
                      Delivery
                    </span>

                    <span className="font-bold">
                      ₦{deliveryFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

                  <div className="flex justify-between items-center">

                    <span className="font-black">
                      Total
                    </span>

                    <span className="text-lg font-black">
                      ₦{total.toLocaleString()}
                    </span>

                  </div>

                </div>

              </div>

            </section>


            {/* PAYMENT */}

            <section className="mt-6">

              <div className="mb-3">

                <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
                  PAYMENT
                </p>

                <h2 className="text-lg font-black">
                  Payment method
                </h2>

              </div>

              <div className="rounded-2xl bg-white dark:bg-[#151515] border border-yellow-400 p-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center">
                    💳
                  </div>

                  <div className="flex-1">

                    <p className="text-xs font-black">
                      AlphaBot Wallet
                    </p>

                    <p className="text-[10px] text-zinc-500 mt-1">
                      Payment integration coming next
                    </p>

                  </div>

                  <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-black text-[10px]">
                    ✓
                  </div>

                </div>

              </div>

            </section>


            {/* PLACE ORDER */}

            <button
              type="submit"
              className="w-full h-14 mt-7 rounded-2xl bg-yellow-400 text-black font-black text-sm active:scale-[0.98] transition shadow-lg shadow-yellow-400/10"
            >
              Place order · ₦{total.toLocaleString()}
            </button>

            <p className="text-[9px] text-center text-zinc-500 mt-3 leading-5">
              By placing this order, you agree to AlphaBot Marketplace
              terms and seller policies.
            </p>

          </form>

        </section>

      </div>

    </main>
  );
}
