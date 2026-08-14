"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import CopyButton from "@/components/CopyButton";
import { QRCodeSVG } from "qrcode.react";

export default function Referral(){

const [user,setUser]=useState(null);

const [referralLink,setReferralLink]=useState("");
const [totalReferrals,setTotalReferrals]=useState(0);
const [earnings,setEarnings]=useState(0);
const [history,setHistory]=useState([]);

const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);



useEffect(()=>{

const saved=localStorage.getItem("user");

if(saved){

const data=JSON.parse(saved);

setUser(data);

loadReferral(data.phone);

}

},[]);




const loadReferral=async(phone)=>{

try{

const res=await fetch(
`https://api.alphabothq.com/referrals/${phone}`
);

const data=await res.json();


if(res.ok){

setReferralLink(data.referralLink);
setTotalReferrals(data.totalReferrals);
setEarnings(data.earnings);

}


const historyRes=await fetch(
`https://api.alphabothq.com/referral-earnings/${phone}`
);


const historyData=await historyRes.json();


if(historyRes.ok){

setHistory(historyData.history || []);

}


}catch(error){

console.log(error);

}

};











const withdraw=async()=>{


try{

setLoading(true);


const token=localStorage.getItem("token");


const res=await fetch(
"https://api.alphabothq.com/referral-withdraw",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();



if(res.ok){

setMessage(
`₦${data.amount} added to wallet`
);


setEarnings(0);


}else{

setMessage(
data.message || "Withdrawal failed"
);

}



}catch(error){

setMessage("Network error");


}finally{

setLoading(false);

}


};





return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
Referral 🎁
</h1>


<p className="text-zinc-500 mt-2">
Invite friends and earn rewards
</p>





<div className="mt-8 bg-gradient-to-br from-yellow-300 to-yellow-600 text-black rounded-3xl p-6">


<h2 className="font-bold text-xl">
Your Referral Link
</h2>


<p className="text-sm mt-3 break-all">
{referralLink || "Loading..."}
</p>



<CopyButton
  text={referralLink}
  setToast={setMessage}
/>

{referralLink && (
  <div className="mt-6 flex flex-col items-center">
    <div className="bg-white p-4 rounded-2xl">
      <QRCodeSVG
        value={referralLink}
        size={220}
        level="H"
      />
    </div>

    <p className="text-sm mt-3 text-center text-zinc-600 dark:text-zinc-400">
      Scan this QR code to use your referral link
    </p>
  </div>
)}


</div>






<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<h2 className="text-xl font-bold">
How it works
</h2>


<div className="mt-4 text-zinc-500 space-y-3">


<p>
1. Share your referral link with friends.
</p>


<p>
2. They create an AlphaBot account.
</p>


<p>
3. When they complete their first qualifying purchase, you earn 1% reward.
</p>


<p>
Example: Friend buys ₦5,000 data → You earn ₦50.
</p>


</div>


</div>







<div className="mt-6 grid grid-cols-2 gap-4">


<div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5">

<p className="text-zinc-500 text-sm">
Referrals
</p>

<h2 className="text-2xl font-bold mt-2">
{totalReferrals}
</h2>

</div>



<div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5">

<p className="text-zinc-500 text-sm">
Earnings
</p>

<h2 className="text-2xl font-bold mt-2 text-yellow-400">
₦{earnings}
</h2>

</div>


</div>







<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Withdraw Referral Earnings
</h2>


<p className="text-zinc-500 mt-2">
Minimum withdrawal: ₦200
</p>


<p className="mt-4">
Available: <b>₦{earnings}</b>
</p>



<button

onClick={withdraw}

disabled={loading}

className="mt-5 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold active:scale-95 transition"

>

{loading ? "Processing..." : "Withdraw to Wallet"}

</button>



<p className="text-center text-zinc-400 mt-3">
{message}
</p>


</div>







<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Reward History
</h2>



{history.length === 0 ? (

<p className="text-zinc-500 mt-4">
No rewards yet
</p>

) : (

history.map((item,index)=>(

<div
key={index}
className="mt-4 border-b border-zinc-700 pb-3"
>

<p>
+₦{item.amount}
</p>

<p className="text-sm text-zinc-500">
{item.description}
</p>


</div>

))

)}


</div>






<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-8"
>
← Back to Dashboard
</Link>


</div>


<BottomNav />


</main>

);

}
