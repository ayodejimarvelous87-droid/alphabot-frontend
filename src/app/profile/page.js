"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const API = "https://alphabot-1.onrender.com";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const load = async () => {

      try {

        const saved = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!saved || !token) {
          window.location.href = "/login";
          return;
        }

        const localUser = JSON.parse(saved);

        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [profileRes, walletRes] = await Promise.all([

          fetch(
            `${API}/users/profile/${localUser.phone}`,
            { headers }
          ),

          fetch(
            `${API}/wallet/balance/${localUser.phone}`,
            { headers }
          )

        ]);

        const profileData = await profileRes.json();
        const walletData = await walletRes.json();

        const currentUser =
          profileRes.ok
            ? profileData
            : localUser;

        setUser(currentUser);

        localStorage.setItem(
          "user",
          JSON.stringify(currentUser)
        );

        if (walletRes.ok) {
          setBalance(walletData.balance || 0);
        }

      } catch (error) {

        console.log(error);
        setError("Unable to load account");

      } finally {

        setLoading(false);

      }

    };

    load();

  }, []);


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

  };


  if (loading) {

    return (

      <main className="min-h-screen bg-[#050505] text-white px-5 py-8">

        <div className="max-w-md mx-auto">

          <p className="text-zinc-400">
            Loading account...
          </p>

        </div>

      </main>

    );

  }


  return (

    <main className="min-h-screen bg-[#050505] text-white px-5 py-6 pb-24">

      <div className="max-w-md mx-auto space-y-5">


        {/* HEADER */}

        <div>

          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
            AlphaBot
          </p>

          <h1 className="text-3xl font-black mt-2">
            Account
          </h1>

          <p className="text-zinc-400 mt-1">
            Manage your account and preferences
          </p>

        </div>


        {/* PROFILE + WALLET */}

        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5">

          <div className="flex items-start justify-between gap-4">

            {/* USER */}

            <div className="flex items-center gap-3 min-w-0">

              <div className="w-12 h-12 shrink-0 rounded-2xl bg-white text-black flex items-center justify-center text-xl font-black">
                A
              </div>

              <div className="min-w-0">

                <h2 className="text-lg font-black truncate">
                  {user?.name || "AlphaBot User"}
                </h2>

                <p className="text-xs text-zinc-500 truncate mt-1">
                  {user?.phone || "No phone number"}
                </p>

              </div>

            </div>


            {/* MEMBERSHIP PANTHER */}

            {(() => {

              const tier =
                String(user?.accountTier || "normal").toLowerCase();

              const isGold = tier === "gold";
              const isSilver = tier === "silver";

              const accent = isGold
                ? "#D4AF37"
                : isSilver
                  ? "#C0C0C0"
                  : "#52525B";

              const label = isGold
                ? "GOLD USER"
                : isSilver
                  ? "SILVER USER"
                  : "USER";

              return (

                <div className="shrink-0 flex flex-col items-center">

                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      border: `1px solid ${accent}`,
                      boxShadow: `0 0 18px ${accent}33`
                    }}
                  >

                    <div
                      className="absolute inset-1 rounded-full border"
                      style={{borderColor:`${accent}66`}}
                    />

                    {/* Premium Panther emblem */}

                    <svg
                      viewBox="0 0 100 100"
                      className="w-11 h-11"
                      aria-label="Panther membership emblem"
                    >

                      {/* Ears / head silhouette */}

                      <path
                        d="
                          M18 35
                          L13 15
                          L31 23

                          C36 20 42 18 50 18
                          C58 18 64 20 69 23

                          L87 15
                          L82 35

                          C87 42 88 52 85 62
                          C82 74 72 83 60 87

                          C56 89 53 91 50 94
                          C47 91 44 89 40 87

                          C28 83 18 74 15 62
                          C12 52 13 42 18 35
                          Z
                        "
                        fill="#050505"
                        stroke={accent}
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />

                      {/* Brow / forehead definition */}

                      <path
                        d="
                          M25 39
                          C32 30 41 27 50 27
                          C59 27 68 30 75 39
                          C68 35 61 34 50 34
                          C39 34 32 35 25 39
                          Z
                        "
                        fill="#18181B"
                      />

                      {/* Aggressive eyes */}

                      <path
                        d="
                          M25 47
                          C30 43 37 43 43 47
                          C38 51 31 51 25 47
                          Z
                        "
                        fill={accent}
                      />

                      <path
                        d="
                          M57 47
                          C63 43 70 43 75 47
                          C69 51 62 51 57 47
                          Z
                        "
                        fill={accent}
                      />

                      {/* Black pupils */}

                      <path
                        d="M31 47 L38 46 L34 49 Z"
                        fill="#050505"
                      />

                      <path
                        d="M69 47 L62 46 L66 49 Z"
                        fill="#050505"
                      />

                      {/* Nose */}

                      <path
                        d="
                          M43 58
                          Q50 54 57 58
                          L54 63
                          Q50 66 46 63
                          Z
                        "
                        fill={accent}
                      />

                      {/* Muzzle */}

                      <path
                        d="
                          M31 61
                          C37 67 43 69 50 69
                          C57 69 63 67 69 61
                          C66 72 59 77 50 77
                          C41 77 34 72 31 61
                          Z
                        "
                        fill="#111113"
                      />

                      {/* Mouth / jaw */}

                      <path
                        d="
                          M38 70
                          Q50 76 62 70
                          Q58 82 50 84
                          Q42 82 38 70
                          Z
                        "
                        fill="#050505"
                        stroke={accent}
                        strokeWidth="1"
                      />

                      {/* Small metallic highlight */}

                      <path
                        d="M20 35 L16 20 L29 26"
                        fill="none"
                        stroke={accent}
                        strokeWidth="1"
                        opacity="0.8"
                      />

                      <path
                        d="M80 35 L84 20 L71 26"
                        fill="none"
                        stroke={accent}
                        strokeWidth="1"
                        opacity="0.8"
                      />

                    </svg>

                  </div>

                  <span
                    className="text-[8px] font-black tracking-widest mt-1"
                    style={{color:accent}}
                  >
                    {label}
                  </span>

                </div>

              );

            })()}

          </div>


          {/* BALANCE */}

          <div className="mt-6 pt-5 border-t border-zinc-800">

            <p className="text-xs text-zinc-500 uppercase tracking-wider">
              Total balance
            </p>

            <div className="flex items-center gap-2 mt-1">

              <h2 className="text-3xl font-black tracking-tight">
                {balanceVisible
                  ? `₦${Number(balance).toLocaleString("en-US")}`
                  : "••••••"}
              </h2>

              <button
                type="button"
                aria-label={
                  balanceVisible
                    ? "Hide balance"
                    : "Show balance"
                }
                className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white transition"
                onClick={() =>
                  setBalanceVisible(prev => !prev)
                }
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-5 h-5"
                >
                  {balanceVisible ? (
                    <>
                      <path
                        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                      />
                      <circle cx="12" cy="12" r="2.5" />
                    </>
                  ) : (
                    <>
                      <path d="M3 3l18 18" />
                      <path d="M10.6 6.2A10.5 10.5 0 0 1 12 6c6 0 9.5 6 9.5 6a17.5 17.5 0 0 1-3.1 3.7" />
                      <path d="M6.2 6.3C3.9 8 2.5 12 2.5 12s3.5 6 9.5 6c1.4 0 2.7-.3 3.8-.8" />
                    </>
                  )}
                </svg>

              </button>

            </div>

          </div>


          {/* ACCOUNT STATUS */}

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-800">

            <span className="text-sm text-zinc-500">
              Account status
            </span>

            <span
              className={
                user?.emailVerified
                  ? "text-sm font-bold text-green-400"
                  : "text-sm font-bold text-yellow-400"
              }
            >
              {user?.emailVerified
                ? "✓ Verified"
                : "⏳ Pending"}
            </span>

          </div>


          <Link
            href="/wallet"
            className="block mt-5 text-center bg-white text-black rounded-xl py-3 font-bold hover:bg-zinc-200 transition"
          >
            Open Wallet
          </Link>

        </div>


        {/* ACCOUNT LEVEL */}

        <Link
          href="/account-upgrade"
          className="block bg-[#18181B] border border-zinc-800 rounded-3xl p-5 hover:border-yellow-400 transition"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                Membership
              </p>

              <h2 className="text-lg font-black mt-1">
                Upgrade
              </h2>

            </div>

            <span className="px-4 py-2 rounded-xl bg-yellow-400 text-black text-xs font-black">
              UPGRADE
            </span>

          </div>

          <p className="text-sm text-zinc-400 mt-3">
            Upgrade your AlphaBot account and unlock more benefits.
          </p>

        </Link>


        {/* ACCOUNT MANAGEMENT */}

        <div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
            Account Management
          </p>


          <div className="space-y-2">


            <Link
              href="/edit-profile"
              className="flex items-center gap-4 bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
            >

              <span className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">
                ✏️
              </span>

              <div className="flex-1">

                <p className="font-bold">
                  Edit Profile
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  Update your personal information
                </p>

              </div>

              <span className="text-zinc-500">
                ›
              </span>

            </Link>


            <Link
              href="/settings"
              className="flex items-center gap-4 bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
            >

              <span className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">
                ⚙️
              </span>

              <div className="flex-1">

                <p className="font-bold">
                  Settings
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  Security, password and account controls
                </p>

              </div>

              <span className="text-zinc-500">
                ›
              </span>

            </Link>


            <Link
              href="/transactions"
              className="flex items-center gap-4 bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
            >

              <span className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">
                📜
              </span>

              <div className="flex-1">

                <p className="font-bold">
                  Transaction History
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  View your wallet activity
                </p>

              </div>

              <span className="text-zinc-500">
                ›
              </span>

            </Link>


          </div>

        </div>


        {/* TRANSACTION HISTORY */}

        <div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
            Activity
          </p>

          <Link
            href="/transactions"
            className="flex items-center gap-4 bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
          >

            <span className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">
              📜
            </span>

            <div className="flex-1">

              <p className="font-bold">
                Transaction History
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                View your wallet and payment activities
              </p>

            </div>

            <span className="text-zinc-500">
              ›
            </span>

          </Link>

        </div>


        {/* REFERRAL */}

        <div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
            Earn & Rewards
          </p>


          <Link
            href="/referral"
            className="flex items-center gap-4 bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
          >

            <span className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">
              🎁
            </span>

            <div className="flex-1">

              <p className="font-bold">
                Invite & Earn
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                Share AlphaBot and earn referral rewards
              </p>

            </div>

            <span className="text-zinc-500">
              ›
            </span>

          </Link>

        </div>


        {/* SUPPORT */}

        <div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
            Help
          </p>


          <div className="space-y-2">


            <Link
              href="/support"
              className="flex items-center gap-4 bg-[#18181B] border border-zinc-800 rounded-2xl p-4"
            >

              <span className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">
                🆘
              </span>

              <div className="flex-1">

                <p className="font-bold">
                  Support
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  Get help with your account
                </p>

              </div>

              <span className="text-zinc-500">
                ›
              </span>

            </Link>


            <Link
              href="/terms"
              className="flex items-center gap-4 bg-[#18181B] border border-zinc-800 rounded-2xl p-4"
            >

              <span className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">
                📄
              </span>

              <div className="flex-1">

                <p className="font-bold">
                  Terms & Conditions
                </p>

              </div>

              <span className="text-zinc-500">
                ›
              </span>

            </Link>


            <Link
              href="/privacy"
              className="flex items-center gap-4 bg-[#18181B] border border-zinc-800 rounded-2xl p-4"
            >

              <span className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">
                🔒
              </span>

              <div className="flex-1">

                <p className="font-bold">
                  Privacy Policy
                </p>

              </div>

              <span className="text-zinc-500">
                ›
              </span>

            </Link>


          </div>

        </div>


        {error && (

          <p className="text-red-400 text-center text-sm">
            {error}
          </p>

        )}


        {/* LOGOUT */}

        <button
          onClick={logout}
          className="w-full bg-[#18181B] border border-red-900 text-red-400 rounded-2xl py-4 font-bold"
        >
          Log Out
        </button>


      </div>


      <BottomNav />

    </main>

  );
}
