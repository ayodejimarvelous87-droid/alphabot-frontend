"use client";

import { useRouter } from "next/navigation";

import {useEffect,useState} from "react";
import Link from "next/link";
import SuccessCelebration from "@/components/success-celebration";

export default function Page(){

const router=useRouter();

const [provider,setProvider]=useState("");
const [smartCardNumber,setSmartCardNumber]=useState("");
const [tvPackage,setTvPackage]=useState("");
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");

const [plans,setPlans]=useState([]);
const [providers,setProviders]=useState([]);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [showSuccess,setShowSuccess]=useState(false);



useEffect(()=>{

const loadPlans=async()=>{

try{

const token=localStorage.getItem("token");

const res=await fetch(
"https://api.alphabothq.com/tv/plans",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();


if(data.success){

setPlans(data.plans);
setProviders([...new Set(data.plans.map(item=>item.provider))]);
setProvider(data.plans[0]?.provider || "");

}


}catch(error){

console.log(error);

}

};


loadPlans();

},[]);





const subscribeTV=async()=>{

try{

setLoading(true);

setMessage("Processing...");


const token=localStorage.getItem("token");


const res=await fetch(
"https://api.alphabothq.com/tv/subscribe",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`,
"Idempotency-Key":
typeof crypto !== "undefined" && crypto.randomUUID
? crypto.randomUUID()
: `${Date.now()}-${Math.random()}`
},

body:JSON.stringify({

provider,
smartCardNumber,
variation_id:tvPackage,
amount:Number(amount),
pin

})

}
);



const data=await res.json();



if(res.ok){

setMessage(`✅ ${data.message}`);
setShowSuccess(true);
setTimeout(()=>setShowSuccess(false),3000);

}else{

setMessage(`❌ ${data.message}`);

}



}catch(error){

setMessage("❌ Connection error");


}finally{

setLoading(false);

}

};





return(
<>
<SuccessCelebration
show={showSuccess}
message="🎉 TV subscription successful!"
/>


<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto space-y-5">



<h1 className="text-3xl font-black">
📺 TV Subscription
</h1>


<p className="text-zinc-400">
Renew your entertainment package instantly
</p>




<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-5">



<div>

<p className="text-xs text-zinc-500 mb-2">
TV Provider
</p>


<select
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
value={provider}

onChange={(e)=>{

setProvider(e.target.value);
setTvPackage("");
setAmount("");

}}

>


{providers.map((item)=>(
<option key={item} value={item}>
{item.toUpperCase()}
</option>
))}




</select>


</div>





<div>

<p className="text-xs text-zinc-500 mb-2">
Smart Card Number
</p>


<input

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"

placeholder="Enter IUC number"

value={smartCardNumber}

onChange={(e)=>setSmartCardNumber(e.target.value)}

/>


</div>






<div>

<p className="text-xs text-zinc-500 mb-2">
Choose Package
</p>


<select

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"

value={tvPackage}

onChange={(e)=>{


const selected=plans.find(
p=>p.variation_id===e.target.value
);


setTvPackage(e.target.value);


if(selected){

setAmount(selected.sellingPrice);

}


}}

>


<option value="">
Select Package
</option>



{

plans
.filter(
p=>p.provider===provider
)
.map(plan=>(


<option
key={plan.variation_id}
value={plan.variation_id}
>

{plan.name} - ₦{Number(plan.sellingPrice).toLocaleString("en-NG")}

</option>


))

}



</select>


</div>






<input

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"

placeholder="Amount"

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

/>






<button
  type="button"
  onClick={()=>router.push("/enter-pin?return=/tv")}
  className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3 text-left active:scale-[0.98] active:opacity-70 transition-transform duration-100"
>
  {pin ? "••••" : "Enter 4 digit PIN"} →
</button>






<button

onClick={subscribeTV}

disabled={loading}

className="w-full bg-white text-black rounded-xl py-3 font-bold disabled:bg-zinc-700 disabled:text-zinc-400 active:scale-95 transition"

>


{

loading
?"Processing..."
:"Subscribe TV"

}


</button>




<p className="text-center text-sm text-zinc-400">

{message}

</p>



</div>





<Link

href="/dashboard"

className="block text-center text-zinc-400 mt-6"

>

← Dashboard

</Link>



</div>


</main>

</>
);

}
