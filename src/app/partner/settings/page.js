"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResellerSettings() {
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
          setMessage(result.message || "Unable to load account");
        }
      } catch {
        setMessage("Connection error");
      }
    };

    load();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("partnerToken");
    router.push("/partner/login");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white px-5 py-8 md:px-8">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => router.push("/partner/dashboard")}
          className="text-zinc-400 hover:text-white text-sm mb-6"
        >
          ← Dashboard
        </button>

        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your reseller account.
        </p>

        {message && (
          <p className="text-red-400 mt-5">
            {message}
          </p>
        )}

        {/* Account */}
        <section className="
          mt-8
          bg-gradient-to-b
          from-[#18181B]
          to-[#101012]
          border
          border-zinc-800
          rounded-3xl
          p-6
        ">
          <p className="text-zinc-500 text-sm">
            Account
          </p>

          <h2 className="text-xl font-bold mt-2">
            {data?.name || "Reseller"}
          </h2>

          <p className="text-zinc-500 text-sm mt-1">
            AlphaBot Reseller
          </p>

          {data?.status && (
            <span className="
              inline-block
              mt-4
              px-3
              py-1
              rounded-full
              bg-white
              text-black
              text-xs
              font-bold
            ">
              {data.status}
            </span>
          )}
        </section>

        {/* Profit */}
        <section className="
          mt-4
          bg-gradient-to-b
          from-[#18181B]
          to-[#101012]
          border
          border-zinc-800
          rounded-3xl
          p-6
        ">
          <p className="text-zinc-500 text-sm">
            Profit Balance
          </p>

          <p className="text-3xl font-bold mt-2">
            ₦
            {Number(
              data?.lifetimeCommission ||
              data?.totalEarned ||
              0
            ).toLocaleString()}
          </p>

          <p className="text-zinc-500 text-xs mt-2">
            Your existing earnings continue into the new
            reseller system.
          </p>
        </section>

        {/* Quick settings */}
        <section className="mt-8">

          <h2 className="text-lg font-bold mb-3">
            Account
          </h2>

          <div className="space-y-3">

            <button
              onClick={() => router.push("/partner/services")}
              className="
                w-full
                text-left
                bg-[#101012]
                border
                border-zinc-800
                rounded-2xl
                p-5
                hover:border-zinc-500
                transition
              "
            >
              <p className="font-semibold">
                🛍️ Services
              </p>

              <p className="text-zinc-500 text-sm mt-1">
                Manage the services you sell.
              </p>
            </button>

            <button
              onClick={() => router.push("/partner/prices")}
              className="
                w-full
                text-left
                bg-[#101012]
                border
                border-zinc-800
                rounded-2xl
                p-5
                hover:border-zinc-500
                transition
              "
            >
              <p className="font-semibold">
                🏷️ My Prices
              </p>

              <p className="text-zinc-500 text-sm mt-1">
                Control your customer selling prices.
              </p>
            </button>

          </div>

        </section>

        {/* Logout */}
        <button
          onClick={logout}
          className="
            mt-8
            w-full
            border
            border-red-900
            text-red-400
            rounded-2xl
            py-4
            font-semibold
            hover:bg-red-950
            transition
          "
        >
          Log out
        </button>

      </div>
    </main>
  );
}
