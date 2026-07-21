"use client";

import {useEffect,useState} from "react";

const API="https://alphabot-i7p2.onrender.com";


export default function RecurringPage(){

const [payments,setPayments]=useState([]);
const [service,setService]=useState("data");
const [amount,setAmount]=useState("");
const [targetPhone,setTargetPhone]=useState("");
const [frequency,setFrequency]=useState("daily");
const [loading,setLoading]=useState(false);
const [message,setMessage]=useState("");


const user =
typeof window !== "undefined"
? JSON.parse(localStorage.getItem("user"))
: null;


const token =
typeof window !== "undefined"
? localStorage.getItem("token")
: null;



const loadPayments=async()=>{

try{

if(!user) return;


const res=await fetch(
`${API}/recurring/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();

setPayments(data || []);


}catch(error){

console.log(error);

}

};



useEffect(()=>{

const init = async()=>{
await loadPayments();
};

init();

},[]);



const createPayment=async()=>{


if(!targetPhone || !amount){

setMessage("Enter phone number and amount");
return;

}


try{

setLoading(true);


const res=await fetch(
`${API}/recurring`,
{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({

phone:user.phone,

targetPhone,

service,

amount:Number(amount),

frequency

})

}

);


const data=await res.json();


if(!res.ok){

throw new Error(data.message || "Failed");

}


setMessage("✅ Recurring payment activated");

setAmount("");

loadPayments();



}catch(error){

setMessage(error.message);


}finally{

setLoading(false);

}


};



const cancelPayment=async(id)=>{


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


};



return(

<main className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-5 pb-24">


<h1 className="text-3xl font-bold mb-6">
🔁 Recurring Payments
</h1>



<div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5 space-y-4">


<select
className="w-full p-4 rounded-xl border"
value={service}
onChange={e=>setService(e.target.value)}
>

<option value="data">
🌐 Data
</option>

<option value="airtime">
📱 Airtime
</option>

</select>



<input
className="w-full p-4 rounded-xl border"
placeholder="Phone number to subscribe"
type="tel"
value={targetPhone}
onChange={e=>setTargetPhone(e.target.value)}
/>

<input
className="w-full p-4 rounded-xl border"
placeholder="Amount"
type="number"
value={amount}
onChange={e=>setAmount(e.target.value)}
/>



<select

className="w-full p-4 rounded-xl border"

value={frequency}

onChange={e=>setFrequency(e.target.value)}

>


<option value="daily">
Daily
</option>


<option value="weekly">
Weekly
</option>


<option value="monthly">
Monthly
</option>


</select>



<button

onClick={createPayment}

disabled={loading}

className="w-full bg-black text-white dark:bg-white dark:text-black p-4 rounded-2xl font-bold"

>

{loading ? "Activating..." : "Activate Schedule"}

</button>


</div>



<p className="mt-4 font-semibold">
{message}
</p>



<h2 className="text-xl font-bold mt-8">
Active Payments
</h2>



<div className="space-y-3 mt-4">

{

payments.map(item=>(

<div

key={item._id}

className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4"

>

<p className="font-bold">
{item.service.toUpperCase()}
</p>

<p>
₦{item.amount} - {item.frequency}
</p>


<button

onClick={()=>cancelPayment(item._id)}

className="mt-3 bg-red-600 text-white px-4 py-2 rounded-xl"

>

Cancel

</button>


</div>

))

}


</div>


</main>

)

}
