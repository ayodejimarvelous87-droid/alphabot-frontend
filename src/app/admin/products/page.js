"use client";

import {useEffect,useState} from "react";

export default function AdminProducts(){

const [plans,setPlans]=useState([]);
const [open,setOpen]=useState({});
const [message,setMessage]=useState("");
const [saving,setSaving]=useState(false);


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



const savePlan=async(plan)=>{

const id=
plan.variation_id ||
plan.id ||
plan.plan_id ||
`${plan.provider}-${plan.name}`;


const price=document.getElementById(
`price-${id}`
).value;


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

network:plan.network,

name:plan.name,

providerPrice:Number(plan.price),

sellingPrice:Number(price),

active:
document.getElementById(`active-${id}`).checked

})

}

);


setMessage(
res.ok ? "✅ Saved":"❌ Failed"
);


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

const id =
plan.variation_id ||
plan.id ||
plan.plan_id ||
`${provider}-${index}`;

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

</div>
)

})

}

</div>



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
