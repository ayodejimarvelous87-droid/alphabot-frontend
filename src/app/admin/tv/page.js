"use client";

import {useEffect,useState} from "react";

export default function AdminTV(){

const [plans,setPlans]=useState([]);
const [message,setMessage]=useState("");



const loadPlans=async()=>{

const res=await fetch(
"https://api.alphabothq.com/admin/tv-plans",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
}
}
);

const data=await res.json();

setPlans(data);

};



useEffect(()=>{

loadPlans();

},[]);




const savePlan=async(plan)=>{

const res=await fetch(

`https://api.alphabothq.com/admin/tv-plans/${plan._id}`,

{
method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
},

body:JSON.stringify({

providerPrice:Number(plan.providerPrice),

  sellingPrice:Number(plan.sellingPrice),

active:plan.active

})

}

);


setMessage(
res.ok
?"✅ TV plan updated"
:"❌ Failed"
);

};



return(

<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
📺 TV Plan Management
</h1>

<p>{message}</p>


{Array.isArray(plans) && plans.map((plan,index)=>(

<div
key={plan._id || index}
className="border rounded-xl p-4 mt-4"
>

<h2 className="font-bold">
{plan.name}
</h2>

<p>
Provider: {plan.provider}
</p>

<p>
Provider Cost: ₦{plan.providerPrice}
</p>

<p className="mt-2">
Profit: ₦{
Number(plan.sellingPrice||0)-
Number(plan.providerPrice||0)
}
</p>


<input
className="bg-[#050505] text-white border border-zinc-800 rounded-xl p-2 mt-2 w-full"
type="number"
value={plan.sellingPrice}
onChange={(e)=>{

const copy=[...plans];

copy[index].sellingPrice=
Number(e.target.value);

setPlans(copy);

}}
/>


<label className="block mt-3">

<input
type="checkbox"
checked={plan.active}
onChange={(e)=>{

const copy=[...plans];

copy[index].active=
e.target.checked;

setPlans(copy);

}}
/>

 Active

</label>


<button
className="border rounded px-4 py-2 mt-3"
onClick={()=>savePlan(plan)}
>
Save
</button>

</div>

))}

</div>

);

}
