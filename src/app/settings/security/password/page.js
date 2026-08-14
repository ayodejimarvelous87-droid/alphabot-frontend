"use client";

import { useState } from "react";
import Link from "next/link";
import Toast from "@/components/Toast";

const API = "https://api.alphabothq.com";

export default function PasswordSettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");
  const [needs2FA, setNeeds2FA] = useState(false);

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  };

  const passwordStrength = () => {
    if (!newPassword) return "";

    let score = 0;

    if (newPassword.length >= 6) score++;
    if (newPassword.length >= 10) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    if (score <= 1) return "Weak";
    if (score <= 3) return "Moderate";
    return "Strong";
  };

  const strength = passwordStrength();

  const changePassword = async () => {
    setMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    if (oldPassword === newPassword) {
      setMessage("Your new password must be different from your current password.");
      return;
    }

    if (needs2FA && !code.trim()) {
      setMessage("Enter your authenticator code.");
      return;
    }

    const user = getUser();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Your session has expired. Please log in again.");
      return;
    }

    if (!user.phone) {
      setMessage("Unable to identify your account.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API}/change-password/${encodeURIComponent(user.phone)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
            ...(code.trim() ? { code: code.trim() } : {}),
          }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (
          data.message === "Authenticator code is required" ||
          data.message?.toLowerCase().includes("authenticator code")
        ) {
          setNeeds2FA(true);
        }

        setMessage(data.message || "Unable to change password.");
        return;
      }

      setToast("✅ Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setCode("");
      setNeeds2FA(false);
    } catch (error) {
      console.error("Password change error:", error);
      setMessage("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] text-black dark:text-white px-4 py-3 pr-12 outline-none focus:border-zinc-500 dark:focus:border-zinc-500 transition";

  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">
      <div className="max-w-md mx-auto">

        <Link
          href="/settings/security"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Security
        </Link>

        <div className="mt-7 mb-7">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Account Protection
          </p>

          <h1 className="text-3xl font-black mt-2">
            🔑 Password
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Change the password you use to access your AlphaBot account.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B] p-5">

          <div className="mb-5">
            <p className="font-bold">
              Change your password
            </p>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Use a strong password that you do not use on another account.
            </p>
          </div>

          <div className="space-y-4">

            <div>
              <label className="block text-sm font-semibold mb-2">
                Current password
              </label>

              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                >
                  {showOld ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                New password
              </label>

              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                >
                  {showNew ? "🙈" : "👁️"}
                </button>
              </div>

              {newPassword && (
                <p
                  className={`text-xs mt-2 font-semibold ${
                    strength === "Strong"
                      ? "text-green-600"
                      : strength === "Moderate"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  Password strength: {strength}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm new password
              </label>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter new password again"
                  autoComplete="new-password"
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                >
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>

              {confirmPassword && (
                <p
                  className={`text-xs mt-2 ${
                    newPassword === confirmPassword
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {newPassword === confirmPassword
                    ? "✓ Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            {needs2FA && (
              <div className="rounded-2xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20 p-4">

                <p className="font-bold text-sm">
                  🔐 Authenticator verification
                </p>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 mb-3">
                  Two-factor authentication is enabled on your account.
                  Enter the 6-digit code from your authenticator app.
                </p>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="6-digit authenticator code"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] text-black dark:text-white px-4 py-3 outline-none tracking-widest text-center font-bold"
                />

              </div>
            )}

            {message && (
              <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 px-4 py-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {message}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={changePassword}
              disabled={loading}
              className="w-full rounded-xl bg-black dark:bg-white text-white dark:text-black py-3.5 font-bold disabled:opacity-50 transition"
            >
              {loading ? "Changing password..." : "Change Password"}
            </button>

          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20 p-4">
          <p className="text-xs text-green-700 dark:text-green-300">
            🔒 Never share your password with anyone. AlphaBot support will
            never ask you for your password.
          </p>
        </div>

      </div>

      <Toast
        message={toast}
        type="success"
        onClose={() => setToast("")}
      />
    </main>
  );
}
