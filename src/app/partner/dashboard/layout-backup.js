"use client";

import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";

export default function PartnerDashboard(){

const router=useRouter();

const [data,setData]=useState(null);
const [message,setMessage]=useState("");


const load=async()=>{

const token=localStorage.getItem("partnerToken");

if(!token){
router.push("/partner/login");
return;
}


const res=await fetch(
"https://api.alphabothq.com/blog-partner/dashboard",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const result=await res.json();


if(res.ok){
setData(result);
}else{
setMessage(result.message);
}

};


useEffect(()=>{
load();
},[]);


return(

<div className="min-h-screen bg-[#050505] text-white px-6 py-10">

<h1 className="text-2xl font-bold">
📝 Partner Dashboard
</h1>

<p>{message}</p>


{data && (

<div className="grid gap-4 mt-5">


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">Partner</h2>
<p>{data.name}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">Referral Code</h2>
<p>{data.code}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">Users Referred</h2>
<p>{data.users}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">👆 Link Clicks</h2>
<p>{data.clicks || 0}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">✅ Converted Users</h2>
<p>{data.conversions || 0}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">📈 Conversion Rate</h2>
<p>{data.conversionRate || 0}%</p>
</div>






<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">💰 Commission Earned</h2>
<p>₦{data.totalEarned || 0}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">Total Earned</h2>
<p>₦{data.totalEarned}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">Pending Payout</h2>
<p>₦{data.pendingPayout}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">🏦 Bank</h2>
<p>{data.bankName || "Not added"}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">💳 Account Number</h2>
<p>{data.accountNumber || "Not added"}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">👤 Account Name</h2>
<p>{data.accountName || "Not added"}</p>
</div>


<div className="bg-gradient-to-b from-[#18181B] to-[#101012] border border-zinc-800 rounded-3xl p-5">
<h2 className="font-bold">🔗 Referral Link</h2>
<p className="break-all">
{window.location.origin}{data.referralLink}
</p>

<button
className="mt-3 bg-black text-white px-3 py-2 rounded"
onClick={()=>{
navigator.clipboard.writeText(
window.location.origin + data.referralLink
);
setMessage("✅ Referral link copied");
}}
>
Copy Link
</button>

</div>


<button
className="bg-white text-black px-4 py-3 rounded-xl font-bold"
onClick={()=>router.push("/partner/referrals")}
>
🔗 Referral Earnings
</button>


<button
className="border border-zinc-700 px-4 py-3 rounded-xl"
onClick={()=>router.push("/partner/payout-details")}
>
💳 Payout Details
</button>

<button
className="border border-zinc-700 px-4 py-3 rounded-xl"
onClick={()=>router.push("/partner/payout-history")}
>
📜 Payout History
</button>


<button
className="border border-zinc-700 px-4 py-3 rounded-xl"
onClick={()=>router.push("/partner/settings")}
>
⚙️ Settings
</button>


<button
className="border border-zinc-700 px-4 py-3 rounded-xl"
onClick={()=>router.push("/partner/leaderboard")}
>
🏆 Leaderboard
</button>


</div>

)}


</div>

);

}
