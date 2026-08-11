"use client";

import { useState } from "react";
import Link from "next/link";

export default function NotificationSettings() {

  const [settings, setSettings] = useState({
    push: true,
    transactions: true,
    funding: true,
    security: true,
    promotions: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "push",
      icon: "📱",
      title: "Push Notifications",
      description: "Allow AlphaBot to send notifications to this device.",
    },
    {
      key: "transactions",
      icon: "💳",
      title: "Transaction Alerts",
      description: "Purchases, transfers and transaction updates.",
    },
    {
      key: "funding",
      icon: "💰",
      title: "Funding Alerts",
      description: "Wallet funding and transfer status updates.",
    },
    {
      key: "security",
      icon: "🔐",
      title: "Security Alerts",
      description: "Important login and account security activity.",
      locked: true,
    },
    {
      key: "promotions",
      icon: "🎁",
      title: "Promotions & Offers",
      description: "New features, special offers and AlphaBot announcements.",
    },
  ];

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
            Preferences
          </p>

          <h1 className="text-3xl font-black mt-2">
            Notifications
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Choose which notifications AlphaBot can send you.
          </p>

        </div>


        <div className="space-y-2">

          {items.map((item) => {

            const disabled =
              item.locked || (!settings.push && item.key !== "push");

            const enabled =
              item.locked
                ? true
                : settings[item.key] && settings.push;

            return (

              <div
                key={item.key}
                className="
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


                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => toggle(item.key)}
                  className={`
                    relative
                    shrink-0
                    w-12
                    h-7
                    rounded-full
                    transition
                    ${enabled
                      ? "bg-green-500"
                      : "bg-zinc-300 dark:bg-zinc-700"
                    }
                    ${disabled && !item.locked
                      ? "opacity-40"
                      : ""
                    }
                  `}
                  aria-label={`Toggle ${item.title}`}
                >

                  <span
                    className={`
                      absolute
                      top-1
                      w-5
                      h-5
                      rounded-full
                      bg-white
                      shadow
                      transition
                      ${enabled
                        ? "left-6"
                        : "left-1"
                      }
                    `}
                  />

                </button>

              </div>

            );

          })}

        </div>


        <div
          className="
            mt-5
            p-4
            rounded-2xl
            bg-yellow-50
            dark:bg-yellow-950/20
            border
            border-yellow-200
            dark:border-yellow-900
          "
        >

          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            Security alerts cannot be disabled because they may contain
            important information about your AlphaBot account.
          </p>

        </div>


        <p className="text-center text-[11px] text-zinc-400 mt-8">
          Notification preferences are currently saved for this session.
        </p>

      </div>

    </main>
  );
}
