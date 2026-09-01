"use client";

import { useEffect, useState } from "react";

export default function AdminSellerApplications() {
  const [sellers, setSellers] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("https://api.alphabothq.com/admin/marketplace/sellers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSellers(data.sellers || []);
        }
      })
      .catch((error) => {
        console.error("ADMIN MARKETPLACE SELLERS ERROR:", error);
      });
  }, []);

  const updateSellerStatus = async (sellerId, status) => {
    const token = localStorage.getItem("token");

    try {
      const endpoint =
        status === "approved"
          ? `https://api.alphabothq.com/admin/marketplace/sellers/${sellerId}/approve`
          : `https://api.alphabothq.com/admin/marketplace/sellers/${sellerId}/reject`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to update seller.");
        return;
      }

      setSellers((current) =>
        current.map((seller) =>
          seller._id === sellerId
            ? {
                ...seller,
                status:
                  status === "approved"
                    ? "approved"
                    : "rejected",
              }
            : seller
        )
      );
    } catch (error) {
      console.error("ADMIN SELLER STATUS ERROR:", error);
      alert("Unable to update seller.");
    }
  };


  const pending = sellers.filter(
    (seller) => seller.status === "pending"
  );

  const verified = sellers.filter(
    (seller) => seller.status === "approved"
  );

  const rejected = sellers.filter(
    (seller) => seller.status === "rejected"
  );

  return (
    <main className="min-h-screen bg-[#09090b] text-white p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <p className="text-yellow-400 text-xs font-black tracking-[0.2em] uppercase">
              MARKETPLACE
            </p>

            <h1 className="text-2xl md:text-3xl font-black mt-1">
              Seller Applications
            </h1>

            <p className="text-zinc-500 text-sm mt-2">
              Review and verify sellers before they can list products.
            </p>
          </div>

          <div className="flex gap-2">

            <div className="rounded-2xl bg-yellow-400 text-black px-4 py-3 text-center">
              <p className="text-[9px] font-black uppercase">
                Pending
              </p>

              <p className="text-xl font-black">
                {pending.length}
              </p>
            </div>

            <div className="rounded-2xl bg-green-500 text-white px-4 py-3 text-center">
              <p className="text-[9px] font-black uppercase">
                Verified
              </p>

              <p className="text-xl font-black">
                {verified.length}
              </p>
            </div>

          </div>

        </div>


        {/* PENDING APPLICATIONS */}

        <section>

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-zinc-500">
                REVIEW QUEUE
              </p>

              <h2 className="text-lg font-black mt-1">
                Pending applications
              </h2>
            </div>

            <span className="text-xs text-zinc-500">
              {pending.length} waiting
            </span>

          </div>


          {pending.length === 0 ? (

            <div className="rounded-3xl border border-zinc-800 bg-[#101012] p-10 text-center">

              <div className="text-4xl">
                ✓
              </div>

              <h3 className="font-black mt-3">
                No pending applications
              </h3>

              <p className="text-xs text-zinc-500 mt-2">
                New seller applications will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {pending.map((seller) => (

                <div
                  key={seller._id}
                  className="rounded-3xl border border-zinc-800 bg-[#101012] p-5"
                >

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                    <div className="flex-1">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-xl">
                          🏪
                        </div>

                        <div>

                          <h3 className="font-black text-lg">
                            {seller.businessName}
                          </h3>

                          <p className="text-xs text-zinc-500">
                            Seller ID: {seller._id}
                          </p>

                        </div>

                      </div>


                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

                        <div className="rounded-2xl bg-[#18181B] p-3">
                          <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-black">
                            Owner
                          </p>

                          <p className="text-sm font-bold mt-1">
                            {seller.name}
                          </p>
                        </div>


                        <div className="rounded-2xl bg-[#18181B] p-3">
                          <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-black">
                            Phone
                          </p>

                          <p className="text-sm font-bold mt-1">
                            {seller.phone}
                          </p>
                        </div>

                      </div>


                      {seller.bio && (

                        <div className="mt-3 rounded-2xl bg-[#18181B] p-3">

                          <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-black">
                            About store
                          </p>

                          <p className="text-xs text-zinc-300 mt-1 leading-5">
                            {seller.bio}
                          </p>

                        </div>

                      )}


                      <p className="text-[9px] text-zinc-600 mt-4">
                        Submitted{" "}
                        {seller.submittedAt
                          ? new Date(seller.submittedAt).toLocaleString()
                          : "—"}
                      </p>

                    </div>


                    {/* ACTIONS */}

                    <div className="flex md:flex-col gap-2 md:w-40">

                      <button
                        onClick={() =>
                          updateSellerStatus(seller._id, "approved")
                        }
                        className="flex-1 h-11 rounded-xl bg-green-500 text-white text-xs font-black active:scale-95 transition"
                      >
                        ✓ Verify
                      </button>

                      <button
                        onClick={() =>
                          updateSellerStatus(seller._id, "rejected")
                        }
                        className="flex-1 h-11 rounded-xl bg-zinc-800 text-red-400 text-xs font-black active:scale-95 transition"
                      >
                        ✕ Reject
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* VERIFIED SELLERS */}

        <section className="mt-10">

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-green-400">
                APPROVED
              </p>

              <h2 className="text-lg font-black mt-1">
                Verified sellers
              </h2>
            </div>

            <span className="text-xs text-zinc-500">
              {verified.length} sellers
            </span>

          </div>


          {verified.length === 0 ? (

            <div className="rounded-2xl border border-zinc-800 bg-[#101012] p-6 text-center text-xs text-zinc-500">
              No verified sellers yet.
            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-3">

              {verified.map((seller) => (

                <div
                  key={seller._id}
                  className="rounded-2xl border border-zinc-800 bg-[#101012] p-4"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center">
                      ✓
                    </div>

                    <div className="flex-1">

                      <h3 className="text-sm font-black">
                        {seller.businessName}
                      </h3>

                      <p className="text-[10px] text-zinc-500">
                        {seller.name} · {seller.phone}
                      </p>

                    </div>

                    <span className="text-[8px] font-black bg-green-500/20 text-green-400 px-2 py-1 rounded-lg">
                      VERIFIED
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* REJECTED */}

        {rejected.length > 0 && (

          <section className="mt-10">

            <div className="flex items-center justify-between mb-4">

              <div>
                <p className="text-[9px] font-black tracking-[0.18em] uppercase text-red-400">
                  DECLINED
                </p>

                <h2 className="text-lg font-black mt-1">
                  Rejected applications
                </h2>
              </div>

              <span className="text-xs text-zinc-500">
                {rejected.length}
              </span>

            </div>


            <div className="space-y-2">

              {rejected.map((seller) => (

                <div
                  key={seller._id}
                  className="rounded-2xl border border-zinc-800 bg-[#101012] p-4 flex items-center justify-between gap-3"
                >

                  <div>

                    <p className="text-sm font-black">
                      {seller.businessName}
                    </p>

                    <p className="text-[10px] text-zinc-500">
                      {seller.name} · {seller.phone}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      updateSellerStatus(seller._id, "pending")
                    }
                    className="px-3 py-2 rounded-xl bg-zinc-800 text-xs font-black"
                  >
                    Review again
                  </button>

                </div>

              ))}

            </div>

          </section>

        )}

      </div>

    </main>
  );
}
