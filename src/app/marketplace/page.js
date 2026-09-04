"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CATEGORY_NAMES,
  getMarketplaceCategory,
} from "@/lib/marketplaceCategories";

export default function Marketplace() {

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [backendProducts, setBackendProducts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showMarketplaceDashboard, setShowMarketplaceDashboard] = useState(false);
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

  useEffect(() => {
    setLocationsLoading(true);

    fetch("https://api.alphabothq.com/marketplace/locations")
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

  const categoryIcons = {
    "Vehicles": "🚗",
    "Property": "🏠",
    "Phones & Tablets": "📱",
    "Electronics": "🎧",
    "Home & Furniture": "🛋️",
    "Fashion": "👕",
    "Beauty & Personal Care": "💄",
    "Services": "🛠️",
    "Repair": "🔧",
    "Commercial Equipment": "🏭",
    "Leisure & Activities": "🎯",
    "Babies & Kids": "🧸",
    "Food": "🍔",
    "Animals & Pets": "🐕",
    "Jobs": "💼",
  };

  const categories = MARKETPLACE_CATEGORIES.map((category) => ({
    ...category,
    icon: categoryIcons[category.name] || "📦",
  }));

  const allProducts = backendProducts;

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

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesFilters = Object.entries(appliedFilters).every(
      ([filterName, filterValue]) => {
        if (!filterValue) return true;

        if (filterName === "Location") {
          return (
            String(product.location?.state || "").toLowerCase() ===
            String(filterValue).toLowerCase()
          );
        }

        const productValue =
          product.attributes?.[filterName] ??
          product[filterName] ??
          product[filterName.toLowerCase().replace(/\s+/g, "")];

        if (
          filterName === "Price" &&
          typeof product.price === "number"
        ) {
          const [min, max] = String(filterValue)
            .split("-")
            .map(Number);

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


        {/* MARKETPLACE DASHBOARD */}

        <section className="mt-4">

          <button
            type="button"
            onClick={() =>
              setShowMarketplaceDashboard((current) => !current)
            }
            className="w-full flex items-center justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] px-4 py-3 active:scale-[0.99] transition"
          >

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black flex items-center justify-center text-lg">
                ☰
              </div>

              <div className="text-left">
                <p className="text-xs font-black">
                  Marketplace Dashboard
                </p>

                <p className="text-[9px] text-zinc-500 dark:text-zinc-400">
                  Quick access to marketplace features
                </p>
              </div>

            </div>

            <span
              className={`text-sm transition-transform ${
                showMarketplaceDashboard ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>

          </button>

          {showMarketplaceDashboard && (

            <div className="mt-3 grid grid-cols-2 gap-2">

              <Link
                href="/marketplace/cart"
                className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-3 active:scale-[0.98] transition"
              >
                <div className="text-lg">🛒</div>
                <p className="text-[10px] font-black mt-2">My Cart</p>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setShowMarketplaceDashboard(false);
                  document.getElementById("marketplace-categories")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="text-left rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-3 active:scale-[0.98] transition"
              >
                <div className="text-lg">🏷️</div>
                <p className="text-[10px] font-black mt-2">Categories</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMarketplaceDashboard(false);
                  setShowFilters(true);
                  setTimeout(() => {
                    document.getElementById("marketplace-filters")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 50);
                }}
                className="text-left rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-3 active:scale-[0.98] transition"
              >
                <div className="text-lg">⚙️</div>
                <p className="text-[10px] font-black mt-2">Filters</p>
              </button>

              <Link
                href="/marketplace/seller"
                className="rounded-2xl bg-yellow-400 text-black p-3 active:scale-[0.98] transition"
              >
                <div className="text-lg">🏪</div>
                <p className="text-[10px] font-black mt-2">Sell on AlphaBot</p>
              </Link>

              <Link
                href="/notifications"
                className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-3 active:scale-[0.98] transition"
              >
                <div className="text-lg">🔔</div>
                <p className="text-[10px] font-black mt-2">Notifications</p>
              </Link>

              <Link
                href="/marketplace/faq"
                className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-3 active:scale-[0.98] transition"
              >
                <div className="text-lg">❓</div>
                <p className="text-[10px] font-black mt-2">FAQ</p>
              </Link>

              <Link
                href="/marketplace/help"
                className="col-span-2 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-3 active:scale-[0.98] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="text-lg">🆘</div>
                  <div>
                    <p className="text-[10px] font-black">
                      Help & Support
                    </p>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Get assistance with your marketplace activity
                    </p>
                  </div>
                </div>
              </Link>

            </div>

          )}

        </section>


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

              <Link
                href="#featured-deals"
                className="inline-flex mt-4 bg-yellow-400 text-black px-4 py-2.5 rounded-xl text-xs font-black active:scale-95 transition"
              >
                Explore deals →
              </Link>

            </div>

          </div>

        </section>


        {/* FILTERS */}

        <section id="marketplace-filters" className="mt-5">

          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            className="w-full flex items-center justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] px-4 py-3 active:scale-[0.99] transition"
          >

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black flex items-center justify-center">
                ⚙️
              </div>

              <div className="text-left">

                <p className="text-xs font-black">
                  Filters
                </p>

                <p className="text-[9px] text-zinc-500 dark:text-zinc-400">
                  Narrow down products
                </p>

              </div>

            </div>

            <span
              className={`text-sm transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>

          </button>


          {showFilters && (

            <div className="mt-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] p-4">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[9px] font-black tracking-[0.16em] uppercase text-yellow-500">
                    FILTER PRODUCTS
                  </p>

                  <h3 className="text-sm font-black mt-1">
                    Find exactly what you want
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[9px] font-black text-red-500"
                >
                  CLEAR
                </button>

              </div>


              {/* CATEGORY */}

              <div className="mt-5">

                <label className="text-[10px] font-black uppercase tracking-wide">
                  Category
                </label>

                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    const category = e.target.value;
                    setSelectedCategory(category);
                    setDraftFilters({});
                    setAppliedFilters({});
                  }}
                  className="mt-2 w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-xs outline-none focus:border-yellow-400"
                >

                  <option value="All">
                    All categories
                  </option>

                  {MARKETPLACE_CATEGORY_NAMES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}

                </select>

              </div>


              {/* LOCATION */}

              <div className="mt-5">

                <label className="text-[10px] font-black uppercase tracking-wide">
                  Location
                </label>

                <button
                  type="button"
                  onClick={() => setShowLocations((current) => !current)}
                  className="mt-2 w-full min-h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-3 text-left text-xs outline-none focus:border-yellow-400 flex items-center justify-between gap-3"
                >

                  <div className="flex items-center gap-3 min-w-0">

                    <span className="text-base">
                      📍
                    </span>

                    <div className="min-w-0">

                      <p className="font-bold truncate">
                        {draftFilters.Location || "Choose a location"}
                      </p>

                      <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {draftFilters.Location
                          ? "Products available in this state"
                          : "Browse products by state"}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`transition-transform ${
                      showLocations ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>

                </button>

                {showLocations && (

                  <div className="mt-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3">

                    <input
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      placeholder="Search states..."
                      className="w-full h-10 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-3 text-xs outline-none focus:border-yellow-400"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        updateDraftFilter("Location", "");
                        setLocationSearch("");
                        setShowLocations(false);
                      }}
                      className="mt-3 w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-left"
                    >

                      <span className="text-xs font-black">
                        All locations
                      </span>

                      <span className="text-[9px] text-zinc-500">
                        All
                      </span>

                    </button>

                    <div className="mt-2 max-h-72 overflow-y-auto space-y-1">

                      {locationsLoading ? (

                        <div className="py-6 text-center text-[10px] text-zinc-500">
                          Loading locations...
                        </div>

                      ) : (

                        marketplaceLocations
                          .filter((location) =>
                            location.state
                              .toLowerCase()
                              .includes(locationSearch.toLowerCase())
                          )
                          .map((location) => (

                            <button
                              key={location.state}
                              type="button"
                              onClick={() => {
                                updateDraftFilter(
                                  "Location",
                                  location.state
                                );
                                setLocationSearch("");
                                setShowLocations(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition ${
                                draftFilters.Location === location.state
                                  ? "bg-yellow-400 text-black"
                                  : "bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800"
                              }`}
                            >

                              <span className="text-xs font-bold">
                                {location.state}
                              </span>

                              <span
                                className={`text-[9px] font-black ${
                                  draftFilters.Location === location.state
                                    ? "text-black"
                                    : "text-zinc-500 dark:text-zinc-400"
                                }`}
                              >
                                {location.count}{" "}
                                {location.count === 1 ? "product" : "products"}
                              </span>

                            </button>

                          ))

                      )}

                    </div>

                  </div>

                )}

              </div>


              {/* CATEGORY-SPECIFIC FILTERS */}

              {activeCategory && activeCategory.filters?.length > 0 && (

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {activeCategory.filters.map((filterName) => {

                    if (filterName === "Price") {
                      return (
                        <div key={filterName} className="sm:col-span-2">

                          <label className="text-[10px] font-black uppercase tracking-wide">
                            Price range
                          </label>

                          <div className="grid grid-cols-2 gap-2 mt-2">

                            <input
                              type="number"
                              min="0"
                              placeholder="Minimum"
                              value={
                                draftFilters.Price?.split("-")[0] || ""
                              }
                              onChange={(e) => {
                                const max =
                                  draftFilters.Price?.split("-")[1] || "";

                                updateDraftFilter(
                                  "Price",
                                  `${e.target.value}-${max}`
                                );
                              }}
                              className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-xs outline-none focus:border-yellow-400"
                            />

                            <input
                              type="number"
                              min="0"
                              placeholder="Maximum"
                              value={
                                draftFilters.Price?.split("-")[1] || ""
                              }
                              onChange={(e) => {
                                const min =
                                  draftFilters.Price?.split("-")[0] || "";

                                updateDraftFilter(
                                  "Price",
                                  `${min}-${e.target.value}`
                                );
                              }}
                              className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-xs outline-none focus:border-yellow-400"
                            />

                          </div>

                        </div>
                      );
                    }

                    return (
                      <div key={filterName}>

                        <label className="text-[10px] font-black uppercase tracking-wide">
                          {filterName}
                        </label>

                        <input
                          value={draftFilters[filterName] || ""}
                          onChange={(e) =>
                            updateDraftFilter(
                              filterName,
                              e.target.value
                            )
                          }
                          placeholder={`Enter ${filterName.toLowerCase()}`}
                          className="mt-2 w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 text-xs outline-none focus:border-yellow-400"
                        />

                      </div>
                    );
                  })}

                </div>

              )}


              {selectedCategory === "All" && (

                <div className="mt-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3">

                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    Select a category to see filters specific to that type of product.
                  </p>

                </div>

              )}


              <button
                type="button"
                onClick={applyFilters}
                className="mt-5 w-full h-11 rounded-xl bg-yellow-400 text-black text-xs font-black active:scale-[0.98] transition"
              >
                APPLY FILTERS
              </button>

            </div>

          )}

        </section>


        {/* CATEGORIES */}

        <section id="marketplace-categories" className="mt-6">

          <div className="flex items-center justify-between mb-3">

            <div>
              <p className="text-[9px] font-black tracking-[0.16em] uppercase text-yellow-500">
                SHOP BY
              </p>

              <h2 className="text-sm font-black">
                Categories
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowAllCategories((current) => !current)
              }
              className="text-[10px] font-black text-yellow-600 dark:text-yellow-400"
            >
              {showAllCategories ? "Show less" : "View all"}
            </button>

          </div>


          {showAllCategories ? (

            <div className="grid grid-cols-3 gap-3">

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setDraftFilters({});
                  setAppliedFilters({});
                }}
                className={`rounded-2xl border p-3 active:scale-95 transition ${
                  selectedCategory === "All"
                    ? "bg-yellow-400 border-yellow-400 text-black"
                    : "bg-white dark:bg-[#151515] border-zinc-200 dark:border-zinc-800"
                }`}
              >

                <div className="text-xl">
                  🛍️
                </div>

                <p className="text-[10px] font-bold mt-2">
                  All
                </p>

              </button>


              {categories.map((category) => (

                <button
                  type="button"
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setDraftFilters({});
                    setAppliedFilters({});
                  }}
                  className={`rounded-2xl border p-3 active:scale-95 transition ${
                    selectedCategory === category.name
                      ? "bg-yellow-400 border-yellow-400 text-black"
                      : "bg-white dark:bg-[#151515] border-zinc-200 dark:border-zinc-800"
                  }`}
                >

                  <div className="text-xl">
                    {category.icon}
                  </div>

                  <p className="text-[10px] font-bold mt-2 leading-tight">
                    {category.name}
                  </p>

                </button>

              ))}

            </div>

          ) : (

            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setDraftFilters({});
                  setAppliedFilters({});
                }}
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


              {categories.slice(0, 6).map((category) => (

                <button
                  type="button"
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setDraftFilters({});
                    setAppliedFilters({});
                  }}
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

          )}

        </section>


        {/* FEATURED DEALS */}

        <section id="featured-deals" className="mt-7">

          <div className="flex items-center justify-between mb-3">

            <div>
              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
                LIMITED OFFERS
              </p>

              <h2 className="text-lg font-black">
                🔥 Featured deals
              </h2>
            </div>

            <Link
              href="#popular-products"
              className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400"
            >
              See all
            </Link>

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

        <section id="popular-products" className="mt-7">

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

          <Link
            href="/marketplace/seller"
            className="block active:scale-[0.99] transition-transform"
          >

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

          </Link>

        </section>





      </div>


      <BottomNav />

    </main>
  );
}
