"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams, useRouter } from "next/navigation";

export default function ReceiptPage() {

  const { id } = useParams();
  const router = useRouter();

  const [receipt, setReceipt] = useState(null);


  const downloadPDF = async()=>{

    const element = document.getElementById("receipt");

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const width = 190;

    const height =
      (canvas.height * width) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      width,
      height
    );

    pdf.save(
      `AlphaBot-Receipt-${receipt.reference}.pdf`
    );

  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadReceipt() {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch(
          `https://alphabot-1.onrender.com/receipt/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (res.ok) {
          setReceipt(data.receipt);
        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }

    if (id) {
      loadReceipt();
    }

  }, [id]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading receipt...
      </div>
    );
  }


  if (!receipt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Receipt not found.
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-black text-white p-5">

      <div
id="receipt"
className="max-w-xl mx-auto rounded-3xl bg-[#121214] border border-zinc-800 p-6"
>

        <h1 className="text-2xl font-bold text-center">
          AlphaBot Receipt
        </h1>

        <div className="mt-3 text-center">
          <span className="bg-green-600 px-4 py-2 rounded-full">
            ✅ Successful
          </span>
        </div>

        <div className="mt-8 space-y-4">

          <Row
            title="Amount"
            value={`₦${Number(receipt.amount).toLocaleString()}`}
          />

          <Row
            title="Type"
            value={receipt.type}
          />

          <Row
            title="Reference"
            value={receipt.reference}
          />

          <Row
            title="Flutterwave Ref"
            value={receipt.flutterwaveReference || "-"}
          />

          <Row
            title="Flutterwave ID"
            value={receipt.flutterwaveId || "-"}
          />

          <Row
            title="Status"
            value={receipt.status}
          />

          <Row
            title="Balance Before"
            value={`₦${Number(receipt.balanceBefore).toLocaleString()}`}
          />

          <Row
            title="Balance After"
            value={`₦${Number(receipt.balanceAfter).toLocaleString()}`}
          />

          <Row
            title="Date"
            value={new Date(receipt.createdAt).toLocaleString()}
          />

        </div>

        <div className="mt-10 flex gap-3">

          <button
            onClick={downloadPDF}
            className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-bold"
          >
            Download PDF 🧾
          </button>

          <button
            onClick={() => router.back()}
            className="flex-1 bg-zinc-800 py-3 rounded-xl"
          >
            Back
          </button>

        </div>

      </div>

    </div>

  );

}


function Row({ title, value }) {

  return (

    <div className="flex justify-between gap-3 border-b border-zinc-800 pb-2">

      <span className="text-zinc-400">
        {title}
      </span>

      <span className="text-right break-all">
        {value}
      </span>

    </div>

  );

}
