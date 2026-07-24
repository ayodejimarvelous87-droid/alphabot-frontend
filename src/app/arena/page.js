"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Arena(){

return(

<main className="min-h-screen bg-[#050505] text-white px-6 py-6 pb-24">

<div className="max-w-md mx-auto">


{/* HEADER */}

<div className="flex items-center gap-3">

<div className="w-11 h-11 rounded-xl bg-[#18181B] border border-zinc-700 flex items-center justify-center">

<span className="text-xl font-black bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
A+
</span>

</div>


<div>

<h1 className="text-2xl font-black">
Arena+
</h1>

<p className="text-xs text-zinc-500">
AlphaBot Competition Zone
</p>

</div>


</div>





{/* HERO */}


<div className="mt-8 bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl">


<p className="text-yellow-400 text-sm font-bold">
🏆 Compete & Win
</p>


<h2 className="text-3xl font-black mt-3 leading-tight">

Predict.
<br/>

<span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
Earn Rewards.
</span>

</h2>


<p className="text-zinc-400 mt-4 text-sm leading-relaxed">

Join football predictions, collect points, climb the leaderboard and compete with other players.

</p>



<Link
href="/arena/football"
className="inline-block mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
>

⚽ Enter Arena →

</Link>


</div>





{/* FEATURES */}


<div className="mt-6 grid grid-cols-2 gap-4">



<Link
href="/arena/leaderboard"
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 hover:border-zinc-500 transition"
>


<div className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center text-xl">

🏆

</div>


<h3 className="font-bold mt-4">
Leaderboard
</h3>


<p className="text-xs text-zinc-400 mt-2">
See top players and rankings
</p>


</Link>





<Link
href="/arena/rewards"
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 hover:border-zinc-500 transition"
>


<div className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center text-xl">

🎁

</div>


<h3 className="font-bold mt-4">
Rewards
</h3>


<p className="text-xs text-zinc-400 mt-2">
Claim your competition wins
</p>


</Link>



</div>






{/* COMING SOON */}


<div className="mt-6 bg-[#18181B] border border-zinc-800 rounded-3xl p-5">


<h2 className="text-xl font-bold">
🔥 Coming Soon
</h2>


<div className="mt-4 space-y-3 text-zinc-400 text-sm">

<p>
🎮 Mini Games
</p>

<p>
🔎 Alpha Search
</p>

<p>
🏅 More Competitions
</p>


</div>


</div>



</div>


<BottomNav />


</main>

);

}
