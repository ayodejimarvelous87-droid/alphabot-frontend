"use client";

import Link from "next/link";

const warningSigns = [
  "Someone asks you to disable your screen lock or biometric security.",
  "An unknown person has physical access to your phone or asks to unlock it for them.",
  "You notice unfamiliar apps, settings or accounts on your device.",
  "Your phone suddenly behaves differently or shows security warnings you do not recognise.",
  "Someone asks you to register their fingerprint or face on your device.",
  "You receive unexpected requests to install an app or give an app unusual permissions.",
  "Your phone is lost or stolen and you are unsure whether it is still accessible.",
  "Someone knows your device PIN or can easily guess it.",
];

const commonSituations = [
  {
    title: "The lost phone",
    text: "A lost or stolen phone can expose your messages, accounts and personal information if it is not protected with a strong screen lock.",
  },
  {
    title: "The shared device",
    text: "Allowing another person to register their fingerprint or face on your phone may give them access to information protected by biometrics.",
  },
  {
    title: "The fake security app",
    text: "A malicious or fake app may pretend to protect your device while requesting access to sensitive information.",
  },
  {
    title: "The unlocked phone",
    text: "Leaving your phone unlocked in public or around people you do not fully trust can allow someone to access your accounts and information.",
  },
];

export default function BiometricsPage() {
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
            👆
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Account & Authentication
          </p>

          <h1 className="text-3xl font-black mt-2">
            Biometrics & Device Security
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn how to use biometric security, protect your phone and
            prevent unauthorised access to your device and accounts.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Your phone is a key to many of your accounts. Protect it with a
            strong screen lock and only allow trusted biometric credentials
            on your device.
          </p>

        </section>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How device security works
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "Lock your device", "Use a strong PIN, password or secure screen lock so someone cannot easily access your phone."],
              ["2", "Add biometrics", "Fingerprint or face recognition can provide a convenient additional way to unlock your device."],
              ["3", "Protect important apps", "Use available app and account security features to protect sensitive information."],
              ["4", "Keep your device updated", "Security updates can fix weaknesses that attackers may use to access your device."],
              ["5", "Control access", "Only install trusted apps and review permissions before allowing an app to access sensitive information."],
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
            🛡️ Protect your device
          </h2>

          <div className="mt-4 p-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

            <ul className="space-y-3 text-sm text-green-800 dark:text-green-300">

              <li>• Use a strong PIN or password that other people cannot easily guess.</li>

              <li>• Use fingerprint or face authentication when it is available and appropriate for your device.</li>

              <li>• Never register another person's fingerprint or face on your phone unless you intentionally want them to have access.</li>

              <li>• Keep your operating system and important apps updated.</li>

              <li>• Install apps only from trusted sources and review their permissions.</li>

              <li>• Avoid leaving your phone unlocked where other people can access it.</li>

              <li>• Do not share your device PIN, password or AlphaBot verification codes.</li>

              <li>• Enable available device-finding and remote-lock features in case your phone is lost or stolen.</li>

            </ul>

          </div>

        </section>


        {/* IF LOST OR STOLEN */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If your phone is lost or stolen
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Use your device-finding service to locate, lock or secure the device if available.</li>

            <li>2. Contact your mobile network provider if you believe your SIM or phone has been stolen.</li>

            <li>3. Change important account passwords if you think someone may access your accounts.</li>

            <li>4. Sign out of unfamiliar sessions on important accounts.</li>

            <li>5. Contact your financial service immediately if financial information or banking access may be exposed.</li>

            <li>6. Report the loss or theft to the appropriate authorities when necessary.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Your device protects your digital life. Protect your device first.
          </p>

        </div>

      </div>

    </main>
  );
}
