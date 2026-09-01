"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SellerProfilePage() {
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    storeName: "",
    businessPhone: "",
    description: "",
  });

  const [status, setStatus] = useState("Not a seller");

  const [payout, setPayout] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [payoutForm, setPayoutForm] = useState({
    bankName: "",
    bankCode: "",
    accountNumber: "",
    accountName: "",
  });

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetch("https://api.alphabothq.com/marketplace/sellers/payout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.payout) {
          setPayout(data.payout);
          setPayoutForm({
            bankName: data.payout.bankName || "",
            bankCode: data.payout.bankCode || "",
            accountNumber: data.payout.accountNumber || "",
            accountName: data.payout.accountName || "",
          });
        }
      })
      .catch((error) => {
        console.error("MARKETPLACE PAYOUT ERROR:", error);
      });

    fetch("https://api.alphabothq.com/marketplace/sellers/earnings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEarnings(data);
        }
      })
      .catch((error) => {
        console.error("MARKETPLACE EARNINGS ERROR:", error);
      });

    fetch("https://api.alphabothq.com/marketplace/sellers/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.seller) {
          setForm({
            storeName: data.seller.storeName || "",
            businessPhone: data.seller.businessPhone || "",
            description: data.seller.description || "",
          });

          setStatus(data.seller.status || "Not a seller");
        }
      })
      .catch((error) => {
        console.error("MARKETPLACE SELLER PROFILE ERROR:", error);
      });
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const savePayout = async (e) => {
    e.preventDefault();

    if (
      !payoutForm.bankName ||
      !payoutForm.bankCode ||
      !payoutForm.accountNumber ||
      !payoutForm.accountName
    ) {
      alert("Please complete your payout account details.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://api.alphabothq.com/marketplace/sellers/payout",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payoutForm),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to save payout account.");
        return;
      }

      setPayout(data.payout || payoutForm);
      alert("Payout account saved successfully.");
    } catch (error) {
      console.error("SAVE MARKETPLACE PAYOUT ERROR:", error);
      alert("Unable to save payout account.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.storeName.trim() ||
      !form.businessPhone.trim()
    ) {
      alert("Please complete your seller information.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://api.alphabothq.com/marketplace/sellers/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to submit seller application.");
        return;
      }

      setStatus(data.seller?.status || "pending");

      alert(
        "Seller application submitted successfully. AlphaBot will review it shortly."
      );
    } catch (error) {
      console.error("MARKETPLACE SELLER APPLICATION ERROR:", error);
      alert("Unable to submit application. Please try again.");
    }
  };

  if (!mounted) {
    return null;
  }

  const verified = status === "approved";
  const pending = status === "pending";

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-12">

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">

        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">

          <Link
            href="/marketplace"
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center"
          >
            ←
          </Link>

          <div>
            <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
              ALPHABOT
            </p>

            <h1 className="font-black text-sm">
              Seller Profile
            </h1>
          </div>

        </div>

      </header>

      <div className="max-w-2xl mx-auto px-4">

        <section className="mt-5">

          <div className="rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-black p-5">

            <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-400 dark:text-yellow-600">
              SELL ON ALPHABOT
            </p>

            <h2 className="text-xl font-black mt-2">
              Become an AlphaBot seller.
            </h2>

            <p className="text-xs opacity-60 mt-2 leading-5">
              Create your seller profile and submit it for verification.
              Verified sellers can list products on the marketplace.
            </p>

          </div>

        </section>

        <section className="mt-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] font-black text-zinc-500">
                SELLER STATUS
              </p>

              <h2 className="text-lg font-black mt-1">
                {status}
              </h2>

            </div>

            <div
              className={`px-3 py-1.5 rounded-xl text-[9px] font-black ${
                verified
                  ? "bg-green-500 text-white"
                  : pending
                  ? "bg-yellow-400 text-black"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            >
              {verified ? "VERIFIED" : pending ? "PENDING" : "NOT ACTIVE"}
            </div>

          </div>

        </section>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <div>
            <label className="text-xs font-black">
              Business / Store name
            </label>

            <input
              value={form.storeName}
              onChange={(e) => updateField("storeName", e.target.value)}
              placeholder="e.g. Marvelous Gadgets"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs font-black">
              Business phone number
            </label>

            <input
              value={form.businessPhone}
              onChange={(e) => updateField("businessPhone", e.target.value)}
              placeholder="080..."
              inputMode="tel"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs font-black">
              About your store
            </label>

            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Tell buyers what you sell..."
              rows={4}
              className="mt-2 w-full rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4 text-sm outline-none focus:border-yellow-400 resize-none"
            />
          </div>

          {!verified && (
            <button
              type="submit"
              disabled={pending}
              className="w-full h-12 rounded-2xl bg-yellow-400 text-black text-xs font-black active:scale-[0.98] transition disabled:opacity-50"
            >
              {pending ? "Application submitted ✓" : "Submit for verification →"}
            </button>
          )}

        </form>

        {verified && (
          <section className="mt-5 grid grid-cols-2 gap-3">

            <Link
              href="/marketplace/seller/products"
              className="h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs font-black active:scale-[0.98] transition"
            >
              📦 My products
            </Link>

            <Link
              href="/marketplace/seller/products/new"
              className="h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xs font-black active:scale-[0.98] transition"
            >
              + Add product
            </Link>

          </section>
        )}

        <section className="mt-6 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4">

          <p className="text-xs font-black">
            🔐 Seller verification
          </p>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            AlphaBot reviews seller applications before products can be
            published. Unverified sellers cannot list products.
          </p>

        </section>

      </div>

        {/* EARNINGS */}

        {verified && (
          <section className="mt-6 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">

            <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
              SELLER EARNINGS
            </p>

            <div className="mt-3">
              <p className="text-3xl font-black">
                ₦{Number(
                  earnings?.earnings?.total || 0
                ).toLocaleString()}
              </p>

              <p className="text-[10px] text-zinc-500 mt-1">
                Total marketplace earnings
              </p>
            </div>

          </section>
        )}

        {/* PAYOUT ACCOUNT */}

        {verified && (
          <section className="mt-4 rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-500">
                  PAYOUT ACCOUNT
                </p>

                <h2 className="text-lg font-black mt-1">
                  Receive your earnings
                </h2>
              </div>

              {payout?.verified && (
                <span className="text-[9px] font-black bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg">
                  VERIFIED
                </span>
              )}

            </div>

            <form onSubmit={savePayout} className="mt-4 space-y-3">

              <input
                value={payoutForm.bankName}
                onChange={(e) =>
                  setPayoutForm((current) => ({
                    ...current,
                    bankName: e.target.value,
                  }))
                }
                placeholder="Bank name"
                className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 text-xs outline-none focus:border-yellow-400"
              />

              <input
                value={payoutForm.bankCode}
                onChange={(e) =>
                  setPayoutForm((current) => ({
                    ...current,
                    bankCode: e.target.value,
                  }))
                }
                placeholder="Bank code"
                inputMode="numeric"
                className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 text-xs outline-none focus:border-yellow-400"
              />

              <input
                value={payoutForm.accountNumber}
                onChange={(e) =>
                  setPayoutForm((current) => ({
                    ...current,
                    accountNumber: e.target.value,
                  }))
                }
                placeholder="Account number"
                inputMode="numeric"
                className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 text-xs outline-none focus:border-yellow-400"
              />

              <input
                value={payoutForm.accountName}
                onChange={(e) =>
                  setPayoutForm((current) => ({
                    ...current,
                    accountName: e.target.value,
                  }))
                }
                placeholder="Account name"
                className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 text-xs outline-none focus:border-yellow-400"
              />

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-yellow-400 text-black text-xs font-black active:scale-[0.98] transition"
              >
                {payout ? "Update payout account" : "Save payout account"} →
              </button>

            </form>

            <p className="text-[9px] text-zinc-500 mt-3 leading-4">
              Your payout account must be verified before marketplace earnings
              can be paid out.
            </p>

          </section>
        )}

    </main>
  );
}
