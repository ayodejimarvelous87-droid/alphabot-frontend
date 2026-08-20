import Link from "next/link";

export const metadata = {
  title: "Buy Data in Nigeria | Affordable Data Bundles | AlphaBot",
  description:
    "Learn how to buy data in Nigeria online. Explore MTN, Airtel, Glo and 9mobile data bundles and discover a simple way to get connected with AlphaBot.",
};

export default function BuyDataNigeriaPage() {
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
          Buy Data in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Looking to buy data in Nigeria? This guide explains the main
          options available across Nigerian mobile networks and what to
          consider when choosing a data bundle.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Buy Data with AlphaBot
        </Link>

      </section>


      {/* MAIN CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">

          {/* INTRO */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Buying data online in Nigeria
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Mobile data is an essential part of everyday life in Nigeria.
              People use data for messaging, social media, streaming,
              schoolwork, business, banking and staying connected with
              friends and family.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Instead of visiting a physical shop, users can purchase data
              digitally and have the bundle applied to their mobile number.
              The right option depends on your network, how much data you
              need and how long you want the bundle to last.
            </p>

          </article>


          {/* NETWORKS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Which networks can you buy data for?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Data availability depends on the services supported by the
              platform you use. AlphaBot provides access to supported data
              services for Nigerian networks.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">

              <Link
                href="/resources/mtn-data"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">
                  MTN Data Plans
                </h3>

                <p className="text-sm text-zinc-500 mt-2">
                  Explore information about MTN data bundles.
                </p>
              </Link>

              <Link
                href="/resources/airtel-data"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">
                  Airtel Data Plans
                </h3>

                <p className="text-sm text-zinc-500 mt-2">
                  Explore information about Airtel data bundles.
                </p>
              </Link>

              <Link
                href="/resources/glo-data"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">
                  Glo Data Plans
                </h3>

                <p className="text-sm text-zinc-500 mt-2">
                  Explore information about Glo data bundles.
                </p>
              </Link>

              <Link
                href="/resources/9mobile-data"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">
                  9mobile Data Plans
                </h3>

                <p className="text-sm text-zinc-500 mt-2">
                  Explore information about 9mobile data bundles.
                </p>
              </Link>

            </div>

          </article>


          {/* WHAT TO CONSIDER */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What should you consider before buying data?
            </h2>

            <div className="space-y-5 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Your mobile network
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Make sure the bundle you select is intended for your
                  network before completing the purchase.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. How much data you need
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  A light user may need a smaller bundle, while people who
                  stream videos, work online or use their phones heavily
                  may need more data.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Bundle validity
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Check how long the bundle remains valid. A larger bundle
                  is not always the best choice if it expires before you
                  can use it.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Price and convenience
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Compare the available options and choose a service that
                  makes purchasing simple and convenient.
                </p>
              </div>

            </div>

          </article>


          {/* ALPHABOT */}
          <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
              AlphaBot
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              A simple way to buy data
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings supported digital services together in one
              platform, making it easier to manage data and other everyday
              digital needs without moving between multiple services.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              If you already know the network and data bundle you want,
              you can use AlphaBot to get started.
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
                  Can I buy data online in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Data bundles can be purchased through digital
                  platforms such as AlphaBot, provided the network and
                  relevant service are supported.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Which Nigerian networks offer data bundles?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Major Nigerian mobile networks offer data services,
                  including MTN, Airtel, Glo and 9mobile.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  How do I choose the right data bundle?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Consider your network, expected usage, bundle size,
                  validity period and price before choosing a plan.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I use AlphaBot to buy data?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  AlphaBot provides supported digital services through its
                  platform. Availability of specific data products can
                  depend on the network and current service configuration.
                </p>
              </div>

            </div>

          </article>

        </div>

      </section>


      {/* FOOTER NAVIGATION */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Back to AlphaBot Resources
          </Link>

          <Link
            href="/resources/cheap-data-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Cheap Data in Nigeria →
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
