"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Profile(){

const [user,setUser]=useState(null);
const [balance,setBalance]=useState(0);
const [loading,setLoading]=useState(true);
const [error,setError]=useState("");



useEffect(()=>{

const loadProfile=async()=>{

try{

const saved=localStorage.getItem("user");


if(!saved){

window.location.href="/login";
return;

}


const localUser=JSON.parse(saved);


const profileRes=await fetch(
`https://alphabot-i7p2.onrender.com/users/profile/${localUser.phone}`
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
`https://alphabot-i7p2.onrender.com/wallet/balance/${localUser.phone}`
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

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/login";

};




if(loading){

return(

<div className="min-h-screen bg-black text-white flex items-center justify-center">

Loading profile...

</div>

);

}




return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
Profile 👤
</h1>


<p className="text-zinc-400 mt-2">
Manage your AlphaBot account
</p>





<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


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

<h2 className="text-xl font-bold mt-2 text-yellow-400">
₦{balance}
</h2>

</div>



<div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5">

<p className="text-zinc-400 text-sm">
Referral Earnings
</p>

<h2 className="text-xl font-bold mt-2 text-yellow-400">
₦{user?.referralEarnings || 0}
</h2>

</div>


</div>







<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Account Information
</h2>


<p className="mt-4 text-zinc-400">
Referral Code:
</p>


<p className="font-bold">
{user?.referralCode || "None"}
</p>



<p className="mt-4 text-zinc-400">
Account Created:
</p>


<p>
{user?.createdAt 
? new Date(user.createdAt).toDateString()
: "Unknown"}
</p>



</div>







<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">


<h2 className="font-bold text-xl">
Quick Actions
</h2>



<Link
href="/wallet"
className="block mt-4 bg-white dark:bg-black border border-zinc-700 rounded-xl p-3"
>
💰 Wallet
</Link>



<Link
href="/transactions"
className="block mt-3 bg-white dark:bg-black border border-zinc-700 rounded-xl p-3"
>
📜 Transactions
</Link>



<Link
href="/referral"
className="block mt-3 bg-white dark:bg-black border border-zinc-700 rounded-xl p-3"
>
🎁 Referral
</Link>


</div>








<button
onClick={logout}
className="w-full mt-6 bg-red-600 py-3 rounded-xl font-bold"
>
Logout
</button>




<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-6"
>
← Back to Dashboard
</Link>



{error && (

<p className="text-center text-red-400 mt-4">
{error}
</p>

)}



</div>


<BottomNav />


</main>

);

}
