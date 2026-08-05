"use client";

import {useEffect,useState} from "react";

export default function BlogPayoutHistory(){

const [history,setHistory]=useState([]);
const [loading,setLoading]=useState(true);


const loadHistory=async()=>{

try{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-1.onrender.com/blog-payout/history",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setHistory(data);

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

};



useEffect(()=>{

loadHistory();

},[]);



return(

<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
📜 Blog Payout History
</h1>



{loading && (

<p className="mt-5">
Loading history...
</p>

)}



{!loading && history.length===0 && (

<p className="mt-5">
No payout history yet
</p>

)}



<div className="mt-5 space-y-4">


{history.map(item=>(

<div
key={item._id}
className="border rounded-xl p-5 shadow-sm"
>


<h2 className="font-bold text-lg">
{item.blogPartner?.name || "Partner"}
</h2>


<p>
💰 Amount: ₦{item.amount}
</p>


<p>
📅 Period Start: {new Date(item.periodStart).toLocaleString()}
</p>


<p>
📅 Period End: {new Date(item.periodEnd).toLocaleString()}
</p>


<p>
🔖 Reference: {item.reference}
</p>


<p>
Status: {item.status}
</p>


<p>
Paid Date: {new Date(item.paidAt).toLocaleString()}
</p>


</div>

))}


</div>


</div>

);

}
