"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import SuccessCelebration from "@/components/success-celebration";
import { authenticateWithBiometric } from "@/lib/biometric";

export default function Page() {
  const router = useRouter();

  const [provider, setProvider] = useState("");
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [tvPackage, setTvPackage] = useState("");
  const [amount, setAmount] = useState("");

  const [plans, setPlans] = useState([]);
  const [providers, setProviders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);

  useEffect(() => {
    const savedState = sessionStorage.getItem("alphaBotTVPurchaseState");

    if (savedState) {
      try {
        const state = JSON.parse(savedState);

        if (state.provider !== undefined) {
          setProvider(state.provider);
        }

        if (state.smartCardNumber !== undefined) {
          setSmartCardNumber(state.smartCardNumber);
        }

        if (state.tvPackage !== undefined) {
          setTvPackage(state.tvPackage);
        }

        if (state.amount !== undefined) {
          setAmount(state.amount);
        }
      } catch (error) {
        console.log(
          "Unable to restore TV purchase state:",
          error.message
        );
      }
    }
  }, []);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://api.alphabothq.com/tv/plans",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (data.success) {
          setPlans(data.plans);

          setProviders(
            [...new Set(data.plans.map((item) => item.provider))]
          );

          setProvider(data.plans[0]?.provider || "");
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadPlans();
  }, []);

  const subscribeTV = async () => {
    try {
      setLoading(true);
      setMessage("Processing...");

      const token = localStorage.getItem("token");

      const biometricToken =
        localStorage.getItem("biometricToken");

      const res = await fetch(
        "https://api.alphabothq.com/tv/subscribe",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,

            "Idempotency-Key":
              typeof crypto !== "undefined" &&
              crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random()}`
          },

          body: JSON.stringify({
            provider,
            smartCardNumber,
            variation_id: tvPackage,
            amount: Number(amount),
            biometricToken: biometricToken || undefined
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        sessionStorage.removeItem(
          "alphaBotTVPurchaseState"
        );

        setMessage(`✅ ${data.message}`);

        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Connection error");
    } finally {
      localStorage.removeItem("biometricToken");
      setLoading(false);
    }
  };

  const handlePin = () => {
    sessionStorage.setItem(
      "alphaBotTVPurchaseState",
      JSON.stringify({
        provider,
        smartCardNumber,
        tvPackage,
        amount
      })
    );

    router.push(
      "/enter-pin?return=/tv&service=tv"
    );
  };

  const handleBiometric = async () => {
    try {
      setBiometricLoading(true);

      setMessage("Touch your fingerprint...");

      await authenticateWithBiometric();

      setMessage("Fingerprint verified.");

      await subscribeTV();
    } catch (error) {
      localStorage.removeItem("biometricToken");

      setMessage("❌ " + error.message);
    } finally {
      setBiometricLoading(false);
    }
  };

      return (
      <>
        <SuccessCelebration
          show={showSuccess}
          message="🎉 TV subscription successful!"
        />

        <main className="min-h-screen bg-[#050505] text-white px-4 py-5 pb-24">
          <div className="max-w-md mx-auto space-y-4">

            {/* HEADER */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-[#111113] to-black p-5">

              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

              <div className="relative flex items-center justify-between">

                <div>
                  <p className="text-[9px] font-black tracking-[0.22em] text-yellow-400 uppercase">
                    AlphaBot
                  </p>

                  <h1 className="text-2xl font-black mt-1">
                    TV Subscription
                  </h1>

                  <p className="text-[10px] text-zinc-400 mt-1">
                    Renew your entertainment package instantly
                  </p>
                </div>

                <div className="w-11 h-11 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-xl">
                  📺
                </div>

              </div>
            </div>

            {/* PURCHASE FORM */}
            <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-4 space-y-4">

              {/* PROVIDER */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500">
                    TV Provider
                  </p>

                  <span className="text-[9px] text-zinc-600">
                    Select provider
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {providers.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setProvider(item);
                        setTvPackage("");
                        setAmount("");
                      }}
                      className={`rounded-2xl border px-3 py-3 text-[10px] font-black transition active:scale-95 ${
                        provider === item
                          ? "border-yellow-400 bg-yellow-400 text-black shadow-lg shadow-yellow-400/10"
                          : "border-zinc-800 bg-[#080809] text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      📺 {item.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* SMART CARD */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500">
                    Receiver
                  </p>

                  <span className="text-[9px] text-zinc-600">
                    Smart card / IUC
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    #
                  </span>

                  <input
                    className="w-full pl-9 pr-4 py-4 rounded-2xl bg-[#080809] border border-zinc-800 text-white outline-none focus:border-yellow-400/60 transition"
                    placeholder="Enter IUC number"
                    value={smartCardNumber}
                    onChange={(e) =>
                      setSmartCardNumber(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* PACKAGE */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500">
                    Package
                  </p>

                  <span className="text-[9px] text-zinc-600">
                    Choose your plan
                  </span>
                </div>

                <select
                  className="w-full bg-[#080809] border border-zinc-800 rounded-2xl p-4 text-white outline-none focus:border-yellow-400/60 transition"
                  value={tvPackage}
                  onChange={(e) => {
                    const selected = plans.find(
                      (p) =>
                        p.variation_id === e.target.value
                    );

                    setTvPackage(e.target.value);

                    if (selected) {
                      setAmount(selected.sellingPrice);
                    }
                  }}
                >
                  <option value="">
                    Select Package
                  </option>

                  {plans
                    .filter(
                      (p) => p.provider === provider
                    )
                    .map((plan) => (
                      <option
                        key={plan.variation_id}
                        value={plan.variation_id}
                      >
                        {plan.name} - ₦
                        {Number(
                          plan.sellingPrice
                        ).toLocaleString("en-NG")}
                      </option>
                    ))}
                </select>
              </div>

              {/* AMOUNT */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500">
                    Amount
                  </p>

                  <span className="text-[9px] text-zinc-600">
                    Package price
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">
                    ₦
                  </span>

                  <input
                    className="w-full pl-9 pr-4 py-4 rounded-2xl bg-[#080809] border border-zinc-800 text-white outline-none focus:border-yellow-400/60 transition"
                    placeholder="Enter amount"
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* PIN */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500 mb-2">
                  Transaction PIN
                </p>

                <button
                  type="button"
                  onClick={handlePin}
                  disabled={loading || biometricLoading}
                  className="w-full flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#080809] px-4 py-4 text-left active:scale-[0.98] transition"
                >
                  <div>
                    <p className="text-sm font-bold">
                      Enter transaction PIN
                    </p>

                    <p className="text-[9px] text-zinc-500 mt-0.5">
                      Required before purchase
                    </p>
                  </div>

                  <span className="text-zinc-500 text-lg">
                    →
                  </span>
                </button>
              </div>

            </div>

            {/* FINGERPRINT */}
            <button
              type="button"
              onClick={handleBiometric}
              disabled={loading || biometricLoading}
              className="w-full rounded-2xl bg-yellow-400 text-black py-4 font-black text-sm shadow-lg shadow-yellow-400/10 active:scale-[0.98] transition disabled:opacity-50"
            >
              {biometricLoading
                ? "Touch fingerprint..."
                : "👆 Use Fingerprint"}
            </button>

            {/* MESSAGE */}
            {message && (
              <div className="rounded-2xl border border-zinc-800 bg-[#111113] px-4 py-3 text-center text-xs text-zinc-400">
                {message}
              </div>
            )}

            <div className="text-center text-[10px] text-zinc-600 pb-2">
              Secure payment • Instant TV activation
            </div>

          </div>
        </main>
      </>
    );
}
