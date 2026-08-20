import Link from "next/link";

export const metadata = {
  title: "Data Bundles in Nigeria | Compare Data Plans | AlphaBot",
  description:
    "Learn about mobile data bundles in Nigeria, how data plans work, what to consider when choosing a bundle and how to buy data online.",
};

export default function DataBundlesNigeriaPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

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
          Data Bundles in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Learn how mobile data bundles work in Nigeria, how to choose a
          suitable plan and how to buy data online for your network.
        </p>

        <Link
          href="/data"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Buy Data with AlphaBot
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">


          {/* WHAT ARE DATA BUNDLES */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What is a data bundle?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              A mobile data bundle is a package of internet data provided
              for use on a mobile network. Instead of paying for individual
              internet usage, you purchase a specific amount of data that
              can be used during its applicable validity period.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Data bundles can differ in size, price, validity period and
              availability depending on the network and the particular
              offer.
            </p>

          </article>


          {/* NETWORKS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Popular data networks in Nigeria
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Nigerian mobile users can choose from data plans offered by
              major networks. Available bundles and prices can change over
              time.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">MTN Data Plans</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Explore available MTN internet bundles and data options.
                </p>
                <Link
                  href="/resources/mtn-data"
                  className="inline-block text-sm text-zinc-300 font-semibold mt-4"
                >
                  View guide →
                </Link>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">Airtel Data Plans</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Explore available Airtel internet bundles and data options.
                </p>
                <Link
                  href="/resources/airtel-data"
                  className="inline-block text-sm text-zinc-300 font-semibold mt-4"
                >
                  View guide →
                </Link>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">Glo Data Plans</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Explore available Glo internet bundles and data options.
                </p>
                <Link
                  href="/resources/glo-data"
                  className="inline-block text-sm text-zinc-300 font-semibold mt-4"
                >
                  View guide →
                </Link>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">9mobile Data Plans</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Explore available 9mobile internet bundles and data options.
                </p>
                <Link
                  href="/resources/9mobile-data"
                  className="inline-block text-sm text-zinc-300 font-semibold mt-4"
                >
                  View guide →
                </Link>
              </div>

            </div>

          </article>


          {/* TYPES */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Common types of data bundles
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Daily Data
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Short-term bundles designed for users who need internet
                  access for a limited period.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Weekly Data
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Bundles intended to provide connectivity over several days.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Monthly Data
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Longer-validity plans suitable for regular monthly internet
                  usage.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Promotional & Special Offers
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Some networks may offer special or promotional bundles
                  subject to their terms and availability.
                </p>
              </div>

            </div>

          </article>


          {/* HOW TO CHOOSE */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How to choose the right data bundle
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Consider your usage
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Think about whether you mainly browse, use social media,
                  stream videos, make video calls or download files.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. Check the validity
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  A larger bundle is not always better if it expires before
                  you can use it. Check how long the bundle remains valid.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Compare the value
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Compare the amount of data, price and validity before
                  selecting a plan.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Check the network
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Make sure the bundle belongs to the network of the number
                  you want to recharge.
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
              Find and buy data with AlphaBot
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot provides supported data bundles for users who want
              convenient access to mobile internet services from one platform.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Available networks, plans and prices depend on the current
              AlphaBot service configuration.
            </p>

            <Link
              href="/data"
              className="inline-flex mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Explore Data Plans
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
                  What is the best data bundle in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  The best bundle depends on your network, usage, budget,
                  data allowance and required validity period.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I buy data online?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Supported digital platforms can allow users to
                  purchase mobile data online.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Which networks offer data bundles?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Major Nigerian networks including MTN, Airtel, Glo and
                  9mobile provide mobile data services.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Do data bundles expire?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Data bundles commonly have a stated validity period.
                  Always check the terms of the specific bundle before
                  purchasing.
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
            href="/resources/9mobile-data"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: 9mobile Data Plans
          </Link>

          <Link
            href="/resources/bills-payment-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Bills Payment →
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
