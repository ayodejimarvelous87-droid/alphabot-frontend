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
  categoryPlans;

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
    status: result.status || "success",
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

<ServiceLayout
icon="🌐"
title="Buy Data"
subtitle="Fast internet bundles with instant delivery"
message={message}
setMessage={setMessage}
>

<div className="mb-2">
<input
type="text"
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search data plans..."
className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
/>
</div>

<div className="max-w-md mx-auto space-y-2 scale-[0.88] origin-top pb-4">






<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-3 space-y-2">


<div>

<p className="text-xs text-zinc-500 uppercase">
Network
</p>

<select
className="w-full mt-2 p-3 rounded-xl bg-[#050505] border border-zinc-800 text-white"
value={network}
onChange={(e)=>{

const selectedNetwork=e.target.value;

setNetwork(selectedNetwork);
setSelectedPlan("");
setCategory("");

}}
>

{networks.map(net=>(

<option key={net} value={net}>
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
className="w-full mt-2 p-3 rounded-xl bg-[#050505] border border-zinc-800 text-white"
value={category}
onChange={(e)=>{

setCategory(e.target.value);
setSelectedPlan("");

}}
>

<option value="">
Select Category
</option>

{categories.map(name=>(

<option key={name} value={name}>
{name}
</option>

))}

</select>

</div>


<div>

<p className="text-xs text-zinc-500 uppercase">
Data Plan
</p>


<select
className="w-full mt-2 p-3 rounded-xl bg-[#050505] border border-zinc-800 text-white"
value={selectedPlan}
onChange={(e)=>setSelectedPlan(e.target.value)}
>

<option value="">
Select Bundle
</option>

{filteredPlans.map((plan,index)=>(

<option
key={`${plan.network}-${plan.name}-${plan.id || plan.plan_id || index}`}
value={index}
>

{plan.data_plan || plan.name}

- ₦{plan.display_price ||
plan.reseller_price ||
plan.price}

{plan.validity
  ? `(${plan.validity})`
  : plan.day
    ? `(${plan.day} Days)`
    : ""}

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


<button
  type="button"
  onClick={() => {

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
  className="w-full mt-3 p-3 rounded-xl bg-[#050505] border border-zinc-800 text-white text-left active:scale-[0.98] active:opacity-70 transition-transform duration-100"
>
  Enter 4 digit PIN →
</button>


</div>





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

className="w-full bg-zinc-900 border border-zinc-700 text-white py-3 rounded-2xl font-black text-lg active:scale-95 transition"

>
{biometricLoading ? "Touch fingerprint..." : "👆 Use Fingerprint"}

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
</>

);


}