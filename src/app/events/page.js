"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(
          "https://api.alphabothq.com/events",
          { cache: "no-store" }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load events");
        }

        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load events");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (value) => {
    if (!value) return "—";

    return new Date(value).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const getEventState = (event) => {
    const start = new Date(event.startsAt).getTime();
    const end = new Date(event.endsAt).getTime();

    if (now < start) return "upcoming";
    if (now < end) return "active";
    return "ended";
  };

  const getStatus = (event) => {
    const state = getEventState(event);

    if (state === "upcoming") return "Upcoming";
    if (state === "active") return "Active";
    return "Ended";
  };

  const getCountdown = (event) => {
    const start = new Date(event.startsAt).getTime();
    const end = new Date(event.endsAt).getTime();

    let difference;

    if (now < start) {
      difference = start - now;
    } else if (now < end) {
      difference = end - now;
    } else {
      difference = 0;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      `${String(days).padStart(2, "0")}d`,
      `${String(hours).padStart(2, "0")}h`,
      `${String(minutes).padStart(2, "0")}m`,
      `${String(seconds).padStart(2, "0")}s`
    ].join(" ");
  };

  const getTypeLabel = (event) => {
    if (event.type === "service_purchases") {
      return "Service Activity";
    }

    if (event.type === "purchase_referral") {
      return "Purchase + Referral";
    }

    return String(event.type || "Event")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getOrdinal = (rank) => {
    if (rank === 1) return "1st";
    if (rank === 2) return "2nd";
    if (rank === 3) return "3rd";

    return `${rank}th`;
  };

  const renderEvent = (event) => {
    const state = getEventState(event);
    const leaderboard = Array.isArray(event.leaderboard)
      ? event.leaderboard
      : [];

    return (
      <section
        key={event._id}
        className="mt-6"
      >
        {/* EVENT HEADER */}

        <div className="text-center">

          <div className="mx-auto w-16 h-16 rounded-3xl bg-yellow-400 text-black flex items-center justify-center text-3xl shadow-lg">
            {event.icon || "🎉"}
          </div>

          <p className="text-[10px] font-black tracking-[0.22em] text-yellow-500 uppercase mt-5">
            {getTypeLabel(event)}
          </p>

          <h1 className="text-2xl font-black mt-2 leading-tight">
            {event.title}
          </h1>

          {event.description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5 max-w-sm mx-auto">
              {event.description}
            </p>
          )}

        </div>


        {/* EVENT INFORMATION */}

        <div className="mt-4 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#111111]">

          <div className="grid grid-cols-3">

            <div className="p-2.5 border-r border-b border-zinc-200 dark:border-zinc-800">
              <p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">
                Status
              </p>

              <p className="text-xs font-black mt-1">
                {getStatus(event)}
              </p>
            </div>


            <div className="p-2.5 border-r border-b border-zinc-200 dark:border-zinc-800">
              <p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">
                Starts
              </p>

              <p className="text-xs font-black mt-1">
                {formatDate(event.startsAt)}
              </p>
            </div>


            <div className="p-2.5 border-b border-zinc-200 dark:border-zinc-800">
              <p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">
                Ends
              </p>

              <p className="text-xs font-black mt-1">
                {formatDate(event.endsAt)}
              </p>
            </div>


            <div className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">
              <p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">
                Reward
              </p>

              <p className="text-xs font-black text-yellow-500 mt-1">
                {event.reward || "To be announced"}
              </p>
            </div>


            <div className="p-2.5 border-r border-zinc-200 dark:border-zinc-800">
              <p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">
                Competition
              </p>

              <p className="text-xs font-black mt-1">
                {getTypeLabel(event)}
              </p>
            </div>


            <div className="p-2.5">
              <p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">
                Users
              </p>

              <p className="text-xs font-black mt-1">
                {leaderboard.length}
              </p>
            </div>

          </div>

        </div>


        {/* COUNTDOWN */}

        <div className="mt-3 rounded-2xl bg-yellow-400 text-black p-3">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] font-black tracking-[0.2em] uppercase opacity-60">
                {state === "upcoming"
                  ? "Starts in"
                  : state === "active"
                  ? "Ends in"
                  : "Event ended"}
              </p>

              <p className="text-lg font-black mt-0.5 tabular-nums">
                {getCountdown(event)}
              </p>
            </div>

            <div className="text-xl">
              {state === "ended"
                ? "🏁"
                : state === "upcoming"
                ? "⏳"
                : "⚡"}
            </div>

          </div>

        </div>


        {/* LEADERBOARD */}

        <div className="mt-8">

          <div className="flex items-end justify-between">

            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-yellow-500 uppercase">
                Rankings
              </p>

              <h2 className="text-2xl font-black mt-1">
                LEADERBOARD
              </h2>
            </div>

            <span className="text-[10px] font-black text-zinc-400 uppercase">
              {state === "active" ? "Live" : ""}
            </span>

          </div>


          <div className="mt-4 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#101010]">

            {leaderboard.length === 0 ? (

              <div className="p-8 text-center">

                <div className="text-4xl">
                  🏆
                </div>

                <p className="font-black mt-3">
                  No rankings yet
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  Be the first to qualify for this event.
                </p>

              </div>

            ) : (

              leaderboard.map((user, index) => {

                const rank = Number(user.rank) || index + 1;

                return (
                  <div
                    key={`${rank}-${user.username}`}
                    className="px-4 py-4 border-b last:border-b-0 border-zinc-200 dark:border-zinc-800"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div className="min-w-0 flex-1 flex items-center gap-2">

                        {rank <= 3 ? (
                          <span className="text-xl shrink-0">
                            {rank === 1
                              ? "🥇"
                              : rank === 2
                              ? "🥈"
                              : "🥉"}
                          </span>
                        ) : (
                          <span className="w-5 shrink-0 text-xs font-black text-zinc-400 text-center">
                            {rank}
                          </span>
                        )}

                        <p className="font-black text-sm truncate">
                          {user.username || "AlphaBot User"}
                        </p>

                      </div>


                      <div className="shrink-0 text-right">

                        <p className="text-sm font-black text-yellow-500 tabular-nums">
                          {event.type === "referral_challenge"
                            ? `${Number(user.referrals || 0).toLocaleString()} referrals`
                            : event.type === "ab_coins"
                            ? `${Number(user.coins || 0).toLocaleString()} AB Coins`
                            : event.type === "football_picks"
                            ? `${Number(user.picks || 0).toLocaleString()} picks`
                            : event.type === "purchase_referral"
                            ? `${Number(user.points || 0).toLocaleString()} pts`
                            : `${Number(user.points || 0).toLocaleString()} pts`}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              })

            )}

          </div>

        </div>


      </section>
    );
  };


  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-4 py-6 pb-24">

      <div className="max-w-md mx-auto">

        {/* PAGE HEADER */}

        <header className="flex items-center gap-3">

          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-lg"
          >
            ←
          </Link>

          <div>
            <p className="text-[10px] font-black tracking-[0.2em] text-yellow-500 uppercase">
              AlphaBot
            </p>

            <h2 className="text-lg font-black">
              Events
            </h2>
          </div>

        </header>


        {/* LOADING */}

        {loading && (
          <div className="mt-8 rounded-3xl bg-zinc-100 dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-8 text-center">

            <div className="text-3xl animate-pulse">
              🎉
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3">
              Loading events...
            </p>

          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="mt-8 rounded-3xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-6 text-center">

            <div className="text-xl">
              ⚠️
            </div>

            <p className="text-sm text-red-500 font-bold mt-3">
              {error}
            </p>

          </div>
        )}


        {/* EMPTY */}

        {!loading && !error && events.length === 0 && (
          <div className="mt-8 rounded-3xl bg-zinc-100 dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-8 text-center">

            <div className="text-4xl">
              🎉
            </div>

            <p className="font-black mt-3">
              No events available
            </p>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              Check back later for the next AlphaBot event.
            </p>

          </div>
        )}


        {/* EVENTS */}

        {!loading &&
          !error &&
          events.map(renderEvent)}




      </div>

      <BottomNav />

    </main>
  );
}
