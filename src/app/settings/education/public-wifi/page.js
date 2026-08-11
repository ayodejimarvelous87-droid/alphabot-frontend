"use client";

import Link from "next/link";

const warningSigns = [
  "You find several Wi-Fi networks with very similar names in the same location.",
  "A network asks you to enter sensitive information before allowing access.",
  "The Wi-Fi name looks like a business or public service but you cannot confirm that it is official.",
  "A network redirects you to unexpected websites after connecting.",
  "You are asked to download an application or certificate to use the network.",
  "Your device shows unusual security warnings while connected.",
  "You are connected to public Wi-Fi while accessing highly sensitive accounts without additional protection.",
  "You are unsure whether the network is actually provided by the business or location you are visiting.",
];

const commonSituations = [
  {
    title: "The fake hotspot",
    text: "Someone creates a Wi-Fi network with a name similar to a legitimate network. People connect to it thinking it belongs to the café, hotel, airport or other location.",
  },
  {
    title: "The automatic connection",
    text: "Your phone may automatically reconnect to a previously used network. This can be risky if the network name is being imitated elsewhere.",
  },
  {
    title: "The fake login page",
    text: "After connecting, you may be redirected to a page that asks for personal information, account credentials or payment details.",
  },
  {
    title: "The untrusted device",
    text: "Public networks can contain many unknown devices. You should avoid unnecessary file sharing and other features that expose your device.",
  },
];

export default function PublicWifiPage() {
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

          <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900 flex items-center justify-center text-2xl">
            📶
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            General Online Safety
          </p>

          <h1 className="text-3xl font-black mt-2">
            Public Wi-Fi Safety
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Learn how to use public Wi-Fi more safely and reduce the risk of
            exposing your accounts, information or device to unknown users.
          </p>

        </div>


        {/* IMPORTANT */}

        <section className="mt-7 p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">

          <p className="font-black text-red-700 dark:text-red-300">
            🚨 The most important rule
          </p>

          <p className="text-sm text-red-700/80 dark:text-red-300/80 mt-2 leading-6">
            Do not assume a Wi-Fi network is safe simply because it has a
            familiar name. Confirm the network with the business or location
            providing it before connecting.
          </p>

        </section>


        {/* HOW IT WORKS */}

        <section className="mt-8">

          <h2 className="text-xl font-black">
            How public Wi-Fi risks work
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["1", "You find a network", "Your phone or computer detects Wi-Fi networks available around you."],
              ["2", "You connect", "You select a network because its name appears to belong to a trusted location."],
              ["3", "Unknown devices may be nearby", "Public networks can contain many users and devices that you do not know or control."],
              ["4", "You access online services", "You may browse websites, use social media or access accounts while connected."],
              ["5", "A security mistake can expose information", "Weak security settings, fake networks or suspicious login pages can increase the risk of account or information theft."],
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

              <li>• Confirm the exact Wi-Fi name and connection instructions with the business or location.</li>

              <li>• Turn off automatic connection to unknown or unused Wi-Fi networks.</li>

              <li>• Avoid entering highly sensitive information when using an unfamiliar public network.</li>

              <li>• Use websites that support HTTPS and pay attention to browser security warnings.</li>

              <li>• Never share your AlphaBot PIN, OTP, password or verification codes through a suspicious Wi-Fi login page.</li>

              <li>• Keep your phone, computer and apps updated.</li>

              <li>• Turn off file sharing and other network-sharing features when you do not need them.</li>

              <li>• Disconnect from public Wi-Fi when you are finished using it.</li>

            </ul>

          </div>

        </section>


        {/* IF YOU SUSPECT A PROBLEM */}

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <h2 className="font-black text-yellow-800 dark:text-yellow-300">
            🚨 If you think a public network was unsafe
          </h2>

          <ol className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">

            <li>1. Disconnect from the network.</li>

            <li>2. Forget the network on your device if you do not trust it.</li>

            <li>3. Change passwords if you entered them into a suspicious page.</li>

            <li>4. Enable two-factor authentication on affected accounts.</li>

            <li>5. Check important accounts for unusual activity.</li>

            <li>6. Contact your financial service immediately if sensitive financial information was exposed.</li>

          </ol>

        </section>


        <div className="mt-8 text-center">

          <p className="text-xs text-zinc-500">
            Public Wi-Fi is convenient. Treat unknown networks with caution.
          </p>

        </div>

      </div>

    </main>
  );
}
