"use client";

import {useEffect,useState} from "react";

export default function BlogPayouts(){

const [payouts,setPayouts]=useState([]);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(true);


const loadPayouts=async()=>{

try{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-1.onrender.com/blog-payout/pending",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setPayouts(data);

}catch(error){

setMessage("Failed to load payouts");

}finally{

setLoading(false);

}

};


useEffect(()=>{

loadPayouts();

},[]);



const markPaid=async(partnerId)=>{

const token=localStorage.getItem("adminToken");


const res=await fetch(
"https://alphabot-1.onrender.com/blog-payout/pay",
{
method:"POST",
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
partnerId
})
}
);


const data=await res.json();


setMessage(
res.ok
?
"✅ Payout marked as paid"
:
data.message
);


loadPayouts();

};



return(

<div className="p-6">

<h1 className="text-2xl font-bold">
📝 Blog Partner Payouts
</h1>


<p className="mt-3">
{message}
</p>


{loading && (
<p className="mt-5">
Loading payouts...
</p>
)}


{!loading && payouts.length===0 && (

<p className="mt-5">
No pending payouts.
</p>

)}



<div className="mt-5 space-y-4">


{payouts.map(item=>(

<div
key={item._id}
className="border rounded-xl p-5 shadow-sm"
>


<h2 className="font-bold text-lg">
{item.name}
</h2>


<p>
Code: {item.code}
</p>


<div className="mt-3">

<p>
💰 Amount Due: ₦{item.pendingPayout}
</p>

<p>
🏦 Bank: {item.bankName || "Not set"}
</p>

<p>
🔢 Account Number: {item.accountNumber || "Not set"}
</p>

<p>
👤 Account Name: {item.accountName || "Not set"}
</p>

</div>


<button
disabled={item.pendingPayout<=0}
className="bg-black text-white px-4 py-2 mt-4 rounded disabled:opacity-50"
onClick={()=>markPaid(item._id)}
>
Mark Paid
</button>


</div>

))}


</div>


</div>

);

}
