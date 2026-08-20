import Link from "next/link";

export const metadata = {
  title: "Football Arena | AlphaBot Football Experience",
  description:
    "Explore the AlphaBot Football Arena, football features, rankings, discussions, rewards and competitions.",
};

export default function FootballArenaPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <nav className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-700 flex items-center justify-center">
            <span className="text-xl font-black bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              A
            </span>
          </div>
          <span className="text-xl font-bold">AlphaBot</span>
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
          AlphaBot Arena
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          Football Arena
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Follow football, compete with other users, climb the rankings and
          take part in the growing AlphaBot football experience.
        </p>

        <Link
          href="/arena"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Enter AlphaBot Arena
        </Link>

      </section>


      {/* INTRO */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            More than watching football
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot Arena is designed to bring football and community
            features together. Users can explore football-related experiences
            while participating in activities, rankings and competitions.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            The Arena is part of AlphaBot's wider ecosystem, giving users
            another way to interact with the platform beyond digital services.
          </p>

        </article>

      </section>


      {/* FEATURES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-3xl">⚽</div>
            <h2 className="text-xl font-black mt-4">
              Football Experience
            </h2>
            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Explore football-focused features and stay connected with the
              AlphaBot football community.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-3xl">🏆</div>
            <h2 className="text-xl font-black mt-4">
              Competitions
            </h2>
            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Participate in AlphaBot competitions and activities where
              available.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-3xl">📊</div>
            <h2 className="text-xl font-black mt-4">
              Leaderboards
            </h2>
            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Track rankings and see how active users compare within supported
              AlphaBot activities.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-3xl">🎁</div>
            <h2 className="text-xl font-black mt-4">
              Rewards
            </h2>
            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Eligible activities may include rewards, events and other
              incentives.
            </p>
          </div>

        </div>

      </section>


      {/* COMMUNITY */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Football Community
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Compete, interact and climb
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            The AlphaBot Arena combines football with social and competitive
            experiences. Depending on the current features available, users
            can participate in discussions, competitions and rankings.
          </p>

          <Link
            href="/arena/leaderboard"
            className="inline-flex mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            View Leaderboard
          </Link>

        </article>

      </section>


      {/* COMPETITIONS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            AlphaBot competitions
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot competitions give users opportunities to participate in
            organised challenges and compete for available rewards.
          </p>

          <Link
            href="/competitions"
            className="inline-flex mt-6 text-sm font-bold text-zinc-200 hover:text-white"
          >
            Explore competitions →
          </Link>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to enter the Arena?
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Join AlphaBot and explore the football experience, competitions
            and community features.
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
            href="/resources/tv-subscription-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: TV Subscription in Nigeria
          </Link>

          <Link
            href="/resources/competitions"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: AlphaBot Competitions →
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
