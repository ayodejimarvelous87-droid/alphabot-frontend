"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MarketplacePaymentResultPage() {
  const [status, setStatus] = useState("checking");
  const [message, setMessage] = useState(
    "Verifying your Marketplace payment..."
  );

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please log in again to verify your payment.");
        }

        const activeCheckout = JSON.parse(
          localStorage.getItem(
            "alphabotMarketplaceActiveCheckout"
          ) || "null"
        );

        if (!activeCheckout?.checkoutId) {
          throw new Error(
            "Marketplace checkout information was not found."
          );
        }

        const params = new URLSearchParams(window.location.search);

        const transactionId =
          params.get("transaction_id") ||
          params.get("transactionId");

        if (!transactionId) {
          throw new Error(
            "Flutterwave transaction ID was not returned."
          );
        }

        const res = await fetch(
          `https://api.alphabothq.com/marketplace/orders/checkout/${activeCheckout.checkoutId}/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              transactionId,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(
            data.message ||
              "We could not verify your Marketplace payment."
          );
        }

        localStorage.removeItem(
          "alphabotMarketplaceActiveCheckout"
        );

        setStatus("success");
        setMessage(
          "Your Marketplace payment has been verified successfully."
        );

      } catch (error) {
        console.error(
          "MARKETPLACE PAYMENT RESULT ERROR:",
          error
        );

        setStatus("error");
        setMessage(
          error.message ||
            "We could not verify your payment."
        );
      }
    };

    verifyPayment();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white px-4 py-10">

      <div className="max-w-2xl mx-auto">

        <div className="text-center pt-12">

          <div className="mx-auto w-20 h-20 rounded-full bg-yellow-400 text-black flex items-center justify-center text-4xl">
            {status === "checking"
              ? "…"
              : status === "success"
              ? "✓"
              : "!"}
          </div>

          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500 mt-6">
            ALPHABOT MARKETPLACE
          </p>

          <h1 className="text-2xl font-black mt-2">
            {status === "checking"
              ? "Verifying payment"
              : status === "success"
              ? "Payment successful"
              : "Payment verification failed"}
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 max-w-sm mx-auto leading-6">
            {message}
          </p>

        </div>

        {status === "success" && (
          <div className="mt-8 grid grid-cols-2 gap-3">

            <Link
              href="/marketplace/orders"
              className="h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xs font-black active:scale-95 transition"
            >
              View orders
            </Link>

            <Link
              href="/marketplace"
              className="h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs font-black active:scale-95 transition"
            >
              Marketplace
            </Link>

          </div>
        )}

        {status === "error" && (
          <div className="mt-8">

            <Link
              href="/marketplace/orders"
              className="h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xs font-black active:scale-95 transition"
            >
              View orders
            </Link>

          </div>
        )}

      </div>

    </main>
  );
}
