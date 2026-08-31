"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlphaLogo from "@/components/AlphaLogo";

export default function PartnerDashboard() {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("partnerToken");

    if (!token) {
      router.push("/partner/login");
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(
          "https://api.alphabothq.com/blog-partner/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();

        if (res.ok) {
          setData(result);
        } else {
          setMessage(result.message || "Unable to load dashboard");
        }
      } catch {
        setMessage("Connection error");
      }
    };

    load();
  }, [router]);

  const stats = [
    {
      label: "Today's Sales",
      value: "₦0",
      icon: "📈",
    },
    {
      label: "Today's Profit",
      value: "₦0",
      icon: "💰",
    },
    {
      label: "Total Sales",
      value: "₦0",
      icon: "🧾",
    },
    {
      label: "Total Profit",
      value: "₦0",
      icon: "🚀",
    },
  ];

  const services = [
    ["📶", "Data", "/partner/services/data"],
    ["📱", "Airtime", "/partner/services/airtime"],
    ["📺", "TV", "/partner/services/tv"],
    ["⚡", "Electricity", "/partner/services/electricity"],
    ["🎫", "ePIN", "/partner/services/epin"],
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white px-5 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlphaLogo />

            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                AlphaBot Reseller
              </h1>

              <p className="text-zinc-400 text-sm mt-1">
                Manage your prices and track your business
              </p>
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="mt-8">
          <p className="text-zinc-400 text-sm">
            Welcome back 👋
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {data?.name || "Reseller"}
          </h2>
        </div>

        {/* Error */}
        {message && (
          <p className="text-red-400 mt-4">
            {message}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="
                bg-gradient-to-b
                from-[#18181B]
                to-[#101012]
                border
                border-zinc-800
                rounded-3xl
                p-5
              "
            >
              <div className="text-xl">
                {stat.icon}
              </div>

              <p className="text-zinc-400 text-sm mt-4">
                {stat.label}
              </p>

              <p className="text-xl md:text-2xl font-bold mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Services */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              Services
            </h2>

            <button
              onClick={() => router.push("/partner/services")}
              className="text-sm text-zinc-400 hover:text-white"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {services.map(([icon, name, path]) => (
              <button
                key={name}
                onClick={() => router.push(path)}
                className="
                  text-left
                  bg-gradient-to-b
                  from-[#18181B]
                  to-[#101012]
                  border
                  border-zinc-800
                  rounded-2xl
                  p-5
                  hover:border-zinc-500
                  transition
                "
              >
                <div className="text-2xl">
                  {icon}
                </div>

                <p className="font-semibold mt-3">
                  {name}
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  Manage prices
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Main Actions */}
        <section className="grid md:grid-cols-2 gap-4 mt-8">

          <button
            onClick={() => router.push("/partner/prices")}
            className="
              text-left
              bg-gradient-to-br
              from-[#202024]
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
              🏷️
            </div>

            <h3 className="text-xl font-bold mt-4">
              My Prices
            </h3>

            <p className="text-zinc-400 text-sm mt-2">
              Set your own selling prices and control how much
              you earn from each service.
            </p>

            <span className="inline-block mt-5 text-sm font-semibold">
              Manage prices →
            </span>
          </button>

          <button
            onClick={() => router.push("/partner/transactions")}
            className="
              text-left
              bg-gradient-to-br
              from-[#202024]
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
              📊
            </div>

            <h3 className="text-xl font-bold mt-4">
              Transactions
            </h3>

            <p className="text-zinc-400 text-sm mt-2">
              View customer purchases, sales amounts and the
              profit generated from your reseller business.
            </p>

            <span className="inline-block mt-5 text-sm font-semibold">
              View transactions →
            </span>
          </button>

        </section>

        {/* Bottom navigation */}
        <nav className="
          mt-10
          border-t
          border-zinc-800
          pt-5
          flex
          justify-around
          gap-2
          text-xs
          text-zinc-500
        ">
          <button
            onClick={() => router.push("/partner/dashboard")}
            className="text-white"
          >
            🏠
            <span className="block mt-1">
              Home
            </span>
          </button>

          <button
            onClick={() => router.push("/partner/services")}
            className="hover:text-white"
          >
            🛍️
            <span className="block mt-1">
              Services
            </span>
          </button>

          <button
            onClick={() => router.push("/partner/prices")}
            className="hover:text-white"
          >
            🏷️
            <span className="block mt-1">
              Prices
            </span>
          </button>

          <button
            onClick={() => router.push("/partner/transactions")}
            className="hover:text-white"
          >
            📊
            <span className="block mt-1">
              Profit
            </span>
          </button>

          <button
            onClick={() => router.push("/partner/settings")}
            className="hover:text-white"
          >
            ⚙️
            <span className="block mt-1">
              More
            </span>
          </button>
        </nav>

      </div>
    </main>
  );
}
