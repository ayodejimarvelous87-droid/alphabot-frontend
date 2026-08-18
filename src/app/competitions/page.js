"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Competitions() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-4 py-6 pb-24">

      <div className="max-w-md mx-auto">

        {/* HEADER */}

        <header className="flex items-center gap-3">

          <Link
            href="/dashboard"
            className="
            w-10
            h-10
            rounded-xl
            bg-zinc-100
            dark:bg-[#151515]
            border
            border-zinc-200
            dark:border-zinc-800
            flex
            items-center
            justify-center
            text-lg
            "
          >
            ←
          </Link>

          <div>
            <p className="text-[10px] font-black tracking-[0.2em] text-yellow-500 uppercase">
              AlphaBot
            </p>

            <h1 className="text-lg font-black">
              Competitions
            </h1>
          </div>

        </header>


        {/* INTRO */}

        <section className="mt-6">

          <div className="
          rounded-3xl
          bg-yellow-400
          text-black
          p-5
          relative
          overflow-hidden
          ">

            <div className="
            absolute
            -right-10
            -top-10
            w-32
            h-32
            rounded-full
            bg-white/20
            blur-2xl
            "/>

            <div className="relative">

              <div className="text-3xl">
                🏆
              </div>

              <h2 className="text-2xl font-black mt-3">
                Compete. Pick. Win.
              </h2>

              <p className="text-xs font-semibold mt-2 max-w-sm leading-relaxed opacity-80">
                Explore AlphaBot competitions, choose where you want to compete
                and chase the rewards waiting for the winners.
              </p>

            </div>

          </div>

        </section>


        {/* COMPETITIONS */}

        <section className="mt-7">

          <p className="text-[10px] font-black tracking-[0.2em] text-yellow-500 uppercase">
            Explore
          </p>

          <h2 className="text-2xl font-black mt-1">
            Competitions
          </h2>


          {/* TEAM RUSH */}

          <Link
            href="/competitions/team-rush"
            className="
            block
            mt-4
            rounded-3xl
            border
            border-zinc-200
            dark:border-zinc-800
            bg-white
            dark:bg-[#101010]
            p-4
            active:scale-[0.99]
            transition-transform
            "
          >

            <div className="flex items-start gap-3">

              <div className="
              w-12
              h-12
              shrink-0
              rounded-2xl
              bg-yellow-400
              text-black
              flex
              items-center
              justify-center
              text-xl
              ">
                ⚡
              </div>

              <div className="flex-1 min-w-0">

                <div className="flex items-center justify-between gap-3">

                  <h3 className="font-black">
                    Team Rush
                  </h3>

                  <span className="text-yellow-500 font-black">
                    →
                  </span>

                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Pick a side, bring your team together and help Alpha or Beta
                  reach the target first.
                </p>

                <div className="flex gap-2 mt-3">

                  <span className="
                  px-2.5
                  py-1
                  rounded-full
                  bg-zinc-100
                  dark:bg-zinc-900
                  text-[9px]
                  font-black
                  ">
                    ALPHA
                  </span>

                  <span className="
                  px-2.5
                  py-1
                  rounded-full
                  bg-zinc-100
                  dark:bg-zinc-900
                  text-[9px]
                  font-black
                  ">
                    VS
                  </span>

                  <span className="
                  px-2.5
                  py-1
                  rounded-full
                  bg-zinc-100
                  dark:bg-zinc-900
                  text-[9px]
                  font-black
                  ">
                    BETA
                  </span>

                </div>

              </div>

            </div>

          </Link>


          {/* EVENTS */}

          <Link
            href="/events"
            className="
            block
            mt-3
            rounded-3xl
            border
            border-zinc-200
            dark:border-zinc-800
            bg-white
            dark:bg-[#101010]
            p-4
            active:scale-[0.99]
            transition-transform
            "
          >

            <div className="flex items-start gap-3">

              <div className="
              w-12
              h-12
              shrink-0
              rounded-2xl
              bg-zinc-100
              dark:bg-zinc-900
              border
              border-zinc-200
              dark:border-zinc-800
              flex
              items-center
              justify-center
              text-xl
              ">
                🎉
              </div>

              <div className="flex-1 min-w-0">

                <div className="flex items-center justify-between gap-3">

                  <h3 className="font-black">
                    Events
                  </h3>

                  <span className="text-yellow-500 font-black">
                    →
                  </span>

                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Join AlphaBot events, compete with other users and climb
                  the leaderboard.
                </p>

                <p className="text-[9px] font-black text-yellow-500 uppercase tracking-wider mt-3">
                  View active events
                </p>

              </div>

            </div>

          </Link>

        </section>

      </div>

      <BottomNav />

    </main>
  );
}
