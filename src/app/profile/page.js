"use client";

import { useEffect, useState } from "react";


export default function Profile(){


const [user,setUser]=useState(null);



useEffect(()=>{

const saved=localStorage.getItem("user");
const token=localStorage.getItem("token");


if(!token || !saved){

window.location.href="/login";
return;

}


setUser(JSON.parse(saved));


},[]);



const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/login";

};



return(

<main className="min-h-screen bg-black text-white px-6 py-10">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
Profile
</h1>



<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<div className="mb-5">

<p className="text-zinc-400 text-sm">
Name
</p>

<p className="font-bold text-lg">
{user?.name}
</p>

</div>



<div className="mb-5">

<p className="text-zinc-400 text-sm">
Phone
</p>

<p className="font-bold">
{user?.phone}
</p>

</div>



<div className="mb-5">

<p className="text-zinc-400 text-sm">
Email
</p>

<p className="font-bold">
{user?.email}
</p>

</div>



<div>

<p className="text-zinc-400 text-sm">
Referral Code
</p>

<p className="font-bold text-yellow-400">
{user?.referralCode}
</p>

</div>


</div>



<button

onClick={logout}

className="w-full mt-6 bg-red-500/20 text-red-400 border border-red-500/30 py-3 rounded-xl"

>

Logout

</button>


</div>


</main>

)

}
