"use client";

import Link from "next/link";

const redFlags = [
  "Guaranteed profits or returns with little or no risk.",
  "Someone pressures you to invest immediately.",
  "You are told to keep the investment secret from family or friends.",
  "A stranger contacts you through WhatsApp, Instagram, Telegram or another social platform with an investment opportunity.",
  "You are asked to send cryptocurrency to a personal wallet before you can receive your profits.",
  "The platform shows profits but requires another payment before you can withdraw.",
  "You are asked to pay 'tax', 'verification', 'unlocking' or 'processing' fees to access your money.",
  "The person refuses to clearly explain where your money is being invested.",
];

const safetyRules = [
  "Never invest because someone is pressuring you.",
  "Research the company, platform and people behind the opportunity independently.",
  "Do not trust screenshots showing profits as proof that an investment is legitimate.",
  "Never share your AlphaBot password, PIN, OTP or authentication codes with an investor or broker.",
  "Be extremely careful with cryptocurrency transfers because completed blockchain transactions may be difficult or impossible to reverse.",
  "Only use financial services and investment platforms that you can independently verify.",
];

export default function InvestmentScams() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        <Link
          href="/settings/education"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Security Education
        </Link>

        <div className="mt-7">

          <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-2xl">
            💰
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Scam Awareness
          </p>

          <h1 className="text-3xl font-black mt-2">
            Investment & Crypto Scams
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Scammers often use the promise of fast profits, cryptocurrency
            and exclusive investment opportunities to convince people to send
            them money.
          </p>

        </div>


        {/* IMPORTANT */}

        <div className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-600 dark:text-red-400">
            🚨 Remember
          </p>

          <p className="text-sm text-red-700 dark:text-red-300 mt-2 leading-6">
            No legitimate investment can honestly guarantee high returns
            without risk. If someone promises guaranteed profits, treat it as
            a major warning sign.
          </p>

        </div>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How the scam usually works
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "The approach", "A stranger or fake investment company contacts you with an attractive opportunity."],
              ["2", "The promise", "They show impressive returns and claim you can make money quickly."],
              ["3", "The deposit", "You are encouraged to send an initial amount of money or cryptocurrency."],
              ["4", "The fake profit", "A fake dashboard may show your investment increasing rapidly."],
              ["5", "The withdrawal trap", "When you try to withdraw, you are asked for additional fees or payments."],
              ["6", "The loss", "After receiving more money, the scammer may disappear or demand even more."],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="flex gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181B]"
              >

                <span className="w-9 h-9 shrink-0 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-black">
                  {number}
                </span>

                <div>
                  <p className="font-bold">
                    {title}
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-5">
                    {description}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </section>


        {/* RED FLAGS */}

        <section className="mt-9">

          <h2 className="text-xl font-black">
            🚩 Warning signs
          </h2>

          <div className="mt-4 space-y-2">

            {redFlags.map((item, index) => (

              <div
                key={index}
                className="flex gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <span className="text-red-500 font-black">
                  •
                </span>

                <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* CRYPTO */}

        <section className="mt-9">

          <h2 className="text-xl font-black">
            ₿ Be especially careful with crypto
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

            <p className="text-sm text-yellow-800 dark:text-yellow-300 leading-6">
              Cryptocurrency can be useful, but scammers also use it because
              transfers can be difficult to reverse. Never send cryptocurrency
              simply because someone claims that you need to do so to unlock
              profits, verify your account or receive a reward.
            </p>

          </div>

        </section>


        {/* PROTECT YOURSELF */}

        <section className="mt-9">

          <h2 className="text-xl font-black">
            🛡️ Protect yourself
          </h2>

          <div className="mt-4 space-y-2">

            {safetyRules.map((item, index) => (

              <div
                key={index}
                className="flex gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <span className="text-green-500 font-black">
                  ✓
                </span>

                <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* ALPHABOT SECURITY */}

        <section className="mt-9">

          <h2 className="text-xl font-black">
            🔐 Protect your AlphaBot account
          </h2>

          <div className="mt-4 p-5 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800">

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6">
              AlphaBot will never need your password, transaction PIN, OTP
              or authenticator code to help you receive an investment or
              unlock profits. Keep these credentials private.
            </p>

          </div>

        </section>


        {/* BOTTOM */}

        <div className="mt-9 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">

          <p className="font-black">
            If an investment sounds too good to be true...
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Stop. Verify independently. Do not send money until you are
            confident that the opportunity is legitimate.
          </p>

        </div>


      </div>

    </main>
  );
}
