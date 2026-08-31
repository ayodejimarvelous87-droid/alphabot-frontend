"use client";

import { useRouter } from "next/navigation";

export default function ResellerServices() {
  const router = useRouter();

  const services = [
    {
      icon: "📶",
      name: "Data",
      description: "Set your selling prices for data plans.",
      path: "/partner/services/data",
    },
    {
      icon: "📱",
      name: "Airtime",
      description: "Set your selling prices for airtime.",
      path: "/partner/services/airtime",
    },
    {
      icon: "📺",
      name: "TV",
      description: "Set your selling prices for TV subscriptions.",
      path: "/partner/services/tv",
    },
    {
      icon: "⚡",
      name: "Electricity",
      description: "Set your selling prices for electricity.",
      path: "/partner/services/electricity",
    },
    {
      icon: "🎫",
      name: "ePIN",
      description: "Set your selling prices for ePIN products.",
      path: "/partner/services/epin",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white px-5 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => router.push("/partner/dashboard")}
          className="text-zinc-400 hover:text-white text-sm mb-6"
        >
          ← Dashboard
        </button>

        <h1 className="text-3xl font-bold">
          Services
        </h1>

        <p className="text-zinc-400 mt-2">
          Choose a service and set the prices your customers will pay.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {services.map((service) => (
            <button
              key={service.name}
              onClick={() => router.push(service.path)}
              className="
                text-left
                bg-gradient-to-b
                from-[#18181B]
                to-[#101012]
                border
                border-zinc-800
                rounded-3xl
                p-6
                hover:border-zinc-500
                transition
              "
            >
              <div className="text-3xl">
                {service.icon}
              </div>

              <h2 className="text-xl font-bold mt-5">
                {service.name}
              </h2>

              <p className="text-zinc-400 text-sm mt-2">
                {service.description}
              </p>

              <div className="mt-6 text-sm font-semibold">
                Set prices →
              </div>
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}
