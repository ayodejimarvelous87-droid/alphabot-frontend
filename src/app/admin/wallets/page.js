"use client";

import { useState } from "react";

export default function AdminWallets(){

  const [phone,setPhone] = useState("");
  const [wallet,setWallet] = useState(null);
  const [amount,setAmount] = useState("");
  const [message,setMessage] = useState("");



  const searchWallet = async()=>{

    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `https://alphabot-i7p2.onrender.com/admin/wallet/${phone}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    const data = await res.json();

    if(res.ok){
      setWallet(data);
    }else{
      setMessage(data.message);
    }

  };



  const addFunds = async()=>{

    const token = localStorage.getItem("adminToken");


    const res = await fetch(
      "https://alphabot-i7p2.onrender.com/admin/wallet/add",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
          phone,
          amount
        })
      }
    );


    const data = await res.json();

    setMessage(data.message);

    if(data.wallet){
      setWallet(data.wallet);
    }

  };



  const deductFunds = async()=>{

    const token = localStorage.getItem("adminToken");


    const res = await fetch(
      "https://alphabot-i7p2.onrender.com/admin/wallet/deduct",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
          phone,
          amount
        })
      }
    );


    const data = await res.json();

    setMessage(data.message);

    if(data.wallet){
      setWallet(data.wallet);
    }

  };



  return(
    <div style={{padding:"30px"}}>

      <h1>💰 Wallet Control</h1>


      <input
        placeholder="User phone"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />


      <button onClick={searchWallet}>
        Search
      </button>


      {wallet && (
        <div>

          <h3>
            Balance: ₦{wallet.balance}
          </h3>


          <input
            placeholder="Amount"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
          />


          <br/>


          <button onClick={addFunds}>
            Add Funds
          </button>


          <button onClick={deductFunds}>
            Deduct Funds
          </button>


        </div>
      )}


      <p>{message}</p>


    </div>
  );

}
