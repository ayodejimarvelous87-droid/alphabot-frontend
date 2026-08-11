"use client";

import Link from "next/link";

const redFlags = [
  "They become emotionally attached unusually quickly.",
  "They always have a reason why they cannot meet you in person.",
  "They suddenly experience an emergency and ask you for money.",
  "They ask you to pay for travel, medical bills, visas, accommodation or business expenses.",
  "They promise to repay you later but keep creating new emergencies.",
  "They ask you to receive or transfer money on their behalf.",
  "They pressure you to keep the relationship or financial requests secret.",
  "They become angry, threatening or emotionally manipulative when you refuse to send money.",
];

const commonStories = [
  {
    title: "The emergency",
    text: "A person you met online says they urgently need money for a hospital bill, accident, family emergency or other crisis.",
  },
  {
    title: "The visit",
    text: "They claim they want to travel to meet you but suddenly need money for a ticket, visa, passport or another travel expense.",
  },
  {
    title: "The investment",
    text: "After gaining your trust, they introduce you to an investment opportunity and encourage you to send money or cryptocurrency.",
  },
  {
    title: "The package",
    text: "They claim they sent you an expensive package but say you must pay customs, clearance or delivery fees before receiving it.",
  },
];

export default function LoveScamsPage() {
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
            ❤️
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Common Scam
          </p>

          <h1 className="text-3xl font-black mt-2">
            Love & Romance Scams
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Romance scammers build emotional relationships with people
            online and eventually use that trust to request money,
            financial information or other forms of help.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Never send money simply because someone you met online says
            they love you, need you urgently, or promises to pay you back.
          </p>

        </section>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How the scam usually works
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "They make contact", "The scammer may approach you through social media, dating apps, messaging platforms or other online communities."],
              ["2", "They build trust", "They communicate frequently, show affection and learn about your personal life."],
              ["3", "They create a problem", "An emergency, travel problem, investment opportunity or financial situation suddenly appears."],
              ["4", "They ask for money", "They ask you to send money, cryptocurrency, gift cards or financial information."],
              ["5", "The requests continue", "Once you send money, another problem may appear and the requests can become larger."],
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


        {/* RED FLAGS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            🚩 Warning signs
          </h2>

          <div className="mt-4 space-y-2">

            {redFlags.map((flag) => (

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

              <li>• Take your time before trusting someone you met online.</li>

              <li>• Never send money to someone you have not independently verified.</li>

              <li>• Do not share your AlphaBot PIN, OTP, password or verification codes.</li>

              <li>• Be suspicious of requests involving cryptocurrency, gift cards or unusual payment methods.</li>

              <li>• Talk to someone you trust before making a large financial decision.</li>

              <li>• Search for inconsistencies in the person's story and verify important claims independently.</li>

            </ul>

          </div>

        </section>


        {/* IF SCAMMED */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If you think you are being scammed
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Stop sending money.</li>
            <li>2. Stop sharing personal or financial information.</li>
            <li>3. Save messages, receipts, account details and other evidence.</li>
            <li>4. Secure your accounts and change compromised passwords.</li>
            <li>5. Contact the relevant financial service or payment provider immediately if money was sent.</li>
            <li>6. Report the scam to the appropriate authorities or platform.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Knowledge is one of the strongest defences against scams.
          </p>

        </div>

      </div>

    </main>
  );
}
