"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotificationDetails(){

  const { id } = useParams();

  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{

    async function load(){

      try{

        const res = await fetch(
          `https://alphabot-1.onrender.com/notifications/detail/${id}`
        );

        const result = await res.json();

        setData(result);

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);

      }

    }


    if(id){
      load();
    }

  },[id]);


  if(loading){

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading notification...
      </div>
    );

  }


  if(!data){

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Notification not found.
      </div>
    );

  }


  const transaction = data.transactionId;


  const icon =
    data.type === "success"
    ? "✅"
    : data.type === "warning"
    ? "⚠️"
    : "🔔";


  return (

    <div className="min-h-screen bg-black text-white p-5">

      <div className="max-w-xl mx-auto">


        <Link
          href="/notifications"
          className="text-yellow-400 font-bold"
        >
          ← Back to Notifications
        </Link>


        <div className="mt-6 rounded-3xl bg-[#121214] border border-zinc-800 p-6 shadow-xl">


          <div className="text-center">

            <div className="mx-auto w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-4xl shadow-lg shadow-yellow-400/30">

              {icon}

            </div>


            <h1 className="mt-5 text-3xl font-extrabold">
              {data.title}
            </h1>


            <p className="mt-3 text-zinc-400">
              {data.message}
            </p>


            <p className="mt-4 text-sm text-zinc-500">
              {new Date(data.createdAt).toLocaleString()}
            </p>


          </div>



          {
            transaction && (

              <div className="mt-8 rounded-3xl bg-black border border-zinc-800 p-5">


                <h2 className="text-xl font-bold mb-5">
                  Transaction Details
                </h2>


                <div className="space-y-4">


                  <Detail
                    title="Amount"
                    value={`₦${Number(transaction.amount).toLocaleString()}`}
                  />


                  <Detail
                    title="Status"
                    value={transaction.status}
                  />


                  <Detail
                    title="Reference"
                    value={transaction.reference}
                  />


                  <Detail
                    title="Description"
                    value={transaction.description}
                  />


                </div>



                <Link
                  href={`/receipt/${transaction._id}`}
                  className="block text-center mt-6 bg-yellow-400 text-black py-3 rounded-xl font-bold"
                >
                  🧾 View Receipt
                </Link>


              </div>

            )

          }


        </div>


      </div>


    </div>

  );

}



function Detail({title,value}){

return (

<div className="flex justify-between gap-4 border-b border-zinc-800 pb-3">

<span className="text-zinc-400">
{title}
</span>


<span className="text-right font-bold break-all">
{value || "-"}
</span>


</div>

);

}
