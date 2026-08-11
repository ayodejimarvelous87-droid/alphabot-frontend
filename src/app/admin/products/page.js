"use client";

import {useEffect,useState} from "react";

export default function AdminProducts(){

const [plans,setPlans]=useState([]);
const [open,setOpen]=useState({});
const [message,setMessage]=useState("");
const [saving,setSaving]=useState(false);
const [savingId,setSavingId]=useState(null);


const loadPlans=async()=>{

const res=await fetch(
"https://alphabot-1.onrender.com/data/plans"
);

const data=await res.json();

let all=[];

if(data.networks){

Object.keys(data.networks).forEach(network=>{

Object.keys(data.networks[network]).forEach(category=>{

data.networks[network][category].forEach(plan=>{

all.push(plan);

});

});

});

}

setPlans(all);

};



useEffect(()=>{
loadPlans();
},[]);



const grouped={};

plans.forEach(plan=>{

const provider=plan.provider || "Unknown";

if(!grouped[provider]){
grouped[provider]=[];
}

grouped[provider].push(plan);

});





const saveAll = async()=>{

setSaving(true);

try{

for(const plan of plans){

const rawId =
plan.providerPlanId ||
plan.provider_plan_id ||
plan.variation_id ||
plan.id ||
plan.plan_id;

const id =
`${String(plan.provider || "").toLowerCase()}:${String(
  plan.network || plan.service_name || ""
).trim().toUpperCase()}:${String(rawId)}`;

const price =
document.getElementById(`price-${id}`)?.value;

if(!price) continue;


await fetch(
`https://alphabot-1.onrender.com/admin/data-prices/${id}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
},
body:JSON.stringify({

provider:plan.provider,
network:plan.network || plan.service_name,
name:plan.name || plan.data_plan,
providerPrice:Number(plan.price),
sellingPrice:Number(price),
active:
document.getElementById(`active-${id}`)?.checked

})
}
);

}

setMessage("✅ All plans saved");

}catch(error){

console.log(error);
setMessage("❌ Save failed");

}

setSaving(false);

};


const savePlan=async(plan)=>{

const rawId =
plan.providerPlanId ||
plan.provider_plan_id ||
plan.variation_id ||
plan.id ||
plan.plan_id;

const id =
`${String(plan.provider || "").toLowerCase()}:${String(
  plan.network || plan.service_name || ""
).trim().toUpperCase()}:${String(rawId)}`;

if(savingId === id){
return;
}

setSavingId(id);

try{

const price =
document.getElementById(`price-${id}`)?.value;

const active =
document.getElementById(`active-${id}`)?.checked;

if(!price){
setMessage("❌ Enter a selling price");
return;
}

const res=await fetch(

`https://alphabot-1.onrender.com/admin/data-prices/${id}`,

{
method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
},

body:JSON.stringify({

provider:plan.provider,

network:
plan.network ||
plan.service_name,

name:
plan.name ||
plan.data_plan,

providerPlanId:
String(rawId),

providerPrice:
Number(
  plan.costPrice ??
  plan.providerPrice ??
  plan.price
),

sellingPrice:
Number(price),

active

})

}

);

setMessage(
res.ok
? "✅ Plan saved"
: "❌ Failed to save plan"
);

}catch(error){

console.log(error);

setMessage("❌ Save failed");

}finally{

setSavingId(null);

}

};


return(

<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
⚙️ Service Management
</h1>

<p>
{message}
</p>


{
Object.keys(grouped).map(provider=>(


<div key={provider}
className="mt-6">

<button
className="font-bold text-xl"
onClick={()=>setOpen({
...open,
[provider]:!open[provider]
})}
>
{open[provider] ? "▼":"▶"} {provider}
</button>

{
open[provider] &&

grouped[provider].map((plan,index)=>{

const rawId =
plan.providerPlanId ||
plan.provider_plan_id ||
plan.variation_id ||
plan.id ||
plan.plan_id;

const id =
`${String(plan.provider || provider || "").toLowerCase()}:${String(
  plan.network || plan.service_name || ""
).trim().toUpperCase()}:${String(rawId)}`;

return(
<div
key={id}
className="border border-zinc-800 p-4 mt-3 rounded"
>

<h2 className="font-bold">
{plan.name || plan.data_plan}
</h2>

<p>
Network: {plan.network || plan.service_name}
</p>

<p>
Provider cost: ₦{plan.price}
</p>

<label>
<input
id={`active-${id}`}
type="checkbox"
defaultChecked={true}
/>
Active
</label>

<input
id={`price-${id}`}
type="number"
defaultValue={plan.display_price || plan.price}
className="border border-zinc-800 p-2 mt-2"
/>

<button
onClick={()=>savePlan(plan)}
disabled={savingId === id}
className="block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50"
>
{savingId === id ? "SAVING..." : "💾 SAVE"}
</button>

</div>
)

})

}

</div>




))

}








<div className="sticky bottom-4 mt-8">

<button
onClick={saveAll}
disabled={saving}
className="w-full bg-green-600 text-white py-3 rounded-xl font-bold disabled:opacity-50"
>

{saving ? "SAVING..." : "SAVE ALL"}

</button>

</div>
</div>

);

}
