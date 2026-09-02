"use client";

import Link from "next/link";

const faqSections = [
  {
    title: "Buying on Marketplace",
    icon: "🛍️",
    items: [
      {
        question: "How do I buy a product?",
        answer:
          "Browse the Marketplace, open a product you are interested in, review the product details and seller information, then add the product to your cart and continue to checkout.",
      },
      {
        question: "How do I know if a seller is verified?",
        answer:
          "Verified Marketplace sellers are reviewed by AlphaBot before they can publish products. Look for the verification information shown on the seller or product experience.",
      },
      {
        question: "Can I contact a seller?",
        answer:
          "Yes. Seller contact information available for Marketplace transactions may be used to communicate about your order or product when appropriate.",
      },
    ],
  },
  {
    title: "Orders & Delivery",
    icon: "📦",
    items: [
      {
        question: "Where can I see my orders?",
        answer:
          "Open Marketplace and go to your Marketplace orders section to review your orders and their current status.",
      },
      {
        question: "How do I know when my order is delivered?",
        answer:
          "AlphaBot can update you through Marketplace notifications when important order events occur, including delivery and completion.",
      },
      {
        question: "What should I do if my order is delayed?",
        answer:
          "First check your order status and any available seller information. If the issue cannot be resolved, use Marketplace Help to report the problem.",
      },
    ],
  },
  {
    title: "Payments",
    icon: "💳",
    items: [
      {
        question: "How do I pay for a Marketplace order?",
        answer:
          "Marketplace orders use the payment options presented during checkout. Follow the checkout instructions shown by AlphaBot.",
      },
      {
        question: "How do I know if my payment was confirmed?",
        answer:
          "A successful payment confirmation is reflected in your Marketplace order flow and may also appear in your AlphaBot notifications.",
      },
      {
        question: "What if I was charged but my order was not confirmed?",
        answer:
          "Do not repeatedly attempt the payment. Check your order status first, then use Marketplace Help if the issue remains unresolved.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    icon: "↩️",
    items: [
      {
        question: "Can I return a product?",
        answer:
          "Returns depend on the return policy specified by the seller for that product. Review the product and seller information before purchasing.",
      },
      {
        question: "What if a product is different from its description?",
        answer:
          "Keep your order information and any relevant evidence, then contact Marketplace Help so the issue can be reviewed.",
      },
    ],
  },
  {
    title: "Selling on Marketplace",
    icon: "🏪",
    items: [
      {
        question: "How do I become a seller?",
        answer:
          "Open Sell on AlphaBot from the Marketplace and complete the seller application. AlphaBot reviews seller applications before products can be published.",
      },
      {
        question: "How many images can my product have?",
        answer:
          "Marketplace products require at least 3 images and allow up to 6 images.",
      },
      {
        question: "What should I include in my product description?",
        answer:
          "Give buyers useful information such as the product overview, key features, uses or benefits, what is included, condition and important notes.",
      },
      {
        question: "How do seller payouts work?",
        answer:
          "Approved sellers provide payout information through their seller account. Payout timing follows the option selected by the seller and the applicable Marketplace process.",
      },
    ],
  },
  {
    title: "Marketplace Safety",
    icon: "🔐",
    items: [
      {
        question: "Should I share my private account information with a seller?",
        answer:
          "Do not share passwords, PINs, verification codes or other sensitive account credentials with anyone.",
      },
      {
        question: "What should I do if I notice suspicious activity?",
        answer:
          "Stop the transaction if necessary, preserve relevant information and report the issue through Marketplace Help.",
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  return (
    <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#101010]">
      <summary className="cursor-pointer list-none px-4 py-4 flex items-center justify-between gap-4">
        <span className="text-xs font-black leading-5">{question}</span>
        <span className="text-zinc-400 group-open:rotate-45 transition-transform text-lg">
          +
        </span>
      </summary>

      <div className="px-4 pb-4">
        <p className="text-[11px] leading-5 text-zinc-500 dark:text-zinc-400">
          {answer}
        </p>
      </div>
    </details>
  );
}

export default function MarketplaceFAQPage() {
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
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4">
        <section className="mt-5 rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-black p-5">
          <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-400 dark:text-yellow-600">
            MARKETPLACE FAQ
          </p>

          <h2 className="text-xl font-black mt-2">
            Everything you need to know.
          </h2>

          <p className="text-xs opacity-60 mt-2 leading-5">
            Answers for both buyers and sellers using AlphaBot Marketplace.
          </p>
        </section>

        <div className="mt-5 space-y-5">
          {faqSections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center text-lg">
                  {section.icon}
                </div>

                <h2 className="text-sm font-black">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-2">
                {section.items.map((item) => (
                  <FAQItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-5 rounded-3xl border border-yellow-400/30 bg-yellow-400/10 p-5">
          <p className="text-xs font-black">
            Still need help?
          </p>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            If your question is not answered here, Marketplace Help can guide
            you through buyer and seller issues.
          </p>

          <Link
            href="/marketplace/help"
            className="mt-4 h-11 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xs font-black active:scale-[0.98] transition"
          >
            🆘 Open Marketplace Help
          </Link>
        </section>
      </div>
    </main>
  );
}
