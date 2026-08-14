"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const API = "https://alphabot-1.onrender.com";

export default function Coins() {

  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [target, setTarget] = useState(1000);
  const [reward, setReward] = useState(200);
  const [rate, setRate] = useState(0.2);

  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);
  const [message, setMessage] = useState("");

  const progress =
    target > 0
      ? Math.min((coins / target) * 100, 100)
      : 0;

  const refreshData = async () => {

    const token = localStorage.getItem("token");
    const saved = localStorage.getItem("user");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (!saved) {
      window.location.href = "/login";
      return;
    }

    const savedUser = JSON.parse(saved);
    const phone = savedUser.phone;

    try {

      const [profileRes, settingsRes] = await Promise.all([

        fetch(
          `${API}/users/profile/${phone}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ),

        fetch(`${API}/settings`)
      ]);

      const profile = await profileRes.json();
      const settings = await settingsRes.json();

      if (!profileRes.ok || profile.message) {
        throw new Error(
          profile.message || "Unable to load profile"
        );
      }

      setUser(profile);
      setCoins(Number(profile.abCoins || 0));

      localStorage.setItem(
        "user",
        JSON.stringify(profile)
      );

      if (settingsRes.ok) {

        setTarget(
          Number(
            settings.abCoinsRedemptionTarget ?? 1000
          )
        );

        setReward(
          Number(
            settings.abCoinsRedemptionReward ?? 200
          )
        );

        setRate(
          Number(
            settings.abCoinsPer100Naira ?? 0.2
          )
        );

      }

    } catch (error) {

      console.error("AB Coins load error:", error);

      setMessage(
        error.message || "Unable to load AB Coins"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    refreshData();
  }, []);


  const redeem = async () => {

    if (redeeming || coins < target) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setRedeeming(true);
    setMessage("");

    const idempotencyKey =
      `WEB-REDEEM-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}`;

    try {

      const res = await fetch(
        `${API}/wallet/redeem-coins`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Idempotency-Key": idempotencyKey
          },

          body: JSON.stringify({})
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Redemption failed"
        );
      }

      if (data.redeemed) {

        setMessage(
          `✅ ${data.coinsRedeemed.toLocaleString()} AB Coins redeemed for ₦${Number(
            data.walletCredit
          ).toLocaleString()} wallet credit.`
        );

      } else if (
        data.reason === "already_redeemed"
      ) {

        setMessage(
          "This redemption has already been processed."
        );

      } else {

        setMessage(
          data.message || "Redemption completed."
        );

      }

      await refreshData();

    } catch (error) {

      console.error("AB Coin redemption error:", error);

      setMessage(
        error.message || "Redemption failed"
      );

    } finally {

      setRedeeming(false);

    }

  };


  const earnExamples = [
    ["₦100", 100],
    ["₦250", 250],
    ["₦500", 500],
    ["₦1,000", 1000],
    ["₦5,000", 5000]
  ];


  return (

    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        <Link
          href="/dashboard"
          className="text-yellow-500 font-semibold"
        >
          ← Dashboard
        </Link>


        <div className="mt-7 text-center">

          <div className="w-20 h-20 mx-auto rounded-3xl bg-yellow-400 flex items-center justify-center shadow-xl shadow-yellow-400/10">

            <span className="text-4xl">
              🪙
            </span>

          </div>

          <h1 className="text-3xl font-black mt-5">
            AlphaBot Coins
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Earn Coins when you use AlphaBot.
          </p>

        </div>


        {message && (

          <div className="mt-5 rounded-2xl border border-zinc-800 p-4 text-sm">
            {message}
          </div>

        )}


        <section className="mt-7 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Your AB Coins
              </p>

              <h2 className="text-3xl font-black mt-1">

                {loading
                  ? "..."
                  : coins.toLocaleString()
                }

              </h2>

            </div>

            <span className="text-3xl">
              🪙
            </span>

          </div>


          <div className="mt-6">

            <div className="flex justify-between text-xs mb-2">

              <span className="text-zinc-500 dark:text-zinc-400">
                Progress
              </span>

              <span className="font-bold">
                {coins.toLocaleString()} / {target.toLocaleString()}
              </span>

            </div>


            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-yellow-400 rounded-full transition-all"
                style={{
                  width: `${progress}%`
                }}
              />

            </div>


            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">

              {coins >= target

                ? "Your reward is ready to redeem."

                : `${Math.max(
                    target - coins,
                    0
                  ).toLocaleString()} Coins remaining until your reward.`

              }

            </p>

          </div>

        </section>


        <section className="mt-5 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">

          <div className="text-3xl">
            🎁
          </div>

          <h2 className="text-xl font-bold mt-3">
            Your Reward
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">

            Collect{" "}

            <span className="font-bold text-black dark:text-white">
              {target.toLocaleString()} AB Coins
            </span>

            {" "}and redeem them for

            <span className="font-bold text-black dark:text-white">
              {" "}₦{reward.toLocaleString()} wallet credit.
            </span>

          </p>


          <button
            disabled={
              loading ||
              redeeming ||
              coins < target
            }

            onClick={redeem}

            className={`w-full mt-5 py-3 rounded-xl font-bold transition ${
              coins >= target && !redeeming
                ? "bg-yellow-400 text-black active:scale-95"
                : "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }`}
          >

            {redeeming
              ? "Redeeming..."
              : coins >= target
                ? `Redeem ₦${reward.toLocaleString()}`
                : `${target.toLocaleString()} Coins Required`
            }

          </button>

        </section>


        <section className="mt-5 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">

          <h2 className="text-xl font-bold">
            How to earn AB Coins
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Every successful purchase on AlphaBot can earn you Coins.
          </p>


          <div className="mt-5 space-y-3">

            {earnExamples.map(([amount, naira]) => {

              const coinReward =
                Math.round(
                  ((naira / 100) * rate) * 100
                ) / 100;

              return (

                <div
                  key={amount}
                  className="flex justify-between items-center bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3"
                >

                  <span className="font-semibold">
                    Spend {amount}
                  </span>

                  <span className="text-yellow-500 font-bold">
                    +{coinReward} Coins
                  </span>

                </div>

              );

            })}

          </div>

        </section>


        <section className="mt-5 text-center px-4">

          <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
            Coins are awarded for eligible successful purchases.
            Failed or cancelled transactions do not earn Coins.
            AlphaBot may update Coin rules and rewards when necessary.
          </p>

        </section>

      </div>


      <BottomNav />

    </main>

  );

}
