"use client";

import Link from "next/link";

export default function PrizeScams() {
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
            🎁
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Common Scam
          </p>

          <h1 className="text-3xl font-black mt-2">
            Giveaway & Prize Scams
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Scammers may tell you that you have won money, a phone,
            cryptocurrency or another valuable prize to trick you into
            sending money or revealing sensitive information.
          </p>

        </div>


        <div className="mt-6 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">

          <p className="font-black text-red-600 dark:text-red-400">
            🚨 Remember
          </p>

          <p className="text-sm text-red-700 dark:text-red-300 mt-2 leading-6">
            If someone says you won a prize but asks you to pay money
            first, stop. This is a major warning sign.
          </p>

        </div>


        <section className="mt-8">

          <h2 className="text-xl font-black">
            Common warning signs
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["💸", "You must pay first", "You are asked to pay a release, processing, activation or delivery fee before receiving your prize."],
              ["⏰", "Urgent deadline", "You are told that you must act immediately or your prize will be cancelled."],
              ["🔐", "Sensitive information", "Someone asks for your password, OTP, transaction PIN or authenticator code."],
              ["🎭", "Fake identity", "The message appears to come from a celebrity, company, influencer or organisation you know."],
              ["🔗", "Suspicious link", "You are directed to an unfamiliar website to claim the prize."],
              ["❓", "You never entered", "You are told you won a competition you do not remember entering."],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800"
              >

                <span className="text-xl">
                  {icon}
                </span>

                <div>

                  <p className="font-bold">
                    {title}
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-6">
                    {description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>


        <section className="mt-10">

          <h2 className="text-xl font-black">
            How to stay safe
          </h2>

          <div className="mt-4 p-5 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800">

            <div className="space-y-4">

              {[
                "Never pay someone simply because they claim you won a prize.",
                "Never share your OTP, transaction PIN, password or authenticator code.",
                "Do not click suspicious prize or giveaway links.",
                "Verify competitions through the organisation's official website or verified account.",
                "Do not send money to an individual to unlock a supposed prize.",
                "If something seems too good to be true, stop and verify it first.",
              ].map((rule) => (

                <div
                  key={rule}
                  className="flex gap-3"
                >

                  <span className="text-green-500 font-black">
                    ✓
                  </span>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6">
                    {rule}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        <div className="mt-8 p-5 rounded-2xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">

          <p className="font-black text-yellow-700 dark:text-yellow-300">
            🛡️ AlphaBot security reminder
          </p>

          <p className="text-sm text-yellow-700/80 dark:text-yellow-300/80 mt-2 leading-6">
            Never give anyone your AlphaBot password, transaction PIN,
            OTP or authenticator code because they claim you have won
            something.
          </p>

        </div>


        <Link
          href="/settings/education"
          className="block mt-8 w-full text-center bg-black dark:bg-white text-white dark:text-black rounded-2xl py-4 font-bold"
        >
          ← Back to Security Education
        </Link>

      </div>

    </main>
  );
}
