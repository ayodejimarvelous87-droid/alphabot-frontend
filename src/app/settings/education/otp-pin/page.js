"use client";

import Link from "next/link";

const warningSigns = [
  "Someone calls or messages you asking for an OTP, PIN or verification code.",
  "A person claims they need your code to help you secure or verify your account.",
  "Someone tells you that your account will be blocked unless you provide a code.",
  "You receive a verification code that you did not request.",
  "Someone asks you to read a code aloud or send a screenshot of it.",
  "A person claims to be AlphaBot support and asks for your PIN, OTP or password.",
  "Someone pressures you to act quickly before you have time to verify the request.",
  "You receive repeated verification codes while someone is trying to contact you.",
];

const commonScams = [
  {
    title: "The fake support agent",
    text: "A scammer pretends to be customer support and claims they need your OTP, PIN or verification code to fix a problem with your account.",
  },
  {
    title: "The unexpected verification code",
    text: "You receive a code you did not request. A scammer may then contact you and ask you to send the code to them.",
  },
  {
    title: "The account problem",
    text: "Someone claims that your account has been compromised or will be suspended unless you provide a verification code.",
  },
  {
    title: "The phone call",
    text: "A scammer may stay on the phone while you receive a genuine verification code and then pressure you to read it to them.",
  },
];

export default function OtpPinPage() {
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

          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 flex items-center justify-center text-2xl">
            🔢
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Account & Authentication
          </p>

          <h1 className="text-3xl font-black mt-2">
            OTP, PIN & Verification Codes
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn why verification codes and PINs must remain private and
            how scammers use them to gain access to accounts.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Never give your OTP, PIN, password or verification code to
            another person. Legitimate support should not need you to reveal
            a private verification code.
          </p>

        </section>


        {/* WHAT THEY ARE */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            What are OTPs and verification codes?
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["OTP", "A one-time password is a temporary code used to verify an action or login."],
              ["PIN", "A personal identification number is a secret code used to protect access to an account or service."],
              ["Verification code", "A temporary code sent through an approved channel to confirm that an action is really being made by you."],
            ].map(([title, text]) => (

              <div
                key={title}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <p className="font-bold">
                  {title}
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                  {text}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* HOW THE SCAM WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How verification-code scams work
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "They target your account", "The scammer may already know your phone number, email address or username."],
              ["2", "They trigger a verification request", "They attempt to log in, reset a password or perform another action that causes a genuine code to be sent to you."],
              ["3", "They contact you", "The scammer pretends to be support, a friend, a company or another trusted person."],
              ["4", "They ask for the code", "They tell you that they need the code to verify or secure your account."],
              ["5", "They use the code", "If you give them the code, they may be able to complete the action they started."],
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


        {/* COMMON SCAMS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            Common tricks scammers use
          </h2>

          <div className="mt-4 space-y-3">

            {commonScams.map((scam) => (

              <div
                key={scam.title}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <p className="font-bold">
                  {scam.title}
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                  {scam.text}
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


        {/* PROTECT YOURSELF */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🛡️ Protect your codes
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

            <ul className="space-y-3 text-sm text-green-800 dark:text-green-300">

              <li>• Never share your AlphaBot OTP, PIN, password or verification codes with anyone.</li>

              <li>• Do not read a verification code aloud to someone on a phone call.</li>

              <li>• Never send screenshots containing verification codes.</li>

              <li>• If you receive a code you did not request, do not give it to anyone.</li>

              <li>• Be suspicious of anyone who creates urgency around a verification request.</li>

              <li>• Contact support through the official AlphaBot channel if you are unsure about an account problem.</li>

              <li>• Use a unique PIN and avoid easily guessed numbers.</li>

            </ul>

          </div>

        </section>


        {/* UNEXPECTED CODE */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 You received a code you did not request
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Do not share the code with anyone.</li>

            <li>2. Do not click suspicious links in the message.</li>

            <li>3. Check your account for unfamiliar activity.</li>

            <li>4. Change your password if you suspect someone has access.</li>

            <li>5. Contact the service through its official support channel if necessary.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Your verification code is your secret. Keep it private.
          </p>

        </div>

      </div>

    </main>
  );
}
