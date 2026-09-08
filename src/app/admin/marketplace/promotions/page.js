"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://api.alphabothq.com";

export default function AdminMarketplacePromotions() {
  const [mounted, setMounted] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [active, setActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    loadPromotions();
  }, []);

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  const loadPromotions = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE}/admin/marketplace/promotions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load promotions."
        );
      }

      setPromotions(data.promotions || []);
    } catch (err) {
      console.error(
        "ADMIN MARKETPLACE PROMOTIONS LOAD ERROR:",
        err
      );
      setError(
        err.message || "Unable to load promotions."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const token = getToken();

    if (!token) {
      alert("Admin session expired. Please log in again.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `${API_BASE}/uploads/marketplace-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to upload flier."
        );
      }

      setImageUrl(data.imageUrl || "");
      setPublicId(data.publicId || "");
    } catch (err) {
      console.error(
        "ADMIN MARKETPLACE PROMOTION UPLOAD ERROR:",
        err
      );
      setError(
        err.message || "Unable to upload flier."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const resetForm = () => {
    setImageUrl("");
    setPublicId("");
    setTitle("");
    setLink("");
    setActive(true);
  };

  const savePromotion = async (event) => {
    event.preventDefault();

    const token = getToken();

    if (!token) {
      alert("Admin session expired. Please log in again.");
      return;
    }

    if (!imageUrl) {
      alert("Please upload a flier first.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `${API_BASE}/admin/marketplace/promotions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl,
            publicId,
            title,
            link,
            active,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save promotion."
        );
      }

      setPromotions((current) => [
        data.promotion,
        ...current,
      ]);

      resetForm();
    } catch (err) {
      console.error(
        "ADMIN MARKETPLACE PROMOTION SAVE ERROR:",
        err
      );
      setError(
        err.message || "Unable to save promotion."
      );
    } finally {
      setSaving(false);
    }
  };

  const togglePromotion = async (promotion) => {
    const token = getToken();

    if (!token) {
      alert("Admin session expired. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/admin/marketplace/promotions/${promotion._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: !promotion.active,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update promotion."
        );
      }

      setPromotions((current) =>
        current.map((item) =>
          String(item._id) === String(promotion._id)
            ? data.promotion
            : item
        )
      );
    } catch (err) {
      console.error(
        "ADMIN MARKETPLACE PROMOTION TOGGLE ERROR:",
        err
      );
      alert(
        err.message || "Unable to update promotion."
      );
    }
  };

  const deletePromotion = async (promotion) => {
    const confirmed = window.confirm(
      "Delete this promotional flier?"
    );

    if (!confirmed) {
      return;
    }

    const token = getToken();

    if (!token) {
      alert("Admin session expired. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/admin/marketplace/promotions/${promotion._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete promotion."
        );
      }

      setPromotions((current) =>
        current.filter(
          (item) =>
            String(item._id) !== String(promotion._id)
        )
      );
    } catch (err) {
      console.error(
        "ADMIN MARKETPLACE PROMOTION DELETE ERROR:",
        err
      );
      alert(
        err.message || "Unable to delete promotion."
      );
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <p className="text-yellow-400 text-xs font-black tracking-[0.2em] uppercase">
            MARKETPLACE
          </p>

          <h1 className="text-2xl md:text-3xl font-black mt-1">
            Promotions
          </h1>

          <p className="text-zinc-500 text-sm mt-2">
            Upload and manage sponsored fliers that appear on the public marketplace.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <section className="rounded-3xl border border-zinc-800 bg-[#101012] p-5 md:p-7 mb-8">
          <div className="mb-6">
            <p className="text-[9px] font-black tracking-[0.18em] uppercase text-zinc-500">
              SPONSORED FLIER
            </p>

            <h2 className="text-xl font-black mt-1">
              Add promotion
            </h2>

            <p className="text-xs text-zinc-500 mt-2">
              Upload a seller's paid promotional flier. It will appear separately from marketplace products.
            </p>
          </div>

          <form onSubmit={savePromotion} className="space-y-5">

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2">
                Flier image
              </label>

              <label className="flex min-h-40 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-[#18181B] hover:border-yellow-400 transition overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Promotion preview"
                    className="w-full max-h-80 object-contain"
                  />
                ) : (
                  <div className="text-center px-5">
                    <div className="text-4xl mb-2">
                      📣
                    </div>

                    <p className="font-black">
                      {uploading
                        ? "Uploading..."
                        : "Click to upload flier"}
                    </p>

                    <p className="text-xs text-zinc-500 mt-1">
                      Image files up to 5MB
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2">
                  Title (optional)
                </label>

                <input
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Seller promo"
                  className="w-full rounded-xl border border-zinc-800 bg-[#18181B] px-4 py-3 text-sm outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2">
                  Click link (optional)
                </label>

                <input
                  value={link}
                  onChange={(event) =>
                    setLink(event.target.value)
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl border border-zinc-800 bg-[#18181B] px-4 py-3 text-sm outline-none focus:border-yellow-400"
                />
              </div>

            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={(event) =>
                  setActive(event.target.checked)
                }
                className="h-4 w-4"
              />

              <span className="text-sm font-bold">
                Publish immediately
              </span>
            </label>

            <div className="flex flex-wrap gap-3">

              <button
                type="submit"
                disabled={saving || uploading || !imageUrl}
                className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black disabled:opacity-40"
              >
                {saving
                  ? "Saving..."
                  : "📣 Publish Promotion"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-bold hover:bg-[#18181B]"
              >
                Clear
              </button>

            </div>

          </form>
        </section>

        <section>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-zinc-500">
                PROMOTION LIBRARY
              </p>

              <h2 className="text-lg font-black mt-1">
                Sponsored fliers
              </h2>
            </div>

            <span className="text-xs text-zinc-500">
              {promotions.length} total
            </span>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-zinc-800 bg-[#101012] p-10 text-center text-sm text-zinc-500">
              Loading promotions...
            </div>
          ) : promotions.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-[#101012] p-10 text-center">
              <div className="text-4xl">
                📣
              </div>

              <h3 className="font-black mt-3">
                No promotions yet
              </h3>

              <p className="text-xs text-zinc-500 mt-2">
                Paid seller promotions will appear here after you upload them.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {promotions.map((promotion) => (
                <div
                  key={promotion._id}
                  className="rounded-3xl border border-zinc-800 bg-[#101012] overflow-hidden"
                >
                  <div className="aspect-[16/9] bg-[#18181B] flex items-center justify-center overflow-hidden">
                    <img
                      src={promotion.imageUrl}
                      alt={promotion.title || "Marketplace promotion"}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-black truncate">
                          {promotion.title || "Sponsored promotion"}
                        </h3>

                        <p className="text-xs text-zinc-500 mt-1">
                          {promotion.active
                            ? "Visible on marketplace"
                            : "Hidden from marketplace"}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-black uppercase ${
                          promotion.active
                            ? "bg-green-500/15 text-green-400"
                            : "bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        {promotion.active
                          ? "Active"
                          : "Off"}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-5">
                      <button
                        type="button"
                        onClick={() =>
                          togglePromotion(promotion)
                        }
                        className="flex-1 rounded-xl border border-zinc-700 px-4 py-3 text-xs font-black hover:bg-[#18181B]"
                      >
                        {promotion.active
                          ? "Turn Off"
                          : "Activate"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deletePromotion(promotion)
                        }
                        className="rounded-xl border border-red-500/30 px-4 py-3 text-xs font-black text-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}
