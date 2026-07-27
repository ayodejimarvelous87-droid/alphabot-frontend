"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotificationDetails(){

  const { id } = useParams();

  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{

    const load = async()=>{

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

    };


    if(id){
      load();
    }

  },[id]);


  if(loading){

    return (
      <div className="p-6">
        Loading notification...
      </div>
    );

  }


  if(!data){

    return (
      <div className="p-6">
        Notification not found.
      </div>
    );

  }


  const transaction = data.transactionId;


  return (

    <div className="min-h-screen p-6">

      <Link
        href="/notifications"
        className="text-blue-600"
      >
        ← Back
      </Link>


      <div className="mt-6 rounded-xl border p-5 space-y-4">

        <h1 className="text-2xl font-bold">
          {data.title}
        </h2>


        <p>
          {data.message}
        </p>


        <p>
          Date: {new Date(data.createdAt).toLocaleString()}
        </p>


        {
          transaction && (

            <div className="border-t pt-4 space-y-2">

              <h2 className="font-bold">
                Transaction Details
              </h2>

              <p>
                Amount: ₦{transaction.amount}
              </p>

              <p>
                Status: {transaction.status}
              </p>

              <p>
                Reference: {transaction.reference}
              </p>

              <p>
                Flutterwave ID: {transaction.flutterwaveId}
              </p>

              <p>
                Description: {transaction.description}
              </p>

            </div>

          )
        }


      </div>

    </div>

  );

}
