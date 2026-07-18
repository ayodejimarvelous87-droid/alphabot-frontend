"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";


export default function Arena(){

return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-6 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
🏆 Arena+
</h1>


<p className="text-zinc-400 mt-2">
Compete, predict and earn rewards.
</p>





<div className="mt-8 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-3xl p-6 text-black shadow-xl">


<h2 className="text-2xl font-bold">
⚽ Football Predictions
</h2>


<p className="mt-3 opacity-80">
Predict matches, earn points and win weekly rewards.
</p>



<Link
href="/arena/football"
className="inline-block mt-6 bg-black text-white px-5 py-3 rounded-xl font-bold hover:scale-105 transition"
>
Enter Arena →
</Link>


</div>





<div className="mt-6 grid grid-cols-2 gap-4">



<Link
href="/arena/leaderboard"
className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 hover:scale-105 transition"
>


<p className="text-3xl">
🏆
</p>


<h3 className="font-bold mt-3">
Leaderboard
</h3>


<p className="text-sm text-zinc-400 mt-1">
See top players
</p>


</Link>





<Link
href="/arena/rewards"
className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 hover:scale-105 transition"
>


<p className="text-3xl">
🎁
</p>


<h3 className="font-bold mt-3">
Rewards
</h3>


<p className="text-sm text-zinc-400 mt-1">
Claim your wins
</p>


</Link>



</div>





<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">


<h2 className="font-bold text-xl">
🔥 Coming Soon
</h2>


<ul className="mt-4 space-y-3 text-zinc-400">

<li>🎮 Mini Games</li>

<li>🔎 Alpha Search</li>

<li>🏅 More competitions</li>

</ul>


</div>



</div>



<BottomNav />


</main>

);

}
