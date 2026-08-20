import Link from "next/link";

export const metadata = {
  title: "Team Rush | AlphaBot Team Competition & Rewards",
  description:
    "Discover AlphaBot Team Rush, a team-based competition where users join teams, grow their membership, track progress and compete for rewards.",
  keywords: [
    "AlphaBot Team Rush",
    "Team Rush competition",
    "team competition Nigeria",
    "AlphaBot team competition",
    "team challenge",
    "team rewards",
    "online team competition",
    "AlphaBot competitions",
    "AlphaBot rewards",
  ],
};

export default function TeamRushPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">

        <Link href="/" className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-700 flex items-center justify-center">
            <span className="text-xl font-black bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              A
            </span>
          </div>

          <span className="text-xl font-bold">
            AlphaBot
          </span>

        </Link>

        <div className="flex gap-5 text-sm text-zinc-400">

          <Link href="/resources" className="hover:text-white transition">
            Resources
          </Link>

          <Link href="/login" className="hover:text-white transition">
            Login
          </Link>

        </div>

      </nav>


      {/* HERO */}
      <section className="px-6 pt-16 pb-12 max-w-4xl mx-auto">

        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
          AlphaBot Competition
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          Team Rush
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Join a team, work together towards a shared target and compete
          against other AlphaBot teams.
        </p>

        <Link
          href="/competitions/team-rush"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Join Team Rush
        </Link>

      </section>


      {/* WHAT IS TEAM RUSH */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            What is Team Rush?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Team Rush is an AlphaBot team-based competition. Instead of
            competing alone, users join a team and contribute towards the
            team's overall progress.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            The team that reaches the required competition target first,
            or performs best according to the official rules, can win the
            available reward.
          </p>

        </article>

      </section>


      {/* HOW IT WORKS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          How Team Rush works
        </h2>

        <div className="space-y-4">

          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
            <div className="text-2xl">1️⃣</div>

            <h3 className="font-bold mt-3">
              Choose a team
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Select one of the available teams participating in the current
              Team Rush competition.
            </p>
          </div>


          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
            <div className="text-2xl">2️⃣</div>

            <h3 className="font-bold mt-3">
              Invite others
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Bring other AlphaBot users into your team so everyone can
              contribute towards the shared target.
            </p>
          </div>


          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
            <div className="text-2xl">3️⃣</div>

            <h3 className="font-bold mt-3">
              Build team progress
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Every eligible contribution increases your team's progress
              according to the rules of the active competition.
            </p>
          </div>


          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
            <div className="text-2xl">4️⃣</div>

            <h3 className="font-bold mt-3">
              Reach the target
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Keep pushing until your team reaches the competition target
              before the deadline.
            </p>
          </div>

        </div>

      </section>


      {/* TEAM GOAL */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Team Goal
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Everyone contributes
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Team Rush is designed around collective participation. Your team
            grows stronger as more eligible users join and contribute.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-[#111113] p-5">

            <div className="flex justify-between items-center gap-4">

              <span className="text-sm text-zinc-400">
                Competition target
              </span>

              <span className="font-black">
                Check active event
              </span>

            </div>

            <p className="text-xs text-zinc-600 mt-3">
              Targets, deadlines and rewards are determined by the active
              Team Rush competition.
            </p>

          </div>

        </article>

      </section>


      {/* REWARDS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              🏆
            </div>

            <h2 className="text-xl font-black mt-4">
              Team Victory
            </h2>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              The winning team receives the reward specified by the active
              competition.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              📊
            </div>

            <h2 className="text-xl font-black mt-4">
              Track Progress
            </h2>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Follow your team's position and progress through the available
              Team Rush rankings.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Pick your team and rush!
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Join AlphaBot and participate in the active Team Rush competition.
          </p>

          <Link
            href="/register"
            className="inline-flex mt-6 bg-white text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Get Started
          </Link>

        </div>

      </section>


      {/* NAVIGATION */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/competitions"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: AlphaBot Competitions
          </Link>

          <Link
            href="/resources/leaderboards-rewards"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Leaderboards & Rewards →
          </Link>

        </div>

      </section>


      <footer className="border-t border-zinc-800 px-6 py-10">

        <div className="max-w-4xl mx-auto text-xs text-zinc-600">
          © {new Date().getFullYear()} AlphaBot. All rights reserved.
        </div>

      </footer>

    </main>
  );
}
