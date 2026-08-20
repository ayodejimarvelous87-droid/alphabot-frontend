import Link from "next/link";

export const metadata = {
  title: "Cheap Data in Nigeria | Affordable Data Bundles",
  description:
    "Find cheap data in Nigeria with AlphaBot. Learn how to compare affordable data bundles, network options, prices and validity before buying data online.",
  keywords: [
    "cheap data in Nigeria",
    "cheapest data Nigeria",
    "affordable data Nigeria",
    "cheap data bundles Nigeria",
    "cheap internet data Nigeria",
    "data bundles Nigeria",
    "buy cheap data Nigeria",
    "AlphaBot data",
  ],
};

export default function CheapDataNigeriaPage() {
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
          Cheap Data in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Looking for affordable data in Nigeria? Learn how to compare data
          bundles, understand their value and choose an option that fits
          your usage and budget.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Explore AlphaBot
        </Link>

      </section>


      {/* MAIN CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">

          {/* INTRO */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What makes a data bundle cheap?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Cheap data does not always mean choosing the bundle with the
              lowest price. A better way to compare data is to consider how
              much data you receive, how long it lasts and whether it matches
              the way you use your phone.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              A small bundle may be cheaper upfront, while a larger bundle
              may provide better value for someone who uses mobile internet
              frequently.
            </p>

          </article>


          {/* HOW TO FIND CHEAP DATA */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How to find affordable data in Nigeria
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  Compare the amount of data
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Compare how many megabytes or gigabytes each option
                  provides rather than looking only at the selling price.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Check the validity period
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  A bundle that lasts longer may be more useful than a
                  cheaper bundle that expires before you finish using it.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Consider your usage
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Social media, video streaming, gaming, downloads and
                  general browsing can consume very different amounts of
                  data.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Compare available options
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Data offers can vary between networks and services, so
                  checking the available options before purchasing can help
                  you find better value.
                </p>
              </div>

            </div>

          </article>


          {/* NETWORKS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Affordable data across Nigerian networks
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              The best option for you depends on the network you use and
              the data offers currently available to you.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">

              <Link
                href="/resources/mtn-data"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">MTN Data Plans</h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Explore MTN data options.
                </p>
              </Link>

              <Link
                href="/resources/airtel-data"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">Airtel Data Plans</h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Explore Airtel data options.
                </p>
              </Link>

              <Link
                href="/resources/glo-data"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">Glo Data Plans</h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Explore Glo data options.
                </p>
              </Link>

              <Link
                href="/resources/9mobile-data"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">9mobile Data Plans</h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Explore 9mobile data options.
                </p>
              </Link>

            </div>

          </article>


          {/* TYPES OF USERS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Choose data based on how you use the internet
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Light browsing
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Smaller bundles can be suitable for messaging, occasional
                  browsing and light social media use.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Social media
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Frequent social media use can require more data,
                  particularly when viewing images and videos.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Streaming
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Video and music streaming can consume data quickly, so
                  heavier users may benefit from larger bundles.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Work and study
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Online classes, meetings, file downloads and cloud services
                  can require a more substantial data allowance.
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
              Find data that fits your budget
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings supported data and other digital services
              together in one platform. Instead of making your search more
              complicated, you can use one place to access supported
              services.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Available products, prices and bundle options can change, so
              always review the current options before completing a purchase.
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
                  Where can I find cheap data in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Affordable data options can be found across Nigerian
                  networks and digital service platforms. Compare the amount
                  of data, validity and price before choosing a bundle.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Is the cheapest data bundle always the best?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Not necessarily. A slightly more expensive bundle may
                  provide more data or a longer validity period and therefore
                  offer better value for your needs.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Which networks can I compare?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  You can compare supported data options for networks such as
                  MTN, Airtel, Glo and 9mobile.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I buy affordable data through AlphaBot?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  AlphaBot provides supported digital services through its
                  platform. Current products and prices depend on the
                  available service configuration.
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
            href="/resources/buy-data-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Buy Data in Nigeria
          </Link>

          <Link
            href="/resources/awoof-data"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Awoof Data →
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
