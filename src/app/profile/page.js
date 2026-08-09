"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const API = "https://alphabot-1.onrender.com";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
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


        {/* PROFILE */}

        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center gap-4">

            <div className="w-20 h-20 shrink-0 rounded-3xl bg-gradient-to-br from-white via-zinc-300 to-zinc-500 text-black flex items-center justify-center text-3xl font-black">

              {user?.name?.charAt(0)?.toUpperCase() || "A"}

            </div>


            <div className="min-w-0">

              <h2 className="text-xl font-bold truncate">
                {user?.name || "AlphaBot User"}
              </h2>

              <p className="text-sm text-zinc-400 mt-1">
                {user?.phone || "No phone number"}
              </p>

              <p className="text-sm text-zinc-500 truncate">
                {user?.email || "No email address"}
              </p>

            </div>

          </div>


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

        </div>


        {/* WALLET */}

        <div className="bg-white text-black rounded-3xl p-6">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Wallet Balance
              </p>

              <h2 className="text-3xl font-black mt-2">
                ₦{Number(balance).toLocaleString("en-US")}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center text-xl">
              ◈
            </div>

          </div>


          <Link
            href="/wallet"
            className="block mt-5 text-center bg-black text-white rounded-xl py-3 font-bold"
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
