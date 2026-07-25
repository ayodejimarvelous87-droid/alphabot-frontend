"use client";

import {useEffect,useState} from "react";


export default function AdminRecurring(){

const [items,setItems]=useState([]);
const [message,setMessage]=useState("");



const load=async()=>{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/recurring",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
}
}
);


const data=await res.json();

setItems(data);

};



useEffect(()=>{

load();

},[]);




const cancel=async(id)=>{

const res=await fetch(
`https://alphabot-1.onrender.com/admin/recurring/cancel/${id}`,
{
method:"PUT",
headers:{
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
}
}
);


setMessage(
res.ok
?"✅ Cancelled"
:"❌ Failed"
);


load();

};



return(

<div className="p-6">

<h1 className="text-2xl font-bold">
🔁 Recurring Management
</h1>


<p>
{message}
</p>


{items.map(item=>(

<div
key={item._id}
className="border rounded-xl p-4 mt-4"
>

<p>
👤 User: {item.phone}
</p>

<p>
📱 Target: {item.targetPhone}
</p>

<p>
⚙️ Service: {item.service}
</p>

<p>
🏷️ Provider: {item.provider}
</p>

<p>
💰 Amount: ₦{item.amount}
</p>

<p>
🔁 Frequency: {item.frequency}
</p>

<p>
📌 Status: {item.status || "active"}
</p>


{item.status !== "cancelled" && (

<button
className="border rounded px-4 py-2 mt-3"
onClick={()=>cancel(item._id)}
>
❌ Cancel
</button>

)}


</div>

))}


</div>

);

}
