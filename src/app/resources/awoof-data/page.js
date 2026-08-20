import Link from "next/link";

export const metadata = {
  title: "Awoof Data in Nigeria | Affordable Data Offers | AlphaBot",
  description:
    "Learn about awoof data in Nigeria, promotional data offers and affordable internet bundles. Discover what to check before choosing an awoof data deal.",
};

export default function AwoofDataPage() {
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
          Awoof Data in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Looking for awoof data in Nigeria? Learn what awoof data offers
          are, how promotional data deals work and what to check before
          choosing an affordable data offer.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Explore AlphaBot
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">

          {/* WHAT IS AWOOF DATA */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What is awoof data?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              In Nigeria, the term “awoof data” is commonly used to describe
              data offers that appear particularly affordable or provide
              extra value compared with a regular bundle.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              These offers may be promotional, limited, targeted to certain
              users or available for a specific period. Because of this,
              an awoof data offer may not always be available to everyone.
            </p>

          </article>


          {/* WHY PEOPLE LOOK FOR IT */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Why do people look for awoof data?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Lower cost
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Promotional offers may provide users with a way to get
                  more data while spending less.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Extra value
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Some promotions may include additional data or special
                  conditions that make them attractive.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Short-term offers
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Promotional bundles can sometimes be available only for
                  a limited period.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Budget-friendly connectivity
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Affordable offers can help users manage their mobile
                  internet spending.
                </p>
              </div>

            </div>

          </article>


          {/* WHAT TO CHECK */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Things to check before buying awoof data
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  Check the network
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Make sure the offer is available for the network and
                  mobile number you intend to use.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Check the validity
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Some promotional data offers may have different validity
                  periods from standard bundles.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Check the conditions
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Promotional offers can have eligibility requirements,
                  restrictions or other conditions.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Confirm the current price
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Data prices and available offers can change. Always
                  review the current information before completing a
                  purchase.
                </p>
              </div>

            </div>

          </article>


          {/* NETWORK LINKS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Explore Nigerian network data options
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Availability of promotional and affordable data offers can
              vary by network. Explore our network guides to learn more.
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


          {/* ALPHABOT */}
          <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
              AlphaBot
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              Looking for affordable data?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings supported data and other digital services
              together in one platform. You can explore available options
              and choose the service that fits your needs.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Remember that promotional offers can change or become
              unavailable, so check the current options before purchasing.
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
                  What does awoof data mean?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Awoof data is a popular Nigerian term for data offers
                  considered especially affordable or valuable, often
                  because of a promotion or special offer.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Is awoof data available on every network?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Availability depends on the specific offer and network.
                  Promotional offers may have different eligibility rules
                  and availability.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Does awoof data last as long as regular data?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Not necessarily. Promotional bundles can have their own
                  validity periods, so check the details of the specific
                  offer.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I find affordable data on AlphaBot?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  AlphaBot provides supported digital services and data
                  options. Current availability and pricing depend on the
                  services configured on the platform.
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
            href="/resources/cheap-data-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Cheap Data in Nigeria
          </Link>

          <Link
            href="/resources/mtn-data"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: MTN Data Plans →
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
