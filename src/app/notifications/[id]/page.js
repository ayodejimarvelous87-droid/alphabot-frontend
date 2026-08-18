"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function NotificationDetails() {

  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const res = await fetch(
          `https://api.alphabothq.com/notifications/detail/${id}`
        );

        const result = await res.json();

        setData(result);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    if (id) {
      load();
    }

  }, [id]);


  if (loading) {

    return (
      <div className="
        min-h-screen
        bg-[#050505]
        flex
        items-center
        justify-center
      ">

        <div className="
          animate-spin
          rounded-full
          h-8
          w-8
          border-4
          border-zinc-700
          border-t-white
        " />

      </div>
    );

  }


  if (!data) {

    return (
      <div className="
        min-h-screen
        bg-[#050505]
        text-white
        flex
        flex-col
        items-center
        justify-center
        p-5
        text-center
      ">

        <p className="text-zinc-400 mb-4">
          Notification not found
        </p>

        <button
          onClick={() => router.back()}
          className="text-white font-bold"
        >
          Go Back
        </button>

      </div>
    );

  }


  const transaction = data.transactionId;

  const isMemo = !transaction;

  const transactionStatus =
    transaction?.status?.toLowerCase();

  const isSuccess =
    transactionStatus === "successful" ||
    transactionStatus === "success";

  const isCredit =
    transaction?.direction === "credit";


  return (

    <div className="
      min-h-screen
      bg-[#050505]
      text-white
      font-sans
      antialiased
      pb-10
    ">

      {/* Header */}

      <header className="
        h-14
        flex
        items-center
        px-5
        border-b
        border-zinc-800
        bg-[#050505]
      ">

        <button
          onClick={() => router.back()}
          className="text-zinc-300 text-xl"
        >
          ←
        </button>

        <h1 className="
          absolute
          left-1/2
          -translate-x-1/2
          font-semibold
        ">
          {isMemo ? "Memo" : "Details"}
        </h1>

      </header>


      <main className="
        max-w-md
        mx-auto
        px-5
        mt-6
      ">


        {/* ========================= */}
        {/* OFFICIAL ALPHABOT MEMO */}
        {/* ========================= */}

        {isMemo ? (

          <div className="
            bg-gradient-to-b
            from-[#18181B]
            to-[#101012]
            rounded-3xl
            border
            border-zinc-800
            shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            overflow-hidden
          ">

            {/* Memo Header */}

            <div className="
              p-6
              border-b
              border-zinc-800
              text-center
            ">

              <div className="
                w-14
                h-14
                mx-auto
                rounded-2xl
                bg-black
                border
                border-zinc-700
                flex
                items-center
                justify-center
                shadow-inner
                mb-4
              ">

                <span className="
                  text-3xl
                  font-black
                  bg-gradient-to-br
                  from-white
                  to-zinc-400
                  bg-clip-text
                  text-transparent
                ">
                  A
                </span>

              </div>


              <p className="
                text-[11px]
                tracking-[0.25em]
                text-zinc-500
                font-bold
                uppercase
              ">
                AlphaBot
              </p>


              <h2 className="
                text-xl
                font-black
                mt-1
                tracking-tight
              ">
                OFFICIAL MEMORANDUM
              </h2>


              <div className="
                mt-3
                inline-flex
                px-3
                py-1
                rounded-full
                bg-yellow-400/10
                text-yellow-400
                text-[11px]
                font-bold
                uppercase
                tracking-wide
              ">
                Management Notice
              </div>

            </div>


            {/* Memo Information */}

            <div className="
              p-6
              space-y-3
              border-b
              border-zinc-800
            ">

              <MemoRow
                title="Date"
                value={new Date(data.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  }
                )}
              />

              <MemoRow
                title="To"
                value="All AlphaBot Users"
              />

              <MemoRow
                title="From"
                value="AlphaBot Management"
              />

              <MemoRow
                title="Subject"
                value={data.title || "AlphaBot Update"}
              />

            </div>


            {/* Memo Body */}

            <div className="p-6">

              <div className="
                text-sm
                leading-7
                text-zinc-300
                whitespace-pre-wrap
              ">
                {data.message}
              </div>


              <div className="
                mt-8
                pt-6
                border-t
                border-zinc-800
              ">

                <p className="font-bold text-sm">
                  AlphaBot Management
                </p>

                <p className="
                  text-xs
                  text-zinc-500
                  mt-1
                ">
                  Official Business Communication
                </p>

              </div>

            </div>

          </div>

        ) : (

          /* ========================= */
          /* TRANSACTION NOTIFICATION */
          /* ========================= */

          <>

            {/* AlphaBot Logo */}

            <div className="flex justify-center mb-5">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-black
                border
                border-zinc-700
                flex
                items-center
                justify-center
                shadow-inner
              ">

                <span className="
                  text-3xl
                  font-black
                  bg-gradient-to-br
                  from-white
                  to-zinc-400
                  bg-clip-text
                  text-transparent
                ">
                  A
                </span>

              </div>

            </div>


            {/* Transaction Status */}

            <div className="
              flex
              flex-col
              items-center
              text-center
              my-6
            ">

              <div className={`
                w-16
                h-16
                rounded-full
                flex
                items-center
                justify-center
                mb-3
                ${isSuccess
                  ? "bg-green-500/10"
                  : "bg-red-500/10"}
              `}>

                <span className={`
                  text-4xl
                  ${isSuccess
                    ? "text-green-400"
                    : "text-red-400"}
                `}>

                  {isSuccess ? "✓" : "!"}

                </span>

              </div>


              <h2 className="
                text-3xl
                font-bold
                tracking-tight
                font-mono
              ">

                {isCredit ? "+" : "-"}
                ₦
                {Number(transaction.amount).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                )}

              </h2>


              <p className={`
                mt-2
                text-xs
                font-semibold
                px-3
                py-1
                rounded-full
                ${isSuccess
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"}
              `}>

                {transaction.status || "Transaction"}

              </p>

            </div>


            {/* Transaction Details */}

            <div className="
              bg-gradient-to-b
              from-[#18181B]
              to-[#101012]
              rounded-3xl
              p-5
              border
              border-zinc-800
              shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            ">

              <div className="space-y-4">

                <DetailRow
                  title="Service"
                  value={
                    transaction.providerResponse?.data?.product_name ||
                    transaction.description ||
                    "-"
                  }
                />


                <DetailRow
                  title="Amount"
                  value={`₦${Number(transaction.amount).toLocaleString()}`}
                />


                <DetailRow
                  title="Network"
                  value={
                    transaction.providerResponse?.data?.service_name ||
                    "-"
                  }
                />


                <DetailRow
                  title="Recipient"
                  value={
                    transaction.providerResponse?.data?.phone ||
                    transaction.phone ||
                    "-"
                  }
                />


                <DetailRow
                  title="Provider Status"
                  value={
                    transaction.providerResponse?.data?.status ||
                    transaction.status ||
                    "-"
                  }
                />


                <DetailRow
                  title="Remarks"
                  value={
                    transaction.description ||
                    data.message ||
                    "-"
                  }
                />


                {(
                  transaction.service === "recharge_pin" ||
                  transaction.type === "recharge_pin"
                ) && transaction.pin && (

                  <DetailRow
                    title="PIN"
                    value={transaction.pin}
                    copy
                  />

                )}


                <DetailRow
                  title="Transaction Ref"
                  value={transaction.reference}
                  copy
                />


                <DetailRow
                  title="Transaction Time"
                  value={new Date(
                    data.createdAt
                  ).toLocaleString()}
                />

              </div>

            </div>


            <Link
              href={`/receipt/${transaction._id}`}
              className="
                flex
                items-center
                justify-center
                w-full
                mt-6
                bg-white
                text-black
                py-3.5
                rounded-full
                font-semibold
              "
            >

              🧾 View Receipt

            </Link>

          </>

        )}

      </main>

    </div>

  );

}


function MemoRow({ title, value }) {

  return (

    <div className="
      flex
      gap-4
      text-sm
    ">

      <div className="
        w-20
        shrink-0
        text-zinc-500
        font-medium
      ">
        {title}
      </div>

      <div className="
        flex-1
        text-zinc-200
        font-medium
      ">
        {value}
      </div>

    </div>

  );

}


function DetailRow({ title, value, copy = false }) {

  function handleCopy() {

    if (!value) return;

    navigator.clipboard.writeText(String(value));

  }


  return (

    <div className="
      flex
      justify-between
      gap-4
      py-1
    ">

      <span className="
        text-xs
        text-zinc-500
      ">
        {title}
      </span>


      <div className="
        flex
        items-center
        gap-2
        text-right
        max-w-[65%]
      ">

        <span className="
          text-sm
          font-medium
          break-all
        ">
          {value || "-"}
        </span>


        {copy && value && (

          <button
            onClick={handleCopy}
            className="
              text-xs
              text-zinc-500
              hover:text-white
            "
          >
            Copy
          </button>

        )}

      </div>

    </div>

  );

}
