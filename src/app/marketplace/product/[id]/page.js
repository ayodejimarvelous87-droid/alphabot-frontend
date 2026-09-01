"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

export default function ProductPage({ params }) {
  const { id } = use(params);

  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setMounted(true);

    fetch(`https://api.alphabothq.com/marketplace/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
        }
      })
      .catch((error) => {
        console.error("Marketplace product error:", error);
      });
  }, [id]);

  const addToCart = () => {
    if (!product) {
      return;
    }

    const savedCart = JSON.parse(
      localStorage.getItem("alphabotMarketplaceCart") || "[]"
    );

    const existing = savedCart.find(
      (item) => String(item.id) === String(product._id)
    );

    let updatedCart;

    if (existing) {
      updatedCart = savedCart.map((item) =>
        String(item.id) === String(product._id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...savedCart,
        {
          id: product._id,
          name: product.name,
          price: Number(product.price || 0),
          category: product.category,
          image: product.image || "",
          quantity: 1,
          sellerId: product.sellerId || null,
          sellerName: product.sellerName || "AlphaBot Seller",
        },
      ];
    }

    localStorage.setItem(
      "alphabotMarketplaceCart",
      JSON.stringify(updatedCart)
    );

    window.location.href = "/marketplace/cart";
  };

  if (!mounted) {
    return null;
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-5xl">🛍️</div>

          <h1 className="text-xl font-black mt-4">
            Product not found
          </h1>

          <p className="text-xs text-zinc-500 mt-2">
            This product may have been removed or is not available yet.
          </p>

          <Link
            href="/marketplace"
            className="inline-block mt-5 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black"
          >
            Back to Marketplace
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-10">

      {/* HEADER */}

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">

          <Link
            href="/marketplace"
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center active:scale-95 transition"
          >
            ←
          </Link>

          <div>
            <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
              ALPHABOT
            </p>

            <h1 className="font-black text-sm">
              Product
            </h1>
          </div>

        </div>
      </header>


      <div className="max-w-2xl mx-auto px-4">

        {/* PRODUCT IMAGE */}

        <section className="mt-4">

          <div className="h-72 rounded-3xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex items-center justify-center">

            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-8xl">
                {product.icon || "📦"}
              </span>
            )}

          </div>

        </section>


        {/* PRODUCT INFO */}

        <section className="mt-5">

          <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
            {product.category}
          </p>

          <h1 className="text-2xl font-black mt-2">
            {product.name}
          </h1>

          <p className="text-2xl font-black mt-3">
            ₦{Number(product.price || 0).toLocaleString()}
          </p>

          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-5" />

          <h2 className="text-sm font-black">
            Description
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-6 mt-2">
            {product.description || "No description provided."}
          </p>

        </section>


        {/* SELLER */}

        <section className="mt-6">

          <div className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4">

            <p className="text-[9px] uppercase tracking-[0.16em] font-black text-yellow-500">
              SELLER
            </p>

            <div className="flex items-center gap-3 mt-3">

              <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-black">
                {(product.sellerName || "A").charAt(0).toUpperCase()}
              </div>

              <div>

                <p className="text-sm font-black">
                  {product.sellerName || "AlphaBot Seller"}
                </p>

                {product.sellerVerified !== false && (
                  <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">
                    ✓ Verified seller
                  </p>
                )}

              </div>

            </div>

          </div>

        </section>


        {/* ACTIONS */}

        <section className="mt-6 grid grid-cols-2 gap-3">

          <button
            onClick={addToCart}
            className="h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 font-black text-xs active:scale-95 transition"
          >
            🛒 Add to cart
          </button>

          <button
            onClick={addToCart}
            className="h-12 rounded-2xl bg-yellow-400 text-black font-black text-xs active:scale-95 transition"
          >
            Buy now →
          </button>

        </section>

      </div>

    </main>
  );
}
