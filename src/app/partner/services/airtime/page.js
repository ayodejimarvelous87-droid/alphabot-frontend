"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const networks = ["MTN", "Airtel", "Glo", "9mobile"];

export default function PartnerAirtimePrices() {
  const router = useRouter();

  const [network, setNetwork] = useState("MTN");
  const [plans, setPlans] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
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
          "https://api.alphabothq.com/reseller-prices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || "Unable to load prices");
          return;
        }

        const airtime = data.filter(
          (product) =>
            String(product.category || "").toLowerCase() ===
            "airtime"
        );

        setPlans(airtime);

        setPrices(
          Object.fromEntries(
            airtime.map((product) => [
              product.productId,
              product.sellingPrice
            ])
          )
        );
      } catch (error) {
        console.error(error);
        setMessage("Connection error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const updatePrice = (productId, value) => {
    setPrices((current) => ({
      ...current,
      [productId]: value,
    }));
  };

  const savePrice = async (product) => {
    const token = localStorage.getItem("partnerToken");

    if (!token) {
      router.push("/partner/login");
      return;
    }

    const price = Number(prices[product.productId] || 0);
    const basePrice = Number(product.basePrice || 0);

    if (!Number.isFinite(price) || price < basePrice) {
      setMessage(
        `Selling price cannot be below ₦${basePrice.toLocaleString()}`
      );
      return;
    }

    setSaving(product.productId);
    setMessage("");

    try {
      const res = await fetch(
        "https://api.alphabothq.com/reseller-prices",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.productId,
            sellingPrice: price,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Unable to save price");
        return;
      }

      setMessage("✅ Price updated successfully");
    } catch (error) {
      console.error(error);
      setMessage("Connection error");
    } finally {
      setSaving("");
    }
  };

  const filteredPlans = plans.filter(
    (plan) =>
      String(plan.network || "").toLowerCase() ===
      network.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white px-5 py-8 md:px-8">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => router.push("/partner/prices")}
          className="text-zinc-400 hover:text-white text-sm mb-6"
        >
          ← My Prices
        </button>

        <div>
          <div className="text-4xl">📱</div>

          <h1 className="text-3xl font-bold mt-3">
            Airtime Prices
          </h1>

          <p className="text-zinc-400 mt-2">
            Set the price your customers will pay for airtime.
          </p>
        </div>

        {message && (
          <div className="
            mt-6
            bg-[#111113]
            border
            border-zinc-800
            rounded-2xl
            p-4
            text-sm
            text-zinc-300
          ">
            {message}
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto mt-8 pb-2">
          {networks.map((item) => (
            <button
              key={item}
              onClick={() => setNetwork(item)}
              className={`
                shrink-0
                px-5
                py-3
                rounded-2xl
                border
                text-sm
                font-semibold
                transition
                ${
                  network === item
                    ? "bg-white text-black border-white"
                    : "bg-[#101012] border-zinc-800 text-zinc-400 hover:text-white"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="
            mt-6
            bg-[#111113]
            border
            border-zinc-800
            rounded-3xl
            p-8
            text-center
            text-zinc-500
          ">
            Loading airtime prices...
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="
            mt-6
            bg-[#111113]
            border
            border-zinc-800
            rounded-3xl
            p-8
            text-center
            text-zinc-500
          ">
            No airtime products available for {network}.
          </div>
        ) : (
          <section className="mt-6 space-y-4">

            {filteredPlans.map((product) => {
              const sellingPrice = Number(
                prices[product.productId] || 0
              );

              const basePrice = Number(
                product.basePrice || 0
              );

              const profit = sellingPrice - basePrice;

              return (
                <div
                  key={product.productId}
                  className="
                    bg-gradient-to-b
                    from-[#18181B]
                    to-[#101012]
                    border
                    border-zinc-800
                    rounded-3xl
                    p-6
                  "
                >

                  <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-end
                    md:justify-between
                    gap-6
                  ">

                    <div>
                      <p className="text-xl font-bold">
                        {product.name || `${product.network} Airtime`}
                      </p>

                      <p className="text-zinc-500 text-sm mt-1">
                        {product.network}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">
                        Base price
                      </p>

                      <p className="font-semibold mt-1">
                        ₦{basePrice.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">
                        Your profit
                      </p>

                      <p className={`
                        font-semibold
                        mt-1
                        ${
                          profit >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      `}>
                        ₦{profit.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500 mb-1">
                        Customer pays
                      </p>

                      <div className="flex items-center">
                        <span className="
                          bg-zinc-900
                          border
                          border-zinc-700
                          border-r-0
                          rounded-l-xl
                          px-3
                          py-2.5
                          text-zinc-400
                        ">
                          ₦
                        </span>

                        <input
                          type="number"
                          min={basePrice}
                          value={prices[product.productId] ?? ""}
                          onChange={(e) =>
                            updatePrice(
                              product.productId,
                              e.target.value
                            )
                          }
                          className="
                            w-32
                            bg-zinc-900
                            border
                            border-zinc-700
                            rounded-r-xl
                            px-3
                            py-2.5
                            text-white
                            outline-none
                            focus:border-white
                          "
                        />
                      </div>
                    </div>

                  </div>

                  <button
                    onClick={() => savePrice(product)}
                    disabled={saving === product.productId}
                    className="
                      mt-6
                      bg-white
                      text-black
                      px-5
                      py-2.5
                      rounded-xl
                      font-bold
                      text-sm
                      hover:bg-zinc-200
                      transition
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    {saving === product.productId
                      ? "Saving..."
                      : "Save Price"}
                  </button>

                </div>
              );
            })}

          </section>
        )}

      </div>
    </main>
  );
}
