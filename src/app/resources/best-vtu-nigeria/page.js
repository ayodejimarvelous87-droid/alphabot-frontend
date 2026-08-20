import Link from "next/link";

export const metadata = {
  title: "Best VTU Services in Nigeria | VTU Platform Guide",
  description:
    "Discover what makes a good VTU platform in Nigeria. Compare data, airtime, bills payment, pricing, reliability, security and convenience before choosing a VTU service.",
  keywords: [
    "best VTU in Nigeria",
    "best VTU platform Nigeria",
    "VTU services Nigeria",
    "VTU platform Nigeria",
    "cheap VTU Nigeria",
    "reliable VTU Nigeria",
    "data VTU Nigeria",
    "airtime VTU Nigeria",
    "bills payment VTU",
    "online VTU Nigeria",
    "AlphaBot VTU",
  ],
};

export default function BestVTUNigeriaPage() {
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
          Best VTU Services in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Looking for a reliable VTU platform in Nigeria? Learn what to
          consider when choosing a VTU service for data, airtime, bills
          payment and other digital services.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Try AlphaBot
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">


          {/* WHAT IS VTU */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What is a VTU service?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              VTU, commonly referring to Virtual Top Up, describes digital
              services that allow users or businesses to purchase and
              deliver services such as airtime and mobile data electronically.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Modern VTU platforms can also provide additional services such
              as electricity payments, television subscriptions, betting
              funding, examination pins and other supported digital products.
            </p>

          </article>


          {/* WHAT MAKES A GOOD VTU */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What makes a good VTU platform?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Reliable transactions
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  A good platform should process transactions consistently
                  and provide clear feedback when an order succeeds or fails.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Competitive pricing
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Compare prices and available discounts when choosing a
                  platform for regular VTU purchases.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Multiple services
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Having data, airtime, bills and other useful services in
                  one platform can make everyday transactions easier.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Good support
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Accessible support and clear transaction information are
                  important when something goes wrong with a payment.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Account security
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Look for platforms that provide appropriate security
                  features for account access and transactions.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Easy to use
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  A simple interface can make it easier to purchase services
                  without unnecessary steps.
                </p>
              </div>

            </div>

          </article>


          {/* VTU SERVICES */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Common services offered by VTU platforms
            </h2>

            <div className="space-y-5 mt-6">

              <div>
                <h3 className="font-bold">
                  📶 Data bundles
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Purchase mobile data for supported Nigerian networks.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  📱 Airtime
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Recharge supported mobile networks electronically.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  💡 Bills payment
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Some platforms support electricity and other bill payments.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  📺 TV subscriptions
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Supported platforms may allow users to renew television
                  subscriptions digitally.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  🔌 API services
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Some VTU providers offer APIs that allow developers and
                  businesses to integrate digital services into their own
                  applications.
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
              AlphaBot as a VTU platform
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings multiple digital services together in one
              platform, including supported data, airtime, bills and other
              services.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              The platform is designed to make everyday digital transactions
              simple while providing features such as account protection,
              transaction controls and a convenient user experience.
            </p>

            <Link
              href="/register"
              className="inline-flex mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Get Started with AlphaBot
            </Link>

          </article>


          {/* BUSINESSES */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              VTU for businesses
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              VTU services are not only useful for individual users.
              Businesses, resellers and developers can also use digital
              service platforms to provide airtime, data and other services
              to their customers.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              For businesses that need automation, an API can make it
              possible to connect supported digital services to an existing
              website, application or business system.
            </p>

            <Link
              href="/resources/alphabot-api"
              className="inline-flex mt-6 text-sm font-bold text-zinc-300 hover:text-white transition"
            >
              Learn about the AlphaBot API →
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
                  What does VTU mean in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  VTU commonly means Virtual Top Up and refers to electronic
                  delivery of services such as airtime and mobile data.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  What should I look for in a VTU platform?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Consider reliability, pricing, available services,
                  customer support, security and ease of use.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can businesses use VTU platforms?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Businesses can use VTU platforms for their own
                  transactions, reselling services or integrating supported
                  services into their systems.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Does AlphaBot provide VTU services?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  AlphaBot provides supported digital services including
                  data, airtime and other services available through the
                  platform.
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
            href="/resources/buy-airtime-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Buy Airtime Online →
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
