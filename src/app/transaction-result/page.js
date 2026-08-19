"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TransactionResultPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved =
      sessionStorage.getItem("alphaBotTransactionResult");

    if (!saved) {
      router.replace("/dashboard");
      return;
    }

    try {
      setResult(JSON.parse(saved));
    } catch (error) {
      sessionStorage.removeItem(
        "alphaBotTransactionResult"
      );

      router.replace("/dashboard");
    }
  }, [router]);

  if (!result) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p className="text-zinc-500">
          Loading...
        </p>
      </main>
    );
  }

  const successful = result.status === "success" || result.status === "successful";
  const processing = result.status === "processing";

  const title = successful
    ? "Transaction Successful"
    : processing
    ? "Transaction Processing"
    : "Transaction Failed";

  const icon = successful
    ? "✓"
    : processing
    ? "..."
    : "×";

  const done = () => {
    sessionStorage.removeItem(
      "alphaBotTransactionResult"
    );

    router.push(
      result.returnPath || "/dashboard"
    );
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white px-5 py-8 flex items-center justify-center">

      <div className="w-full max-w-md">

        {/* AlphaBot AB Logo */}

        <div className="flex justify-center mb-10">

          <div className="relative">

            <div className="absolute inset-0 rounded-[2rem] bg-blue-600/20 blur-2xl" />

            <div className="relative w-24 h-24 rounded-[2rem] border border-zinc-700 bg-zinc-950 flex items-center justify-center shadow-2xl">

              <span className="text-3xl font-black tracking-[-0.15em] mr-1">
                AB
              </span>

            </div>

          </div>

        </div>


        {/* Result */}

        <div className="text-center">

          <div
            className={`mx-auto w-20 h-20 rounded-full border flex items-center justify-center text-4xl font-black ${
              successful
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : processing
                ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
                : "border-red-500/40 bg-red-500/10 text-red-400"
            }`}
          >
            {icon}
          </div>

          <h1 className="text-3xl font-black mt-7">
            {title}
          </h1>

          <p className="text-zinc-400 mt-3 leading-6">
            {successful
              ? "Thank you for choosing AlphaBot. Your transaction has been completed successfully."
              : processing
              ? "Thank you for choosing AlphaBot. Your transaction is currently being processed."
              : "We are sorry, but your transaction could not be completed."}
          </p>

        </div>


        {/* Transaction Message */}

        {result.message && (
          <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Transaction Details
            </p>

            <p className="text-sm text-zinc-300 mt-3 leading-6">
              {result.message}
            </p>

          </section>
        )}


        {/* Recharge PIN */}

        {result.epin?.pins?.length > 0 && (
          <section className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-5">

            <div className="flex items-center justify-between">

              <h2 className="font-black text-lg">
                🔐 Recharge PIN
              </h2>

              <span className="text-xs text-emerald-400 font-bold">
                READY
              </span>

            </div>

            <div className="mt-4 space-y-3">

              {result.epin.pins.map((item, index) => {

                const value =
                  item.pin || item;

                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-[#050505] border border-zinc-800 p-4"
                  >

                    <p className="text-xs text-zinc-500">
                      PIN {index + 1}
                    </p>

                    <p className="text-xl font-black tracking-wider mt-2 break-all">
                      {value}
                    </p>

                  </div>
                );

              })}

            </div>

          </section>
        )}


        {/* Reference */}

        {result.reference && (
          <div className="mt-6 text-center">

            <p className="text-xs text-zinc-600 uppercase tracking-widest">
              Reference
            </p>

            <p className="text-xs text-zinc-500 mt-2 break-all">
              {result.reference}
            </p>

          </div>
        )}


        {/* Done */}

        <button
          type="button"
          onClick={done}
          className="w-full mt-8 py-4 rounded-2xl bg-white text-black font-black text-lg active:scale-[0.98] transition"
        >
          Done
        </button>


        <p className="text-center text-xs text-zinc-600 mt-5">
          Thank you for choosing AlphaBot.
        </p>

      </div>

    </main>
  );
}
