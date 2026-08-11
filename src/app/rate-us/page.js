"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = "https://alphabot-1.onrender.com";

export default function RateUs() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [displayPublicly, setDisplayPublicly] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [publicData, setPublicData] = useState(null);
  const [publicLoading, setPublicLoading] = useState(true);

  const ratingText = {
    1: "We are sorry AlphaBot did not meet your expectations.",
    2: "Thank you for being honest. We would like to do better.",
    3: "Thank you. Your feedback helps us improve AlphaBot.",
    4: "Great to hear that you are enjoying AlphaBot!",
    5: "Thank you! We are glad you are enjoying AlphaBot."
  };

  useEffect(() => {
    const loadPublicRatings = async () => {
      try {
        const response = await fetch(`${API}/ratings/public`);

        if (!response.ok) {
          throw new Error("Unable to load public ratings.");
        }

        const data = await response.json();

        if (data.success) {
          setPublicData(data);
        }
      } catch (err) {
        console.error("Unable to load public ratings:", err);
      } finally {
        setPublicLoading(false);
      }
    };

    loadPublicRatings();
  }, []);

  useEffect(() => {
    const loadExistingRating = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await fetch(`${API}/ratings/mine`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok && data.hasRating && data.rating) {
          setRating(data.rating.rating || 0);
          setFeedback(data.rating.feedback || "");
          setDisplayPublicly(
            data.rating.displayPublicly === true
          );
        }
      } catch (err) {
        console.error("Unable to load rating:", err);
      }
    };

    loadExistingRating();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!rating) {
      setError("Please select a rating first.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to submit a rating.");
        return;
      }

      const response = await fetch(`${API}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          rating,
          feedback,
          displayPublicly
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit your rating."
        );
      }

      setSubmitted(true);

      // Refresh public statistics after submitting.
      try {
        const publicResponse = await fetch(`${API}/ratings/public`);

        if (publicResponse.ok) {
          const publicResult = await publicResponse.json();

          if (publicResult.success) {
            setPublicData(publicResult);
          }
        }
      } catch (refreshError) {
        console.error("Unable to refresh public ratings:", refreshError);
      }

    } catch (err) {
      console.error("Rating submission error:", err);

      setError(
        err.message ||
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  const stats = publicData?.stats;

  const averageRating = stats?.averageRating
    ? Number(stats.averageRating).toFixed(1)
    : "0.0";

  const totalRatings = stats?.totalRatings || 0;
  const reviews = publicData?.reviews || [];

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        <Link
          href="/profile"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Profile
        </Link>

        {!submitted ? (
          <>
            <div className="mt-8">

              <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center text-2xl shadow-sm">
                ⭐
              </div>

              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
                Your Experience
              </p>

              <h1 className="text-3xl font-black mt-2">
                Rate Alpha<span className="text-yellow-400">Bot</span>
              </h1>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
                Your experience matters to us. Tell us how AlphaBot has been
                working for you and help us make the platform better for
                everyone.
              </p>

            </div>

            {/* Public rating summary */}
            <div className="mt-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">
                    AlphaBot Rating
                  </p>

                  {publicLoading ? (
                    <p className="text-sm text-zinc-400 mt-3">
                      Loading ratings...
                    </p>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-4xl font-black">
                          {averageRating}
                        </span>

                        <div>
                          <div className="text-yellow-400 text-lg tracking-tight">
                            {"★".repeat(
                              Math.round(Number(averageRating))
                            )}
                            <span className="text-zinc-300 dark:text-zinc-700">
                              {"★".repeat(
                                5 - Math.round(Number(averageRating))
                              )}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-500 mt-1">
                            {totalRatings}{" "}
                            {totalRatings === 1 ? "rating" : "ratings"}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-4xl">
                  ⭐
                </div>

              </div>

            </div>

            {/* Rating form */}
            <form onSubmit={handleSubmit} className="mt-4">

              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] p-6">

                <p className="font-bold text-center">
                  How would you rate your experience?
                </p>

                <div
                  className="flex justify-center gap-2 mt-6"
                  onMouseLeave={() => setHover(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} out of 5`}
                      onMouseEnter={() => setHover(star)}
                      onClick={() => setRating(star)}
                      className="text-4xl transition-transform hover:scale-110 active:scale-95"
                    >
                      <span
                        className={
                          star <= (hover || rating)
                            ? "text-yellow-400"
                            : "text-zinc-300 dark:text-zinc-700"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>

                {rating > 0 && (
                  <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                    {ratingText[rating]}
                  </p>
                )}

              </div>

              <div className="mt-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] p-5">

                <label className="font-bold block">
                  Tell us more
                  <span className="font-normal text-zinc-400">
                    {" "}· Optional
                  </span>
                </label>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  What do you like about AlphaBot, or what should we improve?
                </p>

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                  maxLength={1000}
                  placeholder="Write your feedback here..."
                  className="
                    w-full
                    mt-4
                    rounded-2xl
                    border
                    border-zinc-200
                    dark:border-zinc-700
                    bg-zinc-50
                    dark:bg-black
                    text-black
                    dark:text-white
                    p-4
                    text-sm
                    outline-none
                    focus:border-yellow-400
                    resize-none
                  "
                />

                <p className="text-right text-xs text-zinc-400 mt-2">
                  {feedback.length}/1000
                </p>

                <label className="flex items-start gap-3 mt-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={displayPublicly}
                    onChange={(e) => setDisplayPublicly(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-yellow-400"
                  />

                  <span className="text-sm leading-5 text-zinc-600 dark:text-zinc-300">
                    <span className="font-bold">
                      Share my feedback publicly
                    </span>
                    <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      If enabled, your written feedback may appear on
                      AlphaBot's public ratings page. Your phone number
                      and email address will never be displayed.
                    </span>
                  </span>
                </label>

              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!rating || loading}
                className="
                  w-full
                  mt-5
                  py-4
                  rounded-2xl
                  bg-yellow-400
                  text-black
                  font-black
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  active:scale-[0.98]
                  transition
                "
              >
                {loading ? "Submitting..." : "Submit Rating"}
              </button>

              <p className="text-center text-xs text-zinc-400 mt-4 leading-5">
                Your feedback helps us understand what is working and where
                AlphaBot can improve.
              </p>

            </form>

            {/* Public reviews */}
            <section className="mt-10">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">
                    Community Feedback
                  </p>

                  <h2 className="text-xl font-black mt-1">
                    What users are saying
                  </h2>
                </div>

                {!publicLoading && stats?.totalPublicReviews > 0 && (
                  <span className="text-xs text-zinc-500">
                    {stats.totalPublicReviews} reviews
                  </span>
                )}
              </div>

              {publicLoading ? (
                <div className="mt-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
                  <p className="text-sm text-zinc-500">
                    Loading reviews...
                  </p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="mt-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#111111] p-7 text-center">

                  <div className="text-3xl">
                    💬
                  </div>

                  <h3 className="font-bold mt-3">
                    No public reviews yet
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                    Be one of the first users to share your experience
                    with the AlphaBot community.
                  </p>

                </div>
              ) : (
                <div className="mt-5 space-y-3">

                  {reviews.map((review, index) => (
                    <div
                      key={review._id || review.id || index}
                      className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] p-5"
                    >

                      <div className="flex items-center justify-between">

                        <div className="text-yellow-400 tracking-tight">
                          {"★".repeat(Number(review.rating || 0))}
                          <span className="text-zinc-300 dark:text-zinc-700">
                            {"★".repeat(
                              5 - Number(review.rating || 0)
                            )}
                          </span>
                        </div>

                        {review.createdAt && (
                          <span className="text-xs text-zinc-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        )}

                      </div>

                      <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-3 leading-6">
                        "{review.feedback}"
                      </p>

                    </div>
                  ))}

                </div>
              )}

            </section>

          </>
        ) : (
          <div className="mt-16 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-yellow-400 flex items-center justify-center text-4xl">
              ✓
            </div>

            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-8">
              Feedback Received
            </p>

            <h1 className="text-3xl font-black mt-2">
              Thank you!
            </h1>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 leading-6">
              We appreciate you taking the time to rate AlphaBot.
              Your feedback has been saved and will help us continue
              improving the experience.
            </p>

            <div className="flex justify-center gap-1 mt-6 text-3xl text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            <Link
              href="/profile"
              className="
                block
                w-full
                mt-8
                py-4
                rounded-2xl
                bg-yellow-400
                text-black
                font-black
              "
            >
              Back to Profile
            </Link>

          </div>
        )}

      </div>

    </main>
  );
}
