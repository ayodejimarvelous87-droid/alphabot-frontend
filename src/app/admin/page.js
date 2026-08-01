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
Manage AlphaBot operations and monitor business performance.
</p>


<div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-xl p-3">
{message}
</div>



<div className="grid gap-4 md:grid-cols-3">


<div className="border rounded-xl p-5">
<h2>👥 Total Users</h2>
<p className="text-2xl font-bold">
{data.totalUsers}
</p>
</div>


<div className="border rounded-xl p-5">
<h2>💰 Wallet Balance</h2>
<p className="text-2xl font-bold">
₦{data.walletBalance}
</p>
</div>


<div className="border rounded-xl p-5">
<h2>💳 Today's Sales</h2>
<p className="text-2xl font-bold">
₦{data.todaySales}
</p>
</div>


<div className="border rounded-xl p-5">
<h2>📈 Today's Profit</h2>
<p className="text-2xl font-bold">
₦{data.todayProfit}
</p>
</div>


<div className="border rounded-xl p-5">
<h2>📅 Monthly Profit</h2>
<p className="text-2xl font-bold">
₦{data.monthProfit}
</p>
</div>


<div className="border rounded-xl p-5">
<h2>🏆 Best Service</h2>
<p className="text-2xl font-bold">
{data.bestService}
</p>
</div>


</div>



<div className="grid gap-6 mt-6">


<div className="border rounded-xl p-5">

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



<div className="border rounded-xl p-5">

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



<div className="border rounded-xl p-5">

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



<div className="border rounded-xl p-5">

<h2 className="font-bold mb-3">
📜 Recent Transactions
</h2>


{data.recentTransactions.map((item)=>(

<div
key={item._id}
className="border rounded p-3 mt-2"
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





<div className="grid gap-4 mt-8">



<Link
href="/admin/users"
className="border rounded-xl p-5"
>
👥 Users Management
</Link>







<Link
href="/admin/transactions"
className="border rounded-xl p-5"
>
📜 Transactions
</Link>



<Link
href="/admin/withdrawals"
className="border rounded-xl p-5"
>
💸 Withdrawals
</Link>

<Link
href="/admin/orders"
className="border rounded-xl p-5"
>
📦 Orders Management
</Link>


<Link
href="/admin/funding"
className="border rounded-xl p-5"
>
💰 Funding Requests
</Link>


<Link
href="/admin/notifications"
className="border rounded-xl p-5"
>
📢 Broadcast Messages
</Link>

<Link
href="/admin/settings"
className="border rounded-xl p-5"
>
⚙️ System Settings
</Link>

<Link
href="/admin/football"
className="border rounded-xl p-5"
>
⚽ Football Rewards
</Link>





<div className="border rounded-xl p-5">

<h2 className="font-bold mb-3">
⚙️ Service Management
</h2>


<div className="grid gap-3">


<Link
href="/admin/products"
className="border rounded-xl p-4"
>
📶 Data Plans & Products
</Link>


<Link
href="/admin/airtime"
className="border rounded-xl p-4"
>
📱 Airtime Pricing
</Link>

<Link
href="/admin/electricity"
className="border rounded-xl p-4"
>
⚡ Electricity
</Link>


<Link
href="/admin/tv"
className="border rounded-xl p-4"
>
📺 TV Subscription
</Link>


<Link
href="/admin/betting"
className="border rounded-xl p-4"
>
🎲 Betting
</Link>


<Link
href="/admin/recurring"
className="border rounded-xl p-4"
>
🔁 Recurring Services
</Link>



<Link
href="/admin/profits"
className="border rounded-xl p-4"
>
📈 Revenue & Profit
</Link>


</div>

</div>


</div>


</div>

);

}
