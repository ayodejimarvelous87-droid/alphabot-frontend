import Link from "next/link";

export const metadata = {
  title: "Electricity Bill Payment in Nigeria | AlphaBot",
  description:
    "Learn how to pay electricity bills online in Nigeria, check your meter details and make supported electricity payments digitally.",
};

export default function ElectricityBillsNigeriaPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <nav className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-700 flex items-center justify-center">
            <span className="text-xl font-black bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              A
            </span>
          </div>

          <span className="text-xl font-bold">AlphaBot</span>
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
          Electricity Bill Payment in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Learn how electricity bills can be paid online in Nigeria and what
          you need to know before making a digital electricity payment.
        </p>

        <Link
          href="/electricity"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Pay Electricity Bill
        </Link>

      </section>


      {/* CONTENT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="space-y-8">

          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              How electricity bill payment works
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Digital electricity payments allow customers to pay supported
              electricity services without visiting a physical payment
              location.
            </p>

            <p className="text-zinc-400 mt-4 leading-7">
              Depending on the electricity service and account type, you may
              need to provide information such as your meter number or other
              customer details before completing a payment.
            </p>

          </article>


          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              What you may need
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-zinc-800 p-5">
                <div className="text-2xl">🔢</div>

                <h3 className="font-bold mt-3">
                  Meter or customer number
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Have the required account or meter information available
                  before starting the payment.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <div className="text-2xl">🏢</div>

                <h3 className="font-bold mt-3">
                  Electricity provider
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Select the correct supported electricity provider for your
                  account.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <div className="text-2xl">💰</div>

                <h3 className="font-bold mt-3">
                  Payment amount
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Confirm the amount you want to pay before authorising the
                  transaction.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-5">
                <div className="text-2xl">🔐</div>

                <h3 className="font-bold mt-3">
                  Secure account access
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Keep your account credentials and transaction PIN private.
                </p>
              </div>

            </div>

          </article>


          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Steps to pay an electricity bill online
            </h2>

            <div className="space-y-6 mt-6">

              <div>
                <h3 className="font-bold">
                  1. Choose your electricity provider
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Select the provider that serves the electricity account.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  2. Enter your meter details
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Enter the required meter or customer information carefully.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  3. Enter the payment amount
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Choose the amount you want to pay and review the transaction
                  details.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  4. Confirm the transaction
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Check the details one more time before completing the
                  payment.
                </p>
              </div>

            </div>

          </article>


          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

            <h2 className="text-2xl sm:text-3xl font-black">
              Important things to check
            </h2>

            <ul className="mt-5 space-y-4 text-zinc-400 leading-7">

              <li>
                • Make sure you selected the correct electricity provider.
              </li>

              <li>
                • Check your meter or customer number before confirming.
              </li>

              <li>
                • Verify the payment amount.
              </li>

              <li>
                • Keep your transaction PIN and authentication details private.
              </li>

              <li>
                • Keep your transaction confirmation or receipt when
                available.
              </li>

            </ul>

          </article>


          <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
              AlphaBot
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              Pay electricity bills with AlphaBot
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              AlphaBot provides supported digital services from one platform.
              Where electricity bill payment is available for your account,
              you can access the service directly through AlphaBot.
            </p>

            <Link
              href="/electricity"
              className="inline-flex mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Open Electricity
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
                  Can I pay electricity bills online in Nigeria?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Yes. Supported digital platforms can allow customers to
                  make eligible electricity payments online.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  What information do I need to pay?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Requirements vary, but you may need your electricity
                  provider and meter or customer information.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I use AlphaBot for electricity payments?
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  If the electricity service is currently supported on your
                  AlphaBot account, you can access it through the electricity
                  service.
                </p>
              </div>

            </div>

          </article>

        </div>

      </section>


      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/bills-payment-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Bills Payment in Nigeria
          </Link>

          <Link
            href="/resources/tv-subscription-nigeria"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: TV Subscription in Nigeria →
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
