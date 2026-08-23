"use client";

import { useEffect, useState } from "react";

export default function ReferralContest() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadContest = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        "https://api.alphabothq.com/admin/referral-contest",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load contest");
      }

      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetContest = async () => {
    if (!confirm("Are you sure you want to reset the Referral Contest?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        "https://api.alphabothq.com/admin/referral-contest/reset",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset contest");
      }

      setMessage(data.message || "Contest reset successfully");
      loadContest();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadContest();
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-white p-4 md:p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            🏆 Referral Contest
          </h1>

          <p className="text-zinc-400 mt-2">
            Current referral contest leaderboard
          </p>
        </div>

        <button
          onClick={resetContest}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold"
        >
          Reset Contest
        </button>

      </div>

      {message && (
        <div className="mb-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          {message}
        </div>
      )}

      <div className="bg-[#10131c] border border-zinc-800 rounded-2xl overflow-hidden">

        {loading ? (
          <div className="p-8 text-center text-zinc-400">
            Loading leaderboard...
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="p-8 text-center text-zinc-400">
            No referral contest data yet.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-[#181b25] text-zinc-400 text-sm">
                <tr>
                  <th className="p-4">Rank</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Contest Referrals</th>
                  <th className="p-4">This Month</th>
                  <th className="p-4">All Time</th>
                </tr>
              </thead>

              <tbody>

                {leaderboard.map((user, index) => (
                  <tr
                    key={user.phone || index}
                    className="border-t border-zinc-800 hover:bg-[#151821]"
                  >

                    <td className="p-4 font-bold">
                      {user.rank || index + 1}
                    </td>

                    <td className="p-4 font-semibold">
                      {user.username || "Unknown"}
                    </td>

                    <td className="p-4 text-zinc-400">
                      {user.phone}
                    </td>

                    <td className="p-4 font-bold text-yellow-400">
                      {user.referrals || 0}
                    </td>

                    <td className="p-4">
                      {user.monthly || 0}
                    </td>

                    <td className="p-4">
                      {user.allTime || 0}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}
