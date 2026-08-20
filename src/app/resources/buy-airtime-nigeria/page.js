import Link from "next/link";

export const metadata = {
  title: "Buy Airtime Online in Nigeria | Airtime Top Up | AlphaBot",
  description:
    "Learn how to buy airtime online in Nigeria for MTN, Airtel, Glo and 9mobile. Explore convenient airtime top up options and useful tips.",
};

export default function BuyAirtimeNigeriaPage() {
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
          Buy Airtime Online in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Learn how to buy airtime online in Nigeria for supported mobile
          networks and discover convenient ways to top up your phone
          without visiting a physical shop.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Buy Airtime with AlphaBot
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">


          {/* INTRO */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What is online airtime top up?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Online airtime top up allows you to recharge a mobile phone
              electronically without needing to purchase a physical
              recharge card.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Instead of entering a recharge card PIN, you can use a
              supported digital service to select a network, enter a phone
              number and specify the amount you want to recharge.
            </p>

          </article>


          {/* NETWORKS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Airtime for Nigerian networks
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Digital airtime services can support major Nigerian mobile
              networks. Availability depends on the platform and its
              current service configuration.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">MTN Airtime</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Recharge supported MTN numbers digitally.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">Airtel Airtime</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Purchase airtime for supported Airtel numbers.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">Glo Airtime</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Top up supported Glo mobile numbers online.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">9mobile Airtime</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Recharge supported 9mobile numbers through digital
                  services.
                </p>
              </div>

            </div>

          </article>


          {/* HOW TO BUY */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How to buy airtime online
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Choose your network
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Select the mobile network belonging to the phone number
                  you want to recharge.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. Enter the phone number
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Carefully enter the recipient's mobile number and verify
                  it before continuing.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Enter the airtime amount
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose or enter the amount of airtime you want to purchase.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Confirm the transaction
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Check the network, phone number and amount carefully before
                  completing the payment.
                </p>
              </div>

            </div>

          </article>


          {/* BENEFITS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Why buy airtime online?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  ⚡ Convenience
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Recharge from your phone without searching for a physical
                  airtime vendor.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  🕐 Available when you need it
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Digital platforms can make airtime purchases easier when
                  you need a quick top up.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  📱 Easy from mobile
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  A phone and an available digital payment method may be
                  enough to complete a supported purchase.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  🔐 Digital account protection
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use platforms with appropriate account and transaction
                  security features.
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
              Buy airtime through AlphaBot
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot provides supported digital services in one platform,
              making it possible to access airtime and other services from
              your account.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Available networks, products and transaction options depend
              on the current AlphaBot service configuration.
            </p>

            <Link
              href="/airtime"
              className="inline-flex mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Go to Airtime
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
                  Can I buy airtime online in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Airtime can be purchased through supported digital
                  services without visiting a physical recharge vendor.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Which networks can I recharge?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Supported platforms may provide airtime for major Nigerian
                  networks including MTN, Airtel, Glo and 9mobile.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I recharge another person's number?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Many digital airtime services support recharging another
                  person's eligible mobile number. Always verify the number
                  before confirming the transaction.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Is buying airtime online safe?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use a trusted platform and protect your account credentials,
                  transaction PIN and other security information.
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
            href="/resources/best-vtu-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Best VTU Services in Nigeria
          </Link>

          <Link
            href="/resources/airtime-data-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Airtime & Data →
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
