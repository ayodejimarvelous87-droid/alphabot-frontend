"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams, useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

export default function ReceiptPage() {

  const { id } = useParams();
  const router = useRouter();

  const [receipt, setReceipt] = useState(null);

  const printStyle = `
    @media print {
      .no-print {
        display:none !important;
      }

      body {
        background:white !important;
      }
    }
  `;

  const [copied, setCopied] = useState(false);


  const copyReference = async()=>{

    await navigator.clipboard.writeText(
      receipt.reference || ""
    );

    setCopied(true);

    setTimeout(()=>{
      setCopied(false);
    },2000);

  };


  const shareReceipt = async()=>{

    const text = `
AlphaBot Receipt

Amount: ₦${Number(receipt.amount).toLocaleString()}
Reference: ${receipt.reference}
Status: ${receipt.status}
Date: ${new Date(receipt.createdAt).toLocaleString()}
    `;

    if(navigator.share){

      await navigator.share({
        title:"AlphaBot Receipt",
        text
      });

    }else{

      await navigator.clipboard.writeText(text);

      alert("Receipt details copied");

    }

  };


  const printReceipt = ()=>{

    window.print();

  };


  const downloadPDF = async()=>{

    const element = document.getElementById("receipt");

    const buttons = document.querySelectorAll(".no-print");

    buttons.forEach(btn=>{
      btn.style.display = "none";
    });


    const canvas = await html2canvas(element,{
      scale:2,
      backgroundColor:"#121214"
    });

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


    buttons.forEach(btn=>{
      btn.style.display = "";
    });

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

    <>
    <style>{printStyle}</style>

    <div className="min-h-screen bg-black text-white p-5">

      <div
id="receipt"
className="max-w-xl mx-auto rounded-3xl bg-[#121214] border border-zinc-800 p-6"
>

        <div className="text-center">

          <div className="mx-auto w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-4xl shadow-lg shadow-yellow-400/30">
            🤖
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-wide">
            AlphaBot
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Official Payment Receipt
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-green-600 px-5 py-3 rounded-full font-bold">
            ✅ Transaction Successful
          </div>

        </div>

        <div className="mt-8 rounded-3xl bg-gradient-to-br from-yellow-400/20 to-transparent border border-yellow-400/30 p-6 text-center">

          <p className="text-zinc-400 text-sm">
            Amount Paid
          </p>

          <h2 className="text-5xl font-extrabold text-yellow-400 mt-3">
            ₦{Number(receipt.amount).toLocaleString()}
          </h2>

          <p className="text-xs text-zinc-500 mt-3">
            AlphaBot Wallet Transaction
          </p>

        </div>


        <div className="mt-6 rounded-2xl bg-[#0A0A0C] border border-zinc-800 p-4">

          <p className="text-xs text-zinc-500">
            Receipt Number
          </p>

          <p className="font-bold mt-2 break-all">
            ALPHA-{receipt._id?.slice(-10).toUpperCase()}
          </p>

        </div>


        <div className="mt-8">

          <h2 className="text-lg font-bold mb-4">
            Transaction Information
          </h2>


          <div className="space-y-4">

          <Row
            title="Amount"
            value={`₦${Number(receipt.amount).toLocaleString()}`}
          />

          <Row
            title="Sender"
            value={receipt.phone || "-"}
          />

          <Row
            title="Recipient"
            value={receipt.recipient || receipt.phone || "-"}
          />

          <Row
            title="Service Purchased"
            value={
              receipt.description ||
              receipt.type ||
              "Wallet Transaction"
            }
          />

          <Row
            title="Payment Method"
            value="AlphaBot Wallet"
          />


          <Row
            title="Type"
            value={receipt.type}
          />

          <div className="rounded-2xl bg-black border border-zinc-800 p-4">

            <p className="text-xs text-zinc-500">
              Transaction Reference
            </p>

            <div className="flex items-center justify-between gap-3 mt-2">

              <p className="font-bold break-all">
                {receipt.reference}
              </p>

              <button
                onClick={copyReference}
                className="bg-yellow-400 text-black px-3 py-2 rounded-xl text-xs font-bold"
              >
                {copied ? "Copied" : "Copy"}
              </button>

            </div>

          </div>

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

        </div>

        <div className="mt-8 rounded-3xl bg-[#0A0A0C] border border-zinc-800 p-5">

          <h2 className="font-bold text-lg mb-4">
            Wallet Summary
          </h2>


          <div className="space-y-3">

            <Row
              title="Receipt Number"
              value={`ALPHA-${receipt._id?.slice(-8).toUpperCase()}`}
            />


            <Row
              title="Balance Before"
              value={`₦${Number(receipt.balanceBefore || 0).toLocaleString()}`}
            />


            <Row
              title="Balance After"
              value={`₦${Number(receipt.balanceAfter || 0).toLocaleString()}`}
            />

          </div>

        </div>



        <div className="mt-8 rounded-3xl bg-white text-black p-5 text-center">

          <h2 className="font-bold mb-4">
            Scan Receipt
          </h2>


          <div className="flex justify-center">

            <QRCodeSVG
              value={JSON.stringify({
                receipt: receipt._id,
                reference: receipt.reference,
                amount: receipt.amount,
                date: receipt.createdAt
              })}
              size={150}
            />

          </div>


          <p className="text-xs mt-3 text-zinc-500">
            AlphaBot Verified Receipt
          </p>

        </div>



        <div className="mt-10 flex gap-3 no-print">

          <button
            onClick={downloadPDF}
            className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-bold"
          >
            Download PDF 🧾
          </button>

          <button
            onClick={shareReceipt}
            className="flex-1 bg-blue-500 py-3 rounded-xl font-bold"
          >
            Share 📤
          </button>


          <button
            onClick={printReceipt}
            className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold"
          >
            Print 🖨️
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

    </>

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
