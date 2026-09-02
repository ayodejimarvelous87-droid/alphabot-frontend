"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MARKETPLACE_CATEGORY_NAMES } from "@/lib/marketplaceCategories";

const BUSINESS_TYPES = [
  "Individual",
  "Sole Proprietorship",
  "Partnership",
  "Limited Company",
  "Other",
];

const ROLES = [
  "Owner",
  "Director",
  "Manager",
  "Staff",
  "Other",
];

const emptyForm = {
  name: "",
  phone: "",
  whatsappPhone: "",
  email: "",

  storeName: "",
  businessType: "",
  yearEstablished: "",
  businessPhone: "",
  fullName: "",
  roleInBusiness: "",
  alternativePhone: "",

  businessAddress: {
    city: "",
    state: "",
    country: "Nigeria",
  },

  primaryCategory: MARKETPLACE_CATEGORY_NAMES[0] || "",
  stockAvailability: "",
  stockQuantity: "",
  productAvailability: "",
  processingTime: "",
  returnPolicy: "",
  returnPolicyDetails: "",

  accountName: "",
  accountNumber: "",
  bankName: "",
  preferredPayoutTiming: "",
};

export default function SellerSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to access Seller Settings.");
        setLoading(false);
        return;
      }

      const res = await fetch(
        "https://api.alphabothq.com/marketplace/sellers/settings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Unable to load seller settings.");
        setLoading(false);
        return;
      }

      const user = data.user || {};
      const seller = data.seller || {};
      const address = seller.businessAddress || {};
      const payout = seller.payout || {};

      setForm({
        name: user.name || "",
        phone: user.phone || "",
        whatsappPhone: user.whatsappPhone || "",
        email: user.email || seller.email || "",

        storeName: seller.storeName || "",
        businessType: seller.businessType || "",
        yearEstablished: seller.yearEstablished || "",
        businessPhone: seller.businessPhone || "",
        fullName: seller.fullName || "",
        roleInBusiness: seller.roleInBusiness || "",
        alternativePhone: seller.alternativePhone || "",

        businessAddress: {
          city: address.city || "",
          state: address.state || "",
          country: address.country || "Nigeria",
        },

        primaryCategory:
          seller.primaryCategory ||
          MARKETPLACE_CATEGORY_NAMES[0] ||
          "",
        stockAvailability: seller.stockAvailability || "",
        stockQuantity: seller.stockQuantity ?? "",
        productAvailability: seller.productAvailability || "",
        processingTime: seller.processingTime || "",
        returnPolicy: seller.returnPolicy || "",
        returnPolicyDetails: seller.returnPolicyDetails || "",

        accountName: payout.accountName || "",
        accountNumber: payout.accountNumber || "",
        bankName: payout.bankName || "",
        preferredPayoutTiming: seller.preferredPayoutTiming || "",
      });
    } catch (err) {
      console.error("SELLER SETTINGS LOAD ERROR:", err);
      setError("Unable to load seller settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load seller settings from the external API on page mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSettings();
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setMessage("");
    setError("");
  };

  const updateAddress = (field, value) => {
    setForm((current) => ({
      ...current,
      businessAddress: {
        ...current.businessAddress,
        [field]: value,
      },
    }));
    setMessage("");
    setError("");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white">
        <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
            <Link
              href="/marketplace/seller"
              className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center"
            >
              ←
            </Link>
            <div>
              <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
                ALPHABOT
              </p>
              <h1 className="font-black text-sm">Seller Settings</h1>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <p className="text-sm font-bold">Loading settings...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-16">
      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
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
            <h1 className="font-black text-sm">Seller Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4">
        <section className="mt-5">
          <div className="rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-black p-5">
            <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-400 dark:text-yellow-600">
              SELLER CENTER
            </p>

            <h2 className="text-xl font-black mt-2">
              Manage your seller account.
            </h2>

            <p className="text-xs opacity-60 mt-2 leading-5">
              Update your account, store, business, operations and payout
              preferences from one place.
            </p>
          </div>
        </section>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 p-4 text-xs font-bold text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-4 rounded-2xl border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-950/20 p-4 text-xs font-bold text-green-600 dark:text-green-400">
            ✓ {message}
          </div>
        )}

        <form className="mt-5 space-y-5">
          {/* ACCOUNT */}
          <section className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">
            <p className="text-[9px] uppercase tracking-[0.18em] font-black text-yellow-500">
              ACCOUNT
            </p>

            <h3 className="text-lg font-black mt-1">
              👤 Account Information
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-black">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">Phone number</label>
                <input
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  required
                  inputMode="tel"
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">
                  WhatsApp number
                  <span className="ml-2 text-[10px] text-zinc-400">
                    Optional
                  </span>
                </label>

                <input
                  value={form.whatsappPhone}
                  onChange={(e) =>
                    updateField("whatsappPhone", e.target.value)
                  }
                  inputMode="tel"
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">Email address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                  className="settings-input"
                />
              </div>
            </div>
          </section>

          {/* STORE */}
          <section className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">
            <p className="text-[9px] uppercase tracking-[0.18em] font-black text-yellow-500">
              STORE
            </p>

            <h3 className="text-lg font-black mt-1">
              🏪 Store & Business
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-black">Store name</label>
                <input
                  value={form.storeName}
                  onChange={(e) =>
                    updateField("storeName", e.target.value)
                  }
                  required
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">Business type</label>
                <select
                  value={form.businessType}
                  onChange={(e) =>
                    updateField("businessType", e.target.value)
                  }
                  required
                  className="settings-input"
                >
                  <option value="">Select business type</option>
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-black">
                  Year established
                </label>
                <input
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                  value={form.yearEstablished}
                  onChange={(e) =>
                    updateField("yearEstablished", e.target.value)
                  }
                  required
                  inputMode="numeric"
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">
                  Business phone
                </label>
                <input
                  value={form.businessPhone}
                  onChange={(e) =>
                    updateField("businessPhone", e.target.value)
                  }
                  required
                  inputMode="tel"
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">Full name</label>
                <input
                  value={form.fullName}
                  onChange={(e) =>
                    updateField("fullName", e.target.value)
                  }
                  required
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">
                  Role in business
                </label>

                <select
                  value={form.roleInBusiness}
                  onChange={(e) =>
                    updateField("roleInBusiness", e.target.value)
                  }
                  required
                  className="settings-input"
                >
                  <option value="">Select role</option>
                  {ROLES.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-black">
                  Alternative phone
                  <span className="ml-2 text-[10px] text-zinc-400">
                    Optional
                  </span>
                </label>

                <input
                  value={form.alternativePhone}
                  onChange={(e) =>
                    updateField("alternativePhone", e.target.value)
                  }
                  inputMode="tel"
                  className="settings-input"
                />
              </div>
            </div>
          </section>

          {/* ADDRESS */}
          <section className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">
            <p className="text-[9px] uppercase tracking-[0.18em] font-black text-yellow-500">
              LOCATION
            </p>

            <h3 className="text-lg font-black mt-1">
              📍 Business Address
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <input
                placeholder="City"
                value={form.businessAddress.city}
                onChange={(e) =>
                  updateAddress("city", e.target.value)
                }
                required
                className="settings-input"
              />

              <input
                placeholder="State"
                value={form.businessAddress.state}
                onChange={(e) =>
                  updateAddress("state", e.target.value)
                }
                required
                className="settings-input"
              />

              <input
                placeholder="Country"
                value={form.businessAddress.country}
                onChange={(e) =>
                  updateAddress("country", e.target.value)
                }
                required
                className="settings-input col-span-2"
              />
            </div>
          </section>

          {/* OPERATIONS */}
          <section className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">
            <p className="text-[9px] uppercase tracking-[0.18em] font-black text-yellow-500">
              OPERATIONS
            </p>

            <h3 className="text-lg font-black mt-1">
              📦 Products & Operations
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-black">
                  Primary category
                </label>

                <select
                  value={form.primaryCategory}
                  onChange={(e) =>
                    updateField("primaryCategory", e.target.value)
                  }
                  required
                  className="settings-input"
                >
                  {MARKETPLACE_CATEGORY_NAMES.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-black">
                  Stock availability
                </label>

                <select
                  value={form.stockAvailability}
                  onChange={(e) => {
                    const value = e.target.value;

                    setForm((current) => ({
                      ...current,
                      stockAvailability: value,
                      stockQuantity:
                        value === "Limited stock"
                          ? current.stockQuantity
                          : "",
                    }));

                    setMessage("");
                    setError("");
                  }}
                  required
                  className="settings-input"
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
                  <label className="text-xs font-black">
                    Current stock quantity
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={form.stockQuantity}
                    onChange={(e) =>
                      updateField("stockQuantity", e.target.value)
                    }
                    required
                    inputMode="numeric"
                    className="settings-input"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-black">
                  Product availability
                </label>

                <select
                  value={form.productAvailability}
                  onChange={(e) =>
                    updateField(
                      "productAvailability",
                      e.target.value
                    )
                  }
                  required
                  className="settings-input"
                >
                  <option value="">Select availability</option>
                  <option value="Available now">Available now</option>
                  <option value="Imported / Coming soon">
                    Imported / Coming soon
                  </option>
                  <option value="Made-to-order">
                    Made-to-order
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black">
                  Processing time
                </label>

                <select
                  value={form.processingTime}
                  onChange={(e) =>
                    updateField("processingTime", e.target.value)
                  }
                  required
                  className="settings-input"
                >
                  <option value="">Select processing time</option>
                  <option value="Same day">Same day</option>
                  <option value="1–2 days">1–2 days</option>
                  <option value="3–5 days">3–5 days</option>
                  <option value="1 week+">1 week+</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black">
                  Return policy
                </label>

                <select
                  value={form.returnPolicy}
                  onChange={(e) =>
                    updateField("returnPolicy", e.target.value)
                  }
                  required
                  className="settings-input"
                >
                  <option value="">Select return policy</option>
                  <option value="Accept returns">
                    Accept returns
                  </option>
                  <option value="No returns">No returns</option>
                  <option value="Returns under specific conditions">
                    Returns under specific conditions
                  </option>
                  <option value="Custom policy/details">
                    Custom policy/details
                  </option>
                </select>
              </div>

              {(form.returnPolicy ===
                "Returns under specific conditions" ||
                form.returnPolicy === "Custom policy/details") && (
                <div>
                  <label className="text-xs font-black">
                    Return policy details
                  </label>

                  <textarea
                    value={form.returnPolicyDetails}
                    onChange={(e) =>
                      updateField(
                        "returnPolicyDetails",
                        e.target.value
                      )
                    }
                    rows={4}
                    required
                    className="settings-input resize-none"
                  />
                </div>
              )}
            </div>
          </section>

          {/* PAYOUT */}
          <section className="rounded-3xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">
            <p className="text-[9px] uppercase tracking-[0.18em] font-black text-yellow-500">
              PAYOUT
            </p>

            <h3 className="text-lg font-black mt-1">
              💳 Payout Information
            </h3>

            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
              These details are private and are only used for seller payouts.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-black">
                  Account name
                </label>

                <input
                  value={form.accountName}
                  onChange={(e) =>
                    updateField("accountName", e.target.value)
                  }
                  required
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">
                  Account number
                </label>

                <input
                  value={form.accountNumber}
                  onChange={(e) =>
                    updateField(
                      "accountNumber",
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                    )
                  }
                  required
                  inputMode="numeric"
                  maxLength={10}
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">
                  Bank name
                </label>

                <input
                  value={form.bankName}
                  onChange={(e) =>
                    updateField("bankName", e.target.value)
                  }
                  required
                  className="settings-input"
                />
              </div>

              <div>
                <label className="text-xs font-black">
                  Preferred payout timing
                </label>

                <select
                  value={form.preferredPayoutTiming}
                  onChange={(e) =>
                    updateField(
                      "preferredPayoutTiming",
                      e.target.value
                    )
                  }
                  required
                  className="settings-input"
                >
                  <option value="">Select payout timing</option>
                  <option value="Immediately after successful transaction">
                    Immediately after successful transaction
                  </option>
                  <option value="After 1 week">
                    After 1 week
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* SAVE */}
          <button
            type="button"
            disabled={saving}
            onClick={async () => {
              setMessage("");
              setError("");

              if (
                !form.name.trim() ||
                !form.phone.trim() ||
                !form.email.trim() ||
                !form.storeName.trim() ||
                !form.businessType ||
                !form.yearEstablished ||
                !form.businessPhone.trim() ||
                !form.fullName.trim() ||
                !form.roleInBusiness ||
                !form.businessAddress.city.trim() ||
                !form.businessAddress.state.trim() ||
                !form.businessAddress.country.trim() ||
                !form.primaryCategory ||
                !form.stockAvailability ||
                !form.productAvailability ||
                !form.processingTime ||
                !form.returnPolicy ||
                !form.accountName.trim() ||
                !/^\d{10}$/.test(form.accountNumber) ||
                !form.bankName.trim() ||
                !form.preferredPayoutTiming
              ) {
                setError("Please complete all required fields.");
                return;
              }

              if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
                setError("Please enter a valid email address.");
                return;
              }

              const year = Number(form.yearEstablished);

              if (
                !Number.isInteger(year) ||
                year < 1800 ||
                year > new Date().getFullYear()
              ) {
                setError("Please enter a valid year established.");
                return;
              }

              if (
                form.stockAvailability === "Limited stock" &&
                (form.stockQuantity === "" ||
                  !Number.isInteger(Number(form.stockQuantity)) ||
                  Number(form.stockQuantity) < 0)
              ) {
                setError("Please enter a valid stock quantity.");
                return;
              }

              if (
                (form.returnPolicy ===
                  "Returns under specific conditions" ||
                  form.returnPolicy === "Custom policy/details") &&
                !form.returnPolicyDetails.trim()
              ) {
                setError("Please provide your return policy details.");
                return;
              }

              try {
                setSaving(true);

                const token = localStorage.getItem("token");

                const payload = {
                  name: form.name.trim(),
                  phone: form.phone.trim(),
                  whatsappPhone: form.whatsappPhone.trim(),
                  email: form.email.trim().toLowerCase(),

                  storeName: form.storeName.trim(),
                  businessType: form.businessType,
                  yearEstablished: year,
                  businessPhone: form.businessPhone.trim(),
                  fullName: form.fullName.trim(),
                  roleInBusiness: form.roleInBusiness,
                  alternativePhone: form.alternativePhone.trim(),

                  businessAddress: {
                    city: form.businessAddress.city.trim(),
                    state: form.businessAddress.state.trim(),
                    country: form.businessAddress.country.trim(),
                  },

                  primaryCategory: form.primaryCategory,
                  stockAvailability: form.stockAvailability,
                  stockQuantity:
                    form.stockAvailability === "Limited stock"
                      ? Number(form.stockQuantity)
                      : null,
                  productAvailability: form.productAvailability,
                  processingTime: form.processingTime,
                  returnPolicy: form.returnPolicy,
                  returnPolicyDetails:
                    form.returnPolicyDetails.trim(),

                  accountName: form.accountName.trim(),
                  accountNumber: form.accountNumber,
                  bankName: form.bankName.trim(),
                  preferredPayoutTiming:
                    form.preferredPayoutTiming,
                };

                const res = await fetch(
                  "https://api.alphabothq.com/marketplace/sellers/settings",
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                  }
                );

                const data = await res.json();

                if (!res.ok || !data.success) {
                  setError(
                    data.message ||
                      "Failed to save seller settings."
                  );
                  return;
                }

                setMessage("Settings saved successfully.");
              } catch (err) {
                console.error(
                  "SELLER SETTINGS SAVE ERROR:",
                  err
                );
                setError(
                  "Unable to save settings. Please try again."
                );
              } finally {
                setSaving(false);
              }
            }}
            className="w-full h-14 rounded-2xl bg-yellow-400 text-black font-black text-sm active:scale-[0.98] transition disabled:opacity-60"
          >
            {saving ? "Saving changes..." : "Save Changes"}
          </button>
        </form>

        <section className="mt-5 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-xs font-black">
            🔐 Your seller information is private
          </p>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            Your phone, email, business address and payout information
            are not displayed publicly on your marketplace storefront.
          </p>
        </section>
      </div>

      <style jsx>{`
        .settings-input {
          margin-top: 0.5rem;
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgb(228 228 231);
          background: rgb(250 250 250);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
        }

        .settings-input:focus {
          border-color: rgb(250 204 21);
        }

        :global(.dark) .settings-input {
          border-color: rgb(63 63 70);
          background: rgb(15 15 15);
          color: white;
        }
      `}</style>
    </main>
  );
}
