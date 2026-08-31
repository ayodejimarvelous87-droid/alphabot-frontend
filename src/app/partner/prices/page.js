 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Data", icon: "📶" },
  { name: "Airtime", icon: "📱" },
  { name: "TV", icon: "📺" },
  { name: "Electricity", icon: "⚡" },
  { name: "ePIN", icon: "🎫" },
];

const demoPlans = [
  {
    name: "MTN 1GB",
    network: "MTN",
    cost: 300,
    price: 350,
  },
  {
    name: "MTN 2GB",
    network: "MTN",
    cost: 600,
    price: 680,
  },
  {
    name: "Airtel 1GB",
    network: "Airtel",
    cost: 300,
    price: 350,
  },
  {
    name: "Glo 1GB",
    network: "Glo",
    cost: 290,
    price: 340,
  },
];

export default function PartnerPrices() {
  const router = useRouter();
  const [category, setCategory] = useState("Data");

  const [prices, setPrices] = useState(
    Object.fromEntries(
      demoPlans.map((plan) => [plan.name, plan.price])
    )
  );

  const updatePrice = (name, value) => {
    setPrices((current) => ({
      ...current,
      [name]: value,
    }));
  };

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
            Set the prices your customers will pay.
          </p>
        </div>

        {/* Categories */}
        <div className="
          flex
          gap-2
          overflow-x-auto
          mt-8
          pb-2
        ">
          {categories.map((item) => (
            <button
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`
                shrink-0
                px-4
                py-3
                rounded-2xl
                border
                text-sm
                font-semibold
                transition
                ${
                  category === item.name
                    ? "bg-white text-black border-white"
                    : "bg-[#101012] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                }
              `}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="
          mt-6
          bg-[#111113]
          border
          border-zinc-800
          rounded-2xl
          p-4
        ">
          <p className="text-sm text-zinc-300">
            💡 You control your customer price.
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            AlphaBot handles the actual transaction using the
            main account. Your profit is the difference between
            your selling price and the base price.
          </p>
        </div>

        {/* Plans */}
        {category === "Data" ? (
          <section className="mt-6 space-y-3">

            {demoPlans.map((plan) => {
              const sellingPrice = Number(
                prices[plan.name] || 0
              );

              const profit = Math.max(
                0,
                sellingPrice - plan.cost
              );

              return (
                <div
                  key={plan.name}
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
                      <p className="font-bold text-lg">
                        {plan.name}
                      </p>

                      <p className="text-zinc-500 text-sm mt-1">
                        {plan.network}
                      </p>
                    </div>

                    <div className="
                      grid
                      grid-cols-2
                      md:flex
                      gap-4
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

                        <p className="font-semibold text-green-400 mt-1">
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
                            value={sellingPrice}
                            onChange={(e) =>
                              updatePrice(
                                plan.name,
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
                    className="
                      mt-5
                      w-full
                      md:w-auto
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
                    onClick={() => {}}
                  >
                    Save Price
                  </button>

                </div>
              );
            })}

          </section>
        ) : (
          <div className="
            mt-6
            bg-gradient-to-b
            from-[#18181B]
            to-[#101012]
            border
            border-zinc-800
            rounded-3xl
            p-8
            text-center
          ">
            <div className="text-4xl">
              {categories.find(
                (item) => item.name === category
              )?.icon}
            </div>

            <h2 className="text-xl font-bold mt-4">
              {category} pricing
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Pricing plans for this service will appear here.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
