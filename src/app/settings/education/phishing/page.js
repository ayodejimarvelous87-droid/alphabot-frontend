"use client";

import Link from "next/link";

const warningSigns = [
  "The message creates urgency: 'Act now', 'Your account will be closed', or 'Payment required immediately.'",
  "The link looks slightly different from the real website or uses a strange domain.",
  "You are asked to enter your password, PIN, OTP or card details through a link you did not expect.",
  "The message contains unusual spelling, formatting or grammar.",
  "A person claims to be support and asks you to click a link to 'verify' your account.",
  "You receive a login or password-reset message that you did not request.",
  "The sender asks you to ignore security warnings from your browser.",
];

const examples = [
  {
    title: "Fake account warning",
    text: "You receive a message saying your account will be suspended unless you click a link and verify your identity.",
  },
  {
    title: "Fake payment request",
    text: "A message claims that a payment failed and provides a link to enter your card or account information.",
  },
  {
    title: "Fake support message",
    text: "Someone contacts you pretending to be customer support and sends you a link to 'secure' your account.",
  },
  {
    title: "Fake login page",
    text: "A link opens a website that looks almost identical to a legitimate service and asks for your login details.",
  },
];

export default function PhishingPage() {
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
            🎣
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Common Scam
          </p>

          <h1 className="text-3xl font-black mt-2">
            Phishing & Fake Links
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Phishing is a scam where someone tricks you into opening a
            malicious link or providing sensitive information by pretending
            to be a trusted person, company or service.
          </p>

        </div>


        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 Never verify sensitive information through a suspicious link
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            If a message asks you to enter your password, PIN, OTP,
            verification code or financial information, stop and verify
            the request through the company's official app or website.
          </p>

        </section>


        <section className="mt-8">

          <h2 className="text-xl font-black">
            How phishing works
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "The message arrives", "You receive an SMS, email, social-media message or chat that appears legitimate."],
              ["2", "You are pressured", "The message creates urgency, fear, excitement or curiosity to make you act quickly."],
              ["3", "You open the link", "The link takes you to a fake website or another page controlled by the scammer."],
              ["4", "Information is requested", "The fake page may ask for your username, password, OTP, PIN, card details or other information."],
              ["5", "The information is abused", "The scammer can use the information to attempt account takeover, fraud or identity theft."],
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


        <section className="mt-8">

          <h2 className="text-xl font-black">
            Common phishing examples
          </h2>

          <div className="mt-4 space-y-3">

            {examples.map((example) => (

              <div
                key={example.title}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <p className="font-bold">
                  {example.title}
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                  {example.text}
                </p>

              </div>

            ))}

          </div>

        </section>


        <section className="mt-8">

          <h2 className="text-xl font-black">
            🚩 Warning signs
          </h2>

          <div className="mt-4 space-y-2">

            {warningSigns.map((warning) => (

              <div
                key={warning}
                className="flex gap-3 p-4 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800"
              >

                <span className="text-orange-500">
                  •
                </span>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-6">
                  {warning}
                </p>

              </div>

            ))}

          </div>

        </section>


        <section className="mt-8">

          <h2 className="text-xl font-black">
            🔍 Before opening a link
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">

            <ul className="space-y-3 text-sm text-blue-800 dark:text-blue-300 leading-6">

              <li>• Ask yourself whether you were expecting the message.</li>

              <li>• Check who actually sent it.</li>

              <li>• Look carefully at the website address before entering information.</li>

              <li>• Do not rely only on a logo or familiar-looking design.</li>

              <li>• When in doubt, open the official app or type the company's known website address yourself instead of using the message link.</li>

            </ul>

          </div>

        </section>


        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If you clicked a suspicious link
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Do not enter any more information.</li>
            <li>2. Close the suspicious page.</li>
            <li>3. If you entered a password, change it immediately from the legitimate website or app.</li>
            <li>4. If you exposed financial information, contact your financial provider immediately.</li>
            <li>5. If you entered an OTP or verification code, secure the affected account immediately.</li>
            <li>6. Monitor the account for unusual activity.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            When something feels urgent, slow down. Scammers often depend on you acting before thinking.
          </p>

        </div>

      </div>

    </main>
  );
}
