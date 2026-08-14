"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = "https://api.alphabothq.com";

export default function TwoFactorPage() {
  const [enabled, setEnabled] = useState(false);
  const [verifiedAt, setVerifiedAt] = useState(null);

  const [setup, setSetup] = useState(null);
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || ""
      : "";

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const loadStatus = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/2fa/status`, {
        headers: authHeaders,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Unable to check 2FA status"
        );
      }

      setEnabled(!!data.enabled);
      setVerifiedAt(data.verifiedAt || null);
    } catch (err) {
      setError(
        err.message || "Unable to check 2FA status"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const startSetup = async () => {
    try {
      setWorking(true);
      setError("");
      setMessage("");
      setSetup(null);
      setCode("");

      const res = await fetch(`${API}/2fa/setup`, {
        method: "POST",
        headers: authHeaders,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Unable to start 2FA setup"
        );
      }

      setSetup(data);
      setMessage(
        "Scan the QR code with your authenticator app."
      );
    } catch (err) {
      setError(
        err.message || "Unable to start 2FA setup"
      );
    } finally {
      setWorking(false);
    }
  };

  const verifySetup = async () => {
    if (!/^[0-9]{6}$/.test(code.trim())) {
      setError("Enter the 6-digit authenticator code.");
      return;
    }

    try {
      setWorking(true);
      setError("");
      setMessage("");

      const res = await fetch(`${API}/2fa/verify-setup`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          code: code.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Invalid authenticator code"
        );
      }

      setEnabled(true);
      setVerifiedAt(new Date().toISOString());
      setSetup(null);
      setCode("");

      setMessage(
        data.message || "2FA enabled successfully"
      );
    } catch (err) {
      setError(
        err.message || "Unable to verify authenticator code"
      );
    } finally {
      setWorking(false);
    }
  };

  const disableTwoFactor = async () => {
    if (!/^[0-9]{6}$/.test(code.trim())) {
      setError(
        "Enter your current 6-digit authenticator code."
      );
      return;
    }

    try {
      setWorking(true);
      setError("");
      setMessage("");

      const res = await fetch(`${API}/2fa/disable`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          code: code.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Unable to disable 2FA"
        );
      }

      setEnabled(false);
      setVerifiedAt(null);
      setSetup(null);
      setCode("");

      setMessage(
        data.message || "2FA disabled successfully"
      );
    } catch (err) {
      setError(
        err.message || "Unable to disable 2FA"
      );
    } finally {
      setWorking(false);
    }
  };

  const cancelSetup = () => {
    setSetup(null);
    setCode("");
    setError("");
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        <Link
          href="/settings"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Settings
        </Link>

        <div className="mt-7 mb-7">

          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Account Security
          </p>

          <h1 className="text-3xl font-black mt-2">
            Two-Factor Authentication
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Add another layer of protection to your AlphaBot
            account using an authenticator app.
          </p>

        </div>

        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B] p-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-3xl">
              🔐
            </div>

            <div className="flex-1">

              <p className="font-black text-lg">
                2FA Protection
              </p>

              {loading ? (
                <p className="text-sm text-zinc-500 mt-1">
                  Checking status...
                </p>
              ) : enabled ? (
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  ● Enabled
                </p>
              ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Not enabled
                </p>
              )}

            </div>

          </div>

          {!loading && enabled && !setup && (
            <div className="mt-6 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-4">

              <p className="font-bold text-green-800 dark:text-green-300">
                Your account is protected
              </p>

              <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                Authenticator verification is enabled for
                sensitive account actions.
              </p>

              {verifiedAt && (
                <p className="text-xs text-green-600 dark:text-green-500 mt-3">
                  Enabled successfully.
                </p>
              )}

            </div>
          )}

          {!loading && !enabled && !setup && (
            <>
              <div className="mt-6 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 p-4">

                <p className="font-bold">
                  Protect your account
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                  Use an authenticator app to generate a
                  temporary verification code when AlphaBot
                  needs additional security confirmation.
                </p>

              </div>

              <button
                type="button"
                onClick={startSetup}
                disabled={working}
                className="w-full mt-5 py-3.5 rounded-2xl bg-yellow-400 text-black font-black hover:bg-yellow-300 transition disabled:opacity-50"
              >
                {working
                  ? "Preparing setup..."
                  : "Enable Two-Factor Authentication"}
              </button>
            </>
          )}

          {setup && !enabled && (
            <div className="mt-6">

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 text-center">

                <p className="font-black text-lg">
                  Scan this QR code
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                  Open Google Authenticator, Microsoft
                  Authenticator, or another compatible app.
                </p>

                {setup.qrCode && (
                  <div className="mt-5 flex justify-center">

                    <div className="bg-white p-3 rounded-2xl border border-zinc-200">
                      <img
                        src={setup.qrCode}
                        alt="2FA setup QR code"
                        className="w-52 h-52"
                      />
                    </div>

                  </div>
                )}

                {setup.secret && (
                  <div className="mt-5">

                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Manual setup key
                    </p>

                    <div className="mt-2 p-3 rounded-xl bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-zinc-800 break-all font-mono text-sm">
                      {setup.secret}
                    </div>

                    <p className="text-xs text-zinc-500 mt-2">
                      Use this key if you cannot scan the QR
                      code.
                    </p>

                  </div>
                )}

              </div>

              <div className="mt-5">

                <label className="block text-sm font-bold mb-2">
                  Authenticator code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(e) =>
                    setCode(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  placeholder="Enter 6-digit code"
                  className="w-full bg-white dark:bg-black text-black dark:text-white border border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 text-center text-xl tracking-[0.4em] font-bold outline-none focus:border-yellow-400"
                />

              </div>

              <button
                type="button"
                onClick={verifySetup}
                disabled={working || code.length !== 6}
                className="w-full mt-4 py-3.5 rounded-2xl bg-yellow-400 text-black font-black hover:bg-yellow-300 transition disabled:opacity-50"
              >
                {working
                  ? "Verifying..."
                  : "Verify & Enable 2FA"}
              </button>

              <button
                type="button"
                onClick={cancelSetup}
                disabled={working}
                className="w-full mt-3 py-3 rounded-2xl text-zinc-500 font-bold hover:text-black dark:hover:text-white transition"
              >
                Cancel Setup
              </button>

            </div>
          )}

          {!loading && enabled && !setup && (
            <div className="mt-6">

              <label className="block text-sm font-bold mb-2">
                Current authenticator code
              </label>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(e) =>
                  setCode(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="Enter 6-digit code"
                className="w-full bg-white dark:bg-black text-black dark:text-white border border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 text-center text-xl tracking-[0.4em] font-bold outline-none focus:border-red-400"
              />

              <button
                type="button"
                onClick={disableTwoFactor}
                disabled={working || code.length !== 6}
                className="w-full mt-4 py-3.5 rounded-2xl border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-50"
              >
                {working
                  ? "Disabling..."
                  : "Disable Two-Factor Authentication"}
              </button>

            </div>
          )}

        </section>

        {message && (
          <div className="mt-4 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20 p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              ✓ {message}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-4">
            <p className="text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-4">

          <p className="text-xs text-blue-700 dark:text-blue-300">
            🛡️ Never share your authenticator code with anyone.
            AlphaBot support will never ask you to provide your
            2FA code.
          </p>

        </div>

        <Link
          href="/settings"
          className="block text-center text-sm text-zinc-500 hover:text-black dark:hover:text-white mt-8"
        >
          ← Back to Settings
        </Link>

      </div>

    </main>
  );
}
