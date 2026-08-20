import Link from "next/link";

export const metadata = {
  title: "AlphaBot Competitions | Challenges, Teams & Rewards",
  description:
    "Explore AlphaBot competitions, challenges, team events, leaderboards and rewards. Join challenges, compete with other users and earn rewards.",
  keywords: [
    "AlphaBot competitions",
    "online competitions Nigeria",
    "AlphaBot challenges",
    "team competitions",
    "user competitions",
    "competition rewards",
    "AlphaBot team events",
    "leaderboard competitions",
    "AlphaBot rewards",
  ],
};

export default function CompetitionsPage() {
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
          AlphaBot Competitions
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Take part in AlphaBot challenges, compete with other users,
          climb leaderboards and earn available rewards.
        </p>

        <Link
          href="/competitions"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          View Competitions
        </Link>

      </section>


      {/* WHAT ARE COMPETITIONS */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            What are AlphaBot competitions?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot competitions are organised challenges that give users
            opportunities to participate in activities and compete based on
            defined goals or performance.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Competitions may be based on activity, participation, teams,
            purchases or other criteria depending on the event.
          </p>

        </article>

      </section>


      {/* FEATURES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              🏆
            </div>

            <h2 className="text-xl font-black mt-4">
              Challenges
            </h2>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Participate in different challenges and work towards the goals
              defined for each competition.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              👥
            </div>

            <h2 className="text-xl font-black mt-4">
              Team Events
            </h2>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Some competitions can allow users to work together as teams
              towards a shared target.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              📊
            </div>

            <h2 className="text-xl font-black mt-4">
              Leaderboards
            </h2>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Track competition progress and see how participants rank
              against one another.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              🎁
            </div>

            <h2 className="text-xl font-black mt-4">
              Rewards
            </h2>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Eligible winners or participants may receive rewards specified
              by the individual competition.
            </p>

          </div>

        </div>

      </section>


      {/* TEAM RUSH */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Featured Competition
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Team Rush
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Team Rush is a team-based AlphaBot competition where users join
            teams and work together towards a shared target within the
            competition period.
          </p>

          <Link
            href="/competitions/team-rush"
            className="inline-flex mt-6 text-sm font-bold text-zinc-200 hover:text-white"
          >
            Learn about Team Rush →
          </Link>

        </article>

      </section>


      {/* PARTICIPATION */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            How to participate
          </h2>

          <div className="space-y-6 mt-6">

            <div>
              <h3 className="font-bold">
                1. Check active competitions
              </h3>

              <p className="text-sm text-zinc-500 mt-2 leading-6">
                Visit the competitions section to see events currently
                available to users.
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                2. Read the rules
              </h3>

              <p className="text-sm text-zinc-500 mt-2 leading-6">
                Each competition can have its own requirements, duration,
                scoring system and rewards.
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                3. Participate
              </h3>

              <p className="text-sm text-zinc-500 mt-2 leading-6">
                Complete the activities required by the competition.
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                4. Track your progress
              </h3>

              <p className="text-sm text-zinc-500 mt-2 leading-6">
                Follow your position and competition progress through the
                available rankings.
              </p>
            </div>

          </div>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to compete?
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Join AlphaBot and explore available competitions and community
            activities.
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
            href="/resources/football-arena"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Football Arena
          </Link>

          <Link
            href="/resources/team-rush"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Team Rush →
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
