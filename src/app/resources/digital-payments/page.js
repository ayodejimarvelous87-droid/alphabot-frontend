import Link from "next/link";

export const metadata = {
  title: "Digital Payments in Nigeria | AlphaBot",
  description:
    "Learn about digital payments, wallets, airtime, data and other payment services available through AlphaBot in Nigeria.",
};

export default function DigitalPaymentsPage() {
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
          AlphaBot Technology
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          Digital Payments in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          A simple guide to digital payments, wallets and everyday services
          available through modern payment platforms like AlphaBot.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Get Started
        </Link>

      </section>


      {/* INTRO */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            What are digital payments?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Digital payments allow people to pay for services or transfer
            value electronically instead of relying on physical cash.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            In Nigeria, digital platforms can bring services such as
            airtime, data, bills and other supported transactions together
            in one place.
          </p>

        </article>

      </section>


      {/* ALPHABOT SERVICES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          Digital services with AlphaBot
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              📱
            </div>

            <h3 className="text-xl font-black mt-4">
              Airtime
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Purchase supported airtime top-ups for Nigerian networks
              through a digital platform.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              📶
            </div>

            <h3 className="text-xl font-black mt-4">
              Data
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Choose from supported data bundles and network options.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              ⚡
            </div>

            <h3 className="text-xl font-black mt-4">
              Bills
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Access supported bill payment services from one platform.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              💰
            </div>

            <h3 className="text-xl font-black mt-4">
              Wallet
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Manage funds for supported AlphaBot transactions through
              your account wallet.
            </p>

          </div>

        </div>

      </section>


      {/* BENEFITS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Why digital payments?
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Convenience for everyday services
          </h2>

          <div className="grid sm:grid-cols-3 gap-3 mt-6">

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">

              <div className="text-2xl">
                ⚡
              </div>

              <h3 className="font-bold mt-3">
                Convenient
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Access supported services without needing to visit a
                physical location.
              </p>

            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">

              <div className="text-2xl">
                📲
              </div>

              <h3 className="font-bold mt-3">
                Accessible
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Manage supported services from a phone or other connected
                device.
              </p>

            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">

              <div className="text-2xl">
                🔐
              </div>

              <h3 className="font-bold mt-3">
                Account Protection
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Use available account security features to help protect
                supported activities.
              </p>

            </div>

          </div>

        </article>

      </section>


      {/* SAFETY */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🔐
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Keep your digital payments secure
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Never share your password, transaction PIN, OTP or other
            sensitive security credentials with another person.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Always verify transaction details before confirming a payment
            and use only official AlphaBot channels when accessing your
            account or requesting support.
          </p>

          <Link
            href="/resources/account-security"
            className="inline-flex mt-5 text-sm font-bold text-zinc-200 hover:text-white"
          >
            Learn about account security →
          </Link>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Explore AlphaBot
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Access supported digital services from one convenient platform.
          </p>

          <Link
            href="/register"
            className="inline-flex mt-6 bg-white text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Get Started
          </Link>

        </div>

      </section>


      {/* NAVIGATION */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/ai-features"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: AI Features
          </Link>

          <Link
            href="/resources/account-security"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Account Security →
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
