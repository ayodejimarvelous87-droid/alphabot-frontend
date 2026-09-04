"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedOrders = JSON.parse(
      localStorage.getItem("alphabotMarketplaceOrders") || "[]"
    );

    const lastOrder = JSON.parse(
      localStorage.getItem("alphabotMarketplaceLastOrder") || "null"
    );

    let allOrders = savedOrders;

    if (
      lastOrder &&
      !savedOrders.some((order) => order.id === lastOrder.id)
    ) {
      allOrders = [lastOrder, ...savedOrders];

      localStorage.setItem(
        "alphabotMarketplaceOrders",
        JSON.stringify(allOrders)
      );
    }

    return allOrders;
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-12">

      {/* HEADER */}

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">

        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">

          <Link
            href="/marketplace"
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center active:scale-95 transition"
          >
            ←
          </Link>

          <div>
            <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
              ALPHABOT
            </p>

            <h1 className="font-black text-sm">
              My Orders
            </h1>
          </div>

        </div>

      </header>

      <div className="max-w-2xl mx-auto px-4">

        {/* TITLE */}

        <section className="mt-6">

          <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
            MARKETPLACE
          </p>

          <h2 className="text-2xl font-black mt-1">
            Your orders
          </h2>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
            Track your AlphaBot Marketplace purchases.
          </p>

        </section>


        {/* EMPTY STATE */}

        {orders.length === 0 && (

          <section className="mt-10 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-8 text-center">

            <div className="text-5xl">
              📦
            </div>

            <h3 className="text-lg font-black mt-4">
              No orders yet
            </h3>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
              Your Marketplace orders will appear here after you make a purchase.
            </p>

            <Link
              href="/marketplace"
              className="inline-flex mt-5 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black active:scale-95 transition"
            >
              Start shopping →
            </Link>

          </section>

        )}


        {/* ORDERS */}

        {orders.length > 0 && (

          <section className="mt-6 space-y-3">

            {orders.map((order) => {

              const itemCount = (order.items || []).reduce(
                (total, item) =>
                  total + Number(item.quantity || 1),
                0
              );

              const date = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString(
                    "en-NG",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "Unknown date";

              return (

                <div
                  key={order.id}
                  className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p className="text-[9px] text-zinc-500 uppercase tracking-[0.15em] font-black">
                        ORDER
                      </p>

                      <p className="text-sm font-black mt-1 truncate">
                        {order.id}
                      </p>

                    </div>

                    <span className="shrink-0 px-2.5 py-1 rounded-lg bg-yellow-400 text-black text-[8px] font-black uppercase">
                      {order.status || "Pending"}
                    </span>

                  </div>


                  <div className="mt-4 flex items-center justify-between">

                    <div>

                      <p className="text-[9px] text-zinc-500">
                        Items
                      </p>

                      <p className="text-xs font-bold mt-1">
                        {itemCount} {itemCount === 1 ? "item" : "items"}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-[9px] text-zinc-500">
                        Total
                      </p>

                      <p className="text-sm font-black mt-1">
                        ₦{Number(order.total || 0).toLocaleString()}
                      </p>

                    </div>

                  </div>


                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">

                    <p className="text-[9px] text-zinc-500 mb-3">
                      {date}
                    </p>

                    {Array.isArray(order.marketplaceOrders) &&
                      order.marketplaceOrders.length > 0 && (
                        <div className="space-y-2">

                          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500">
                            Products
                          </p>

                          {order.marketplaceOrders.map(
                            (marketplaceOrderId, index) => {

                              const item = order.items?.[index];

                              return (
                                <div
                                  key={marketplaceOrderId}
                                  className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 dark:bg-[#0f0f0f] border border-zinc-100 dark:border-zinc-800 px-3 py-2.5"
                                >

                                  <div className="min-w-0">

                                    <p className="text-xs font-black truncate">
                                      {item?.name || "Marketplace product"}
                                    </p>

                                    <p className="text-[9px] text-zinc-500 mt-0.5">
                                      Qty: {Number(item?.quantity || 1)}
                                    </p>

                                  </div>

                                  <Link
                                    href={`/marketplace/orders/${encodeURIComponent(
                                      marketplaceOrderId
                                    )}/tracking`}
                                    className="shrink-0 text-[10px] font-black text-yellow-600 dark:text-yellow-400"
                                  >
                                    Track →
                                  </Link>

                                </div>
                              );
                            }
                          )}

                        </div>
                      )}

                  </div>

                </div>

              );
            })}

          </section>

        )}


        {/* SHOPPING CTA */}

        {orders.length > 0 && (

          <Link
            href="/marketplace"
            className="mt-6 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xs font-black active:scale-95 transition"
          >
            Continue shopping →
          </Link>

        )}

      </div>

    </main>
  );
}
