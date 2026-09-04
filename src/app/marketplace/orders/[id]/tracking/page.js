"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const formatStatus = (status) => {
  if (!status) return "Pending";

  return String(status)
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getStatusIcon = (status, index, historyLength) => {
  const normalized = String(status || "").toLowerCase();

  if (
    normalized.includes("deliver") ||
    normalized === "completed"
  ) {
    return "✓";
  }

  if (
    normalized.includes("transit") ||
    normalized.includes("pickup") ||
    normalized.includes("out_for")
  ) {
    return "🚚";
  }

  if (index === 0 && historyLength > 1) {
    return "●";
  }

  return "•";
};

export default function MarketplaceOrderTrackingPage() {
  const params = useParams();

  const orderId = String(params?.id || "").trim();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchTracking = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please log in again to view your order.");
    }

    if (!orderId) {
      throw new Error("Order ID was not found.");
    }

    const res = await fetch(
      `https://api.alphabothq.com/marketplace/orders/${encodeURIComponent(
        orderId
      )}/tracking`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(
        result.message ||
          "We could not load this order's tracking information."
      );
    }

    return result.data;
  }, [orderId]);

  const refreshTracking = async () => {
    try {
      setRefreshing(true);
      setError("");

      const result = await fetchTracking();
      setData(result);
    } catch (err) {
      console.error(
        "MARKETPLACE TRACKING PAGE ERROR:",
        err
      );

      setError(
        err.message ||
          "We could not load your order tracking."
      );
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialTracking = async () => {
      try {
        const result = await fetchTracking();

        if (!cancelled) {
          setData(result);
          setError("");
        }
      } catch (err) {
        console.error(
          "MARKETPLACE TRACKING PAGE ERROR:",
          err
        );

        if (!cancelled) {
          setError(
            err.message ||
              "We could not load your order tracking."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialTracking();

    return () => {
      cancelled = true;
    };
  }, [fetchTracking]);

  // Keep tracking information fresh while the buyer is viewing the page.
  useEffect(() => {
    if (!orderId) {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const result = await fetchTracking();

        setData(result);
        setError("");
      } catch (err) {
        console.error(
          "MARKETPLACE TRACKING POLLING ERROR:",
          err
        );
      }
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchTracking, orderId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white px-4 py-10">
        <div className="max-w-2xl mx-auto pt-10 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-2xl animate-pulse">
            📦
          </div>

          <p className="text-sm font-black mt-5">
            Loading tracking...
          </p>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
            Getting the latest delivery information.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white px-4 py-10">
        <div className="max-w-2xl mx-auto">

          <Link
            href="/marketplace/orders"
            className="inline-flex w-10 h-10 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 items-center justify-center active:scale-95 transition"
          >
            ←
          </Link>

          <section className="mt-10 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-8 text-center">

            <div className="text-5xl">
              ⚠️
            </div>

            <h1 className="text-xl font-black mt-4">
              Tracking unavailable
            </h1>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
              {error}
            </p>

            <button
              onClick={refreshTracking}
              className="mt-6 h-11 px-5 rounded-xl bg-yellow-400 text-black text-xs font-black active:scale-95 transition"
            >
              Try again
            </button>

          </section>

        </div>
      </main>
    );
  }

  const tracking = data?.tracking || {};
  const history = Array.isArray(tracking.history)
    ? tracking.history
    : [];

  const currentStatus = formatStatus(
    tracking.status || data?.orderStatus
  );

  const isDelivered =
    String(tracking.status || "")
      .toLowerCase()
      .includes("deliver") ||
    String(data?.orderStatus || "")
      .toLowerCase() === "delivered";

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-14">

      {/* HEADER */}

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">

        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">

          <Link
            href="/marketplace/orders"
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center active:scale-95 transition"
          >
            ←
          </Link>

          <div className="min-w-0">
            <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
              ALPHABOT
            </p>

            <h1 className="font-black text-sm truncate">
              Track order
            </h1>
          </div>

        </div>

      </header>


      <div className="max-w-2xl mx-auto px-4">

        {/* ORDER SUMMARY */}

        <section className="mt-6 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">

          <div className="flex items-start justify-between gap-4">

            <div className="min-w-0">

              <p className="text-[9px] font-black tracking-[0.15em] uppercase text-yellow-500">
                MARKETPLACE ORDER
              </p>

              <h2 className="text-lg font-black mt-1 truncate">
                {data?.productName || "Marketplace order"}
              </h2>

              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 break-all">
                Order ID: {String(data?.orderId || orderId)}
              </p>

            </div>

            <span
              className={`shrink-0 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase ${
                isDelivered
                  ? "bg-emerald-500 text-white"
                  : "bg-yellow-400 text-black"
              }`}
            >
              {currentStatus}
            </span>

          </div>


          <div className="mt-5 grid grid-cols-2 gap-3">

            <div className="rounded-2xl bg-zinc-50 dark:bg-[#0f0f0f] p-3">
              <p className="text-[9px] text-zinc-500">
                Quantity
              </p>

              <p className="text-sm font-black mt-1">
                {Number(data?.quantity || 0)}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 dark:bg-[#0f0f0f] p-3">
              <p className="text-[9px] text-zinc-500">
                Order total
              </p>

              <p className="text-sm font-black mt-1">
                ₦{Number(
                  data?.totalAmount || 0
                ).toLocaleString()}
              </p>
            </div>

          </div>

        </section>


        {/* DELIVERY STATUS */}

        <section className="mt-4 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">

          <div className="flex items-center justify-between gap-3">

            <div>
              <p className="text-[9px] font-black tracking-[0.15em] uppercase text-yellow-500">
                DELIVERY
              </p>

              <h2 className="text-lg font-black mt-1">
                {currentStatus}
              </h2>
            </div>

            <button
              onClick={refreshTracking}
              disabled={refreshing}
              className="h-9 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-[9px] font-black active:scale-95 transition disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "↻ Refresh"}
            </button>

          </div>


          <div className="mt-5 grid grid-cols-2 gap-3">

            <div className="rounded-2xl bg-zinc-50 dark:bg-[#0f0f0f] p-3">

              <p className="text-[9px] text-zinc-500">
                Courier
              </p>

              <p className="text-xs font-black mt-1">
                {tracking?.courier?.name || "Not assigned"}
              </p>

            </div>

            <div className="rounded-2xl bg-zinc-50 dark:bg-[#0f0f0f] p-3">

              <p className="text-[9px] text-zinc-500">
                Tracking number
              </p>

              <p className="text-xs font-black mt-1 break-all">
                {tracking.trackingNumber || "Not available yet"}
              </p>

            </div>

          </div>


          {(tracking.deliveryEta ||
            tracking.deliveryEtaTime) && (

            <div className="mt-3 rounded-2xl bg-yellow-50 dark:bg-yellow-400/10 border border-yellow-200 dark:border-yellow-500/20 p-4">

              <p className="text-[9px] text-yellow-700 dark:text-yellow-400 font-black uppercase tracking-[0.12em]">
                Estimated delivery
              </p>

              <p className="text-sm font-black mt-1">
                {tracking.deliveryEtaTime
                  ? formatDate(
                      tracking.deliveryEtaTime
                    )
                  : tracking.deliveryEta}
              </p>

              {tracking.deliveryEta &&
                tracking.deliveryEtaTime && (
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                    {tracking.deliveryEta}
                  </p>
                )}

            </div>

          )}


          {tracking.trackingUrl && (

            <a
              href={tracking.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 h-11 rounded-xl bg-yellow-400 text-black flex items-center justify-center text-xs font-black active:scale-95 transition"
            >
              Track on Shipbubble →
            </a>

          )}

        </section>


        {/* TRACKING TIMELINE */}

        <section className="mt-4 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">

          <div>
            <p className="text-[9px] font-black tracking-[0.15em] uppercase text-yellow-500">
              TRACKING HISTORY
            </p>

            <h2 className="text-lg font-black mt-1">
              Delivery timeline
            </h2>
          </div>


          {history.length === 0 ? (

            <div className="mt-6 rounded-2xl bg-zinc-50 dark:bg-[#0f0f0f] p-5 text-center">

              <div className="text-3xl">
                🕐
              </div>

              <p className="text-sm font-black mt-3">
                Tracking has not started yet
              </p>

              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
                Your order has been received. Delivery updates will appear here as the courier processes your shipment.
              </p>

            </div>

          ) : (

            <div className="mt-6">

              {history.map((item, index) => (

                <div
                  key={`${item.status}-${item.timestamp}-${index}`}
                  className="relative flex gap-4"
                >

                  <div className="flex flex-col items-center">

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                        index === 0
                          ? "bg-yellow-400 text-black"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {getStatusIcon(
                        item.status,
                        index,
                        history.length
                      )}
                    </div>

                    {index <
                      history.length - 1 && (
                      <div className="w-px flex-1 min-h-8 bg-zinc-200 dark:bg-zinc-800" />
                    )}

                  </div>


                  <div className="pb-7 min-w-0">

                    <p className="text-sm font-black">
                      {formatStatus(item.status)}
                    </p>

                    {item.message && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-5">
                        {item.message}
                      </p>
                    )}

                    {item.location && (
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2">
                        📍 {item.location}
                      </p>
                    )}

                    <p className="text-[9px] text-zinc-400 mt-2">
                      {formatDate(item.timestamp)}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* ORDER DATES */}

        <section className="mt-4 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">

          <p className="text-[9px] font-black tracking-[0.15em] uppercase text-yellow-500">
            ORDER INFORMATION
          </p>

          <div className="mt-4 space-y-3">

            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] text-zinc-500">
                Payment
              </span>

              <span className="text-[10px] font-black">
                {data?.paymentVerified
                  ? "Verified ✓"
                  : "Pending"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] text-zinc-500">
                Order placed
              </span>

              <span className="text-[10px] font-black text-right">
                {formatDate(data?.createdAt)}
              </span>
            </div>

            {data?.paymentVerifiedAt && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-zinc-500">
                  Payment verified
                </span>

                <span className="text-[10px] font-black text-right">
                  {formatDate(
                    data.paymentVerifiedAt
                  )}
                </span>
              </div>
            )}

            {data?.deliveredAt && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-zinc-500">
                  Delivered
                </span>

                <span className="text-[10px] font-black text-right">
                  {formatDate(data.deliveredAt)}
                </span>
              </div>
            )}

          </div>

        </section>


        <Link
          href="/marketplace/orders"
          className="mt-6 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xs font-black active:scale-95 transition"
        >
          ← Back to my orders
        </Link>

      </div>

    </main>
  );
}
