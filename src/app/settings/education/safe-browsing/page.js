"use client";

import Link from "next/link";

const warningSigns = [
  "The website address looks slightly different from the real website.",
  "The page asks for your password, OTP, PIN or financial information unexpectedly.",
  "You are told to act immediately because your account will be closed or blocked.",
  "A website contains unusual spelling, poor design or suspicious pop-ups.",
  "A link was sent to you unexpectedly through a message, email or social media.",
  "The website asks you to download an unfamiliar app or file.",
  "You are redirected to a different website without expecting it.",
  "An offer seems unusually good and asks for payment or personal information.",
];

const commonSituations = [
  {
    title: "The fake website",
    text: "A scammer creates a website that looks like a real bank, company or online service and uses it to collect your information.",
  },
  {
    title: "The fake login page",
    text: "A link takes you to a page that looks legitimate but is designed to steal your username, password or verification code.",
  },
  {
    title: "The urgent warning",
    text: "A website claims your device, account or payment has a serious problem and tells you to act immediately.",
  },
  {
    title: "The suspicious download",
    text: "A website asks you to install an unknown application, browser extension or file that could put your device or information at risk.",
  },
  {
    title: "The misleading advertisement",
    text: "A convincing advertisement sends you to a fraudulent website offering prizes, investments, products or services.",
  },
];

export default function SafeBrowsingPage() {
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

          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-2xl">
            🌐
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            General Online Safety
          </p>

          <h1 className="text-3xl font-black mt-2">
            Safe Browsing
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn how to identify unsafe websites, avoid suspicious links
            and browse the internet more safely.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Do not enter passwords, OTPs, PINs or financial information into
            a website simply because it looks familiar. Check where you are
            before entering sensitive information.
          </p>

        </section>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How unsafe browsing scams usually work
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "You receive a link", "The link may arrive through a message, email, social media, advertisement or search result."],
              ["2", "The page looks legitimate", "The website may copy the appearance, logo or language of a real company."],
              ["3", "You are given a reason", "The page may claim that your account needs verification, a payment failed or you have won something."],
              ["4", "You are asked for information", "The fake website may request your password, payment details, OTP or other sensitive information."],
              ["5", "Your information is misused", "The information may be used to access accounts, commit fraud or target you with further scams."],
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
            🛡️ Browse safely
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

            <ul className="space-y-3 text-sm text-green-800 dark:text-green-300">

              <li>• Check the website address carefully before entering sensitive information.</li>

              <li>• Prefer opening important services through their official app or a trusted bookmark instead of unexpected links.</li>

              <li>• Never share your AlphaBot PIN, OTP, password or verification codes with a website reached through a suspicious link.</li>

              <li>• Do not download files or applications from websites you do not trust.</li>

              <li>• Keep your browser, operating system and security software updated.</li>

              <li>• Be cautious with pop-ups claiming that your device is infected or requires immediate action.</li>

              <li>• Look for secure connections, but remember that a secure connection alone does not prove that a website is legitimate.</li>

              <li>• If something feels suspicious, close the page and independently find the official website.</li>

            </ul>

          </div>

        </section>


        {/* IF INFORMATION WAS ENTERED */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If you entered information on a suspicious website
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Leave the suspicious website.</li>

            <li>2. Change the password you entered, especially if you use it anywhere else.</li>

            <li>3. Enable two-factor authentication on the affected account.</li>

            <li>4. If you entered financial information, contact the relevant financial service immediately.</li>

            <li>5. Monitor the affected account for unusual activity.</li>

            <li>6. Save the suspicious link or messages as evidence and report the scam when appropriate.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Stop. Check the website. Then continue.
          </p>

        </div>

      </div>

    </main>
  );
}
