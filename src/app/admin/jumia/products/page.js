"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MARKETPLACE_CATEGORIES } from "@/lib/marketplaceCategories";

const API = "https://api.alphabothq.com";

export default function JumiaProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      const res = await fetch(`${API}/admin/jumia`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load Jumia products.");
      }

      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to load Jumia products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!category) return products;
    return products.filter((product) => product.category === category);
  }, [products, category]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Admin / Jumia Sourcing
            </p>
            <h1 className="text-2xl font-bold mt-1">🛒 Manage Products</h1>
          </div>

          <Link
            href="/admin/jumia"
            className="text-xs text-zinc-400 hover:text-white"
          >
            ← Add Product
          </Link>
        </div>

        <section className="border border-zinc-800 bg-[#111113] rounded-xl p-3 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <label className="text-[11px] text-zinc-500">
                Select category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-3 py-2.5 text-sm outline-none"
              >
                <option value="">All categories</option>

                {MARKETPLACE_CATEGORIES.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-zinc-500 sm:pt-5">
              {filteredProducts.length} product
              {filteredProducts.length === 1 ? "" : "s"}
            </div>
          </div>
        </section>

        {error && (
          <div className="border border-red-900/50 bg-red-950/20 text-red-400 rounded-lg px-3 py-2 text-xs mb-4">
            {error}
          </div>
        )}

        <section className="border border-zinc-800 bg-[#111113] rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm text-zinc-500">
              Loading Jumia products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-zinc-400">
                No Jumia products found.
              </p>

              <Link
                href="/admin/jumia"
                className="inline-block mt-3 text-xs text-white underline"
              >
                Import a product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-zinc-800 text-left text-[11px] uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-zinc-900 last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-3 min-w-[260px]">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-zinc-900"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-xs text-zinc-600">
                              —
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="font-medium truncate max-w-[320px]">
                              {product.name}
                            </p>

                            <p className="text-[11px] text-zinc-600 truncate max-w-[320px]">
                              {product.sourceUrl}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                        {product.category || "—"}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        ₦{Number(product.sellingPrice || 0).toLocaleString()}
                      </td>

                      <td className="px-4 py-3 text-zinc-400">
                        {Number(product.availableStock || 0).toLocaleString()}
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-[11px] px-2 py-1 rounded-full bg-zinc-900 text-zinc-400">
                          {product.status || "active"}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/jumia/products/${product._id}`}
                          className="inline-flex items-center rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium hover:bg-white hover:text-black"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
