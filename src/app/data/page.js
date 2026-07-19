"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";

export default function Page(){

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("");
const [category,setCategory]=useState("");
const [plans,setPlans]=useState({});
const [selectedPlan,setSelectedPlan]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);


useEffect(()=>{

const loadPlans = async()=>{

try{

const res = await fetch(
"https://alphabot-1.onrender.com/data/plans"
);

const data = await res.json();
console.log("DATA_PLANS", data);

const networks = data.networks || {};

setPlans(networks);

const firstNetwork = Object.keys(networks)[0];

if(firstNetwork){

setNetwork(firstNetwork);

const firstCategory =
Object.keys(networks[firstNetwork])
.find(cat => networks[firstNetwork][cat].length > 0);

if(firstCategory){
setCategory(firstCategory);
}

}

}catch(error){

console.log(
"Plans error:",
error.message
);

}

};


loadPlans();

},[]);



const networks =
Object.keys(plans);



const categories =
plans[network]
?
Object.keys(plans[network])
:
[];



const dataPlans =
console.log("NETWORKS", networks);
console.log("CURRENT NETWORK", network);
console.log("CATEGORIES", categories);
console.log("DATA PLANS", dataPlans);
plans[network]?.[category]
?
plans[network][category]
:
[];




const buyData = async()=>{


const selected =
dataPlans.find(
item=>item.variation_id == selectedPlan
);


if(!selected){

setMessage(
"Select a data plan"
);

return;

}


try{

setLoading(true);

setMessage(
"Processing..."
);


const token =
localStorage.getItem("token");


const res = await fetch(

"https://alphabot-1.onrender.com/data/buy",

{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":
`Bearer ${token}`

},

body:JSON.stringify({

phone,

network,

plan:selected.variation_id,

amount:Number(selected.reseller_price),

pin

})

}

);


const result =
await res.json();



if(res.ok){

setMessage(
"✅ Data purchase successful"
);

}else{

setMessage(
"❌ " + result.message
);

}


}catch(error){

setMessage(
"❌ Connection error"
);


}finally{

setLoading(false);

}


};



return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">

<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
🌐 Data
</h1>

<p className="text-zinc-400 mt-2">
Choose your preferred data bundle
</p>



<div className="mt-8 bg-zinc-900 rounded-3xl p-6">


<select
className="w-full p-3 rounded-xl bg-white text-black"
value={network}
onChange={(e)=>{

setNetwork(e.target.value);
setSelectedPlan("");

setCategory(
Object.keys(plans[e.target.value])[0]
);

}}
>

{networks.map(net=>(

<option key={net}>
{net}
</option>

))}

</select>



<select
className="w-full mt-4 p-3 rounded-xl bg-white text-black"
value={category}
onChange={(e)=>{

setCategory(e.target.value);
setSelectedPlan("");

}}

>

{categories.map(cat=>(

<option key={cat} value={cat}>
{cat}
({plans[network][cat].length})
</option>

))}

</select>




<select
className="w-full mt-4 p-3 rounded-xl bg-white text-black"
value={selectedPlan}
onChange={(e)=>setSelectedPlan(e.target.value)}
>


<option value="">
Select Plan
</option>


{dataPlans.map(plan=>(

<option
key={plan.variation_id}
value={plan.variation_id}
>

{plan.data_plan} - ₦{plan.reseller_price}

</option>

))}


</select>



<PhoneInput
value={phone}
onChange={setPhone}
/>



<input
className="w-full mt-4 p-3 rounded-xl bg-white text-black"
placeholder="Transaction PIN"
type="password"
maxLength="4"
value={pin}
onChange={(e)=>setPin(e.target.value)}
/>



<button
onClick={buyData}
disabled={loading}
className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"
>

{loading ? "Processing..." : "Buy Data"}

</button>


<p className="text-center text-sm text-zinc-300 mt-4">
{message}
</p>


</div>


<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-8"
>
← Dashboard
</Link>


</div>

</main>

);

}
