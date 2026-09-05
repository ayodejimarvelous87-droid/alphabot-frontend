"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://api.alphabothq.com";

const DEFAULT_SETTINGS = {
  cnyToNgnRate: 0,
  fxSafetyPercent: 0,
  fulfillmentPercent: 0,
  shippingMode: "percentage",
  shippingCostPerKgNgn: 0,
  minimumShippingCostNgn: 0,
  customsPercent: 0,
  marginPercent: 0,
  minimumSellingPriceNgn: 0,
  priceRoundingNgn: 100,
  active: true,
};

export default function AdminChinaPricingPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const getToken = () =>
    localStorage.getItem("adminToken");

  const loadSettings = async () => {
    const token = getToken();

    if (!token) {
      setError("Admin session expired. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/admin/china/pricing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to load China pricing settings."
        );
      }

      setSettings({
        ...DEFAULT_SETTINGS,
        ...(data.settings || {}),
      });
    } catch (err) {
      console.error(
        "ADMIN CHINA PRICING LOAD ERROR:",
        err
      );
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
    setMessage("");
  };

  const saveSettings = async () => {
    const token = getToken();

    if (!token) {
      setError("Admin session expired. Please log in again.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE}/admin/china/pricing`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save China pricing settings."
        );
      }

      setSettings({
        ...DEFAULT_SETTINGS,
        ...(data.settings || {}),
      });

      setMessage("China pricing settings saved successfully.");
    } catch (err) {
      console.error("ADMIN CHINA PRICING SAVE ERROR:", err);
      setError(err.message || "Unable to save China pricing settings.");
    } finally {
      setSaving(false);
    }
  };

  const protectedRate =
    Number(settings.cnyToNgnRate || 0) *
    (1 + Number(settings.fxSafetyPercent || 0) / 100);

  const productCost =
    100 * protectedRate;

  const fulfillmentCost =
    settings.shippingMode === "weight_based"
      ? Math.max(
          0.5 * Number(settings.shippingCostPerKgNgn || 0),
          Number(settings.minimumShippingCostNgn || 0)
        )
      : productCost *
        (Number(settings.fulfillmentPercent || 0) / 100);

  const customsCost =
    productCost *
    (Number(settings.customsPercent || 0) / 100);

  const landedCost =
    productCost + fulfillmentCost + customsCost;

  const marginAmount =
    landedCost *
    (Number(settings.marginPercent || 0) / 100);

  const rawPrice =
    landedCost + marginAmount;

  const protectedPrice = Math.max(
    rawPrice,
    Number(settings.minimumSellingPriceNgn || 0)
  );

  const rounding =
    Number(settings.priceRoundingNgn || 1) > 0
      ? Number(settings.priceRoundingNgn)
      : 1;

  const previewSellingPrice =
    Math.ceil(protectedPrice / rounding) * rounding;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#09090b] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-zinc-500">
            Loading China pricing...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        <header className="mb-8">
          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-400">
            CHINA MARKETPLACE
          </p>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-1">
            Pricing Control
          </h1>

          <p className="text-sm text-zinc-500 mt-3 max-w-2xl">
            Configure how AlphaBot converts 1688 supplier
            costs into customer-facing Nigerian prices.
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-2xl border border-green-900/50 bg-green-950/20 p-4 text-sm text-green-300">
            {message}
          </div>
        )}

        <div className="grid xl:grid-cols-[1fr_380px] gap-6">

          <div className="space-y-6">

            {/* CURRENCY & FX */}
            <section className="rounded-3xl border border-zinc-800 bg-[#101012] p-5 md:p-6">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                💱 CURRENCY & FX
              </p>

              <div className="grid md:grid-cols-2 gap-5 mt-5">
                <label>
                  <span className="text-xs font-bold text-zinc-400">
                    CNY → NGN Rate
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={settings.cnyToNgnRate}
                    onChange={(e) =>
                      updateSetting("cnyToNgnRate", e.target.value)
                    }
                    className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                  />
                </label>

                <label>
                  <span className="text-xs font-bold text-zinc-400">
                    FX Safety Buffer (%)
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={settings.fxSafetyPercent}
                    onChange={(e) =>
                      updateSetting("fxSafetyPercent", e.target.value)
                    }
                    className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                  />
                </label>
              </div>
            </section>

            {/* FULFILLMENT */}
            <section className="rounded-3xl border border-zinc-800 bg-[#101012] p-5 md:p-6">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                🚚 FULFILLMENT
              </p>

              <div className="grid md:grid-cols-2 gap-5 mt-5">
                <label>
                  <span className="text-xs font-bold text-zinc-400">
                    Shipping Mode
                  </span>

                  <select
                    value={settings.shippingMode}
                    onChange={(e) =>
                      updateSetting("shippingMode", e.target.value)
                    }
                    className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="weight_based">Weight Based</option>
                  </select>
                </label>

                {settings.shippingMode === "percentage" ? (
                  <label>
                    <span className="text-xs font-bold text-zinc-400">
                      Fulfillment Allowance (%)
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={settings.fulfillmentPercent}
                      onChange={(e) =>
                        updateSetting("fulfillmentPercent", e.target.value)
                      }
                      className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                    />
                  </label>
                ) : (
                  <>
                    <label>
                      <span className="text-xs font-bold text-zinc-400">
                        Shipping / KG (₦)
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={settings.shippingCostPerKgNgn}
                        onChange={(e) =>
                          updateSetting(
                            "shippingCostPerKgNgn",
                            e.target.value
                          )
                        }
                        className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                      />
                    </label>

                    <label>
                      <span className="text-xs font-bold text-zinc-400">
                        Minimum Shipping (₦)
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={settings.minimumShippingCostNgn}
                        onChange={(e) =>
                          updateSetting(
                            "minimumShippingCostNgn",
                            e.target.value
                          )
                        }
                        className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                      />
                    </label>
                  </>
                )}
              </div>
            </section>

            {/* CUSTOMS & MARGIN */}
            <section className="rounded-3xl border border-zinc-800 bg-[#101012] p-5 md:p-6">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                🛃 CUSTOMS & MARGIN
              </p>

              <div className="grid md:grid-cols-2 gap-5 mt-5">
                <label>
                  <span className="text-xs font-bold text-zinc-400">
                    Customs / Import Allowance (%)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={settings.customsPercent}
                    onChange={(e) =>
                      updateSetting("customsPercent", e.target.value)
                    }
                    className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                  />
                </label>

                <label>
                  <span className="text-xs font-bold text-zinc-400">
                    AlphaBot Margin (%)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={settings.marginPercent}
                    onChange={(e) =>
                      updateSetting("marginPercent", e.target.value)
                    }
                    className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                  />
                </label>
              </div>
            </section>

            {/* CUSTOMER PRICE */}
            <section className="rounded-3xl border border-zinc-800 bg-[#101012] p-5 md:p-6">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                💰 CUSTOMER PRICE
              </p>

              <div className="grid md:grid-cols-2 gap-5 mt-5">
                <label>
                  <span className="text-xs font-bold text-zinc-400">
                    Minimum Selling Price (₦)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={settings.minimumSellingPriceNgn}
                    onChange={(e) =>
                      updateSetting(
                        "minimumSellingPriceNgn",
                        e.target.value
                      )
                    }
                    className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                  />
                </label>

                <label>
                  <span className="text-xs font-bold text-zinc-400">
                    Price Rounding (₦)
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={settings.priceRoundingNgn}
                    onChange={(e) =>
                      updateSetting("priceRoundingNgn", e.target.value)
                    }
                    className="w-full mt-2 rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 outline-none focus:border-yellow-400"
                  />
                </label>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#09090b] px-4 py-4">
                <div>
                  <p className="text-xs font-bold">Pricing Engine</p>
                  <p className="text-[10px] text-zinc-600 mt-1">
                    Enable or pause China customer pricing.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateSetting("active", !settings.active)
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-black ${
                    settings.active
                      ? "bg-green-500/15 text-green-400 border border-green-500/30"
                      : "bg-red-500/15 text-red-400 border border-red-500/30"
                  }`}
                >
                  {settings.active ? "● ACTIVE" : "○ PAUSED"}
                </button>
              </div>
            </section>

            <button
              type="button"
              onClick={saveSettings}
              disabled={saving}
              className="w-full rounded-2xl bg-yellow-400 text-black py-4 font-black text-sm hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {saving ? "SAVING..." : "SAVE CHINA PRICING"}
            </button>

          </div>

          <aside className="xl:sticky xl:top-6 h-fit">
            <section className="rounded-3xl border border-zinc-800 bg-[#101012] p-5 md:p-6">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                🧮 LIVE PRICE PREVIEW
              </p>

              <p className="text-xs text-zinc-500 mt-2">
                Example using ¥100 supplier cost and 0.5 KG.
              </p>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Protected FX</span>
                  <span>₦{protectedRate.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Product Cost</span>
                  <span>₦{productCost.toLocaleString("en-NG")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Fulfillment</span>
                  <span>₦{fulfillmentCost.toLocaleString("en-NG")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Customs</span>
                  <span>₦{customsCost.toLocaleString("en-NG")}</span>
                </div>

                <div className="border-t border-zinc-800 pt-3 flex justify-between font-bold">
                  <span>Landed Cost</span>
                  <span>₦{landedCost.toLocaleString("en-NG")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">AlphaBot Margin</span>
                  <span>₦{marginAmount.toLocaleString("en-NG")}</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-yellow-400 text-black p-5">
                <p className="text-[9px] font-black uppercase tracking-wider opacity-60">
                  CUSTOMER PRICE
                </p>
                <p className="text-3xl font-black mt-1">
                  ₦{previewSellingPrice.toLocaleString("en-NG")}
                </p>
              </div>
            </section>
          </aside>

        </div>
      </div>
    </main>
  );
}
