"use client";

import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";

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
"https://alphabot-1.onrender.com/blog-partner/dashboard",
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

<div className="p-6">

<h1 className="text-2xl font-bold">
🔗 Referral Earnings
</h1>


<p>{message}</p>


{data && (

<div className="space-y-4 mt-5">


<div className="border rounded-xl p-4">

<p>
Referral Code
</p>

<h2 className="font-bold text-xl">
{data.code || "N/A"}
</h2>

</div>



<div className="border rounded-xl p-4">

<p>
Total Referrals
</p>

<h2 className="font-bold text-xl">
{data.users || 0}
</h2>

</div>



<div className="border rounded-xl p-4">

<p>
Pending Payout
</p>

<h2 className="font-bold text-xl">
₦{data.pendingPayout || 0}
</h2>

</div>



<div className="border rounded-xl p-4">

<p>
Commission Earned
</p>

<h2 className="font-bold text-xl">
₦{data.totalEarned || 0}
</h2>

</div>


</div>

)}


</div>

);

}
