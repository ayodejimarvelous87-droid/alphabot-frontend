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
const [network,setNetwork]=useState("MTN");
const [networkPickerOpen,setNetworkPickerOpen]=useState(false);
const [category,setCategory]=useState("");
const [plans,setPlans]=useState({});
const [selectedPlan,setSelectedPlan]=useState("");
const [biometricLoading,setBiometricLoading]=useState(false);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
  const [search,setSearch]=useState("");
  const [beneficiaries,setBeneficiaries]=useState([]);
const [beneficiaryPickerOpen,setBeneficiaryPickerOpen]=useState(false);
const [purchaseStateRestored,setPurchaseStateRestored]=useState(false);
const [showConfirmation,setShowConfirmation]=useState(false);
const [walletBalance,setWalletBalance]=useState(null);
const [walletBalanceLoading,setWalletBalanceLoading]=useState(false);

useEffect(() => {
  const loadWalletBalance = async () => {
    try {
      setWalletBalanceLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );
      const token = localStorage.getItem("token");

      if (!user?.phone || !token) {
        setWalletBalance(null);
        return;
      }

      const res = await fetch(
        `https://api.alphabothq.com/wallet/balance/${user.phone}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.balance !== undefined) {
        setWalletBalance(Number(data.balance));
      } else {
        setWalletBalance(null);
      }
    } catch (error) {
      console.error("Wallet balance error:", error);
      setWalletBalance(null);
    } finally {
      setWalletBalanceLoading(false);
    }
  };

  loadWalletBalance();
}, []);
const [networkManuallySelected,setNetworkManuallySelected]=useState(false);

const detectNetwork = (value) => {
  let digits = String(value || "").replace(/\D/g, "");

  // Normalize Nigerian numbers so both 0903... and 903...
  // (including +234903... / 234903...) are detected.
  if (digits.startsWith("234")) {
    digits = digits.slice(3);
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (digits.length < 3) {
    return "";
  }

  const prefix = "0" + digits.slice(0, 3);

  const prefixMap = {
    // MTN
    "0703": "MTN",
    "0704": "MTN",
    "0706": "MTN",
    "0707": "MTN",
    "0803": "MTN",
    "0806": "MTN",
    "0810": "MTN",
    "0813": "MTN",
    "0814": "MTN",
    "0816": "MTN",
    "0903": "MTN",
    "0906": "MTN",
    "0913": "MTN",
    "0916": "MTN",

    // Airtel
    "0701": "AIRTEL",
    "0708": "AIRTEL",
    "0802": "AIRTEL",
    "0808": "AIRTEL",
    "0812": "AIRTEL",
    "0901": "AIRTEL",
    "0902": "AIRTEL",
    "0904": "AIRTEL",
    "0907": "AIRTEL",
    "0911": "AIRTEL",
    "0912": "AIRTEL",

    // Glo
    "0705": "GLO",
    "0805": "GLO",
    "0807": "GLO",
    "0811": "GLO",
    "0815": "GLO",
    "0905": "GLO",
    "0915": "GLO",

    // 9mobile
    "0809": "9MOBILE",
    "0817": "9MOBILE",
    "0818": "9MOBILE",
    "0908": "9MOBILE",
    "0909": "9MOBILE",
  };

  return prefixMap[prefix] || "";
};

const networkLogos = {
  MTN: "https://res.cloudinary.com/dzvqoypcs/image/upload/v1732830456/Backend%20Images/New-mtn-logo_2_bvhptv.png",
  AIRTEL: "https://res.cloudinary.com/dzvqoypcs/image/upload/v1732830504/Backend%20Images/airtel-logo-vector-free-11574192407sbukglczfn_2_losc4g.png",
  GLO: "https://res.cloudinary.com/dzvqoypcs/image/upload/v1732830463/Backend%20Images/40dd9197247519_1_mcvlhr.png",
  "9MOBILE": "https://res.cloudinary.com/dzvqoypcs/image/upload/v1732830472/Backend%20Images/344-3443327_9mobile-mtn-glo-airtel-and-9mobile_2_r3eq89.png",
};

useEffect(() => {


  // Fresh Data page starts with an empty recipient.
  // Beneficiary/intentional prefills still come through ?phone=...
  sessionStorage.removeItem("alphaBotDataPurchaseState");

  const savedPhone =
    searchParams.get("phone");

  if (savedPhone) {
    setPhone(savedPhone);
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

const networkKey = Object.keys(plans).find(
  (key) =>
    String(key).trim().toUpperCase() ===
    String(network || "").trim().toUpperCase()
);

const networkCategories =
  networkKey &&
  plans[networkKey] &&
  typeof plans[networkKey] === "object"
    ? plans[networkKey]
    : {};

const allNetworkPlans = Object.values(networkCategories)
  .filter(Array.isArray)
  .flat();

const getValidityDays = (plan) => {
  const rawValidity =
    plan?.validity ??
    plan?.day ??
    plan?.days ??
    plan?.duration ??
    "";

  const planText = [
    rawValidity,
    plan?.displayName,
    plan?.name,
    plan?.data_plan,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Explicit month validity.
  let match = planText.match(
    /(\d+(?:\.\d+)?)\s*(month|months)\b/i
  );

  if (match) {
    return Number(match[1]) * 30;
  }

  if (/\bmonthly\b/i.test(planText)) {
    return 30;
  }

  // Explicit week validity.
  match = planText.match(
    /(\d+(?:\.\d+)?)\s*(week|weeks)\b/i
  );

  if (match) {
    return Number(match[1]) * 7;
  }

  if (/\bweekly\b/i.test(planText)) {
    return 7;
  }

  // Explicit day validity.
  match = planText.match(
    /(\d+(?:\.\d+)?)\s*(day|days)\b/i
  );

  if (match) {
    return Number(match[1]);
  }

  if (/\bdaily\b/i.test(planText)) {
    return 1;
  }

  // Explicit hour validity.
  match = planText.match(
    /(\d+(?:\.\d+)?)\s*(hour|hours)\b/i
  );

  if (match) {
    return Number(match[1]) / 24;
  }

  if (/\bhourly\b/i.test(planText)) {
    return 1 / 24;
  }

  return null;
};

const getPlanCategory = (plan) => {
  const days = getValidityDays(plan);

  if (days === 1) return "Daily";
  if (days === 7) return "Weekly";
  if (days === 30) return "Monthly";

  return "Others";
};

const bestPickNames = {
  MTN: [
    "1GB - 30days",
    "750MB + Free 1hr (YT/IG/TT) - 3 Days",
    "1.2GB (All Social Media) - 30days",
    "2.5GB - 2days",
    "3.2GB - 2Days",
    "3.5GB - 1 Day",
    "4GB - 2 Days",
    "3.5GB - 7days",
    "5.5GB - 2 Days",
    "6GB - 7Days",
  ],

  AIRTEL: [
    "300MB - 2 days",
    "600MB - 2 days",
    "1.5GB - 1day",
    "3GB- 2days",
    "1GB - 7 Days",
    "2GB - 30 Days",
    "3GB - 30 Days",
    "8GB - 30 Days",
    "10GB - 30 Days",
    "18GB - 30 Days",
  ],

  GLO: [
    "200 MB - 14days",
    "500MB - 30days",
    "750mb - 1day",
    "1GB - 7days",
    "1GB - 30days",
    "1.5GB - 1day",
    "2.5GB - 2days",
    "3GB - 30days",
    "5GB - 30days",
    "10GB - 7days",
  ],

  "9MOBILE": [
    "500MB - 30days",
    "1GB for 30 Days",
    "1.5GB - 30 Days",
    "2GB - 30days",
    "3GB - 30days",
    "4GB - 30 Days",
    "4.5GB - 30days",
    "5GB for 30 Days",
    "10GB - 30days",
    "11GB - 30days",
  ],
};

const getPlanName = (plan) =>
  String(
    plan?.data_plan ||
    plan?.name ||
    plan?.displayName ||
    ""
  ).trim();

const normalizePlanName = (name) =>
  String(name || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9.+-]/g, "");

const getBestPicks = () => {
  const networkKey = String(network || "")
    .trim()
    .toUpperCase();

  const names = bestPickNames[networkKey] || [];

  return names
    .map((wantedName) => {
      const wanted = normalizePlanName(wantedName);

      return allNetworkPlans.find(
        (plan) =>
          normalizePlanName(getPlanName(plan)) === wanted
      );
    })
    .filter(Boolean);
};

const categorizedPlans = {
  "Best Picks": getBestPicks(),
  Daily: allNetworkPlans.filter(
    (plan) => getPlanCategory(plan) === "Daily"
  ),
  Weekly: allNetworkPlans.filter(
    (plan) => getPlanCategory(plan) === "Weekly"
  ),
  Monthly: allNetworkPlans.filter(
    (plan) => getPlanCategory(plan) === "Monthly"
  ),
  Others: allNetworkPlans.filter(
    (plan) => getPlanCategory(plan) === "Others"
  ),
};

const activeCategoryPlans =
  categorizedPlans[category] || [];

const filteredPlans = activeCategoryPlans.filter((plan) => {
  const text = (
    plan.data_plan ||
    plan.name ||
    plan.size ||
    plan.datasize ||
    ""
  ).toLowerCase();

  return text.includes(search.toLowerCase());
});

const confirmDataPurchase = () => {
  const selected = filteredPlans[Number(selectedPlan)];

  if (!selected) {
    setMessage("Select a data plan");
    return;
  }

  const amount = Number(
    selected.display_price ||
    selected.reseller_price ||
    selected.price ||
    0
  );

  if (!Number.isFinite(amount) || amount <= 0) {
    setMessage("Invalid data plan price.");
    return;
  }

  if (walletBalance === null || walletBalance === undefined) {
    setMessage("Unable to verify your wallet balance.");
    return;
  }

  if (walletBalance < amount) {
    setShowConfirmation(false);
    setMessage(
      `Insufficient wallet balance. You need ₦${amount.toLocaleString()} but only have ₦${Number(walletBalance).toLocaleString()}.`
    );
    return;
  }

  sessionStorage.setItem(
    "alphaBotDataPurchaseState",
    JSON.stringify({
      phone: (() => {
        let digits = String(phone || "").replace(/\\D/g, "");

        if (digits.startsWith("234")) {
          digits = digits.slice(3);
        }

        if (digits.startsWith("0")) {
          digits = digits.slice(1);
        }

        return digits
          ? "+234" + digits.slice(0, 10)
          : "";
      })(),
      network:
        selected.network ||
        selected.service_name ||
        network ||
        "",
      category,
      search,
      selectedPlan
    })
  );

  setShowConfirmation(false);

  router.push("/enter-pin?service=data&return=/data");
};

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
phone: (() => {
  let digits = String(phone || "").replace(/\D/g, "");

  if (digits.startsWith("234")) {
    digits = digits.slice(3);
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return digits ? "+234" + digits.slice(0, 10) : "";
})(),
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

<div className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#111113] p-4 space-y-5">

{/* PHONE NUMBER */}

<div>

<div className="flex items-center justify-between mb-2">
<p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
Mobile Number
</p>

<span className="text-[9px] text-zinc-500 dark:text-zinc-600">
Enter recipient
</span>
</div>

<div className="relative">

<div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#080809] p-1">

{/* NETWORK PICKER */}

<div className="relative shrink-0">
  <button
    type="button"
    onClick={() => setNetworkPickerOpen((open) => !open)}
    className="w-[58px] h-[50px] rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center active:scale-95 transition"
    aria-label="Change network"
  >
    {networkLogos[network] ? (
      <img
        src={networkLogos[network]}
        alt={network}
        className="w-9 h-9 object-contain"
      />
    ) : (
      <span className="text-xs font-black text-zinc-500">MTN</span>
    )}
  </button>

  {networkPickerOpen && (
    <div className="absolute z-50 top-[56px] left-0 w-[155px] rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#111113] p-2 shadow-2xl">
      {["MTN", "AIRTEL", "GLO", "9MOBILE"].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => {
            setNetwork(item);
            setNetworkManuallySelected(true);
            setSelectedPlan("");
            setNetworkPickerOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-black transition ${
            network === item
              ? "bg-yellow-400 text-black"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
          }`}
        >
          <img
            src={networkLogos[item]}
            alt={item}
            className="w-7 h-7 object-contain"
          />
          <span>{item}</span>
        </button>
      ))}
    </div>
  )}
</div>

{/* PHONE NUMBER */}

<input
  type="tel"
  inputMode="numeric"
  value={phone.replace(/^\+234/, "")}
  onChange={(e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);

    // Keep exactly what the customer typed in the UI.
    // We canonicalize the number only when sending it to the backend.
    setPhone(digits);

    // Typing a new number always allows automatic detection again.
    setNetworkManuallySelected(false);

    const detected = detectNetwork(digits);

    if (detected) {
      setNetwork(detected);
      setSelectedPlan("");
    } else if (digits.length < 4) {
      setNetwork("MTN");
      setSelectedPlan("");
    }

  }}
  placeholder="Phone number"
  className="flex-1 min-w-0 h-[50px] bg-transparent px-3 text-sm font-semibold text-zinc-950 dark:text-white outline-none placeholder:text-zinc-400"
/>

{/* CONTACT PICKER */}

<button
type="button"
onClick={async () => {
try {
if (!("contacts" in navigator) || !navigator.contacts?.select) {
alert("Contact selection is not supported on this browser.");
return;
}

const contacts = await navigator.contacts.select(
["name", "tel"],
{ multiple: false }
);

if (!contacts?.length) return;

const rawPhone = contacts[0]?.tel?.[0];

if (!rawPhone) {
alert("This contact does not have a phone number.");
return;
}

const digits = rawPhone.replace(/\D/g, "");

let local = digits;

if (local.startsWith("234")) {
local = "0" + local.slice(3);
}

if (local.startsWith("0")) {
local = local.slice(1);
}

if (local.startsWith("0")) {
  local = local.slice(1);
}

const value = "+234" + local.slice(0, 10);

setPhone(value);

if (!networkManuallySelected) {
const detected = detectNetwork(value);
const matchingNetwork = networks.find(
(item) =>
item.toLowerCase() === detected.toLowerCase()
);

if (matchingNetwork) {
setNetwork(matchingNetwork);
setSelectedPlan("");
}
}
} catch (error) {
if (error?.name !== "AbortError") {
console.error("Contact picker error:", error);
}
}
}}
aria-label="Select contact"
title="Select contact"
className="shrink-0 mr-1 w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center shadow-sm hover:bg-yellow-300 active:scale-95 transition"
>
<span className="text-base">👤</span>
</button>

</div>

</div>

</div>


{/* BENEFICIARIES */}

<button
type="button"
onClick={() => setBeneficiaryPickerOpen(true)}
className="w-full flex items-center justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] px-4 py-3 active:scale-[0.99] transition"
>
<div className="text-left">
<p className="text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
Buy for beneficiary
</p>
<p className="text-[10px] text-zinc-400 mt-1">
Choose from your recent numbers
</p>
</div>

<span className="text-lg text-zinc-400">
›
</span>
</button>

{beneficiaryPickerOpen && (
<div className="fixed inset-0 z-[100]">

<button
type="button"
aria-label="Close beneficiary picker"
onClick={() => setBeneficiaryPickerOpen(false)}
className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
/>

<div className="absolute bottom-0 left-0 right-0 max-h-[58vh] rounded-t-[28px] bg-white dark:bg-[#111113] border-t border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">

<div className="flex justify-center pt-3 pb-2">
<div className="w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
</div>

<div className="px-5 pb-3">
<div className="flex items-center justify-between">
<div>
<h3 className="text-base font-black">
Buy for beneficiary
</h3>
<p className="text-[10px] text-zinc-500 mt-1">
Select a recent number
</p>
</div>

<button
type="button"
onClick={() => setBeneficiaryPickerOpen(false)}
className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 text-lg"
>
×
</button>
</div>
</div>

<div className="px-4 pb-6 overflow-y-auto max-h-[45vh]">

{beneficiaries.filter((item) => item.service === "data").length > 0 ? (

<div className="space-y-2">

{beneficiaries
.filter((item) => item.service === "data")
.map((item, index) => {

const value = item.beneficiary_phone?.startsWith("+234")
  ? item.beneficiary_phone
  : item.beneficiary_phone?.startsWith("0")
  ? "+234" + item.beneficiary_phone.slice(1)
  : "+234" + item.beneficiary_phone;

const detected = detectNetwork(value);

return (
<button
key={`${item.beneficiary_phone}-${index}`}
type="button"
onClick={() => {
setPhone(value);
setNetworkManuallySelected(false);

if (detected) {
setNetwork(detected);
setSelectedPlan("");
}

setBeneficiaryPickerOpen(false);
}}
className="w-full flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#080809] px-3 py-3 text-left active:scale-[0.99] transition"
>
<div className="relative shrink-0">
<div className="w-11 h-11 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
{networkLogos[detected] ? (
<img
src={networkLogos[detected]}
alt={detected}
className="w-8 h-8 object-contain"
/>
) : (
<span className="text-[9px] font-black text-zinc-500">
{detected || "?"}
</span>
)}
</div>

{detected && (
<span className="absolute -bottom-1 -right-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 text-[7px] font-black">
{detected}
</span>
)}
</div>

<div className="min-w-0 flex-1">
<p className="text-sm font-black truncate">
{item.beneficiary_phone}
</p>

<p className="text-[10px] text-zinc-500 mt-0.5 truncate">
{item.name || "Beneficiary"}
</p>
</div>

<span className="text-zinc-400 text-lg">
›
</span>
</button>
);
})}

</div>

) : (

<div className="py-8 text-center">
<p className="text-sm font-bold text-zinc-500">
No recent purchases yet
</p>

<p className="text-[10px] text-zinc-400 mt-1">
Your recent beneficiaries will appear here
</p>
</div>

)}

</div>
</div>
</div>
)}


{/* SEARCH */}

<div>

<div className="flex items-center justify-between mb-2">
<p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
Select a plan
</p>

<span className="text-[9px] text-zinc-500 dark:text-zinc-600">
Choose your bundle
</span>
</div>

<div className="relative">
<span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
🔎
</span>

<input
type="text"
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Search data plans..."
className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#080809] dark:border-zinc-800 dark:text-white outline-none focus:border-yellow-400/60 transition"
/>
</div>

</div>


{/* CUSTOMER CATEGORIES */}

<div className="flex gap-2 overflow-x-auto pb-1">

{["Best Picks", "Daily", "Weekly", "Monthly", "Others"].map((item) => (
<button
key={item}
type="button"
onClick={() => {
setCategory(item);
setSelectedPlan("");
}}
className={`shrink-0 rounded-full px-4 py-2.5 text-[10px] font-black transition active:scale-95 ${
category === item
? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/10"
: "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 hover:text-white"
}`}
>
{item === "Best Picks" ? "🔥 " : ""}
{item}
</button>
))}

</div>


{/* DATA PLANS */}

<div className="grid grid-cols-2 gap-3">

{filteredPlans.map((plan, index) => (
<button
key={`${plan.network || network}-${plan.name}-${plan.id || plan.plan_id || index}`}
type="button"
onClick={() => {
  setSelectedPlan(String(index));
  setMessage("");
  setShowConfirmation(true);
}}
className={`text-left rounded-2xl border p-4 transition active:scale-[0.98] ${
selectedPlan === String(index)
? "border-yellow-400 bg-yellow-400/10 ring-1 ring-yellow-400"
: "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#080809] hover:border-yellow-400/50"
}`}
>
<p className="text-lg font-black">
{plan.data_plan || plan.name || plan.datasize}
</p>

<p className="text-base font-black text-yellow-500 mt-1">
₦{Number(
plan.display_price ||
plan.reseller_price ||
plan.price ||
0
).toLocaleString()}
</p>

<p className="text-[10px] text-zinc-500 mt-2">
{plan.validity ||
(plan.day ? `${plan.day} Days` : "Flexible validity")}
</p>

<p className="text-[9px] uppercase font-bold text-zinc-400 mt-1">
{plan.network || network}
</p>

<div className={`mt-3 text-center rounded-xl py-2 text-[10px] font-black ${
selectedPlan === String(index)
? "bg-yellow-400 text-black"
: "bg-zinc-200 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
}`}>
{selectedPlan === String(index) ? "Selected" : "Buy"}
</div>
</button>
))}

</div>

{filteredPlans.length === 0 && (
<div className="py-8 text-center text-sm text-zinc-500">
No plans found in this category.
</div>
)}

</div>



{/* PURCHASE CONFIRMATION */}

{showConfirmation && selectedPlan !== "" && (() => {
  const selected = filteredPlans[Number(selectedPlan)];

  if (!selected) return null;

  const planName =
    selected.data_plan ||
    selected.name ||
    selected.datasize ||
    "Data plan";

  const amount = Number(
    selected.display_price ||
    selected.reseller_price ||
    selected.price ||
    0
  );

  const afterBalance =
    walletBalance !== null
      ? Number(walletBalance) - amount
      : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4">

      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Confirm purchase
            </p>

            <h3 className="text-2xl font-black mt-1">
              Review your order
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowConfirmation(false)}
            className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 text-lg"
          >
            ×
          </button>

        </div>


        {/* PLAN */}

        <div className="mt-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 p-4">

          <div className="flex items-start justify-between gap-4">

            <div>
              <p className="text-lg font-black">
                {planName}
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                {selected.network || selected.service_name || network}
              </p>
            </div>

            <p className="text-xl font-black text-yellow-500 whitespace-nowrap">
              ₦{amount.toLocaleString()}
            </p>

          </div>

          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">

            <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
              Recipient
            </p>

            <p className="font-bold mt-1">
              {phone}
            </p>

          </div>

        </div>


        {/* BALANCE */}

        <div className="mt-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">

          <div className="flex items-center justify-between px-4 py-3">

            <span className="text-xs text-zinc-500">
              Wallet balance
            </span>

            {walletBalanceLoading ? (
              <span className="text-xs font-bold text-zinc-500">
                Checking...
              </span>
            ) : (
              <span className="font-black">
                {walletBalance === null
                  ? "Unavailable"
                  : `₦${Number(walletBalance).toLocaleString()}`
                }
              </span>
            )}

          </div>


          <div className="border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 py-3">

            <span className="text-xs text-zinc-500">
              After purchase
            </span>

            <span
              className={`font-black ${
                afterBalance !== null && afterBalance < 0
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {afterBalance === null
                ? "—"
                : `₦${afterBalance.toLocaleString()}`
              }
            </span>

          </div>

        </div>


        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-4 leading-5">
          Confirming will take you to your transaction PIN.
          Your wallet will only be charged after the PIN is verified.
        </p>


        <div className="grid grid-cols-2 gap-3 mt-5">

          <button
            type="button"
            onClick={() => setShowConfirmation(false)}
            className="rounded-2xl py-4 font-black bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 active:scale-95 transition"
          >
            Cancel
          </button>


          <button
            type="button"
            disabled={
              walletBalanceLoading ||
              walletBalance === null ||
              walletBalance < amount
            }
            onClick={confirmDataPurchase}
            className="rounded-2xl py-4 font-black bg-yellow-400 text-black active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm & continue
          </button>

        </div>

      </div>

    </div>
  );
})()}

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
