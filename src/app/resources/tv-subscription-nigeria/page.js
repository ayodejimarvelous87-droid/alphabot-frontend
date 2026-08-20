import Link from "next/link";

export const metadata = {
  title: "TV Subscription in Nigeria | Pay TV Online | AlphaBot",
  description:
    "Pay TV subscriptions online in Nigeria with AlphaBot. Learn about digital TV payments, subscription options, renewal and convenient ways to manage your TV service.",
  keywords: [
    "TV subscription Nigeria",
    "pay TV online Nigeria",
    "TV subscription payment Nigeria",
    "TV payment Nigeria",
    "online TV subscription",
    "pay TV subscription online",
    "DSTV subscription Nigeria",
    "GOtv subscription Nigeria",
    "TV renewal Nigeria",
    "digital TV payment Nigeria",
    "AlphaBot TV subscription",
  ],
};

export default function TVSubscriptionNigeriaPage() {
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
          TV Subscription in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Learn how to pay television subscriptions online in Nigeria,
          choose the right package and keep your TV service active.
        </p>

        <Link
          href="/tv"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Pay TV Subscription
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">


          {/* INTRO */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What is online TV subscription payment?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Online TV subscription payment allows customers to renew or
              manage supported television services without visiting a
              physical payment centre.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              A digital platform can make subscription payments more
              convenient by allowing you to select a provider, choose a
              package and complete payment from your device.
            </p>

          </article>


          {/* PROVIDERS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What you may need
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">

                <div className="text-2xl">
                  📺
                </div>

                <h3 className="font-bold mt-3">
                  TV provider
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Select the television provider associated with your
                  subscription.
                </p>

              </div>


              <div className="rounded-2xl border border-zinc-800 p-5">

                <div className="text-2xl">
                  🔢
                </div>

                <h3 className="font-bold mt-3">
                  Smartcard or account number
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Have the required customer or smartcard information ready
                  before making the payment.
                </p>

              </div>


              <div className="rounded-2xl border border-zinc-800 p-5">

                <div className="text-2xl">
                  📦
                </div>

                <h3 className="font-bold mt-3">
                  Subscription package
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose the package or subscription option you want to
                  purchase or renew.
                </p>

              </div>


              <div className="rounded-2xl border border-zinc-800 p-5">

                <div className="text-2xl">
                  🔐
                </div>

                <h3 className="font-bold mt-3">
                  Secure payment account
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Keep your payment account and transaction credentials
                  protected.
                </p>

              </div>

            </div>

          </article>


          {/* HOW IT WORKS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How to pay for a TV subscription online
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Select your TV provider
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose the supported television service you want to pay for.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. Enter your customer details
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Enter the required smartcard, decoder or customer number
                  carefully.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Select your package
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose the subscription package and duration that suits you.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Confirm your payment
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Review the provider, customer details, package and amount
                  before completing the transaction.
                </p>
              </div>

            </div>

          </article>


          {/* SAFETY */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Things to check before paying
            </h2>

            <ul className="mt-5 space-y-4 text-zinc-400 leading-7">

              <li>
                • Make sure the correct TV provider is selected.
              </li>

              <li>
                • Double-check your smartcard or customer number.
              </li>

              <li>
                • Confirm the subscription package and amount.
              </li>

              <li>
                • Never share your transaction PIN or password with anyone.
              </li>

              <li>
                • Keep your payment confirmation or receipt when available.
              </li>

            </ul>

          </article>


          {/* ALPHABOT */}
          <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
              AlphaBot
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              Pay TV subscriptions with AlphaBot
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings supported digital services together in one
              platform. Where TV subscription payments are available,
              customers can access the service directly from AlphaBot.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Available providers, packages and prices depend on the current
              AlphaBot service configuration.
            </p>

            <Link
              href="/tv"
              className="inline-flex mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Open TV Services
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
                  Can I pay my TV subscription online in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Supported digital platforms can allow customers to
                  renew eligible TV subscriptions online.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  What details do I need?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  You may need your TV provider and smartcard, decoder or
                  customer number.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I pay for TV through AlphaBot?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  If the TV service is currently supported on AlphaBot, you
                  can access it through the TV service page.
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
            href="/resources/electricity-bills-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Electricity Bill Payment
          </Link>

          <Link
            href="/resources/football-arena"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Football Arena →
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
