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
          `https://alphabot-1.onrender.com/notifications/detail/${id}`
        );

        const result = await res.json();

        setData(result);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }


    if(id){
      load();
    }

  }, [id]);



  if(loading){

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
        "></div>

      </div>
    );

  }



  if(!data){

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
        onClick={()=>router.back()}
        className="text-white font-bold"
        >
          Go Back
        </button>


      </div>
    );

  }



  const transaction = data.transactionId;


  const isSuccess =
    transaction?.status?.toLowerCase() === "successful" ||
    transaction?.status?.toLowerCase() === "success" ||
    data.type === "success";


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
        onClick={()=>router.back()}
        className="text-zinc-300"
        >
          ←
        </button>


        <h1 className="
        absolute
        left-1/2
        -translate-x-1/2
        font-semibold
        ">
          Details
        </h1>


      </header>





      <main className="
      max-w-md
      mx-auto
      px-5
      mt-6
      ">




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






        {/* Status */}

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





          {
            transaction?.amount ? (

              <h2 className="
              text-3xl
              font-bold
              tracking-tight
              font-mono
              ">

                {isCredit ? "+" : "-"}
                ₦
                {Number(transaction.amount).toLocaleString(undefined,{
                  minimumFractionDigits:2,
                  maximumFractionDigits:2
                })}

              </h2>

            ) : (

              <h2 className="
              text-xl
              font-bold
              ">
                {data.title}
              </h2>

            )

          }



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

            {transaction?.status || data.type || "Notification"}

          </p>


        </div>







        {/* Details Card */}

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



          {!transaction && (

            <div className="
            pb-4
            border-b
            border-zinc-800
            ">

              <h3 className="font-bold">
                {data.title}
              </h3>


              <p className="
              text-sm
              text-zinc-400
              mt-2
              ">
                {data.message}
              </p>

            </div>

          )}






          <div className="
          mt-4
          space-y-4
          ">


            {transaction && (

              <>


              <DetailRow
              title="Remarks"
              value={transaction.description || data.message}
              />


              <DetailRow
              title="Transaction Ref"
              value={transaction.reference}
              copy
              />


              </>

            )}




            <DetailRow
            title="Transaction Time"
            value={
              new Date(data.createdAt).toLocaleString()
            }
            />


          </div>


        </div>







        {transaction && (

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

        )}



      </main>


    </div>

  );

}




function DetailRow({title,value,copy=false}){


  function handleCopy(){

    navigator.clipboard.writeText(value);

  }


  return (

    <div className="
    flex
    justify-between
    items-start
    gap-4
    ">


      <span className="
      text-zinc-500
      text-sm
      ">
        {title}
      </span>



      <div className="
      flex
      items-center
      gap-2
      text-right
      ">

        <span className="
        text-sm
        font-medium
        break-all
        ">
          {value || "-"}
        </span>



        {copy && (

          <button
          onClick={handleCopy}
          className="
          text-zinc-300
          text-xs
          "
          >
            Copy
          </button>

        )}

      </div>


    </div>

  );

}
