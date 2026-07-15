"use client";

import { useState } from "react";

export default function Wallet(){

  const [amount,setAmount]=useState("");
  const [message,setMessage]=useState("");



  const fundWallet=async()=>{

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));


    try{

      const res = await fetch(
        "https://alphabot-i7p2.onrender.com/wallet/fund",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify({
            phone:user.phone,
            amount:Number(amount)
          })
        }
      );


      const data = await res.json();


      setMessage(
        data.message || "Completed"
      );


    }catch(error){

      setMessage("Network error");

    }

  };



  return(

    <main className="min-h-screen bg-black text-white px-6 py-10">


      <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8">


        <h1 className="text-3xl font-bold">
          Fund Wallet
        </h1>


        <p className="text-zinc-400 mt-2">
          Add money to your AlphaBot wallet
        </p>



        <input

          className="w-full mt-8 p-3 bg-black border border-zinc-700 rounded-xl"

          placeholder="Enter amount"

          type="number"

          onChange={(e)=>setAmount(e.target.value)}

        />



        <button

          onClick={fundWallet}

          className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"

        >

          Fund Wallet

        </button>



        <p className="mt-4 text-center text-zinc-400">
          {message}
        </p>


      </div>


    </main>

  );

}
