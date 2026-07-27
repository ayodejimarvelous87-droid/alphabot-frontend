"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentResult(){

  const [message,setMessage] = useState(
    "Verifying your payment..."
  );

  const [success,setSuccess] = useState(false);


  useEffect(()=>{

    const verify = async()=>{

      const params = new URLSearchParams(
        window.location.search
      );

      const transaction_id =
        params.get("transaction_id");

      const status =
        params.get("status");


      if(status && status !== "successful"){

        setMessage(
          "Payment failed or was cancelled."
        );

        return;

      }


      if(!transaction_id){

        setMessage(
          "Payment received. Waiting for confirmation..."
        );

        return;

      }


      try{

        const token =
          localStorage.getItem("token");


        const res = await fetch(
          `https://alphabot-1.onrender.com/flutterwave/verify/${transaction_id}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );


        const data = await res.json();


        if(res.ok){

          setSuccess(true);

          setMessage(
            "Payment verified successfully. Your wallet is up to date."
          );

        }else{

          setMessage(
            data.message ||
            "Payment verification failed."
          );

        }


      }catch(err){

        setMessage(
          "Could not verify payment. It will be checked automatically."
        );

      }


    };


    verify();


  },[]);



  return (

    <div className="min-h-screen flex items-center justify-center p-6">

      <div className="text-center space-y-5">

        <h1 className="text-3xl font-bold">
          {success ? "✅ Success" : "💳 Payment Status"}
        </h1>


        <p>
          {message}
        </p>


        <Link
          href="/dashboard"
          className="px-5 py-3 rounded bg-blue-600 text-white inline-block"
        >
          Back to Wallet
        </Link>

      </div>

    </div>

  );

}
