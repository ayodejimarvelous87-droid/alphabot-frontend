import Link from "next/link";

export const metadata = {
  title: "How to Secure Your AlphaBot Account | Account Security",
  description:
    "Learn how to protect your AlphaBot account, password, transaction PIN, OTP and wallet from unauthorized access.",
};

export default function AccountSecurityPage() {
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
          How to Secure Your AlphaBot Account
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Simple steps to help protect your AlphaBot account, wallet,
          transactions and personal information.
        </p>

      </section>


      {/* INTRO */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🔐
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Your account is your responsibility
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Keeping your AlphaBot account secure starts with protecting
            the information you use to access and authorize transactions.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Never assume that someone asking for your password, OTP or
            transaction PIN is an official AlphaBot representative.
          </p>

        </article>

      </section>


      {/* SECURITY STEPS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          6 ways to protect your account
        </h2>

        <div className="space-y-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="flex gap-4">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
                1
              </div>

              <div>
                <h3 className="text-xl font-black">
                  Use a strong password
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use a unique password that is difficult for other people
                  to guess. Avoid using simple passwords or reusing the same
                  password across multiple services.
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
                  Protect your transaction PIN
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Your transaction PIN can protect sensitive account
                  activities. Never share it with friends, strangers or
                  anyone claiming to need it for support.
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
                  Never share OTP codes
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  One-time passwords and verification codes are private.
                  Do not send them to another person or enter them into
                  suspicious websites or forms.
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
                  Enable additional security
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Where available, use features such as two-factor
                  authentication and biometric protection to add another
                  layer of security.
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
                  Watch out for scams
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Be careful with messages, links, phone calls or social
                  media accounts pretending to represent AlphaBot.
                </p>

              </div>

            </div>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="flex gap-4">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#18181B] border border-zinc-800 flex items-center justify-center font-black">
                6
              </div>

              <div>
                <h3 className="text-xl font-black">
                  Keep your device secure
                </h3>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Use a screen lock and keep your phone, browser and
                  operating system updated. Avoid accessing your account
                  from devices you do not trust.
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
            AlphaBot will never need your secret credentials
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">🔑 Password</p>
              <p className="text-xs text-zinc-500 mt-2">
                Keep your account password private.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">🔢 Transaction PIN</p>
              <p className="text-xs text-zinc-500 mt-2">
                Never disclose your transaction PIN.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">📩 OTP</p>
              <p className="text-xs text-zinc-500 mt-2">
                Verification codes should remain private.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <p className="font-bold">📱 Recovery Information</p>
              <p className="text-xs text-zinc-500 mt-2">
                Protect information that could be used to access your account.
              </p>
            </div>

          </div>

        </article>

      </section>


      {/* IF COMPROMISED */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🚨
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Think your account may be compromised?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Change your password immediately and secure any affected
            account credentials. If you notice suspicious account activity,
            contact AlphaBot through an official support channel.
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
            Protect your AlphaBot account
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Take a few minutes to review your security settings and keep
            your account information private.
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
            href="/resources/digital-payments"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Digital Payments
          </Link>

          <Link
            href="/resources/transaction-pin"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Transaction PIN →
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
