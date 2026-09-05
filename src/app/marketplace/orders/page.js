"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = "https://api.alphabothq.com";

const CANCELLABLE_STATUSES = [
  "pending",
  "awaiting_payment",
  "payment_submitted",
];

const getStatusLabel = (status) => {
  if (!status) return "Pending";

  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getStatusClass = (status) => {
  if (status === "cancelled") {
    return "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300";
  }

  if (status === "completed") {
    return "bg-green-500 text-white";
  }

  if (status === "delivered") {
    return "bg-blue-500 text-white";
  }

  if (status === "paid" || status === "processing") {
    return "bg-yellow-400 text-black";
  }

  if (status === "refunded") {
    return "bg-purple-500 text-white";
  }

  return "bg-yellow-400 text-black";
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshError, setRefreshError] = useState("");
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setRefreshError("");

        const response = await fetch(
          `${API_BASE}/marketplace/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load Marketplace orders."
          );
        }

        const backendOrders = Array.isArray(data.orders)
          ? data.orders
          : [];

        setOrders(backendOrders);
      } catch (error) {
        console.error(
          "MARKETPLACE ORDERS LOAD ERROR:",
          error
        );

        setRefreshError(
          error.message ||
            "Unable to refresh your Marketplace orders."
        );

        // Keep legacy local orders as a fallback only when
        // the backend cannot be reached. Backend data remains
        // the source of truth whenever it loads successfully.
        try {
          const savedOrders = JSON.parse(
            localStorage.getItem(
              "alphabotMarketplaceOrders"
            ) || "[]"
          );

          const lastOrder = JSON.parse(
            localStorage.getItem(
              "alphabotMarketplaceLastOrder"
            ) || "null"
          );

          let fallbackOrders = Array.isArray(savedOrders)
            ? savedOrders
            : [];

          if (
            lastOrder &&
            !fallbackOrders.some(
              (order) => order.id === lastOrder.id
            )
          ) {
            fallbackOrders = [
              lastOrder,
              ...fallbackOrders,
            ];
          }

          setOrders(fallbackOrders);
        } catch (storageError) {
          console.error(
            "MARKETPLACE LOCAL ORDERS FALLBACK ERROR:",
            storageError
          );

          setOrders([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const cancelOrder = async (marketplaceOrderId) => {
    if (!marketplaceOrderId || cancellingOrderId) {
      return;
    }

    const order = orders.find(
      (item) => String(item._id) === String(marketplaceOrderId)
    );

    if (!order) {
      alert("This Marketplace order could not be found.");
      return;
    }

    if (!CANCELLABLE_STATUSES.includes(order.status)) {
      alert(
        "This order can no longer be cancelled."
      );
      return;
    }

    const confirmed = window.confirm(
      "Cancel this Marketplace order? Your reserved stock will be released."
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please sign in to cancel this order.");
      return;
    }

    setCancellingOrderId(marketplaceOrderId);

    try {
      const response = await fetch(
        `${API_BASE}/marketplace/orders/${encodeURIComponent(
          marketplaceOrderId
        )}/cancel`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to cancel this order."
        );
      }

      const cancelledOrder = data.order;

      setOrders((currentOrders) =>
        currentOrders.map((item) =>
          String(item._id) ===
          String(marketplaceOrderId)
            ? {
                ...item,
                ...(cancelledOrder || {}),
                status:
                  cancelledOrder?.status ||
                  "cancelled",
              }
            : item
        )
      );

      alert(
        data.message ||
          "Marketplace order cancelled successfully."
      );
    } catch (error) {
      console.error(
        "MARKETPLACE ORDER CANCELLATION ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to cancel Marketplace order."
      );
    } finally {
      setCancellingOrderId(null);
    }
  };

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

        {/* REFRESH WARNING */}

        {refreshError && !loading && (
          <div className="mt-4 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 px-4 py-3">
            <p className="text-[10px] font-bold text-red-600 dark:text-red-400">
              {refreshError}
            </p>

            <p className="text-[9px] text-red-500/80 dark:text-red-400/70 mt-1">
              Showing saved order information while we try to reconnect.
            </p>
          </div>
        )}

        {/* LOADING */}

        {loading && (
          <section className="mt-10 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-8 text-center">
            <div className="text-4xl animate-pulse">
              📦
            </div>

            <p className="text-xs font-black mt-4">
              Loading your orders...
            </p>

            <p className="text-[10px] text-zinc-500 mt-1">
              Checking the latest Marketplace status.
            </p>
          </section>
        )}

        {/* EMPTY STATE */}

        {!loading && orders.length === 0 && (

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

        {!loading && orders.length > 0 && (

          <section className="mt-6 space-y-3">

            {orders.map((order) => {

              const marketplaceOrderId =
                order._id;

              const itemCount =
                Number(order.quantity || 1);

              const date = order.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleDateString(
                    "en-NG",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "Unknown date";

              const status =
                order.status || "pending";

              const canCancel =
                CANCELLABLE_STATUSES.includes(
                  status
                );

              const isCancelling =
                String(cancellingOrderId) ===
                String(marketplaceOrderId);

              return (

                <div
                  key={marketplaceOrderId}
                  className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p className="text-[9px] text-zinc-500 uppercase tracking-[0.15em] font-black">
                        ORDER
                      </p>

                      <p className="text-sm font-black mt-1 truncate">
                        {String(marketplaceOrderId)}
                      </p>

                    </div>

                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase ${getStatusClass(
                        status
                      )}`}
                    >
                      {getStatusLabel(status)}
                    </span>

                  </div>

                  <div className="mt-4">

                    <p className="text-xs font-black truncate">
                      {order.productName ||
                        "Marketplace product"}
                    </p>

                    <p className="text-[9px] text-zinc-500 mt-1">
                      Qty: {itemCount}
                    </p>

                  </div>

                  <div className="mt-4 flex items-center justify-between">

                    <div>

                      <p className="text-[9px] text-zinc-500">
                        Date
                      </p>

                      <p className="text-xs font-bold mt-1">
                        {date}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-[9px] text-zinc-500">
                        Total
                      </p>

                      <p className="text-sm font-black mt-1">
                        ₦
                        {Number(
                          order.totalAmount || 0
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">

                    <div className="flex items-center justify-between gap-3">

                      <Link
                        href={`/marketplace/orders/${encodeURIComponent(
                          marketplaceOrderId
                        )}/tracking`}
                        className="text-[10px] font-black text-yellow-600 dark:text-yellow-400"
                      >
                        Track order →
                      </Link>

                      {status === "cancelled" ? (

                        <span className="text-[9px] font-black uppercase text-zinc-400">
                          Cancelled
                        </span>

                      ) : canCancel ? (

                        <button
                          type="button"
                          disabled={isCancelling}
                          onClick={() =>
                            cancelOrder(
                              marketplaceOrderId
                            )
                          }
                          className="text-[9px] font-black uppercase text-red-500 active:scale-95 transition disabled:opacity-50"
                        >
                          {isCancelling
                            ? "Cancelling..."
                            : "Cancel Order"}
                        </button>

                      ) : (

                        <span className="text-[9px] font-bold text-zinc-400">
                          {status === "completed"
                            ? "Completed"
                            : status === "delivered"
                            ? "Awaiting confirmation"
                            : status === "paid" ||
                              status === "processing"
                            ? "Processing"
                            : "No cancellation available"}
                        </span>

                      )}

                    </div>

                  </div>

                </div>

              );
            })}

          </section>

        )}

        {/* SHOPPING CTA */}

        {!loading && orders.length > 0 && (

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
