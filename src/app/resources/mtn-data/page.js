import Link from "next/link";

export const metadata = {
  title: "MTN Data Plans in Nigeria | Bundles & Prices | AlphaBot",
  description:
    "Explore MTN data plans and bundles in Nigeria. Learn about MTN internet options, bundle validity, pricing and how to choose the right data plan.",
  keywords: [
    "MTN data plans",
    "MTN data Nigeria",
    "MTN data bundles",
    "MTN internet bundles",
    "MTN data plans Nigeria",
    "MTN data prices",
    "buy MTN data",
    "cheap MTN data",
    "MTN internet Nigeria",
    "AlphaBot MTN data",
  ],
};

export default function MTNDataPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">

        <Link href="/" className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-700 flex items-center justify-center">
            <span className="text-xl font-black bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              A
            </span>
          </div>

          <span className="text-xl font-bold">
            AlphaBot
          </span>

        </Link>

        <div className="flex gap-5 text-sm text-zinc-400">

          <Link
            href="/resources"
            className="hover:text-white transition"
          >
            Resources
          </Link>

          <Link
            href="/login"
            className="hover:text-white transition"
          >
            Login
          </Link>

        </div>

      </nav>


      {/* HERO */}
      <section className="px-6 pt-16 pb-12 max-w-4xl mx-auto">

        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
          AlphaBot Guide
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          MTN Data Plans in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Looking for MTN data plans in Nigeria? Learn how MTN data bundles
          work, how to choose a suitable bundle and what to consider before
          buying MTN data online.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Buy MTN Data with AlphaBot
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">


          {/* INTRO */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              MTN data bundles
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              MTN provides mobile internet services for users in Nigeria,
              with data options designed for different types of usage.
              Depending on your needs, you may use mobile data for browsing,
              social media, streaming, work, school, communication and
              other online activities.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              The right MTN data plan depends on how frequently you use the
              internet, how much data you need and how long you want the
              bundle to remain active.
            </p>

          </article>


          {/* CHOOSING PLAN */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How to choose an MTN data plan
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Consider your daily usage
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Think about how often you browse, use social media,
                  stream videos, download files or use other online
                  services.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. Choose an appropriate bundle size
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Light users may need smaller bundles, while people who
                  regularly stream, work online or download large files
                  may need more data.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Check the validity period
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Always check how long the selected MTN data bundle remains
                  valid before purchasing it.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Check the current price
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Data prices and available offers can change. Review the
                  current price displayed by the service you are using
                  before completing a purchase.
                </p>
              </div>

            </div>

          </article>


          {/* COMMON USE CASES */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What can you use MTN data for?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Social media
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use mobile data for social platforms, messaging and
                  sharing photos, videos and other content.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Streaming
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Video and music streaming can use significant amounts of
                  data, making bundle size important for regular streamers.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Work and business
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Mobile internet can support emails, online meetings,
                  cloud services, research and other work activities.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  School and learning
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Students can use data for online classes, research,
                  educational platforms and downloading learning materials.
                </p>
              </div>

            </div>

          </article>


          {/* BUY ONLINE */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Buying MTN data online
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Buying data online can be convenient when you want to recharge
              your MTN number without visiting a physical shop. Digital
              platforms can allow you to select a supported data product,
              enter the required mobile number and complete the purchase.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Before confirming a transaction, check the network, phone
              number, bundle details, price and validity period.
            </p>

            <Link
              href="/resources/buy-data-nigeria"
              className="inline-flex mt-6 text-sm font-bold text-zinc-300 hover:text-white transition"
            >
              Learn more about buying data in Nigeria →
            </Link>

          </article>


          {/* ALPHABOT */}
          <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
              AlphaBot
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              Buy supported MTN data through AlphaBot
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings supported data and other digital services
              together in one platform. If MTN data is available through
              the current AlphaBot service configuration, you can use the
              platform to access the available options.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Available products and prices may change, so always review
              the current options shown on AlphaBot before purchasing.
            </p>

            <Link
              href="/register"
              className="inline-flex mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Get Started with AlphaBot
            </Link>

          </article>


          {/* FAQ */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Frequently asked questions
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  Where can I buy MTN data in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  MTN data can be purchased through supported digital
                  platforms and other available channels. Always verify
                  the network and bundle details before purchasing.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Which MTN data plan should I choose?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose a bundle based on your expected usage, preferred
                  validity period and budget.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I buy MTN data online?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. MTN data can be purchased through supported online
                  services, making it possible to recharge without visiting
                  a physical location.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Does AlphaBot sell MTN data?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  AlphaBot provides supported data services. The exact MTN
                  products and prices available depend on the current
                  service configuration.
                </p>
              </div>

            </div>

          </article>

        </div>

      </section>


      {/* NAVIGATION */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/awoof-data"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Awoof Data
          </Link>

          <Link
            href="/resources/airtel-data"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Airtel Data Plans →
          </Link>

        </div>

      </section>


      <footer className="border-t border-zinc-800 px-6 py-10">

        <div className="max-w-4xl mx-auto text-xs text-zinc-600">
          © {new Date().getFullYear()} AlphaBot. All rights reserved.
        </div>

      </footer>

    </main>
  );
}
