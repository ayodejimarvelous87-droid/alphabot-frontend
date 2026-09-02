"use client";

import { useEffect, useState } from "react";

export default function MarketplaceBuyersPage() {
  const [buyers, setBuyers] = useState([]);
  const [statistics, setStatistics] = useState({
    totalBuyers: 0,
    activeBuyers: 0,
    suspendedBuyers: 0,
    newBuyers: 0,
    repeatBuyers: 0,
    buyersWithCompletedOrders: 0
  });

  const [search, setSearch] = useState("");
  const [marketplaceStatus, setMarketplaceStatus] = useState("");
  const [minOrders, setMinOrders] = useState("");
  const [minSpending, setMinSpending] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBuyers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Admin authentication token not found.");
        return;
      }

      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (marketplaceStatus) {
        params.set("marketplaceStatus", marketplaceStatus);
      }

      if (minOrders !== "") {
        params.set("minOrders", minOrders);
      }

      if (minSpending !== "") {
        params.set("minSpending", minSpending);
      }

      const response = await fetch(
        `https://api.alphabothq.com/admin/marketplace/buyers?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load Marketplace buyers"
        );
      }

      setBuyers(data.buyers || []);
      setStatistics(
        data.statistics || {
          totalBuyers: 0,
          activeBuyers: 0,
          suspendedBuyers: 0,
          newBuyers: 0,
          repeatBuyers: 0,
          buyersWithCompletedOrders: 0
        }
      );
    } catch (err) {
      console.error("MARKETPLACE BUYERS FRONTEND ERROR:", err);
      setError(err.message || "Failed to load Marketplace buyers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  const formatMoney = (amount) => {
    return `₦${Number(amount || 0).toLocaleString()}`;
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            👥 Buyer Management
          </h1>

          <p className="text-gray-400 mt-1">
            Manage Marketplace buyers, orders, spending and account access.
          </p>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Buyers</p>
            <p className="text-2xl font-bold mt-1">
              {statistics.totalBuyers}
            </p>
          </div>

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Active</p>
            <p className="text-2xl font-bold mt-1">
              {statistics.activeBuyers}
            </p>
          </div>

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Suspended</p>
            <p className="text-2xl font-bold mt-1">
              {statistics.suspendedBuyers}
            </p>
          </div>

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">New Buyers</p>
            <p className="text-2xl font-bold mt-1">
              {statistics.newBuyers}
            </p>
          </div>

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Repeat Buyers</p>
            <p className="text-2xl font-bold mt-1">
              {statistics.repeatBuyers}
            </p>
          </div>

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Completed Orders</p>
            <p className="text-2xl font-bold mt-1">
              {statistics.buyersWithCompletedOrders}
            </p>
          </div>

        </div>

        {/* FILTERS */}
        <div className="bg-[#18181B] border border-white/10 rounded-xl p-4 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

            <input
              type="text"
              placeholder="Search name, phone, email or order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#09090B] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-white/30"
            />

            <select
              value={marketplaceStatus}
              onChange={(e) => setMarketplaceStatus(e.target.value)}
              className="bg-[#09090B] border border-white/10 rounded-lg px-3 py-2 outline-none"
            >
              <option value="">All Marketplace Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>

            <input
              type="number"
              min="0"
              placeholder="Minimum orders"
              value={minOrders}
              onChange={(e) => setMinOrders(e.target.value)}
              className="bg-[#09090B] border border-white/10 rounded-lg px-3 py-2 outline-none"
            />

            <input
              type="number"
              min="0"
              placeholder="Minimum spending"
              value={minSpending}
              onChange={(e) => setMinSpending(e.target.value)}
              className="bg-[#09090B] border border-white/10 rounded-lg px-3 py-2 outline-none"
            />

          </div>

          <div className="flex flex-wrap gap-2 mt-3">

            <button
              onClick={fetchBuyers}
              className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200"
            >
              🔍 Search / Filter
            </button>

            <button
              onClick={() => {
                setSearch("");
                setMarketplaceStatus("");
                setMinOrders("");
                setMinSpending("");
                setTimeout(fetchBuyers, 0);
              }}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15"
            >
              Reset
            </button>

          </div>

        </div>

        {/* CONTENT */}
        <div className="bg-[#18181B] border border-white/10 rounded-xl overflow-hidden">

          <div className="p-4 border-b border-white/10">
            <h2 className="font-semibold">
              Marketplace Buyers
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">
              Loading buyers...
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-400 mb-3">
                {error}
              </p>

              <button
                onClick={fetchBuyers}
                className="px-4 py-2 rounded-lg bg-white text-black font-semibold"
              >
                Retry
              </button>
            </div>
          ) : buyers.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No Marketplace buyers found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#09090B]">
                  <tr>
                    <th className="text-left p-3 whitespace-nowrap">
                      Buyer
                    </th>

                    <th className="text-left p-3 whitespace-nowrap">
                      Contact
                    </th>

                    <th className="text-left p-3 whitespace-nowrap">
                      Orders
                    </th>

                    <th className="text-left p-3 whitespace-nowrap">
                      Spending
                    </th>

                    <th className="text-left p-3 whitespace-nowrap">
                      Status
                    </th>

                    <th className="text-left p-3 whitespace-nowrap">
                      Registered
                    </th>

                    <th className="text-left p-3 whitespace-nowrap">
                      Last Activity
                    </th>

                    <th className="text-left p-3 whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {buyers.map((buyer) => (
                    <tr
                      key={buyer._id}
                      className="border-t border-white/10 hover:bg-white/[0.03]"
                    >

                      <td className="p-3">
                        <div className="font-medium">
                          {buyer.name || "Unnamed Buyer"}
                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                          {buyer._id}
                        </div>
                      </td>

                      <td className="p-3">
                        <div>
                          {buyer.phone || "—"}
                        </div>

                        <div className="text-xs text-gray-400 mt-1">
                          {buyer.email || "No email"}
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="font-semibold">
                          {buyer.totalOrders}
                        </div>

                        <div className="text-xs text-gray-400 mt-1">
                          {buyer.completedOrders} completed
                        </div>
                      </td>

                      <td className="p-3 font-semibold">
                        {formatMoney(buyer.totalSpending)}
                      </td>

                      <td className="p-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            buyer.marketplaceStatus === "suspended"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-green-500/10 text-green-400"
                          }`}
                        >
                          {buyer.marketplaceStatus === "suspended"
                            ? "Suspended"
                            : "Active"}
                        </span>
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        {formatDate(buyer.registrationDate)}
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        {formatDate(buyer.lastActivity)}
                      </td>

                      <td className="p-3">
                        <button
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 whitespace-nowrap"
                          onClick={() => {
                            window.location.href = `/admin/marketplace/buyers/${buyer._id}`;
                          }}
                        >
                          View Buyer
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
