"use client";

import Link from "next/link";

const helpOptions = [
  {
    icon: "📦",
    title: "Order or delivery issue",
    description:
      "Something is wrong with an order, delivery, or order status.",
  },
  {
    icon: "💳",
    title: "Payment issue",
    description:
      "Your payment failed, was charged unexpectedly, or was not reflected correctly.",
  },
  {
    icon: "🛍️",
    title: "Product or seller issue",
    description:
      "A product is not as described, a seller issue occurred, or you need help with a listing.",
  },
  {
    icon: "🏪",
    title: "Seller account help",
    description:
      "Help with seller applications, products, settings, earnings, or payouts.",
  },
  {
    icon: "👤",
    title: "Marketplace account issue",
    description:
      "You are having trouble accessing or using a Marketplace feature.",
  },
  {
    icon: "🚨",
    title: "Report suspicious activity",
    description:
      "Report behaviour or activity that may be unsafe or against Marketplace rules.",
  },
];

export default function MarketplaceHelpPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-10">
      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/marketplace"
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center"
          >
            ←
          </Link>

          <div>
            <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
              ALPHABOT MARKETPLACE
            </p>

            <h1 className="font-black text-sm">
              Marketplace Help
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4">
        <section className="mt-5 rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-black p-5">
          <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-400 dark:text-yellow-600">
            NEED HELP?
          </p>

          <h2 className="text-xl font-black mt-2">
            Let&apos;s sort it out.
          </h2>

          <p className="text-xs opacity-60 mt-2 leading-5">
            Choose the area that best describes your Marketplace issue.
          </p>
        </section>

        <section className="mt-5 space-y-3">
          {helpOptions.map((option) => (
            <button
              key={option.title}
              type="button"
              onClick={() =>
                alert(
                  `${option.title}\n\nPlease contact AlphaBot support with your order or account details so the issue can be reviewed.`
                )
              }
              className="w-full text-left rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4 active:scale-[0.99] transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-yellow-400 text-black flex items-center justify-center text-lg shrink-0">
                  {option.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xs font-black">
                    {option.title}
                  </h3>

                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-4">
                    {option.description}
                  </p>
                </div>

                <span className="text-zinc-400">
                  →
                </span>
              </div>
            </button>
          ))}
        </section>

        <section className="mt-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] p-5">
          <p className="text-xs font-black">
            ❓ Check the FAQ first
          </p>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            You may find a quick answer to common buying, selling, payment,
            delivery, returns and Marketplace questions in the FAQ.
          </p>

          <Link
            href="/marketplace/faq"
            className="mt-4 h-11 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-black active:scale-[0.98] transition"
          >
            ❓ View Marketplace FAQ
          </Link>
        </section>
      </div>
    </main>
  );
}
