"use client";

import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const faqs = [
  {
    question: "How do I fund my AlphaBot wallet?",
    answer: "Open your AlphaBot Wallet, choose Fund Wallet and complete the available payment process. Successful payments are verified before your wallet is credited."
  },
  {
    question: "I made a payment but my AlphaBot wallet has not been credited.",
    answer: "Do not pay again immediately. AlphaBot automatically checks pending payments and credits your wallet once the payment is successfully verified."
  },
  {
    question: "How do I buy data on AlphaBot?",
    answer: "Open Data, select your network and data plan, enter the recipient's phone number and complete the purchase."
  },
  {
    question: "My airtime or data purchase failed. What should I do?",
    answer: "Check your transaction history first. If you were charged but did not receive the service, contact AlphaBot support with your transaction details."
  },
  {
    question: "How do AlphaBot referral rewards work?",
    answer: "Share your AlphaBot referral code with others. Eligible referrals can earn you rewards according to AlphaBot's current referral terms."
  },
  {
    question: "How do I reset my AlphaBot password?",
    answer: "From the AlphaBot login page, use the password reset option and follow the instructions to create a new password."
  },
  {
    question: "My transfer is pending. What should I do?",
    answer: "A pending transfer may still be processing. Give it some time, and contact AlphaBot support if it remains pending."
  },
  {
    question: "How can I protect my AlphaBot account?",
    answer: "Use a strong password and enable two-factor authentication (2FA) when available. Never share your password, OTP or PIN."
  },
  {
    question: "Will AlphaBot support ask for my password or OTP?",
    answer: "No. AlphaBot support will never ask you to reveal your password, OTP, PIN or authentication codes. Never share them with anyone."
  }
];

export default function Support(){

  const [openFaq,setOpenFaq] = useState(null);

  return(

    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        <Link
          href="/profile"
          className="text-yellow-500 font-semibold"
        >
          ← Profile
        </Link>


        <div className="mt-6 text-center">

          <div className="text-5xl mb-4">
            🎧
          </div>

          <h1 className="text-3xl font-black">
            Customer Support
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
            Find quick answers or contact our support team.
          </p>

        </div>


        {/* WHATSAPP */}

        <div className="mt-7 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">

          <div className="text-3xl mb-3">
            💬
          </div>

          <h2 className="text-xl font-bold">
            WhatsApp Support
          </h2>

          <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            Need help with something that is not answered below?
            Chat directly with our support team.
          </p>

          <a
            href="https://wa.me/2349037120624"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-5 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition"
          >
            Chat on WhatsApp
          </a>

        </div>


        {/* FAQ */}

        <div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">

          <h2 className="text-xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Quick answers to common questions.
          </p>


          <div className="mt-5 space-y-3">

            {faqs.map((faq,index)=>{

              const open = openFaq === index;

              return(

                <div
                  key={index}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >

                  <button
                    type="button"
                    onClick={()=>setOpenFaq(open ? null : index)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4"
                  >

                    <span className="text-sm font-semibold">
                      {faq.question}
                    </span>

                    <span className="text-zinc-500 shrink-0">
                      {open ? "−" : "+"}
                    </span>

                  </button>


                  {open && (

                    <div className="px-4 pb-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </div>

                  )}

                </div>

              );

            })}

          </div>

        </div>


        {/* STILL NEED HELP */}

        <div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6 text-center">

          <div className="text-3xl mb-3">
            🤖
          </div>

          <h2 className="text-xl font-bold">
            Still need help?
          </h2>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Ask AlphaBot AI for quick assistance, or contact our
            support team directly.
          </p>


          <div className="mt-5 flex gap-3">

            <Link
              href="/ai"
              className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-bold"
            >
              Ask AlphaBot AI
            </Link>

            <a
              href="https://wa.me/2349037120624"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold"
            >
              WhatsApp
            </a>

          </div>

        </div>


        <p className="text-xs text-center text-zinc-500 mt-6 leading-relaxed">
          Never share your password, OTP, PIN or authentication codes
          with anyone claiming to be AlphaBot support.
        </p>

      </div>


      <BottomNav />

    </main>

  );

}
