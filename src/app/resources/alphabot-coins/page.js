import Link from "next/link";

export const metadata = {
  title: "AlphaBot Coins | What Are AlphaBot Coins?",
  description:
    "Learn what AlphaBot Coins are, how they work, and how coins may be earned and used within the AlphaBot platform.",
};

export default function AlphaBotCoinsPage() {
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
          AlphaBot Coins
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Discover AlphaBot Coins and learn how coins can be earned through
          eligible activities and rewards on the platform.
        </p>

      </section>


      {/* INTRO */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-4xl">
            🪙
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            What are AlphaBot Coins?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot Coins are reward points associated with eligible
            activities on the AlphaBot platform.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            They are designed to make participation in selected AlphaBot
            activities more rewarding and engaging.
          </p>

        </article>

      </section>


      {/* HOW COINS CAN BE EARNED */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          How can you earn AlphaBot Coins?
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
              Eligible competitions and events may award AlphaBot Coins
              to qualifying participants.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              🎯
            </div>

            <h3 className="font-black text-xl mt-4">
              Events
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Selected AlphaBot events may include Coins as part of their
              rewards.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              ⚡
            </div>

            <h3 className="font-black text-xl mt-4">
              Active participation
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Some activities may reward users for qualifying levels of
              participation or activity.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              🎁
            </div>

            <h3 className="font-black text-xl mt-4">
              Special rewards
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              AlphaBot may offer special promotions or rewards involving
              Coins from time to time.
            </p>

          </div>

        </div>

      </section>


      {/* IMPORTANT INFO */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Important
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Coin rules depend on the activity
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            The number of Coins awarded, eligibility requirements,
            expiration rules and any available uses may differ between
            events, competitions and promotions.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Always check the specific rules of an activity before
            participating.
          </p>

        </article>

      </section>


      {/* COINS VS MONEY */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            💡
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Are AlphaBot Coins real money?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot Coins are reward points and should not automatically
            be treated as cash or a wallet balance.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Any conversion, redemption or use of Coins is subject to the
            rules of the relevant AlphaBot feature or promotion.
          </p>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Start exploring AlphaBot
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Discover competitions, events, rewards and other activities
            available on AlphaBot.
          </p>

          <Link
            href="/coins"
            className="inline-flex mt-6 bg-white text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            View AlphaBot Coins
          </Link>

        </div>

      </section>


      {/* NAVIGATION */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/partner-program"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Partner Program
          </Link>

          <Link
            href="/resources/rewards"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: AlphaBot Rewards →
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
