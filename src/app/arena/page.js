"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Arena(){


  return(
    <main className="min-h-screen bg-[#050505] text-white px-4 py-6 pb-28">

      <div className="max-w-md mx-auto space-y-4">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-[#111113] to-black p-5">

          <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

          <div className="relative flex items-center justify-between">

            <div>
              <p className="text-[9px] font-black tracking-[0.22em] text-yellow-400 uppercase">
                AlphaBot
              </p>

              <h1 className="text-2xl font-black mt-1">
                Arena+
              </h1>

              <p className="text-[10px] text-zinc-400 mt-1">
                Predict. Compete. Earn.
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-2xl">
              🏆
            </div>

          </div>
        </div>


        {/* LIVE ARENA HERO */}
        <Link
          href="/arena/football"
          className="group relative block overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/15 via-[#151515] to-[#0A0A0A] p-5 active:scale-[0.98] transition"
        >

          <div className="absolute -right-16 -bottom-16 w-40 h-40 rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="relative">

            <div className="flex items-center justify-between">

              <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-black text-[8px] font-black">
                ⚡ ARENA LIVE
              </span>

              <span className="text-zinc-500 text-lg group-hover:translate-x-1 transition">
                →
              </span>

            </div>

            <div className="mt-5 text-4xl">
              ⚽
            </div>

            <h2 className="text-3xl font-black mt-3 leading-tight">
              Football
              <br />
              <span className="text-yellow-400">
                Predictions
              </span>
            </h2>

            <p className="text-xs text-zinc-400 mt-3 leading-relaxed max-w-[290px]">
              Make your predictions, collect points and climb the AlphaBot Arena leaderboard.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-3 rounded-2xl text-xs font-black">
              Enter Arena
              <span>→</span>
            </div>

          </div>
        </Link>


        {/* ARENA STATS */}
        <div className="grid grid-cols-3 gap-2">

          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-3 text-center">
            <div className="text-lg">⚽</div>
            <p className="text-[9px] text-zinc-500 mt-1">
              Predictions
            </p>
            <p className="text-xs font-black mt-1">
              Play
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-3 text-center">
            <div className="text-lg">🏆</div>
            <p className="text-[9px] text-zinc-500 mt-1">
              Rankings
            </p>
            <p className="text-xs font-black mt-1">
              Compete
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-3 text-center">
            <div className="text-lg">🎁</div>
            <p className="text-[9px] text-zinc-500 mt-1">
              Rewards
            </p>
            <p className="text-xs font-black mt-1">
              Earn
            </p>
          </div>

        </div>


        {/* MAIN FEATURES */}
        <div className="grid grid-cols-2 gap-3">

          <Link
            href="/arena/leaderboard"
            className="group rounded-3xl border border-zinc-800 bg-[#111113] p-4 active:scale-[0.98] transition"
          >

            <div className="w-11 h-11 rounded-2xl bg-yellow-400/10 border border-yellow-400/10 flex items-center justify-center text-xl group-hover:scale-105 transition">
              🏆
            </div>

            <h3 className="text-sm font-black mt-4">
              Leaderboard
            </h3>

            <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
              See who's dominating Arena+
            </p>

            <p className="text-[9px] text-yellow-400 font-black mt-4">
              VIEW RANKINGS →
            </p>

          </Link>


          <Link
            href="/arena/rewards"
            className="group rounded-3xl border border-zinc-800 bg-[#111113] p-4 active:scale-[0.98] transition"
          >

            <div className="w-11 h-11 rounded-2xl bg-yellow-400/10 border border-yellow-400/10 flex items-center justify-center text-xl group-hover:scale-105 transition">
              🎁
            </div>

            <h3 className="text-sm font-black mt-4">
              Rewards
            </h3>

            <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
              Track and claim your wins
            </p>

            <p className="text-[9px] text-yellow-400 font-black mt-4">
              VIEW REWARDS →
            </p>

          </Link>

        </div>


        {/* DAILY CHALLENGE */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#111113] p-5">

          <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-yellow-400/5 blur-2xl" />

          <div className="relative">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-yellow-400">
                  Daily Challenge
                </p>

                <h2 className="text-lg font-black mt-1">
                  Build your streak 🔥
                </h2>
              </div>

              <div className="text-2xl">
                🔥
              </div>

            </div>

            <p className="text-[10px] text-zinc-500 mt-3 leading-relaxed">
              Make accurate predictions consistently and keep climbing the Arena+ rankings.
            </p>

            <div className="mt-4 flex items-center gap-2">

              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[35%] rounded-full bg-yellow-400" />
              </div>

              <span className="text-[9px] font-black text-yellow-400">
                ACTIVE
              </span>

            </div>

          </div>
        </div>


        {/* HOW IT WORKS */}
        <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-5">

          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-500">
            Arena+
          </p>

          <h2 className="text-lg font-black mt-1">
            How it works
          </h2>

          <div className="mt-4 space-y-3">

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                1
              </div>

              <div>
                <p className="text-xs font-bold">
                  Make your prediction
                </p>
                <p className="text-[9px] text-zinc-500">
                  Pick your football outcomes
                </p>
              </div>
            </div>


            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                2
              </div>

              <div>
                <p className="text-xs font-bold">
                  Earn points
                </p>
                <p className="text-[9px] text-zinc-500">
                  Accurate predictions move you up
                </p>
              </div>
            </div>


            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                3
              </div>

              <div>
                <p className="text-xs font-bold">
                  Climb & earn
                </p>
                <p className="text-[9px] text-zinc-500">
                  Compete for Arena+ rewards
                </p>
              </div>
            </div>

          </div>

        </div>


        <Link
          href="/dashboard"
          className="block text-center text-zinc-500 text-xs py-2"
        >
          ← Dashboard
        </Link>

      </div>

      <BottomNav />

    </main>
  )

}
