"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import { requestNotificationPermission } from "@/firebase";
import {
LineChart,
Line,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


export default function AdminDashboard(){


const [data,setData]=useState({
totalUsers:0,
walletBalance:0,
todaySales:0,
todayProfit:0,
monthProfit:0,
bestService:"N/A",
  masterWallet:{
    oplug:0,
    blitzpay:0,
    vtu:0
  },
salesChart:[],
profitChart:[],
serviceChart:[],
recentTransactions:[]
});


const [message,setMessage]=useState("");


useEffect(()=>{

const load=async()=>{

try{

const res=await fetch(
"https://api.alphabothq.com/admin/dashboard",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
}
}
);


const result=await res.json();


if(res.ok){

setData(result);

}else{

setMessage(result.message || "Failed");

}


}catch(error){

setMessage("Connection error");

}

};


load();

requestNotificationPermission().then(async(token)=>{

  console.log("Firebase notification token:", token);

  if(token){

    await fetch(
      "https://api.alphabothq.com/notifications/register-token",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          token
        })
      }
    );

  }

});

},[]);



return(

<div className="space-y-8">


<h1 className="text-4xl font-black tracking-tight">
👑 AlphaBot Admin Panel
</h1>


<p>
<span className="text-zinc-400">Manage AlphaBot operations and monitor business performance.</span>
</p>


<div className="bg-[#18181B] text-zinc-300 border border-zinc-800 rounded-xl p-3">
{message}
</div>



<div className="grid gap-4 md:grid-cols-3">


<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition">
<h2 className="text-zinc-400 text-sm">👥 Total Users</h2>
<p className="text-3xl font-black mt-3">
{data.totalUsers}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition">
<h2 className="text-zinc-400 text-sm">💰 Wallet Balance</h2>
<p className="text-3xl font-black mt-3">
₦{data.walletBalance}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition">
<h2 className="text-zinc-400 text-sm">💳 Today's Sales</h2>
<p className="text-3xl font-black mt-3">
₦{data.todaySales}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition">
<h2 className="text-zinc-400 text-sm">📈 Today's Profit</h2>
<p className="text-3xl font-black mt-3">
₦{data.todayProfit}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition">
<h2 className="text-zinc-400 text-sm">📅 Monthly Profit</h2>
<p className="text-3xl font-black mt-3">
₦{data.monthProfit}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition">
<h2 className="text-zinc-400 text-sm">🏆 Best Service</h2>
<p className="text-3xl font-black mt-3">
{data.bestService}
</p>
</div>


</div>





  <div className="grid gap-4 md:grid-cols-3 mt-6">

  <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
  <h2 className="text-zinc-400 text-sm">🟣 Oplug Wallet</h2>
  <p className="text-3xl font-black mt-3">
  ₦{Number(data.masterWallet?.oplug || 0).toFixed(2)}
  </p>
  </div>

  <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
  <h2 className="text-zinc-400 text-sm">🔵 BlitzPay Wallet</h2>
  <p className="text-3xl font-black mt-3">
  ₦{Number(data.masterWallet?.blitzpay || 0).toFixed(2)}
  </p>
  </div>

  <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
  <h2 className="text-zinc-400 text-sm">🟢 VTU.ng Wallet</h2>
  <p className="text-3xl font-black mt-3">
  ₦{Number(data.masterWallet?.vtu || 0).toFixed(2)}
  </p>
  </div>

  </div>

<div className="grid gap-6 mt-6">


<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-5 ">

<h2 className="font-bold text-lg mb-5">
📊 7 Day Sales Trend
</h2>

<ResponsiveContainer width="100%" height={250}>

<LineChart data={data.salesChart}>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="amount"
/>

</LineChart>

</ResponsiveContainer>

</div>



<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-5 ">

<h2 className="font-bold text-lg mb-5">
📈 7 Day Profit Trend
</h2>

<ResponsiveContainer width="100%" height={250}>

<LineChart data={data.profitChart}>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="amount"
/>

</LineChart>

</ResponsiveContainer>

</div>



<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-5 ">

<h2 className="font-bold text-lg mb-5">
🏆 Service Performance
</h2>

<ResponsiveContainer width="100%" height={250}>

<BarChart data={data.serviceChart}>

<XAxis dataKey="service"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="amount"
/>

</BarChart>

</ResponsiveContainer>

</div>


</div>



<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-5 ">

<h2 className="font-bold mb-3">
📜 Recent Transactions
</h2>


{data.recentTransactions.map((item)=>(

<div
key={item._id}
className="bg-[#0b1220] border border-zinc-800 rounded p-3 mt-2"
>

<p>
{item.type} - ₦{item.amount}
</p>

<p className="text-sm">
{item.status}
</p>

</div>

))}


</div>





</div>

);

}
