"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Toast from "@/components/Toast";

const API = "https://alphabot-1.onrender.com";

export default function TransactionPinPage() {
  const [hasPin, setHasPin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    checkPinStatus();
  }, []);

  const checkPinStatus = async () => {
    try {
      const authToken = localStorage.getItem("token");

      const res = await fetch(`${API}/pin/status`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setHasPin(!!data.hasPin);
      }
    } catch (error) {
      setMessage("Unable to check your PIN status.");
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async () => {
    setMessage("");

    if (sendingOtp) return;

    setSendingOtp(true);

    try {
      const authToken = localStorage.getItem("token");

      const res = await fetch(`${API}/pin/send-pin-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Unable to send OTP.");
        return;
      }

      setOtpSent(true);
      setToast("OTP sent to your registered email.");
    } catch (error) {
      setMessage("Unable to connect to AlphaBot.");
    } finally {
      setSendingOtp(false);
    }
  };

  const savePin = async () => {
    setMessage("");

    if (!/^\d{4}$/.test(pin)) {
      setMessage("Your transaction PIN must contain exactly 4 digits.");
      return;
    }

    if (pin !== confirmPin) {
      setMessage("The PINs do not match.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setMessage("Enter the 6-digit OTP sent to your email.");
      return;
    }

    if (saving) return;

    setSaving(true);

    try {
      const authToken = localStorage.getItem("token");

      const res = await fetch(`${API}/pin/set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          pin,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Unable to save your PIN.");
        return;
      }

      setHasPin(true);
      setPin("");
      setConfirmPin("");
      setOtp("");
      setOtpSent(false);

      setToast(
        data.message || "Transaction PIN updated successfully."
      );
    } catch (error) {
      setMessage("Unable to connect to AlphaBot.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-zinc-500">
            Checking your security settings...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">
      <div className="max-w-md mx-auto">

        <Link
          href="/settings"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Settings
        </Link>

        <div className="mt-7">

          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-2xl">
            🔐
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Account Security
          </p>

          <h1 className="text-3xl font-black mt-2">
            {hasPin ? "Change Transaction PIN" : "Transaction PIN"}
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            {hasPin
              ? "Update the 4-digit PIN you use to authorise transactions on AlphaBot."
              : "Create a 4-digit PIN to help protect transactions made from your AlphaBot account."}
          </p>

        </div>

        <section className="mt-7 p-5 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">

          <p className="font-black text-blue-700 dark:text-blue-300">
            🛡️ Keep your PIN private
          </p>

          <p className="text-sm text-blue-700/80 dark:text-blue-300/80 mt-2 leading-6">
            Never share your transaction PIN with anyone. AlphaBot will
            never ask you to reveal your PIN.
          </p>

        </section>

        <section className="mt-8">

          <h2 className="text-xl font-black">
            {hasPin ? "Update your PIN" : "Create your PIN"}
          </h2>

          <div className="mt-4 space-y-4">

            <div>
              <label className="block text-sm font-bold mb-2">
                New 4-digit PIN
              </label>

              <input
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                maxLength={4}
                value={pin}
                onChange={(e) =>
                  setPin(e.target.value.replace(/\D/g, ""))
                }
                placeholder="••••"
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B] px-4 py-4 text-center text-2xl tracking-[0.5em] outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Confirm PIN
              </label>

              <input
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                maxLength={4}
                value={confirmPin}
                onChange={(e) =>
                  setConfirmPin(e.target.value.replace(/\D/g, ""))
                }
                placeholder="••••"
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B] px-4 py-4 text-center text-2xl tracking-[0.5em] outline-none focus:border-blue-500"
              />
            </div>

          </div>

        </section>

        <section className="mt-8">

          <div className="flex items-center justify-between gap-4">

            <div>
              <h2 className="text-xl font-black">
                Verify your email
              </h2>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-5">
                We will send a 6-digit verification code to your
                registered email address.
              </p>
            </div>

            <span className="text-xl">
              ✉️
            </span>

          </div>

          {!otpSent ? (

            <button
              type="button"
              onClick={sendOTP}
              disabled={sendingOtp}
              className="w-full mt-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black py-4 font-bold disabled:opacity-50 transition"
            >
              {sendingOtp ? "Sending OTP..." : "Send OTP"}
            </button>

          ) : (

            <div className="mt-4">

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B] px-4 py-4 text-center text-xl tracking-[0.3em] outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={sendOTP}
                disabled={sendingOtp}
                className="w-full mt-3 text-sm font-bold text-blue-600 dark:text-blue-400 py-2 disabled:opacity-50"
              >
                {sendingOtp ? "Sending..." : "Resend OTP"}
              </button>

            </div>

          )}

        </section>

        {message && (
          <div className="mt-5 p-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
            <p className="text-sm text-red-700 dark:text-red-300 leading-6">
              {message}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={savePin}
          disabled={saving || !otpSent}
          className="w-full mt-6 rounded-2xl bg-blue-600 text-white py-4 font-black disabled:opacity-40 transition"
        >
          {saving
            ? "Saving PIN..."
            : hasPin
              ? "Update Transaction PIN"
              : "Create Transaction PIN"}
        </button>

        <section className="mt-8 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">

          <p className="font-black text-yellow-800 dark:text-yellow-300">
            ⚠️ Important
          </p>

          <ul className="mt-3 space-y-2 text-sm text-yellow-800 dark:text-yellow-300 leading-6">
            <li>• Do not use an easy-to-guess PIN.</li>
            <li>• Never share your PIN with another person.</li>
            <li>• Do not enter your PIN on suspicious websites or forms.</li>
            <li>• Contact AlphaBot support if you believe your PIN has been exposed.</li>
          </ul>

        </section>

      </div>

      <Toast
        message={toast}
        type="success"
        onClose={() => setToast("")}
      />
    </main>
  );
}
