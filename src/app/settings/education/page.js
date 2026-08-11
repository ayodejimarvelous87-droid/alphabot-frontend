"use client";

import Link from "next/link";

const sections = [
  {
    title: "Account & Authentication",
    description: "Protect your account, credentials and verification methods.",
    items: [
      {
        icon: "🔢",
        title: "OTP, PIN & Verification Codes",
        description: "How to keep your codes private and avoid verification scams.",
        href: "/settings/education/otp-pin",
      },
      {
        icon: "🔑",
        title: "Password Security",
        description: "Create stronger passwords and protect your login.",
        href: "/settings/education/passwords",
      },
      {
        icon: "🛡️",
        title: "Two-Factor Authentication",
        description: "Learn how 2FA protects your account.",
        href: "/settings/education/2fa",
      },
      {
        icon: "👆",
        title: "Biometrics & Device Security",
        description: "Keep your phone and biometric authentication secure.",
        href: "/settings/education/biometrics",
      },
      {
        icon: "🪪",
        title: "Identity Theft",
        description: "Understand how criminals can misuse personal information.",
        href: "/settings/education/identity-theft",
      },
    ],
  },

  {
    title: "Common Scams",
    description: "Learn how common scams work and how to recognise them.",
    items: [
      {
        icon: "❤️",
        title: "Love & Romance Scams",
        description: "Recognise emotional manipulation and requests for money.",
        href: "/settings/education/love-scams",
      },
      {
        icon: "🎣",
        title: "Phishing & Fake Links",
        description: "Spot fake websites, messages and login pages.",
        href: "/settings/education/phishing",
      },
      {
        icon: "📞",
        title: "Fake Customer Support",
        description: "Avoid people pretending to be AlphaBot or another company.",
        href: "/settings/education/fake-support",
      },
      {
        icon: "👥",
        title: "Impersonation Scams",
        description: "Learn how scammers pretend to be people you trust.",
        href: "/settings/education/impersonation",
      },
      {
        icon: "💰",
        title: "Investment & Crypto Scams",
        description: "Identify fake investments, guaranteed returns and Ponzi schemes.",
        href: "/settings/education/investment-scams",
      },
      {
        icon: "💼",
        title: "Job & Task Scams",
        description: "Recognise fake jobs, task platforms and payment traps.",
        href: "/settings/education/job-scams",
      },
      {
        icon: "🎁",
        title: "Giveaway & Prize Scams",
        description: "Be careful when someone says you have won something.",
        href: "/settings/education/prize-scams",
      },
      {
        icon: "📦",
        title: "Fake Delivery Scams",
        description: "Avoid fake parcel, customs and delivery-payment requests.",
        href: "/settings/education/delivery-scams",
      },
      {
        icon: "💳",
        title: "Payment & Transfer Scams",
        description: "Stay safe when sending or receiving money.",
        href: "/settings/education/payment-scams",
      },
    ],
  },

  {
    title: "General Online Safety",
    description: "Practical security knowledge for everyday digital life.",
    items: [
      {
        icon: "📱",
        title: "Social Media Safety",
        description: "Protect your accounts and personal information online.",
        href: "/settings/education/social-media",
      },
      {
        icon: "🌐",
        title: "Safe Browsing",
        description: "Identify unsafe websites and suspicious online activity.",
        href: "/settings/education/safe-browsing",
      },
      {
        icon: "📶",
        title: "Public Wi-Fi Safety",
        description: "Understand the risks of using unsecured networks.",
        href: "/settings/education/public-wifi",
      },
      {
        icon: "📸",
        title: "Protecting Personal Information",
        description: "Know what information you should keep private.",
        href: "/settings/education/personal-information",
      },
      {
        icon: "🧠",
        title: "Social Engineering",
        description: "Understand how scammers manipulate people into giving up information.",
        href: "/settings/education/social-engineering",
      },
      {
        icon: "🚨",
        title: "What To Do If You Have Been Scammed",
        description: "Steps to take quickly if you think you have lost money or information.",
        href: "/settings/education/been-scammed",
      },
    ],
  },
];

export default function SecurityEducation() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        <Link
          href="/settings"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Settings
        </Link>

        <div className="mt-7 mb-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Learn & Protect
          </p>

          <h1 className="text-3xl font-black mt-2">
            Security Education
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
            Learn how common scams work, protect your information and keep
            your AlphaBot account secure.
          </p>

        </div>


        <div className="space-y-8">

          {sections.map((section) => (

            <section key={section.title}>

              <div className="mb-3">

                <h2 className="text-lg font-black">
                  {section.title}
                </h2>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {section.description}
                </p>

              </div>


              <div className="space-y-2">

                {section.items.map((item) => (

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

            </section>

          ))}

        </div>


        <div
          className="
            mt-8
            p-5
            rounded-2xl
            bg-zinc-100
            dark:bg-[#18181B]
            border
            border-zinc-200
            dark:border-zinc-800
          "
        >

          <p className="font-bold">
            🛡️ Stay alert
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
            Scammers often rely on urgency, fear, trust or excitement.
            If someone pressures you to send money or reveal a password,
            PIN, OTP or verification code, stop and verify who you are
            dealing with first.
          </p>

        </div>

      </div>

    </main>
  );
}
