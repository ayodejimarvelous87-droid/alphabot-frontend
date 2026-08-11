"use client";

import Link from "next/link";

const immediateActions = [
  {
    title: "Stop the scam",
    text: "Stop sending money, sharing information or following further instructions from the scammer.",
  },
  {
    title: "Secure your accounts",
    text: "Change passwords for affected accounts and enable two-factor authentication where available.",
  },
  {
    title: "Contact your financial service",
    text: "If you sent money or exposed financial information, contact your bank, payment provider or relevant financial service as soon as possible.",
  },
  {
    title: "Save the evidence",
    text: "Keep messages, phone numbers, usernames, links, receipts, transaction details and screenshots that may help with a report.",
  },
  {
    title: "Report the scam",
    text: "Report the account, message or website to the platform or service involved and report serious fraud to the appropriate authorities.",
  },
];

const commonMistakes = [
  "Sending more money because the scammer promises to recover the original money.",
  "Continuing to communicate with the scammer because they promise to fix the situation.",
  "Deleting messages, receipts or other evidence before saving copies.",
  "Ignoring compromised accounts after a password or verification code has been exposed.",
  "Trusting someone who contacts you claiming they can recover your money for an upfront fee.",
  "Feeling embarrassed and avoiding telling someone you trust or reporting what happened.",
];

export default function BeenScammedPage() {
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
            🚨
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            General Online Safety
          </p>

          <h1 className="text-3xl font-black mt-2">
            What To Do If You Have Been Scammed
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            If you think you have been scammed, acting quickly can help
            protect your accounts, limit further losses and preserve
            important evidence.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Stop and act quickly. Do not send more money to the scammer,
            even if they promise that another payment will recover your
            previous loss.
          </p>

        </section>


        {/* FIRST STEPS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            What to do first
          </h2>

          <div className="mt-4 space-y-3">

            {immediateActions.map((action, index) => (

              <div
                key={action.title}
                className="flex gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181B]"
              >

                <span className="w-9 h-9 shrink-0 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm">
                  {index + 1}
                </span>

                <div>

                  <p className="font-bold">
                    {action.title}
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-6">
                    {action.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* IF MONEY WAS SENT */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            💳 If you sent money
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20">

            <ul className="space-y-3 text-sm text-orange-800 dark:text-orange-300">

              <li>• Contact your bank, card provider or payment service immediately.</li>

              <li>• Explain that the transaction may be fraudulent and ask what recovery or dispute options are available.</li>

              <li>• Provide transaction references, receipts and other evidence.</li>

              <li>• If you shared card or account information, ask whether additional security measures are required.</li>

              <li>• Do not send another payment to someone claiming they can recover your money.</li>

            </ul>

          </div>

        </section>


        {/* IF ACCOUNT WAS COMPROMISED */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🔐 If your account was compromised
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">

            <ul className="space-y-3 text-sm text-blue-800 dark:text-blue-300">

              <li>• Change the affected password immediately.</li>

              <li>• Change the password anywhere else you reused it.</li>

              <li>• Enable two-factor authentication.</li>

              <li>• Check recent logins, devices and account activity.</li>

              <li>• Remove unfamiliar recovery emails, phone numbers or devices.</li>

              <li>• Never share your AlphaBot PIN, OTP, password or verification codes with anyone claiming to help you.</li>

            </ul>

          </div>

        </section>


        {/* IF PERSONAL INFORMATION WAS EXPOSED */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🪪 If your personal information was exposed
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950/20">

            <ul className="space-y-3 text-sm text-purple-800 dark:text-purple-300">

              <li>• Identify exactly what information was shared.</li>

              <li>• Secure accounts that could be affected by the exposed information.</li>

              <li>• Monitor financial and online accounts for unusual activity.</li>

              <li>• Be extra cautious of follow-up scams using the information you already revealed.</li>

              <li>• Report identity theft or fraudulent activity when appropriate.</li>

            </ul>

          </div>

        </section>


        {/* EVIDENCE */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            📁 Save the evidence
          </h2>

          <div className="mt-4 space-y-2">

            {[
              "Screenshots of conversations and scam messages.",
              "Phone numbers, email addresses and usernames used by the scammer.",
              "Suspicious websites and links.",
              "Payment receipts and transaction references.",
              "Bank or payment account details involved in the transaction.",
              "Dates and approximate times of important events.",
            ].map((item) => (

              <div
                key={item}
                className="flex gap-3 p-4 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800"
              >

                <span className="text-red-500">
                  •
                </span>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-6">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* COMMON MISTAKES */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🚩 Avoid these mistakes
          </h2>

          <div className="mt-4 space-y-2">

            {commonMistakes.map((mistake) => (

              <div
                key={mistake}
                className="flex gap-3 p-4 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800"
              >

                <span className="text-red-500">
                  •
                </span>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-6">
                  {mistake}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* IMPORTANT REMINDER */}

        <section className="mt-8 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

          <h2 className="font-black text-green-800 dark:text-green-300">
            🛡️ Remember
          </h2>

          <p className="text-sm text-green-800 dark:text-green-300 mt-2 leading-6">
            Being scammed does not mean you were careless or unintelligent.
            Scammers are trained to create convincing situations and
            manipulate emotions. Focus on stopping further damage, securing
            your accounts and reporting what happened.
          </p>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Act quickly. Secure your accounts. Report the scam.
          </p>

        </div>

      </div>

    </main>
  );
}
