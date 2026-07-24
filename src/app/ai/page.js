"use client";

import Link from "next/link";

export default function AIPage(){

return(
<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">

<div className="max-w-md mx-auto">

<Link
href="/dashboard"
className="text-yellow-400 font-semibold"
>
← Dashboard
</Link>


<div className="mt-8 bg-gradient-to-br from-zinc-900 to-black text-white rounded-3xl p-6 border border-zinc-800 shadow-xl">

<div className="text-5xl">
🤖
</div>

<h1 className="text-3xl font-black mt-5">
AlphaBot AI
</h1>

<p className="text-zinc-400 mt-3">
Ask questions, get help, search and learn with AlphaBot AI assistant.
</p>


<button
className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:scale-105 transition"
>
Open AI Assistant
</button>

</div>


<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">

<h2 className="font-bold text-xl">
What can AI do?
</h2>

<ul className="mt-4 space-y-3 text-zinc-500">
<li>💡 Answer questions</li>
<li>🔎 Help search information</li>
<li>📚 Explain topics</li>
<li>🤖 Assist AlphaBot users</li>
</ul>

</div>


</div>

</main>
);

}
