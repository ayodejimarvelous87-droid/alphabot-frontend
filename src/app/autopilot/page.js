"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";

const API =
  "https://api.alphabothq.com/daily-data/plans";

const NETWORKS = [
  { value: "MTN", label: "MTN", icon: "🟡" },
  { value: "GLO", label: "Glo", icon: "🟢" },
  { value: "AIRTEL", label: "Airtel", icon: "🔴" },
  { value: "9MOBILE", label: "9mobile", icon: "🟢" },
];

export default function AutoPilot() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [destination, setDestination] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to load AutoPilot plans"
          );
        }

        setPlans(
          Array.isArray(data)
            ? data.filter((plan) => plan.active !== false)
            : []
        );
      } catch (error) {
        console.error("AUTOPILOT PLANS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  const networkPlans = plans.filter(
    (plan) => plan.network === selectedNetwork
  );

  const formatPrice = (price) =>
    `₦${Number(price || 0).toLocaleString()}`;

  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white px-4 py-4 pb-24">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="mb-6">
          <p className="text-[9px] font-black tracking-[0.2em] text-yellow-500 uppercase">
            AlphaBot
          </p>

          <div className="flex items-center gap-2 mt-1">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-xl">
              🤖
            </div>

            <div>
              <h1 className="text-2xl font-black">
                AB AutoPilot
              </h1>

              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Set it once. Get data every day.
              </p>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs font-black">
              1
            </span>

            <div>
              <h2 className="font-black text-sm">
                Select Network
              </h2>

              <p className="text-[10px] text-zinc-500">
                Choose the network for your AutoPilot
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {NETWORKS.map((network) => (
              <button
                key={network.value}
                type="button"
                onClick={() => {
                  setSelectedNetwork(network.value);
                  setSelectedPlan(null);
                }}
                className={`text-left rounded-2xl p-4 border transition-all active:scale-[0.97] ${
                  selectedNetwork === network.value
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
                }`}
              >
                <div className="text-2xl mb-2">
                  {network.icon}
                </div>

                <p className="font-bold text-sm">
                  {network.label}
                </p>

                {selectedNetwork === network.value && (
                  <p className="text-[9px] text-yellow-500 mt-1 font-bold">
                    Selected
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Step 2 */}
        {selectedNetwork && (
          <section className="mt-7">

            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs font-black">
                2
              </span>

              <div>
                <h2 className="font-black text-sm">
                  View Plans
                </h2>

                <p className="text-[10px] text-zinc-500">
                  Choose how much data you want every day
                </p>
              </div>
            </div>

            {loading ? (
              <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 text-sm text-zinc-500">
                Loading plans...
              </div>
            ) : networkPlans.length === 0 ? (
              <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 text-sm text-zinc-500">
                No AutoPilot plans are currently available for{" "}
                {selectedNetwork}.
              </div>
            ) : (
              <div className="space-y-3">
                {networkPlans.map((plan) => (
                  <button
                    key={plan._id}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full text-left rounded-2xl p-4 border transition-all active:scale-[0.98] ${
                      selectedPlan?._id === plan._id
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h3 className="font-black text-base">
                          {plan.name}
                        </h3>

                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                          {plan.dailyDataLimit}{" "}
                          <span className="text-zinc-400">
                            every day
                          </span>
                        </p>

                        <p className="text-xs text-zinc-500 mt-2">
                          Duration:{" "}
                          <span className="font-bold text-zinc-700 dark:text-zinc-300">
                            {plan.durationDays} days
                          </span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-black text-lg">
                          {formatPrice(plan.sellingPrice)}
                        </p>

                        <p className="text-[9px] text-zinc-500 mt-1">
                          total
                        </p>
                      </div>

                    </div>

                    {selectedPlan?._id === plan._id && (
                      <div className="mt-3 pt-3 border-t border-yellow-400/20">
                        <p className="text-[10px] font-bold text-yellow-500">
                          ✓ Plan selected
                        </p>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Step 3 */}
        {selectedPlan && (
          <section className="mt-7">

            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs font-black">
                3
              </span>

              <div>
                <h2 className="font-black text-sm">
                  Destination
                </h2>

                <p className="text-[10px] text-zinc-500">
                  Enter the number that should receive the daily data
                </p>
              </div>
            </div>

            <input
              type="tel"
              inputMode="numeric"
              placeholder="08012345678"
              value={destination}
              onChange={(e) =>
                setDestination(
                  e.target.value.replace(/\D/g, "")
                )
              }
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-sm outline-none focus:border-yellow-400"
            />

            {/* Summary */}
            <div className="mt-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">

              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-black">
                AutoPilot Summary
              </p>

              <div className="mt-3 space-y-2 text-sm">

                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">
                    Network
                  </span>
                  <span className="font-bold">
                    {selectedPlan.network}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">
                    Daily data
                  </span>
                  <span className="font-bold">
                    {selectedPlan.dailyDataLimit}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">
                    Duration
                  </span>
                  <span className="font-bold">
                    {selectedPlan.durationDays} days
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">
                    Destination
                  </span>
                  <span className="font-bold">
                    {destination || "Not entered"}
                  </span>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 mt-3 flex justify-between">
                  <span className="font-black">
                    Total
                  </span>

                  <span className="font-black text-lg">
                    {formatPrice(selectedPlan.sellingPrice)}
                  </span>
                </div>

              </div>
            </div>

            <button
              type="button"
              disabled={!destination.trim() || !selectedPlan}
              onClick={() => {
                if (!destination.trim() || !selectedPlan) {
                  return;
                }

                sessionStorage.setItem(
                  "alphaBotAutoPilotPurchaseState",
                  JSON.stringify({
                    planId: selectedPlan._id,
                    targetPhone: destination
                  })
                );

                router.push(
                  "/enter-pin?return=/autopilot&service=autopilot"
                );
              }}
              className="w-full mt-4 bg-yellow-400 text-black rounded-2xl py-4 font-black disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
            >
              Subscribe to AB AutoPilot
            </button>

            <p className="text-center text-[9px] text-zinc-500 mt-3">
              You will confirm this subscription with your transaction PIN.
            </p>

                {showPin && (
              <div className="grid grid-cols-3 gap-3">

                  {[1,2,3,4,5,6,7,8,9].map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() => {
                        if (pin.length < 4) {
                          setPin((prev) => prev + String(number));
                        }
                      }}
                      className="h-12 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-black text-lg active:scale-95"
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setShowPin(false)}
                    className="h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 font-bold text-xs"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (pin.length < 4) return;

                      if (processing) return;

                      setProcessing(true);
                      setMessage("");

                      (async () => {
                        try {

                          const token =
                            localStorage.getItem("token");

                          const biometricToken =
                            localStorage.getItem("biometricToken");

                          const idempotencyKey =
                            typeof crypto !== "undefined" &&
                            crypto.randomUUID
                              ? crypto.randomUUID()
                              : `${Date.now()}-${Math.random()}`;

                          const res = await fetch(
                            "https://api.alphabothq.com/daily-data/subscribe",
                            {
                              method: "POST",

                              headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                                "Idempotency-Key": idempotencyKey
                              },

                              body: JSON.stringify({
                                planId: selectedPlan._id,
                                targetPhone: destination,
                                pin,
                                biometricToken:
                                  biometricToken || undefined
                              })
                            }
                          );

                          const result =
                            await res.json();

                          sessionStorage.setItem(
                            "alphaBotTransactionResult",
                            JSON.stringify({
                              ...result,
                              status:
                                result.status ||
                                result.transaction?.status ||
                                (res.ok
                                  ? "success"
                                  : "failed"),
                              returnPath: "/autopilot"
                            })
                          );

                          window.location.href =
                            "/transaction-result";

                        } catch (error) {

                          console.error(
                            "AUTOPILOT PURCHASE ERROR:",
                            error
                          );

                          setProcessing(false);
                          setMessage(
                            "Connection error. Please try again."
                          );
                        }
                      })();
                    }}
                    disabled={pin.length < 4 || processing}
                    className="h-12 rounded-xl bg-yellow-400 text-black font-black disabled:opacity-40 active:scale-95"
                  >
                    {processing ? "..." : "✓"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPin((prev) =>
                        prev.slice(0, -1)
                      )
                    }
                    className="h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 font-bold text-lg active:scale-95"
                  >
                    ⌫
                  </button>

                </div>
            )}

          </section>
        )}

      </div>

      <BottomNav />

    </main>
  );
}
