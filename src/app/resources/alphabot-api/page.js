import Link from "next/link";

export const metadata = {
  title: "AlphaBot API | VTU, Data, Airtime & Digital Services API",
  description:
    "Explore the AlphaBot API for integrating supported VTU, data, airtime and digital services into applications. Learn about API access and available services.",
  keywords: [
    "AlphaBot API",
    "VTU API Nigeria",
    "data API Nigeria",
    "airtime API Nigeria",
    "digital services API",
    "VTU API integration",
    "data bundle API",
    "airtime API integration",
    "AlphaBot developer API",
    "Nigeria VTU API",
  ],
};

export default function AlphaBotApiPage() {
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
          AlphaBot API
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Build digital service experiences with an API designed to connect
          applications with supported AlphaBot services.
        </p>

        <Link
          href="/contact"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Contact AlphaBot
        </Link>

      </section>


      {/* OVERVIEW */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-black">
            Build with AlphaBot
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            The AlphaBot API is intended for developers and businesses that
            want to integrate supported digital services into their own
            applications, websites or platforms.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Instead of building every service integration from scratch,
            developers can connect to supported AlphaBot services through
            an API-based workflow.
          </p>

        </article>

      </section>


      {/* SERVICES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-black mb-5">
          What can an API integration provide?
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              📶
            </div>

            <h3 className="text-xl font-black mt-4">
              Data Services
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Connect supported data services to your own digital platform
              or application.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              📱
            </div>

            <h3 className="text-xl font-black mt-4">
              Airtime
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Integrate supported airtime top-up functionality into your
              application.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              💳
            </div>

            <h3 className="text-xl font-black mt-4">
              Digital Services
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Access other supported digital services through an
              integration-based workflow.
            </p>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-6">

            <div className="text-3xl">
              ⚙️
            </div>

            <h3 className="text-xl font-black mt-4">
              Automation
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6">
              Build automated service flows without manually processing every
              transaction.
            </p>

          </div>

        </div>

      </section>


      {/* USE CASES */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Developer Use Cases
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Who can use an API like this?
          </h2>

          <div className="space-y-5 mt-6">

            <div>
              <h3 className="font-bold">
                VTU platforms
              </h3>

              <p className="text-sm text-zinc-500 mt-2 leading-6">
                Build or extend platforms offering airtime, data and other
                supported digital services.
              </p>
            </div>


            <div>
              <h3 className="font-bold">
                Websites & applications
              </h3>

              <p className="text-sm text-zinc-500 mt-2 leading-6">
                Add digital service functionality to an existing website or
                application.
              </p>
            </div>


            <div>
              <h3 className="font-bold">
                Businesses
              </h3>

              <p className="text-sm text-zinc-500 mt-2 leading-6">
                Create internal or customer-facing workflows around supported
                digital services.
              </p>
            </div>


            <div>
              <h3 className="font-bold">
                Developers
              </h3>

              <p className="text-sm text-zinc-500 mt-2 leading-6">
                Connect software applications to supported AlphaBot services
                using programmatic requests.
              </p>
            </div>

          </div>

        </article>

      </section>


      {/* SECURITY */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">

          <div className="text-3xl">
            🔐
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-4">
            Security matters
          </h2>

          <p className="text-zinc-400 mt-4 leading-7">
            API credentials should be treated as sensitive information.
            Developers should keep secret credentials on secure servers,
            avoid exposing them in frontend code and follow the authentication
            requirements provided with the API.
          </p>

          <p className="text-zinc-400 mt-4 leading-7">
            Always verify transaction responses and handle errors properly
            before confirming a service to your users.
          </p>

        </article>

      </section>


      {/* DOCUMENTATION CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 sm:p-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black">
            Interested in integrating AlphaBot?
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Contact AlphaBot for API access, integration information and
            current service availability.
          </p>

          <Link
            href="/contact"
            className="inline-flex mt-6 bg-white text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Contact AlphaBot
          </Link>

        </div>

      </section>


      {/* NAVIGATION */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">

          <Link
            href="/resources/leaderboards-rewards"
            className="text-zinc-400 hover:text-white transition"
          >
            ← Previous: Leaderboards & Rewards
          </Link>

          <Link
            href="/resources/whatsapp-data-bot"
            className="text-zinc-400 hover:text-white transition"
          >
            Next: WhatsApp Data Bot →
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
