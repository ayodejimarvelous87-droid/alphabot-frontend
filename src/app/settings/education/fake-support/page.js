"use client";

import Link from "next/link";

const warningSigns = [
  "Someone contacts you unexpectedly claiming to be customer support.",
  "They ask for your password, PIN, OTP or verification code.",
  "They ask you to send money to fix, unlock or verify your account.",
  "They pressure you to act immediately.",
  "They ask you to install software or give them remote access to your device.",
  "They send you a link and tell you to log in through it.",
  "Their phone number, email address or social media account does not match the company's official contact information.",
  "They become aggressive or threatening when you refuse to cooperate.",
];

const commonStories = [
  {
    title: "Your account has a problem",
    text: "The scammer claims that your account has been suspended, compromised or flagged and says they need your information to fix it.",
  },
  {
    title: "Your transaction failed",
    text: "They claim that a payment or transfer has failed and ask you to provide a verification code or send another payment.",
  },
  {
    title: "Account verification",
    text: "They tell you that your identity or account needs to be verified and ask for passwords, PINs, OTPs or other sensitive information.",
  },
  {
    title: "Refund or recovery",
    text: "They claim that you are entitled to a refund or that they can recover money from a previous scam, but demand an upfront payment or sensitive information.",
  },
];

export default function FakeSupportPage() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        <Link
          href="/settings/education"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Security Education
        </Link>

        <div className="mt-7">

          <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 flex items-center justify-center text-2xl">
            📞
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Common Scam
          </p>

          <h1 className="text-3xl font-black mt-2">
            Fake Customer Support
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Scammers may pretend to be customer support from AlphaBot, a
            bank, payment service or another company to trick you into
            revealing information, sending money or giving them access to
            your account.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Never give a supposed support agent your password, PIN, OTP or
            verification code. Contact support through the company's
            official channel instead of trusting an unexpected message or
            phone call.
          </p>

        </section>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How the scam usually works
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "They contact you", "The scammer may contact you through phone calls, social media, messaging apps, email or fake support accounts."],
              ["2", "They create a problem", "They claim that your account, payment, device or transaction has a serious problem."],
              ["3", "They gain your trust", "They use company names, logos, technical language or information about you to appear legitimate."],
              ["4", "They request access or information", "They may ask for passwords, OTPs, PINs, card details, payments or remote access to your device."],
              ["5", "They exploit the information", "The information or access may allow them to steal money, take over accounts or commit further fraud."],
            ].map(([number, title, text]) => (

              <div
                key={number}
                className="flex gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181B]"
              >

                <span className="w-9 h-9 shrink-0 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm">
                  {number}
                </span>

                <div>

                  <p className="font-bold">
                    {title}
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-6">
                    {text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* COMMON STORIES */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            Common stories scammers use
          </h2>

          <div className="mt-4 space-y-3">

            {commonStories.map((story) => (

              <div
                key={story.title}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <p className="font-bold">
                  {story.title}
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                  {story.text}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* WARNING SIGNS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🚩 Warning signs
          </h2>

          <div className="mt-4 space-y-2">

            {warningSigns.map((flag) => (

              <div
                key={flag}
                className="flex gap-3 p-4 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800"
              >

                <span className="text-red-500">
                  •
                </span>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-6">
                  {flag}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* VERIFY SUPPORT */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🔎 How to verify support
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">

            <ul className="space-y-3 text-sm text-blue-800 dark:text-blue-300">

              <li>• Do not use contact details provided by an unexpected caller or message.</li>

              <li>• Open the company's official app or website yourself.</li>

              <li>• Use the support contact details provided through the official service.</li>

              <li>• Never assume that a profile, logo or caller ID proves someone is genuine.</li>

              <li>• If you are unsure, end the conversation and contact the company independently.</li>

            </ul>

          </div>

        </section>


        {/* PROTECT YOURSELF */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🛡️ Protect yourself
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

            <ul className="space-y-3 text-sm text-green-800 dark:text-green-300">

              <li>• Never share your AlphaBot password, PIN, OTP or verification codes with support or anyone else.</li>

              <li>• Do not send money to someone who unexpectedly claims to be support.</li>

              <li>• Never give an unknown person remote access to your phone or computer.</li>

              <li>• Do not click login links sent by unexpected support contacts.</li>

              <li>• Verify support through an official channel that you found yourself.</li>

              <li>• Take your time. A legitimate support request should not require you to panic.</li>

              <li>• Report suspicious support accounts or messages to the relevant platform.</li>

            </ul>

          </div>

        </section>


        {/* IF CONTACTED */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If you think the support agent is fake
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Stop communicating with them.</li>

            <li>2. Do not send money or sensitive information.</li>

            <li>3. Do not approve unfamiliar login or authentication requests.</li>

            <li>4. Contact the company through its official support channel.</li>

            <li>5. Secure your account if you already shared information.</li>

            <li>6. Save evidence and report the fake account or message.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Real support should help protect your account, not ask you to
            surrender control of it.
          </p>

        </div>

      </div>

    </main>
  );
}
