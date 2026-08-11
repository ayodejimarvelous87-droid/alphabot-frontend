"use client";

import Link from "next/link";

export default function PaymentScams() {
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
            💳
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Common Scam
          </p>

          <h1 className="text-3xl font-black mt-2">
            Payment & Transfer Scams
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Scammers use fake payments, urgent transfer requests and
            fraudulent transactions to trick people into sending money
            or revealing financial information.
          </p>

        </div>


        <div className="mt-6 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">

          <p className="font-black text-red-600 dark:text-red-400">
            🚨 Think before you transfer
          </p>

          <p className="text-sm text-red-700 dark:text-red-300 mt-2 leading-6">
            Once money has been sent to a scammer, recovering it can be
            difficult. Always verify who you are paying and why.
          </p>

        </div>


        <section className="mt-8">

          <h2 className="text-xl font-black">
            Common payment scams
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["💸", "Urgent transfer requests", "Someone pressures you to send money immediately because of an emergency or supposedly limited opportunity."],
              ["🧾", "Fake invoices", "A scammer sends an invoice or payment request for something you never ordered."],
              ["👤", "Wrong-transfer scams", "Someone claims they accidentally transferred money to you and asks you to send it back to another account."],
              ["🔐", "Verification scams", "A person claims a payment failed and asks for your OTP, PIN, password or other security information."],
              ["💰", "Fake payment confirmations", "A scammer shows a fake receipt or screenshot and claims that they have already paid you."],
              ["🎭", "Impersonation payments", "Someone pretends to be a friend, relative, business or trusted organisation and asks you to make a transfer."],
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
            Warning signs
          </h2>

          <div className="mt-4 p-5 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800">

            <div className="space-y-4">

              {[
                "You are being pressured to act immediately.",
                "The recipient's identity cannot be independently verified.",
                "Someone asks you to send money to a different account than the original one.",
                "You are promised a reward, refund or profit after making a payment.",
                "Someone asks for your OTP, transaction PIN or password.",
                "A screenshot is being used as proof instead of the actual transaction status.",
                "The request involves an unusual payment method or unfamiliar account.",
              ].map((warning) => (

                <div
                  key={warning}
                  className="flex gap-3"
                >

                  <span className="text-red-500 font-black">
                    !
                  </span>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6">
                    {warning}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        <section className="mt-10">

          <h2 className="text-xl font-black">
            Before sending money
          </h2>

          <div className="mt-4 space-y-3">

            {[
              "Confirm the recipient's name and account details before approving the transfer.",
              "If someone contacts you unexpectedly, verify their identity through another trusted channel.",
              "Do not rely on screenshots as proof of payment.",
              "Never share your OTP, transaction PIN or password.",
              "Take a moment to think if the request feels unusually urgent.",
              "For purchases, verify the seller and the service before paying.",
              "Keep records of important transactions and payment references.",
            ].map((rule) => (

              <div
                key={rule}
                className="flex gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800"
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

        </section>


        <section className="mt-10">

          <h2 className="text-xl font-black">
            If you sent money to a scammer
          </h2>

          <div className="mt-4 p-5 rounded-2xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">

            <div className="space-y-3">

              {[
                "Stop communicating with the scammer.",
                "Contact the payment provider or financial institution as soon as possible.",
                "Secure your account if you shared your password, PIN or other credentials.",
                "Keep transaction references, messages and other evidence.",
                "Report the incident through the appropriate official channels.",
              ].map((step, index) => (

                <div
                  key={step}
                  className="flex gap-3"
                >

                  <span className="font-black text-yellow-700 dark:text-yellow-300">
                    {index + 1}.
                  </span>

                  <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-6">
                    {step}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        <div className="mt-8 p-5 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800">

          <p className="font-black">
            🛡️ AlphaBot security reminder
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
            Never give anyone your AlphaBot password, transaction PIN or
            one-time verification code. Legitimate support should not
            require you to reveal these secrets.
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
