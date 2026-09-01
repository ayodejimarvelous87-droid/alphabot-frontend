"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [seller, setSeller] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Phones",
    image: "",
    description: "",
    stock: 0,
  });

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetch("https://api.alphabothq.com/marketplace/products/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Unable to load seller products.");
        }

        return data;
      })
      .then((data) => {
        const product = (data.products || []).find(
          (item) => String(item._id) === String(id)
        );

        if (!product) {
          throw new Error("Product not found.");
        }

        setVerified(true);

        setForm({
          name: product.name || "",
          price: product.price ?? "",
          category: product.category || "Phones",
          image: product.image || "",
          description: product.description || "",
          stock: product.stock ?? 0,
        });
      })
      .catch((error) => {
        console.error("LOAD MARKETPLACE EDIT PRODUCT ERROR:", error);
        setVerified(false);
      });

    fetch("https://api.alphabothq.com/marketplace/sellers/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.seller) {
          setSeller(data.seller);
        }
      })
      .catch((error) => {
        console.error("LOAD MARKETPLACE SELLER ERROR:", error);
      });
  }, [id]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.description) {
      alert("Please complete the product details.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://api.alphabothq.com/marketplace/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name.trim(),
            price: Number(form.price),
            category: form.category,
            image: form.image.trim(),
            description: form.description.trim(),
            stock: Number(form.stock),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to submit product.");
        return;
      }

      alert(
        "Product updated successfully. It has been sent for AlphaBot review."
      );

      window.location.href = "/marketplace/seller/products";
    } catch (error) {
      console.error("UPDATE MARKETPLACE PRODUCT ERROR:", error);
      alert("Unable to update product. Please try again.");
    }
  };

  if (!mounted) {
    return null;
  }

  if (!verified) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white flex items-center justify-center px-5">

        <div className="text-center max-w-sm">

          <div className="text-5xl">
            🔐
          </div>

          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500 mt-5">
            SELLER ACCESS
          </p>

          <h1 className="text-xl font-black mt-2">
            Verification required
          </h1>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            Only verified AlphaBot sellers can list products on the
            marketplace.
          </p>

          <div className="mt-5 px-4 py-3 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800">

            <p className="text-[9px] uppercase tracking-[0.16em] font-black text-zinc-500">
              CURRENT STATUS
            </p>

            <p className="text-sm font-black mt-1">
              {seller?.status || "Not a seller"}
            </p>

          </div>

          <Link
            href="/marketplace/seller"
            className="inline-flex mt-5 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black active:scale-[0.98] transition"
          >
            Back to Seller Profile
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-12">

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">

        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">

          <Link
            href="/marketplace/seller"
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center active:scale-95 transition"
          >
            ←
          </Link>

          <div className="flex-1">

            <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
              ALPHABOT
            </p>

            <h1 className="font-black text-sm">
              Edit Product
            </h1>

          </div>

          <Link
            href="/marketplace/seller/products"
            className="text-[10px] font-black text-zinc-500"
          >
            My products
          </Link>

        </div>

      </header>

      <div className="max-w-2xl mx-auto px-4">

        {/* VERIFIED SELLER */}

        <section className="mt-5 rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-black p-5">

          <div className="flex items-center justify-between gap-3">

            <div>

              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-400 dark:text-yellow-600">
                VERIFIED SELLER
              </p>

              <h2 className="text-xl font-black mt-2">
                {seller?.businessName || "Your Store"}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-2xl bg-green-500 text-white flex items-center justify-center text-xl">
              ✓
            </div>

          </div>

          <p className="text-xs opacity-60 mt-2 leading-5">
            You can list products because your seller profile has been
            verified by AlphaBot.
          </p>

        </section>

        {/* PRODUCT FORM */}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <div>
            <label className="text-xs font-black">
              Product name
            </label>

            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Wireless Headphones"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs font-black">
              Price
            </label>

            <input
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="8500"
              inputMode="numeric"
              type="number"
              min="0"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs font-black">
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            >
              <option>Phones</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Computers</option>
              <option>Accessories</option>
              <option>Home</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-black">
              Product image URL
            </label>

            <input
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
              placeholder="https://..."
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />

            <p className="text-[9px] text-zinc-500 mt-2">
              Image upload/storage can be connected later.
            </p>
          </div>

          <div>
            <label className="text-xs font-black">
              Stock
            </label>

            <input
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={(e) => updateField("stock", e.target.value)}
              placeholder="Enter available stock"
              inputMode="numeric"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs font-black">
              Product description
            </label>

            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe your product..."
              rows={5}
              className="mt-2 w-full rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4 text-sm outline-none focus:border-yellow-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-yellow-400 text-black text-xs font-black active:scale-[0.98] transition"
          >
            Save changes →
          </button>

        </form>

        {/* REVIEW NOTICE */}

        <section className="mt-6 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4">

          <p className="text-xs font-black">
            🛡️ Product review
          </p>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            Products are not published immediately. AlphaBot will review
            your listing before it becomes visible to marketplace buyers.
          </p>

        </section>

      </div>

    </main>
  );
}
