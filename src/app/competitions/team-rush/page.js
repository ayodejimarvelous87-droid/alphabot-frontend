"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function TeamRush() {

  const API = "https://api.alphabothq.com";

  const [competition, setCompetition] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadTeamRush = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API}/events/team-rush`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message || "Unable to load Team Rush"
          );
        }

        setCompetition(data);
        setSelectedTeam(data.selectedTeam || null);

      } catch (err) {

        console.error(err);
        setError(err.message || "Unable to load Team Rush");

      } finally {

        setLoading(false);

      }

    };

    loadTeamRush();

  }, []);


  const joinTeam = async (team) => {

    if (selectedTeam || joining) {
      return;
    }

    setJoining(true);
    setError("");

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API}/events/team-rush/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ team })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || "Unable to join team"
        );
      }

      /*
       * Once the backend accepts the selection,
       * the user is permanently locked to this team.
       */
      setSelectedTeam(data.team);

      /*
       * Reload the event so the newly selected team
       * gets its real member count and progress.
       */
      const refresh = await fetch(
        `${API}/events/team-rush`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const refreshedData = await refresh.json();

      if (refresh.ok) {
        setCompetition(refreshedData);
        setSelectedTeam(refreshedData.selectedTeam || data.team);
      }

    } catch (err) {

      console.error(err);
      setError(err.message || "Unable to join team");

    } finally {

      setJoining(false);

    }

  };


  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white flex items-center justify-center">
        <p className="text-sm font-black">
          Loading Team Rush...
        </p>
      </main>
    );
  }


  if (error || !competition) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white px-4 py-6">
        <div className="max-w-md mx-auto text-center mt-20">
          <div className="text-4xl">⚡</div>

          <p className="font-black mt-4">
            {error || "No active Team Rush"}
          </p>

          <Link
            href="/competitions"
            className="inline-block mt-5 px-5 py-3 rounded-xl bg-yellow-400 text-black font-black"
          >
            Back to Competitions
          </Link>
        </div>

        <BottomNav />
      </main>
    );
  }


  const teamNumbers = {
    alpha: competition.alphaMembers,
    beta: competition.betaMembers
  };


  const selectedNumber =
    selectedTeam
      ? teamNumbers[selectedTeam]
      : null;

  const alphaProgress = Number(competition.alphaProgress || 0);
  const betaProgress = Number(competition.betaProgress || 0);

  const now = Date.now();
  const startsAt = new Date(competition.startsAt).getTime();
  const endsAt = new Date(competition.endsAt).getTime();

  const eventState =
    now < startsAt
      ? "upcoming"
      : now < endsAt
      ? "active"
      : "ended";


  const getCountdown = () => {

    const difference =
      new Date(competition.endsAt).getTime() - Date.now();

    if (difference <= 0) {
      return "00d 00h 00m 00s";
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


  return (
    <main className="
    min-h-screen
    bg-white
    text-black
    dark:bg-[#050505]
    dark:text-white
    px-4
    py-6
    pb-28
    ">

      <div className="max-w-md mx-auto">


        {/* HEADER */}

        <header className="flex items-center gap-3">

          <Link
            href="/competitions"
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

            <p className="
            text-[10px]
            font-black
            tracking-[0.2em]
            text-yellow-500
            uppercase
            ">
              Competition
            </p>

            <h1 className="text-lg font-black">
              Team Rush
            </h1>

          </div>

        </header>



        {/* COMPETITION HEADER */}

        <section className="mt-7">

          <div className="text-center">

            <p className="
            text-[10px]
            font-black
            tracking-[0.25em]
            text-yellow-500
            uppercase
            ">
              Team Competition
            </p>

            <h2 className="
            text-3xl
            font-black
            mt-2
            tracking-tight
            ">
              TEAM RUSH
            </h2>

            <p className="
            text-xs
            text-zinc-500
            dark:text-zinc-400
            mt-2
            max-w-sm
            mx-auto
            leading-relaxed
            ">
              Choose a side and help your team reach the target.
            </p>

          </div>


          {/* COMPETITION INFO */}

          <div className="
          mt-5
          rounded-2xl
          overflow-hidden
          border
          border-zinc-200
          dark:border-zinc-800
          bg-zinc-50
          dark:bg-[#111111]
          ">

            <div className="grid grid-cols-2">

              <div className="
              p-3
              border-r
              border-b
              border-zinc-200
              dark:border-zinc-800
              ">

                <p className="
                text-[9px]
                font-black
                tracking-wider
                text-zinc-400
                uppercase
                ">
                  Reward
                </p>

                <p className="
                text-sm
                font-black
                text-yellow-500
                mt-1
                ">
                  {competition.reward}
                </p>

              </div>


              <div className="
              p-3
              border-b
              border-zinc-200
              dark:border-zinc-800
              ">

                <p className="
                text-[9px]
                font-black
                tracking-wider
                text-zinc-400
                uppercase
                ">
                  First Team To Get To
                </p>

                <p className="
                text-sm
                font-black
                mt-1
                ">
                  {Number(competition.target).toLocaleString()}
                </p>

              </div>


              <div className="
              p-3
              border-r
              border-zinc-200
              dark:border-zinc-800
              ">

                <p className="
                text-[9px]
                font-black
                tracking-wider
                text-zinc-400
                uppercase
                ">
                  Countdown
                </p>

                <p className="
                text-sm
                font-black
                mt-1
                tabular-nums
                ">
                  {getCountdown()}
                </p>

              </div>


              <div className="p-3">

                <p className="
                text-[9px]
                font-black
                tracking-wider
                text-zinc-400
                uppercase
                ">
                  Ends
                </p>

                <p className="
                text-xs
                font-black
                mt-1
                ">
                  {new Date(competition.endsAt).toLocaleDateString(
                    "en-NG",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    }
                  )}
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* TITLE */}

        <section className="text-center mt-6">

          <p className="
          text-[10px]
          font-black
          tracking-[0.25em]
          text-yellow-500
          uppercase
          ">
            Choose your side
          </p>

          <h2 className="
          text-3xl
          font-black
          mt-2
          tracking-tight
          ">
            TEAM RUSH
          </h2>

          <p className="
          text-xs
          text-zinc-500
          dark:text-zinc-400
          mt-2
          max-w-sm
          mx-auto
          leading-relaxed
          ">
            Pick a team and help them reach the target.
            Your team needs you.
          </p>

        </section>



        {/* TEAM MATCHUP */}

        <section className="
        relative
        mt-6
        rounded-3xl
        overflow-hidden
        border
        border-zinc-200
        dark:border-zinc-800
        bg-white
        dark:bg-[#101010]
        p-4
        ">

          <div className="
          absolute
          inset-0
          bg-gradient-to-r
          from-yellow-400/[0.05]
          via-transparent
          to-yellow-400/[0.05]
          pointer-events-none
          " />


          <div className="
          relative
          flex
          items-center
          justify-between
          gap-2
          ">


            {/* ALPHA */}

            <button
              onClick={() => {
                if (!selectedTeam) joinTeam("alpha");
              }}
              disabled={!!selectedTeam}
              className={`
              flex-1
              rounded-2xl
              p-4
              border
              transition-all
              active:scale-95
              ${
                selectedTeam === "alpha"
                  ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/10"
                  : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#151515]"
              }
              `}
            >

              <div className="text-2xl">
                🅰️
              </div>

              <p className="
              text-lg
              font-black
              mt-2
              ">
                ALPHA
              </p>

              <p className="
              text-[9px]
              text-zinc-400
              font-bold
              uppercase
              tracking-wider
              mt-1
              ">
                {teamNumbers.alpha !== null
                  ? `${Number(teamNumbers.alpha).toLocaleString()} members`
                  : "Members hidden"}
              </p>

            </button>



            {/* FLASH VS */}

            <div className="
            relative
            shrink-0
            w-14
            h-14
            flex
            items-center
            justify-center
            ">

              <div className="
              absolute
              inset-0
              rounded-full
              bg-yellow-400/20
              blur-xl
              animate-pulse
              " />

              <div className="
              relative
              w-11
              h-11
              rounded-full
              bg-yellow-400
              text-black
              flex
              items-center
              justify-center
              font-black
              text-xs
              shadow-[0_0_25px_rgba(250,204,21,0.35)]
              ">
                <span className="text-base">
                  ⚡
                </span>
              </div>

              <span className="
              absolute
              text-[8px]
              font-black
              -bottom-2
              text-yellow-500
              tracking-widest
              ">
                VS
              </span>

            </div>



            {/* BETA */}

            <button
              onClick={() => {
                if (!selectedTeam) joinTeam("beta");
              }}
              disabled={!!selectedTeam}
              className={`
              flex-1
              rounded-2xl
              p-4
              border
              transition-all
              active:scale-95
              ${
                selectedTeam === "beta"
                  ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/10"
                  : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#151515]"
              }
              `}
            >

              <div className="text-2xl">
                🅱️
              </div>

              <p className="
              text-lg
              font-black
              mt-2
              ">
                BETA
              </p>

              <p className="
              text-[9px]
              text-zinc-400
              font-bold
              uppercase
              tracking-wider
              mt-1
              ">
                {teamNumbers.beta !== null
                  ? `${Number(teamNumbers.beta).toLocaleString()} members`
                  : "Members hidden"}
              </p>

            </button>

          </div>

        </section>



        {/* SELECTED TEAM */}

        {selectedTeam && (

          <section className="
          mt-4
          rounded-2xl
          bg-yellow-400/10
          border
          border-yellow-400/20
          p-4
          ">

            <div className="flex items-center justify-between">

              <div>

                <p className="
                text-[9px]
                font-black
                tracking-wider
                text-yellow-500
                uppercase
                ">
                  Your team
                </p>

                <p className="text-lg font-black mt-1">
                  {selectedTeam === "alpha" ? "ALPHA" : "BETA"}
                </p>

              </div>

              <div className="text-right">

                <p className="
                text-[9px]
                text-zinc-400
                font-bold
                uppercase
                ">
                  Current members
                </p>

                <p className="
                text-lg
                font-black
                text-yellow-500
                tabular-nums
                ">
                  {selectedNumber.toLocaleString()}
                </p>

              </div>

            </div>

          </section>

        )}



        {/* PROGRESS */}

        {selectedTeam && (

          <section className="
          mt-4
          rounded-3xl
          bg-zinc-50
          dark:bg-[#101010]
          border
          border-zinc-200
          dark:border-zinc-800
          p-4
          ">

            <div className="flex items-center justify-between">

              <div>

                <p className="
                text-[9px]
                font-black
                tracking-wider
                text-zinc-400
                uppercase
                ">
                  Team Rush
                </p>

                <p className="text-sm font-black mt-1">
                  Race to the target
                </p>

              </div>

              <span className="
              text-[9px]
              font-black
              text-yellow-500
              uppercase
              ">
                {eventState === "active"
                  ? "Live"
                  : eventState === "upcoming"
                  ? "Upcoming"
                  : "Ended"}
              </span>

            </div>


            <div className="mt-4">

              <div className="
              h-2
              rounded-full
              bg-zinc-200
              dark:bg-zinc-800
              overflow-hidden
              ">

                <div
                  className="
                  h-full
                  rounded-full
                  bg-yellow-400
                  "
                  style={{
                    width: `${
                      selectedTeam === "alpha"
                        ? Math.min(100, alphaProgress)
                        : Math.min(100, betaProgress)
                    }%`
                  }}
                />

              </div>

            </div>

          </section>

        )}



        {/* INFO */}

        <section className="
        mt-4
        rounded-3xl
        bg-white
        dark:bg-[#101010]
        border
        border-zinc-200
        dark:border-zinc-800
        p-4
        ">

          <p className="
          text-[9px]
          font-black
          tracking-[0.2em]
          text-yellow-500
          uppercase
          ">
            How it works
          </p>

          <div className="space-y-3 mt-3">

            <div className="flex gap-3">

              <span className="text-sm">
                1️⃣
              </span>

              <p className="
              text-xs
              text-zinc-500
              dark:text-zinc-400
              leading-relaxed
              ">
                Choose Alpha or Beta.
              </p>

            </div>

            <div className="flex gap-3">

              <span className="text-sm">
                2️⃣
              </span>

              <p className="
              text-xs
              text-zinc-500
              dark:text-zinc-400
              leading-relaxed
              ">
                After choosing, you can see your team's current number.
              </p>

            </div>

            <div className="flex gap-3">

              <span className="text-sm">
                3️⃣
              </span>

              <p className="
              text-xs
              text-zinc-500
              dark:text-zinc-400
              leading-relaxed
              ">
                Help your team reach the competition target.
              </p>

            </div>

          </div>

        </section>



        {/* STATUS */}

        <div className="
        mt-4
        text-center
        text-[10px]
        text-zinc-400
        ">
          {eventState === "active"
            ? "Team Rush is currently active"
            : eventState === "upcoming"
            ? "Team Rush has not started yet"
            : "Team Rush has ended"}
        </div>

      </div>

      <BottomNav />

    </main>
  );
}
