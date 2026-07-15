"use client";

import Link from "next/link";

export default function Transactions(){

return(

<main className="min-h-screen bg-black text-white px-5 py-8">


<div className="max-w-md mx-auto">


<div className="flex justify-between items-center">

<div>

<h1 className="text-3xl font-bold">
Transactions 📜
</h1>

<p className="text-zinc-400 mt-2">
View your wallet activities
</p>

</div>


<Link
href="/dashboard"
className="text-yellow-400"
>
Home
</Link>


</div>





<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Recent Activity
</h2>


<div className="mt-5 space-y-4">


<div className="flex justify-between bg-black rounded-xl p-4">

<div>

<p className="font-semibold">
No transactions yet
</p>

<p className="text-zinc-500 text-sm">
Your wallet activities will appear here
</p>

</div>


<span className="text-zinc-500">
--
</span>


</div>


</div>


</div>





<div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-5">


<h3 className="font-bold">
Transaction Types
</h3>


<ul className="text-zinc-400 mt-3 space-y-2">

<li>💰 Wallet funding</li>

<li>📱 Airtime purchase</li>

<li>🌐 Data purchase</li>

<li>⚡ Bill payments</li>

<li>🎁 Referral earnings</li>

</ul>


</div>




</div>


</main>

);

}
