 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const networks = ["MTN", "Airtel", "Glo", "9mobile"];

const plans = [
  { id: 1, name: "1GB", network: "MTN", cost: 300, price: 350 },
  { id: 2, name: "2GB", network: "MTN", cost: 600, price: 680 },
  { id: 3, name: "1GB", network: "Airtel", cost: 300, price: 350 },
  { id: 4, name: "2GB", network: "Airtel", cost: 590, price: 670 },
  { id: 5, name: "1GB", network: "Glo", cost: 290, price: 340 },
  { id: 6, name: "2GB", network: "Glo", cost: 570, price: 650 },
  { id: 7, name: "1GB", network: "9mobile", cost: 300, price: 350 },
];

export default function PartnerDataPrices() {
  const router = useRouter();
  const [network, setNetwork] = useState("MTN");

  const filteredPlans = plans.filter(
    (plan) => plan.network === network
  );

  const [prices, setPrices] = useState(
    Object.fromEntries(
      plans.map((plan) => [plan.id, plan.price])
    )
  );

  const updatePrice = (id, value) => {
    setPrices((current) => ({
      ...current,
      [id]: value,
    }));
  };

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

        {/* Network selector */}
        <div className="
          flex
          gap-2
          overflow-x-auto
          mt-8
          pb-2
        ">
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

        {/* Plans */}
        <section className="mt-6 space-y-4">

          {filteredPlans.map((plan) => {
            const sellingPrice = Number(
              prices[plan.id] || 0
            );

            const profit = sellingPrice - plan.cost;

            return (
              <div
                key={plan.id}
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
                      {plan.name}
                    </p>

                    <p className="text-zinc-500 text-sm mt-1">
                      {plan.network} data
                    </p>
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
                        ₦{plan.cost.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">
                        Your profit
                      </p>

                      <p className={`
                        font-semibold
                        mt-1
                        ${profit >= 0
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
                          min={plan.cost}
                          value={prices[plan.id]}
                          onChange={(e) =>
                            updatePrice(
                              plan.id,
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
                  onClick={() => {}}
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
                  "
                >
                  Save Price
                </button>

              </div>
            );
          })}

        </section>

      </div>
    </main>
  );
}
