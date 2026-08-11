"use client";

import Link from "next/link";

const informationToProtect = [
  "Passwords, PINs, OTPs and verification codes.",
  "Bank account, card and other financial information.",
  "Government-issued identification numbers and document details.",
  "Your email address and phone number when they are not necessary to share.",
  "Home address, exact location and information about your daily routine.",
  "Private photos, documents and files.",
  "Answers to security questions and account recovery information.",
  "Information about family members that could help someone impersonate or target you.",
];

const warningSigns = [
  "Someone asks for personal information without clearly explaining why they need it.",
  "A message creates urgency and says you must provide information immediately.",
  "A website asks for more information than the service reasonably needs.",
  "Someone asks you to send identification documents through an unusual channel.",
  "A person claims to represent a company but you cannot independently verify them.",
  "You are asked to share information publicly that should normally remain private.",
  "Someone asks for your OTP, PIN, password or verification code.",
  "You receive an unexpected request to confirm personal or financial information.",
];

const commonSituations = [
  {
    title: "The fake verification",
    text: "Someone claims that your account needs to be verified and asks for personal information, passwords or verification codes.",
  },
  {
    title: "The social-media overshare",
    text: "A person publicly posts information such as their phone number, address, birthday or daily routine, making it easier for criminals to target them.",
  },
  {
    title: "The fake company representative",
    text: "A scammer pretends to work for a bank, company or service and asks for personal information to supposedly solve a problem.",
  },
  {
    title: "The document request",
    text: "Someone requests a copy of an identification document but provides no clear reason or cannot be independently verified.",
  },
  {
    title: "The account recovery scam",
    text: "A scammer tries to collect information that could help them reset passwords or take control of your accounts.",
  },
];

export default function PersonalInformationPage() {
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

          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center text-2xl">
            📸
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            General Online Safety
          </p>

          <h1 className="text-3xl font-black mt-2">
            Protecting Personal Information
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn what personal information should be kept private, how
            criminals can misuse it and how to share information safely.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Share the minimum information necessary. Once sensitive
            information is sent or posted online, you may lose control over
            where it is copied, stored or shared.
          </p>

        </section>


        {/* INFORMATION TO PROTECT */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            Information you should protect
          </h2>

          <div className="mt-4 space-y-2">

            {informationToProtect.map((item) => (

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


        {/* HOW INFORMATION GETS MISUSED */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How personal information can be misused
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "Collection", "A criminal may collect small pieces of information from social media, scams, fake websites or stolen accounts."],
              ["2", "Combination", "Different pieces of information can be combined to build a more detailed picture of you."],
              ["3", "Impersonation", "The information may be used to pretend to be you or someone you trust."],
              ["4", "Account attacks", "Personal details may help criminals guess security answers or target account recovery processes."],
              ["5", "Further scams", "Once criminals know more about you, they can create more convincing scams and messages."],
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
            🛡️ Protect your information
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

            <ul className="space-y-3 text-sm text-green-800 dark:text-green-300">

              <li>• Never share your AlphaBot PIN, OTP, password or verification codes.</li>

              <li>• Share sensitive information only when there is a legitimate reason and you have verified who is receiving it.</li>

              <li>• Avoid posting your full address, financial information or other sensitive details publicly.</li>

              <li>• Be careful when sharing photos that contain documents, addresses, tickets or other private information.</li>

              <li>• Use strong, unique passwords and enable two-factor authentication.</li>

              <li>• Review privacy settings on social-media accounts and other online services.</li>

              <li>• Think about who could see information before posting or sending it.</li>

              <li>• Verify unexpected requests for personal information through an independent channel.</li>

            </ul>

          </div>

        </section>


        {/* IF INFORMATION WAS EXPOSED */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If you accidentally shared sensitive information
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Stop sharing any additional information.</li>

            <li>2. Change passwords if your login information was exposed.</li>

            <li>3. Enable two-factor authentication on affected accounts.</li>

            <li>4. Contact your bank or financial service if financial information was exposed.</li>

            <li>5. Monitor affected accounts for unusual activity.</li>

            <li>6. Save messages and other evidence if you believe the information was requested as part of a scam.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Your information is valuable. Share it with care.
          </p>

        </div>

      </div>

    </main>
  );
}
