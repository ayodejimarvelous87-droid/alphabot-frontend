import Link from "next/link";

export const metadata = {
  title: "Two-Factor Authentication (2FA) | AlphaBot",
  description:
    "Learn how two-factor authentication helps protect your AlphaBot account and why you should use additional security for your account.",
};

export default function TwoFactorAuthenticationPage() {
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
          Two-Factor Authentication
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Learn how two-factor authentication can add another layer of
          protection to your AlphaBot account.
        </p>

      </section>


      {/* WHAT IS 2FA */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🛡️
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            What is two-factor authentication?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Two-factor authentication, commonly called 2FA, adds an
            additional verification step when accessing an account.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Instead of relying only on a password, an account can require
            another form of verification before access is granted.
          </p>

        </article>

      </section>


      {/* WHY IT MATTERS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          Why 2FA matters
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              🔑
            </div>

            <h3 className="font-black text-xl mt-4">
              Passwords are not enough
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              If someone obtains your password, an additional verification
              step can make unauthorized access more difficult.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              📱
            </div>

            <h3 className="font-black text-xl mt-4">
              Adds another layer
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              2FA can provide another layer of protection beyond your
              normal login credentials.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              🚨
            </div>

            <h3 className="font-black text-xl mt-4">
              Helps reduce account risk
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Additional verification can help reduce the risk of someone
              accessing your account using only stolen credentials.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-2xl">
              🔐
            </div>

            <h3 className="font-black text-xl mt-4">
              Protect sensitive activity
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Strong account security is especially important when your
              account provides access to sensitive information or services.
            </p>

          </div>

        </div>

      </section>


      {/* SECURITY TIPS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Security tips
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Keep your verification secure
          </h2>

          <div className="space-y-4 mt-6">

            <div className="flex gap-3">
              <span>✓</span>

              <p className="text-sm text-zinc-400">
                Never share verification codes with another person.
              </p>
            </div>


            <div className="flex gap-3">
              <span>✓</span>

              <p className="text-sm text-zinc-400">
                Be careful with unexpected login or verification requests.
              </p>
            </div>


            <div className="flex gap-3">
              <span>✓</span>

              <p className="text-sm text-zinc-400">
                Do not enter verification codes into suspicious websites.
              </p>
            </div>


            <div className="flex gap-3">
              <span>✓</span>

              <p className="text-sm text-zinc-400">
                Keep the phone or authentication method connected to your
                account secure.
              </p>
            </div>


            <div className="flex gap-3">
              <span>✓</span>

              <p className="text-sm text-zinc-400">
                Contact official support if you notice suspicious account
                activity.
              </p>
            </div>

          </div>

        </article>

      </section>


      {/* WARNING */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            ⚠️
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Never give someone your verification code
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Scammers may pretend to be support staff and ask for an OTP,
            authentication code, password or transaction PIN. Treat these
            credentials as private and never disclose them.
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
            Review your security settings
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Keep your AlphaBot account protected by reviewing the available
            security controls.
          </p>

          <Link
            href="/settings/security/2fa"
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
            href="/resources/transaction-pin"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Transaction PIN
          </Link>

          <Link
            href="/resources/wallet-security"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Wallet Security →
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
