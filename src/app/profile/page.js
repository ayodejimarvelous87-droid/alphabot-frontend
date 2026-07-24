"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";

export default function Profile(){

const [user,setUser]=useState(null);
const [balance,setBalance]=useState(0);
const [loading,setLoading]=useState(true);
const [error,setError]=useState("");
const [toast,setToast]=useState("");

useEffect(()=>{

const load=async()=>{

try{

const saved=localStorage.getItem("user");
const token=localStorage.getItem("token");

if(!saved){
window.location.href="/login";
return;
}

const localUser=JSON.parse(saved);


const profile=await fetch(
`https://alphabot-1.onrender.com/users/profile/${localUser.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await profile.json();

if(profile.ok){
setUser(data);
localStorage.setItem("user",JSON.stringify(data));
}



const wallet=await fetch(
`https://alphabot-1.onrender.com/wallet/balance/${localUser.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const walletData=await wallet.json();

if(wallet.ok){
setBalance(walletData.balance || 0);
}


}catch(e){

console.log(e);
setError("Failed to load profile");

}finally{

setLoading(false);

}

};


load();

},[]);



const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/login";

};



if(loading){

return(
<main className="min-h-screen bg-[#050505] text-white p-6">
<p className="text-zinc-400">Loading profile...</p>
</main>
)

}



return(

<main className="min-h-screen bg-[#050505] text-white px-6 py-6 pb-24">

<Toast message={toast} type="error"/>


<div className="max-w-md mx-auto space-y-5">


{/* HEADER */}

<div>

<p className="text-xs text-zinc-500 uppercase tracking-widest">
AlphaBot Account
</p>

<h1 className="text-3xl font-black mt-2">
Profile
</h1>

</div>



{/* PROFILE CARD */}

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">


<div className="flex items-center gap-4">


<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-zinc-500 text-black flex items-center justify-center text-3xl font-black">

{user?.name?.charAt(0) || "A"}

</div>


<div>

<h2 className="text-xl font-bold">
{user?.name || "AlphaBot User"}
</h2>


<p className="text-zinc-400 text-sm mt-1">
{user?.phone}
</p>


<p className="text-zinc-500 text-sm">
{user?.email || "No email"}
</p>


</div>


</div>



<div className="mt-5 pt-4 border-t border-zinc-800">


<p className="text-sm text-zinc-400">
Account Status
</p>


<p className="mt-2 font-bold">
{user?.emailVerified 
? "✓ Verified Account"
: "Pending Verification"}
</p>


</div>


</div>





{/* STATS */}


<div className="grid grid-cols-2 gap-4">


<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5">

<p className="text-xs text-zinc-500">
Wallet Balance
</p>

<h2 className="text-xl font-bold mt-2">
₦{Number(balance).toLocaleString()}
</h2>

</div>



<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5">

<p className="text-xs text-zinc-500">
Referral Earnings
</p>

<h2 className="text-xl font-bold mt-2">
₦{Number(user?.referralEarnings || 0).toLocaleString()}
</h2>

</div>


</div>





{/* INFORMATION */}


<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">


<h2 className="font-bold">
Account Information
</h2>


<div className="mt-5 space-y-4 text-sm">


<div className="flex justify-between">
<span className="text-zinc-500">
Referral Code
</span>

<span className="font-bold">
{user?.referralCode || "None"}
</span>

</div>



<div className="flex justify-between">
<span className="text-zinc-500">
Joined
</span>

<span>
{user?.createdAt
? new Date(user.createdAt).toDateString()
:"Unknown"}
</span>

</div>


</div>


</div>





{/* MENU */}

<div className="space-y-3">


<Link
href="/referral"
className="block bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
>
🎁 Invite & Earn
</Link>


<Link
href="/transaction-pin"
className="block bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
>
🔐 Transaction PIN
</Link>


<Link
href="/ai"
className="block bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
>
🤖 AI Assistant
</Link>


<Link
href="/support"
className="block bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
>
🆘 Support
</Link>


<Link
href="/terms"
className="block bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
>
📄 Terms & Conditions
</Link>


<Link
href="/privacy"
className="block bg-[#18181B] border border-zinc-800 rounded-2xl p-4 hover:border-zinc-600 transition"
>
🔒 Privacy Policy
</Link>


</div>






<Link
href="/edit-profile"
className="block text-center bg-white text-black rounded-xl py-3 font-bold"
>
Edit Profile
</Link>



<button
onClick={logout}
className="w-full bg-[#18181B] border border-red-900 text-red-400 rounded-xl py-3 font-bold"
>
Logout
</button>



{error && (
<p className="text-red-400 text-center">
{error}
</p>
)}



</div>


<BottomNav />


</main>

)

}
