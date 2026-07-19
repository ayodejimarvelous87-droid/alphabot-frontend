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

const loadProfile=async()=>{

try{

const saved=localStorage.getItem("user");
const token=localStorage.getItem("token");


if(!saved){

window.location.href="/login";
return;

}


const localUser=JSON.parse(saved);



const profileRes=await fetch(
`https://alphabot-main.onrender.com/users/profile/${localUser.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const profileData=await profileRes.json();


if(profileRes.ok){

setUser(profileData);

localStorage.setItem(
"user",
JSON.stringify(profileData)
);

}



const walletRes=await fetch(
`https://alphabot-main.onrender.com/wallet/balance/${localUser.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const walletData=await walletRes.json();


if(walletRes.ok){

setBalance(walletData.balance || 0);

}



}catch(err){

console.log(err);
setError("Failed to load profile");

}finally{

setLoading(false);

}

};


loadProfile();


},[]);



const logout=()=>{

const confirmLogout=window.confirm("Are you sure you want to logout?");

if(!confirmLogout) return;

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/login";

};



if(loading){

return(
<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">
<div className="max-w-md mx-auto animate-pulse">
<div className="h-8 w-32 bg-zinc-300 dark:bg-zinc-800 rounded mb-6"></div>
<div className="bg-zinc-300 dark:bg-zinc-800 rounded-3xl p-6">
<div className="w-20 h-20 bg-zinc-400 dark:bg-zinc-700 rounded-full"></div>
<div className="h-6 w-40 bg-zinc-400 dark:bg-zinc-700 rounded mt-5"></div>
<div className="h-4 w-32 bg-zinc-400 dark:bg-zinc-700 rounded mt-3"></div>
</div>
<div className="grid grid-cols-2 gap-4 mt-6">
<div className="h-24 bg-zinc-300 dark:bg-zinc-800 rounded-2xl"></div>
<div className="h-24 bg-zinc-300 dark:bg-zinc-800 rounded-2xl"></div>
</div>
</div>
</main>
);

}



return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">
<Toast message={toast} type="error" />

<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
Profile 👤
</h1>

<p className="text-zinc-400 mt-2">
Manage your AlphaBot account
</p>



<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<div className="w-20 h-20 rounded-full bg-yellow-400 text-black flex items-center justify-center text-3xl font-bold">

{user?.name?.charAt(0) || "A"}

</div>


<h2 className="text-2xl font-bold mt-5">
{user?.name || "User"}
</h2>


<p className="text-zinc-400 mt-2">
{user?.phone}
</p>


<p className="text-zinc-400">
{user?.email || "No email"}
</p>


</div>



<div className="mt-6 grid grid-cols-2 gap-4">


<div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5">

<p className="text-zinc-400 text-sm">
Wallet Balance
</p>

<h2 className="text-xl font-bold text-yellow-400 mt-2">
₦{balance}
</h2>

</div>


<div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5">

<p className="text-zinc-400 text-sm">
Referral Earnings
</p>

<h2 className="text-xl font-bold text-yellow-400 mt-2">
₦{user?.referralEarnings || 0}
</h2>

</div>


</div>



<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Account Information
</h2>

<p className="text-zinc-400 mt-4">
Verification Status:
</p>

<p className="font-bold text-green-400">
{user?.verified ? "✅ Verified" : "⏳ Not Verified"}
</p>



<p className="text-zinc-400 mt-4">
Referral Code:
</p>


<p className="font-bold">
{user?.referralCode || "None"}
</p>



<p className="text-zinc-400 mt-4">
Account Created:
</p>


<p>
{user?.createdAt
? new Date(user.createdAt).toDateString()
: "Unknown"}
</p>


</div>



<div className="mt-6">


<Link
href="/wallet"
className="block bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4"
>
💰 Wallet
</Link>


<Link
href="/transactions"
className="block bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 mt-3"
>
📜 Transactions
</Link>


<Link
href="/referral"
className="block bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 mt-3"
>
🎁 Referral
</Link>


</div>




<Link
href="/edit-profile"
className="block w-full text-center mt-6 bg-yellow-400 text-black py-3 rounded-xl font-bold hover:scale-105 transition"
>
✏️ Edit Profile
</Link>

<button
onClick={logout}
className="w-full mt-4 bg-red-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition"
>
🚪 Logout
</button>


{error && (

<p className="text-red-400 text-center mt-4">
{error}
</p>

)}


</div>


<BottomNav />

</main>

);

}
