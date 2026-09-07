"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { MARKETPLACE_CATEGORIES } from "@/lib/marketplaceCategories";

const API = "https://api.alphabothq.com";

export default function EditJumiaProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ category: "", markup: "", weight: "", length: "", width: "", height: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateProduct = (key, value) => setProduct((prev) => ({ ...prev, [key]: value }));

  const sellingPrice = useMemo(() => product ? Number(product.sourcePrice || 0) + Number(product.sourceDeliveryFee || 0) + Number(form.markup || 0) : 0, [product, form.markup]);
  const availableStock = useMemo(() => product ? Math.floor(Math.max(0, Number(product.sourceStock || 0)) / 2) : 0, [product]);

  useEffect(() => {
    if (!id) return;
    const loadProduct = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("Admin authentication token not found.");
        const res = await fetch(`${API}/admin/jumia/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load Jumia product.");
        const item = data.product;
        setProduct(item);
        setForm({ category: item.category || "", markup: item.markup ?? "", weight: item.shipping?.weight ?? "", length: item.shipping?.length ?? "", width: item.shipping?.width ?? "", height: item.shipping?.height ?? "" });
      } catch (err) { console.error(err); setError(err?.message || "Failed to load product."); } finally { setLoading(false); }
    };
    loadProduct();
  }, [id]);

  const saveProduct = async () => {
    setSaving(true); setMessage(""); setError("");
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Admin authentication token not found.");
      if (!product?.name?.trim()) throw new Error("Product name is required.");
      if (!product?.image && (!product?.images || product.images.length === 0)) throw new Error("At least one product image is required.");
      const selectedCategory = MARKETPLACE_CATEGORIES.find((item) => item.name === form.category);
      if (!selectedCategory?.shipbubbleCategoryId) throw new Error("Please select a valid AlphaBot category.");
      if (Number(form.weight) <= 0) throw new Error("Product weight must be greater than 0 kg.");
      if (Number(form.length) <= 0 || Number(form.width) <= 0 || Number(form.height) <= 0) throw new Error("Package dimensions must all be greater than 0 cm.");
      const res = await fetch(`${API}/admin/jumia/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: product.name.trim(), description: product.description || "", image: product.image || product.images?.[0] || "", images: Array.isArray(product.images) ? product.images : [], sourcePrice: Number(product.sourcePrice || 0), sourceOldPrice: product.sourceOldPrice == null || product.sourceOldPrice === "" ? null : Number(product.sourceOldPrice), sourceStock: Number(product.sourceStock || 0), sourceDeliveryFee: Number(product.sourceDeliveryFee || 0), markup: Number(form.markup || 0), category: selectedCategory.name, shipping: { categoryId: Number(selectedCategory.shipbubbleCategoryId), weight: Number(form.weight), length: Number(form.length), width: Number(form.width), height: Number(form.height) } }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update Jumia product.");
      setProduct(data.product); setMessage("✅ Jumia product updated successfully.");
    } catch (err) { console.error(err); setError(err?.message || "Failed to update product."); } finally { setSaving(false); }
  };

  const deleteProduct = async () => {
    if (!window.confirm("Delete this Jumia product permanently?")) return;
    setDeleting(true); setMessage(""); setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API}/admin/jumia/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete Jumia product.");
      router.push("/admin/jumia/products");
    } catch (err) { console.error(err); setError(err?.message || "Failed to delete product."); } finally { setDeleting(false); }
  };

  if (loading) return <main className="min-h-screen bg-[#09090B] text-white p-6"><div className="max-w-5xl mx-auto text-sm text-zinc-500">Loading Jumia product...</div></main>;
  if (!product) return <main className="min-h-screen bg-[#09090B] text-white p-6"><div className="max-w-5xl mx-auto"><p className="text-sm text-red-400">{error || "Product not found."}</p><Link href="/admin/jumia/products" className="inline-block mt-4 text-xs underline">← Back to products</Link></div></main>;

  return <main className="min-h-screen bg-[#09090B] text-white p-4 md:p-6"><div className="max-w-6xl mx-auto"><div className="flex items-end justify-between gap-3 mb-5"><div><p className="text-xs uppercase tracking-widest text-zinc-500">Admin / Jumia Sourcing</p><h1 className="text-2xl font-bold mt-1">✏️ Edit Jumia Product</h1></div><Link href="/admin/jumia/products" className="text-xs text-zinc-400 hover:text-white">← Manage Products</Link></div>{message && <div className="mb-4 text-emerald-400 text-xs">{message}</div>}{error && <div className="mb-4 text-red-400 text-xs">{error}</div>}<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5"><div className="space-y-4"><section className="border border-zinc-800 bg-[#111113] rounded-xl p-4"><h2 className="text-sm font-semibold mb-3">Product Details</h2><input value={product.name||""} onChange={(e)=>updateProduct("name",e.target.value)} className="w-full mb-3 bg-[#09090B] border border-zinc-700 rounded-lg px-3 py-2 text-sm"/><textarea value={product.description||""} onChange={(e)=>updateProduct("description",e.target.value)} rows={5} className="w-full bg-[#09090B] border border-zinc-700 rounded-lg px-3 py-2 text-sm"/></section><section className="border border-zinc-800 bg-[#111113] rounded-xl p-4"><h2 className="text-sm font-semibold mb-3">Jumia Source Data</h2><div className="grid grid-cols-2 gap-3">{[["sourcePrice","Jumia price"],["sourceOldPrice","Old price"],["sourceStock","Jumia stock"],["sourceDeliveryFee","Jumia delivery"]].map(([key,label])=><div key={key}><label className="text-[11px] text-zinc-500">{label}</label><input type="number" value={product[key]??""} onChange={(e)=>updateProduct(key,e.target.value)} className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-2.5 py-2 text-sm"/></div>)}</div></section><section className="border border-zinc-800 bg-[#111113] rounded-xl p-4"><h2 className="text-sm font-semibold mb-3">Images</h2><div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{(product.images||[]).map((image)=><button type="button" key={image} onClick={()=>updateProduct("image",image)} className={`relative border rounded-lg overflow-hidden ${product.image===image?"border-white":"border-zinc-800"}`}><img src={image} alt="" className="w-full aspect-square object-cover"/>{product.image===image&&<span className="absolute bottom-1 left-1 text-[9px] bg-white text-black px-1 rounded">MAIN</span>}</button>)}</div></section><section className="border border-zinc-800 bg-[#111113] rounded-xl p-4"><h2 className="text-sm font-semibold mb-3">Shipping & Category</h2><select value={form.category} onChange={(e)=>updateForm("category",e.target.value)} className="w-full mb-3 bg-[#09090B] border border-zinc-700 rounded-lg px-3 py-2 text-sm"><option value="">Select category</option>{MARKETPLACE_CATEGORIES.map((item)=><option key={item.name} value={item.name}>{item.name}</option>)}</select><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[["weight","Weight (kg)"],["length","Length (cm)"],["width","Width (cm)"],["height","Height (cm)"]].map(([key,label])=><div key={key}><label className="text-[11px] text-zinc-500">{label}</label><input type="number" step="0.01" value={form[key]} onChange={(e)=>updateForm(key,e.target.value)} className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-2.5 py-2 text-sm"/></div>)}</div></section></div><aside className="space-y-4 lg:sticky lg:top-4 lg:self-start"><section className="border border-zinc-800 bg-[#111113] rounded-xl p-4"><h2 className="text-sm font-semibold mb-3">AlphaBot Pricing</h2><div className="flex justify-between text-sm mb-2"><span className="text-zinc-500">Jumia price</span><span>₦{Number(product.sourcePrice||0).toLocaleString()}</span></div><div className="flex justify-between text-sm mb-3"><span className="text-zinc-500">Jumia delivery</span><span>₦{Number(product.sourceDeliveryFee||0).toLocaleString()}</span></div><label className="text-[11px] text-zinc-500">Markup</label><input type="number" value={form.markup} onChange={(e)=>updateForm("markup",e.target.value)} className="w-full mt-1 bg-[#09090B] border border-zinc-700 rounded-lg px-3 py-2 text-sm"/><div className="border-t border-zinc-800 mt-3 pt-3 flex justify-between font-bold"><span>Selling price</span><span>₦{sellingPrice.toLocaleString()}</span></div></section><section className="border border-zinc-800 bg-[#111113] rounded-xl p-4"><p className="text-[11px] text-zinc-500">AlphaBot available stock</p><p className="text-2xl font-bold">{availableStock.toLocaleString()}</p><p className="text-[11px] text-zinc-600 mt-1">50% of Jumia stock</p></section><button type="button" onClick={saveProduct} disabled={saving} className="w-full bg-white text-black rounded-xl px-4 py-3 text-sm font-bold disabled:opacity-50">{saving?"Saving...":"💾 Save Changes"}</button><button type="button" onClick={deleteProduct} disabled={deleting} className="w-full border border-red-900/60 text-red-400 rounded-xl px-4 py-3 text-sm font-semibold">{deleting?"Deleting...":"Delete Product"}</button></aside></div></div></main>;
}
