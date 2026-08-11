"use client";

import Link from "next/link";

const warningSigns = [
  "Someone creates urgency and tells you that you must act immediately.",
  "A person uses fear, authority or intimidation to make you obey.",
  "Someone claims to be a trusted person or organisation but contacts you unexpectedly.",
  "You are asked to keep a request or transaction secret.",
  "Someone asks for passwords, OTPs, PINs or verification codes.",
  "A person knows some information about you and uses it to appear trustworthy.",
  "You are pressured to bypass normal security procedures.",
  "Someone becomes angry or threatening when you question their request.",
];

const commonTechniques = [
  {
    title: "Impersonation",
    text: "A scammer pretends to be a friend, family member, bank employee, company representative or other trusted person.",
  },
  {
    title: "Urgency",
    text: "The scammer creates a time limit so you feel you must act before you have time to verify the request.",
  },
  {
    title: "Fear",
    text: "They may claim that your account will be blocked, your money is at risk or you will face consequences if you do not cooperate.",
  },
  {
    title: "Authority",
    text: "They pretend to be someone with authority and use their supposed position to make the request appear legitimate.",
  },
  {
    title: "Emotional manipulation",
    text: "They use friendship, love, sympathy, guilt or excitement to influence your decision.",
  },
  {
    title: "Information gathering",
    text: "They collect small details about you from conversations, social media or other sources and use them to make their story more convincing.",
  },
];

export default function SocialEngineeringPage() {
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

          <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 flex items-center justify-center text-2xl">
            🧠
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            General Online Safety
          </p>

          <h1 className="text-3xl font-black mt-2">
            Social Engineering
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn how scammers manipulate people into revealing information,
            sending money or taking actions that put their accounts and
            security at risk.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Do not let urgency, fear, authority or emotion replace
            verification. If a request involves money, sensitive information
            or account access, stop and verify it independently.
          </p>

        </section>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How social engineering usually works
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "They choose a target", "The scammer may use information from social media, previous conversations or other sources."],
              ["2", "They create a believable story", "They pretend to have a legitimate reason for contacting you."],
              ["3", "They influence your emotions", "They may use urgency, fear, excitement, sympathy or authority to affect your decision."],
              ["4", "They make a request", "They ask you to send money, reveal information, click a link or perform another action."],
              ["5", "They use the result", "The information or action may help them steal money, access accounts or continue the scam."],
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


        {/* COMMON TECHNIQUES */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            Common manipulation techniques
          </h2>

          <div className="mt-4 space-y-3">

            {commonTechniques.map((technique) => (

              <div
                key={technique.title}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B]"
              >

                <p className="font-bold">
                  {technique.title}
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                  {technique.text}
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

              <li>• Slow down when someone creates pressure or urgency.</li>

              <li>• Verify unexpected requests using a trusted contact method you already know.</li>

              <li>• Never share your AlphaBot PIN, OTP, password or verification codes.</li>

              <li>• Do not assume someone is genuine simply because they know your name or other personal details.</li>

              <li>• Do not allow fear, sympathy or excitement to push you into a financial decision.</li>

              <li>• Never bypass normal security procedures because someone tells you that it is urgent.</li>

              <li>• Talk to someone you trust before making an unusual or large financial decision.</li>

              <li>• If a request feels unusual, stop the conversation and verify it independently.</li>

            </ul>

          </div>

        </section>


        {/* IF TARGETED */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If you think you have been manipulated
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Stop responding to the request.</li>

            <li>2. Do not send additional money or information.</li>

            <li>3. Secure any account information that may have been exposed.</li>

            <li>4. Change compromised passwords and enable two-factor authentication.</li>

            <li>5. Contact the relevant financial service immediately if money was sent.</li>

            <li>6. Save messages and other evidence.</li>

            <li>7. Report the scam to the appropriate platform or authorities.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            The strongest defence against manipulation is taking time to verify.
          </p>

        </div>

      </div>

    </main>
  );
}
