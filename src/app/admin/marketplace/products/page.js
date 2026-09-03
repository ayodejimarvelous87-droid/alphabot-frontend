"use client";

import { useEffect, useState } from "react";

export default function AdminMarketplaceProducts() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("adminToken");

    if (!token) {
      return;
    }

    fetch("https://api.alphabothq.com/admin/marketplace/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products || []);
        }
      })
      .catch((error) => {
        console.error("ADMIN MARKETPLACE PRODUCTS ERROR:", error);
      });
  }, []);

  const updateProductStatus = async (productId, status) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Admin session expired. Please log in again.");
      return;
    }

    const endpoint =
      status === "approved"
        ? `https://api.alphabothq.com/admin/marketplace/products/${productId}/approve`
        : `https://api.alphabothq.com/admin/marketplace/products/${productId}/reject`;

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to update product.");
        return;
      }

      setProducts((current) =>
        current.map((product) =>
          String(product._id) === String(productId)
            ? {
                ...product,
                status,
                reviewedAt: data.product?.reviewedAt || new Date().toISOString(),
              }
            : product
        )
      );
    } catch (error) {
      console.error("ADMIN UPDATE MARKETPLACE PRODUCT ERROR:", error);
      alert("Unable to update product. Please try again.");
    }
  };

  if (!mounted) {
    return null;
  }

  const pending = products.filter(
    (product) => product.status === "pending"
  );

  const approved = products.filter(
    (product) => product.status === "approved"
  );

  const rejected = products.filter(
    (product) => product.status === "rejected"
  );

  return (
    <main className="min-h-screen bg-[#09090b] text-white p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <p className="text-yellow-400 text-xs font-black tracking-[0.2em] uppercase">
              MARKETPLACE
            </p>

            <h1 className="text-2xl md:text-3xl font-black mt-1">
              Product Review
            </h1>

            <p className="text-zinc-500 text-sm mt-2">
              Review seller products before they become visible on the marketplace.
            </p>
          </div>

          <div className="flex gap-2">

            <div className="rounded-2xl bg-yellow-400 text-black px-4 py-3 text-center">
              <p className="text-[9px] font-black uppercase">
                Pending
              </p>

              <p className="text-xl font-black">
                {pending.length}
              </p>
            </div>

            <div className="rounded-2xl bg-green-500 text-white px-4 py-3 text-center">
              <p className="text-[9px] font-black uppercase">
                Live
              </p>

              <p className="text-xl font-black">
                {approved.length}
              </p>
            </div>

          </div>

        </div>

        {/* REVIEW QUEUE */}

        <section>

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-zinc-500">
                REVIEW QUEUE
              </p>

              <h2 className="text-lg font-black mt-1">
                Pending products
              </h2>
            </div>

            <span className="text-xs text-zinc-500">
              {pending.length} waiting
            </span>

          </div>

          {pending.length === 0 ? (

            <div className="rounded-3xl border border-zinc-800 bg-[#101012] p-10 text-center">

              <div className="text-4xl">
                ✓
              </div>

              <h3 className="font-black mt-3">
                No pending products
              </h3>

              <p className="text-xs text-zinc-500 mt-2">
                New seller products will appear here for review.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {pending.map((product) => (

                <div
                  key={product._id}
                  className="rounded-3xl border border-zinc-800 bg-[#101012] overflow-hidden"
                >

                  <div className="p-5">

                    <div className="flex flex-col md:flex-row gap-5">

                      {/* IMAGE */}

                      <div className="w-full md:w-40 h-40 rounded-2xl bg-[#18181B] overflow-hidden shrink-0 flex items-center justify-center">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-5xl">
                            📦
                          </span>
                        )}

                      </div>

                      {/* DETAILS */}

                      <div className="flex-1 min-w-0">

                        <div className="flex items-start justify-between gap-3">

                          <div>
                            <h3 className="text-lg font-black">
                              {product.name}
                            </h3>

                            <p className="text-xs text-zinc-500 mt-1">
                              {product.category}
                            </p>
                          </div>

                          <span className="shrink-0 px-3 py-1.5 rounded-xl bg-yellow-400 text-black text-[9px] font-black">
                            PENDING
                          </span>

                        </div>

                        <p className="text-xl font-black mt-4">
                          ₦{Number(product.price || 0).toLocaleString()}
                        </p>

                        <div className="mt-4 rounded-2xl bg-[#18181B] p-3">

                          <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-black">
                            Seller
                          </p>

                          <p className="text-sm font-bold mt-1">
                            {product.sellerName || "AlphaBot Seller"}
                          </p>

                          <p className="text-[9px] text-zinc-600 mt-1">
                            Seller ID: {product.sellerId || "—"}
                          </p>

                        </div>

                        {product.description && (

                          <div className="mt-3">

                            <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-black">
                              Description
                            </p>

                            <p className="text-xs text-zinc-300 mt-1 leading-5">
                              {product.description}
                            </p>

                          </div>

                        )}

                        <p className="text-[9px] text-zinc-600 mt-4">
                          Submitted{" "}
                          {product.createdAt
                            ? new Date(product.createdAt).toLocaleString()
                            : "—"}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="border-t border-zinc-800 p-4 flex flex-col sm:flex-row gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        updateProductStatus(product._id, "approved")
                      }
                      className="flex-1 h-11 rounded-xl bg-green-500 text-white text-xs font-black active:scale-95 transition"
                    >
                      ✓ Approve & Publish
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateProductStatus(product._id, "rejected")
                      }
                      className="flex-1 h-11 rounded-xl bg-zinc-800 text-red-400 text-xs font-black active:scale-95 transition"
                    >
                      ✕ Reject
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* APPROVED PRODUCTS */}

        <section className="mt-10">

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-green-400">
                LIVE
              </p>

              <h2 className="text-lg font-black mt-1">
                Approved products
              </h2>
            </div>

            <span className="text-xs text-zinc-500">
              {approved.length} products
            </span>

          </div>

          {approved.length === 0 ? (

            <div className="rounded-2xl border border-zinc-800 bg-[#101012] p-6 text-center text-xs text-zinc-500">
              No approved products yet.
            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-3">

              {approved.map((product) => (

                <div
                  key={product._id}
                  className="rounded-2xl border border-zinc-800 bg-[#101012] overflow-hidden"
                >

                  <div className="flex gap-3 p-4">

                    <div className="w-20 h-20 rounded-xl bg-[#18181B] overflow-hidden shrink-0 flex items-center justify-center">

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

                        <h3 className="text-sm font-black">
                          {product.name}
                        </h3>

                        <span className="px-2 py-1 rounded-lg bg-green-500 text-white text-[8px] font-black">
                          LIVE
                        </span>

                      </div>

                      <p className="text-[9px] text-zinc-500 mt-1">
                        {product.sellerName || "AlphaBot Seller"}
                      </p>

                      <p className="text-base font-black mt-2">
                        ₦{Number(product.price || 0).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  <div className="border-t border-zinc-800 p-3">

                    <button
                      type="button"
                      onClick={async () => {
                        const confirmed = window.confirm(
                          "Remove this product from the marketplace listings?"
                        );

                        if (!confirmed) {
                          return;
                        }

                        const token = localStorage.getItem("adminToken");

                        try {
                          const res = await fetch(
                            `https://api.alphabothq.com/admin/marketplace/products/${product._id}`,
                            {
                              method: "DELETE",
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );

                          const data = await res.json();

                          if (!res.ok || !data.success) {
                            alert(
                              data.message ||
                                "Failed to remove product."
                            );
                            return;
                          }

                          setProducts((current) =>
                            current.filter(
                              (item) =>
                                String(item._id) !==
                                String(product._id)
                            )
                          );
                        } catch (error) {
                          console.error(
                            "ADMIN DELETE MARKETPLACE PRODUCT ERROR:",
                            error
                          );

                          alert(
                            "Unable to remove product. Please try again."
                          );
                        }
                      }}
                      className="w-full h-10 rounded-xl bg-red-500/10 text-red-400 text-xs font-black active:scale-95 transition"
                    >
                      Remove from marketplace
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* REJECTED PRODUCTS */}

        <section className="mt-10">

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-red-400">
                REJECTED
              </p>

              <h2 className="text-lg font-black mt-1">
                Rejected products
              </h2>
            </div>

            <span className="text-xs text-zinc-500">
              {rejected.length} products
            </span>

          </div>

          {rejected.length === 0 ? (

            <div className="rounded-2xl border border-zinc-800 bg-[#101012] p-6 text-center text-xs text-zinc-500">
              No rejected products.
            </div>

          ) : (

            <div className="space-y-3">

              {rejected.map((product) => (

                <div
                  key={product._id}
                  className="rounded-2xl border border-zinc-800 bg-[#101012] p-4"
                >

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <h3 className="text-sm font-black">
                        {product.name}
                      </h3>

                      <p className="text-[9px] text-zinc-500 mt-1">
                        {product.sellerName || "AlphaBot Seller"}
                      </p>
                    </div>

                    <span className="px-2 py-1 rounded-lg bg-red-500/10 text-red-400 text-[8px] font-black">
                      REJECTED
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      updateProductStatus(product._id, "pending")
                    }
                    className="mt-3 w-full h-10 rounded-xl bg-zinc-800 text-xs font-black"
                  >
                    Move back to review
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}
