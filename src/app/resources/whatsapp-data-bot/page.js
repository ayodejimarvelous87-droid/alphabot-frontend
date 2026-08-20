import Link from "next/link";

export const metadata = {
  title: "WhatsApp Data Bot in Nigeria | Buy Data via WhatsApp | AlphaBot",
  description:
    "Explore the AlphaBot WhatsApp Data Bot for buying data and accessing digital services through WhatsApp. Learn how the bot works and what services are available.",
  keywords: [
    "WhatsApp data bot",
    "WhatsApp data bot Nigeria",
    "buy data via WhatsApp",
    "data bot Nigeria",
    "WhatsApp VTU bot",
    "WhatsApp airtime bot",
    "buy airtime via WhatsApp",
    "WhatsApp digital services",
    "AlphaBot WhatsApp bot",
    "AlphaBot data bot",
  ],
};

export default function WhatsAppDataBotPage() {
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
          AlphaBot Technology
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          WhatsApp Data Bot in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Access data services through WhatsApp with a simpler,
          conversation-based digital experience.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Get Started
        </Link>

      </section>


      {/* WHAT IS IT */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            What is a WhatsApp data bot?
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            A WhatsApp data bot is an automated service that allows users
            to interact with digital services through WhatsApp messages
            instead of navigating a traditional website interface.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            For data services, this can make it easier to select a network,
            choose a bundle and complete supported actions from a familiar
            messaging platform.
          </p>

        </article>

      </section>


      {/* BENEFITS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          Why use a WhatsApp data bot?
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-3xl">💬</div>

            <h3 className="text-xl font-black mt-4">
              Simple interaction
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Users can interact through WhatsApp without needing to learn
              another complicated interface.
            </p>
          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-3xl">⚡</div>

            <h3 className="text-xl font-black mt-4">
              Convenient access
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Data services can be accessed from a platform many users
              already use every day.
            </p>
          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-3xl">📶</div>

            <h3 className="text-xl font-black mt-4">
              Data services
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Supported data bundles and network options can be presented
              through the automated conversation.
            </p>
          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">
            <div className="text-3xl">🤖</div>

            <h3 className="text-xl font-black mt-4">
              Automation
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Automated responses can guide users through supported
              service requests.
            </p>
          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            How it works
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            A simple conversation-based experience
          </h2>

          <div className="space-y-6 mt-7">

            <div className="flex gap-4">
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#050505] border border-zinc-700 flex items-center justify-center font-bold">
                1
              </div>

              <div>
                <h3 className="font-bold">
                  Start a conversation
                </h3>

                <p className="text-sm text-zinc-500 mt-1 leading-6">
                  The user starts an interaction with the supported AlphaBot
                  WhatsApp service.
                </p>
              </div>
            </div>


            <div className="flex gap-4">
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#050505] border border-zinc-700 flex items-center justify-center font-bold">
                2
              </div>

              <div>
                <h3 className="font-bold">
                  Choose a service
                </h3>

                <p className="text-sm text-zinc-500 mt-1 leading-6">
                  The bot can guide the user through available options and
                  supported data services.
                </p>
              </div>
            </div>


            <div className="flex gap-4">
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#050505] border border-zinc-700 flex items-center justify-center font-bold">
                3
              </div>

              <div>
                <h3 className="font-bold">
                  Complete the request
                </h3>

                <p className="text-sm text-zinc-500 mt-1 leading-6">
                  The user follows the available prompts to complete the
                  supported transaction or service request.
                </p>
              </div>
            </div>

          </div>

        </article>

      </section>


      {/* ALPHABOT */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🇳🇬
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Built for digital services in Nigeria
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            AlphaBot combines digital services with automated technology
            to give Nigerian users another convenient way to access
            supported services.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Available services, networks, pricing and transaction options
            may change over time, so users should always check the current
            options provided by AlphaBot.
          </p>

        </article>

      </section>


      {/* CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Try AlphaBot
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Explore AlphaBot's digital services and discover a simpler way
            to manage everyday digital needs.
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
            href="/resources/alphabot-api"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: AlphaBot API
          </Link>

          <Link
            href="/resources/ai-features"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: AI Features →
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
