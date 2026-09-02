"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MARKETPLACE_CATEGORY_NAMES } from "@/lib/marketplaceCategories";

export default function SellerProfilePage() {
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    // Section 1 — Business Information
    storeName: "",
    businessType: "",
    yearEstablished: "",
    businessAddress: {
      city: "",
      state: "",
      country: "Nigeria",
    },

    // Section 2 — Contact Information
    fullName: "",
    roleInBusiness: "",
    businessPhone: "",
    whatsappNumber: "",
    email: "",
    alternativePhone: "",

    // Section 3 — Products & Operations
    primaryCategory: MARKETPLACE_CATEGORY_NAMES[0] || "",
    stockAvailability: "",
    stockQuantity: "",
    productAvailability: "",
    processingTime: "",
    returnPolicy: "",
    returnPolicyDetails: "",

    // Section 4 — Payment Information
    accountName: "",
    accountNumber: "",
    bankName: "",
    preferredPayoutTiming: "",
  });

  const [sameWhatsapp, setSameWhatsapp] = useState(false);
  const [declarations, setDeclarations] = useState({
    accurateInformation: false,
    marketplaceRules: false,
    payoutResponsibility: false,
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
          const seller = data.seller;

          setForm((current) => ({
            ...current,
            storeName: seller.storeName || current.storeName,
            businessPhone: seller.businessPhone || current.businessPhone,
            businessType: seller.businessType || current.businessType,
            yearEstablished: seller.yearEstablished || current.yearEstablished,
            businessAddress: {
              ...current.businessAddress,
              ...(seller.businessAddress || {}),
            },
            fullName: seller.fullName || current.fullName,
            roleInBusiness: seller.roleInBusiness || current.roleInBusiness,
            whatsappNumber: seller.whatsappNumber || current.whatsappNumber,
            email: seller.email || current.email,
            alternativePhone:
              seller.alternativePhone || current.alternativePhone,
            primaryCategory:
              seller.primaryCategory || current.primaryCategory,
            stockAvailability:
              seller.stockAvailability || current.stockAvailability,
            stockQuantity:
              seller.stockQuantity ?? current.stockQuantity,
            productAvailability:
              seller.productAvailability || current.productAvailability,
            processingTime:
              seller.processingTime || current.processingTime,
            returnPolicy:
              seller.returnPolicy || current.returnPolicy,
            returnPolicyDetails:
              seller.returnPolicyDetails || current.returnPolicyDetails,
            accountName:
              seller.payout?.accountName || current.accountName,
            accountNumber:
              seller.payout?.accountNumber || current.accountNumber,
            bankName:
              seller.payout?.bankName || current.bankName,
            preferredPayoutTiming:
              seller.preferredPayoutTiming ||
              current.preferredPayoutTiming,
          }));

          setStatus(seller.status || "Not a seller");
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

  const updateAddressField = (field, value) => {
    setForm((current) => ({
      ...current,
      businessAddress: {
        ...current.businessAddress,
        [field]: value,
      },
    }));
  };

  const updatePhone = (value) => {
    setForm((current) => ({
      ...current,
      businessPhone: value,
      ...(sameWhatsapp ? { whatsappNumber: value } : {}),
    }));
  };

  const handleSameWhatsapp = (checked) => {
    setSameWhatsapp(checked);

    if (checked) {
      setForm((current) => ({
        ...current,
        whatsappNumber: current.businessPhone,
      }));
    }
  };

  const updateDeclaration = (field, checked) => {
    setDeclarations((current) => ({
      ...current,
      [field]: checked,
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
      !form.businessType ||
      !form.yearEstablished ||
      !form.businessAddress.city.trim() ||
      !form.businessAddress.state.trim() ||
      !form.businessAddress.country.trim() ||
      !form.fullName.trim() ||
      !form.roleInBusiness ||
      !form.businessPhone.trim() ||
      !form.primaryCategory ||
      !form.stockAvailability ||
      (form.stockAvailability === "Limited stock" &&
        (form.stockQuantity === "" ||
          Number(form.stockQuantity) < 0 ||
          !Number.isInteger(Number(form.stockQuantity)))) ||
      !form.productAvailability ||
      !form.processingTime ||
      !form.returnPolicy ||
      ((form.returnPolicy === "Returns under specific conditions" ||
        form.returnPolicy === "Custom policy/details") &&
        !form.returnPolicyDetails.trim()) ||
      !form.accountName.trim() ||
      !/^\d{10}$/.test(form.accountNumber) ||
      !form.bankName.trim() ||
      !form.preferredPayoutTiming
    ) {
      alert("Please complete all required seller information.");
      return;
    }

    if (
      !declarations.accurateInformation ||
      !declarations.marketplaceRules ||
      !declarations.payoutResponsibility
    ) {
      alert("Please accept all seller declarations before submitting.");
      return;
    }

    const payload = {
      ...form,
      yearEstablished: Number(form.yearEstablished),
      stockQuantity:
        form.stockAvailability === "Limited stock"
          ? Number(form.stockQuantity)
          : null,
      businessAddress: {
        ...form.businessAddress,
        city: form.businessAddress.city.trim(),
        state: form.businessAddress.state.trim(),
        country: form.businessAddress.country.trim(),
      },
    };

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
          body: JSON.stringify(payload),
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* SECTION 1 */}
          <section className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">
            <p className="text-[9px] uppercase tracking-[0.18em] font-black text-yellow-500">
              SECTION 1
            </p>
            <h3 className="text-lg font-black mt-1">🏪 Business Information</h3>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-black">Business name</label>
                <input
                  value={form.storeName}
                  onChange={(e) => updateField("storeName", e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs font-black">Type of business</label>
                <select
                  value={form.businessType}
                  onChange={(e) => updateField("businessType", e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                >
                  <option value="">Select business type</option>
                  <option>Individual</option>
                  <option>Sole Proprietorship</option>
                  <option>Partnership</option>
                  <option>Limited Company</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black">Year established</label>
                <input
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                  value={form.yearEstablished}
                  onChange={(e) => updateField("yearEstablished", e.target.value)}
                  required
                  inputMode="numeric"
                  className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-black">Business address</label>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <input
                    placeholder="City"
                    value={form.businessAddress.city}
                    onChange={(e) => updateAddressField("city", e.target.value)}
                    required
                    className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                  />

                  <input
                    placeholder="State"
                    value={form.businessAddress.state}
                    onChange={(e) => updateAddressField("state", e.target.value)}
                    required
                    className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                  />

                  <input
                    placeholder="Country"
                    value={form.businessAddress.country}
                    onChange={(e) => updateAddressField("country", e.target.value)}
                    required
                    className="col-span-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">
            <p className="text-[9px] uppercase tracking-[0.18em] font-black text-yellow-500">
              SECTION 2
            </p>
            <h3 className="text-lg font-black mt-1">📞 Contact Information</h3>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-black">Full name</label>
                <input
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-black">Role in business</label>
                <select
                  value={form.roleInBusiness}
                  onChange={(e) => updateField("roleInBusiness", e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                >
                  <option value="">Select role</option>
                  <option>Owner</option>
                  <option>Director</option>
                  <option>Manager</option>
                  <option>Staff</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black">Phone number</label>
                <input
                  value={form.businessPhone}
                  onChange={(e) => updatePhone(e.target.value)}
                  required
                  inputMode="tel"
                  placeholder="080..."
                  className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-black">
                  WhatsApp number
                  <span className="ml-2 text-[10px] text-zinc-400">Optional</span>
                </label>

                <input
                  value={form.whatsappNumber}
                  onChange={(e) => updateField("whatsappNumber", e.target.value)}
                  disabled={sameWhatsapp}
                  inputMode="tel"
                  placeholder="WhatsApp number"
                  className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm disabled:opacity-50"
                />

                <label className="mt-3 flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={sameWhatsapp}
                    onChange={(e) => handleSameWhatsapp(e.target.checked)}
                    className="accent-yellow-400"
                  />
                  Same as phone number
                </label>
              </div>

              <div>
                <label className="text-xs font-black">Email address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-black">
                  Alternative phone
                  <span className="ml-2 text-[10px] text-zinc-400">Optional</span>
                </label>
                <input
                  value={form.alternativePhone}
                  onChange={(e) => updateField("alternativePhone", e.target.value)}
                  inputMode="tel"
                  placeholder="Alternative phone number"
                  className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm"
                />
              </div>
            </div>
          </section>


          {/* Section 3 — Products & Operations */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <h3 className="text-lg font-semibold">📦 Products & Operations</h3>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Primary category</label>
                <select
                  value={form.primaryCategory}
                  onChange={(e) => updateField("primaryCategory", e.target.value)}
                  className="mt-1 w-full rounded-xl border p-3"
                  required
                >
                  {MARKETPLACE_CATEGORY_NAMES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Stock availability</label>
                <select
                  value={form.stockAvailability}
                  onChange={(e) => updateField("stockAvailability", e.target.value)}
                  className="mt-1 w-full rounded-xl border p-3"
                  required
                >
                  <option value="">Select stock availability</option>
                  <option value="Limited stock">Limited stock</option>
                  <option value="Unlimited / Made-to-order">
                    Unlimited / Made-to-order
                  </option>
                </select>
              </div>

              {form.stockAvailability === "Limited stock" && (
                <div>
                  <label className="block text-sm font-medium">
                    Current stock quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={form.stockQuantity}
                    onChange={(e) => updateField("stockQuantity", e.target.value)}
                    className="mt-1 w-full rounded-xl border p-3"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium">Product availability</label>
                <select
                  value={form.productAvailability}
                  onChange={(e) => updateField("productAvailability", e.target.value)}
                  className="mt-1 w-full rounded-xl border p-3"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="Available now">Available now</option>
                  <option value="Imported / Coming soon">
                    Imported / Coming soon
                  </option>
                  <option value="Made-to-order">Made-to-order</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Order processing time
                </label>
                <select
                  value={form.processingTime}
                  onChange={(e) => updateField("processingTime", e.target.value)}
                  className="mt-1 w-full rounded-xl border p-3"
                  required
                >
                  <option value="">Select processing time</option>
                  <option value="Same day">Same day</option>
                  <option value="1–2 days">1–2 days</option>
                  <option value="3–5 days">3–5 days</option>
                  <option value="1 week+">1 week+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Return policy</label>
                <select
                  value={form.returnPolicy}
                  onChange={(e) => updateField("returnPolicy", e.target.value)}
                  className="mt-1 w-full rounded-xl border p-3"
                  required
                >
                  <option value="">Select return policy</option>
                  <option value="Accept returns">Accept returns</option>
                  <option value="No returns">No returns</option>
                  <option value="Returns under specific conditions">
                    Returns under specific conditions
                  </option>
                  <option value="Custom policy/details">
                    Custom policy/details
                  </option>
                </select>
              </div>

              {(form.returnPolicy === "Returns under specific conditions" ||
                form.returnPolicy === "Custom policy/details") && (
                <div>
                  <label className="block text-sm font-medium">
                    Return policy details
                  </label>
                  <textarea
                    value={form.returnPolicyDetails}
                    onChange={(e) =>
                      updateField("returnPolicyDetails", e.target.value)
                    }
                    className="mt-1 w-full rounded-xl border p-3"
                    rows={3}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 4 — Payment Information */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <h3 className="text-lg font-semibold">💳 Payment Information</h3>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Account name"
                value={form.accountName}
                onChange={(e) => updateField("accountName", e.target.value)}
                className="w-full rounded-xl border p-3"
                required
              />

              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                placeholder="Account number"
                value={form.accountNumber}
                onChange={(e) =>
                  updateField(
                    "accountNumber",
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                className="w-full rounded-xl border p-3"
                required
              />

              <input
                type="text"
                placeholder="Bank name"
                value={form.bankName}
                onChange={(e) => updateField("bankName", e.target.value)}
                className="w-full rounded-xl border p-3"
                required
              />

              <div>
                <label className="block text-sm font-medium">
                  Preferred payout timing
                </label>
                <select
                  value={form.preferredPayoutTiming}
                  onChange={(e) =>
                    updateField("preferredPayoutTiming", e.target.value)
                  }
                  className="mt-1 w-full rounded-xl border p-3"
                  required
                >
                  <option value="">Select payout timing</option>
                  <option value="Immediately after successful transaction">
                    Immediately after successful transaction
                  </option>
                  <option value="After 1 week">After 1 week</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 5 — Seller Declaration */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <h3 className="text-lg font-semibold">📝 Seller Declaration</h3>

            <div className="mt-4 space-y-3">
              <label className="flex gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={declarations.accurateInformation}
                  onChange={(e) =>
                    updateDeclaration("accurateInformation", e.target.checked)
                  }
                />
                <span>I confirm that the information provided is accurate.</span>
              </label>

              <label className="flex gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={declarations.marketplaceRules}
                  onChange={(e) =>
                    updateDeclaration("marketplaceRules", e.target.checked)
                  }
                />
                <span>I agree to follow AlphaBot Marketplace rules.</span>
              </label>

              <label className="flex gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={declarations.payoutResponsibility}
                  onChange={(e) =>
                    updateDeclaration("payoutResponsibility", e.target.checked)
                  }
                />
                <span>I accept responsibility for the payout information provided.</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white"
          >
            Submit Seller Application
          </button>
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
