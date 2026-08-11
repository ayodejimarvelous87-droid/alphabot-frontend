"use client";

import { useState } from "react";
import Link from "next/link";

export default function NotificationSettings() {

  const [settings, setSettings] = useState({
    push: true,
    transactions: true,
    funding: true,
    security: true,
    promotions: true
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const toggle = (key) => {

    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

  };

  const saveSettings = async () => {

    setSaving(true);
    setMessage("");

    // Backend will be connected after UI confirmation.
    await new Promise(resolve =>
      setTimeout(resolve, 500)
    );

    setSaving(false);
    setMessage("Notification preferences saved ✅");

  };


  const cards = [

    {
      key: "push",
      icon: "🔔",
      title: "Push Notifications",
      description:
        "Allow AlphaBot to send notifications to your device."
    },

    {
      key: "transactions",
      icon: "💳",
      title: "Transaction Alerts",
      description:
        "Get alerts when your transactions are completed or updated."
    },

    {
      key: "funding",
      icon: "💰",
      title: "Funding Alerts",
      description:
        "Receive notifications about wallet funding and transfers."
    },

    {
      key: "security",
      icon: "🛡️",
      title: "Security Alerts",
      description:
        "Stay informed about important account security activity."
    },

    {
      key: "promotions",
      icon: "🎁",
      title: "Promotional Notifications",
      description:
        "Receive AlphaBot offers, rewards and special announcements."
    }

  ];


  return (

    <main className="min-h-screen bg-[#050505] text-white px-5 py-6 pb-24">

      <div className="max-w-md mx-auto">

        {/* BACK */}

        <Link
          href="/profile"
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          ← Back to Profile
        </Link>


        {/* HEADER */}

        <div className="mt-7 mb-7">

          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
            AlphaBot
          </p>

          <h1 className="text-3xl font-black mt-2">
            Notifications
          </h1>

          <p className="text-zinc-400 mt-2">
            Control how AlphaBot keeps you informed.
          </p>

        </div>


        {/* CARDS */}

        <div className="space-y-4">

          {cards.map(card => {

            const enabled = settings[card.key];

            return (

              <div
                key={card.key}
                className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5"
              >

                <div className="flex items-center gap-4">

                  {/* ICON */}

                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl">
                    {card.icon}
                  </div>


                  {/* TEXT */}

                  <div className="flex-1 min-w-0">

                    <h2 className="font-black text-base">
                      {card.title}
                    </h2>

                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      {card.description}
                    </p>

                  </div>


                  {/* TOGGLE */}

                  <button
                    type="button"
                    onClick={() => toggle(card.key)}
                    className={`relative w-12 h-7 shrink-0 rounded-full transition ${
                      enabled
                        ? "bg-white"
                        : "bg-zinc-700"
                    }`}
                    aria-label={`Toggle ${card.title}`}
                  >

                    <span
                      className={`absolute top-1 w-5 h-5 rounded-full transition ${
                        enabled
                          ? "left-6 bg-black"
                          : "left-1 bg-zinc-400"
                      }`}
                    />

                  </button>

                </div>

              </div>

            );

          })}

        </div>


        {/* INFO CARD */}

        <div className="mt-5 bg-[#18181B] border border-zinc-800 rounded-3xl p-5">

          <div className="flex gap-3">

            <span className="text-lg">
              ℹ️
            </span>

            <div>

              <h3 className="font-bold text-sm">
                About notifications
              </h3>

              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Your in-app notification history remains available
                even when push notifications are disabled.
              </p>

            </div>

          </div>

        </div>


        {/* SAVE */}

        <button
          type="button"
          onClick={saveSettings}
          disabled={saving}
          className="w-full mt-5 py-4 rounded-2xl bg-white text-black font-black disabled:opacity-50 transition"
        >
          {saving
            ? "Saving..."
            : "Save Preferences"}
        </button>


        {message && (

          <p className="text-center text-sm text-zinc-400 mt-4">
            {message}
          </p>

        )}


        {/* NOTIFICATION CENTRE */}

        <Link
          href="/notifications"
          className="block text-center text-sm text-zinc-400 hover:text-white mt-6"
        >
          🔔 Open Notification Centre
        </Link>

      </div>

    </main>

  );

}
