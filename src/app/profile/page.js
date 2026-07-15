"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Profile(){

const [user,setUser]=useState(null);


useEffect(()=>{

const saved=localStorage.getItem("user");

if(saved){

setUser(JSON.parse(saved));

}

},[]);



const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/login";

};



return(

<main className="min-h-screen bg-black text-white px-5 py-8">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
Profile 👤
</h1>

<p className="text-zinc-400 mt-2">
Manage your AlphaBot account
</p>




<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


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
{user?.email}
</p>



</div>






<div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-5">


<h2 className="font-bold text-xl">
Account Settings
</h2>


<button className="w-full mt-4 bg-black border border-zinc-700 rounded-xl p-3 text-left">

✏️ Edit Profile

</button>



<button className="w-full mt-3 bg-black border border-zinc-700 rounded-xl p-3 text-left">

🔒 Change Password

</button>



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



</div>


</main>

);

}
