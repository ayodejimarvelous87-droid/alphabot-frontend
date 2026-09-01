"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Marketplace() {

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [backendProducts, setBackendProducts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

  }, []);

  useEffect(() => {
    fetch("https://api.alphabothq.com/marketplace")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBackendProducts(data.products || []);
        }
      })
      .catch((error) => {
        console.error("Marketplace products error:", error);
      });
  }, []);

  const categories = [
    { name: "Phones", icon: "📱" },
    { name: "Electronics", icon: "🎧" },
    { name: "Fashion", icon: "👕" },
    { name: "Computers", icon: "💻" },
    { name: "Accessories", icon: "⌚" },
    { name: "Home", icon: "🏠" },
  ];

  const allProducts = backendProducts;

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-28">

      {/* HEADER */}

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">

        <div className="max-w-2xl mx-auto px-4 pt-5 pb-4">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500">
                ALPHABOT
              </p>

              <h1 className="text-2xl font-black tracking-tight">
                Marketplace
              </h1>
            </div>

            <Link
              href="/marketplace/cart"
              className="w-10 h-10 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center active:scale-95 transition"
            >
              🛒
            </Link>

          </div>

          {/* SEARCH */}

          <div className="mt-4 relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              🔍
            </span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 pl-11 pr-4 text-sm outline-none focus:border-yellow-400 transition"
            />

          </div>

        </div>

      </header>


      <div className="max-w-2xl mx-auto px-4">


        {/* HERO */}

        <section className="mt-4">

          <div className="relative overflow-hidden rounded-3xl bg-zinc-950 dark:bg-white p-5 text-white dark:text-black">

            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-yellow-400/20 blur-3xl" />

            <div className="relative">

              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-400 dark:text-yellow-600">
                ALPHABOT MARKETPLACE
              </p>

              <h2 className="text-xl font-black mt-2 max-w-[250px]">
                Discover products you actually want.
              </h2>

              <p className="text-xs opacity-60 mt-2 max-w-[280px]">
                Shop products, discover deals and connect with sellers.
              </p>

              <button className="mt-4 bg-yellow-400 text-black px-4 py-2.5 rounded-xl text-xs font-black active:scale-95 transition">
                Explore deals →
              </button>

            </div>

          </div>

        </section>


        {/* CATEGORIES */}

        <section className="mt-6">

          <div className="flex items-center justify-between mb-3">

            <h2 className="text-sm font-black">
              Categories
            </h2>

            <button className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400">
              View all
            </button>

          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">

            <button
              onClick={() => setSelectedCategory("All")}
              className={`min-w-[82px] rounded-2xl border p-3 active:scale-95 transition ${
                selectedCategory === "All"
                  ? "bg-yellow-400 border-yellow-400 text-black"
                  : "bg-white dark:bg-[#151515] border-zinc-200 dark:border-zinc-800"
              }`}
            >

              <div className="text-xl">
                🛍️
              </div>

              <p className="text-[10px] font-bold mt-2 whitespace-nowrap">
                All
              </p>

            </button>

            {categories.map((category) => (

              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`min-w-[82px] rounded-2xl border p-3 active:scale-95 transition ${
                  selectedCategory === category.name
                    ? "bg-yellow-400 border-yellow-400 text-black"
                    : "bg-white dark:bg-[#151515] border-zinc-200 dark:border-zinc-800"
                }`}
              >

                <div className="text-xl">
                  {category.icon}
                </div>

                <p className="text-[10px] font-bold mt-2 whitespace-nowrap">
                  {category.name}
                </p>

              </button>

            ))}

          </div>

        </section>


        {/* FEATURED DEALS */}

        <section className="mt-7">

          <div className="flex items-center justify-between mb-3">

            <div>
              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
                LIMITED OFFERS
              </p>

              <h2 className="text-lg font-black">
                🔥 Featured deals
              </h2>
            </div>

            <button className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400">
              See all
            </button>

          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

            {allProducts.slice(0, 4).map((product) => (

              <Link
                href={`/marketplace/product/${product._id}`}
                key={`deal-${product._id}`}
                className="min-w-[190px] bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden active:scale-[0.98] transition"
              >

                <div className="h-28 bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-yellow-400 text-black text-[8px] font-black">
                    DEAL
                  </span>

                </div>

                <div className="p-3">

                  <h3 className="text-xs font-bold truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">

                    <p className="text-sm font-black">
                      ₦{Math.round(product.price * 0.9).toLocaleString()}
                    </p>

                    <p className="text-[10px] text-zinc-400 line-through">
                      ₦{product.price.toLocaleString()}
                    </p>

                  </div>

                  <p className="text-[9px] text-green-600 dark:text-green-400 font-bold mt-1">
                    10% OFF
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* PRODUCTS */}

        <section className="mt-7">

          <div className="flex items-center justify-between mb-3">

            <div>
              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
                MARKETPLACE
              </p>

              <h2 className="text-lg font-black">
                Popular products
              </h2>
            </div>

            <button className="text-[10px] font-bold text-zinc-500">
              See all
            </button>

          </div>


          <div className="grid grid-cols-2 gap-3">

            {filteredProducts.map((product) => (

              <Link
                href={`/marketplace/product/${product._id}`}
                key={product._id}
                className="group bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden active:scale-[0.98] transition-all duration-200"
              >

                {/* PRODUCT IMAGE */}

                <div className="h-40 bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-white/90 dark:bg-black/80 backdrop-blur text-[8px] font-black">
                    {product.category}
                  </div>

                  <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur flex items-center justify-center text-sm active:scale-90 transition"
                  >
                    ♡
                  </button>

                </div>


                <div className="p-3">

                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[9px] text-yellow-500">
                      ★
                    </span>

                    <span className="text-[9px] text-zinc-500">
                      4.8 · Verified
                    </span>
                  </div>

                  <h3 className="text-xs font-bold leading-4 line-clamp-2 min-h-[32px]">
                    {product.name}
                  </h3>

                  <div className="flex items-end justify-between gap-2 mt-3">

                    <div>
                      <p className="text-[9px] text-zinc-500">
                        From
                      </p>

                      <p className="text-sm font-black">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center text-sm font-black">
                      +
                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>


          {filteredProducts.length === 0 && (

            <div className="py-16 text-center">

              <div className="text-4xl">
                🔎
              </div>

              <h3 className="font-black mt-3">
                No products found
              </h3>

              <p className="text-xs text-zinc-500 mt-1">
                Try searching for something else.
              </p>

            </div>

          )}

        </section>


        {/* SELLER CTA */}

        <section className="mt-8">

          <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center text-lg">
                🏪
              </div>

              <div className="flex-1">

                <h3 className="text-sm font-black">
                  Sell on AlphaBot
                </h3>

                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                  List your products and reach AlphaBot users.
                </p>

              </div>

              <span className="text-lg">
                →
              </span>

            </div>

          </div>

        </section>


      </div>


      <BottomNav />

    </main>
  );
}
