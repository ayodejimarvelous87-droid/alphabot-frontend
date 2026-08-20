import Link from "next/link";

export const metadata = {
  title: "AlphaBot Leaderboards & Rewards | Rankings & Prizes",
  description:
    "Explore AlphaBot leaderboards, user rankings, competitions and rewards. Track your activity, compete with other users and see how rewards are earned.",
  keywords: [
    "AlphaBot leaderboard",
    "AlphaBot leaderboards",
    "AlphaBot rankings",
    "AlphaBot rewards",
    "user leaderboard Nigeria",
    "competition leaderboard",
    "online rankings",
    "leaderboard prizes",
    "AlphaBot competitions",
  ],
};

export default function LeaderboardsRewardsPage() {
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
          AlphaBot Community
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          Leaderboards & Rewards
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Track activity, compare rankings, compete with other users and
          discover rewards available through AlphaBot events and competitions.
        </p>

        <Link
          href="/arena/leaderboard"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          View Leaderboard
        </Link>

      </section>


      {/* WHAT ARE LEADERBOARDS */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            What are AlphaBot leaderboards?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot leaderboards show rankings based on the activity or
            criteria defined for a particular event, competition or feature.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Rankings can change as users participate, making the leaderboard
            a way to follow progress throughout an active event.
          </p>

        </article>

      </section>


      {/* LEADERBOARD TYPES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          Different ways to rank
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              📈
            </div>

            <h3 className="text-xl font-black mt-4">
              Activity
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Some events can rank users according to their eligible activity
              during the competition period.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              🏆
            </div>

            <h3 className="text-xl font-black mt-4">
              Competition Results
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Competition leaderboards can show the users or teams currently
              leading an active challenge.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              👥
            </div>

            <h3 className="text-xl font-black mt-4">
              Team Rankings
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Team-based events can rank participating teams according to
              their collective progress.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              🎯
            </div>

            <h3 className="text-xl font-black mt-4">
              Event Goals
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Special events may use their own scoring system and targets to
              determine rankings.
            </p>

          </div>

        </div>

      </section>


      {/* REWARDS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Rewards
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Compete for available rewards
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Some AlphaBot competitions and events offer rewards to eligible
            winners or participants. The reward, eligibility requirements
            and distribution method depend on the specific event.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mt-6">

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">🎁</div>
              <h3 className="font-bold mt-3">
                Event Rewards
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Rewards defined by individual events.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">🪙</div>
              <h3 className="font-bold mt-3">
                AlphaBot Coins
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Some activities may reward AlphaBot Coins.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">🏅</div>
              <h3 className="font-bold mt-3">
                Competition Prizes
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Eligible competitions can have specific prizes.
              </p>
            </div>

          </div>

        </article>

      </section>


      {/* IMPORTANT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl font-black">
            Check the rules before participating
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Every competition can have different rules, scoring methods,
            deadlines and eligibility requirements. Always check the active
            event information before taking part.
          </p>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to climb the rankings?
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Join AlphaBot and explore available competitions, events and
            community activities.
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
            href="/resources/team-rush"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Team Rush
          </Link>

          <Link
            href="/resources/alphabot-api"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: AlphaBot API →
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
