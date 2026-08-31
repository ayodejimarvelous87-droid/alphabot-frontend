"use client";

import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Data",
    icon: "📶",
    path: "/partner/services/data",
    description: "Set prices for data plans",
  },
  {
    name: "Airtime",
    icon: "📱",
    path: "/partner/services/airtime",
    description: "Set your airtime selling prices",
  },
  {
    name: "TV",
    icon: "📺",
    path: "/partner/services/tv",
    description: "Set prices for TV subscriptions",
  },
  {
    name: "Electricity",
    icon: "⚡",
    path: "/partner/services/electricity",
    description: "Set electricity service prices",
  },
  {
    name: "ePIN",
    icon: "🎫",
    path: "/partner/services/epin",
    description: "Set prices for ePIN products",
  },
];

export default function PartnerPrices() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#050505] text-white px-5 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => router.push("/partner/dashboard")}
          className="text-zinc-400 hover:text-white text-sm mb-6"
        >
          ← Dashboard
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            My Prices
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage the prices your customers will pay.
          </p>
        </div>

        <div className="
          mt-8
          bg-[#111113]
          border
          border-zinc-800
          rounded-2xl
          p-4
        ">
          <p className="text-sm text-zinc-300">
            💡 You control your customer prices.
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            Your custom prices apply only to your reseller
            account. AlphaBot's normal prices remain unchanged.
          </p>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-2">

          {categories.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className="
                text-left
                bg-gradient-to-b
                from-[#18181B]
                to-[#101012]
                border
                border-zinc-800
                rounded-3xl
                p-5
                hover:border-zinc-600
                transition
              "
            >

              <div className="flex items-center gap-4">

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-zinc-900
                  border
                  border-zinc-800
                  flex
                  items-center
                  justify-center
                  text-2xl
                ">
                  {item.icon}
                </div>

                <div className="flex-1">

                  <h2 className="text-lg font-bold">
                    {item.name}
                  </h2>

                  <p className="text-sm text-zinc-500 mt-1">
                    {item.description}
                  </p>

                </div>

                <span className="text-zinc-500 text-xl">
                  →
                </span>

              </div>

            </button>
          ))}

        </section>

      </div>
    </main>
  );
}
