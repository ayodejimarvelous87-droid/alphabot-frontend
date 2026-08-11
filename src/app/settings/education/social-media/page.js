"use client";

import Link from "next/link";

const warningSigns = [
  "A stranger sends you an unexpected message asking you to click a link or provide information.",
  "A profile has very few genuine posts, followers or signs of real activity.",
  "Someone claims to be a friend, celebrity, company or public figure but their account looks unusual.",
  "You receive messages creating urgency, such as “act now” or “your account will be deleted”.",
  "Someone asks for your password, OTP, PIN, verification code or other private information.",
  "A person you know suddenly asks you for money through a new or unusual account.",
  "You are promised money, prizes, followers, jobs or investments in exchange for payment or personal information.",
  "Someone pressures you to move the conversation to another platform or keep the interaction secret.",
];

const commonSituations = [
  {
    title: "The fake account",
    text: "A scammer creates a profile pretending to be a friend, celebrity, business or someone you trust and then contacts you.",
  },
  {
    title: "The suspicious link",
    text: "A message claims you have won something, need to verify your account or must fix a problem by clicking a link.",
  },
  {
    title: "The hacked friend",
    text: "A scammer gains access to someone's account and uses it to contact their friends with requests for money, codes or other information.",
  },
  {
    title: "The fake giveaway",
    text: "A social-media account promises a prize but asks you to pay a fee, provide personal information or click a suspicious link first.",
  },
  {
    title: "The impersonation",
    text: "Someone copies another person's name, photo or identity and uses the fake profile to build trust or request money.",
  },
];

export default function SocialMediaSafetyPage() {
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
            📱
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            General Online Safety
          </p>

          <h1 className="text-3xl font-black mt-2">
            Social Media Safety
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn how to protect your social-media accounts, recognise
            suspicious activity and keep your personal information safe online.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Never trust a social-media message simply because it appears to
            come from someone you know. Verify important requests through
            another trusted method before sending money or information.
          </p>

        </section>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How social-media scams usually work
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "They make contact", "A scammer may contact you through a direct message, comment, friend request or fake profile."],
              ["2", "They build trust", "They may pretend to be a friend, company, celebrity or another person you recognise."],
              ["3", "They create a reason", "They introduce an urgent problem, attractive offer, prize, investment or request."],
              ["4", "They ask for something", "They may request money, passwords, OTPs, personal information or ask you to click a link."],
              ["5", "They continue the pressure", "If you respond, they may create new reasons to keep you engaged or send more information."],
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
            🛡️ Protect yourself
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

            <ul className="space-y-3 text-sm text-green-800 dark:text-green-300">

              <li>• Use a strong, unique password for each important account.</li>

              <li>• Turn on two-factor authentication whenever it is available.</li>

              <li>• Never share your AlphaBot PIN, OTP, password or verification codes with anyone.</li>

              <li>• Check the account carefully before trusting a new message or request.</li>

              <li>• Avoid posting sensitive personal information, financial details or information that reveals your exact location.</li>

              <li>• Do not click suspicious links or download unexpected files sent through social media.</li>

              <li>• Verify unusual money requests through a separate trusted communication method.</li>

              <li>• Keep your phone, apps and social-media applications updated.</li>

            </ul>

          </div>

        </section>


        {/* IF COMPROMISED */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If your account is compromised
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Change your password immediately.</li>

            <li>2. Sign out of unfamiliar devices or active sessions.</li>

            <li>3. Enable two-factor authentication.</li>

            <li>4. Check whether your email address, phone number or recovery options were changed.</li>

            <li>5. Warn your contacts if messages may have been sent from your compromised account.</li>

            <li>6. Report the compromised account to the social-media platform.</li>

            <li>7. If you shared financial information, contact the relevant financial service immediately.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Think before you click, share or send.
          </p>

        </div>

      </div>

    </main>
  );
}
