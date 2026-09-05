"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import MarketplaceWishlistButton from "@/components/MarketplaceWishlistButton";

const API_BASE = "https://api.alphabothq.com";

function formatPrice(value) {
  return `₦${Number(value || 0).toLocaleString("en-NG", {
    maximumFractionDigits: 0,
  })}`;
}

function getProductImage(product) {
  return (
    product?.image ||
    product?.images?.[0] ||
    product?.imageUrl ||
    "/placeholder-product.png"
  );
}

export default function MarketplaceWishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/marketplace/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.message || "Failed to load wishlist");
        }

        setWishlist(Array.isArray(data.products) ? data.products : []);
      })
      .catch((error) => {
        console.error("WISHLIST PAGE ERROR:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const removeProduct = (productId) => {
    setWishlist((current) =>
      current.filter((item) => item.product?._id !== productId)
    );
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white pb-28">
      <header className="sticky top-0 z-30 bg-zinc-50/95 dark:bg-black/95 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/marketplace" className="text-sm font-black">
            ← Marketplace
          </Link>

          <h1 className="text-sm font-black">❤️ Wishlist</h1>

          <span className="text-[10px] font-black text-zinc-500">
            {wishlist.length}
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-5">
        {loading ? (
          <div className="py-20 text-center text-xs font-black text-zinc-500">
            Loading wishlist...
          </div>
        ) : wishlist.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4">♡</div>

            <h2 className="text-lg font-black">
              Your wishlist is empty
            </h2>

            <p className="text-xs text-zinc-500 mt-2">
              Save products you love and find them here later.
            </p>

            <Link
              href="/marketplace"
              className="inline-flex mt-6 px-5 h-11 items-center rounded-2xl bg-yellow-400 text-black text-xs font-black"
            >
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {wishlist.map((item) => {
              const product = item.product;

              if (!product) {
                return (
                  <div
                    key={item.wishlistId}
                    className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4"
                  >
                    <div className="h-32 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                      📦
                    </div>

                    <p className="text-xs font-black mt-3">
                      Product unavailable
                    </p>
                  </div>
                );
              }

              const discounted =
                Number(product.discountPercent || 0) > 0 &&
                Number(product.originalPrice || 0) >
                  Number(product.price || 0);

              return (
                <div
                  key={item.wishlistId}
                  className="rounded-2xl overflow-hidden bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="relative">
                    <Link href={`/marketplace/product/${product._id}`}>
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                    </Link>

                    <div className="absolute top-2 right-2">
                      <MarketplaceWishlistButton
                        productId={product._id}
                        initialWishlisted={true}
                        className="w-9 h-9"
                        onChange={(next) => {
                          if (!next) removeProduct(product._id);
                        }}
                      />
                    </div>
                  </div>

                  <Link href={`/marketplace/product/${product._id}`}>
                    <div className="p-3">
                      <p className="text-xs font-bold truncate">
                        {product.name}
                      </p>

                      {discounted ? (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="text-[10px] text-zinc-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>

                          <span className="text-sm font-black">
                            {formatPrice(product.price)}
                          </span>

                          <span className="text-[8px] font-black text-green-500">
                            -{Math.round(product.discountPercent)}%
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm font-black mt-2">
                          {formatPrice(product.price)}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
