"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MarketplaceBuyerProfilePage() {
  const params = useParams();
  const buyerId = params?.id;

  const [buyer, setBuyer] = useState(null);
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    totalSpending: 0,
    completedOrders: 0,
    cancelledOrders: 0
  });
  const [orders, setOrders] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Admin authentication token not found.");
        return;
      }

      const response = await fetch(
        `https://api.alphabothq.com/admin/marketplace/buyers/${buyerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load buyer profile"
        );
      }

      setBuyer(data.buyer || null);
      setStatistics(
        data.statistics || {
          totalOrders: 0,
          totalSpending: 0,
          completedOrders: 0,
          cancelledOrders: 0
        }
      );
      setOrders(data.orders || []);
      setRecentActivity(data.recentActivity || []);
    } catch (err) {
      console.error(
        "MARKETPLACE BUYER PROFILE FRONTEND ERROR:",
        err
      );

      setError(
        err.message || "Failed to load buyer profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarketplaceStatusChange = async () => {
    if (!buyer) return;

    const isSuspended = buyer.marketplaceStatus === "suspended";
    const action = isSuspended ? "restore" : "suspend";

    const confirmed = window.confirm(
      isSuspended
        ? "Restore this buyer's Marketplace access?"
        : "Suspend this buyer's Marketplace access?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Admin authentication token not found.");
        return;
      }

      const response = await fetch(
        `https://api.alphabothq.com/admin/marketplace/buyers/${buyerId}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || `Failed to ${action} Marketplace access`
        );
      }

      await fetchProfile();
    } catch (err) {
      console.error(
        "MARKETPLACE BUYER STATUS CHANGE ERROR:",
        err
      );

      setError(
        err.message || `Failed to ${action} Marketplace access`
      );
    }
  };

  useEffect(() => {
    if (buyerId) {
      fetchProfile();
    }
  }, [buyerId]);

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

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white p-6">
        <div className="max-w-6xl mx-auto text-center py-16 text-gray-400">
          Loading buyer profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/admin/marketplace/buyers"
            className="text-gray-400 hover:text-white"
          >
            ← Back to Buyers
          </Link>

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-8 mt-6 text-center">
            <p className="text-red-400 mb-4">
              {error}
            </p>

            <button
              onClick={fetchProfile}
              className="px-4 py-2 rounded-lg bg-white text-black font-semibold"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!buyer) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/admin/marketplace/buyers"
            className="text-gray-400 hover:text-white"
          >
            ← Back to Buyers
          </Link>

          <div className="text-center py-16 text-gray-400">
            Buyer not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* BACK */}
        <Link
          href="/admin/marketplace/buyers"
          className="inline-block text-gray-400 hover:text-white mb-5"
        >
          ← Back to Buyers
        </Link>

        {/* HEADER */}
        <div className="bg-[#18181B] border border-white/10 rounded-xl p-5 mb-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                👤 {buyer.name || "Unnamed Buyer"}
              </h1>

              <p className="text-gray-400 text-sm mt-2">
                Marketplace Buyer
              </p>

              <p className="text-gray-500 text-xs mt-1 break-all">
                ID: {buyer._id}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <a
                href={`tel:${buyer.phone}`}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15"
              >
                📞 Contact
              </a>

              {buyer.email && (
                <a
                  href={`mailto:${buyer.email}`}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15"
                >
                  ✉️ Email
                </a>
              )}
            </div>

          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="bg-[#18181B] border border-white/10 rounded-xl p-5 mb-5">
          <h2 className="font-semibold text-lg mb-4">
            Personal & Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div>
              <p className="text-gray-500 text-xs">Full Name</p>
              <p className="mt-1">{buyer.name || "—"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-xs">Phone</p>
              <p className="mt-1">{buyer.phone || "—"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-xs">WhatsApp</p>
              <p className="mt-1">
                {buyer.whatsappPhone || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-xs">Email</p>
              <p className="mt-1 break-all">
                {buyer.email || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-xs">
                Account Status
              </p>
              <p className="mt-1">
                {buyer.accountStatus || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-xs">
                Marketplace Status
              </p>

              <span
                className={`inline-flex mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                  buyer.marketplaceStatus === "suspended"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-green-500/10 text-green-400"
                }`}
              >
                {buyer.marketplaceStatus === "suspended"
                  ? "Suspended"
                  : "Active"}
              </span>

              <button
                type="button"
                onClick={handleMarketplaceStatusChange}
                className={`block mt-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                  buyer.marketplaceStatus === "suspended"
                    ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                    : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                }`}
              >
                {buyer.marketplaceStatus === "suspended"
                  ? "🔓 Restore Marketplace Access"
                  : "🔒 Suspend Marketplace Access"}
              </button>
            </div>

            <div>
              <p className="text-gray-500 text-xs">
                Registration Date
              </p>
              <p className="mt-1">
                {formatDate(buyer.registrationDate)}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-xs">
                Last Activity
              </p>
              <p className="mt-1">
                {formatDateTime(buyer.lastActivity)}
              </p>
            </div>

          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">
              Total Orders
            </p>
            <p className="text-2xl font-bold mt-1">
              {statistics.totalOrders}
            </p>
          </div>

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">
              Total Spending
            </p>
            <p className="text-2xl font-bold mt-1">
              {formatMoney(statistics.totalSpending)}
            </p>
          </div>

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">
              Completed
            </p>
            <p className="text-2xl font-bold mt-1">
              {statistics.completedOrders}
            </p>
          </div>

          <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">
              Cancelled
            </p>
            <p className="text-2xl font-bold mt-1">
              {statistics.cancelledOrders}
            </p>
          </div>

        </div>

        {/* ORDER HISTORY */}
        <div className="bg-[#18181B] border border-white/10 rounded-xl overflow-hidden mb-5">

          <div className="p-4 border-b border-white/10">
            <h2 className="font-semibold text-lg">
              🛍️ Order History
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No Marketplace orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#09090B]">
                  <tr>
                    <th className="text-left p-3">
                      Order
                    </th>

                    <th className="text-left p-3">
                      Product
                    </th>

                    <th className="text-left p-3">
                      Seller
                    </th>

                    <th className="text-left p-3">
                      Amount
                    </th>

                    <th className="text-left p-3">
                      Status
                    </th>

                    <th className="text-left p-3">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t border-white/10"
                    >
                      <td className="p-3">
                        <div className="font-medium">
                          #{String(order._id).slice(-8)}
                        </div>

                        <div className="text-xs text-gray-500 break-all">
                          {order._id}
                        </div>
                      </td>

                      <td className="p-3">
                        <div>
                          {order.productName || "—"}
                        </div>

                        <div className="text-xs text-gray-400 mt-1">
                          Qty: {order.quantity || 0}
                        </div>
                      </td>

                      <td className="p-3">
                        {order.seller?.businessName || "—"}
                      </td>

                      <td className="p-3 font-semibold">
                        {formatMoney(order.totalAmount)}
                      </td>

                      <td className="p-3">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs bg-white/10">
                          {order.status || "—"}
                        </span>
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-[#18181B] border border-white/10 rounded-xl overflow-hidden">

          <div className="p-4 border-b border-white/10">
            <h2 className="font-semibold text-lg">
              🕐 Recent Activity
            </h2>
          </div>

          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No recent Marketplace activity.
            </div>
          ) : (
            <div className="divide-y divide-white/10">

              {recentActivity.map((activity, index) => (
                <div
                  key={`${activity.orderId}-${index}`}
                  className="p-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                    <div>
                      <p className="font-medium">
                        🛍️ Order activity
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        {activity.productName || "Marketplace order"}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm">
                        {activity.status || "—"}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {formatDateTime(activity.date)}
                      </p>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
