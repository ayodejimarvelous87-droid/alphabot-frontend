"use client";

import Link from "next/link";

const items = [
  {
    icon: "🔢",
    title: "Transaction PIN",
    description: "Create or change the PIN used to authorise payments.",
    href: "/transaction-pin",
  },
  {
    icon: "👆",
    title: "Biometric Payment",
    description: "Use your fingerprint to authorise payments.",
    href: "/settings/security/biometric",
  },
  {
    icon: "🔐",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of protection with an authenticator app.",
    href: "/settings/security/2fa",
  },
  {
    icon: "🔑",
    title: "Password",
    description: "Change the password used to access your AlphaBot account.",
    href: "/settings/security/password",
  },
];

export default function SecuritySettings() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        <Link
          href="/settings"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Settings
        </Link>

        <div className="mt-7 mb-7">

          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Account Protection
          </p>

          <h1 className="text-3xl font-black mt-2">
            Security
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
            Manage the security features protecting your AlphaBot account.
          </p>

        </div>

        <div className="space-y-3">

          {items.map((item) => (

            <Link
              key={item.title}
              href={item.href}
              className="
                group
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                border
                border-zinc-200
                dark:border-zinc-800
                bg-white
                dark:bg-[#18181B]
                hover:border-zinc-400
                dark:hover:border-zinc-600
                transition
              "
            >

              <span
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-xl
                  bg-zinc-100
                  dark:bg-[#050505]
                  border
                  border-zinc-200
                  dark:border-zinc-800
                  flex
                  items-center
                  justify-center
                  text-lg
                "
              >
                {item.icon}
              </span>

              <div className="flex-1 min-w-0">

                <p className="font-bold">
                  {item.title}
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-5">
                  {item.description}
                </p>

              </div>

              <span className="text-zinc-400 text-xl">
                ›
              </span>

            </Link>

          ))}

        </div>

        <div className="mt-6 p-4 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">

          <p className="text-xs text-green-700 dark:text-green-300 leading-5">
            🔒 Keep your security information private. AlphaBot will never
            ask you to share your PIN, password, or authenticator codes.
          </p>

        </div>

      </div>

    </main>
  );
}
