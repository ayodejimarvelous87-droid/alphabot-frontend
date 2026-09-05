"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import MarketplaceWishlistButton from "@/components/MarketplaceWishlistButton";
import {
  MARKETPLACE_CATEGORIES,
  getMarketplaceCategory,
} from "@/lib/marketplaceCategories";

const API_BASE = "https://api.alphabothq.com";

const categoryIcons = {
  "Phones & Tablets": "📱",
  Electronics: "🎧",
  "Home & Furniture": "🛋️",
  Fashion: "👕",
  "Beauty & Personal Care": "💄",
  "Commercial Equipment": "🏭",
  "Babies & Kids": "🧸",
  Food: "🍔",
  "Medical Supplies": "🩺",
  Groceries: "🛒",
};

const promoCards = [
  {
    id: "alphabot-shop",
    eyebrow: "ALPHABOT MARKETPLACE",
    title: "Discover products you actually want.",
    description:
      "Shop across trusted categories and find products from sellers on AlphaBot.",
    cta: "START SHOPPING",
    href: "#marketplace-categories",
    badge: "SHOP SMART",
  },
  {
    id: "alphabot-seller",
    eyebrow: "SELL ON ALPHABOT",
    title: "Turn your products into sales.",
    description:
      "Reach buyers across AlphaBot and grow your business from one marketplace.",
    cta: "BECOME A SELLER",
    href: "/marketplace/seller",
    badge: "GROW YOUR BUSINESS",
  },
];

function formatPrice(value) {
  const amount = Number(value || 0);

  return `₦${amount.toLocaleString("en-NG", {
    maximumFractionDigits: 0,
  })}`;
}

function ProductPrice({ product, className = "" }) {
  const discountPercent = Number(product?.discountPercent || 0);
  const hasDiscount =
    discountPercent > 0 &&
    Number(product?.originalPrice || 0) > Number(product?.price || 0);

  if (!hasDiscount) {
    return (
      <p className={`text-sm font-black mt-2 ${className}`}>
        {formatPrice(product?.price)}
      </p>
    );
  }

  return (
    <div className={`mt-2 ${className}`}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] text-zinc-500 line-through">
          {formatPrice(product.originalPrice)}
        </span>

        <span className="text-sm font-black">
          {formatPrice(product.price)}
        </span>

        <span className="px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 text-[8px] font-black">
          -{Math.round(discountPercent)}%
        </span>
      </div>
    </div>
  );
}

function getProductImage(product) {
  return (
    product?.image ||
    product?.images?.[0] ||
    product?.imageUrl ||
    "/placeholder-product.png"
  );
}

function getProductRating(product) {
  const average = Number(product?.ratingAverage || 0);
  const count = Number(product?.ratingCount || 0);

  return {
    average,
    count,
  };
}

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [backendProducts, setBackendProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [wishlistProductIds, setWishlistProductIds] = useState(new Set());

  const [mounted, setMounted] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showMarketplaceDashboard, setShowMarketplaceDashboard] =
    useState(false);

  const [draftFilters, setDraftFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  const [marketplaceLocations, setMarketplaceLocations] = useState([]);
  const [showLocations, setShowLocations] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [locationsLoading, setLocationsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadMarketplace = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const response = await fetch(
              `${API_BASE}/marketplace/wishlist`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.ok) {
              const data = await response.json().catch(() => ({}));

              setWishlistProductIds(
                new Set(
                  Array.isArray(data.products)
                    ? data.products
                        .map((item) => item.product?._id)
                        .filter(Boolean)
                    : []
                )
              );
            }
          } catch (error) {
            console.error("MARKETPLACE WISHLIST LOAD ERROR:", error);
          }
        } else {
          setWishlistProductIds(new Set());
        }

        const requests = [
          fetch(`${API_BASE}/marketplace`),
          fetch(`${API_BASE}/marketplace?sort=popular`),
          fetch(`${API_BASE}/marketplace?sort=top-rated`),
        ];

        if (token) {
          requests.push(
            fetch(`${API_BASE}/marketplace/views/recently-viewed`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              cache: "no-store",
            })
          );
        }

        const responses = await Promise.all(requests);
        const results = await Promise.all(
          responses.map((response) => response.json())
        );

        const [allResult, popularResult, topRatedResult, recentResult] =
          results;

        if (allResult.success) {
          setBackendProducts(allResult.products || []);
        }

        if (popularResult.success) {
          setPopularProducts(popularResult.products || []);
        }

        if (topRatedResult.success) {
          setTopRatedProducts(topRatedResult.products || []);
        }

        if (recentResult?.success) {
          setRecentlyViewedProducts(recentResult.products || []);
        }
      } catch (error) {
        console.error("Marketplace products error:", error);
      }
    };

    loadMarketplace();
  }, []);

  useEffect(() => {
    setLocationsLoading(true);

    fetch(`${API_BASE}/marketplace/locations`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMarketplaceLocations(data.locations || []);
        }
      })
      .catch((error) => {
        console.error("Marketplace locations error:", error);
      })
      .finally(() => {
        setLocationsLoading(false);
      });
  }, []);

  const categories = MARKETPLACE_CATEGORIES.map((category) => ({
    ...category,
    icon: categoryIcons[category.name] || "📦",
  }));

  const activeCategory =
    selectedCategory === "All"
      ? null
      : getMarketplaceCategory(selectedCategory);

  const updateDraftFilter = (name, value) => {
    setDraftFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setDraftFilters({});
    setAppliedFilters({});
    setLocationSearch("");
    setShowLocations(false);
  };

  const matchesProduct = (product) => {
    const productName = String(product?.name || "");

    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchesCategory =
      selectedCategory === "All" ||
      product?.category === selectedCategory;

    const matchesFilters = Object.entries(appliedFilters).every(
      ([filterName, filterValue]) => {
        if (!filterValue) {
          return true;
        }

        if (filterName === "Location") {
          return (
            String(product?.location?.state || "").toLowerCase() ===
            String(filterValue).toLowerCase()
          );
        }

        const productValue =
          product?.attributes?.[filterName] ??
          product?.[filterName] ??
          product?.[filterName.toLowerCase().replace(/\s+/g, "")];

        if (filterName === "Price" && typeof product?.price === "number") {
          const [min, max] = String(filterValue).split("-").map(Number);

          if (!Number.isNaN(min) && product.price < min) {
            return false;
          }

          if (
            !Number.isNaN(max) &&
            max > 0 &&
            product.price > max
          ) {
            return false;
          }

          return true;
        }

        if (productValue === undefined || productValue === null) {
          return false;
        }

        return String(productValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      }
    );

    return matchesSearch && matchesCategory && matchesFilters;
  };

  const filteredProducts = useMemo(
    () => backendProducts.filter(matchesProduct),
    [backendProducts, search, selectedCategory, appliedFilters]
  );

  const filteredPopularProducts = useMemo(
    () => popularProducts.filter(matchesProduct),
    [popularProducts, search, selectedCategory, appliedFilters]
  );

  const filteredTopRatedProducts = useMemo(
    () => topRatedProducts.filter(matchesProduct),
    [topRatedProducts, search, selectedCategory, appliedFilters]
  );

  const filteredRecentlyViewedProducts = useMemo(
    () =>
      recentlyViewedProducts
        .filter(matchesProduct)
        .slice(0, 6),
    [
      recentlyViewedProducts,
      search,
      selectedCategory,
      appliedFilters,
    ]
  );

  const filteredLocations = marketplaceLocations.filter((location) =>
    String(location?.state || "")
      .toLowerCase()
      .includes(locationSearch.toLowerCase().trim())
  );

  const selectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setDraftFilters({});
    setAppliedFilters({});
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-28">
      <style jsx>{`
        @keyframes marketplaceFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(3deg);
          }
        }

        @keyframes marketplaceSlide {
          0% {
            transform: translateX(-8%);
          }
          50% {
            transform: translateX(8%);
          }
          100% {
            transform: translateX(-8%);
          }
        }

        .marketplace-float {
          animation: marketplaceFloat 4s ease-in-out infinite;
        }

        .marketplace-slide {
          animation: marketplaceSlide 7s ease-in-out infinite;
        }
      `}</style>

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              aria-label="Go to AlphaBot Home"
              className="w-10 h-10 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-lg active:scale-95 transition"
            >
              🏠
            </Link>
            <div className="text-center">
              <p className="text-[8px] font-black tracking-[0.2em] text-yellow-500">ALPHABOT</p>
              <h1 className="text-lg font-black">Marketplace</h1>
            </div>
            <Link href="/marketplace/cart" className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center">
              🛒
            </Link>
          </div>

          <div className="mt-3 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full h-11 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 pl-10 pr-4 text-xs outline-none focus:border-yellow-400"
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4">

        <section className="mt-4">
          <button
            onClick={() => setShowMarketplaceDashboard((v) => !v)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800"
          >
            <span className="text-xs font-black">◎ Marketplace Dashboard</span>
            <span>{showMarketplaceDashboard ? "⌃" : "⌄"}</span>
          </button>

          {showMarketplaceDashboard && (
            <div className="grid grid-cols-1 gap-2 mt-2">
              <Link href="/marketplace/cart" className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-[10px] font-black">
                🛒 My Cart
              </Link>
              <Link href="/marketplace/orders" className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-[10px] font-black">
                📦 My Orders
              </Link>
              <Link href="/marketplace/wishlist" className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-[10px] font-black">
                ❤️ Wishlist
              </Link>
              <button
                onClick={() => {
                  document.getElementById("marketplace-categories")?.scrollIntoView({ behavior: "smooth" });
                  setShowMarketplaceDashboard(false);
                }}
                className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-left text-[10px] font-black"
              >
                🛍️ Categories
              </button>
              <button
                onClick={() => {
                  setShowFilters(true);
                  setShowMarketplaceDashboard(false);
                }}
                className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-left text-[10px] font-black"
              >
                ⚙️ Filters
              </button>
              <Link href="/marketplace/seller" className="p-3 rounded-xl bg-yellow-400 text-black text-[10px] font-black">
                🏪 Sell on AlphaBot
              </Link>
              <Link href="/notifications" className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-[10px] font-black">
                🔔 Notifications
              </Link>
              <Link href="/marketplace/faq" className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-[10px] font-black">
                ❓ FAQ
              </Link>
              <Link href="/marketplace/help" className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-[10px] font-black">
                🆘 Help & Support
              </Link>
            </div>
          )}
        </section>

        <section className="mt-4">
          <Link href="/marketplace/seller" className="flex items-center justify-between p-4 rounded-2xl bg-yellow-400 text-black">
            <div>
              <p className="text-[9px] font-black uppercase">Business opportunity</p>
              <h2 className="text-base font-black mt-1">BECOME A SELLER</h2>
              <p className="text-[10px] mt-1 opacity-70">List your products and reach AlphaBot buyers.</p>
            </div>
            <span className="w-11 h-11 rounded-2xl bg-black text-yellow-400 flex items-center justify-center font-black">→</span>
          </Link>
        </section>

        <section className="mt-5">
          <div className="flex justify-between mb-3">
            <div>
              <p className="text-[9px] font-black tracking-[0.18em] text-yellow-500">ALPHABOT PROMOTIONS</p>
              <h2 className="text-lg font-black">What’s happening</h2>
            </div>
            <span className="text-[9px] text-zinc-500">Swipe →</span>
          </div>

          <div className="flex gap-3 overflow-x-auto snap-x scrollbar-hide pb-2">
            {promoCards.map((promo) => (
              <Link
                href={promo.href}
                key={promo.id}
                className="relative min-w-[88%] snap-start overflow-hidden rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-black p-5"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-[18px] border-yellow-400/30 marketplace-float" />

                <p className="text-[9px] font-black tracking-[0.18em] text-yellow-400 dark:text-yellow-600">
                  {promo.eyebrow}
                </p>

                <h2 className="relative mt-6 text-2xl font-black leading-tight max-w-[280px]">
                  {promo.title}
                </h2>

                <p className="relative mt-3 text-xs opacity-70 max-w-[290px]">
                  {promo.description}
                </p>

                <div className="relative mt-6 inline-flex px-4 py-2.5 rounded-xl bg-yellow-400 text-black text-[9px] font-black">
                  {promo.cta} →
                </div>

                <div className="absolute right-6 bottom-5 text-5xl font-black text-yellow-400/20 marketplace-slide">
                  {promo.id.includes("seller") ? "SELL" : "SHOP"}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="w-full flex justify-between p-4 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-xs font-black"
          >
            <span>⚙️ Filters & Location</span>
            <span>{showFilters ? "⌃" : "⌄"}</span>
          </button>

          {showFilters && (
            <div className="mt-2 p-4 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800">

              <label className="text-[10px] font-black uppercase">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setDraftFilters({});
                }}
                className="mt-2 w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-xs"
              >
                <option value="All">All categories</option>
                {categories.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>

              <div className="mt-4">
                <label className="text-[10px] font-black uppercase">Location</label>
                <input
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Search state..."
                  className="mt-2 w-full h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-xs"
                />

                <div className="mt-2 max-h-40 overflow-y-auto space-y-2">
                  {filteredLocations.map((location) => (
                    <button
                      key={location.state}
                      onClick={() => {
                        updateDraftFilter("Location", location.state);
                        setLocationSearch(location.state);
                      }}
                      className={`w-full flex justify-between p-3 rounded-xl text-left border ${
                        draftFilters.Location === location.state
                          ? "bg-yellow-400 border-yellow-400 text-black"
                          : "bg-zinc-50 dark:bg-zinc-900 border-transparent"
                      }`}
                    >
                      <span className="text-xs font-bold">{location.state}</span>
                      <span className="text-[9px] text-zinc-500">{location.count} products</span>
                    </button>
                  ))}
                </div>
              </div>

              {activeCategory?.filters?.map((filterName) =>
                filterName === "Price" ? (
                  <div key={filterName} className="mt-4">
                    <label className="text-[10px] font-black uppercase">Price range</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input
                        type="number"
                        placeholder="Minimum"
                        value={draftFilters.Price?.split("-")[0] || ""}
                        onChange={(e) => updateDraftFilter("Price", `${e.target.value}-${draftFilters.Price?.split("-")[1] || ""}`)}
                        className="h-10 rounded-xl border px-3 text-xs bg-zinc-50 dark:bg-zinc-900"
                      />
                      <input
                        type="number"
                        placeholder="Maximum"
                        value={draftFilters.Price?.split("-")[1] || ""}
                        onChange={(e) => updateDraftFilter("Price", `${draftFilters.Price?.split("-")[0] || ""}-${e.target.value}`)}
                        className="h-10 rounded-xl border px-3 text-xs bg-zinc-50 dark:bg-zinc-900"
                      />
                    </div>
                  </div>
                ) : (
                  <input
                    key={filterName}
                    value={draftFilters[filterName] || ""}
                    onChange={(e) => updateDraftFilter(filterName, e.target.value)}
                    placeholder={filterName}
                    className="mt-3 w-full h-10 rounded-xl border px-3 text-xs bg-zinc-50 dark:bg-zinc-900"
                  />
                )
              )}

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button onClick={clearFilters} className="h-10 rounded-xl border text-xs font-black">CLEAR</button>
                <button onClick={applyFilters} className="h-10 rounded-xl bg-yellow-400 text-black text-xs font-black">APPLY</button>
              </div>

            </div>
          )}
        </section>

        <section id="marketplace-categories" className="mt-7">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-[9px] font-black tracking-[0.16em] text-yellow-500">SHOP BY</p>
              <h2 className="text-lg font-black">Categories</h2>
            </div>
            <button
              onClick={() => setShowAllCategories((v) => !v)}
              className="text-[10px] font-black text-yellow-600"
            >
              {showAllCategories ? "Show less" : "View all"}
            </button>
          </div>

          <div className={showAllCategories ? "grid grid-cols-3 gap-3" : "flex gap-3 overflow-x-auto scrollbar-hide"}>
            <button
              onClick={() => selectCategory("All")}
              className={`min-w-[82px] rounded-2xl border p-3 ${
                selectedCategory === "All"
                  ? "bg-yellow-400 border-yellow-400 text-black"
                  : "bg-white dark:bg-[#151515] border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <div>🛍️</div>
              <p className="text-[10px] font-bold mt-2">All</p>
            </button>

            {(showAllCategories ? categories : categories.slice(0, 6)).map((category) => (
              <button
                key={category.name}
                onClick={() => selectCategory(category.name)}
                className={`min-w-[82px] rounded-2xl border p-3 ${
                  selectedCategory === category.name
                    ? "bg-yellow-400 border-yellow-400 text-black"
                    : "bg-white dark:bg-[#151515] border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <div className="text-xl">{category.icon}</div>
                <p className="text-[10px] font-bold mt-2 leading-tight">{category.name}</p>
              </button>
            ))}
          </div>
        </section>

        {filteredRecentlyViewedProducts.length > 0 && (
          <section className="mt-7">
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-[9px] font-black tracking-[0.18em] text-yellow-500">YOUR ACTIVITY</p>
                <h2 className="text-lg font-black">Recently Viewed</h2>
              </div>
              <span className="text-[9px] text-zinc-500">Swipe →</span>
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {filteredRecentlyViewedProducts.map((product) => (
                <Link
                  href={`/marketplace/product/${product._id}`}
                  key={`recent-${product._id}`}
                  className="min-w-[165px] rounded-2xl overflow-hidden bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800"
                >
                  <img src={getProductImage(product)} alt={product.name} className="w-full h-32 object-cover" />
          <div className="absolute top-2 right-2">
            <MarketplaceWishlistButton
              productId={product._id}
              initialWishlisted={wishlistProductIds.has(product._id)}
              className="w-9 h-9"
              onChange={(next) => {
                setWishlistProductIds((current) => {
                  const updated = new Set(current);
                  if (next) updated.add(product._id);
                  else updated.delete(product._id);
                  return updated;
                });
              }}
            />
          </div>
                  <div className="p-3">
                    <p className="text-xs font-bold truncate">{product.name}</p>
                    <ProductPrice product={product} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {filteredPopularProducts.length > 0 && (
          <section className="mt-7">
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-[9px] font-black tracking-[0.18em] text-yellow-500">TRENDING</p>
                <h2 className="text-lg font-black">🔥 Popular</h2>
              </div>
              <span className="text-[9px] text-zinc-500">Most viewed</span>
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {filteredPopularProducts.map((product) => {
                const rating = getProductRating(product);

                return (
                  <Link
                    href={`/marketplace/product/${product._id}`}
                    key={`popular-${product._id}`}
                    className="min-w-[175px] rounded-2xl overflow-hidden bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="relative">
                      <img src={getProductImage(product)} alt={product.name} className="w-full h-32 object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-yellow-400 text-black text-[8px] font-black">
                        POPULAR
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold truncate">{product.name}</p>
                      <ProductPrice product={product} />
                      <p className="text-[9px] text-zinc-500 mt-1">
                        {rating.count > 0 ? `★ ${rating.average.toFixed(1)} (${rating.count})` : "No ratings yet"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {filteredTopRatedProducts.length > 0 && (
          <section className="mt-7">
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-[9px] font-black tracking-[0.18em] text-yellow-500">CUSTOMER FAVOURITES</p>
                <h2 className="text-lg font-black">⭐ Top Rated</h2>
              </div>
              <span className="text-[9px] text-zinc-500">Highest rated</span>
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {filteredTopRatedProducts.map((product) => {
                const rating = getProductRating(product);

                return (
                  <Link
                    href={`/marketplace/product/${product._id}`}
                    key={`rated-${product._id}`}
                    className="min-w-[175px] rounded-2xl overflow-hidden bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="relative">
                      <img src={getProductImage(product)} alt={product.name} className="w-full h-32 object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-white/90 dark:bg-black/80 text-[8px] font-black">
                        ⭐ {rating.average.toFixed(1)}
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold truncate">{product.name}</p>
                      <ProductPrice product={product} />
                      <p className="text-[9px] text-zinc-500 mt-1">
                        {rating.count} {rating.count === 1 ? "rating" : "ratings"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-[9px] font-black tracking-[0.18em] text-yellow-500">SHOP THE MARKETPLACE</p>
              <h2 className="text-xl font-black">All Categories</h2>
            </div>
            <span className="text-[9px] text-zinc-500">
              {filteredProducts.length} products
            </span>
          </div>

          {categories.map((category) => {
            const products = filteredProducts.filter(
              (product) => product.category === category.name
            );

            return (
              <section key={category.name} id={`category-${category.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`} className="mt-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <p className="text-[9px] font-black tracking-wide text-yellow-500 uppercase">
                      Category
                    </p>
                    <h3 className="text-base font-black">{category.name}</h3>
                  </div>
                </div>

                {products.length === 0 ? (
                  <div className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-6 text-center">
                    <p className="text-2xl">📦</p>
                    <p className="text-xs font-bold mt-2">No products here yet</p>
                    <p className="text-[9px] text-zinc-500 mt-1">
                      New products will appear in this category.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {products.map((product) => {
                      const rating = getProductRating(product);

                      return (
                        <Link
                          href={`/marketplace/product/${product._id}`}
                          key={`${category.name}-${product._id}`}
                          className="group rounded-2xl overflow-hidden bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 active:scale-[0.98] transition"
                        >
                          <div className="relative h-40 bg-zinc-100 dark:bg-zinc-900">
                            <img
                              src={getProductImage(product)}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-white/90 dark:bg-black/80 text-[7px] font-black">
                              {category.name}
                            </span>
                          </div>

                          <div className="p-3">
                            <h4 className="text-xs font-bold leading-4 line-clamp-2 min-h-[32px]">
                              {product.name}
                            </h4>

                            <ProductPrice product={product} />

                            <p className="text-[9px] text-zinc-500 mt-1">
                              {rating.count > 0
                                ? `★ ${rating.average.toFixed(1)} · ${rating.count}`
                                : "No ratings yet"}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </section>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-4xl">🔎</div>
            <h3 className="font-black mt-3">No products found</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Try changing your search or filters.
            </p>
          </div>
        )}

      </div>

      <BottomNav />

    </main>
  );
}
