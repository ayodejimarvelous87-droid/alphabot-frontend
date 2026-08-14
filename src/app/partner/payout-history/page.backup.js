"use client";

import {useEffect,useState} from "react";

export default function PartnerPayoutHistory(){

const [history,setHistory]=useState([]);
const [message,setMessage]=useState("");

const load=async()=>{

const token=localStorage.getItem("partnerToken");

if(!token){
setMessage("Please login");
return;
}

const res=await fetch(
"https://api.alphabothq.com/blog-partner/payout-history",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

if(res.ok){
setHistory(data);
}else{
setMessage(data.message);
}

};


useEffect(()=>{
load();
},[]);


return(
<div className="p-6">

<h1 className="text-2xl font-bold">
📜 Payout History
</h1>

<p>{message}</p>

<div className="mt-5 space-y-4">

{history.length===0 && (
<p>No payout history</p>
)}

{history.map(item=>(

<div
key={item._id}
className="border rounded-xl p-4"
>

<p>
Amount: ₦{item.amount}
</p>

<p>
Status: {item.status}
</p>

<p>
Reference: {item.reference || "N/A"}
</p>

<p>
Date: {new Date(item.createdAt).toLocaleString()}
</p>

</div>

))}

</div>

</div>
);

}
