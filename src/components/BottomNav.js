"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav(){

const pathname = usePathname();

const navItems = [

["/dashboard","🏠","Home"],

["/services","🛠️","Services"],

["/wallet","💳","Wallet"],

["/arena","🏆","Arena+"],

["/profile","👤","Profile"]

];


return(

<div className="fixed bottom-3 left-3 right-3 z-50">

<nav className="
max-w-md mx-auto
bg-white/90 dark:bg-[#1A1A1E]/90
backdrop-blur-xl
border border-zinc-200 dark:border-zinc-800
rounded-2xl
shadow-2xl
px-2 py-1.5
flex justify-around items-center
">


{navItems.map((item)=>(

<Link

key={item[0]}

href={item[0]}

className={`
flex flex-col items-center justify-center
gap-0.5 px-1.5 py-1 rounded-xl
text-[10px]
transition-all duration-200

${
pathname === item[0]

?

"bg-yellow-400/20 text-yellow-500 dark:text-yellow-400 font-bold scale-105 shadow-lg shadow-yellow-400/10 border border-yellow-400/20"

:

"text-zinc-800 dark:text-zinc-400 hover:text-yellow-400"

}

`}

>

<div className="text-base">

{item[1]}

</div>


<span>

{item[2]}

</span>


</Link>


))}


</nav>

</div>

);

}
