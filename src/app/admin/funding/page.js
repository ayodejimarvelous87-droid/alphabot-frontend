"use client";

import {useEffect,useState} from "react";

export default function AdminFunding(){

const [requests,setRequests]=useState([]);
const [message,setMessage]=useState("");


const loadRequests=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-1.onrender.com/funding/requests",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setRequests(data);

};


useEffect(()=>{
loadRequests();
},[]);



const action=async(id,type)=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
`https://alphabot-1.onrender.com/funding/${type}/${id}`,
{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();

setMessage(
res.ok ? `✅ ${data.message}` : data.message
);


loadRequests();

};



return(
<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
💰 Funding Requests
</h1>


<p className="mt-3">
{message}
</p>


<div className="mt-5 space-y-4">

{requests.map(item=>(

<div
key={item._id}
className="border border-zinc-800 rounded-3xl-xl p-4"
>

<p>
📱 Phone: {item.phone}
</p>

<p>
💵 Amount: ₦{item.amount}
</p>

<p>
🔖 Reference: {item.reference || "None"}
</p>

<p>
Status: {item.status}
</p>


<button
className="bg-black text-white px-4 py-2 rounded mr-2"
onClick={()=>action(item._id,"approve")}
>
Approve
</button>


<button
className="border px-4 py-2 rounded"
onClick={()=>action(item._id,"reject")}
>
Reject
</button>


</div>

))}

</div>


</div>
);

}
