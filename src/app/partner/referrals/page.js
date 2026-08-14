
"use client";

import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import AlphaLogo from "@/components/AlphaLogo";

export default function PartnerReferrals(){

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

<main className="
min-h-screen
bg-[#050505]
text-white
px-6
py-10
">

<div className="max-w-md mx-auto">


<div className="flex items-center gap-4">

<AlphaLogo />

<div>

<h1 className="text-3xl font-black">
Referral Earnings
</h1>

<p className="text-zinc-400 text-sm mt-1">
Track your referral performance
</p>

</div>

</div>


<p className="text-red-400 mt-4">
{message}
</p>


{data && (

<div className="mt-8 space-y-4">


{[
["🔗 Referral Code",data.code || "N/A"],
["👥 Total Referrals",data.users || 0],
["💰 Pending Payout",`₦${data.pendingPayout || 0}`],
["📈 Commission Earned",`₦${data.totalEarned || 0}`]
].map((item,index)=>(

<div
key={index}
className="
bg-[#18181B]
border
border-zinc-800
rounded-3xl
p-5
"
>

<p className="text-zinc-400 text-sm">
{item[0]}
</p>

<h2 className="
text-2xl
font-black
mt-2
">
{item[1]}
</h2>

</div>

))}


</div>

)}


</div>

</main>

);

}
