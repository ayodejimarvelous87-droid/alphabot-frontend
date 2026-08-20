import Link from "next/link";

export const metadata = {
  title: "Wallet Security Tips | AlphaBot",
  description:
    "Learn how to protect your AlphaBot wallet, transactions, account credentials and funds from unauthorized access.",
};

export default function WalletSecurityPage() {
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
          AlphaBot Security
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          Wallet Security
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Learn practical ways to protect your AlphaBot wallet, account
          credentials and transaction activity.
        </p>

      </section>


      {/* INTRO */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            💰
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Keep your wallet protected
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Your AlphaBot wallet may be used for supported digital
            services and transactions. Protecting the account that gives
            access to your wallet is therefore important.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Good wallet security starts with protecting your password,
            transaction PIN, verification codes and device.
          </p>

        </article>

      </section>


      {/* SECURITY PRACTICES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          Wallet security practices
        </h2>

        <div className="space-y-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="flex gap-4">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
                1
              </div>

              <div>
                <h3 className="text-xl font-black">
                  Protect your password
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use a strong and unique password for your AlphaBot
                  account. Avoid sharing it or using the same password
                  everywhere.
                </p>
              </div>

            </div>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="flex gap-4">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
                2
              </div>

              <div>
                <h3 className="text-xl font-black">
                  Keep your transaction PIN private
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Never disclose your transaction PIN to another person,
                  even if they claim to be helping you with your account.
                </p>
              </div>

            </div>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="flex gap-4">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
                3
              </div>

              <div>
                <h3 className="text-xl font-black">
                  Review transactions
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Pay attention to your transaction history and investigate
                  activity you do not recognize.
                </p>
              </div>

            </div>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="flex gap-4">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
                4
              </div>

              <div>
                <h3 className="text-xl font-black">
                  Secure your device
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use a screen lock and avoid leaving your AlphaBot account
                  accessible on devices that other people can freely use.
                </p>
              </div>

            </div>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="flex gap-4">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
                5
              </div>

              <div>
                <h3 className="text-xl font-black">
                  Avoid suspicious links
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Do not enter your AlphaBot credentials into websites or
                  forms you do not trust.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* NEVER SHARE */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Keep private
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Never share these credentials
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">
                🔑 Password
              </p>

              <p className="text-xs text-zinc-500 mt-2">
                Keep your account password private.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">
                🔢 Transaction PIN
              </p>

              <p className="text-xs text-zinc-500 mt-2">
                Never reveal your transaction authorization PIN.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">
                📩 OTP
              </p>

              <p className="text-xs text-zinc-500 mt-2">
                Verification codes should remain private.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">
                📱 Recovery Information
              </p>

              <p className="text-xs text-zinc-500 mt-2">
                Protect information that can be used to access your account.
              </p>
            </div>

          </div>

        </article>

      </section>


      {/* SUSPICIOUS ACTIVITY */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🚨
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Notice something suspicious?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            If you notice unfamiliar transactions or believe someone may
            have accessed your account, secure your credentials immediately
            and contact AlphaBot through an official support channel.
          </p>

          <Link
            href="/support"
            className="inline-flex mt-5 text-sm font-bold text-zinc-200 hover:text-white"
          >
            Contact Support →
          </Link>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Review your account security
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Check your available security controls and keep your account
            credentials protected.
          </p>

          <Link
            href="/settings/security"
            className="inline-flex mt-6 bg-white text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Security Settings
          </Link>

        </div>

      </section>


      {/* NAVIGATION */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/two-factor-authentication"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Two-Factor Authentication
          </Link>

          <Link
            href="/resources/referral-program"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Referral Program →
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
