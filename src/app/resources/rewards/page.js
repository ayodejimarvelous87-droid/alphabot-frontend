import Link from "next/link";

export const metadata = {
  title: "AlphaBot Rewards | Events, Competitions & User Rewards",
  description:
    "Learn about AlphaBot rewards, competitions, events and activities that can reward active users.",
};

export default function RewardsPage() {
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
          AlphaBot Rewards
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          AlphaBot Rewards
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Discover how AlphaBot rewards active users through events,
          competitions, challenges and other platform activities.
        </p>

      </section>


      {/* INTRO */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-4xl">
            🎁
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Rewards on AlphaBot
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot includes activities designed to make the platform
            more engaging for users. Depending on the activity, users may
            have opportunities to earn rewards for participation,
            achievement or ranking highly.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Rewards can vary from one event or competition to another,
            so each activity may have its own eligibility requirements
            and reward structure.
          </p>

        </article>

      </section>


      {/* TYPES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          Ways to earn rewards
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              🏆
            </div>

            <h3 className="font-black text-xl mt-4">
              Competitions
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Take part in AlphaBot competitions and qualify for rewards
              based on the rules of each competition.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              ⚡
            </div>

            <h3 className="font-black text-xl mt-4">
              Active user events
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Selected events may reward users who achieve the required
              level of activity within the event period.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              👥
            </div>

            <h3 className="font-black text-xl mt-4">
              Team challenges
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Team-based challenges can give users the opportunity to
              work together towards shared rewards.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              🪙
            </div>

            <h3 className="font-black text-xl mt-4">
              AlphaBot Coins
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Eligible activities may award AlphaBot Coins as part of
              their reward structure.
            </p>

          </div>

        </div>

      </section>


      {/* EXAMPLE REWARDS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Reward examples
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Rewards can take different forms
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Depending on the event or promotion, rewards may include
            AlphaBot Coins, data, account benefits or other prizes
            specified by AlphaBot.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mt-6">

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">📶</div>
              <p className="font-bold mt-3">Data rewards</p>
              <p className="text-xs text-zinc-500 mt-2">
                Eligible activities may offer data rewards.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">🪙</div>
              <p className="font-bold mt-3">AlphaBot Coins</p>
              <p className="text-xs text-zinc-500 mt-2">
                Qualifying activities may award Coins.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">🎁</div>
              <p className="font-bold mt-3">Special prizes</p>
              <p className="text-xs text-zinc-500 mt-2">
                Some events may have additional prizes.
              </p>
            </div>

          </div>

        </article>

      </section>


      {/* IMPORTANT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            ℹ️
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Check the rules for each event
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Reward amounts, eligibility, deadlines and other requirements
            are specific to each event or competition. Always review the
            official rules before participating.
          </p>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Explore AlphaBot activities
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Discover competitions, events, football and other ways to
            participate on AlphaBot.
          </p>

          <Link
            href="/events"
            className="inline-flex mt-6 bg-white text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Explore Events
          </Link>

        </div>

      </section>


      {/* NAVIGATION */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/alphabot-coins"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: AlphaBot Coins
          </Link>

          <Link
            href="/resources"
            className="text-zinc-400 hover:text-white transition"
          >
            Back to Resources →
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
