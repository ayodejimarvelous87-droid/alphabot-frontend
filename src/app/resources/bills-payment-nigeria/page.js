import Link from "next/link";

export const metadata = {
  title: "Bills Payment in Nigeria | Pay Bills Online | AlphaBot",
  description:
    "Pay bills online in Nigeria with AlphaBot. Learn about electricity bills, TV subscriptions and other digital bill payments, including convenience and payment options.",
  keywords: [
    "bills payment Nigeria",
    "pay bills online Nigeria",
    "bill payment Nigeria",
    "online bills payment",
    "electricity bill payment Nigeria",
    "TV subscription payment Nigeria",
    "digital bill payment Nigeria",
    "pay electricity online Nigeria",
    "pay TV subscription online Nigeria",
    "AlphaBot bills payment",
  ],
};

export default function BillsPaymentNigeriaPage() {
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
          Bills Payment in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Learn how digital bill payments work in Nigeria and how supported
          services such as electricity and TV subscriptions can be paid
          online.
        </p>

        <Link
          href="/services"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Explore AlphaBot Services
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">


          {/* WHAT IS BILLS PAYMENT */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What is online bills payment?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Online bills payment allows you to pay supported services
              electronically instead of visiting a physical payment centre.
              Depending on the platform, this can include utilities,
              television subscriptions and other digital services.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Digital payments can make routine bills easier to manage by
              bringing multiple services into one platform.
            </p>

          </article>


          {/* SERVICES */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Common bill payment services
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              The services available depend on the platform. Common digital
              bill categories include electricity and television subscriptions.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">

                <div className="text-2xl">
                  ⚡
                </div>

                <h3 className="font-bold mt-3">
                  Electricity Bills
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Pay supported electricity services digitally and manage
                  eligible electricity payments online.
                </p>

                <Link
                  href="/resources/electricity-bills-nigeria"
                  className="inline-block text-sm text-zinc-300 font-semibold mt-4"
                >
                  Electricity guide →
                </Link>

              </div>


              <div className="rounded-2xl border border-zinc-800 p-5">

                <div className="text-2xl">
                  📺
                </div>

                <h3 className="font-bold mt-3">
                  TV Subscriptions
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Learn about paying supported television subscriptions
                  through digital platforms.
                </p>

                <Link
                  href="/resources/tv-subscription-nigeria"
                  className="inline-block text-sm text-zinc-300 font-semibold mt-4"
                >
                  TV subscription guide →
                </Link>

              </div>

            </div>

          </article>


          {/* HOW IT WORKS */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How online bill payments work
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Select a service
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose the bill or digital service you want to pay for.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. Select the provider
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose the appropriate electricity provider, TV provider
                  or other supported service.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Enter the required details
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Depending on the service, you may need to provide details
                  such as a meter number, smartcard number or account
                  information.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Confirm the payment
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Review the provider, account details and amount carefully
                  before confirming the transaction.
                </p>
              </div>

            </div>

          </article>


          {/* SAFETY */}
          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Things to check before paying a bill
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  🔎 Verify your details
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Double-check account numbers, meter numbers and other
                  identifiers before payment.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  💰 Check the amount
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Make sure the amount displayed is the amount you intend
                  to pay.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  🏢 Check the provider
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Confirm that the selected provider matches the service
                  account you are paying.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <h3 className="font-bold">
                  🔐 Protect your account
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Never share your password, transaction PIN or authentication
                  codes with another person.
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
              Pay supported bills with AlphaBot
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot brings supported digital services into one platform,
              allowing users to access services such as electricity and TV
              payments from their account.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Available providers, services and prices depend on the current
              AlphaBot service configuration.
            </p>

            <Link
              href="/services"
              className="inline-flex mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Explore Services
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
                  Can I pay bills online in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Supported digital platforms allow users to pay
                  eligible bills and services online.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  What bills can I pay online?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Availability varies by platform, but common categories
                  include electricity and television subscriptions.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Is online bill payment safe?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use a trusted service, verify your payment details and
                  protect your account credentials and transaction PIN.
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
            href="/resources/data-bundles-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Data Bundles in Nigeria
          </Link>

          <Link
            href="/resources/electricity-bills-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Electricity Bill Payment →
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
