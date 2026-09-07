"use client";

import { useMemo, useState } from "react";

const API = "https://api.alphabothq.com";

const SHIPBUBBLE_CATEGORIES = [
  { id: 24032950, name: "Dry food and supplements" },
  { id: 77179563, name: "Electronics and gadgets" },
  { id: 2178251, name: "Groceries" },
  { id: 20754594, name: "Light weight items" },
  { id: 67008831, name: "Machinery" },
  { id: 57487393, name: "Medical supplies" },
  { id: 99652979, name: "Health and beauty" },
  { id: 25590994, name: "Furniture and fittings" },
  { id: 74794423, name: "Fashion wears" }
];

const ALPHABOT_CATEGORIES = [
  "Phones & Tablets",
  "Electronics",
  "Home & Furniture",
  "Fashion",
  "Beauty & Personal Care",
  "Commercial Equipment",
  "Babies & Kids",
  "Food",
  "Medical Supplies",
  "Groceries"
];

export default function JumiaSourcingPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);

  const [form, setForm] = useState({
    markup: "",
    weight: "",
    categoryId: "",
    category: "",
    length: "",
    width: "",
    height: ""
  });

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const sellingPrice = useMemo(() => {
    if (!product) return 0;
    return Number(product.sourcePrice || 0) + Number(product.sourceDeliveryFee || 0) + Number(form.markup || 0);
  }, [product, form.markup]);

  const availableStock = useMemo(() => {
    if (!product) return 0;
    return Math.floor(Math.max(0, Number(product.sourceStock || 0)) / 2);
  }, [product]);
  const fetchProduct = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!url.trim()) throw new Error("Paste a Jumia product URL first.");

      const res = await fetch(url.trim());
      if (!res.ok) throw new Error(`Jumia returned HTTP ${res.status}.`);

      const html = await res.text();

      const getMeta = (property, name) => {
        const pattern = new RegExp(`<meta[^>]+(?:property=["']${property}["']|name=["']${name}["'])[^>]+content=["']([^"']*)["'][^>]*>`, "i");
        const match = html.match(pattern);
        return match ? match[1].replace(/&amp;/g, "&") : "";
      };

      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

      const name = getMeta("og:title", "title") || (titleMatch ? titleMatch[1].replace(/&amp;/g, "&").trim() : "");
      const description = getMeta("og:description", "description");
      const image = getMeta("og:image", "image");

      const imageCandidates = [];
      const addImage = (value) => {
        if (!value) return;
        const cleaned = value.replace(/\u0026/g, "&").replace(/\\/g, "").replace(/&amp;/g, "&").trim();
        if (!cleaned || !/^https?:\/\//i.test(cleaned)) return;
        if (!imageCandidates.includes(cleaned)) imageCandidates.push(cleaned);
      };

      addImage(image);

      for (const match of html.matchAll(/(?:\"image\"|\"imageUrl\"|\"imageURL\")\s*:\s*\"([^\"]+)\"/gi)) addImage(match[1]);
      for (const match of html.matchAll(/https?:\/\/[^\"\s]+\.(?:jpg|jpeg|png|webp)(?:\?[^\"\s]*)?/gi)) addImage(match[0]);
      const priceMatch = html.match(/"rawPrice":"([0-9.]+)"/i);
      const oldPriceMatch = html.match(/"oldPrice":"₦\s*([0-9,]+)"/i);
      const stockMatch = html.match(/([0-9]+)\s+items\s+in\s+stock/i);

      const deliveryMatches = [...html.matchAll(/₦\s*([0-9,]+)/g)].map((m) => Number(m[1].replace(/,/g, "")));

      const sourcePrice = priceMatch ? Number(priceMatch[1]) : deliveryMatches[0] || 0;
      const sourceOldPrice = oldPriceMatch ? Number(oldPriceMatch[1].replace(/,/g, "")) : null;
      const sourceStock = stockMatch ? Number(stockMatch[1]) : 0;

      const feeMatch = html.match(/delivery[^₦]{0,300}₦\s*([0-9,]+)/i);
      const sourceDeliveryFee = feeMatch ? Number(feeMatch[1].replace(/,/g, "")) : 0;

      const dimensionMatch = html.match(/Dimensions:\s*([0-9.]+)\s*x\s*([0-9.]+)\s*x\s*([0-9.]+)\s*mm/i);

      const dimensions = dimensionMatch
        ? {
            length: Number(dimensionMatch[1]) / 10,
            width: Number(dimensionMatch[2]) / 10,
            height: Number(dimensionMatch[3]) / 10
          }
        : {};
      setProduct({
        sourceUrl: url.trim(),
        name,
        description,
        image: imageCandidates[0] || image,
        images: imageCandidates,
        sourcePrice,
        sourceOldPrice,
        sourceStock,
        sourceDeliveryFee,
        dimensions
      });

      setForm((prev) => ({
        ...prev,
        length: dimensions.length ?? prev.length,
        width: dimensions.width ?? prev.width,
        height: dimensions.height ?? prev.height
      }));

      setMessage("Product details fetched. Review the fields below.");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Could not fetch this Jumia product.");
    } finally {
      setLoading(false);
    }
  };
  const saveProduct = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Admin authentication token not found.");
      if (!product) throw new Error("Fetch a Jumia product first.");

      const shipping = {
        categoryId: Number(form.categoryId),
        weight: Number(form.weight),
        length: Number(form.length),
        width: Number(form.width),
        height: Number(form.height)
      };

      const res = await fetch(`${API}/admin/jumia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          sourceUrl: product.sourceUrl,
          name: product.name,
          description: product.description,
          image: product.image,
          images: product.images,
          sourcePrice: Number(product.sourcePrice || 0),
          sourceOldPrice: product.sourceOldPrice == null || product.sourceOldPrice === "" ? null : Number(product.sourceOldPrice),
          sourceStock: Number(product.sourceStock || 0),
          sourceDeliveryFee: Number(product.sourceDeliveryFee || 0),
          markup: Number(form.markup || 0),
          shipping,
          category: form.category,
          attributes: {}
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save Jumia product.");

      setMessage("🔥 Jumia product added successfully!");
      setProduct(data.product);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#09090B] text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">Admin / Jumia Sourcing</p>
            <h1 className="text-2xl font-bold mt-1">🛒 Product Importer</h1>
          </div>
          <p className="text-xs text-zinc-500">Import → Review → Edit → Publish</p>
        </div>

        <section className="border border-zinc-800 bg-[#111113] rounded-xl p-3 mb-5">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Jumia product URL..."
              className="flex-1 min-w-0 bg-[#09090B] border border-zinc-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
            />
            <button
              onClick={fetchProduct}
              disabled={loading}
              className="bg-white text-black rounded-lg px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {loading ? "Fetching..." : "Fetch Product"}
            </button>
          </div>

          {message && <p className="mt-2 text-xs text-emerald-400">{message}</p>}
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        </section>
        {product && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
            <div className="space-y-4">
              <section className="border border-zinc-800 bg-[#111113] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">Product</h2>
                  <span className="text-[11px] text-zinc-500">Editable</span>
                </div>

                <label className="block text-xs text-zinc-500 mb-1">Product name</label>
                <input
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  className="w-full bg-[#09090B] border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400"
                />

                <label className="block text-xs text-zinc-500 mt-3 mb-1">Description</label>
                <textarea
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  rows={4}
                  className="w-full bg-[#09090B] border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 resize-y"
                />
              </section>
              <section className="border border-zinc-800 bg-[#111113] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">Jumia Source Data</h2>
                  <span className="text-[11px] text-zinc-500">Fetched values</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-500">Jumia price</label>
                    <input
                      type="number"
                      value={product.sourcePrice}
                      onChange={(e) => setProduct({ ...product, sourcePrice: e.target.value })}
                      className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-2.5 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500">Old price</label>
                    <input
                      type="number"
                      value={product.sourceOldPrice ?? ""}
                      onChange={(e) => setProduct({ ...product, sourceOldPrice: e.target.value })}
                      className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-2.5 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500">Jumia stock</label>
                    <input
                      type="number"
                      value={product.sourceStock}
                      onChange={(e) => setProduct({ ...product, sourceStock: e.target.value })}
                      className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-2.5 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500">Jumia delivery</label>
                    <input
                      type="number"
                      value={product.sourceDeliveryFee}
                      onChange={(e) => setProduct({ ...product, sourceDeliveryFee: e.target.value })}
                      className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-2.5 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {[
                    ["length", "Length (cm)"],
                    ["width", "Width (cm)"],
                    ["height", "Height (cm)"]
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="text-[11px] text-zinc-500">{label}</label>
                      <input
                        type="number"
                        value={form[key]}
                        onChange={(e) => updateForm(key, e.target.value)}
                        className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-2.5 py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </section>
              <section className="border border-zinc-800 bg-[#111113] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">Images</h2>
                  <span className="text-[11px] text-zinc-500">{product.images?.length || 0} images</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {(product.images || []).map((img, index) => (
                    <div
                      key={`${img}-${index}`}
                      className={`relative aspect-square rounded-lg overflow-hidden border ${product.image === img ? "border-white" : "border-zinc-800"}`}
                    >
                      <button
                        type="button"
                        onClick={() => setProduct({ ...product, image: img })}
                        className="w-full h-full"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>

                      {product.image === img && (
                        <span className="absolute left-1 bottom-1 text-[9px] bg-white text-black px-1.5 py-0.5 rounded">
                          MAIN
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          const images = product.images.filter((_, i) => i !== index);
                          setProduct({
                            ...product,
                            images,
                            image: product.image === img ? (images[0] || "") : product.image
                          });
                        }}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {(!product.images || product.images.length === 0) && (
                  <p className="text-xs text-amber-400">⚠ No product images found.</p>
                )}
              </section>
              <section className="border border-zinc-800 bg-[#111113] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">Shipping</h2>
                  <span className="text-[11px] text-zinc-500">Required for delivery</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-500">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.weight}
                      onChange={(e) => updateForm("weight", e.target.value)}
                      placeholder="e.g. 0.5"
                      className={`w-full mt-1 bg-[#09090B] border rounded-lg px-2.5 py-2 text-sm ${!form.weight ? "border-amber-700" : "border-zinc-700"}`}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500">Length (cm)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.length}
                      onChange={(e) => updateForm("length", e.target.value)}
                      className={`w-full mt-1 bg-[#09090B] border rounded-lg px-2.5 py-2 text-sm ${!form.length ? "border-amber-700" : "border-zinc-700"}`}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500">Width (cm)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.width}
                      onChange={(e) => updateForm("width", e.target.value)}
                      className={`w-full mt-1 bg-[#09090B] border rounded-lg px-2.5 py-2 text-sm ${!form.width ? "border-amber-700" : "border-zinc-700"}`}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500">Height (cm)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.height}
                      onChange={(e) => updateForm("height", e.target.value)}
                      className={`w-full mt-1 bg-[#09090B] border rounded-lg px-2.5 py-2 text-sm ${!form.height ? "border-amber-700" : "border-zinc-700"}`}
                    />
                  </div>
                </div>
              </section>

              <section className="border border-zinc-800 bg-[#111113] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">AlphaBot Category</h2>
                  <span className="text-[11px] text-zinc-500">Optional label</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-500">Category</label>
                    <input
                      value={form.category}
                      onChange={(e) => updateForm("category", e.target.value)}
                      placeholder="e.g. Electronics"
                      className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-2.5 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500">Shipbubble category ID</label>
                    <input
                      type="number"
                      value={form.categoryId}
                      onChange={(e) => updateForm("categoryId", e.target.value)}
                      placeholder="Required"
                      className={`w-full mt-1 bg-[#09090B] border rounded-lg px-2.5 py-2 text-sm ${!form.categoryId ? "border-amber-700" : "border-zinc-700"}`}
                    />
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
              <section className="border border-zinc-800 bg-[#111113] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">AlphaBot Pricing</h2>
                  <span className="text-[11px] text-zinc-500">Auto-calculated</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Jumia price</span>
                    <span>₦{Number(product.sourcePrice || 0).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-500">Jumia delivery</span>
                    <span>₦{Number(product.sourceDeliveryFee || 0).toLocaleString()}</span>
                  </div>

                  <div className="pt-2 border-t border-zinc-800">
                    <label className="text-[11px] text-zinc-500">AlphaBot markup</label>
                    <input
                      type="number"
                      value={form.markup}
                      onChange={(e) => updateForm("markup", e.target.value)}
                      placeholder="0"
                      className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-2.5 py-2 text-sm"
                    />
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                    <span className="font-semibold">Selling price</span>
                    <span className="text-lg font-bold">₦{sellingPrice.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              <section className="border border-zinc-800 bg-[#111113] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Available Stock</span>
                  <span className={`text-xl font-bold ${availableStock > 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {availableStock}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  AlphaBot exposes 50% of Jumia stock.
                </p>
              </section>
              <button
                type="button"
                onClick={saveProduct}
                disabled={saving || !product}
                className="w-full bg-white text-black rounded-xl px-4 py-3 text-sm font-bold disabled:opacity-50"
              >
                {saving ? "Publishing..." : "🔥 Add Product to AlphaBot"}
              </button>

              <p className="text-[11px] text-zinc-600 text-center">
                Shipbubble delivery is added separately at customer checkout.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
