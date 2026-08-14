"use client";

import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import AlphaLogo from "@/components/AlphaLogo";
import Toast from "@/components/Toast";

export default function PartnerDashboard(){

const router=useRouter();

const [data,setData]=useState(null);
const [message,setMessage]=useState("");
const [toast,setToast]=useState("");


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

<div>

<Toast
message={toast}
type="success"
onClose={()=>setToast("")}
/>

<main className="
min-h-screen
bg-[#050505]
text-white
px-6
py-10
">

<div className="max-w-5xl mx-auto">


<div className="flex items-center gap-4">

<AlphaLogo />

<div>
<h1 className="
text-3xl
font-bold
">
AlphaBot Partner
</h1>

<p className="text-zinc-400 mt-1">
Manage your referrals and earnings
</p>
</div>

</div>

<p className="text-zinc-400 mt-1">
Manage your referrals and earnings
</p>


<p className="text-red-400 mt-3">
{message}
</p>



{data && (

<>

<div className="
mt-8
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-6
">

<h2 className="text-zinc-400">
Partner
</h2>

<p className="text-2xl font-bold mt-2">
{data.name}
</p>

<span className="
inline-block
mt-3
px-3
py-1
rounded-full
bg-white
text-black
text-sm
font-bold
">
{data.status}
</span>

</div>



<div className="
grid
grid-cols-2
gap-4
mt-5
">


{[
["👥 Users Referred",data.users || 0],
["💵 Commission Earned",`₦${data.totalEarned || 0}`],
["⏳ Pending Payout",`₦${data.pendingPayout || 0}`],
["🏆 Leaderboard","View Ranking"]
].map((x,i)=>(

<div
key={i}
onClick={()=>{
  if(x[0] === "🏆 Leaderboard"){
    router.push("/partner/leaderboard");
  }
}}
className="
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-5
cursor-pointer
hover:border-white
transition
"
>

<p className="text-zinc-400 text-sm">
{x[0]}
</p>

<p className="text-2xl font-bold mt-2">
{x[1]}
</p>

</div>

))}

</div>



<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
mt-5
">


<div className="
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-5
">

<p className="text-zinc-400">
💰 Lifetime Commission
</p>

<p className="text-2xl font-bold mt-2">
₦{Number(data.lifetimeCommission || data.totalEarned || 0).toLocaleString()}
</p>

</div>


<div className="
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-5
">

<p className="text-zinc-400">
⏳ Pending Payout
</p>

<p className="text-2xl font-bold mt-2">
₦{Number(data.pendingPayout || 0).toLocaleString()}
</p>

</div>


</div>



<div className="
mt-5
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-5
">

<p className="text-zinc-400">
🔗 Referral Earnings
</p>

<p className="mt-3 break-all">
{data.referralLink}
</p>


<button
className="
mt-4
bg-white
text-black
px-5
py-3
rounded-xl
font-bold
"
onClick={()=>{
navigator.clipboard.writeText(
data.referralLink
);
setToast("✅ Referral link copied");
}}
>
Copy Link
</button>

</div>



<div className="
grid
gap-3
mt-5
">


<button
className="bg-white text-black py-3 rounded-xl font-bold"
onClick={()=>router.push("/partner/referrals")}
>
🔗 Referral Earnings
</button>


<button
className="border border-zinc-700 py-3 rounded-xl"
onClick={()=>router.push("/partner/payout-history")}
>
📜 Payout History
</button>




<button
className="border border-zinc-700 py-3 rounded-xl"
onClick={()=>router.push("/partner/payout-details")}
>
💳 Payout Details
</button>


<button
className="border border-zinc-700 py-3 rounded-xl"
onClick={()=>router.push("/partner/settings")}
>
⚙️ Settings
</button>








</div>

</>

)}


</div>

</main>

</div>

); 

}