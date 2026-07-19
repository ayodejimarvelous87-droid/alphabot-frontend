"use client";

import { useEffect, useState } from "react";

const API = "https://alphabot-1.onrender.com";

export default function RecurringPage() {

  const [payments, setPayments] = useState([]);
  const [service, setService] = useState("data");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [loading, setLoading] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;


  async function loadPayments(){

    if(!user) return;

    const res = await fetch(
      `${API}/recurring/${user.phone}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    setPayments(data || []);
  }


  useEffect(()=>{
    loadPayments();
  },[]);



  async function createPayment(){

    setLoading(true);

    await fetch(
      `${API}/recurring`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
          phone:user.phone,
          service,
          amount:Number(amount),
          frequency
        })
      }
    );


    setAmount("");
    await loadPayments();

    setLoading(false);
  }



  async function cancelPayment(id){

    await fetch(
      `${API}/recurring/${id}`,
      {
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    loadPayments();
  }



  return (
    <div style={{padding:"20px"}}>

      <h1>🔁 Recurring Payments</h1>


      <div>

        <h3>Create Schedule</h3>


        <select
          value={service}
          onChange={e=>setService(e.target.value)}
        >
          <option value="data">DATA</option>
          <option value="airtime">AIRTIME</option>
        </select>


        <br/><br/>


        <input
          placeholder="Amount"
          value={amount}
          onChange={e=>setAmount(e.target.value)}
        />


        <br/><br/>


        <select
          value={frequency}
          onChange={e=>setFrequency(e.target.value)}
        >
          <option value="daily">DAILY</option>
          <option value="weekly">WEEKLY</option>
          <option value="monthly">MONTHLY</option>
        </select>


        <br/><br/>


        <button onClick={createPayment}>
          {loading ? "Creating..." : "Activate"}
        </button>


      </div>



      <hr/>


      <h3>My Active Payments</h3>


      {
        payments.length === 0
        ?
        <p>No recurring payments.</p>
        :
        payments.map(item=>(

          <div key={item._id}>

            <p>
              {item.service.toUpperCase()}
              {" - "}
              ₦{item.amount}
              {" - "}
              {item.frequency}
            </p>


            <button
              onClick={()=>cancelPayment(item._id)}
            >
              Cancel
            </button>

          </div>

        ))
      }


    </div>
  );
}
