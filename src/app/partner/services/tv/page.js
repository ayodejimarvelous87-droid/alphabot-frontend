"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PartnerTVPrices() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("partnerToken");

    if (!token) {
      router.push("/partner/login");
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(
          "https://api.alphabothq.com/blog-partner/reseller-prices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setMessage(
            data.message || "Unable to load TV prices"
          );
          return;
        }

        const tvProducts = data.filter(
          (item) =>
            String(item.category || "").toLowerCase() ===
            "tv"
        );

        setProducts(tvProducts);

        const initialPrices = {};

        tvProducts.forEach((item) => {
          initialPrices[item.productId] = item.sellingPrice;
        });

        setPrices(initialPrices);
      } catch {
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

  const savePrice = async (productId) => {
    const token = localStorage.getItem("partnerToken");
    const sellingPrice = Number(prices[productId]);

    if (!Number.isFinite(sellingPrice)) {
      setMessage("Enter a valid price");
      return;
    }

    try {
      const res = await fetch(
        "https://api.alphabothq.com/blog-partner/reseller-prices",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            sellingPrice,
          }),
        }
      );

      const data = await res.json();

      setMessage(
        res.ok
          ? "✅ Price saved successfully"
          : data.message || "Unable to save price"
      );
    } catch {
      setMessage("Connection error");
    }
  };

  const providers = [
    "All",
    ...new Set(
      products
        .map((product) => product.provider)
        .filter(Boolean)
    ),
  ];

  const filteredProducts =
    provider === "All"
      ? products
      : products.filter(
          (product) => product.provider === provider
        );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white px-5 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-zinc-400">
            Loading TV prices...
          </p>
        </div>
      </main>
    );
  }

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
          <div className="text-4xl">📺</div>

          <h1 className="text-3xl font-bold mt-3">
            TV Prices
          </h1>

          <p className="text-zinc-400 mt-2">
            Set the prices your customers will pay for TV
            subscriptions.
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
          ">
            {message}
          </div>
        )}

        {products.length > 0 && (
          <div className="flex gap-2 overflow-x-auto mt-8 pb-2">
            {providers.map((item) => (
              <button
                key={item}
                onClick={() => setProvider(item)}
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
                    provider === item
                      ? "bg-white text-black border-white"
                      : "bg-[#101012] border-zinc-800 text-zinc-400 hover:text-white"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 ? (
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
              📺
            </div>

            <h2 className="text-xl font-bold mt-4">
              No TV products found
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              No active TV products are currently
              available.
            </p>
          </div>
        ) : (
          <section className="mt-6 space-y-4">

            {filteredProducts.map((product) => {
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
                      <p className="text-lg font-bold">
                        {product.name}
                      </p>

                      <p className="text-zinc-500 text-sm mt-1">
                        {product.provider || "TV"}
                      </p>

                      {product.validity && (
                        <p className="text-zinc-600 text-xs mt-1">
                          {product.validity}
                        </p>
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
                            value={prices[product.productId]}
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

                  </div>

                  <button
                    onClick={() =>
                      savePrice(product.productId)
                    }
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
        )}

      </div>
    </main>
  );
}
