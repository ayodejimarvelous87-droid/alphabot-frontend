"use client";

import Link from "next/link";

const settingsItems = [
  {
    href: "/edit-profile",
    icon: "✏️",
    title: "Edit Profile",
    description: "Update your personal information",
  },
  {
    href: "/settings/notifications",
    icon: "🔔",
    title: "Notification Settings",
    description: "Manage push notifications and alerts",
  },
  {
    href: "/settings/security",
    icon: "🔐",
    title: "Security",
    description: "PIN, biometrics, 2FA and password",
  },
  {
    href: "/settings/education",
    icon: "🎓",
    title: "Security Education",
    description: "Learn how to keep your AlphaBot account safe",
  },
];

export default function Settings() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        {/* HEADER */}

        <Link
          href="/profile"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Profile
        </Link>

        <div className="mt-7 mb-7">

          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            AlphaBot Account
          </p>

          <h1 className="text-3xl font-black mt-2">
            Settings
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Manage your account, preferences and security.
          </p>

        </div>


        {/* SETTINGS LIST */}

        <div className="space-y-2">

          {settingsItems.map((item) => (

            <Link
              key={item.href}
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

              <div
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
              </div>


              <div className="flex-1 min-w-0">

                <p className="font-bold">
                  {item.title}
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {item.description}
                </p>

              </div>


              <span
                className="
                  text-xl
                  text-zinc-400
                  group-hover:text-black
                  dark:group-hover:text-white
                  transition
                "
              >
                ›
              </span>

            </Link>

          ))}

        </div>


        {/* DANGER */}

        <div className="mt-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
            Account
          </p>

          <Link
            href="/settings/delete-account"
            className="
              group
              flex
              items-center
              gap-4
              p-4
              rounded-2xl
              border
              border-red-200
              dark:border-red-900/60
              bg-red-50
              dark:bg-red-950/20
              transition
              hover:border-red-400
              dark:hover:border-red-700
            "
          >

            <div
              className="
                w-11
                h-11
                shrink-0
                rounded-xl
                bg-red-100
                dark:bg-red-950
                flex
                items-center
                justify-center
                text-lg
              "
            >
              ⚠️
            </div>


            <div className="flex-1">

              <p className="font-bold text-red-600 dark:text-red-400">
                Delete Account
              </p>

              <p className="text-xs text-red-500/70 dark:text-red-300/60 mt-1">
                Permanently delete your AlphaBot account
              </p>

            </div>


            <span className="text-xl text-red-400">
              ›
            </span>

          </Link>

        </div>


        {/* FOOTER */}

        <div className="text-center mt-10">

          <p className="text-xs text-zinc-500">
            AlphaBot
          </p>

          <p className="text-[11px] text-zinc-400 mt-1">
            Account & Security Settings
          </p>

        </div>

      </div>

    </main>
  );
}
