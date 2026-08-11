"use client";

import Link from "next/link";

export default function DeliveryScams() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">

      <div className="max-w-md mx-auto">

        <Link
          href="/settings/education"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back to Security Education
        </Link>


        <div className="mt-7">

          <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-2xl">
            📦
          </div>

          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Common Scam
          </p>

          <h1 className="text-3xl font-black mt-2">
            Fake Delivery Scams
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-6">
            Scammers may pretend to be delivery companies, online stores
            or customs authorities and claim there is a problem with your
            parcel.
          </p>

        </div>


        <div className="mt-6 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">

          <p className="font-black text-red-600 dark:text-red-400">
            🚨 Watch out
          </p>

          <p className="text-sm text-red-700 dark:text-red-300 mt-2 leading-6">
            A message claiming that your parcel is being held and asking
            you to make an unexpected payment or provide sensitive
            information may be a scam.
          </p>

        </div>


        <section className="mt-8">

          <h2 className="text-xl font-black">
            How the scam works
          </h2>

          <div className="mt-4 space-y-3">

            {[
              ["📱", "You receive a message", "You get an SMS, email, WhatsApp message or social-media message about a supposed delivery."],
              ["📦", "There is a problem", "The scammer claims your address is incorrect, your parcel is held, or customs requires payment."],
              ["💳", "You are asked to pay", "You are directed to pay a small delivery, customs, redelivery or processing fee."],
              ["🔗", "A link is provided", "The message may contain a link to a fake delivery website designed to steal your information."],
              ["🔐", "Information is requested", "The fake website may ask for card details, passwords, OTPs or other sensitive information."],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800"
              >

                <span className="text-xl">
                  {icon}
                </span>

                <div>

                  <p className="font-bold">
                    {title}
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-6">
                    {description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>


        <section className="mt-10">

          <h2 className="text-xl font-black">
            Warning signs
          </h2>

          <div className="mt-4 p-5 rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800">

            <div className="space-y-4">

              {[
                "You were not expecting a delivery.",
                "The message creates pressure to pay immediately.",
                "The sender uses a suspicious phone number or email address.",
                "The link does not clearly belong to the real delivery company.",
                "You are asked for an OTP, password, PIN or full card credentials.",
                "The payment amount is unusually small and described as a simple verification fee.",
              ].map((warning) => (

                <div
                  key={warning}
                  className="flex gap-3"
                >

                  <span className="text-red-500 font-black">
                    !
                  </span>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6">
                    {warning}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        <section className="mt-10">

          <h2 className="text-xl font-black">
            How to stay safe
          </h2>

          <div className="mt-4 space-y-3">

            {[
              "Check your order directly through the store or delivery company's official app or website.",
              "Do not use links from unexpected delivery messages.",
              "Never share your OTP, transaction PIN or password with someone claiming to be a delivery agent.",
              "Verify the sender before making any payment.",
              "If you are unsure, contact the delivery company using contact details from its official website.",
              "Do not allow urgency to make you skip normal security checks.",
            ].map((rule) => (

              <div
                key={rule}
                className="flex gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800"
              >

                <span className="text-green-500 font-black">
                  ✓
                </span>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6">
                  {rule}
                </p>

              </div>

            ))}

          </div>

        </section>


        <div className="mt-8 p-5 rounded-2xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">

          <p className="font-black text-yellow-700 dark:text-yellow-300">
            🛡️ AlphaBot security reminder
          </p>

          <p className="text-sm text-yellow-700/80 dark:text-yellow-300/80 mt-2 leading-6">
            AlphaBot will never require you to reveal your password,
            transaction PIN or one-time verification code to receive a
            parcel.
          </p>

        </div>


        <Link
          href="/settings/education"
          className="block mt-8 w-full text-center bg-black dark:bg-white text-white dark:text-black rounded-2xl py-4 font-bold"
        >
          ← Back to Security Education
        </Link>

      </div>

    </main>
  );
}
