"use client";

import Link from "next/link";

export default function ImpersonationScams() {
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
            👥
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Common Scam
          </p>

          <h1 className="text-3xl font-black mt-2">
            Impersonation Scams
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Scammers pretend to be someone you trust so that you will
            reveal information, send money or take an action you normally
            would not take.
          </p>

        </div>


        {/* WHAT IS IT */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            What is an impersonation scam?
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            An impersonation scam happens when someone falsely claims to
            be a trusted person, company or organisation.
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            They may pretend to be a friend, family member, bank employee,
            customer-support agent, government official, delivery company
            or even someone from AlphaBot.
          </p>

        </section>


        {/* COMMON EXAMPLES */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            Common examples
          </h2>

          <div className="mt-4 space-y-3">

            {[
              {
                title: "Fake customer support",
                text: "Someone claims to be AlphaBot support and asks for your password, OTP, PIN or other sensitive information."
              },
              {
                title: "Fake friend or family member",
                text: "A scammer pretends to be someone you know and urgently asks you to send money."
              },
              {
                title: "Fake bank or payment agent",
                text: "Someone claims there is a problem with your account and asks you to verify information or transfer money."
              },
              {
                title: "Fake government official",
                text: "A person claims to represent a government agency and threatens you with penalties unless you pay immediately."
              },
              {
                title: "Fake delivery company",
                text: "A scammer claims your parcel is waiting for payment and sends you a link or payment request."
              }
            ].map((item) => (

              <div
                key={item.title}
                className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181B]"
              >

                <p className="font-bold">
                  {item.title}
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* RED FLAGS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🚩 Warning signs
          </h2>

          <div className="mt-4 space-y-3">

            {[
              "They create a sense of urgency and tell you to act immediately.",
              "They ask for an OTP, transaction PIN, password or authentication code.",
              "They ask you to move the conversation to another platform.",
              "They tell you not to contact the real company or person.",
              "They use threats, fear or pressure to make you act.",
              "They ask you to send money to an unfamiliar account or wallet.",
              "They send links and ask you to log in or enter financial information.",
              "Their identity cannot be independently verified."
            ].map((warning) => (

              <div
                key={warning}
                className="flex gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
              >

                <span className="shrink-0">
                  🚩
                </span>

                <p className="text-sm leading-5 text-red-700 dark:text-red-300">
                  {warning}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* WHAT TO DO */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🛡️ How to protect yourself
          </h2>

          <div className="mt-4 space-y-3">

            {[
              "Stop and think before responding to an urgent request.",
              "Contact the person or organisation using a trusted phone number or official website.",
              "Never share your OTP, transaction PIN, password or authentication codes.",
              "Do not trust caller ID, profile pictures or display names as proof of identity.",
              "Do not click unexpected links sent by someone claiming to be support.",
              "If money is requested, independently verify who you are paying and why.",
              "When in doubt, end the conversation and contact the real organisation yourself."
            ].map((tip, index) => (

              <div
                key={tip}
                className="flex gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <span className="w-7 h-7 shrink-0 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-black">
                  {index + 1}
                </span>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-5">
                  {tip}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* ALPHABOT RULE */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            ⚠️ Important AlphaBot rule
          </h2>

          <p className="text-sm text-yellow-700 dark:text-yellow-300/90 mt-2 leading-6">
            Never give your AlphaBot password, transaction PIN, OTP or
            authenticator code to someone who contacts you unexpectedly.
          </p>

          <p className="text-sm text-yellow-700 dark:text-yellow-300/90 mt-2 leading-6">
            If someone claims to be AlphaBot support, verify them through
            AlphaBot's official support channels before taking any action.
          </p>

        </section>


        {/* QUICK CHECK */}

        <section className="mt-8 p-5 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800">

          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Remember
          </p>

          <p className="text-lg font-black mt-2">
            Trust should be verified, not assumed.
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            If someone asks you to make a sensitive financial or account
            decision, verify their identity independently before doing
            anything.
          </p>

        </section>


        <Link
          href="/settings/education"
          className="block mt-8 w-full text-center bg-black dark:bg-white text-white dark:text-black rounded-2xl py-4 font-bold"
        >
          Back to Security Education
        </Link>

      </div>

    </main>
  );
}
