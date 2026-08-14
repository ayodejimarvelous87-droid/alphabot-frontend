"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams, useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import Toast from "@/components/Toast";

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
const [toast,setToast] = useState("");


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

      setToast("✅ Receipt details copied");

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
          `https://api.alphabothq.com/receipts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        console.log("RECEIPT RESPONSE:", data);

        if (res.ok) {
          setReceipt(data.receipt);
        } else {
          alert(data.message || "Receipt loading failed");
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
          <div className="mt-8">

            <h2 className="text-lg font-bold mb-4">
              Transaction Information
            </h2>

            <div className="space-y-4">

              <Row
                title="Amount"
                value={`₦${Number(receipt.amount || 0).toLocaleString()}`}
              />

              <Row
                title="Service"
                value={getServiceName(receipt)}
              />

              {getReceiptDetails(receipt).map((item, index) => (
                <Row
                  key={index}
                  title={item.title}
                  value={item.value || "-"}
                />
              ))}

              <Row
                title="Payment Method"
                value="AlphaBot Wallet"
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
                title="Status"
                value={receipt.status}
              />

              <TechnicalDetails receipt={receipt} />

              <Row
                title="Balance Before"
                value={`₦${Number(receipt.balanceBefore || 0).toLocaleString()}`}
              />

              <Row
                title="Balance After"
                value={`₦${Number(receipt.balanceAfter || 0).toLocaleString()}`}
              />

              <Row
                title="Date"
                value={
                  receipt.createdAt
                    ? new Date(receipt.createdAt).toLocaleString()
                    : "-"
                }
              />

            </div>

          </div>
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

    <Toast
    message={toast}
    type="success"
    onClose={()=>setToast("")}
    />

    </>

  );

}



function getServiceName(receipt) {
  const service = String(
    receipt.service || receipt.type || ""
  ).toLowerCase();

  const names = {
    data: "Data",
    airtime: "Airtime",
    electricity: "Electricity",
    tv: "TV Subscription",
    betting: "Betting",
    exam_pin: "Exam PIN",
    recharge_pin: "Recharge PIN",
    airtime_cash: "Airtime Cash",
    bank_transfer: "Bank Transfer",
    payments: "Wallet Funding"
  };

  return (
    names[service] ||
    receipt.description ||
    receipt.type ||
    "Wallet Transaction"
  );
}


function getReceiptDetails(receipt) {
  const service = String(
    receipt.service || receipt.type || ""
  ).toLowerCase();

  const data = receipt.providerResponse?.data || {};
  const details = [];

  if (service === "airtime") {
    details.push(
      {
        title: "Phone Number",
        value: receipt.recipient || receipt.phone
      },
      {
        title: "Network",
        value: receipt.network || data.service_name
      }
    );

  } else if (service === "data") {
    details.push(
      {
        title: "Phone Number",
        value: receipt.recipient || receipt.phone
      },
      {
        title: "Network",
        value: receipt.network || data.service_name
      },
      {
        title: "Data Plan",
        value:
          receipt.product_name ||
          data.product_name ||
          data.plan_name ||
          receipt.description
      },
      {
        title: "Provider Order ID",
        value: data.order_id
      }
    );

  } else if (service === "electricity") {
    details.push(
      {
        title: "Meter Number",
        value:
          receipt.meterNumber ||
          receipt.meter_number ||
          receipt.recipient
      },
      {
        title: "Disco",
        value:
          receipt.disco ||
          receipt.network ||
          data.service_name
      },
      {
        title: "Customer Name",
        value:
          receipt.customerName ||
          receipt.customer_name ||
          data.customer_name
      },
      {
        title: "Token",
        value:
          receipt.token ||
          data.token
      }
    );

  } else if (service === "tv") {
    details.push(
      {
        title: "Smartcard Number",
        value:
          receipt.smartcardNumber ||
          receipt.smartcard_number ||
          receipt.recipient
      },
      {
        title: "Provider",
        value:
          receipt.provider ||
          receipt.network ||
          data.service_name
      },
      {
        title: "Package",
        value:
          receipt.package ||
          receipt.packageName ||
          receipt.description ||
          data.package_name
      },
      {
        title: "Customer Name",
        value:
          receipt.customerName ||
          receipt.customer_name ||
          data.customer_name
      }
    );

  } else if (service === "betting") {
    details.push(
      {
        title: "Betting Platform",
        value:
          receipt.provider ||
          receipt.network ||
          receipt.service_id
      },
      {
        title: "Customer ID",
        value:
          receipt.customer_id ||
          receipt.customerId ||
          receipt.recipient
      }
    );

  } else if (service === "exam_pin") {
    details.push(
      {
        title: "Exam",
        value:
          receipt.exam ||
          receipt.product_name ||
          receipt.description
      },
      {
        title: "PIN",
        value:
          receipt.pin ||
          data.pin ||
          data.pin_number
      }
    );

  } else if (service === "recharge_pin") {
    details.push(
      {
        title: "Network",
        value:
          receipt.network ||
          data.service_name
      },
      {
        title: "PIN",
        value:
          receipt.pin ||
          data.pin
      }
    );

  } else if (service === "airtime_cash") {
    details.push(
      {
        title: "Phone Number",
        value:
          receipt.recipient ||
          receipt.phone
      },
      {
        title: "Network",
        value: receipt.network
      }
    );

  } else if (service === "bank_transfer") {
    details.push(
      {
        title: "Account Number",
        value:
          receipt.accountNumber ||
          receipt.account_number ||
          receipt.recipient
      },
      {
        title: "Bank",
        value:
          receipt.bankName ||
          receipt.bank_name
      },
      {
        title: "Account Name",
        value:
          receipt.accountName ||
          receipt.account_name
      }
    );
  }

  return details.filter(
    item =>
      item.value !== undefined &&
      item.value !== null &&
      item.value !== ""
  );
}

function TechnicalDetails({ receipt }) {
  return (
    <div className="mt-6 rounded-2xl bg-[#0A0A0C] border border-zinc-800 p-5">
      <details className="group">

        <summary className="flex items-center justify-between cursor-pointer list-none">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 group-open:rotate-90 transition-transform">
              ▶
            </span>

            <span className="font-bold text-sm">
              Technical Details
            </span>
          </div>

          <span className="text-xs text-zinc-500 group-open:hidden">
            Show
          </span>

          <span className="text-xs text-zinc-500 hidden group-open:inline">
            Hide
          </span>
        </summary>

        <div className="mt-4 space-y-3">

          <TechnicalRow
            title="Provider Order ID"
            value={receipt.providerResponse?.data?.order_id || "N/A"}
          />

          <TechnicalRow
            title="Flutterwave Reference"
            value={receipt.flutterwaveReference || "N/A"}
          />

          <TechnicalRow
            title="Flutterwave ID"
            value={receipt.flutterwaveId || "N/A"}
          />

        </div>

      </details>
    </div>
  );
}


function TechnicalRow({title,value}) {

  const copy = () => {
    if(value !== "N/A"){
      navigator.clipboard.writeText(value);
    }
  };

  return (
    <div className="flex justify-between items-center p-3 rounded-xl bg-zinc-900 border border-zinc-800">

      <div>
        <p className="text-xs text-zinc-500">
          {title}
        </p>

        <p className="text-sm font-mono break-all mt-1">
          {value}
        </p>
      </div>

      {value !== "N/A" && (
        <button
          onClick={copy}
          className="text-xs bg-zinc-800 px-3 py-2 rounded-lg"
        >
          Copy
        </button>
      )}

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
