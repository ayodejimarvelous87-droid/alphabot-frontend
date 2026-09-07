"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://api.alphabothq.com";

export default function ABMarketplaceSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validatedAddress, setValidatedAddress] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    enabled: true,
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "NG"
  });

  const loadSettings = async () => {
    try {
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      const response = await fetch(
        `${API_BASE}/admin/ab-marketplace/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load AB Marketplace settings."
        );
      }

      const pickup = data.settings?.pickupAddress || {};

      setForm({
        enabled: Boolean(data.settings?.enabled),
        name: pickup.name || "",
        phone: pickup.phone || "",
        email: pickup.email || "",
        address: pickup.address || "",
        city: pickup.city || "",
        state: pickup.state || "",
        country: pickup.country || "NG"
      });
    } catch (err) {
      console.error("AB MARKETPLACE SETTINGS LOAD ERROR:", err);
      setError(err.message || "Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          throw new Error("Admin authentication token not found.");
        }

        const response = await fetch(
          `${API_BASE}/admin/ab-marketplace/settings`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to load AB Marketplace settings."
          );
        }

        if (cancelled) {
          return;
        }

        const pickup = data.settings?.pickupAddress || {};

        setForm({
          enabled: Boolean(data.settings?.enabled),
          name: pickup.name || "",
          phone: pickup.phone || "",
          email: pickup.email || "",
          address: pickup.address || "",
          city: pickup.city || "",
          state: pickup.state || "",
          country: pickup.country || "NG"
        });
      } catch (err) {
        if (!cancelled) {
          console.error(
            "AB MARKETPLACE SETTINGS LOAD ERROR:",
            err
          );
          setError(
            err.message || "Failed to load settings."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));

    setValidatedAddress(null);
    setMessage("");
    setError("");
  };

  const validateAddress = async () => {
    try {
      setValidating(true);
      setMessage("");
      setError("");
      setValidatedAddress(null);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      const response = await fetch(
        `${API_BASE}/admin/ab-marketplace/settings/validate-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Shipbubble could not validate this pickup address."
        );
      }

      const validationData = data.validation?.data || {};

      setValidatedAddress({
        addressCode: data.addressCode,
        ...validationData
      });

      setMessage(
        "Address validated successfully by Shipbubble. Review the details below before saving."
      );
    } catch (err) {
      console.error(
        "AB MARKETPLACE ADDRESS VALIDATION ERROR:",
        err
      );
      setError(
        err.message ||
          "Failed to validate pickup address."
      );
    } finally {
      setValidating(false);
    }
  };

  const saveSettings = async (event) => {
    event.preventDefault();

    if (!validatedAddress?.addressCode) {
      setError(
        "Please validate the pickup address with Shipbubble before saving."
      );
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      const response = await fetch(
        `${API_BASE}/admin/ab-marketplace/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save AB Marketplace settings."
        );
      }

      const pickup = data.settings?.pickupAddress || {};

      setForm({
        enabled: Boolean(data.settings?.enabled),
        name: pickup.name || "",
        phone: pickup.phone || "",
        email: pickup.email || "",
        address: pickup.address || "",
        city: pickup.city || "",
        state: pickup.state || "",
        country: pickup.country || "NG"
      });

      setValidatedAddress({
        addressCode: pickup.addressCode,
        ...pickup
      });

      setMessage(
        "✓ Validated pickup address saved successfully."
      );
    } catch (err) {
      console.error(
        "AB MARKETPLACE SETTINGS SAVE ERROR:",
        err
      );
      setError(
        err.message ||
          "Failed to save settings."
      );
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-900 dark:text-white p-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold text-zinc-500">
            Loading AB Marketplace settings...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-900 dark:text-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.18em] font-black text-yellow-500">
            Official Marketplace
          </p>

          <h1 className="text-2xl md:text-3xl font-black mt-1">
            AB Marketplace
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Manage the official AlphaBot Marketplace pickup location
            used for customer orders.
          </p>
        </div>

        <form onSubmit={saveSettings} className="space-y-5">
          <section className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-black">
                  Marketplace Status
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Control whether AB Marketplace products can be
                  purchased.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  updateField("enabled", !form.enabled)
                }
                className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                  form.enabled
                    ? "bg-green-500 text-white"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {form.enabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          </section>

          <section className="rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-5">
            <div className="mb-5">
              <h2 className="font-black">
                Pickup Address
              </h2>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-5">
                This is the address Shipbubble will use when
                fulfilling AB Marketplace orders. The address is
                validated before it is saved.
              </p>
            </div>

            <div className="grid gap-4">
              <Field
                label="Pickup Name"
                value={form.name}
                onChange={(value) =>
                  updateField("name", value)
                }
                placeholder="Name of person/business at pickup"
              />

              <Field
                label="Phone"
                value={form.phone}
                onChange={(value) =>
                  updateField("phone", value)
                }
                placeholder="080..."
                type="tel"
              />

              <Field
                label="Email"
                value={form.email}
                onChange={(value) =>
                  updateField("email", value)
                }
                placeholder="pickup@example.com"
                type="email"
              />

              <Field
                label="Address"
                value={form.address}
                onChange={(value) =>
                  updateField("address", value)
                }
                placeholder="Full pickup street address"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="City"
                  value={form.city}
                  onChange={(value) =>
                    updateField("city", value)
                  }
                  placeholder="City"
                />

                <Field
                  label="State"
                  value={form.state}
                  onChange={(value) =>
                    updateField("state", value)
                  }
                  placeholder="State"
                />
              </div>

              <Field
                label="Country"
                value={form.country}
                onChange={(value) =>
                  updateField("country", value.toUpperCase())
                }
                placeholder="NG"
              />
            </div>
          </section>

          {validatedAddress && (
            <section className="rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20 p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-black shrink-0">
                  ✓
                </div>

                <div className="min-w-0">
                  <h2 className="font-black text-green-700 dark:text-green-400">
                    Address Validated by Shipbubble
                  </h2>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Review the validated information below before saving.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                <ReviewField
                  label="Shipbubble Address Code"
                  value={validatedAddress.addressCode}
                />

                <ReviewField
                  label="Name"
                  value={
                    validatedAddress.name ||
                    form.name
                  }
                />

                <ReviewField
                  label="Phone"
                  value={
                    validatedAddress.phone ||
                    form.phone
                  }
                />

                <ReviewField
                  label="Email"
                  value={
                    validatedAddress.email ||
                    form.email
                  }
                />

                <div className="md:col-span-2">
                  <ReviewField
                    label="Address"
                    value={
                      validatedAddress.address ||
                      form.address
                    }
                  />
                </div>

                <ReviewField
                  label="City"
                  value={
                    validatedAddress.city ||
                    form.city
                  }
                />

                <ReviewField
                  label="State"
                  value={
                    validatedAddress.state ||
                    form.state
                  }
                />

                <ReviewField
                  label="Country"
                  value={
                    validatedAddress.country ||
                    form.country
                  }
                />
              </div>
            </section>
          )}

          {message && (
            <div className="rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 p-4 text-sm font-bold">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 p-4 text-sm font-bold">
              {error}
            </div>
          )}

          {!validatedAddress ? (
            <button
              type="button"
              onClick={validateAddress}
              disabled={validating}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black rounded-xl py-3.5 font-black text-sm active:scale-[0.99] transition disabled:opacity-60"
            >
              {validating
                ? "Validating with Shipbubble..."
                : "Validate Address with Shipbubble"}
            </button>
          ) : (
            <div className="space-y-3">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black rounded-xl py-3.5 font-black text-sm active:scale-[0.99] transition disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : "Save Validated Address"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setValidatedAddress(null);
                  setMessage("");
                  setError("");
                }}
                className="w-full rounded-xl py-3 text-xs font-black border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                Re-validate Address
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text"
}) {
  return (
    <label className="block">
      <span className="block text-xs font-black mb-2">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0f0f0f] px-4 py-3 text-sm outline-none focus:border-yellow-400"
      />
    </label>
  );
}


function ReviewField({ label, value }) {
  return (
    <div className="rounded-xl bg-white dark:bg-[#151515] border border-green-100 dark:border-zinc-800 p-3">
      <p className="text-[9px] uppercase tracking-[0.14em] font-black text-zinc-400">
        {label}
      </p>
      <p className="text-sm font-bold mt-1 break-words">
        {value !== null &&
        value !== undefined &&
        String(value).trim()
          ? String(value)
          : "Not provided by Shipbubble"}
      </p>
    </div>
  );
}
