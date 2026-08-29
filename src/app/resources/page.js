import Link from "next/link";

const categories = [
  {
    title: "Data & Connectivity",
    description: "Explore data bundles, affordable internet options and connectivity services in Nigeria.",
    icon: "📶",
    resources: [
      {
        title: "Buy Data in Nigeria",
        description: "Learn about buying data bundles online in Nigeria.",
        href: "/resources/buy-data-nigeria",
      },
      {
        title: "Cheap Data in Nigeria",
        description: "Explore affordable data options and bundles.",
        href: "/resources/cheap-data-nigeria",
      },
      {
        title: "Awoof Data",
        description: "Discover affordable and promotional data opportunities.",
        href: "/resources/awoof-data",
      },
      {
        title: "MTN Data Plans",
        description: "Explore MTN data bundles and internet options.",
        href: "/resources/mtn-data",
      },
      {
        title: "Airtel Data Plans",
        description: "Explore Airtel data bundles and internet options.",
        href: "/resources/airtel-data",
      },
      {
        title: "Glo Data Plans",
        description: "Explore Glo data bundles and internet options.",
        href: "/resources/glo-data",
      },
      {
        title: "9mobile Data Plans",
        description: "Explore 9mobile data bundles and internet options.",
        href: "/resources/9mobile-data",
      },
    ],
  },

  {
    title: "VTU & Digital Services",
    description: "Learn about VTU services, airtime, bills and other everyday digital services.",
    icon: "💳",
    resources: [
      {
        title: "Best VTU Services in Nigeria",
        description: "Learn what to look for when choosing a reliable VTU platform.",
        href: "/resources/best-vtu-nigeria",
      },
      {
        title: "Buy Airtime Online",
        description: "Learn about convenient airtime top-up options.",
        href: "/resources/buy-airtime-nigeria",
      },
      {
        title: "Airtime & Data",
        description: "Explore digital options for airtime and data.",
        href: "/resources/airtime-data-nigeria",
      },
      {
        title: "Bills Payment",
        description: "Learn about paying supported bills through digital platforms.",
        href: "/resources/bills-payment-nigeria",
      },
      {
        title: "Electricity Bills",
        description: "Learn about digital electricity bill payments.",
        href: "/resources/electricity-bills-nigeria",
      },
      {
        title: "TV Subscription",
        description: "Learn about convenient digital TV subscription payments.",
        href: "/resources/tv-subscription-nigeria",
      },
    ],
  },

  {
    title: "AlphaBot Arena",
    description: "Explore AlphaBot's football, competitions, teams, rankings and rewards.",
    icon: "⚽",
    resources: [
      {
        title: "Football Arena",
        description: "Explore the AlphaBot football experience.",
        href: "/resources/football-arena",
      },
      {
        title: "AlphaBot Competitions",
        description: "Learn about competitions and ways users can participate.",
        href: "/resources/competitions",
      },
      {
        title: "Team Rush",
        description: "Learn how AlphaBot team-based competitions work.",
        href: "/resources/team-rush",
      },
      {
        title: "Leaderboards & Rewards",
        description: "Explore rankings, activity and available rewards.",
        href: "/resources/leaderboards-rewards",
      },
    ],
  },

  {
    title: "Technology",
    description: "Learn about AlphaBot's technology, API, automation and intelligent features.",
    icon: "🤖",
    resources: [
      {
        title: "AlphaBot API",
        description: "Learn about integrating digital services with the AlphaBot API.",
        href: "/resources/alphabot-api",
      },
      {
        title: "WhatsApp Data Bot",
        description: "Learn how automated data services can work through WhatsApp.",
        href: "/resources/whatsapp-data-bot",
      },
      {
        title: "AI Features",
        description: "Explore how intelligent technology is being used within AlphaBot.",
        href: "/resources/ai-features",
      },
      {
        title: "Digital Payments",
        description: "Learn about AlphaBot's approach to digital payment services.",
        href: "/resources/digital-payments",
      },
    ],
  },

  {
    title: "Security & Account Protection",
    description: "Learn how to protect your AlphaBot account, wallet and transactions.",
    icon: "🔐",
    resources: [
      {
        title: "Secure Your AlphaBot Account",
        description: "Practical steps for keeping your account protected.",
        href: "/resources/account-security",
      },
      {
        title: "Transaction PIN",
        description: "Understand how transaction PIN protection works.",
        href: "/resources/transaction-pin",
      },
      {
        title: "Two-Factor Authentication",
        description: "Learn how additional account protection can help secure access.",
        href: "/resources/two-factor-authentication",
      },
      {
        title: "Wallet Security",
        description: "Learn about protecting your wallet and account activities.",
        href: "/resources/wallet-security",
      },
    ],
  },

  {
    title: "AlphaBot & Community",
    description: "Discover AlphaBot's referral, partner, rewards and community features.",
    icon: "🚀",
    resources: [
      {
        title: "AlphaBot Referral Program",
        description: "Learn how the AlphaBot referral system works.",
        href: "/resources/referral-program",
      },
      {
        title: "AlphaBot Partner Program",
        description: "Learn how partners can grow with AlphaBot.",
        href: "/resources/partner-program",
      },
      {
        title: "AlphaBot Coins",
        description: "Learn about AlphaBot Coins and how they can be used.",
        href: "/resources/alphabot-coins",
      },
      {
        title: "Rewards",
        description: "Explore AlphaBot rewards, events and user activities.",
        href: "/resources/rewards",
      },
    ],
  },
];

export const metadata = {
  title: "AlphaBot Resources | Data, VTU, Football, API & More",
  description:
    "Explore AlphaBot resources for data bundles, cheap data, Awoof data, VTU services, football, competitions, API, security, rewards and digital services in Nigeria.",
  keywords: [
    "AlphaBot",
    "data bundles Nigeria",
    "cheap data Nigeria",
    "Awoof data",
    "VTU Nigeria",
    "football Nigeria",
    "VTU API",
    "digital services Nigeria",
    "AlphaBot API",
    "data plans Nigeria",
  ],
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-[#18181B] border border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
            <span className="text-xl font-black bg-gradient-to-br from-zinc-950 to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
              A
            </span>
          </div>

          <span className="text-xl font-bold">
            AlphaBot
          </span>
        </Link>

        <div className="flex gap-5 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/about" className="hover:text-zinc-950 dark:hover:text-white transition">
            About
          </Link>

          <Link href="/login" className="hover:text-zinc-950 dark:hover:text-white transition">
            Login
          </Link>
        </div>
      </nav>


      {/* HERO */}
      <section className="px-6 pt-16 pb-12 max-w-5xl mx-auto">

        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
          AlphaBot Resources
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          Explore AlphaBot
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mt-5 leading-7">
          Guides, services, features and useful information about AlphaBot,
          digital services and everyday technology.
        </p>

      </section>


      {/* RESOURCE CATEGORIES */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">

        <div className="space-y-8">

          {categories.map((category) => (

            <section
              key={category.title}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-6 sm:p-8"
            >

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-50 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xl">
                  {category.icon}
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    {category.title}
                  </h2>

                  <p className="text-sm text-zinc-500 mt-2 leading-6 max-w-2xl">
                    {category.description}
                  </p>
                </div>

              </div>


              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">

                {category.resources.map((resource) => (

                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-[#18181B] transition"
                  >

                    <h3 className="font-bold group-hover:text-zinc-950 dark:hover:text-white">
                      {resource.title}
                    </h3>

                    <p className="text-xs text-zinc-500 mt-2 leading-5">
                      {resource.description}
                    </p>

                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold mt-3">
                      Explore guide →
                    </p>

                  </Link>

                ))}

              </div>

            </section>

          ))}

        </div>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">

        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181B] p-6 sm:p-8">

          <h2 className="text-2xl font-black">
            Ready to use AlphaBot?
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 mt-3 leading-7 max-w-2xl">
            Access data, airtime, bills, payments, competitions and other
            digital services from one platform.
          </p>

          <Link
            href="/register"
            className="inline-flex mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Get Started
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-10">

        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-4">

          <div>
            <p className="font-black">
              AlphaBot
            </p>

            <p className="text-xs text-zinc-600 mt-2">
              Digital services, payments and intelligent technology.
            </p>
          </div>

          <div className="flex gap-5 text-xs text-zinc-500">
            <Link href="/about" className="hover:text-zinc-950 dark:hover:text-white transition">
              About
            </Link>

            <Link href="/support" className="hover:text-zinc-950 dark:hover:text-white transition">
              Support
            </Link>

            <Link href="/contact" className="hover:text-zinc-950 dark:hover:text-white transition">
              Contact
            </Link>

            <Link href="/" className="hover:text-zinc-950 dark:hover:text-white transition">
              Home
            </Link>
          </div>

        </div>

      </footer>

    </main>
  );
}
