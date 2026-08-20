import Link from "next/link";

export const metadata = {
  title: "Glo Data Plans in Nigeria | Glo Data Bundles | AlphaBot",
  description:
    "Explore Glo data plans and data bundles in Nigeria. Learn how to choose a Glo bundle based on your internet usage, budget and validity needs.",
};

export default function GloDataPage() {
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
          Glo Data Plans in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Looking for Glo data plans in Nigeria? Learn how Glo data bundles
          work, how to choose a suitable plan and what to check before
          buying Glo data online.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Buy Glo Data with AlphaBot
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">


          {/* INTRO */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Glo data bundles
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Glo provides mobile internet services for users in Nigeria,
              with data options designed for different levels of internet
              usage. Mobile data can be used for browsing, messaging,
              social media, streaming, work, education and other online
              activities.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              The best Glo data plan for you depends on your normal internet
              usage, preferred validity period and budget.
            </p>

          </article>


          {/* CHOOSING PLAN */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How to choose a Glo data plan
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Consider your data usage
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Think about whether you mainly browse, use social media,
                  stream, work online, attend classes or download files.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. Choose the right bundle size
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Light users may need smaller bundles, while people who
                  stream or use the internet heavily may need larger ones.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Check the validity period
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Check how long the specific Glo bundle remains active
                  before confirming your purchase.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Confirm the current price
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Data prices and available products can change. Always
                  review the current price before completing a purchase.
                </p>
              </div>

            </div>

          </article>


          {/* USE CASES */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What can you use Glo data for?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Browsing & social media
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use Glo mobile data for websites, messaging, social
                  platforms and everyday online activities.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Streaming
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Streaming video and music can consume significant data,
                  so frequent streamers may need larger bundles.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Work & business
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Mobile data can support emails, online meetings, cloud
                  services and other work activities.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Education
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Students can use Glo data for research, online classes,
                  educational platforms and learning materials.
                </p>
              </div>

            </div>

          </article>


          {/* BUY ONLINE */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Buying Glo data online
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Buying Glo data online can be a convenient way to recharge
              without visiting a physical shop. Supported digital platforms
              can allow you to select a data product, provide the required
              phone number and complete the purchase.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Before confirming a transaction, check the Glo network,
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
              Buy supported Glo data through AlphaBot
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings supported data and other digital services
              together in one platform. If Glo data is available through
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
                  Where can I buy Glo data in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Glo data can be purchased through supported digital
                  platforms and other available channels. Verify the
                  bundle details before purchasing.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Which Glo data plan should I choose?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose a plan according to your expected usage, budget
                  and preferred validity period.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I buy Glo data online?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Glo data can be purchased through supported online
                  services, allowing users to recharge without visiting a
                  physical location.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Does AlphaBot sell Glo data?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  AlphaBot provides supported data services. The exact Glo
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
            href="/resources/airtel-data"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Airtel Data Plans
          </Link>

          <Link
            href="/resources/9mobile-data"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: 9mobile Data Plans →
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
