import Link from "next/link";

export const metadata = {
  title: "Airtime & Data in Nigeria | Buy Airtime and Data Online | AlphaBot",
  description:
    "Learn how to buy airtime and mobile data online in Nigeria. Compare airtime and data needs, supported networks and convenient digital options.",
};

export default function AirtimeDataNigeriaPage() {
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
          Airtime & Data in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Learn the difference between airtime and mobile data, how to
          buy both online in Nigeria and how to choose the right option
          for your everyday needs.
        </p>

        <div className="flex flex-wrap gap-3 mt-7">

          <Link
            href="/airtime"
            className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Buy Airtime
          </Link>

          <Link
            href="/data"
            className="bg-[#18181B] border border-zinc-700 text-white px-6 py-3 rounded-xl font-bold hover:border-zinc-400 transition"
          >
            Buy Data
          </Link>

        </div>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">


          {/* DIFFERENCE */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Airtime vs data
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Airtime and data are both common mobile services, but they
              serve different purposes. Airtime is primarily used for
              services such as voice calls and other supported mobile
              charges, while data provides internet access.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">

                <div className="text-2xl">
                  📱
                </div>

                <h3 className="font-bold mt-3">
                  Airtime
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Useful for mobile calls and other services that charge
                  your airtime balance.
                </p>

              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">

                <div className="text-2xl">
                  📶
                </div>

                <h3 className="font-bold mt-3">
                  Data
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Used for internet activities such as browsing, messaging,
                  social media, streaming and online work.
                </p>

              </div>

            </div>

          </article>


          {/* NETWORKS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Airtime and data networks in Nigeria
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Digital service platforms can support airtime and data
              purchases for major Nigerian mobile networks. Availability
              depends on the platform and its current service configuration.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-4">
                <h3 className="font-bold">
                  MTN
                </h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Airtime and data services.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-4">
                <h3 className="font-bold">
                  Airtel
                </h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Airtime and data services.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-4">
                <h3 className="font-bold">
                  Glo
                </h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Airtime and data services.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-4">
                <h3 className="font-bold">
                  9mobile
                </h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Airtime and data services.
                </p>
              </div>

            </div>

          </article>


          {/* BUY ONLINE */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How to buy airtime and data online
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Choose the service
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Decide whether you need airtime for calls or data for
                  internet access.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. Select your network
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Select the network associated with the mobile number
                  you want to recharge.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Enter the phone number
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Carefully enter and verify the recipient's number before
                  continuing.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Choose the amount or bundle
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Select the airtime amount or data bundle that suits your
                  needs.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  5. Confirm the transaction
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Review the network, phone number, product and price before
                  completing the transaction.
                </p>
              </div>

            </div>

          </article>


          {/* CHOOSING DATA */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How much data do you need?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Your ideal data bundle depends on how you use the internet.
              Someone who mainly sends messages may use considerably less
              data than someone who streams videos every day.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Light usage
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Messaging, occasional browsing and light social media.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Regular usage
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Frequent browsing, social media, work and online services.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  Heavy usage
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Streaming, downloads, video calls and intensive internet
                  activity.
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
              Airtime and data in one platform
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings supported airtime, data and other digital
              services together in one platform. This makes it easier to
              manage common mobile transactions from one account.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Available networks, products and prices depend on the current
              AlphaBot service configuration.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">

              <Link
                href="/airtime"
                className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
              >
                Buy Airtime
              </Link>

              <Link
                href="/data"
                className="bg-[#050505] border border-zinc-700 text-white px-6 py-3 rounded-xl font-bold hover:border-zinc-400 transition"
              >
                Buy Data
              </Link>

            </div>

          </article>


          {/* FAQ */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Frequently asked questions
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  What is the difference between airtime and data?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Airtime is mainly used for calls and supported mobile
                  charges, while data provides internet access.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I buy airtime and data online?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Supported digital platforms allow users to purchase
                  airtime and mobile data online.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Which Nigerian networks can I recharge?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Availability varies by platform, but major Nigerian
                  networks include MTN, Airtel, Glo and 9mobile.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I buy airtime or data for another person?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Many digital services support recharging another person's
                  eligible number. Always verify the number before payment.
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
            href="/resources/buy-airtime-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Buy Airtime Online
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
