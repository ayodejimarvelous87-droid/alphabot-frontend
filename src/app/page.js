import Link from "next/link";

export default function Home() {
  const services = [
    {
      name: "Airtime",
      desc: "Mobile top-up for all networks",
      icon: "📱",
    },
    {
      name: "Data",
      desc: "Fast internet bundles instantly",
      icon: "⚡",
    },
    {
      name: "Wallet",
      desc: "Secure digital payments",
      icon: "◈",
    },
    {
      name: "Bills",
      desc: "Electricity, TV and more",
      icon: "▣",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-950 transition-colors dark:bg-[#050505] dark:text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">

        <div className="flex items-center gap-3">
          <img
            src="/alphabot-logo.jpg"
            alt="AlphaBot"
            className="w-10 h-10 rounded-xl object-contain"
          />

          <h1 className="text-xl font-bold">
            AlphaBot
          </h1>
        </div>

        <div className="hidden md:flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/about" className="hover:text-zinc-950 dark:hover:text-white transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-zinc-950 dark:hover:text-white transition">
            Contact
          </Link>

          <Link href="/login" className="hover:text-zinc-950 dark:hover:text-white transition">
            Login
          </Link>
        </div>

      </nav>


      {/* HERO */}
      <section className="px-6 pt-20 pb-14 text-center max-w-4xl mx-auto">

        <h2 className="text-5xl md:text-6xl font-black leading-tight">

          Smart Digital
          <br />

          <span className="bg-gradient-to-r from-zinc-950 via-zinc-600 to-zinc-400 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-500">
            Payments Made Simple
          </span>

        </h2>

        <p className="mt-6 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          AlphaBot provides wallet, airtime, data and digital payment solutions in one secure platform.
        </p>

        <div className="flex justify-center gap-4 mt-9">

          <Link
            href="/register"
            className="bg-zinc-950 text-white px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition dark:bg-white dark:text-black"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="bg-zinc-100 border border-zinc-300 text-zinc-800 px-8 py-3.5 rounded-xl font-bold hover:border-zinc-500 transition dark:bg-[#18181B] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-400"
          >
            Login
          </Link>

        </div>

      </section>


      {/* SERVICES */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">

        <h3 className="text-2xl font-bold mb-6">
          Everything you need
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {services.map((service) => (
            <div
              key={service.name}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 hover:border-zinc-400 transition dark:bg-[#18181B] dark:border-zinc-800 dark:hover:border-zinc-500"
            >

              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-xl mb-4 dark:bg-[#050505] dark:border-zinc-800">
                {service.icon}
              </div>

              <h4 className="font-bold">
                {service.name}
              </h4>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                {service.desc}
              </p>

            </div>
          ))}

        </div>

      </section>


      {/* MORE THAN PAYMENTS */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">

        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#111113]">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            More than payments
          </p>

          <h3 className="text-2xl sm:text-3xl font-black mt-2">
            One platform. More possibilities.
          </h3>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 leading-7 max-w-2xl">
            AlphaBot brings digital services, payments, intelligent technology and account protection together in one place.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">

            {[
              ["💳", "Digital Services", "Airtime, data, bills, television and other supported services."],
              ["💰", "Wallet & Payments", "Manage supported payments and financial activities from one place."],
              ["🤖", "Intelligent Assistance", "AI-powered experiences designed to make AlphaBot easier to use."],
              ["🔐", "Security-minded", "Transaction PINs, biometrics and two-factor authentication help protect supported account activities."],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="text-2xl">{icon}</div>

                <h4 className="font-bold mt-3">
                  {title}
                </h4>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
                  {desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>


      {/* AI SECTION */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">

        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 text-zinc-950 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#111113] dark:text-white">

          <div className="text-3xl">
            🤖
          </div>

          <h3 className="text-2xl sm:text-3xl font-black mt-4">
            AlphaBot is built with AI in mind.
          </h3>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 leading-7 max-w-2xl">
            Technology should make everyday digital experiences easier, not more complicated. AlphaBot is being developed with AI as an important part of that experience.
          </p>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 leading-7 max-w-2xl">
            From getting assistance to understanding services and navigating the platform, intelligent features can make AlphaBot more useful over time.
          </p>

        </div>

      </section>


      {/* VISION */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">

        <div className="rounded-3xl border border-zinc-200 bg-zinc-100 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#18181B]">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Our direction
          </p>

          <h3 className="text-2xl sm:text-3xl font-black mt-2">
            Building for what comes next.
          </h3>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 leading-7 max-w-2xl">
            AlphaBot is evolving beyond a collection of payment features into a platform where digital services, intelligent technology and account protection can work together.
          </p>

          <Link
            href="/about"
            className="inline-flex mt-5 text-sm font-bold text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white"
          >
            Learn more about AlphaBot →
          </Link>

        </div>

      </section>


      {/* RESOURCES */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">

        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#111113]">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Explore AlphaBot
          </p>

          <h3 className="text-2xl sm:text-3xl font-black mt-2">
            Discover more with AlphaBot.
          </h3>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 leading-7 max-w-2xl">
            Explore guides and useful information about data, VTU services, football, competitions, technology, account security and more.
          </p>

          <Link
            href="/resources"
            className="inline-flex mt-5 text-sm font-bold text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white transition"
          >
            Explore AlphaBot →
          </Link>

        </div>

      </section>


      {/* TRUST */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">

        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 text-center dark:bg-[#18181B] dark:border-zinc-800">

          <h3 className="text-xl font-bold">
            Built for simple and secure payments
          </h3>

          <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-sm">
            Manage your digital services with speed, security and intelligence.
          </p>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-zinc-200 px-6 py-12 dark:border-zinc-800">

        <div className="max-w-5xl mx-auto">

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

            <div>
              <p className="font-black text-lg">
                AlphaBot
              </p>

              <p className="text-xs text-zinc-500 mt-3 leading-5">
                Digital services, payments and intelligent technology in one place.
              </p>
            </div>


            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                Platform
              </p>

              <div className="flex flex-col gap-3 mt-4 text-sm text-zinc-500 dark:text-zinc-400">

                <Link href="/about" className="hover:text-black dark:hover:text-white transition">
                  About AlphaBot
                </Link>

                <Link href="/about" className="hover:text-black dark:hover:text-white transition">
                  Security
                </Link>

              </div>
            </div>


            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                Help
              </p>

              <div className="flex flex-col gap-3 mt-4 text-sm text-zinc-500 dark:text-zinc-400">

                <Link href="/support" className="hover:text-black dark:hover:text-white transition">
                  Support
                </Link>

                <Link href="/contact" className="hover:text-black dark:hover:text-white transition">
                  Contact
                </Link>

              </div>
            </div>


            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                Legal
              </p>

              <div className="flex flex-col gap-3 mt-4 text-sm text-zinc-500 dark:text-zinc-400">

                <Link href="/terms" className="hover:text-black dark:hover:text-white transition">
                  Terms of Service
                </Link>

                <Link href="/privacy" className="hover:text-black dark:hover:text-white transition">
                  Privacy Policy
                </Link>

              </div>
            </div>

          </div>


          <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between gap-4">

            <div>
              <p className="font-bold text-sm">
                Developer
              </p>

              <p className="text-xs text-zinc-500 mt-1 leading-5">
                Built with technology and a vision for simpler digital experiences.
              </p>

              <p className="text-xs text-zinc-500 mt-2">
                AlphaBot is an evolving platform.
              </p>
            </div>

            <div className="text-xs text-zinc-500 sm:text-right">
              <p>
                © {new Date().getFullYear()} AlphaBot
              </p>

              <p className="mt-1">
                All rights reserved.
              </p>
            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}
