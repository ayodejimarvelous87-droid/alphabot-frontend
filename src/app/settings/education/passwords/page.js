"use client";

import Link from "next/link";

const warningSigns = [
  "You use the same password on multiple websites.",
  "Your password is based on easily known information such as your name or birthday.",
  "You have shared your password with another person.",
  "Someone asks you to reveal your password or send a screenshot of it.",
  "You receive an unexpected password-reset message.",
  "You notice unfamiliar login activity on an account.",
  "You use a very short or simple password that is easy to guess.",
  "You have not changed a password after discovering that an account may have been compromised.",
];

const commonMistakes = [
  {
    title: "Reusing passwords",
    text: "Using the same password across multiple services means one compromised account can put other accounts at risk.",
  },
  {
    title: "Using predictable passwords",
    text: "Names, birthdays, phone numbers, simple patterns and common words can make passwords easier to guess.",
  },
  {
    title: "Sharing passwords",
    text: "Even trusted people should not normally need access to your private passwords.",
  },
  {
    title: "Saving passwords insecurely",
    text: "Writing passwords in exposed locations or storing them where other people can easily access them can put your accounts at risk.",
  },
  {
    title: "Ignoring security alerts",
    text: "Unexpected login notifications or password-reset requests can be signs that someone is attempting to access your account.",
  },
];

export default function PasswordSecurityPage() {
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
            🔑
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Account & Authentication
          </p>

          <h1 className="text-3xl font-black mt-2">
            Password Security
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn how to create stronger passwords, protect your login
            credentials and reduce the risk of account takeover.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Use a strong, unique password for important accounts and never
            share your password with anyone.
          </p>

        </section>


        {/* STRONG PASSWORD */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            What makes a strong password?
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["Long", "Longer passwords are generally harder to guess or crack."],
              ["Unique", "Use a different password for every important account."],
              ["Hard to guess", "Avoid names, birthdays, phone numbers and common words."],
              ["Private", "Do not share your password with friends, strangers or people claiming to provide support."],
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


        {/* HOW PASSWORD ATTACKS HAPPEN */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How password attacks usually happen
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "A password is exposed", "Your password may be stolen through phishing, malware, a data breach or another security incident."],
              ["2", "The attacker tries it elsewhere", "If you reused the password, the attacker may attempt to use it on other services."],
              ["3", "They try to access the account", "The attacker may attempt to log in or reset the account using stolen information."],
              ["4", "They look for more access", "Once inside one account, they may look for personal information or access to other services."],
              ["5", "The account is misused", "The account may be used for fraud, impersonation, spam or further scams."],
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


        {/* COMMON MISTAKES */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            Common password mistakes
          </h2>

          <div className="mt-4 space-y-3">

            {commonMistakes.map((mistake) => (

              <div
                key={mistake.title}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <p className="font-bold">
                  {mistake.title}
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                  {mistake.text}
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
            🛡️ Protect your password
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

            <ul className="space-y-3 text-sm text-green-800 dark:text-green-300">

              <li>• Use a long, unique password for your AlphaBot account.</li>

              <li>• Never share your AlphaBot password, PIN, OTP or verification codes.</li>

              <li>• Do not reuse your AlphaBot password on other websites.</li>

              <li>• Consider using a reputable password manager to create and store unique passwords.</li>

              <li>• Enable two-factor authentication on important accounts.</li>

              <li>• Never enter your password into a website reached through a suspicious link.</li>

              <li>• Change your password immediately if you believe someone else knows it.</li>

              <li>• Log out of accounts on devices you no longer use or recognise.</li>

            </ul>

          </div>

        </section>


        {/* IF PASSWORD IS COMPROMISED */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If your password has been exposed
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Change the password immediately.</li>

            <li>2. Change it anywhere else you reused the same password.</li>

            <li>3. Enable two-factor authentication.</li>

            <li>4. Review recent account activity and unfamiliar devices.</li>

            <li>5. Remove unfamiliar recovery information or active sessions.</li>

            <li>6. Be alert for follow-up phishing messages or account-recovery scams.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Strong passwords are your first line of defence.
          </p>

        </div>

      </div>

    </main>
  );
}
