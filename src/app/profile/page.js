"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const API = "https://api.alphabothq.com";

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
      <main className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white px-5 py-8">
        <div className="max-w-md mx-auto animate-pulse space-y-5">
          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-28 bg-zinc-200 dark:bg-zinc-800 rounded-3xl"></div>
          <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-2xl"></div>
          <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-2xl"></div>
        </div>
      </main>
    );
  }

  return (
    <>
        <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-4 py-6 pb-28">
          <div className="max-w-md mx-auto space-y-5">

            {/* HEADER */}
            <header className="pt-2">
              <p className="text-[10px] font-black tracking-[0.25em] text-yellow-500 uppercase">
                AlphaBot
              </p>

              <div className="flex items-end justify-between mt-1">
                <div>
                  <h1 className="text-3xl font-black tracking-tight">
                    My Profile
                  </h1>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Your account, wallet & preferences
                  </p>
                </div>

                <Link
                  href="/settings"
                  className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-lg active:scale-90 transition"
                >
                  ⚙️
                </Link>
              </div>
            </header>

            {/* PROFILE HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-zinc-100 via-white to-zinc-50 dark:from-[#1B1B1F] dark:via-[#111113] dark:to-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-[30px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-yellow-400/10 blur-3xl" />

              <div className="relative flex items-center justify-between gap-4">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-14 h-14 shrink-0 rounded-[20px] bg-yellow-400 text-black flex items-center justify-center text-2xl font-black shadow-lg shadow-yellow-400/10">
                    {(user?.name || "A").charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xl font-black truncate">
                      {user?.name || "AlphaBot User"}
                    </h2>

                    <p className="text-xs text-zinc-500 truncate mt-1">
                      {user?.phone || "No phone number"}
                    </p>

                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-[9px] font-black text-green-400">
                        {user?.emailVerified ? "VERIFIED ACCOUNT" : "ACCOUNT ACTIVE"}
                      </span>
                    </div>
                  </div>

                </div>

                {/* MEMBERSHIP BADGE */}
                {(() => {
                  const tier =
                    String(user?.accountTier || "normal").toLowerCase();

                  const isGold = tier === "gold";
                  const isSilver = tier === "silver";

                  const accent = isGold
                    ? "#D4AF37"
                    : isSilver
                      ? "#C0C0C0"
                      : "#71717A";

                  const label = isGold
                    ? "GOLD"
                    : isSilver
                      ? "SILVER"
                      : "USER";

                  return (
                    <div className="shrink-0 flex flex-col items-center">
                      <div
                        className="relative w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                          border: `1px solid ${accent}`,
                          boxShadow: `0 0 22px ${accent}22`
                        }}
                      >
                        <div
                          className="absolute inset-1 rounded-full border"
                          style={{ borderColor: `${accent}55` }}
                        />

                        <svg
                          viewBox="0 0 100 100"
                          className="w-10 h-10"
                          aria-label="Panther membership emblem"
                        >
                          <path
                            d="M18 35 L13 15 L31 23 C36 20 42 18 50 18 C58 18 64 20 69 23 L87 15 L82 35 C87 42 88 52 85 62 C82 74 72 83 60 87 C56 89 53 91 50 94 C47 91 44 89 40 87 C28 83 18 74 15 62 C12 52 13 42 18 35 Z"
                            fill="#050505"
                            stroke={accent}
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />

                          <path
                            d="M25 39 C32 30 41 27 50 27 C59 27 68 30 75 39 C68 35 61 34 50 34 C39 34 32 35 25 39 Z"
                            fill="#18181B"
                          />

                          <path
                            d="M25 47 C30 43 37 43 43 47 C38 51 31 51 25 47 Z"
                            fill={accent}
                          />

                          <path
                            d="M57 47 C63 43 70 43 75 47 C69 51 62 51 57 47 Z"
                            fill={accent}
                          />

                          <path
                            d="M43 58 Q50 54 57 58 L54 63 Q50 66 46 63 Z"
                            fill={accent}
                          />

                          <path
                            d="M31 61 C37 67 43 69 50 69 C57 69 63 67 69 61 C66 72 59 77 50 77 C41 77 34 72 31 61 Z"
                            fill="#111113"
                          />

                          <path
                            d="M38 70 Q50 76 62 70 Q58 82 50 84 Q42 82 38 70 Z"
                            fill="#050505"
                            stroke={accent}
                            strokeWidth="1"
                          />
                        </svg>
                      </div>

                      <span
                        className="text-[7px] font-black tracking-[0.18em] mt-1"
                        style={{ color: accent }}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })()}

              </div>

              {/* BALANCE */}
              <div className="relative mt-6 pt-5 border-t border-white/10">

                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                    Available Balance
                  </p>

                  <button
                    type="button"
                    aria-label={
                      balanceVisible ? "Hide balance" : "Show balance"
                    }
                    onClick={() => setBalanceVisible(prev => !prev)}
                    className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 active:scale-90 transition"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-4 h-4"
                    >
                      {balanceVisible ? (
                        <>
                          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
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

                <h2 className="text-3xl font-black tracking-tight mt-1">
                  {balanceVisible
                    ? `₦${Number(balance).toLocaleString("en-US")}`
                    : "••••••"}
                </h2>

              </div>

              <Link
                href="/wallet"
                className="relative mt-5 flex items-center justify-center gap-2 w-full bg-yellow-400 text-black rounded-2xl py-3.5 font-black text-sm active:scale-[0.98] transition"
              >
                💳 Open Wallet
                <span>→</span>
              </Link>

            </section>

            {/* MEMBERSHIP */}
            <Link
              href="/account-upgrade"
              className="group relative overflow-hidden block bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-[26px] p-5 active:scale-[0.99] transition"
            >
              <div className="absolute right-0 top-0 w-28 h-28 bg-yellow-400/10 blur-3xl rounded-full" />

              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-yellow-500">
                    Membership
                  </p>

                  <h2 className="text-lg font-black mt-1">
                    Upgrade your AlphaBot
                  </h2>

                  <p className="text-xs text-zinc-500 mt-1">
                    Unlock more benefits and premium features.
                  </p>
                </div>

                <span className="shrink-0 w-11 h-11 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black text-lg">
                  ↑
                </span>
              </div>
            </Link>

            {/* ACCOUNT */}
            <section>
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 px-1">
                Account
              </p>

              <div className="bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-[24px] overflow-hidden">

                <Link
                  href="/edit-profile"
                  className="flex items-center gap-4 p-4 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    ✏️
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Edit Profile</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Update your personal information
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-4 p-4 border-t border-zinc-200 dark:border-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    ⚙️
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Settings</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Manage your account preferences
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

                <Link
                  href="/transactions"
                  className="flex items-center gap-4 p-4 border-t border-zinc-200 dark:border-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    📜
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Transaction History</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      View your wallet and payment activities
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

              </div>
            </section>

            {/* EARN */}
            <section>
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 px-1">
                Earn & Rewards
              </p>

              <Link
                href="/referral"
                className="flex items-center gap-4 bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-[24px] p-4 active:scale-[0.99] transition"
              >
                <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-lg">
                  🎁
                </span>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">Invite & Earn</p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Share AlphaBot and earn referral rewards
                  </p>
                </div>

                <span className="text-zinc-600 text-xl">›</span>
              </Link>
            </section>

            {/* SUPPORT */}
            <section>
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 px-1">
                Support
              </p>

              <div className="bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-[24px] overflow-hidden">

                <Link
                  href="/support"
                  className="flex items-center gap-4 p-4 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    🎧
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Customer Service</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Get help with your account
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

                <Link
                  href="/ai"
                  className="flex items-center gap-4 p-4 border-t border-zinc-200 dark:border-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    🤖
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">AI Support</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Get help from AlphaBot AI
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

              </div>
            </section>

            {/* SERVICES */}
            <section>
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 px-1">
                Services
              </p>

              <div className="bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-[24px] overflow-hidden">

                <Link
                  href="/network-status"
                  className="flex items-center gap-4 p-4 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    📡
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Network Status</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Check AlphaBot service availability
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

                <Link
                  href="/resources/alphabot-api"
                  className="flex items-center gap-4 p-4 border-t border-zinc-200 dark:border-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    🔑
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Developer API</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Integrate AlphaBot services with your application
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

              </div>
            </section>

            {/* APP */}
            <section>
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 px-1">
                App & Information
              </p>

              <div className="bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-[24px] overflow-hidden">

                <Link
                  href="/rate-us"
                  className="flex items-center gap-4 p-4 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    ⭐
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Rate Us</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Tell us what you think about AlphaBot
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

                <Link
                  href="/about"
                  className="flex items-center gap-4 p-4 border-t border-zinc-200 dark:border-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    ℹ️
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">About AlphaBot</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Learn more about AlphaBot
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

                <Link
                  href="/privacy"
                  className="flex items-center gap-4 p-4 border-t border-zinc-200 dark:border-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    🔒
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Privacy Policy</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Learn how AlphaBot protects your information
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

                <Link
                  href="/terms"
                  className="flex items-center gap-4 p-4 border-t border-zinc-200 dark:border-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-900 transition"
                >
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    📄
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Terms & Conditions</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      AlphaBot terms of service
                    </p>
                  </div>

                  <span className="text-zinc-600 text-xl">›</span>
                </Link>

              </div>
            </section>

            {/* LOGOUT */}
            <button
              type="button"
              onClick={logout}
              className="w-full rounded-[22px] border border-red-500/20 bg-red-500/5 text-red-400 py-4 font-black text-sm active:scale-[0.98] transition"
            >
              Log Out
            </button>

            <p className="text-center text-[9px] text-zinc-600 pb-2">
              AlphaBot • Your digital services partner
            </p>

          </div>
        </main>

        <BottomNav />
      </>
    );
  }
