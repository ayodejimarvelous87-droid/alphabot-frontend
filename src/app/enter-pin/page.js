"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EnterPin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnPath = searchParams.get("return") || "/dashboard";

  const [pin, setPin] = useState("");

  const press = (value) => {
    if (pin.length < 4) {
      setPin((prev) => prev + value);
    }
  };

  const backspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const enterPin = () => {
    if (pin.length !== 4) return;

    sessionStorage.setItem("alphaBotTransactionPin", pin);

    const service = searchParams.get("service");

    if (service === "airtime") {
      sessionStorage.setItem(
        "alphaBotAirtimeAuthorizationPending",
        "1"
      );
    }

    if (service === "data") {
      sessionStorage.setItem(
        "alphaBotDataAuthorizationPending",
        "1"
      );
    }

    if (service === "electricity") {
      sessionStorage.setItem(
        "alphaBotElectricityAuthorizationPending",
        "1"
      );
    }

    if (service === "tv") {
      sessionStorage.setItem(
        "alphaBotTVAuthorizationPending",
        "1"
      );
    }

    if (service === "betting") {
      sessionStorage.setItem(
        "alphaBotBettingAuthorizationPending",
        "1"
      );
    }

    if (service === "exam-pin") {
      sessionStorage.setItem(
        "alphaBotExamPinAuthorizationPending",
        "1"
      );
    }

    if (service === "recharge-pin") {
      sessionStorage.setItem(
        "alphaBotEPinAuthorizationPending",
        "1"
      );
    }

    const separator = returnPath.includes("?") ? "&" : "?";

    router.push(
      `${returnPath}${separator}authorized=1${service ? `&service=${service}` : ""}`
    );
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">

      <div className="px-5 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-zinc-400 text-sm font-bold"
        >
          ← Back
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">

        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔐</div>

          <h1 className="text-2xl font-black">
            Enter Transaction PIN
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Enter your 4-digit PIN to continue
          </p>
        </div>

        <div className="flex gap-4 mb-10">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border ${
                pin.length > index
                  ? "bg-white border-white"
                  : "border-zinc-600"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">

          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
            (number) => (
              <button
                key={number}
                type="button"
                onClick={() => press(number)}
                className="h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-2xl font-bold active:scale-95 transition"
              >
                {number}
              </button>
            )
          )}

          <button
            type="button"
            onClick={backspace}
            className="h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm font-bold active:scale-95 transition"
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={() => press("0")}
            className="h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-2xl font-bold active:scale-95 transition"
          >
            0
          </button>

          <button
            type="button"
            onClick={enterPin}
            disabled={pin.length !== 4}
            className="h-16 rounded-2xl bg-blue-600 text-white text-sm font-black disabled:opacity-30 active:scale-95 transition"
          >
            Enter
          </button>

        </div>

      </div>

    </main>
  );
}
