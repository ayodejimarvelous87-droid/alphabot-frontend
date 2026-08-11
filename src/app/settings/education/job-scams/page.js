"use client";

import Link from "next/link";

const redFlags = [
  "You are offered a job without a proper interview or meaningful application process.",
  "The recruiter contacts you unexpectedly through WhatsApp, Telegram, Instagram or another messaging app.",
  "You are promised unusually high earnings for very simple tasks.",
  "You are asked to pay a registration, activation, training or equipment fee before starting.",
  "You are told to deposit your own money to complete tasks or unlock higher commissions.",
  "You are asked to recruit other people before you can withdraw your earnings.",
  "A platform shows large earnings but requires another payment before allowing withdrawal.",
  "You are asked to use your bank account or wallet to receive and transfer money for someone else.",
];

const safetyRules = [
  "Never pay money to get a job.",
  "Research the company independently using contact information from its official website.",
  "Do not trust screenshots of earnings as proof that a platform is legitimate.",
  "Never share your password, transaction PIN, OTP or authenticator codes with a recruiter.",
  "Do not allow strangers to use your bank account or wallet to move money.",
  "Be suspicious of jobs that require you to deposit money before you can earn.",
  "If a job requires you to recruit people or continuously pay money to unlock earnings, stop and investigate.",
];

export default function JobScams() {
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
            💼
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Scam Awareness
          </p>

          <h1 className="text-3xl font-black mt-2">
            Job & Task Scams
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Fake jobs and task scams can look like genuine online work.
            Scammers often promise easy money before gradually asking you
            to send your own money.
          </p>

        </div>


        {/* IMPORTANT */}

        <div className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-600 dark:text-red-400">
            🚨 The biggest warning sign
          </p>

          <p className="text-sm text-red-700 dark:text-red-300 mt-2 leading-6">
            A genuine employer should not require you to pay money simply
            to receive a job or unlock wages you have supposedly earned.
          </p>

        </div>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How task scams usually work
          </h2>

          <div className="mt-4 space-y-3">

            {[
              [
                "1",
                "The offer",
                "You receive an unexpected message offering an easy online job with attractive earnings."
              ],
              [
                "2",
                "Simple tasks",
                "You may be asked to like posts, rate products, review apps or complete other simple activities."
              ],
              [
                "3",
                "Fake earnings",
                "The platform shows commissions increasing, making the opportunity appear legitimate."
              ],
              [
                "4",
                "The deposit",
                "You are eventually told to deposit your own money to unlock a larger task or higher commission."
              ],
              [
                "5",
                "The trap",
                "After paying, another task or fee appears before you can supposedly withdraw your earnings."
              ],
              [
                "6",
                "The loss",
                "The scammer may continue demanding money or disappear completely."
              ],
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


        {/* MONEY LOOP */}

        <section className="mt-9">

          <h2 className="text-xl font-black">
            💸 Watch for the payment loop
          </h2>

          <div className="mt-4 p-5 rounded-2xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">

            <p className="text-sm text-yellow-800 dark:text-yellow-300 leading-6">
              A common pattern is: "complete a task → earn commission →
              deposit money → unlock a bigger task → earn more → pay another
              fee." If the only way to access your supposed earnings is to
              keep sending more money, stop.
            </p>

          </div>

        </section>


        {/* MONEY MULE */}

        <section className="mt-9">

          <h2 className="text-xl font-black">
            ⚠️ Never become a money mule
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]">

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6">
              Some fake jobs ask you to receive money into your account and
              transfer it somewhere else. This can expose you to financial
              loss and potentially serious legal problems. Do not move money
              for strangers simply because they call it part of your job.
            </p>

          </div>

        </section>


        {/* PROTECT */}

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


        {/* ALPHABOT */}

        <section className="mt-9">

          <h2 className="text-xl font-black">
            🔐 Protect your AlphaBot account
          </h2>

          <div className="mt-4 p-5 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800">

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6">
              Never give a recruiter or supposed employer your AlphaBot
              password, transaction PIN, OTP or authenticator code. A
              legitimate job opportunity does not require these credentials.
            </p>

          </div>

        </section>


        {/* FINAL */}

        <div className="mt-9 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">

          <p className="font-black">
            If you have to pay to get paid...
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Stop and verify the opportunity before sending any money.
          </p>

        </div>

      </div>

    </main>
  );
}
