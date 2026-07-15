"use client";

import Link from "next/link";

export default function Page(){

return(

<main className="min-h-screen bg-black text-white px-5 py-8">

<div className="max-w-md mx-auto">

<h1 className="text-3xl font-bold">
🌐 Data
</h1>

<p className="text-zinc-400 mt-2">
Buy internet data bundles instantly
</p>

<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

<input
className="w-full bg-black border border-zinc-700 rounded-xl p-3"
placeholder="Phone number"
/>

<input
className="w-full mt-4 bg-black border border-zinc-700 rounded-xl p-3"
placeholder="Amount"
/>

<button
className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
Continue
</button>

</div>

<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-8"
>
← Dashboard
</Link>

</div>

</main>

);

}