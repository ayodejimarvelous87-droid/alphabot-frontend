"use client";

import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-10 pb-24">

      <div className="max-w-3xl mx-auto">

        <Link
          href="/settings"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Settings
        </Link>

        {/* HERO */}
        <section className="mt-8">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-300">
              ABOUT ALPHABOT
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-5 leading-tight">
            About Alpha<span className="text-yellow-400">Bot</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 mt-5 leading-8">
            A digital platform built to make everyday financial tasks
            simpler, more accessible and easier to manage.
          </p>

        </section>


        {/* WHAT IS ALPHABOT */}
        <section className="mt-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#111113] p-6 sm:p-8">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 shrink-0 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xl">
              🤖
            </div>

            <div>

              <h2 className="text-xl font-black">
                What is AlphaBot?
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-7">
                AlphaBot is a digital payment and financial services
                platform designed to bring commonly used digital services
                together in one place.
              </p>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-4 leading-7">
                Instead of moving between different services for everyday
                tasks, AlphaBot gives users a central place to manage
                payments, airtime, data, bills and other supported services.
              </p>

            </div>

          </div>

        </section>


        {/* WHY ALPHABOT */}
        <section className="mt-10">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Why AlphaBot
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Built around everyday needs
          </h2>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 leading-7">
            AlphaBot is designed around a simple idea: everyday digital
            transactions should not feel unnecessarily complicated.
          </p>


          <div className="grid sm:grid-cols-2 gap-3 mt-6">

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
              <div className="text-2xl">⚡</div>

              <h3 className="font-bold mt-3">
                Simple
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                Clear interfaces and straightforward flows designed to
                reduce unnecessary steps.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
              <div className="text-2xl">💳</div>

              <h3 className="font-bold mt-3">
                Practical
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                Access commonly used digital payment and utility services
                from one platform.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
              <div className="text-2xl">🔐</div>

              <h3 className="font-bold mt-3">
                Security-minded
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                Account protection features such as transaction PINs,
                biometrics and two-factor authentication help users
                protect access to their accounts.
              </p>
            </div>


            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
              <div className="text-2xl">🤖</div>

              <h3 className="font-bold mt-3">
                Intelligent
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
                AlphaBot is designed with AI-powered experiences in mind,
                helping make digital services more useful and interactive.
              </p>
            </div>

          </div>

        </section>


        {/* SERVICES */}
        <section className="mt-12">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            The platform
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            More than payments
          </h2>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 leading-7">
            AlphaBot brings together a growing range of services so users
            can handle more of their everyday digital needs from one place.
          </p>


          <div className="mt-6 space-y-3">

            {[
              [
                "📱",
                "Airtime & Data",
                "Recharge and manage supported mobile services."
              ],
              [
                "💡",
                "Bills & Utilities",
                "Access supported electricity, television and other bill services."
              ],
              [
                "💰",
                "Wallet & Payments",
                "Manage supported transactions and payment activities."
              ],
              [
                "🏦",
                "Financial Services",
                "A growing platform for useful digital financial services."
              ],
              [
                "🤖",
                "AI Assistance",
                "An intelligent layer designed to make the platform easier and more useful."
              ]
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4"
              >

                <div className="w-11 h-11 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-lg">
                  {icon}
                </div>

                <div>
                  <p className="font-bold">
                    {title}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {description}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </section>


        {/* AI */}
        <section className="mt-12 rounded-3xl bg-black text-white dark:bg-white dark:text-black p-6 sm:p-8">

          <div className="text-3xl">
            ✨
          </div>

          <h2 className="text-2xl font-black mt-4">
            Where AI fits in
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 dark:text-zinc-600 mt-4 leading-7">
            AlphaBot is being developed with artificial intelligence as
            an important part of its future. The goal is not simply to
            add AI for the sake of having AI, but to make technology
            genuinely useful inside everyday financial and digital
            experiences.
          </p>

          <p className="text-sm sm:text-base text-zinc-300 dark:text-zinc-600 mt-4 leading-7">
            Over time, intelligent features can help users understand
            services, navigate the platform, get useful assistance and
            interact with AlphaBot in more natural ways.
          </p>

        </section>


        {/* SECURITY */}
        <section className="mt-12">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Your account
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Security matters
          </h2>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 leading-7">
            Financial services require trust. AlphaBot provides account
            protection features designed to give users greater control
            over access to their accounts and transactions.
          </p>


          <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">

            <div className="space-y-4">

              <div className="flex gap-3">
                <span>🔢</span>
                <div>
                  <p className="font-bold text-sm">
                    Transaction PIN
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    An additional PIN used to authorise supported transactions.
                  </p>
                </div>
              </div>


              <div className="flex gap-3">
                <span>👆</span>
                <div>
                  <p className="font-bold text-sm">
                    Biometric protection
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Supported devices can use biometric authentication for
                    additional protection.
                  </p>
                </div>
              </div>


              <div className="flex gap-3">
                <span>🔐</span>
                <div>
                  <p className="font-bold text-sm">
                    Two-factor authentication
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    An additional verification layer for important account
                    actions.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* VISION */}
        <section className="mt-12">

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Our direction
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Building for what comes next
          </h2>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-4 leading-7">
            AlphaBot is more than a collection of payment features.
            It is an evolving platform built around the idea that
            financial technology can become simpler, smarter and more
            accessible.
          </p>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-4 leading-7">
            As the platform grows, our focus is on bringing together
            useful digital services, intelligent technology and strong
            account protection while keeping the experience understandable
            for the people using it.
          </p>

        </section>


        {/* CLOSING */}
        <section className="mt-12 mb-8 rounded-3xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20 p-6 sm:p-8 text-center">

          <div className="text-3xl">
            💛
          </div>

          <h2 className="text-2xl font-black mt-3">
            Welcome to AlphaBot
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-7 max-w-xl mx-auto">
            We are building a platform where payments, digital services
            and intelligent technology can work together in one place.
          </p>

        </section>


        <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">
          AlphaBot
        </p>

      </div>

    </main>
  );
}
