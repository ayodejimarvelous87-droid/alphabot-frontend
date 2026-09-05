"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import MarketplaceWishlistButton from "@/components/MarketplaceWishlistButton";

export default function ProductPage({ params }) {
  const { id } = use(params);

  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState(null);
  const [ratingSummary, setRatingSummary] = useState({
    averageRating: 0,
    ratingCount: 0,
  });
  const [followSummary, setFollowSummary] = useState({
    followerCount: 0,
    isFollowing: false,
  });
  const [followLoading, setFollowLoading] = useState(false);

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

    fetch(`https://api.alphabothq.com/marketplace/ratings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRatingSummary({
            averageRating: Number(data.averageRating || 0),
            ratingCount: Number(data.ratingCount || 0),
          });
        }
      })
      .catch((error) => {
        console.error("Marketplace product rating error:", error);
      });
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const viewKey = `marketplace-view-${id}`;
    const lastViewed = Number(sessionStorage.getItem(viewKey) || 0);

    if (Date.now() - lastViewed < 30000) {
      return;
    }

    sessionStorage.setItem(viewKey, String(Date.now()));

    const token = localStorage.getItem("token");

    fetch(`https://api.alphabothq.com/marketplace/views/${encodeURIComponent(id)}`, {
      method: "POST",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          console.error("Marketplace product view tracking failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Marketplace product view error:", error);
      });
  }, [id]);

  useEffect(() => {
    const sellerId = product?.seller?._id;

    if (!sellerId) {
      return;
    }

    fetch(
      `https://api.alphabothq.com/marketplace/follows/seller/${sellerId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFollowSummary({
            followerCount: Number(data.followerCount || 0),
            isFollowing: Boolean(data.isFollowing),
          });
        }
      })
      .catch((error) => {
        console.error("Marketplace seller follow error:", error);
      });
  }, [product?.seller?._id]);

  const toggleFollow = async () => {
    const sellerId = product?.seller?._id;

    if (!sellerId || followLoading) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to follow this seller.");
      return;
    }

    try {
      setFollowLoading(true);

      const method = followSummary.isFollowing ? "DELETE" : "POST";

      const response = await fetch(
        `https://api.alphabothq.com/marketplace/follows/seller/${sellerId}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update seller follow status."
        );
      }

      setFollowSummary({
        followerCount: Number(data.followerCount || 0),
        isFollowing: Boolean(data.isFollowing),
      });
    } catch (error) {
      console.error("SELLER FOLLOW ERROR:", error);
      alert(error.message || "Unable to update seller follow status.");
    } finally {
      setFollowLoading(false);
    }
  };

  const addToCart = () => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("alphabotMarketplaceCart") || "[]"
      );

      const existingCart = Array.isArray(savedCart)
        ? savedCart
        : [];

      const existingItem = existingCart.find(
        (item) => item.id === product._id
      );

      const availableStock = Number(product.stock);

      if (
        Number.isInteger(availableStock) &&
        availableStock > 0 &&
        existingItem &&
        Number(existingItem.quantity) >= availableStock
      ) {
        alert("You have reached the available stock for this product.");
        return;
      }

      const updatedCart = existingItem
        ? existingCart.map((item) =>
            item.id === product._id
              ? {
                  ...item,
                  quantity: Number(item.quantity || 1) + 1,
                  stock: product.stock,
                  sellerId: product.seller?._id || item.sellerId || null,
                }
              : item
          )
        : [
            ...existingCart,
            {
              id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              stock: product.stock,
              quantity: 1,
              sellerId: product.seller?._id || null,
            },
          ];

      localStorage.setItem(
        "alphabotMarketplaceCart",
        JSON.stringify(updatedCart)
      );

      alert("Product added to cart.");
    } catch (error) {
      console.error("ADD TO CART ERROR:", error);
      alert("Unable to add product to cart.");
    }
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

          {Number(product.discountPercent || 0) > 0 &&
            Number(product.originalPrice || 0) > Number(product.price || 0) ? (
              <div className="flex items-center gap-3 flex-wrap mt-3">
                <span className="text-sm text-zinc-500 line-through">
                  ₦{Number(product.originalPrice || 0).toLocaleString()}
                </span>

                <span className="text-2xl font-black">
                  ₦{Number(product.price || 0).toLocaleString()}
                </span>

                <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-black">
                  -{Math.round(Number(product.discountPercent))}%
                </span>
              </div>
            ) : (
              <p className="text-2xl font-black mt-3">
                ₦{Number(product.price || 0).toLocaleString()}
              </p>
            )}

          <div className="flex items-center gap-2 mt-2">
            {ratingSummary.ratingCount > 0 ? (
              <>
                <span className="text-yellow-500 text-sm">
                  {"★".repeat(Math.round(ratingSummary.averageRating))}
                  {"☆".repeat(
                    Math.max(
                      0,
                      5 - Math.round(ratingSummary.averageRating)
                    )
                  )}
                </span>

                <span className="text-sm font-black">
                  {ratingSummary.averageRating.toFixed(1)}
                </span>

                <span className="text-[10px] text-zinc-500">
                  ({ratingSummary.ratingCount}{" "}
                  {ratingSummary.ratingCount === 1 ? "rating" : "ratings"})
                </span>
              </>
            ) : (
              <span className="text-[10px] text-zinc-500">
                No ratings yet
              </span>
            )}
          </div>

          {Number.isInteger(Number(product.deliveryDays)) &&
            Number(product.deliveryDays) >= 1 && (
              <div className="mt-4 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4">
                <p className="text-[9px] font-black tracking-[0.16em] uppercase text-yellow-500">
                  DELIVERY
                </p>

                <p className="text-sm font-black mt-1">
                  🚚 {product.deliveryDays}{" "}
                  {Number(product.deliveryDays) === 1 ? "day" : "days"}
                </p>
              </div>
            )}

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
                {(product.seller?.storeName || product.sellerName || "A")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-sm font-black truncate">
                  {product.seller?.storeName ||
                    product.sellerName ||
                    "AlphaBot Seller"}
                </p>

                {product.seller?.status === "approved" && (
                  <p className="text-[10px] text-green-600 dark:text-green-400 font-bold mt-1">
                    ✓ Verified seller
                  </p>
                )}

                <p className="text-[10px] text-zinc-500 mt-1">
                  {followSummary.followerCount}{" "}
                  {followSummary.followerCount === 1
                    ? "follower"
                    : "followers"}
                </p>

              </div>

              {product.seller?._id && (
                <button
                  onClick={toggleFollow}
                  disabled={followLoading}
                  className={`shrink-0 px-3 py-2 rounded-xl text-[10px] font-black active:scale-95 transition ${
                    followSummary.isFollowing
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {followLoading
                    ? "..."
                    : followSummary.isFollowing
                    ? "♥ Following"
                    : "♡ Follow"}
                </button>
              )}

            </div>

            {product.seller?.description && (
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-5 mt-3">
                {product.seller.description}
              </p>
            )}

          </div>

        </section>


        {/* ACTIONS */}

        <section className="mt-6 grid grid-cols-[auto_1fr_1fr] gap-3">

          <MarketplaceWishlistButton
            productId={product?._id}
            className="h-12 w-12"
          />

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
