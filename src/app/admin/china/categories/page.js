"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API_BASE = "https://api.alphabothq.com";

export default function AdminChinaCategoriesPage() {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchSort, setSearchSort] = useState("PRICE_ASC");
  const [searchLang, setSearchLang] = useState("en");

  useEffect(() => {
    setMounted(true);
    loadCategories();
  }, []);

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  const loadCategories = async () => {
    const token = getToken();

    if (!token) {
      setError("Admin session expired. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE}/admin/china/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load China categories."
        );
      }

      setCategories(data.categories || []);
    } catch (err) {
      console.error("ADMIN CHINA CATEGORIES ERROR:", err);
      setError(
        err.message || "Unable to load China categories."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadCategory = async (categoryId) => {
    const token = getToken();

    if (!token) {
      alert("Admin session expired. Please log in again.");
      return;
    }

    try {
      setSelectedId(categoryId);
      setDetailLoading(true);

      const response = await fetch(
        `${API_BASE}/admin/china/categories/${encodeURIComponent(categoryId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load category."
        );
      }

      const category = data.category || null;

      setSelectedCategory(category);

      setSearchQuery(category?.search?.query || "");
      setSearchSort(category?.search?.sort || "PRICE_ASC");
      setSearchLang(category?.search?.lang || "en");
    } catch (err) {
      console.error("ADMIN CHINA CATEGORY DETAIL ERROR:", err);
      alert(err.message || "Unable to load category.");
    } finally {
      setDetailLoading(false);
    }
  };

  const toggleCategory = async (category) => {
    const token = getToken();

    if (!token) {
      alert("Admin session expired. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/admin/china/categories/${encodeURIComponent(category._id)}/enabled`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enabled: !category.enabled,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update category."
        );
      }

      const updated = data.category || {
        ...category,
        enabled: !category.enabled,
      };

      setCategories((current) =>
        current.map((item) =>
          String(item._id) === String(category._id)
            ? updated
            : item
        )
      );

      if (
        selectedCategory &&
        String(selectedCategory._id) === String(category._id)
      ) {
        setSelectedCategory(updated);
      }
    } catch (err) {
      console.error("ADMIN CHINA CATEGORY TOGGLE ERROR:", err);
      alert(err.message || "Unable to update category.");
    }
  };

  const saveSearch = async () => {
    if (!selectedCategory) return;

    const token = getToken();

    if (!token) {
      alert("Admin session expired. Please log in again.");
      return;
    }

    if (!searchQuery.trim()) {
      alert("Enter an Elimapi search query first.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_BASE}/admin/china/categories/${encodeURIComponent(selectedCategory._id)}/search`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: searchQuery.trim(),
            sort: searchSort,
            lang: searchLang,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save search configuration."
        );
      }

      const updated = data.category || selectedCategory;

      setSelectedCategory(updated);

      setCategories((current) =>
        current.map((item) =>
          String(item._id) ===
          String(selectedCategory._id)
            ? updated
            : item
        )
      );

      alert("Search configuration saved.");
    } catch (err) {
      console.error(
        "ADMIN CHINA SEARCH CONFIG ERROR:",
        err
      );

      alert(
        err.message ||
          "Unable to save search configuration."
      );
    } finally {
      setSaving(false);
    }
  };

  const roots = useMemo(
    () =>
      categories
        .filter((category) => !category.parentId)
        .sort((a, b) =>
          String(a.nameEn).localeCompare(
            String(b.nameEn)
          )
        ),
    [categories]
  );

  const childrenOf = (parentId) =>
    categories
      .filter(
        (category) =>
          String(category.parentId) === String(parentId)
      )
      .sort((a, b) =>
        String(a.nameEn).localeCompare(
          String(b.nameEn)
        )
      );

  const enabledCount = categories.filter(
    (category) => category.enabled
  ).length;

  const leafCount = categories.filter(
    (category) => category.isLeaf
  ).length;

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <header className="mb-8">

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition"
          >
            ← ADMIN
          </Link>

          <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xl">
                  🇨🇳
                </div>

                <div>
                  <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-400">
                    CHINA MARKETPLACE
                  </p>

                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                    Catalog Control
                  </h1>
                </div>

              </div>

              <p className="text-sm text-zinc-500 mt-4 max-w-2xl">
                Control which China product categories
                AlphaBot imports from 1688.
              </p>

            </div>

            <div className="flex gap-3">

              <div className="rounded-2xl border border-zinc-800 bg-[#101012] px-5 py-4 min-w-[110px]">

                <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600">
                  Categories
                </p>

                <p className="text-2xl font-black mt-1">
                  {categories.length}
                </p>

              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#101012] px-5 py-4 min-w-[110px]">

                <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600">
                  Enabled
                </p>

                <p className="text-2xl font-black text-green-400 mt-1">
                  {enabledCount}
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* SYSTEM STATUS */}

        <section className="rounded-3xl border border-zinc-800 bg-[#101012] p-5 md:p-6 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-30" />
              </div>

              <div>

                <p className="text-xs font-black uppercase tracking-wider">
                  Catalog system active
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  {leafCount} leaf categories available
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <span className="px-4 py-2 rounded-xl bg-zinc-900 text-xs font-bold text-zinc-400">
                20 products / category
              </span>

              <span className="px-4 py-2 rounded-xl bg-zinc-900 text-xs font-bold text-zinc-400">
                Refresh: 48 hours
              </span>

              <span className="px-4 py-2 rounded-xl bg-green-500/10 text-xs font-bold text-green-400">
                Elimapi READY
              </span>

            </div>

          </div>

        </section>

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-[360px_1fr] gap-6">

          {/* CATEGORY TREE */}

          <section className="rounded-3xl border border-zinc-800 bg-[#101012] overflow-hidden">

            <div className="p-5 border-b border-zinc-800">

              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-zinc-600">
                CATEGORY TREE
              </p>

              <h2 className="text-lg font-black mt-1">
                Import controls
              </h2>

            </div>

            {loading ? (

              <div className="p-8 text-center text-sm text-zinc-600">
                Loading categories...
              </div>

            ) : roots.length === 0 ? (

              <div className="p-8 text-center">

                <div className="text-4xl">
                  🗂️
                </div>

                <p className="font-bold mt-3">
                  No categories yet
                </p>

                <p className="text-xs text-zinc-600 mt-2">
                  Category data will appear here once
                  the China catalog source is connected.
                </p>

              </div>

            ) : (

              <div className="p-3">

                {roots.map((root) => (

                  <div key={root._id} className="mb-3">

                    <button
                      type="button"
                      onClick={() => loadCategory(root._id)}
                      className={`w-full text-left rounded-2xl px-4 py-3 transition ${
                        String(selectedId) === String(root._id)
                          ? "bg-yellow-400 text-black"
                          : "hover:bg-zinc-900"
                      }`}
                    >

                      <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">

                          <p className="font-black text-sm truncate">
                            {root.nameEn || root.nameZh}
                          </p>

                          <p className={`text-[10px] mt-0.5 ${
                            String(selectedId) === String(root._id)
                              ? "text-black/60"
                              : "text-zinc-600"
                          }`}>
                            {root.nameZh}
                          </p>

                        </div>

                        <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${
                          root.enabled
                            ? "bg-green-400"
                            : "bg-zinc-600"
                        }`} />

                      </div>

                    </button>

                    {childrenOf(root._id).map((child) => (

                      <button
                        key={child._id}
                        type="button"
                        onClick={() => loadCategory(child._id)}
                        className={`ml-4 mt-1 w-[calc(100%-1rem)] text-left rounded-xl px-3 py-2.5 transition ${
                          String(selectedId) ===
                          String(child._id)
                            ? "bg-zinc-800"
                            : "hover:bg-zinc-900"
                        }`}
                      >

                        <div className="flex items-center justify-between gap-2">

                          <div className="min-w-0">

                            <p className="text-xs font-bold truncate">
                              {child.nameEn || child.nameZh}
                            </p>

                            <p className="text-[9px] text-zinc-600 mt-0.5 truncate">
                              {child.nameZh}
                            </p>

                          </div>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleCategory(child);
                            }}
                            className={`shrink-0 w-10 h-5 rounded-full p-0.5 transition ${
                              child.enabled
                                ? "bg-green-500"
                                : "bg-zinc-700"
                            }`}
                            aria-label={
                              child.enabled
                                ? "Disable category"
                                : "Enable category"
                            }
                          >
                            <span
                              className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                                child.enabled
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }`}
                            />
                          </button>

                        </div>

                      </button>

                    ))}

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* DETAILS PLACEHOLDER */}

          <section className="rounded-3xl border border-zinc-800 bg-[#101012] overflow-hidden min-h-[520px]">

            {!selectedCategory ? (

              <div className="min-h-[520px] flex items-center justify-center p-8 text-center">

                <div>

                  <div className="text-6xl">
                    🇨🇳
                  </div>

                  <h2 className="text-xl font-black mt-5">
                    Select a category
                  </h2>

                  <p className="text-sm text-zinc-600 max-w-md mt-2">
                    Choose a category from the tree to
                    configure its 1688 search and import
                    settings.
                  </p>

                </div>

              </div>

            ) : detailLoading ? (

              <div className="min-h-[520px] flex items-center justify-center text-sm text-zinc-600">
                Loading category...
              </div>

            ) : (

              <div>

                <div className="p-6 border-b border-zinc-800">

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                    <div>

                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-yellow-400">
                        CATEGORY
                      </p>

                      <h2 className="text-2xl font-black mt-1">
                        {selectedCategory.nameEn ||
                          selectedCategory.nameZh}
                      </h2>

                      <p className="text-sm text-zinc-500 mt-1">
                        {selectedCategory.nameZh}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toggleCategory(selectedCategory)
                      }
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
                        selectedCategory.enabled
                          ? "bg-green-500/10 text-green-400"
                          : "bg-zinc-900 text-zinc-500"
                      }`}
                    >

                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          selectedCategory.enabled
                            ? "bg-green-400"
                            : "bg-zinc-600"
                        }`}
                      />

                      <span className="text-xs font-black uppercase">
                        {selectedCategory.enabled
                          ? "Import enabled"
                          : "Import disabled"}
                      </span>

                    </button>

                  </div>

                </div>

                <div className="p-6 space-y-6">

                  <div className="grid sm:grid-cols-3 gap-3">

                    <div className="rounded-2xl bg-zinc-900 p-4">
                      <p className="text-[9px] uppercase tracking-wider text-zinc-600 font-black">
                        Level
                      </p>
                      <p className="text-lg font-black mt-1">
                        {selectedCategory.level}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-900 p-4">
                      <p className="text-[9px] uppercase tracking-wider text-zinc-600 font-black">
                        Products
                      </p>
                      <p className="text-lg font-black mt-1">
                        {selectedCategory.productsPerCategory || 20}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-900 p-4">
                      <p className="text-[9px] uppercase tracking-wider text-zinc-600 font-black">
                        Refresh
                      </p>
                      <p className="text-lg font-black mt-1">
                        {selectedCategory.refreshIntervalHours || 48}h
                      </p>
                    </div>

                  </div>

                  <div>

                    <div className="mb-4">

                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-600">
                        1688 SEARCH
                      </p>

                      <h3 className="text-lg font-black mt-1">
                        Product discovery
                      </h3>

                    </div>

                    <div className="space-y-4">

                      <div>

                        <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-black">
                          Search query
                        </label>

                        <input
                          value={searchQuery}
                          onChange={(event) =>
                            setSearchQuery(event.target.value)
                          }
                          placeholder="Example: phone accessories"
                          className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-yellow-400"
                        />

                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">

                        <div>

                          <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-black">
                            Sort
                          </label>

                          <select
                            value={searchSort}
                            onChange={(event) =>
                              setSearchSort(event.target.value)
                            }
                            className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-yellow-400"
                          >
                            <option value="PRICE_ASC">
                              Lowest price
                            </option>
                            <option value="PRICE_DESC">
                              Highest price
                            </option>
                            <option value="SALE_QTY_DESC">
                              Best selling
                            </option>
                            <option value="RETENTION_DESC">
                              Highest retention
                            </option>
                          </select>

                        </div>

                        <div>

                          <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-black">
                            Language
                          </label>

                          <select
                            value={searchLang}
                            onChange={(event) =>
                              setSearchLang(event.target.value)
                            }
                            className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-yellow-400"
                          >
                            <option value="en">English</option>
                            <option value="vi">Vietnamese</option>
                            <option value="ko">Korean</option>
                            <option value="ja">Japanese</option>
                            <option value="ru">Russian</option>
                          </select>

                        </div>

                      </div>

                      <div className="rounded-2xl bg-yellow-400/5 border border-yellow-400/10 p-4">

                        <p className="text-xs font-bold">
                          Import policy
                        </p>

                        <p className="text-xs text-zinc-500 mt-1">
                          AlphaBot will target{" "}
                          <span className="text-white font-bold">
                            20 products
                          </span>{" "}
                          for this category and refresh it
                          every{" "}
                          <span className="text-white font-bold">
                            48 hours
                          </span>
                          .
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={saveSearch}
                        disabled={saving}
                        className="w-full rounded-2xl bg-yellow-400 text-black py-3.5 font-black text-sm disabled:opacity-50 transition active:scale-[0.99]"
                      >
                        {saving
                          ? "SAVING..."
                          : "SAVE SEARCH CONFIGURATION"}
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </section>

        </div>

      </div>

    </main>
  );
}
