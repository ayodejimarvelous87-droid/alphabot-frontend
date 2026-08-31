"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const networks = ["MTN", "Airtel", "Glo", "9mobile"];

export default function PartnerDataPrices() {
  const router = useRouter();

  const [network, setNetwork] = useState("MTN");
  const [plans, setPlans] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
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
          "https://api.alphabothq.com/reseller-prices/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Unable to load prices"
          );
        }

        setPlans(data);

        const initialPrices = {};

        data.forEach((plan) => {
          initialPrices[plan.productId] =
            plan.sellingPrice ?? plan.basePrice;
        });

        setPrices(initialPrices);

      } catch (error) {
        console.error("LOAD RESELLER PRICES ERROR:", error);
        setMessage(error.message || "Unable to load prices");
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

  const savePrice = async (plan) => {
    const token = localStorage.getItem("partnerToken");

    const price = Number(prices[plan.productId]);
    const basePrice = Number(plan.basePrice);

    if (!Number.isFinite(price) || price < basePrice) {
      setMessage(
        `Selling price cannot be below ₦${basePrice.toLocaleString()}`
      );
      return;
    }

    setSaving((current) => ({
      ...current,
      [plan.productId]: true,
    }));

    setMessage("");

    try {
      const res = await fetch(
        "https://api.alphabothq.com/reseller-prices/",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: plan.productId,
            sellingPrice: price,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Unable to save price"
        );
      }

      setPlans((current) =>
        current.map((item) =>
          item.productId === plan.productId
            ? {
                ...item,
                sellingPrice: price,
                customPrice: true,
              }
            : item
        )
      );

      setMessage("✅ Price updated successfully");

    } catch (error) {
      console.error("SAVE RESELLER PRICE ERROR:", error);
      setMessage(error.message || "Unable to save price");

    } finally {
      setSaving((current) => ({
        ...current,
        [plan.productId]: false,
      }));
    }
  };

  const filteredPlans = plans.filter(
    (plan) =>
      String(plan.network).toLowerCase() ===
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
          <div className="text-4xl">📶</div>

          <h1 className="text-3xl font-bold mt-3">
            Data Prices
          </h1>

          <p className="text-zinc-400 mt-2">
            Set the price your customers will pay for each
            data plan.
          </p>
        </div>

        {message && (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-[#101012] px-4 py-3 text-sm">
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

        {loading && (
          <div className="mt-8 text-zinc-400">
            Loading data plans...
          </div>
        )}

        {!loading && filteredPlans.length === 0 && (
          <div className="mt-8 rounded-3xl border border-zinc-800 bg-[#101012] p-6 text-zinc-400">
            No active {network} data plans available.
          </div>
        )}

        {!loading && filteredPlans.length > 0 && (
          <section className="mt-6 space-y-4">

            {filteredPlans.map((plan) => {

              const basePrice = Number(
                plan.basePrice || 0
              );

              const sellingPrice = Number(
                prices[plan.productId] ?? basePrice
              );

              const profit =
                sellingPrice - basePrice;

              return (
                <div
                  key={plan.productId}
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

                  <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-5
                  ">

                    <div>
                      <p className="text-xl font-bold">
                        {plan.name || plan.datasize}
                      </p>

                      <p className="text-zinc-500 text-sm mt-1">
                        {plan.network}
                        {plan.validity
                          ? ` • ${plan.validity}`
                          : ""}
                      </p>

                      {plan.customPrice && (
                        <span className="
                          inline-block
                          mt-2
                          text-xs
                          px-2.5
                          py-1
                          rounded-full
                          bg-green-500/10
                          text-green-400
                          border
                          border-green-500/20
                        ">
                          Custom price
                        </span>
                      )}
                    </div>

                    <div className="
                      grid
                      grid-cols-2
                      md:flex
                      gap-5
                      md:items-center
                    ">

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
                          Customer price
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
                            value={
                              prices[plan.productId] ?? ""
                            }
                            onChange={(e) =>
                              updatePrice(
                                plan.productId,
                                e.target.value
                              )
                            }
                            className="
                              w-28
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

                  </div>

                  <button
                    onClick={() => savePrice(plan)}
                    disabled={saving[plan.productId]}
                    className="
                      mt-5
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
                    "
                  >
                    {saving[plan.productId]
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
