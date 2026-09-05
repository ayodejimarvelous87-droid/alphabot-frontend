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

  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [hasExistingRating, setHasExistingRating] = useState(false);
  const [ratingError, setRatingError] = useState("");

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

  const submitRating = async () => {
    if (
      !data?.productId ||
      !data?.orderId ||
      !selectedRating ||
      ratingSubmitting
    ) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setRatingError("Please log in again to rate this product.");
      return;
    }

    try {
      setRatingSubmitting(true);
      setRatingError("");

      const response = await fetch(
        `https://api.alphabothq.com/marketplace/ratings/${encodeURIComponent(
          data.productId
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderId: data.orderId,
            rating: selectedRating,
            review: review.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your rating."
        );
      }

      setHasExistingRating(true);
      setRatingSubmitted(true);
    } catch (err) {
      console.error(
        "MARKETPLACE PRODUCT RATING SUBMIT ERROR:",
        err
      );

      setRatingError(
        err.message || "Unable to submit your rating."
      );
    } finally {
      setRatingSubmitting(false);
    }
  };

  // Load the buyer's existing rating for this exact order.
  useEffect(() => {
    const productId = data?.productId;
    const currentOrderId = data?.orderId;

    if (!productId || !currentOrderId) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const loadExistingRating = async () => {
      try {
        const response = await fetch(
          `https://api.alphabothq.com/marketplace/ratings/${encodeURIComponent(
            productId
          )}?orderId=${encodeURIComponent(currentOrderId)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          return;
        }

        if (result.userRating) {
          setSelectedRating(Number(result.userRating.rating || 0));
          setReview(result.userRating.review || "");
          setHasExistingRating(true);
          setRatingSubmitted(true);
        }
      } catch (err) {
        console.error(
          "MARKETPLACE EXISTING RATING ERROR:",
          err
        );
      }
    };

    loadExistingRating();
  }, [data?.productId, data?.orderId]);

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


        {/* PRODUCT RATING */}

        {String(data?.orderStatus || "").toLowerCase() ===
          "completed" && (
          <section className="mt-4 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">

            <p className="text-[9px] font-black tracking-[0.15em] uppercase text-yellow-500">
              PRODUCT RATING
            </p>

            <h2 className="text-lg font-black mt-1">
              How was your purchase?
            </h2>

            {ratingSubmitted ? (

              <div className="mt-5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 p-5">

                <div className="text-center">
                  <div className="text-3xl">
                    ⭐
                  </div>

                  <p className="text-sm font-black mt-3">
                    Thanks for your rating!
                  </p>

                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
                    Your rating helps other buyers discover great products.
                  </p>

                  <div className="mt-3 text-yellow-500 text-lg tracking-widest">
                    {"★".repeat(selectedRating)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setRatingSubmitted(false);
                    setRatingError("");
                  }}
                  className="mt-4 w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 text-[10px] font-black active:scale-95 transition"
                >
                  Edit rating
                </button>

              </div>

            ) : (

              <>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
                  Rate the product you purchased. Your rating is tied to this completed order.
                </p>

                <div className="mt-5 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      className={`text-3xl leading-none transition active:scale-90 ${
                        star <= selectedRating
                          ? "text-yellow-400"
                          : "text-zinc-300 dark:text-zinc-700"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <p className="text-center text-[10px] text-zinc-500 dark:text-zinc-400 mt-2">
                  {selectedRating
                    ? `${selectedRating} out of 5`
                    : "Tap a star to rate"}
                </p>

                <textarea
                  value={review}
                  onChange={(event) =>
                    setReview(event.target.value.slice(0, 1000))
                  }
                  placeholder="Write a review (optional)"
                  rows={4}
                  className="mt-5 w-full rounded-2xl bg-zinc-50 dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-xs outline-none focus:border-yellow-400 resize-none"
                />

                {ratingError && (
                  <p className="mt-3 text-[10px] text-red-500 font-bold">
                    {ratingError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={submitRating}
                  disabled={!selectedRating || ratingSubmitting}
                  className="mt-4 w-full h-11 rounded-xl bg-yellow-400 text-black text-xs font-black active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {ratingSubmitting
                    ? "Saving..."
                    : hasExistingRating
                      ? "Update rating"
                      : "Submit rating"}
                </button>
              </>

            )}

          </section>
        )}


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
