"use client";

import SuccessCelebration from "@/components/success-celebration";

import { useEffect, useState } from "react";
import {useSearchParams, useRouter} from "next/navigation";
import Link from "next/link";
import { authenticateWithBiometric } from "@/lib/biometric";
import PhoneInput from "@/components/PhoneInput";
import ServiceLayout from "@/components/ServiceLayout";

export default function Page(){

const router=useRouter();

  const [showSuccess, setShowSuccess] = useState(false);
const searchParams = useSearchParams();

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("");
const [category,setCategory]=useState("");
const [plans,setPlans]=useState({});
const [selectedPlan,setSelectedPlan]=useState("");
const [biometricLoading,setBiometricLoading]=useState(false);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
  const [search,setSearch]=useState("");
  const [beneficiaries,setBeneficiaries]=useState([]);
const [purchaseStateRestored,setPurchaseStateRestored]=useState(false);

useEffect(() => {

  const savedState =
    sessionStorage.getItem("alphaBotDataPurchaseState");
  if (savedState) {

    try {

      const state =
        JSON.parse(savedState);

      if (state.phone !== undefined)
        setPhone(state.phone);

      if (state.network !== undefined)
        setNetwork(state.network);

      if (state.category !== undefined)
        setCategory(state.category);

      if (state.selectedPlan !== undefined)
        setSelectedPlan(state.selectedPlan);

      if (state.search !== undefined)
        setSearch(state.search);

    } catch (error) {

      console.log(
        "Unable to restore data purchase state:",
        error.message
      );

    }

  } else {

    const savedPhone =
      searchParams.get("phone");

    if (savedPhone) {
      setPhone(savedPhone);
    }

  }
  const loadBeneficiaries = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user?.phone) return;

      const res = await fetch(
        `https://api.alphabothq.com/beneficiaries/${user.phone}`,
        {
          headers: {
            Authorization:
              "Bearer " +
              localStorage.getItem("token")
          }
        }
      );

      const data = await res.json();

      setBeneficiaries(data);

    } catch (error) {

    }

  };

  loadBeneficiaries();

  setPurchaseStateRestored(true);

}, [searchParams]);


useEffect(()=>{

const loadPlans = async()=>{

try{

const res = await fetch(
"https://api.alphabothq.com/data/plans"
);

const data = await res.json();

const networksData = data.providers || {};

setPlans(networksData);

const firstProvider = Object.keys(networksData)[0];

const savedState =
  sessionStorage.getItem("alphaBotDataPurchaseState");

let restoredState = null;

if(savedState){

  try{

    restoredState = JSON.parse(savedState);

  }catch(error){

    console.log(
      "Unable to read saved data purchase state:",
      error.message
    );

  }

}

const restoredProvider =
  restoredState?.provider ||
  restoredState?.network;

if(
  restoredProvider &&
  networksData[restoredProvider]
){

  setNetwork(restoredProvider);

}else if(firstProvider){

  setNetwork(firstProvider);

}

setCategory("");

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



const networkCategories =
  network &&
  plans[network] &&
  typeof plans[network] === "object"
    ? plans[network]
    : {};

const categories =
  Object.keys(networkCategories);

const categoryPlans =
  category &&
  Array.isArray(networkCategories[category])
    ? networkCategories[category]
    : [];

const dataPlans =
  search.trim()
    ? Object.values(networkCategories).flat()
    : categoryPlans;

const filteredPlans =
  dataPlans.filter(plan => {

    const text = (
      plan.data_plan ||
      plan.name ||
      plan.size ||
      plan.datasize ||
      ""
    ).toLowerCase();

    return text.includes(
      search.toLowerCase()
    );

  });

const buyData = async()=>{


console.log("SELECTED:", selectedPlan);
console.log("PLANS:", dataPlans.slice(0,3));

console.log("SELECTED PLAN:", selectedPlan);
console.log("DATA PLANS COUNT:", dataPlans.length);
console.log("FIRST PLAN:", dataPlans[0]);

const selected = filteredPlans[Number(selectedPlan)];




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

const biometricToken =
localStorage.getItem("biometricToken");


const res = await fetch(

"https://api.alphabothq.com/data/buy",

{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":
`Bearer ${token}`,

"Idempotency-Key":
typeof crypto !== "undefined" && crypto.randomUUID
? crypto.randomUUID()
: `${Date.now()}-${Math.random()}`

},

body:JSON.stringify({
phone,
network:
  selected.network ||
  selected.service_name ||
  "",
plan:selected.data_plan || selected.name || selected.datasize,
amount:Number(selected.display_price || selected.reseller_price || selected.price),
biometricToken: biometricToken || undefined,
provider:selected.provider,
variation_id:
selected.variation_id
})

}

);


const result =
await res.json();



if(res.ok){

localStorage.removeItem("biometricToken");

sessionStorage.removeItem(
  "alphaBotDataPurchaseState"
);

sessionStorage.setItem(
  "alphaBotTransactionResult",
  JSON.stringify({
    ...result,
    status:
      result.status ||
      result.transaction?.status ||
      "success",
    returnPath: "/data"
  })
);

router.push("/transaction-result");

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

localStorage.removeItem("biometricToken");

setLoading(false);

}


};



return(
<>
<SuccessCelebration
show={showSuccess}
message="🎉 Data purchase completed successfully!"
/>

<main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-white px-4 py-5 pb-24">

<div className="max-w-md mx-auto space-y-4">

{/* HEADER */}

<div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-[#111113] dark:to-black p-5">

<div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

<div className="relative flex items-center justify-between">

<div>

<p className="text-[9px] font-black tracking-[0.22em] text-yellow-400 uppercase">
AlphaBot
</p>

<h1 className="text-2xl font-black mt-1">
Data
</h1>

<p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
Fast internet bundles with instant delivery
</p>

</div>

<div className="w-11 h-11 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-xl">
🌐
</div>

</div>

</div>





{/* PURCHASE FORM */}

<div className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#111113] p-4 space-y-4">


{/* NETWORK */}

<div>

<div className="flex items-center justify-between mb-2">

<p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
Network
</p>

<span className="text-[9px] text-zinc-500 dark:text-zinc-600">
Select provider
</span>

</div>

<div className="grid grid-cols-4 gap-2">

{networks.map((item)=>(
<button
key={item}
type="button"
onClick={()=>{
setNetwork(item);
setSelectedPlan("");
setCategory("");
}}
className={`rounded-2xl border px-2 py-3 text-[10px] font-black transition active:scale-95 ${
network === item
? "border-yellow-400 bg-yellow-400 text-black shadow-lg shadow-yellow-400/10"
: "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#080809] dark:text-zinc-400 dark:hover:border-zinc-700"
}`}
>
{item}
</button>
))}

</div>

</div>


{/* SEARCH */}

<div>

<div className="flex items-center justify-between mb-2">

<p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
Search Plans
</p>

<span className="text-[9px] text-zinc-500 dark:text-zinc-600">
Find a bundle
</span>

</div>

<div className="relative">

<span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
🔎
</span>

<input
type="text"
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search data plans..."
className="w-full pl-10 pr-4 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#080809] dark:border-zinc-800 dark:text-white outline-none focus:border-yellow-400/60 transition"
/>

</div>

</div>


{/* CATEGORY */}

<div>

<div className="flex items-center justify-between mb-2">

<p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
Category
</p>

<span className="text-[9px] text-zinc-500 dark:text-zinc-600">
Choose bundle type
</span>

</div>

<select
className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#080809] dark:border-zinc-800 dark:text-white outline-none focus:border-yellow-400/60 transition"
value={category}
onChange={(e)=>{
setCategory(e.target.value);
setSelectedPlan("");
}}
>

<option value="">
Select Category
</option>

{[
...categories.filter(name=>name==="ALPHA"),
...categories.filter(name=>name!=="ALPHA")
].map(name=>(
<option key={name} value={name}>
{name}
</option>
))}

</select>

</div>


{/* DATA PLAN */}

<div>

<div className="flex items-center justify-between mb-2">

<p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
Data Plan
</p>

<span className="text-[9px] text-zinc-500 dark:text-zinc-600">
Select bundle
</span>

</div>

<select
className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#080809] dark:border-zinc-800 dark:text-white outline-none focus:border-yellow-400/60 transition"
value={selectedPlan}
onChange={(e)=>setSelectedPlan(e.target.value)}
>

<option value="">
Select Data Bundle
</option>

{filteredPlans.map((plan,index)=>(
<option
key={`${plan.network}-${plan.name}-${plan.id || plan.plan_id || index}`}
value={index}
>

{plan.data_plan || plan.name}
{" - ₦"}
{plan.display_price || plan.reseller_price || plan.price}

{plan.validity
? ` (${plan.validity})`
: plan.day
? ` (${plan.day} Days)`
: ""}

</option>
))}

</select>

</div>


{/* RECEIVER */}

<div>

<div className="flex items-center justify-between mb-2">

<p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
Receiver
</p>

<span className="text-[9px] text-zinc-500 dark:text-zinc-600">
Phone number
</span>

</div>

<div className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#080809] p-1">

<PhoneInput
value={phone}
onChange={setPhone}
beneficiaries={beneficiaries}
service="data"
/>

</div>

</div>


{/* PIN */}

<div>

<p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500 mb-2">
Transaction PIN
</p>

<button
type="button"
onClick={()=>{
sessionStorage.setItem(
"alphaBotDataPurchaseState",
JSON.stringify({
phone,
network,
category,
selectedPlan,
search
})
);

router.push("/enter-pin?return=/data&service=data");
}}
className="w-full flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#080809] px-4 py-4 text-left active:scale-[0.98] transition"
>

<div>

<p className="text-sm font-bold">
Enter transaction PIN
</p>

<p className="text-[9px] text-zinc-500 mt-0.5">
Required before purchase
</p>

</div>

<span className="text-zinc-500 dark:text-zinc-500 text-lg">
→
</span>

</button>

</div>

</div>


{/* FINGERPRINT */}

<button
onClick={async()=>{
try{

setBiometricLoading(true);
setMessage("Touch your fingerprint...");

await authenticateWithBiometric();

setMessage("Fingerprint verified.");

await buyData();

}catch(error){

localStorage.removeItem("biometricToken");
setMessage("❌ " + error.message);

}finally{

setBiometricLoading(false);

}
}}
disabled={loading || biometricLoading}
className="w-full bg-zinc-100 border border-zinc-300 text-zinc-950 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white py-4 rounded-2xl font-black text-lg active:scale-95 transition disabled:opacity-50"
>

{biometricLoading
? "Touch fingerprint..."
: loading
? "Processing..."
: "👆 Use Fingerprint"}

</button>


{/* STATUS */}

{message && (
<div className="rounded-2xl border border-zinc-200 bg-white p-4 text-center text-sm text-zinc-700 dark:border-zinc-800 dark:bg-[#111113] dark:text-white">
{message}
</div>
)}


<div className="text-center text-[10px] text-zinc-500 dark:text-zinc-600">
Secure payment • Instant data delivery
</div>


<Link
href="/dashboard"
className="block text-center text-zinc-500 dark:text-zinc-400 mt-5"
>
← Dashboard
</Link>

</div>

</main>
</>
);


}
