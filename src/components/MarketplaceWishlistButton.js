"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://api.alphabothq.com";

export default function MarketplaceWishlistButton({
  productId,
  initialWishlisted = false,
  className = "",
  onChange,
}) {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsWishlisted(initialWishlisted);
  }, [initialWishlisted]);

  const toggleWishlist = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productId || loading) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please sign in to save products to your wishlist.");
      return;
    }

    const next = !isWishlisted;
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/marketplace/wishlist/${encodeURIComponent(productId)}`,
        {
          method: next ? "POST" : "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to update wishlist");
      }

      setIsWishlisted(next);
      onChange?.(next);
    } catch (error) {
      console.error("WISHLIST ERROR:", error);
      alert(error.message || "Unable to update wishlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      disabled={loading}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center justify-center rounded-full backdrop-blur-sm transition active:scale-90 ${
        isWishlisted
          ? "bg-yellow-400 text-black"
          : "bg-black/55 text-white"
      } ${loading ? "opacity-60" : ""} ${className}`}
    >
      <span className="text-base leading-none">
        {isWishlisted ? "♥" : "♡"}
      </span>
    </button>
  );
}
