"use client";

import Link from "next/link";

const warningSigns = [
  "Someone creates urgency and pressures you to act immediately.",
  "You are promised easy money, prizes, jobs or guaranteed profits.",
  "Someone asks for an OTP, PIN, password or verification code.",
  "You are asked to send money before receiving a prize, service or payment.",
  "A person claims to represent a bank, company, government agency or support team but contacts you unexpectedly.",
  "You are asked to click a suspicious link or download an unexpected file.",
  "Someone asks you to keep a transaction or conversation secret.",
  "The offer sounds unusually good and you are discouraged from checking it independently.",
];

const commonScams = [
  {
    title: "Phishing scams",
    text: "Scammers send fake messages or websites designed to steal passwords, payment information or other sensitive details.",
  },
  {
    title: "Impersonation scams",
    text: "A scammer pretends to be someone you trust, such as a friend, family member, company representative or public official.",
  },
  {
    title: "Investment scams",
    text: "Fake investment opportunities promise unusually high or guaranteed returns and may pressure you to send money quickly.",
  },
  {
    title: "Job scams",
    text: "Fraudsters advertise fake jobs or online tasks and may ask for registration fees, deposits, personal information or payments.",
  },
  {
    title: "Romance scams",
    text: "A scammer builds an emotional relationship online and eventually asks for money, financial information or other assistance.",
  },
  {
    title: "Prize and giveaway scams",
    text: "You are told that you have won something but must pay a fee or provide sensitive information before receiving the supposed prize.",
  },
  {
    title: "Delivery scams",
    text: "A fake delivery message claims that you must pay a small fee or provide information before a package can be delivered.",
  },
  {
    title: "Payment scams",
    text: "Scammers manipulate victims into sending money to the wrong account, using unusual payment methods or approving fraudulent transactions.",
  },
];

export default function CommonScamsPage() {
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
            Scam Awareness
          </p>

          <h1 className="text-3xl font-black mt-2">
            Common Scams
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn how common scams work, recognise warning signs and avoid
            losing money or sensitive information to fraud.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Stop and verify before sending money, sharing sensitive
            information or following unexpected instructions. Scammers often
            rely on urgency and fear to prevent you from thinking carefully.
          </p>

        </section>


        {/* HOW SCAMS WORK */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How scams usually work
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "They make contact", "The scammer contacts you through calls, messages, social media, email, websites or other channels."],
              ["2", "They create trust", "They may pretend to be someone you know or an organisation you recognise."],
              ["3", "They create pressure", "They introduce urgency, fear, excitement or an attractive opportunity."],
              ["4", "They ask for something", "They may request money, personal information, account access, codes or a payment."],
              ["5", "They continue the scam", "Once you respond, they may create new problems or requests to obtain even more from you."],
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
            Common types of scams
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
            🛡️ Protect yourself
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

            <ul className="space-y-3 text-sm text-green-800 dark:text-green-300">

              <li>• Take your time. Do not let someone pressure you into making a quick decision.</li>

              <li>• Never share your AlphaBot PIN, OTP, password or verification codes.</li>

              <li>• Verify unexpected requests through an independent and trusted channel.</li>

              <li>• Do not click suspicious links or download unexpected files.</li>

              <li>• Never send money simply because someone claims you must pay urgently.</li>

              <li>• Be especially careful with cryptocurrency, gift cards and unusual payment methods.</li>

              <li>• Research unfamiliar companies, websites and investment opportunities before paying.</li>

              <li>• If an offer seems too good to be true, stop and investigate before proceeding.</li>

            </ul>

          </div>

        </section>


        {/* IF SCAMMED */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If you think you have been scammed
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Stop communicating with the scammer if possible.</li>

            <li>2. Stop sending money or additional information.</li>

            <li>3. Save messages, receipts, transaction details and other evidence.</li>

            <li>4. Secure affected accounts and change compromised passwords.</li>

            <li>5. Contact the relevant bank, financial service or payment provider immediately if money was sent.</li>

            <li>6. Report the scam to the platform or service where it occurred.</li>

            <li>7. Report serious fraud to the appropriate authorities.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Pause. Verify. Then act.
          </p>

        </div>

      </div>

    </main>
  );
}
