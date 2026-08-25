"use client";

import { useEffect, useState } from "react";

export default function AdminTransactions() {

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {

    const load = async () => {

      try {

        const token = localStorage.getItem("adminToken");

        const res = await fetch(
          "https://api.alphabothq.com/admin/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        setTransactions(Array.isArray(data) ? data : []);

      } catch (error) {

        console.error("Failed to load transactions:", error);

      }

    };

    load();

  }, []);


  const filtered = transactions.filter(tx => {

    const phone = String(tx.phone || "").toLowerCase();
    const name = String(tx.userName || "").toLowerCase();
    const reference = String(tx.reference || "").toLowerCase();
    const query = search.toLowerCase();

    return (
      (
        phone.includes(query) ||
        name.includes(query) ||
        reference.includes(query)
      )
      &&
      (type === "" || tx.type === type)
    );

  });


  const money = value => {

    if (value === null || value === undefined || value === "") {
      return "—";
    }

    return `₦${Number(value).toLocaleString()}`;

  };


  const formatDate = value => {

    if (!value) return "Unknown";

    return new Date(value).toLocaleString();

  };


  const providerResponse = tx => {

    if (!tx.providerResponse) return null;

    try {

      return JSON.stringify(
        tx.providerResponse,
        null,
        2
      );

    } catch {

      return String(tx.providerResponse);

    }

  };


  const statusClass = status => {

    switch (String(status || "").toLowerCase()) {

      case "successful":
        return "text-green-400";

      case "processing":
        return "text-yellow-400";

      case "pending":
        return "text-yellow-400";

      case "failed":
        return "text-red-400";

      case "refunded":
        return "text-orange-400";

      case "cancelled":
        return "text-red-400";

      default:
        return "text-zinc-400";

    }

  };


  return (

    <div className="p-4 md:p-6 space-y-6 text-white">

      <div>

        <h1 className="text-2xl font-bold">
          📜 Transactions
        </h1>

        <p className="text-sm text-zinc-500 mt-1">
          Complete transaction history and purchase details
        </p>

      </div>


      <div className="flex flex-col md:flex-row gap-2">

        <input
          className="border border-zinc-800 bg-zinc-950 rounded-xl p-3 flex-1 outline-none focus:border-zinc-600"
          placeholder="Search phone, name or reference"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        <select
          className="border border-zinc-800 bg-zinc-950 rounded-xl p-3 outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >

          <option value="">
            All Types
          </option>

          <option value="fund">
            Fund
          </option>

          <option value="purchase">
            Purchase
          </option>

          <option value="airtime">
            Airtime
          </option>

          <option value="data">
            Data
          </option>

          <option value="electricity">
            Electricity
          </option>

          <option value="tv">
            TV
          </option>

          <option value="betting">
            Betting
          </option>

          <option value="exam_pin">
            Exam PIN
          </option>

          <option value="withdrawal">
            Withdrawal
          </option>

          <option value="refund">
            Refund
          </option>

          <option value="admin_credit">
            Admin Credit
          </option>

          <option value="admin_debit">
            Admin Debit
          </option>

        </select>

      </div>


      <div className="text-sm text-zinc-500">
        {filtered.length} transaction{filtered.length === 1 ? "" : "s"}
      </div>


      <div className="space-y-3">

        {filtered.map(tx => {

          const isOpen = expanded === tx._id;

          return (

            <div
              key={tx._id}
              className="border border-zinc-800 bg-zinc-950 rounded-3xl overflow-hidden"
            >

              <button
                type="button"
                onClick={() =>
                  setExpanded(
                    isOpen ? null : tx._id
                  )
                }
                className="w-full text-left p-4 hover:bg-zinc-900 transition"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <a
                      href={`/admin/users/${tx.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-semibold underline"
                    >
                      👤 {tx.userName || "Unknown User"}
                    </a>

                    <p className="text-sm text-zinc-400 mt-1">
                      📱 {tx.phone || "—"}
                    </p>

                  </div>


                  <div className="text-right shrink-0">

                    <p className="font-bold">
                      {money(tx.amount)}
                    </p>

                    <p
                      className={`text-xs font-semibold uppercase ${statusClass(tx.status)}`}
                    >
                      {tx.status || "completed"}
                    </p>

                  </div>

                </div>


                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-3 text-zinc-400">

                  <span>
                    Type: {tx.type || "—"}
                  </span>

                  {tx.type === "data" && (
                    <span>
                      📦 {tx.product_name || "Data purchase"}
                    </span>
                  )}

                  {tx.network && (
                    <span>
                      🌐 {tx.network}
                    </span>
                  )}

                  <span>
                    {formatDate(tx.createdAt)}
                  </span>

                </div>


                <div className="text-xs text-zinc-600 mt-3">
                  {isOpen
                    ? "▲ Hide details"
                    : "▼ View full transaction details"}
                </div>

              </button>


              {isOpen && (

                <div className="border-t border-zinc-800 p-4 space-y-5 bg-black/30">

                  {/* DATA PURCHASE */}

                  {tx.type === "data" && (

                    <section>

                      <h2 className="font-bold text-lg mb-3">
                        📦 Data Purchase
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <Detail
                          label="Data Plan"
                          value={tx.product_name}
                        />

                        <Detail
                          label="Network"
                          value={tx.network}
                        />

                        <Detail
                          label="Recipient"
                          value={tx.recipient}
                        />

                        <Detail
                          label="Amount"
                          value={money(tx.amount)}
                        />

                        <Detail
                          label="Service"
                          value={tx.service}
                        />

                        <Detail
                          label="Status"
                          value={tx.status}
                          valueClass={statusClass(tx.status)}
                        />

                      </div>

                    </section>

                  )}


                  {/* TRANSACTION */}

                  <section>

                    <h2 className="font-bold text-lg mb-3">
                      🧾 Transaction Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                      <Detail
                        label="Transaction ID"
                        value={tx._id}
                      />

                      <Detail
                        label="Type"
                        value={tx.type}
                      />

                      <Detail
                        label="Direction"
                        value={tx.direction}
                      />

                      <Detail
                        label="Amount"
                        value={money(tx.amount)}
                      />

                      <Detail
                        label="Reference"
                        value={tx.reference}
                      />

                      <Detail
                        label="Description"
                        value={tx.description}
                      />

                      <Detail
                        label="Date"
                        value={formatDate(tx.createdAt)}
                      />

                      <Detail
                        label="Updated"
                        value={formatDate(tx.updatedAt)}
                      />

                      <Detail
                        label="Status"
                        value={tx.status}
                        valueClass={statusClass(tx.status)}
                      />

                    </div>

                  </section>


                  {/* PROVIDER */}

                  {(tx.providerResponse ||
                    tx.vtuRequestId ||
                    tx.vtuOrderId ||
                    tx.service) && (

                    <section>

                      <h2 className="font-bold text-lg mb-3">
                        🔌 Provider Details
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <Detail
                          label="Service"
                          value={tx.service}
                        />

                        <Detail
                          label="VTU Request ID"
                          value={tx.vtuRequestId}
                        />

                        <Detail
                          label="VTU Order ID"
                          value={tx.vtuOrderId}
                        />

                        <Detail
                          label="Provider Status"
                          value={tx.vtuStatus}
                        />

                      </div>


                      {providerResponse(tx) && (

                        <div className="mt-3">

                          <p className="text-xs text-zinc-500 mb-1">
                            Provider Response
                          </p>

                          <pre className="text-xs bg-zinc-950 border border-zinc-800 rounded-xl p-3 overflow-x-auto whitespace-pre-wrap break-words text-zinc-300">
                            {providerResponse(tx)}
                          </pre>

                        </div>

                      )}

                    </section>

                  )}


                  {/* WALLET */}

                  <section>

                    <h2 className="font-bold text-lg mb-3">
                      💳 Wallet
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                      <Detail
                        label="Balance Before"
                        value={money(tx.balanceBefore)}
                      />

                      <Detail
                        label="Balance After"
                        value={money(tx.balanceAfter)}
                      />

                      <Detail
                        label="Wallet Credited"
                        value={
                          tx.walletCredited
                            ? "Yes"
                            : "No"
                        }
                      />

                    </div>

                  </section>


                  {/* REFUND */}

                  {(tx.originalReference ||
                    tx.reason) && (

                    <section>

                      <h2 className="font-bold text-lg mb-3">
                        ↩️ Refund / Adjustment
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <Detail
                          label="Original Reference"
                          value={tx.originalReference}
                        />

                        <Detail
                          label="Reason"
                          value={tx.reason}
                        />

                      </div>

                    </section>

                  )}


                  {/* IDENTIFIERS */}

                  {(tx.flutterwaveId ||
                    tx.flutterwaveReference ||
                    tx.pvaTxRef ||
                    tx.pvaAccountNumber ||
                    tx.pvaOrderRef ||
                    tx.idempotencyKey) && (

                    <section>

                      <h2 className="font-bold text-lg mb-3">
                        🔑 Payment / System IDs
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <Detail
                          label="Flutterwave ID"
                          value={tx.flutterwaveId}
                        />

                        <Detail
                          label="Flutterwave Reference"
                          value={tx.flutterwaveReference}
                        />

                        <Detail
                          label="PVA Transaction Ref"
                          value={tx.pvaTxRef}
                        />

                        <Detail
                          label="PVA Account"
                          value={tx.pvaAccountNumber}
                        />

                        <Detail
                          label="PVA Order Ref"
                          value={tx.pvaOrderRef}
                        />

                        <Detail
                          label="Idempotency Key"
                          value={tx.idempotencyKey}
                        />

                      </div>

                    </section>

                  )}

                </div>

              )}

            </div>

          );

        })}


        {filtered.length === 0 && (

          <div className="border border-zinc-800 rounded-3xl p-8 text-center text-zinc-500">
            No transactions found.
          </div>

        )}

      </div>

    </div>

  );

}


function Detail({
  label,
  value,
  valueClass = ""
}) {

  const display =
    value === null ||
    value === undefined ||
    value === ""
      ? "—"
      : String(value);

  return (

    <div className="border border-zinc-800 rounded-xl p-3 bg-zinc-950">

      <p className="text-xs text-zinc-500 mb-1">
        {label}
      </p>

      <p
        className={`text-sm break-words ${valueClass}`}
      >
        {display}
      </p>

    </div>

  );

}
