"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SellerProductsPage() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState("loading");

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setVerificationStatus("unauthenticated");
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
          throw new Error(data.message || "Failed to load products.");
        }

        return data;
      })
      .then((data) => {
        if (data.products) {
          setVerificationStatus("verified");
          setProducts(data.products);
        }
      })
      .catch((error) => {
        console.error("MARKETPLACE SELLER PRODUCTS ERROR:", error);
        setVerificationStatus("error");
      });
  }, []);

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Delete this product from your listings?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://api.alphabothq.com/marketplace/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to delete product.");
        return;
      }

      setProducts((current) =>
        current.filter((product) => String(product._id) !== String(id))
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("DELETE MARKETPLACE PRODUCT ERROR:", error);
      alert("Unable to delete product. Please try again.");
    }
  };

  if (!mounted) {
    return null;
  }

  if (verificationStatus === "loading") {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="text-4xl">⏳</div>
          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500 mt-5">
            SELLER ACCESS
          </p>
          <h1 className="text-xl font-black mt-2">
            Checking seller verification...
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            Please wait while we verify your seller account.
          </p>
        </div>
      </main>
    );
  }

  if (verificationStatus === "unauthenticated") {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="text-5xl">🔐</div>
          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500 mt-5">
            SELLER ACCESS
          </p>
          <h1 className="text-xl font-black mt-2">
            Sign in required
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            Please sign in to manage your marketplace products.
          </p>
          <Link
            href="/login"
            className="inline-flex mt-6 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  if (verificationStatus === "error") {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="text-5xl">⚠️</div>
          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500 mt-5">
            SELLER ACCESS
          </p>
          <h1 className="text-xl font-black mt-2">
            Unable to verify seller account
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            We could not confirm your seller status right now. Please try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex mt-6 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (verificationStatus !== "verified") {
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
            Only verified AlphaBot sellers can manage marketplace products.
          </p>

          <Link
            href="/marketplace/seller"
            className="inline-flex mt-6 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black"
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

        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-3">

          <div className="flex items-center gap-3">

            <Link
              href="/marketplace/seller"
              className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center active:scale-95 transition"
            >
              ←
            </Link>

            <div>
              <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
                ALPHABOT
              </p>

              <h1 className="font-black text-sm">
                My Products
              </h1>
            </div>

          </div>

          <Link
            href="/marketplace/seller/products/new"
            className="w-9 h-9 rounded-xl bg-yellow-400 text-black flex items-center justify-center text-lg font-black active:scale-95 transition"
          >
            +
          </Link>

        </div>

      </header>

      <div className="max-w-2xl mx-auto px-4">

        <section className="mt-5">

          <div className="rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-black p-5">

            <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-400 dark:text-yellow-600">
              SELLER DASHBOARD
            </p>

            <h2 className="text-xl font-black mt-2">
              Manage your listings.
            </h2>

            <p className="text-xs opacity-60 mt-2 leading-5">
              Track your products and their marketplace review status.
            </p>

          </div>

        </section>

        <section className="mt-6">

          <div className="flex items-center justify-between mb-3">

            <div>
              <p className="text-[9px] font-black tracking-[0.16em] uppercase text-zinc-500">
                INVENTORY
              </p>

              <h2 className="text-lg font-black mt-1">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </h2>
            </div>

            <Link
              href="/marketplace/seller/products/new"
              className="text-[10px] font-black text-yellow-600 dark:text-yellow-400"
            >
              + Add product
            </Link>

          </div>

          {products.length === 0 && (

            <div className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-8 text-center">

              <div className="text-5xl">
                📦
              </div>

              <h3 className="font-black mt-4">
                No products yet
              </h3>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
                Add your first product and submit it for marketplace review.
              </p>

              <Link
                href="/marketplace/seller/products/new"
                className="inline-flex mt-5 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black"
              >
                Add your first product →
              </Link>

            </div>

          )}

          <div className="space-y-3">

            {products.map((product) => {

              const status = product.status || "pending";

              const statusClass =
                status === "approved"
                  ? "bg-green-500 text-white"
                  : status === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-400 text-black";

              return (
                <div
                  key={product._id}
                  className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >

                  <div className="flex gap-3 p-3">

                    <div className="w-24 h-24 rounded-xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden shrink-0 flex items-center justify-center">

                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl">
                          📦
                        </span>
                      )}

                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex items-start justify-between gap-2">

                        <h3 className="text-sm font-black leading-5">
                          {product.name}
                        </h3>

                        <span
                          className={`shrink-0 px-2 py-1 rounded-lg text-[8px] font-black ${statusClass}`}
                        >
                          {status.toUpperCase()}
                        </span>

                      </div>

                      <p className="text-[9px] text-zinc-500 mt-1">
                        {product.category}
                      </p>

                      {Number(product.discountPercent || 0) > 0 &&
                        Number(product.originalPrice || 0) >
                          Number(product.price || 0) ? (
                        <div className="flex items-center gap-2 flex-wrap mt-2">
                          <span className="text-[10px] text-zinc-500 line-through">
                            ₦{Number(product.originalPrice || 0).toLocaleString()}
                          </span>

                          <span className="text-base font-black">
                            ₦{Number(product.price || 0).toLocaleString()}
                          </span>

                          <span className="px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 text-[8px] font-black">
                            -{Math.round(Number(product.discountPercent))}%
                          </span>
                        </div>
                      ) : (
                        <p className="text-base font-black mt-2">
                          ₦{Number(product.price || 0).toLocaleString()}
                        </p>
                      )}

                    </div>

                  </div>

                  {status === "pending" && (
                    <div className="px-3 pb-3">

                      <div className="rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-3 py-2">

                        <p className="text-[9px] text-yellow-700 dark:text-yellow-400 font-bold">
                          ⏳ Waiting for AlphaBot review
                        </p>

                      </div>

                    </div>
                  )}

                  {status === "rejected" && (
                    <div className="px-3 pb-3">

                      <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2">

                        <p className="text-[9px] text-red-600 dark:text-red-400 font-bold">
                          This product was not approved for marketplace listing.
                        </p>

                      </div>

                    </div>
                  )}

                  <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 flex gap-2">

                    <Link
                      href={`/marketplace/seller/products/edit/${product._id}`}
                      className="flex-1 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs font-black active:scale-95 transition flex items-center justify-center"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 h-10 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black active:scale-95 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

      </div>

    </main>
  );
}
