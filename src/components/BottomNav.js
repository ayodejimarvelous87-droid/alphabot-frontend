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

<div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 rounded-t-3xl flex justify-around py-3">


{navItems.map((item)=>(

<Link

key={item[0]}

href={item[0]}

className={`text-center text-xs transition ${
pathname === item[0]
? "text-yellow-400 font-bold scale-110"
: "text-zinc-700 dark:text-zinc-300 hover:text-yellow-400"
}`}

>


<div className="text-xl">

{item[1]}

</div>


{item[2]}


</Link>


))}


</div>

);


}
