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
"https://alphabot-1.onrender.com/admin/dashboard",
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
      "https://alphabot-1.onrender.com/notifications/register-token",
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

<div className="p-6 space-y-6">


<h1 className="text-3xl font-bold">
👑 AlphaBot Admin Panel
</h1>


<p>
<span className="text-zinc-400">Manage AlphaBot operations and monitor business performance.</span>
</p>


<div className="bg-[#18181B] text-zinc-300 border border-zinc-800 rounded-xl p-3">
{message}
</div>



<div className="grid gap-4 md:grid-cols-3">


<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 ">
<h2>👥 Total Users</h2>
<p className="text-2xl font-bold">
{data.totalUsers}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 ">
<h2>💰 Wallet Balance</h2>
<p className="text-2xl font-bold">
₦{data.walletBalance}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 ">
<h2>💳 Today's Sales</h2>
<p className="text-2xl font-bold">
₦{data.todaySales}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 ">
<h2>📈 Today's Profit</h2>
<p className="text-2xl font-bold">
₦{data.todayProfit}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 ">
<h2>📅 Monthly Profit</h2>
<p className="text-2xl font-bold">
₦{data.monthProfit}
</p>
</div>


<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 ">
<h2>🏆 Best Service</h2>
<p className="text-2xl font-bold">
{data.bestService}
</p>
</div>


</div>



<div className="grid gap-6 mt-6">


<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-5 ">

<h2 className="font-bold mb-4">
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

<h2 className="font-bold mb-4">
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

<h2 className="font-bold mb-4">
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
