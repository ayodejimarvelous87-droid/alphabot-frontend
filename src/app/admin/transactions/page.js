"use client";

import { useEffect, useState } from "react";

export default function AdminTransactions(){

  const [transactions,setTransactions] = useState([]);


  useEffect(()=>{

    const loadTransactions = async()=>{

      const token = localStorage.getItem("adminToken");


      const res = await fetch(
        "https://alphabot-i7p2.onrender.com/admin/transactions",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      const data = await res.json();

      setTransactions(data);

    };


    loadTransactions();

  },[]);



  return (

    <div style={{padding:"30px"}}>

      <h1>📜 Transactions</h1>


      {transactions.map((tx)=>(

        <div
          key={tx._id}
          style={{
            border:"1px solid #ccc",
            padding:"15px",
            margin:"10px 0"
          }}
        >

          <p>
            Phone: {tx.phone}
          </p>

          <p>
            Type: {tx.type}
          </p>

          <p>
            Amount: ₦{tx.amount}
          </p>

          <p>
            Status: {tx.status}
          </p>

          <p>
            Reference: {tx.reference || "N/A"}
          </p>


        </div>

      ))}


    </div>

  );

}
