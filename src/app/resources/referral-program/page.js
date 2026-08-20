import Link from "next/link";

export const metadata = {
  title: "AlphaBot Referral Program | Earn From Referrals",
  description:
    "Learn how the AlphaBot referral program works, how referrals are tracked and how users can benefit from inviting others to AlphaBot.",
};

export default function ReferralProgramPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

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
          AlphaBot Referral Program
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Invite people to AlphaBot and benefit from the activity generated
          through your referral.
        </p>

      </section>


      {/* INTRO */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🚀
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            What is the referral program?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            The AlphaBot referral program allows users to invite new people
            to the platform using their personal referral link or code.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            When people join through your referral, their activity can be
            associated with your referral account according to the current
            AlphaBot referral terms.
          </p>

        </article>

      </section>


      {/* HOW IT WORKS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          How it works
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
              1
            </div>

            <h3 className="font-black text-xl mt-4">
              Get your link
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Access your AlphaBot referral link or referral code from
              your account.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
              2
            </div>

            <h3 className="font-black text-xl mt-4">
              Share it
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Share your referral link with friends, communities or
              people who may find AlphaBot useful.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
              3
            </div>

            <h3 className="font-black text-xl mt-4">
              Track your referrals
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Referral activity can be viewed through the available
              referral features in your account.
            </p>

          </div>

        </div>

      </section>


      {/* BENEFITS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Why participate?
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Grow with the AlphaBot community
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">👥</div>

              <h3 className="font-bold mt-3">
                Build your network
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Introduce useful digital services to people in your
                network.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">📊</div>

              <h3 className="font-bold mt-3">
                Track activity
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Use the referral tools available in your account to
                monitor your referral activity.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">🎁</div>

              <h3 className="font-bold mt-3">
                Referral benefits
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Eligible referrals may provide benefits according to
                AlphaBot's current referral terms.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">🚀</div>

              <h3 className="font-bold mt-3">
                Help AlphaBot grow
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Help more people discover AlphaBot and its digital
                services.
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
            Referral rewards can change
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Referral percentages, eligibility requirements, payout rules
            and other program conditions may change. Always check the
            current AlphaBot referral information before relying on a
            particular reward or benefit.
          </p>

          <Link
            href="/referral"
            className="inline-flex mt-5 text-sm font-bold text-zinc-200 hover:text-white"
          >
            Open Referral Program →
          </Link>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to start referring?
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Create an AlphaBot account and start sharing your referral
            link with your network.
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
            href="/resources/wallet-security"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Wallet Security
          </Link>

          <Link
            href="/resources/partner-program"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Partner Program →
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
