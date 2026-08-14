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

      /*
       * IMPORTANT:
       * Do NOT trust the redirect status to decide
       * whether payment succeeded or failed.
       *
       * Flutterwave's transaction verification endpoint
       * is the authoritative source.
       */

      if(!transaction_id){

        setMessage(
          "Payment received. Waiting for confirmation..."
        );

        return;

      }

      try{

        const token =
          localStorage.getItem("token");

        const headers = {};

        if(token){
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(
          `https://api.alphabothq.com/flutterwave/verify/${transaction_id}`,
          {
            headers
          }
        );

        const data = await res.json();

        if(res.ok){

          setSuccess(true);

          setMessage(
            data.message ||
            "Payment verified successfully. Your wallet is up to date."
          );

        }else{

          setMessage(
            data.message ||
            "Payment verification failed. Please wait a moment and check your wallet."
          );

        }

      }catch(err){

        console.error(
          "Payment verification error:",
          err
        );

        setMessage(
          "Could not verify payment right now. It will be checked automatically."
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
