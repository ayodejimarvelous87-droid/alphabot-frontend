"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const API = "https://api.alphabothq.com";

const defaultBenefits = {
  silver: [
    "2x coins on eligible rewards",
    "Weekly member bonuses",
    "Access to Silver member promotions"
  ],
  gold: [
    "3x coins on eligible rewards",
    "Weekly member bonuses",
    "Reduced prices during Gold promotions",
    "Access to Gold-only deals"
  ]
};

export default function AccountUpgrade() {
  const [tier, setTier] = useState("normal");
  const [expiresAt, setExpiresAt] = useState(null);

  const [membershipInfo, setMembershipInfo] = useState(null);
  const [paymentRequests, setPaymentRequests] = useState([]);

  const [selectedTier, setSelectedTier] = useState("silver");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);

  const loadMembership = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`
      };

      const [tierRes, infoRes, requestsRes] = await Promise.all([
        fetch(`${API}/users/account-tier`, { headers }),
        fetch(`${API}/users/membership/payment-info`, { headers }),
        fetch(`${API}/users/membership/payments`, { headers })
      ]);

      const tierData = await tierRes.json();
      const infoData = await infoRes.json();
      const requestsData = await requestsRes.json();

      if (tierRes.ok) {
        setTier(tierData.accountTier || "normal");
        setExpiresAt(tierData.accountTierExpiresAt || null);
      }

      if (infoRes.ok && infoData.success) {
        setMembershipInfo(infoData);

        if (
          infoData.silver &&
          infoData.gold &&
          tier !== "gold"
        ) {
          setSelectedTier("silver");
        }
      } else {
        setError(
          infoData.message ||
          "Unable to load membership payment information."
        );
      }

      if (requestsRes.ok && requestsData.success) {
        setPaymentRequests(requestsData.requests || []);
      }

    } catch (err) {
      console.error(err);
      setError("Unable to load membership information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembership();
  }, []);

  const pendingRequest = paymentRequests.find(
    request =>
      request.status === "pending" ||
      request.status === "processing"
  );

  const currentTier =
    tier === "silver"
      ? "Silver"
      : tier === "gold"
        ? "Gold"
        : "User";

  const selectedMembership =
    membershipInfo?.[selectedTier];

  const paymentAccount =
    membershipInfo?.paymentAccount;

  const copyAccountNumber = async () => {
    if (!paymentAccount?.accountNumber) return;

    try {
      await navigator.clipboard.writeText(
        paymentAccount.accountNumber
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  };

  const submitPayment = async () => {
    setError("");
    setMessage("");

    if (pendingRequest) {
      setError(
        "You already have a membership payment awaiting approval."
      );
      return;
    }

    if (!selectedTier || !["silver", "gold"].includes(selectedTier)) {
      setError("Please select a membership plan.");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API}/users/membership/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            tier: selectedTier
          })
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message ||
          "Unable to submit membership payment."
        );
      }

      setMessage(
        "Payment submitted successfully. Your membership will be activated after approval."
      );

      await loadMembership();

    } catch (err) {
      console.error(err);

      setError(
        err.message ||
        "Unable to submit membership payment."
      );

    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = value => {
    if (!value) return "";

    return new Date(value).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-white px-5 py-8">
        <div className="max-w-md mx-auto">
          <p className="text-zinc-500 dark:text-zinc-400">
            Loading membership...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-white px-5 py-8 pb-28">
      <div className="max-w-md mx-auto">

        <Link
          href="/profile"
          className="text-zinc-500 dark:text-zinc-400 text-sm"
        >
          ← Account
        </Link>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-400 font-bold">
            AlphaBot Membership
          </p>

          <h1 className="text-3xl font-black mt-2">
            Upgrade your account
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
            Choose a membership plan and submit your payment
            for approval.
          </p>
        </div>

        {/* Current membership */}
        <div className="mt-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-5">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Current membership
          </p>

          <div className="flex items-end justify-between mt-2">
            <div>
              <h2 className="text-2xl font-black">
                {currentTier}
              </h2>

              {expiresAt && tier !== "normal" && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Expires {formatDate(expiresAt)}
                </p>
              )}
            </div>

            <span className="text-xs px-3 py-2 rounded-xl bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Pending request */}
        {pendingRequest && (
          <div className="mt-4 rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-5">
            <p className="text-yellow-400 font-black">
              Payment awaiting approval
            </p>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
              Your {String(pendingRequest.tier).toUpperCase()}
              {" "}membership payment of{" "}
              ₦{Number(pendingRequest.amount || 0).toLocaleString()}
              {" "}has been submitted.
            </p>

            <p className="text-xs text-zinc-500 mt-2">
              You cannot submit another membership payment
              while this request is pending.
            </p>
          </div>
        )}

        {/* Plan selection */}
        <div className="mt-8">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
            Choose your plan
          </p>

          <div className="grid grid-cols-2 gap-3 mt-3">

            {["silver", "gold"].map(plan => {
              const data = membershipInfo?.[plan];

              const active = selectedTier === plan;

              return (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setSelectedTier(plan)}
                  disabled={!!pendingRequest}
                  className={
                    active
                      ? "text-left rounded-3xl p-5 border border-white bg-white text-black"
                      : "text-left rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181B] text-zinc-950 dark:text-white"
                  }
                >
                  <p className="text-xs uppercase tracking-widest opacity-60">
                    Membership
                  </p>

                  <h2 className="text-2xl font-black mt-1">
                    {plan === "silver" ? "Silver" : "Gold"}
                  </h2>

                  <p className="text-lg font-black mt-3">
                    ₦{Number(data?.price || 0).toLocaleString()}
                  </p>

                  <p className="text-xs opacity-60 mt-1">
                    {data?.durationDays || 30} days
                  </p>

                  {active && (
                    <div className="mt-4 text-xs font-black">
                      SELECTED ✓
                    </div>
                  )}
                </button>
              );
            })}

          </div>
        </div>

        {/* Benefits */}
        {selectedMembership && (
          <div className="mt-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-5">
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
              {selectedTier === "silver" ? "Silver" : "Gold"} benefits
            </p>

            <div className="mt-4 space-y-3">
              {(selectedMembership.benefits ||
                defaultBenefits[selectedTier] ||
                []).map(benefit => (
                  <div
                    key={benefit}
                    className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-300"
                  >
                    <span className="text-yellow-400 font-black">
                      ✓
                    </span>

                    <span>{benefit}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Payment account */}
        {paymentAccount && (
          <div className="mt-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-5">

            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
              Payment details
            </p>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Transfer exactly{" "}
              <span className="text-zinc-950 dark:text-white font-bold">
                ₦{Number(selectedMembership?.price || 0).toLocaleString()}
              </span>
              {" "}to the account below.
            </p>

            <div className="mt-4 rounded-2xl bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 p-4">

              {paymentAccount.bankName && (
                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500 text-sm">
                    Bank
                  </span>

                  <span className="font-bold text-right">
                    {paymentAccount.bankName}
                  </span>
                </div>
              )}

              {paymentAccount.accountName && (
                <div className="flex justify-between gap-4 mt-3">
                  <span className="text-zinc-500 text-sm">
                    Account name
                  </span>

                  <span className="font-bold text-right">
                    {paymentAccount.accountName}
                  </span>
                </div>
              )}

              {paymentAccount.accountNumber && (
                <div className="mt-4">
                  <p className="text-zinc-500 text-sm">
                    Account number
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <div className="flex-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 px-4 py-3 font-black tracking-wider">
                      {paymentAccount.accountNumber}
                    </div>

                    <button
                      type="button"
                      onClick={copyAccountNumber}
                      className="rounded-xl bg-white text-black px-4 py-3 text-xs font-black"
                    >
                      {copied ? "COPIED" : "COPY"}
                    </button>

                  </div>
                </div>
              )}

            </div>

            <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
              Make your transfer using the details shown above,
              then submit the request below. Your membership is
              activated only after the payment is reviewed and approved.
            </p>
          </div>
        )}

        {/* No refund policy */}
        <div className="mt-5 rounded-3xl border border-red-500/30 bg-red-500/5 p-5">

          <div className="flex items-center gap-2">
            <span className="text-red-400 text-lg">
              ⚠
            </span>

            <h3 className="font-black text-red-400">
              NO REFUND POLICY
            </h3>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-3 leading-relaxed">
            All membership payments are final and
            <span className="font-bold text-zinc-950 dark:text-white">
              {" "}non-refundable{" "}
            </span>
            once submitted. Please confirm that you have
            selected the correct membership plan and transferred
            the correct amount before submitting your payment
            request.
          </p>

          <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
            AlphaBot does not provide refunds for accidental
            transfers, incorrect membership selections, or
            membership payments submitted in error.
          </p>

        </div>

        {/* Messages */}
        {message && (
          <div className="mt-5 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={submitPayment}
          disabled={
            submitting ||
            !!pendingRequest ||
            !paymentAccount ||
            !selectedMembership
          }
          className="w-full mt-5 py-4 rounded-2xl bg-white text-black font-black disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
        >
          {submitting
            ? "SUBMITTING..."
            : pendingRequest
              ? "PAYMENT AWAITING APPROVAL"
              : `I HAVE PAID ₦${Number(
                  selectedMembership?.price || 0
                ).toLocaleString()}`}
        </button>

        <p className="text-xs text-zinc-600 text-center mt-3 leading-relaxed">
          By submitting this request, you confirm that you
          understand and accept the no-refund policy.
        </p>

        <Link
          href="/support"
          className="block mt-6 text-center text-yellow-400 font-bold"
        >
          Need help? Contact Support
        </Link>

      </div>

      <BottomNav />
    </main>
  );
}
