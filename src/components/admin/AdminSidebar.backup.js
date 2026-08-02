"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";

export default function AdminSidebar(){

const pathname = usePathname();

const [open,setOpen] = useState(false);
const [services,setServices] = useState(false);
const [finance,setFinance] = useState(false);


const active = (path)=>
pathname === path
? "bg-blue-600 text-white"
: "text-zinc-300 hover:bg-zinc-800";


return (

<>
<button
onClick={()=>setOpen(!open)}
className="fixed top-4 left-4 z-50 bg-[#111827] text-white rounded-xl p-3 shadow-xl"
>
🏠
</button>

{open && (

<aside className="fixed top-0 left-0 z-40 w-64 min-h-screen bg-[#111827] text-white p-5 shadow-2xl border-r border-zinc-800">


<h1 className="text-lg font-bold mb-6">
🤖 AlphaBot
</h1>


<p className="text-xs text-blue-400 font-bold mb-3">
MAIN
</p>


<Link
href="/admin"
className={`rounded-lg px-3 py-2 ${active("/admin")}`}
>
📊 Dashboard
</Link>



<p className="text-xs text-blue-400 font-bold mt-6 mb-3">
MANAGEMENT
</p>


<Link
href="/admin/users"
className={`rounded-lg px-3 py-2 ${active("/admin/users")}`}
>
👥 Users
</Link>



<button
onClick={()=>setServices(!services)}
className="w-full text-left rounded-lg px-3 py-2 hover:bg-zinc-800"
>
⚡ Services {services ? "▼":"▶"}
</button>


{services && (

<div className="ml-3 mt-2 space-y-2">

<Link
href="/admin/services"
className={`block px-3 py-2 rounded-lg ${active("/admin/services")}`}
>
⚙ Service Settings
</Link>

<Link
href="/admin/products"
className={`block px-3 py-2 rounded-lg ${active("/admin/products")}`}
>
📦 Products
</Link>

<Link
href="/admin/airtime"
className={`block px-3 py-2 rounded-lg ${active("/admin/airtime")}`}
>
📱 Airtime
</Link>

<Link
href="/admin/electricity"
className={`block px-3 py-2 rounded-lg ${active("/admin/electricity")}`}
>
⚡ Electricity
</Link>

<Link
href="/admin/tv"
className={`block px-3 py-2 rounded-lg ${active("/admin/tv")}`}
>
📺 TV
</Link>

<Link
href="/admin/betting"
className={`block px-3 py-2 rounded-lg ${active("/admin/betting")}`}
>
🎲 Betting
</Link>

</div>

)}




<p className="text-xs text-blue-400 font-bold mt-6 mb-3">
FINANCE
</p>


<button
onClick={()=>setFinance(!finance)}
className="w-full text-left rounded-lg px-3 py-2 hover:bg-zinc-800"
>
💰 Finance {finance ? "▼":"▶"}
</button>


{finance && (

<div className="ml-3 mt-2 space-y-2">

<Link
href="/admin/transactions"
className={`block px-3 py-2 rounded-lg ${active("/admin/transactions")}`}
>
💳 Transactions
</Link>


<Link
href="/admin/withdrawals"
className={`block px-3 py-2 rounded-lg ${active("/admin/withdrawals")}`}
>
💸 Withdrawals
</Link>


<Link
href="/admin/funding"
className={`block px-3 py-2 rounded-lg ${active("/admin/funding")}`}
>
💰 Funding
</Link>


</div>

)}




<p className="text-xs text-blue-400 font-bold mt-6 mb-3">
SYSTEM
</p>


<Link
href="/admin/settings"
className={`rounded-lg px-3 py-2 ${active("/admin/settings")}`}
>
⚙ Settings
</Link>


<Link
href="/admin/notifications"
className={`rounded-lg px-3 py-2 mt-2 ${active("/admin/notifications")}`}
>
🔔 Notifications
</Link>


</aside>

)}

</>

);

}