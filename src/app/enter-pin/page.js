"use client";

const API = "https://api.alphabothq.com";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EnterPin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnPath = searchParams.get("return") || "/dashboard";
  const service = searchParams.get("service");

  const [pin, setPin] = useState("");
  const [processing, setProcessing] = useState(false);

  const press = (value) => {
    if (pin.length < 4) {
      setPin((prev) => prev + value);
    }
  };

  const backspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const enterPin = async () => {
    if (pin.length !== 4) return;

    if (service === "airtime") {
      if (processing) return;

      setProcessing(true);

      try {
        const savedState =
          sessionStorage.getItem("alphaBotAirtimePurchaseState");

        if (!savedState) {
          sessionStorage.setItem(
            "alphaBotTransactionResult",
            JSON.stringify({
              status: "failed",
              message: "Airtime purchase information was not found.",
              returnPath: "/airtime"
            })
          );

          router.push("/transaction-result");
          return;
        }

        const state = JSON.parse(savedState);
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://api.alphabothq.com/airtime/buy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "idempotency-key": crypto.randomUUID()
            },
            body: JSON.stringify({
              phone: state.phone,
              network: state.network,
              amount: Number(state.amount),
              pin
            })
          }
        );

        const data = await res.json();

        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            ...data,
            status: data.status || (res.ok ? "success" : "failed"),
            returnPath: "/airtime"
          })
        );

        sessionStorage.removeItem(
          "alphaBotAirtimePurchaseState"
        );

        router.push("/transaction-result");

      } catch (error) {
        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            status: "failed",
            message: "Connection error",
            returnPath: "/airtime"
          })
        );

        sessionStorage.removeItem(
          "alphaBotAirtimePurchaseState"
        );

        router.push("/transaction-result");
      }

      return;
    }

    if (service === "data") {
      if (processing) return;

      setProcessing(true);

      try {
        const savedState =
          sessionStorage.getItem("alphaBotDataPurchaseState");

        if (!savedState) {
          sessionStorage.setItem(
            "alphaBotTransactionResult",
            JSON.stringify({
              status: "failed",
              message: "Data purchase information was not found.",
              returnPath: "/data"
            })
          );

          router.push("/transaction-result");
          return;
        }

        const state = JSON.parse(savedState);

        const plansRes = await fetch(
          "https://api.alphabothq.com/data/plans"
        );

        if (!plansRes.ok) {
          throw new Error("Unable to load data plans.");
        }

        const plansData = await plansRes.json();
        const providers = plansData.providers || {};

        const networkPlans =
          state.network &&
          providers[state.network] &&
          typeof providers[state.network] === "object"
            ? providers[state.network]
            : {};

        const categoryPlans =
          state.category &&
          Array.isArray(networkPlans[state.category])
            ? networkPlans[state.category]
            : [];

        const searchText =
          String(state.search || "").toLowerCase();

        const filteredPlans = categoryPlans.filter((plan) => {
          const text = (
            plan.data_plan ||
            plan.name ||
            plan.size ||
            plan.datasize ||
            ""
          ).toLowerCase();

          return text.includes(searchText);
        });

        const selected =
          filteredPlans[Number(state.selectedPlan)];

        if (!selected) {
          sessionStorage.setItem(
            "alphaBotTransactionResult",
            JSON.stringify({
              status: "failed",
              message: "Selected data plan was not found.",
              returnPath: "/data"
            })
          );

          sessionStorage.removeItem(
            "alphaBotDataPurchaseState"
          );

          router.push("/transaction-result");
          return;
        }

        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://api.alphabothq.com/data/buy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Idempotency-Key": crypto.randomUUID()
            },
            body: JSON.stringify({
              phone: state.phone,
              network:
                selected.network ||
                selected.service_name ||
                "",
              plan:
                selected.data_plan ||
                selected.name ||
                selected.datasize,
              amount: Number(
                selected.display_price ||
                selected.reseller_price ||
                selected.price
              ),
              pin,
              provider: selected.provider,
              variation_id: selected.variation_id
            })
          }
        );

        const result = await res.json();

        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            ...result,
            status:
              result.status ||
              (res.ok ? "success" : "failed"),
            returnPath: "/data"
          })
        );

        sessionStorage.removeItem(
          "alphaBotDataPurchaseState"
        );

        router.push("/transaction-result");

      } catch (error) {
        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            status: "failed",
            message: "Connection error",
            returnPath: "/data"
          })
        );

        sessionStorage.removeItem(
          "alphaBotDataPurchaseState"
        );

        router.push("/transaction-result");
      }

      return;
    }

    if (service === "electricity") {
      if (processing) return;

      setProcessing(true);

      try {
        const savedState =
          sessionStorage.getItem(
            "alphaBotElectricityPurchaseState"
          );

        if (!savedState) {
          sessionStorage.setItem(
            "alphaBotTransactionResult",
            JSON.stringify({
              status: "failed",
              message:
                "Electricity payment information was not found.",
              returnPath: "/electricity"
            })
          );

          router.push("/transaction-result");
          return;
        }

        const state = JSON.parse(savedState);
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://api.alphabothq.com/electricity/pay",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Idempotency-Key":
                typeof crypto !== "undefined" &&
                crypto.randomUUID
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random()}`
            },
            body: JSON.stringify({
              phone: state.phone,
              disco: state.disco,
              meterNumber: state.meterNumber,
              meterType: state.meterType,
              amount: Number(state.amount),
              pin
            })
          }
        );

        const result = await res.json();

        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            ...result,
            status:
              result.status ||
              (res.ok ? "success" : "failed"),
            returnPath: "/electricity"
          })
        );

        sessionStorage.removeItem(
          "alphaBotElectricityPurchaseState"
        );

        router.push("/transaction-result");

      } catch (error) {
        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            status: "failed",
            message: "Connection error",
            returnPath: "/electricity"
          })
        );

        sessionStorage.removeItem(
          "alphaBotElectricityPurchaseState"
        );

        router.push("/transaction-result");
      }

      return;
    }

    if (service === "tv") {
      if (processing) return;

      setProcessing(true);

      try {
        const savedState =
          sessionStorage.getItem(
            "alphaBotTVPurchaseState"
          );

        if (!savedState) {
          sessionStorage.setItem(
            "alphaBotTransactionResult",
            JSON.stringify({
              status: "failed",
              message:
                "TV subscription information was not found.",
              returnPath: "/tv"
            })
          );

          router.push("/transaction-result");
          return;
        }

        const state = JSON.parse(savedState);
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://api.alphabothq.com/tv/subscribe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Idempotency-Key":
                typeof crypto !== "undefined" &&
                crypto.randomUUID
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random()}`
            },
            body: JSON.stringify({
              provider: state.provider,
              smartCardNumber: state.smartCardNumber,
              variation_id: state.tvPackage,
              amount: Number(state.amount),
              pin
            })
          }
        );

        const result = await res.json();

        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            ...result,
            status:
              result.status ||
              (res.ok ? "success" : "failed"),
            returnPath: "/tv"
          })
        );

        sessionStorage.removeItem(
          "alphaBotTVPurchaseState"
        );

        router.push("/transaction-result");

      } catch (error) {
        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            status: "failed",
            message: "Connection error",
            returnPath: "/tv"
          })
        );

        sessionStorage.removeItem(
          "alphaBotTVPurchaseState"
        );

        router.push("/transaction-result");
      }

      return;
    }

    if (service === "betting") {
      if (processing) return;

      setProcessing(true);

      try {
        const savedState =
          sessionStorage.getItem(
            "alphaBotBettingPurchaseState"
          );

        if (!savedState) {
          sessionStorage.setItem(
            "alphaBotTransactionResult",
            JSON.stringify({
              status: "failed",
              message:
                "Betting funding information was not found.",
              returnPath: "/betting"
            })
          );

          router.push("/transaction-result");
          return;
        }

        const state = JSON.parse(savedState);
        const token = localStorage.getItem("token");

        const idempotencyKey =
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`;

        const res = await fetch(
          `${API}/betting/fund`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Idempotency-Key": idempotencyKey
            },
            body: JSON.stringify({
              customer_id: state.phone,
              service_id: state.provider,
              amount: Number(state.amount),
              pin
            })
          }
        );

        const result = await res.json();

        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            ...result,
            status:
              result.status ||
              (res.ok ? "success" : "failed"),
            returnPath: "/betting"
          })
        );

        sessionStorage.removeItem(
          "alphaBotBettingPurchaseState"
        );

        router.push("/transaction-result");

      } catch (error) {
        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            status: "failed",
            message: "Connection error",
            returnPath: "/betting"
          })
        );

        sessionStorage.removeItem(
          "alphaBotBettingPurchaseState"
        );

        router.push("/transaction-result");
      }

      return;
    }

    if (service === "exam-pin") {
      if (processing) return;

      setProcessing(true);

      try {
        const savedState =
          sessionStorage.getItem(
            "alphaBotExamPinPurchaseState"
          );

        if (!savedState) {
          sessionStorage.setItem(
            "alphaBotTransactionResult",
            JSON.stringify({
              status: "failed",
              message:
                "Exam PIN purchase information was not found.",
              returnPath: "/exam-pin"
            })
          );

          router.push("/transaction-result");
          return;
        }

        const state = JSON.parse(savedState);
        const token = localStorage.getItem("token");

        const idempotencyKey =
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`;

        const res = await fetch(
          "https://api.alphabothq.com/exam-pin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Idempotency-Key": idempotencyKey
            },
            body: JSON.stringify({
              phone: state.phone,
              exam: state.exam,
              quantity: Number(state.quantity),
              pin
            })
          }
        );

        const result = await res.json();

        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            ...result,
            status:
              result.status ||
              (res.ok ? "success" : "failed"),
            returnPath: "/exam-pin"
          })
        );

        sessionStorage.removeItem(
          "alphaBotExamPinPurchaseState"
        );

        router.push("/transaction-result");

      } catch (error) {
        sessionStorage.setItem(
          "alphaBotTransactionResult",
          JSON.stringify({
            status: "failed",
            message: "Connection error",
            returnPath: "/exam-pin"
          })
        );

        sessionStorage.removeItem(
          "alphaBotExamPinPurchaseState"
        );

        router.push("/transaction-result");
      }

      return;
    }

    if (service === "recharge-pin") {
      if (processing) return;

      setProcessing(true);

      try {
        const savedState =
          sessionStorage.getItem(
            "alphaBotRechargePinPurchaseState"
          );

        if (!savedState) {
          sessionStorage.setItem(
            "alphaBotRechargePinResult",
            JSON.stringify({
              status: "failed",
              message:
                "Recharge PIN purchase information was not found."
            })
          );

          router.push("/recharge-pin");
          return;
        }

        const state = JSON.parse(savedState);
        const token = localStorage.getItem("token");

        const idempotencyKey =
          sessionStorage.getItem(
            "alphaBotEPinIdempotencyKey"
          ) ||
          (
            typeof crypto !== "undefined" &&
            crypto.randomUUID
              ? crypto.randomUUID()
              : `EPIN-${Date.now()}-${Math.random().toString(36).slice(2)}`
          );

        sessionStorage.setItem(
          "alphaBotEPinIdempotencyKey",
          idempotencyKey
        );

        const res = await fetch(
          "https://api.alphabothq.com/epin/buy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Idempotency-Key": idempotencyKey
            },
            body: JSON.stringify({
              phone: state.phone,
              network: state.network,
              amount: Number(state.amount),
              quantity: Number(state.quantity),
              pin
            })
          }
        );

        const result = await res.json();

        sessionStorage.setItem(
          "alphaBotRechargePinResult",
          JSON.stringify({
            ...result,
            status:
              result.status ||
              (res.ok ? "successful" : "failed")
          })
        );

        sessionStorage.removeItem(
          "alphaBotRechargePinPurchaseState"
        );

        sessionStorage.removeItem(
          "alphaBotEPinIdempotencyKey"
        );

        router.push("/recharge-pin");

      } catch (error) {

        sessionStorage.setItem(
          "alphaBotRechargePinResult",
          JSON.stringify({
            status: "failed",
            message: "Connection error"
          })
        );

        sessionStorage.removeItem(
          "alphaBotRechargePinPurchaseState"
        );

        sessionStorage.removeItem(
          "alphaBotEPinIdempotencyKey"
        );

        router.push("/recharge-pin");
      }

      return;
    }

    const separator =
      returnPath.includes("?") ? "&" : "?";

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

          {(service === "airtime" || service === "data" || service === "electricity" || service === "tv" || service === "betting" || service === "exam-pin" || service === "recharge-pin") && processing && (
            <div className="mb-5 text-sm font-bold text-blue-400">
              Processing transaction...
            </div>
          )}

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
