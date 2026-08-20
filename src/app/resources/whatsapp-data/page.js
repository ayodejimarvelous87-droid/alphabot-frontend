import Link from "next/link";

export const metadata = {
  title: "WhatsApp Data in Nigeria | WhatsApp Bundles | AlphaBot",
  description:
    "Learn about WhatsApp data bundles in Nigeria, how WhatsApp-only plans work, what they cover and what to consider before choosing a bundle.",
  keywords: [
    "WhatsApp data Nigeria",
    "WhatsApp data bundles",
    "WhatsApp bundle Nigeria",
    "WhatsApp only data",
    "cheap WhatsApp data",
    "WhatsApp internet bundle",
    "buy WhatsApp data Nigeria",
    "AlphaBot WhatsApp data",
  ],
};

export default function WhatsAppDataPage() {
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
          AlphaBot Guide
        </p>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight mt-3">
          WhatsApp Data in Nigeria
        </h1>

        <p className="text-lg text-zinc-400 mt-5 leading-8">
          Learn how WhatsApp data bundles work in Nigeria, what they can be
          used for and what to consider when choosing an affordable bundle.
        </p>

        <Link
          href="/register"
          className="inline-flex mt-7 bg-white text-black px-7 py-3.5 rounded-xl font-bold hover:scale-105 transition"
        >
          Get Started with AlphaBot
        </Link>
      </section>

      <section className="px-6 pb-20 max-w-4xl mx-auto">
        <div className="space-y-8">

          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black">
              What is WhatsApp data?
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              WhatsApp data refers to a data bundle designed primarily for
              using WhatsApp and supported WhatsApp activities. These bundles
              can be useful for messaging, voice calls, sharing media and
              staying connected without using a regular all-purpose data
              bundle as quickly.
            </p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black">
              What can you use WhatsApp data for?
            </h2>

            <div className="space-y-5 mt-6">

              <div>
                <h3 className="font-bold">Messaging</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Send and receive WhatsApp messages while using your
                  supported bundle.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Voice and video calls</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Some supported bundles can be useful for WhatsApp calls,
                  depending on the network plan and its terms.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Photos and media</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  WhatsApp bundles may help with sharing messages, images
                  and other supported media.
                </p>
              </div>

            </div>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black">
              Things to check before buying
            </h2>

            <div className="space-y-5 mt-6">

              <div>
                <h3 className="font-bold">Network compatibility</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Make sure the bundle is available for your mobile network.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Validity</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Check how long the bundle remains active before purchasing.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Usage restrictions</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  Check what services and activities are covered by the
                  specific bundle.
                </p>
              </div>

            </div>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-[#111113] p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black">
              Explore more data guides
            </h2>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">

              <Link
                href="/resources/cheap-data-nigeria"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">Cheap Data in Nigeria</h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Explore affordable data options.
                </p>
              </Link>

              <Link
                href="/resources/awoof-data"
                className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
              >
                <h3 className="font-bold">Awoof Data</h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Learn about promotional and affordable data offers.
                </p>
              </Link>

            </div>
          </article>

        </div>
      </section>

    </main>
  );
}
