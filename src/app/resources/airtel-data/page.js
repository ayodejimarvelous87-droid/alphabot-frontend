import Link from "next/link";

export const metadata = {
  title: "Airtel Data Plans in Nigeria | Bundles & Prices | AlphaBot",
  description:
    "Explore Airtel data plans and bundles in Nigeria. Learn about Airtel internet options, bundle validity, pricing and how to choose the right data plan.",
  keywords: [
    "Airtel data plans",
    "Airtel data Nigeria",
    "Airtel data bundles",
    "Airtel internet bundles",
    "Airtel data plans Nigeria",
    "Airtel data prices",
    "buy Airtel data",
    "cheap Airtel data",
    "Airtel internet Nigeria",
    "AlphaBot Airtel data",
  ],
};

export default function AirtelDataPage() {
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

          <Link href="/resources" className="hover:text-white transition">
            Resources
          </Link>

          <Link href="/login" className="hover:text-white transition">
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
          Airtel Data Plans in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Looking for Airtel data plans in Nigeria? Learn how Airtel data
          bundles work, how to choose a suitable plan and what to check
          before buying Airtel data online.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Buy Airtel Data with AlphaBot
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">


          {/* INTRO */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Airtel data bundles
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Airtel provides mobile internet services for users in Nigeria,
              with data options for different types of internet usage.
              Mobile data can be used for browsing, messaging, social media,
              streaming, work, education and other online activities.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Choosing the right Airtel data plan depends on how much data
              you normally use, your budget and how long you want the bundle
              to remain active.
            </p>

          </article>


          {/* CHOOSING PLAN */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How to choose an Airtel data plan
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Consider your internet usage
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Think about whether you mainly browse, use social media,
                  stream videos, work online, attend classes or download
                  files.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. Pick the right data size
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Smaller bundles may be suitable for light usage, while
                  heavier users may need larger data allowances.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Check the validity
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Always check the validity period of the specific Airtel
                  bundle before making a purchase.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Confirm the current price
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Data prices and available products can change. Review the
                  current price displayed before completing your purchase.
                </p>
              </div>

            </div>

          </article>


          {/* USE CASES */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What can you use Airtel data for?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Browsing & social media
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use Airtel mobile data for websites, messaging, social
                  platforms and everyday online activities.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Streaming
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Video and music streaming can consume more data, so
                  frequent streamers may benefit from larger bundles.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Work & business
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Airtel data can support emails, online meetings, cloud
                  services and other work activities.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Education
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Students can use mobile data for research, online classes,
                  educational platforms and learning materials.
                </p>
              </div>

            </div>

          </article>


          {/* BUY ONLINE */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Buying Airtel data online
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Buying Airtel data online can be a convenient way to recharge
              your number without visiting a physical shop. Supported
              digital platforms can allow you to select a data product,
              provide the required mobile number and complete the purchase.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Before confirming a transaction, check the Airtel network,
              phone number, bundle details, price and validity period.
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
              Buy supported Airtel data through AlphaBot
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings supported data and other digital services
              together in one platform. If Airtel data is available through
              the current AlphaBot service configuration, you can access
              the available options through the platform.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Available products and prices may change, so review the
              current options displayed on AlphaBot before purchasing.
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
                  Where can I buy Airtel data in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Airtel data can be purchased through supported digital
                  platforms and other available channels. Always verify
                  the bundle details before purchasing.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Which Airtel data plan should I choose?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose a plan according to your expected usage, budget
                  and preferred validity period.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I buy Airtel data online?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Airtel data can be purchased through supported online
                  services, allowing users to recharge without visiting a
                  physical location.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Does AlphaBot sell Airtel data?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  AlphaBot provides supported data services. The exact
                  Airtel products and prices available depend on the current
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
            href="/resources/mtn-data"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: MTN Data Plans
          </Link>

          <Link
            href="/resources/glo-data"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Glo Data Plans →
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
