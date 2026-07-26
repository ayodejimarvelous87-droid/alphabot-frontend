"use client";

import { useEffect, useState } from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import ServiceLayout from "@/components/ServiceLayout";

export default function Page(){
const searchParams = useSearchParams();

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("");
const [category,setCategory]=useState("");
const [plans,setPlans]=useState({});
const [selectedPlan,setSelectedPlan]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
  const [beneficiaries,setBeneficiaries]=useState([]);

useEffect(()=>{
const savedPhone = searchParams.get("phone");

if(savedPhone){
setPhone(savedPhone);
}

const loadBeneficiaries = async()=>{
try{
const user = JSON.parse(localStorage.getItem("user"));
if(!user?.phone) return;

const res = await fetch(
`https://alphabot-1.onrender.com/beneficiaries/${user.phone}`,
{
headers:{
Authorization:"Bearer "+localStorage.getItem("token")
}
}
);

const data = await res.json();
setBeneficiaries(data);

}catch(error){
console.log(error);
}
};

loadBeneficiaries();

},[]);


useEffect(()=>{

const loadPlans = async()=>{

try{

const res = await fetch(
"https://alphabot-1.onrender.com/data/plans"
);

const data = await res.json();
console.log("DATA_PLANS", data);
console.log("NETWORK KEYS", Object.keys(data.networks || {}));
console.log("MTN CATEGORIES", Object.keys(data.networks?.MTN || {}));
console.log("MTN AWOOF COUNT", data.networks?.MTN?.Awoof?.length);

const networks = data.networks || {};
console.log("FRONTEND RECEIVED NETWORKS:", Object.keys(networks));
console.log("MTN CATEGORIES:", Object.keys(networks.MTN || {}));
console.log("MTN Awoof CHECK:", networks.MTN?.Awoof);

setPlans(networks);
console.log("FRONTEND NETWORK KEYS:", Object.keys(networks)); console.log("FRONTEND MTN CATS:", Object.keys(networks.MTN || {}));

const firstNetwork = Object.keys(networks)[0];

if(firstNetwork){

setNetwork(firstNetwork);

const firstCategory =
Object.keys(networks[firstNetwork])
.find(cat => networks[firstNetwork][cat].length > 0);

if(firstCategory){
setCategory("All Plans");
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



const networks = Object.keys(plans);



const actualNetwork = network;

const categories =
actualNetwork
? [
"All Plans",
...Object.keys(plans[actualNetwork]).filter(cat=>cat !== "All Plans")
]
: [];

console.log("CLICK CATEGORY:", category, Object.keys(plans[actualNetwork] || {}));
console.log("SELECTED CATEGORY:", category);
console.log("AVAILABLE CATEGORIES:", Object.keys(plans[actualNetwork] || {}));

const dataPlans =
actualNetwork
?
(category === "All Plans"
? Object.values(plans[actualNetwork]).flat()
: plans[actualNetwork]?.[category] || [])
.sort((a,b)=>{

const getSize = plan => {

const text = (
plan.size ||
plan.data_plan ||
plan.name ||
""
).toUpperCase();

const value = parseFloat(text) || 0;

if(text.includes("TB")) return value * 1024;

if(text.includes("GB")) return value;

if(text.includes("MB")) return value / 1024;

return value;

};

return getSize(a) - getSize(b);

})
:
[];





const buyData = async()=>{


const selected =
dataPlans.find(
item =>
(item.variation_id || item.package_id || item.id || item.plan.id || index) == selectedPlan
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
plan:selected.data_plan || selected.name,
amount:Number(selected.display_price || selected.reseller_price || selected.price),
pin,
provider:selected.provider,
variation_id:selected.variation_id,
package_id:selected.package_id
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

<ServiceLayout
icon="🌐"
title="Buy Data"
subtitle="Fast internet bundles with instant delivery"
message={message}
>

<div className="max-w-md mx-auto space-y-3">






<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-3 space-y-2">


<div>

<p className="text-xs text-zinc-500 uppercase">
Network
</p>

<select
className="w-full mt-2 p-4 rounded-xl bg-[#050505] border border-zinc-800 text-white"
value={network}
onChange={(e)=>{

const selectedNetwork=e.target.value;

setNetwork(selectedNetwork);
setSelectedPlan("");
setCategory(selectedNetwork ? "All Plans" : "");

}}
>

{networks.map(net=>(

<option key={net}>
{net}
</option>

))}

</select>

</div>




<div>

<p className="text-xs text-zinc-500 uppercase">
Category
</p>

<select
className="w-full mt-2 p-4 rounded-xl bg-[#050505] border border-zinc-800 text-white"
value={category}
onChange={(e)=>{

setCategory(e.target.value);
setSelectedPlan("");

}}
>

{categories.map(cat=>(

<option key={cat}>

{cat}

({cat==="All Plans"
?
Object.values(plans[network] || {}).flat().length
:
(plans[network]?.[cat]?.length || 0)
})

</option>

))}

</select>

</div>




<div>

<p className="text-xs text-zinc-500 uppercase">
Data Plan
</p>


<select
className="w-full mt-2 p-4 rounded-xl bg-[#050505] border border-zinc-800 text-white"
value={selectedPlan}
onChange={(e)=>setSelectedPlan(e.target.value)}
>

<option value="">
Select Bundle
</option>


{dataPlans.map((plan,index)=>(

<option
key={
plan.variation_id ||
plan.package_id ||
plan.id || index
}
value={
plan.variation_id ||
plan.package_id ||
plan.id || index
}
>

{plan.data_plan || plan.name}

- ₦{plan.display_price ||
plan.reseller_price ||
plan.price}

({plan.validity || plan.day+" Days"})

</option>

))}

</select>

</div>


</div>





<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-3">

<h2 className="font-bold mb-3">
📱 Receiver
</h2>


<PhoneInput
value={phone}
onChange={setPhone}
beneficiaries={beneficiaries}
service="data"
/>


</div>





<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-3">


<p className="text-xs text-zinc-500 uppercase">
Transaction PIN
</p>


<input

className="w-full mt-3 p-4 rounded-xl bg-[#050505] border border-zinc-800 text-white"

placeholder="Enter 4 digit PIN"

type="password"

maxLength="4"

value={pin}

onChange={(e)=>setPin(e.target.value)}

/>


</div>





<button

onClick={buyData}

disabled={loading}

className="w-full bg-white text-black py-3 rounded-2xl font-black text-lg"

>

{loading ? "Processing..." : "⚡ Buy Data"}

</button>





{message && (

<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-3 text-center">

{message}

</div>

)}





<Link

href="/dashboard"

className="block text-center text-zinc-400 mt-3"

>

← Dashboard

</Link>



</div>

</ServiceLayout>

);


}
