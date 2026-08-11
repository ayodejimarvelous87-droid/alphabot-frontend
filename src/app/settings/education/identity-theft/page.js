"use client";

import Link from "next/link";

const warningSigns = [
  "You receive bills, account notifications or messages for services you never signed up for.",
  "Someone contacts you about a loan, purchase or transaction you do not recognise.",
  "You notice unfamiliar logins, devices or password-reset requests on your accounts.",
  "Your personal information appears on an account or application you did not create.",
  "You suddenly lose access to an account or discover that your recovery details were changed.",
  "Someone asks you for your full personal details, identification information or financial information without a clear reason.",
  "You receive unexpected messages claiming there is a problem with your identity or account and asking you to verify your information.",
  "You discover that someone is using your name, photographs or other identifying information without your permission.",
];

const commonSituations = [
  {
    title: "The stolen information",
    text: "A criminal obtains personal information such as your name, phone number, email address or identification details and uses it for fraudulent activity.",
  },
  {
    title: "The fake application",
    text: "Someone uses another person's information to create an account, apply for a service or make a purchase without their permission.",
  },
  {
    title: "The account takeover",
    text: "A criminal gains access to an existing account and changes passwords or recovery details so they can control it.",
  },
  {
    title: "The impersonation",
    text: "Someone pretends to be you online and uses your name, photos or personal information to deceive other people.",
  },
  {
    title: "The information request",
    text: "A scammer pretends to be a company, bank or trusted organisation and asks for personal information that can later be misused.",
  },
];

export default function IdentityTheftPage() {
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
            🪪
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Account & Authentication
          </p>

          <h1 className="text-3xl font-black mt-2">
            Identity Theft
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn how criminals can misuse your personal information and
            how to protect your identity from fraud and impersonation.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Protect personal information as carefully as you protect your
            passwords. Do not give sensitive information to someone simply
            because they ask for it.
          </p>

        </section>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How identity theft usually works
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "They obtain information", "A criminal may obtain personal information through scams, fake websites, social media, data leaks or stolen devices."],
              ["2", "They collect more details", "They may combine small pieces of information to learn more about the person they are targeting."],
              ["3", "They impersonate you", "The information may be used to pretend to be you or create accounts in your name."],
              ["4", "They misuse the identity", "They may attempt to access accounts, make purchases, request services or deceive other people."],
              ["5", "They hide the activity", "Criminals may change passwords, recovery details or contact information to make the activity harder to detect."],
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


        {/* COMMON SITUATIONS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            Common situations to watch for
          </h2>

          <div className="mt-4 space-y-3">

            {commonSituations.map((situation) => (

              <div
                key={situation.title}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <p className="font-bold">
                  {situation.title}
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                  {situation.text}
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
            🛡️ Protect your identity
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

            <ul className="space-y-3 text-sm text-green-800 dark:text-green-300">

              <li>• Do not share sensitive personal information unless you know why it is needed and who is receiving it.</li>

              <li>• Never share your AlphaBot PIN, OTP, password or verification codes.</li>

              <li>• Avoid posting information that could help someone answer your security questions or impersonate you.</li>

              <li>• Use strong, unique passwords and enable two-factor authentication on important accounts.</li>

              <li>• Check account notifications and statements regularly for activity you do not recognise.</li>

              <li>• Keep your identification documents and sensitive files stored securely.</li>

              <li>• Be careful when sending copies of identification documents online.</li>

              <li>• Verify organisations independently before giving them sensitive information.</li>

            </ul>

          </div>

        </section>


        {/* IF IDENTITY IS STOLEN */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If you think your identity has been stolen
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Secure affected accounts and change compromised passwords.</li>

            <li>2. Enable two-factor authentication where available.</li>

            <li>3. Review recent account activity and save evidence of anything suspicious.</li>

            <li>4. Contact the relevant bank, financial service or company if your financial information was involved.</li>

            <li>5. Report fraudulent accounts or impersonation to the relevant platform or organisation.</li>

            <li>6. Report the identity theft to the appropriate authorities when necessary.</li>

            <li>7. Continue monitoring your important accounts for further suspicious activity.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Your identity is valuable. Share it carefully.
          </p>

        </div>

      </div>

    </main>
  );
}
