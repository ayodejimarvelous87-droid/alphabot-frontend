"use client";

import { useEffect, useState } from "react";

export default function AdminWithdrawals(){

  const [withdrawals,setWithdrawals] = useState([]);
  const [message,setMessage] = useState("");


  const loadWithdrawals = async()=>{

    const token = localStorage.getItem("adminToken");


    const res = await fetch(
      "https://alphabot-i7p2.onrender.com/admin/withdrawal/withdrawals",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    const data = await res.json();

    setWithdrawals(data);

  };



  useEffect(()=>{

    loadWithdrawals();

  },[]);



  const action = async(id,type)=>{

    const token = localStorage.getItem("adminToken");


    const res = await fetch(
      `https://alphabot-i7p2.onrender.com/admin/withdrawal/${type}/${id}`,
      {
        method:"POST",
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    const data = await res.json();

    setMessage(data.message);

    loadWithdrawals();

  };



  return (

    <div style={{padding:"30px"}}>

      <h1>💸 Withdrawals</h1>

      <p>{message}</p>


      {withdrawals.map((w)=>(

        <div
          key={w._id}
          style={{
            border:"1px solid #ccc",
            padding:"15px",
            margin:"10px 0"
          }}
        >

          <p>Phone: {w.phone}</p>

          <p>Amount: ₦{w.amount}</p>

          <p>Bank: {w.bankName}</p>

          <p>Account: {w.accountNumber}</p>

          <p>Status: {w.status}</p>


          {w.status === "pending" && (

            <>

              <button
                onClick={()=>action(w._id,"approve")}
              >
                ✅ Approve
              </button>


              <button
                onClick={()=>action(w._id,"reject")}
              >
                ❌ Reject
              </button>

            </>

          )}


        </div>

      ))}


    </div>

  );

}
