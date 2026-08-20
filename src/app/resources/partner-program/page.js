import Link from "next/link";

export const metadata = {
  title: "AlphaBot Partner Program | Partner With AlphaBot",
  description:
    "Learn about the AlphaBot Partner Program, how partners can refer users, track referrals and earn from eligible referral activity.",
};

export default function PartnerProgramPage() {
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
          AlphaBot Partners
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          AlphaBot Partner Program
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Partner with AlphaBot, introduce new users to the platform and
          earn from eligible referral activity.
        </p>

      </section>


      {/* INTRO */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🤝
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            What is the AlphaBot Partner Program?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            The AlphaBot Partner Program is designed for people, creators,
            communities and publishers who want to introduce AlphaBot to
            their audience.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Partners receive a referral link that can be shared with
            interested users. Referral activity is tracked through the
            AlphaBot partner system.
          </p>

        </article>

      </section>


      {/* HOW IT WORKS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          How the partnership works
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
              1
            </div>

            <h3 className="font-black text-lg mt-4">
              Become a partner
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Register through the AlphaBot partner system.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
              2
            </div>

            <h3 className="font-black text-lg mt-4">
              Get your link
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Receive your unique partner referral link.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
              3
            </div>

            <h3 className="font-black text-lg mt-4">
              Share it
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Place your link where your audience can discover AlphaBot.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
              4
            </div>

            <h3 className="font-black text-lg mt-4">
              Track & earn
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Monitor eligible referrals and partner earnings from your
              dashboard.
            </p>

          </div>

        </div>

      </section>


      {/* WHO CAN JOIN */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Built for partners
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Who can become a partner?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            The program can be useful for people and communities with an
            audience interested in data, airtime, VTU services and digital
            products.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">📝 Bloggers & publishers</p>
              <p className="text-xs text-zinc-500 mt-2">
                Share AlphaBot with readers who are interested in digital
                services.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">📱 Content creators</p>
              <p className="text-xs text-zinc-500 mt-2">
                Introduce AlphaBot to your social audience.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">👥 Communities</p>
              <p className="text-xs text-zinc-500 mt-2">
                Help members discover useful digital services.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">🚀 Digital entrepreneurs</p>
              <p className="text-xs text-zinc-500 mt-2">
                Build an additional income opportunity around your audience.
              </p>
            </div>

          </div>

        </article>

      </section>


      {/* BENEFITS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          Partner benefits
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-2xl">🔗</div>

            <h3 className="font-black text-lg mt-4">
              Unique referral link
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Your referrals can be associated with your unique partner
              link.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-2xl">📊</div>

            <h3 className="font-black text-lg mt-4">
              Referral tracking
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Monitor referral activity through the partner dashboard.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-2xl">💰</div>

            <h3 className="font-black text-lg mt-4">
              Partner earnings
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Eligible partner referrals can generate earnings according
              to the current partner terms.
            </p>
          </div>

        </div>

      </section>


      {/* IMPORTANT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            ℹ️
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Partner terms can change
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Partner commission rates, eligibility requirements, payout
            schedules and other program conditions are determined by the
            current AlphaBot partner terms. Check the partner dashboard
            for the latest information.
          </p>

          <Link
            href="/partner"
            className="inline-flex mt-5 text-sm font-bold text-zinc-200 hover:text-white"
          >
            Visit Partner Program →
          </Link>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Become an AlphaBot partner
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Join the partner program and start introducing AlphaBot to
            your audience.
          </p>

          <Link
            href="/partner/register"
            className="inline-flex mt-6 bg-white text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Become a Partner
          </Link>

        </div>

      </section>


      {/* NAVIGATION */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/referral-program"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Referral Program
          </Link>

          <Link
            href="/resources/alphabot-coins"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: AlphaBot Coins →
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
