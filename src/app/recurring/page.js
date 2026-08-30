"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const API="https://api.alphabothq.com";

export default function RecurringPage(){

const [payments,setPayments]=useState([]);
const [service,setService]=useState("data");

const [dataPlans,setDataPlans]=useState([]);
const [planSearch,setPlanSearch]=useState("");
const [selectedPlan,setSelectedPlan]=useState(null);

const [amount,setAmount]=useState("");
const [targetPhone,setTargetPhone]=useState("");
const [frequency,setFrequency]=useState("daily");
const [loading,setLoading]=useState(false);
const [message,setMessage]=useState("");

const user =
typeof window !== "undefined"
? JSON.parse(localStorage.getItem("user") || "{}")
: {};

const token =
typeof window !== "undefined"
? localStorage.getItem("token")
: null;


const loadDataPlans=async()=>{

try{

const res=await fetch(
`${API}/data/plans`
);

const data=await res.json();

const plans=[];

Object.keys(data?.networks || {}).forEach(network=>{

Object.keys(data.networks[network] || {}).forEach(category=>{

(data.networks[network][category] || []).forEach(plan=>{

plans.push({
...plan,
network:
plan.network ||
plan.service_name ||
network
});

});

});

});

setDataPlans(plans);

}catch(error){

console.log("Data plans load error:",error);

}

};


const loadPayments=async()=>{

try{

if(!user.phone) return;

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

loadPayments();
loadDataPlans();

},[]);



const createPayment=async()=>{

if(!targetPhone){

setMessage("❌ Enter phone number");
return;

}

if(service === "data" && !selectedPlan){

setMessage("❌ Select a data plan");
return;

}

if(service === "airtime" && !amount){

setMessage("❌ Enter airtime amount");
return;

}


try{

setLoading(true);
setMessage("Processing...");


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

provider:
service === "data"
  ? selectedPlan?.provider || ""
  : "",

variationId:
service === "data"
  ? (
      selectedPlan?.variation_id ||
      selectedPlan?.providerPlanId ||
      selectedPlan?.plan_id ||
      selectedPlan?.id ||
      ""
    )
  : "",

network:
service === "data"
  ? (
      selectedPlan?.network ||
      selectedPlan?.service_name ||
      ""
    )
  : "",

planName:
service === "data"
  ? (
      selectedPlan?.data_plan ||
      selectedPlan?.name ||
      ""
    )
  : "",

amount:
service === "data"
  ? Number(
      selectedPlan?.display_price ||
      selectedPlan?.sellingPrice ||
      selectedPlan?.price ||
      selectedPlan?.reseller_price ||
      0
    )
  : Number(amount),

frequency

})
}
);


const data=await res.json();


if(!res.ok){

setMessage("❌ "+(data.message || "Failed"));

return;

}


setMessage("✅ Recurring payment activated");

setAmount("");

loadPayments();


}catch(error){

setMessage("❌ Connection error");

}finally{

setLoading(false);

}

};



const cancelPayment=async(id)=>{

try{

const res = await fetch(
`${API}/recurring/${id}`,
{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data = await res.json();

if(!res.ok){

throw new Error(
data?.message || "Failed to cancel payment"
);

}

setPayments(prev =>
prev.filter(item => item._id !== id)
);

setMessage("✅ Payment cancelled");


}catch(error){

console.log(
"Cancel payment error:",
error
);

setMessage(
`❌ ${error.message || "Error cancelling payment"}`
);

}

};



const filteredDataPlans = dataPlans.filter((plan)=>{
const search = planSearch.trim().toLowerCase();

if(!search) return true;

return [
plan.name,
plan.data_plan,
plan.network,
plan.provider,
plan.variation_id,
plan.providerPlanId,
plan.plan_id
].some(value =>
String(value || "").toLowerCase().includes(search)
);
});


return(

<main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto space-y-5">


<h1 className="text-3xl font-black">
🔁 Recurring Payments
</h1>


<p className="text-zinc-500 dark:text-zinc-400">
Automate your airtime and data subscriptions
</p>



<div className="bg-white border border-zinc-200 dark:bg-[#18181B] dark:border-zinc-800 rounded-3xl p-6 space-y-4">


<div>

<p className="text-xs text-zinc-500 mb-2">
Service
</p>

<select
className="w-full bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-700 dark:text-white rounded-xl p-3"
value={service}
onChange={(e)=>{

const value=e.target.value;

setService(value);

setSelectedPlan(null);

if(value === "data"){
setAmount("");
}

}}
>

<option value="data">
🌐 Data
</option>

<option value="airtime">
📱 Airtime
</option>

</select>

</div>



{service === "data" && (
<div className="space-y-3">

<input
type="search"
placeholder="🔎 Search data plans..."
value={planSearch}
onChange={(e)=>setPlanSearch(e.target.value)}
className="w-full bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-700 dark:text-white rounded-xl p-3 outline-none focus:border-yellow-400"
/>

<p className="text-xs text-zinc-500">
{filteredDataPlans.length} plan{filteredDataPlans.length === 1 ? "" : "s"} found
</p>


<select
className="w-full bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-700 dark:text-white rounded-xl p-3"
value={selectedPlan ? (
selectedPlan.variation_id ||
selectedPlan.providerPlanId ||
selectedPlan.plan_id ||
selectedPlan.id ||
""
) : ""}
onChange={(e)=>{

const value=e.target.value;

const plan=dataPlans.find(item=>
String(
item.variation_id ||
item.providerPlanId ||
item.plan_id ||
item.id ||
""
) === String(value)
);

setSelectedPlan(plan || null);

}}
>

<option value="">
Select data plan
</option>

{filteredDataPlans.map((plan,index)=>{

const id=
plan.variation_id ||
plan.providerPlanId ||
plan.plan_id ||
plan.id;

const name=
plan.data_plan ||
plan.name ||
"Data plan";

const network=
plan.network ||
plan.service_name ||
"";

const price=
plan.display_price ||
plan.sellingPrice ||
plan.price ||
plan.reseller_price ||
0;

const validity=
plan.validity ||
(
plan.day
? `${plan.day} Days`
: ""
);

return(

<option
key={`${id}-${index}`}
value={id}
>

{network} {name}
{validity ? ` • ${validity}` : ""}
 • ₦{Number(price).toLocaleString()}

</option>

);

})}

</select>

</div>
)}

<input
className="w-full bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-700 dark:text-white rounded-xl p-3"
placeholder="Phone number"
type="tel"
value={targetPhone}
onChange={(e)=>setTargetPhone(e.target.value)}
/>



</div>

{service === "airtime" && (

<input
className="w-full bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-700 dark:text-white rounded-xl p-3"
placeholder="Amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

)}

{service === "data" && selectedPlan && (

<div className="bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-700 dark:text-white rounded-xl p-3">

<p className="font-bold">
{selectedPlan.network ||
 selectedPlan.service_name ||
"Data"}{" "}
{selectedPlan.data_plan ||
 selectedPlan.name ||
"Data plan"}
</p>

<p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">

₦{Number(
selectedPlan.display_price ||
selectedPlan.sellingPrice ||
selectedPlan.price ||
selectedPlan.reseller_price ||
0
).toLocaleString()}

{selectedPlan.validity
? ` • ${selectedPlan.validity}`
: ""}

</p>

</div>

)}



<select
className="w-full bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-700 dark:text-white rounded-xl p-3"
value={frequency}
onChange={(e)=>setFrequency(e.target.value)}
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
className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>

{loading ? "Activating..." : "Activate Schedule"}

</button>


<p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
{message}
</p>






<h2 className="text-xl font-bold">
Active Payments
</h2>



<div className="space-y-3">

{

payments.map(item=>(

<div
key={item._id}
className="bg-white border border-zinc-200 dark:bg-[#18181B] dark:border-zinc-800 rounded-2xl p-4"
>

<p className="font-bold">
{item.service === "data" ? "🌐 DATA" : "📱 AIRTIME"}
</p>

{item.service === "data" ? (

<div className="mt-2 space-y-1">

<p className="text-zinc-700 dark:text-zinc-300">
Data subscription
</p>

<p className="text-zinc-500 dark:text-zinc-400">
₦{Number(item.amount).toLocaleString()} • {item.frequency}
</p>

</div>

) : (

<div className="mt-2 space-y-1">

<p className="text-zinc-700 dark:text-zinc-300">
Airtime subscription
</p>

<p className="text-zinc-500 dark:text-zinc-400">
₦{Number(item.amount).toLocaleString()} • {item.frequency}
</p>

</div>

)}


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



<Link
href="/dashboard"
className="block text-center text-yellow-500 dark:text-yellow-400 mt-6"
>
← Dashboard
</Link>


</div>


<BottomNav />

</main>

);

}
