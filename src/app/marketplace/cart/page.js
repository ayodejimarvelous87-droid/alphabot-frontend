"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MarketplaceCart() {

  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("alphabotMarketplaceCart") || "[]"
      );

      setCart(Array.isArray(savedCart) ? savedCart : []);
    } catch {
      setCart([]);
    }

    setLoaded(true);
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "alphabotMarketplaceCart",
      JSON.stringify(updatedCart)
    );
  };

  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id !== id) {
          return item;
        }

        const currentQuantity = Number(item.quantity) || 1;
        const stock = Number(item.stock);

        const maxQuantity =
          Number.isInteger(stock) && stock > 0
            ? stock
            : Infinity;

        const nextQuantity = Math.min(
          maxQuantity,
          Math.max(1, currentQuantity + change)
        );

        return {
          ...item,
          quantity: nextQuantity,
        };
      });

    saveCart(updatedCart);
  };

  const removeItem = (id) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  if (!loaded) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white flex items-center justify-center">
        <p className="text-xs text-zinc-500">
          Loading cart...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-10">

      {/* HEADER */}

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">

        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">

          <Link
            href="/marketplace"
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center"
          >
            ←
          </Link>

          <div className="flex-1">

            <p className="text-[9px] font-black tracking-[0.16em] uppercase text-yellow-500">
              ALPHABOT MARKETPLACE
            </p>

            <h1 className="font-black text-lg">
              Your Cart
            </h1>

          </div>

          <div className="text-xs font-black text-zinc-500">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </div>

        </div>

      </header>


      <div className="max-w-2xl mx-auto px-4">

        {/* EMPTY CART */}

        {cart.length === 0 ? (

          <section className="py-20 text-center">

            <div className="text-6xl">
              🛒
            </div>

            <h2 className="text-xl font-black mt-5">
              Your cart is empty
            </h2>

            <p className="text-sm text-zinc-500 mt-2">
              Find something you love and add it to your cart.
            </p>

            <Link
              href="/marketplace"
              className="inline-flex mt-6 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black"
            >
              Explore Marketplace →
            </Link>

          </section>

        ) : (

          <>

            {/* CART ITEMS */}

            <section className="mt-5 space-y-3">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3"
                >

                  <div className="flex gap-3">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover bg-zinc-100 dark:bg-zinc-900"
                    />

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-2">

                        <h2 className="text-sm font-black leading-5">
                          {item.name}
                        </h2>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-zinc-400 active:scale-90 transition"
                        >
                          ✕
                        </button>

                      </div>

                      <p className="text-sm font-black mt-2">
                        ₦{Number(item.price).toLocaleString()}
                      </p>

                      {Number.isInteger(Number(item.stock)) &&
                        Number(item.stock) > 0 && (
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                            {item.stock} available
                          </p>
                        )}

                      <div className="flex items-center justify-between mt-3">

                        <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden">

                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-9 h-8 flex items-center justify-center font-black active:bg-zinc-100 dark:active:bg-zinc-800"
                          >
                            −
                          </button>

                          <span className="w-9 text-center text-xs font-black">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={
                              Number.isInteger(Number(item.stock)) &&
                              Number(item.stock) > 0 &&
                              Number(item.quantity) >= Number(item.stock)
                            }
                            className="w-9 h-8 flex items-center justify-center font-black active:bg-zinc-100 dark:active:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            +
                          </button>

                        </div>

                        <p className="text-xs font-black">
                          ₦{(Number(item.price) * item.quantity).toLocaleString()}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </section>


            {/* ORDER SUMMARY */}

            <section className="mt-6">

              <div className="bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">

                <p className="text-[9px] font-black tracking-[0.16em] uppercase text-yellow-500">
                  ORDER SUMMARY
                </p>

                <div className="flex items-center justify-between mt-4">

                  <span className="text-xs text-zinc-500">
                    Subtotal
                  </span>

                  <span className="text-sm font-black">
                    ₦{subtotal.toLocaleString()}
                  </span>

                </div>

                <div className="flex items-center justify-between mt-2">

                  <span className="text-xs text-zinc-500">
                    Delivery
                  </span>

                  <span className="text-xs font-bold text-zinc-500">
                    Calculated at checkout
                  </span>

                </div>

                <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4" />

                <div className="flex items-center justify-between">

                  <span className="text-sm font-black">
                    Total
                  </span>

                  <span className="text-xl font-black">
                    ₦{subtotal.toLocaleString()}
                  </span>

                </div>

                <Link
                  href="/marketplace/checkout"
                  className="w-full mt-5 h-12 rounded-2xl bg-yellow-400 text-black font-black text-xs active:scale-[0.98] transition flex items-center justify-center"
                >
                  Proceed to checkout →
                </Link>

              </div>

            </section>

          </>

        )}

      </div>

    </main>
  );
}
