 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "WAEC",
    description: "WAEC Result Checker PIN",
    cost: 3500,
    price: 3600,
  },
  {
    id: 2,
    name: "NECO",
    description: "NECO Result Checker PIN",
    cost: 1500,
    price: 1600,
  },
  {
    id: 3,
    name: "NABTEB",
    description: "NABTEB Result Checker PIN",
    cost: 1500,
    price: 1600,
  },
  {
    id: 4,
    name: "JAMB",
    description: "JAMB ePIN",
    cost: 5000,
    price: 5100,
  },
];

export default function PartnerEpinPrices() {
  const router = useRouter();

  const [prices, setPrices] = useState(
    Object.fromEntries(
      products.map((product) => [product.id, product.price])
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
          <div className="text-4xl">🎫</div>

          <h1 className="text-3xl font-bold mt-3">
            ePIN Prices
          </h1>

          <p className="text-zinc-400 mt-2">
            Set your selling prices for available ePIN
            products.
          </p>
        </div>

        <div className="mt-8 space-y-4">

          {products.map((product) => {
            const sellingPrice = Number(
              prices[product.id] || 0
            );

            const profit = sellingPrice - product.cost;

            return (
              <div
                key={product.id}
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
                      {product.name}
                    </p>

                    <p className="text-zinc-500 text-sm mt-1">
                      {product.description}
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
                        ₦{product.cost.toLocaleString()}
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
                          min={product.cost}
                          value={prices[product.id]}
                          onChange={(e) =>
                            updatePrice(
                              product.id,
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

        </div>

      </div>
    </main>
  );
}
