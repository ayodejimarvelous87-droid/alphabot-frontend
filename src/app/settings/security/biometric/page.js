"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = "https://alphabot-1.onrender.com";

export default function BiometricPaymentPage() {
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("token") || "";
  };

  const headers = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  });

  const loadStatus = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/biometric/status`, {
        headers: headers(),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to check biometric status");
      }

      setEnabled(!!data.enabled);
      setCount(data.count || 0);
    } catch (err) {
      setError(err.message || "Unable to check biometric status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const enableBiometric = async () => {
    try {
      setWorking(true);
      setMessage("");
      setError("");

      if (!window.PublicKeyCredential) {
        throw new Error(
          "Biometric authentication is not supported on this device or browser."
        );
      }

      const optionsRes = await fetch(
        `${API}/biometric/register/options`,
        {
          headers: headers(),
        }
      );

      const options = await optionsRes.json();

      if (!optionsRes.ok) {
        throw new Error(
          options.message || "Unable to start biometric registration"
        );
      }

      const publicKey = {
        ...options,
        challenge: base64urlToBuffer(options.challenge),
        user: {
          ...options.user,
          id: base64urlToBuffer(options.user.id),
        },
        excludeCredentials: (options.excludeCredentials || []).map(
          (credential) => ({
            ...credential,
            id: base64urlToBuffer(credential.id),
          })
        ),
      };

      const credential = await navigator.credentials.create({
        publicKey,
      });

      if (!credential) {
        throw new Error("Biometric registration was cancelled.");
      }

      const response = credentialToJSON(credential);

      const verifyRes = await fetch(
        `${API}/biometric/register/verify`,
        {
          method: "POST",
          headers: headers(),
          body: JSON.stringify(response),
        }
      );

      const data = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(
          data.message || "Unable to enable biometric payment"
        );
      }

      setEnabled(true);
      setCount((current) => current + 1);
      setMessage(
        data.message || "Fingerprint payment enabled successfully"
      );
    } catch (err) {
      setError(
        err.message || "Unable to enable biometric payment"
      );
    } finally {
      setWorking(false);
    }
  };

  const disableBiometric = async () => {
    const confirmed = window.confirm(
      "Disable biometric payment on this account?"
    );

    if (!confirmed) return;

    try {
      setWorking(true);
      setMessage("");
      setError("");

      const res = await fetch(`${API}/biometric`, {
        method: "DELETE",
        headers: headers(),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Unable to disable biometric payment"
        );
      }

      setEnabled(false);
      setCount(0);
      setMessage(
        data.message || "Fingerprint payment disabled successfully"
      );
    } catch (err) {
      setError(
        err.message || "Unable to disable biometric payment"
      );
    } finally {
      setWorking(false);
    }
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
            Biometric Payment
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Use your device fingerprint or biometric authentication
            to authorise payments securely.
          </p>
        </div>

        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B] p-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-3xl">
              👆
            </div>

            <div className="flex-1">
              <p className="font-black text-lg">
                Biometric Payment
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

          <div className="mt-6 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 p-4">

            {enabled ? (
              <>
                <p className="font-bold">
                  Biometric payment is active
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                  Your device biometric can be used to authorise
                  supported payments without entering your transaction
                  PIN each time.
                </p>

                {count > 0 && (
                  <p className="text-xs text-zinc-500 mt-3">
                    {count} biometric credential{count === 1 ? "" : "s"} registered.
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="font-bold">
                  Faster and secure payments
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                  Enable biometric payment to use your fingerprint or
                  other supported device biometric for payment
                  authorisation.
                </p>
              </>
            )}

          </div>

          {enabled ? (
            <button
              type="button"
              onClick={disableBiometric}
              disabled={working}
              className="w-full mt-5 py-3.5 rounded-2xl border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-50"
            >
              {working
                ? "Disabling..."
                : "Disable Biometric Payment"}
            </button>
          ) : (
            <button
              type="button"
              onClick={enableBiometric}
              disabled={working || loading}
              className="w-full mt-5 py-3.5 rounded-2xl bg-yellow-400 text-black font-black hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {working
                ? "Waiting for biometric..."
                : "Enable Biometric Payment"}
            </button>
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
            🔒 Your biometric information stays on your device.
            AlphaBot receives a secure WebAuthn credential rather than
            your fingerprint itself.
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

function base64urlToBuffer(value) {
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const padding = "=".repeat((4 - (base64.length % 4)) % 4);

  const binary = atob(base64 + padding);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}

function bufferToBase64url(buffer) {
  const bytes = new Uint8Array(buffer);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function credentialToJSON(credential) {
  const response = credential.response;

  const result = {
    id: credential.id,
    rawId: bufferToBase64url(credential.rawId),
    type: credential.type,
    response: {},
  };

  if (response.clientDataJSON) {
    result.response.clientDataJSON =
      bufferToBase64url(response.clientDataJSON);
  }

  if (response.attestationObject) {
    result.response.attestationObject =
      bufferToBase64url(response.attestationObject);
  }

  if (response.authenticatorData) {
    result.response.authenticatorData =
      bufferToBase64url(response.authenticatorData);
  }

  if (response.signature) {
    result.response.signature =
      bufferToBase64url(response.signature);
  }

  if (response.userHandle) {
    result.response.userHandle =
      bufferToBase64url(response.userHandle);
  }

  return result;
}
