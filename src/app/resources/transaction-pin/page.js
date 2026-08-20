import Link from "next/link";

export const metadata = {
  title: "Transaction PIN Security | AlphaBot",
  description:
    "Learn what a transaction PIN is, how it protects your AlphaBot account and how to keep your PIN secure.",
};

export default function TransactionPinPage() {
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


      <section className="px-6 pt-16 pb-12 max-w-4xl mx-auto">

        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
          AlphaBot Security
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          Transaction PIN
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Understand how your transaction PIN helps protect sensitive
          activities on your AlphaBot account.
        </p>

      </section>


      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🔢
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            What is a transaction PIN?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            A transaction PIN is a security code used to authorize
            supported sensitive activities on your AlphaBot account.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            It provides an additional layer of protection beyond simply
            being logged into your account.
          </p>

        </article>

      </section>


      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          Why your PIN matters
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-2xl">🛡️</div>

            <h3 className="font-black text-xl mt-4">
              Extra protection
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              A transaction PIN adds another security step when
              authorization is required.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-2xl">💳</div>

            <h3 className="font-black text-xl mt-4">
              Protect transactions
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Keeping your PIN private helps reduce the risk of
              unauthorized transaction activity.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-2xl">🔐</div>

            <h3 className="font-black text-xl mt-4">
              Keep it private
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Your PIN should only be known by you. Do not share it with
              friends, agents or strangers.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-2xl">⚠️</div>

            <h3 className="font-black text-xl mt-4">
              Be alert
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Be suspicious of anyone asking you to reveal your PIN or
              enter it somewhere outside the official AlphaBot platform.
            </p>
          </div>

        </div>

      </section>


      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Security checklist
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Keep your transaction PIN safe
          </h2>

          <div className="space-y-4 mt-6">

            <div className="flex gap-3">
              <span>✓</span>
              <p className="text-sm text-zinc-400">
                Never send your PIN to another person.
              </p>
            </div>

            <div className="flex gap-3">
              <span>✓</span>
              <p className="text-sm text-zinc-400">
                Avoid using an obvious or easily guessed PIN.
              </p>
            </div>

            <div className="flex gap-3">
              <span>✓</span>
              <p className="text-sm text-zinc-400">
                Do not store your PIN where another person can easily
                access it.
              </p>
            </div>

            <div className="flex gap-3">
              <span>✓</span>
              <p className="text-sm text-zinc-400">
                Never enter your PIN into suspicious links or forms.
              </p>
            </div>

            <div className="flex gap-3">
              <span>✓</span>
              <p className="text-sm text-zinc-400">
                Contact official support if you believe your PIN has been
                exposed.
              </p>
            </div>

          </div>

        </article>

      </section>


      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🚨
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Think someone knows your PIN?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Take action as soon as possible. Change or reset your
            transaction PIN using the official AlphaBot account
            controls where available, and contact support if you notice
            suspicious activity.
          </p>

          <Link
            href="/support"
            className="inline-flex mt-5 text-sm font-bold text-zinc-200 hover:text-white"
          >
            Contact Support →
          </Link>

        </article>

      </section>


      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Review your security
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Keep your account credentials private and use the available
            security controls to protect your account.
          </p>

          <Link
            href="/settings/security"
            className="inline-flex mt-6 bg-white text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Security Settings
          </Link>

        </div>

      </section>


      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/account-security"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Account Security
          </Link>

          <Link
            href="/resources/two-factor-authentication"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Two-Factor Authentication →
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
