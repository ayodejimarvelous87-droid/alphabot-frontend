import Link from "next/link";

export const metadata = {
  title: "AI Features | AlphaBot",
  description:
    "Learn how AlphaBot uses artificial intelligence to improve digital services, assistance and the user experience.",
};

export default function AIFeaturesPage() {
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
          AI Features
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Discover how artificial intelligence can make digital services,
          assistance and everyday interactions with AlphaBot easier.
        </p>

        <Link
          href="/ai"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Explore AlphaBot AI
        </Link>

      </section>


      {/* INTRO */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            AI as part of the AlphaBot experience
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot is being developed with intelligent technology as an
            important part of the platform. The goal is to make digital
            experiences easier to understand, navigate and use.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            AI features can assist users with information, guidance and
            other supported experiences without replacing the core services
            that AlphaBot provides.
          </p>

        </article>

      </section>


      {/* FEATURES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          What AI can help with
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              💬
            </div>

            <h3 className="text-xl font-black mt-4">
              Intelligent Assistance
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Get help understanding supported AlphaBot features and
              navigating digital services.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              🧠
            </div>

            <h3 className="text-xl font-black mt-4">
              Natural Conversations
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Intelligent interfaces can make it easier to interact with
              technology using everyday language.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              ⚡
            </div>

            <h3 className="text-xl font-black mt-4">
              Faster Information
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              AI can help users find and understand relevant information
              more efficiently.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              🔄
            </div>

            <h3 className="text-xl font-black mt-4">
              Continuous Improvement
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Intelligent features can evolve as AlphaBot develops new
              services and improves the user experience.
            </p>

          </div>

        </div>

      </section>


      {/* AI + DIGITAL SERVICES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Beyond Chat
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            AI and digital services
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            Artificial intelligence can complement services such as data,
            airtime, payments and account management by helping users
            understand available options and navigate the platform.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mt-6">

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">📶</div>

              <h3 className="font-bold mt-3">
                Data
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Help users understand supported data services.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">💳</div>

              <h3 className="font-bold mt-3">
                Payments
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Make supported digital payment experiences easier to
                understand.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="text-2xl">🔐</div>

              <h3 className="font-bold mt-3">
                Account Help
              </h3>

              <p className="text-xs text-zinc-500 mt-2 leading-5">
                Provide useful guidance around supported account features.
              </p>
            </div>

          </div>

        </article>

      </section>


      {/* RESPONSIBLE AI */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🛡️
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            AI should be useful, not confusing
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AI-generated information can sometimes be incomplete or
            inaccurate. Important account, payment and transaction
            decisions should always be verified using the appropriate
            AlphaBot information and controls.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot's core transaction systems remain responsible for
            processing supported digital services; AI assistance should not
            be treated as proof that a transaction has completed.
          </p>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Experience AlphaBot
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Explore AlphaBot's digital services and intelligent features.
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
            href="/resources/whatsapp-data-bot"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: WhatsApp Data Bot
          </Link>

          <Link
            href="/resources/digital-payments"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: Digital Payments →
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
