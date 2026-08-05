"use client";

import {useEffect,useState} from "react";

export default function AdminWithdrawals(){

const [withdrawals,setWithdrawals]=useState([]);
const [message,setMessage]=useState("");


const loadWithdrawals=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-1.onrender.com/admin/withdrawal",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setWithdrawals(data);

};



useEffect(()=>{
loadWithdrawals();
},[]);



const action=async(id,type)=>{

const token=localStorage.getItem("adminToken");


const res=await fetch(
`https://alphabot-1.onrender.com/admin/${type}/${id}`,
{
method:"POST",
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();

setMessage(
res.ok ? `✅ ${type}` : data.message
);

loadWithdrawals();

};



return(

<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
💸 Withdrawals
</h1>


<p>{message}</p>


<div className="mt-5 space-y-4">


{withdrawals.map(item=>(

<div
key={item._id}
className="border rounded-xl p-4"
>


<p>
Phone: {item.phone}
</p>


<p>
Amount: ₦{item.amount}
</p>


<p>
Status: {item.status}
</p>


<p>
Bank: {item.bankName || "N/A"}
</p>



<button
className="bg-black text-white px-4 py-2 mr-2 rounded"
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
