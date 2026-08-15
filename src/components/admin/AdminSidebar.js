"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";

export default function AdminSidebar(){

const pathname = usePathname();

const [open,setOpen] = useState(false);
const [users,setUsers] = useState(false);
const [finance,setFinance] = useState(false);
const [services,setServices] = useState(false);


const active=(path)=>
pathname===path
? "bg-white text-black"
: "text-zinc-300 hover:bg-[#18181B]";


return (

<>

<button
onClick={()=>setOpen(!open)}
className="fixed top-4 left-4 z-50 bg-[#18181B] text-white rounded-xl p-3 border border-zinc-800"
>
☰
</button>


{open && (

<aside className="fixed top-0 left-0 z-40 w-64 h-screen overflow-y-auto border-r border-zinc-800 bg-[#101012] text-white p-5 shadow-2xl">


<h1 className="text-xl font-bold mb-6">
🤖 AlphaBot
</h1>


<Link
href="/admin"
className={`block rounded-lg px-3 py-2 ${active("/admin")}`}
>
📊 Dashboard
</Link>


<button
onClick={()=>setUsers(!users)}
className="w-full text-left mt-4 px-3 py-2 rounded-lg hover:bg-[#18181B]"
>
👥 User Management {users?"▼":"▶"}
</button>


{users && (
<div className="ml-3 space-y-2 mt-2">

<Link href="/admin/users" className="block p-2 hover:bg-[#18181B] rounded">
Users
</Link>

<Link href="/admin/blog-partners" className="block p-2 hover:bg-[#18181B] rounded">
👥 Blog Partners
</Link>

</div>
)}



<button
onClick={()=>setFinance(!finance)}
className="w-full text-left mt-4 px-3 py-2 rounded-lg hover:bg-[#18181B]"
>
💰 Finance {finance?"▼":"▶"}
</button>


{finance && (
<div className="ml-3 space-y-2 mt-2">

<Link href="/admin/transactions" className="block p-2 hover:bg-[#18181B] rounded">
💳 Transactions
</Link>

<Link href="/admin/blog-payouts" className="block p-2 hover:bg-[#18181B] rounded">
📝 Blog Payouts
</Link>

<Link href="/admin/blog-payout-history" className="block p-2 hover:bg-[#18181B] rounded">
📜 Blog Payout History
</Link>

<Link href="/admin/funding" className="block p-2 hover:bg-[#18181B] rounded">
💰 Funding
</Link>

</div>
)}



<Link
href="/admin/orders"
className="block mt-4 px-3 py-2 rounded-lg hover:bg-[#18181B]"
>
📦 Orders Management
</Link>



<Link
href="/admin/notifications"
className="block mt-4 px-3 py-2 rounded-lg hover:bg-[#18181B]"
>
📢 Broadcast
</Link>



<button
onClick={()=>setServices(!services)}
className="w-full text-left mt-4 px-3 py-2 rounded-lg hover:bg-[#18181B]"
>
⚡ Service Management {services?"▼":"▶"}
</button>


{services && (

<div className="ml-3 mt-2 space-y-2">

<Link href="/admin/products" className="block p-2 hover:bg-[#18181B] rounded">
📦 Data Plans
</Link>

<Link href="/admin/airtime" className="block p-2 hover:bg-[#18181B] rounded">
📱 Airtime
</Link>

<Link href="/admin/electricity" className="block p-2 hover:bg-[#18181B] rounded">
⚡ Electricity
</Link>

<Link href="/admin/tv" className="block p-2 hover:bg-[#18181B] rounded">
📺 TV
</Link>

<Link href="/admin/betting" className="block p-2 hover:bg-[#18181B] rounded">
🎲 Betting
</Link>

<Link href="/admin/recurring" className="block p-2 hover:bg-[#18181B] rounded">
🔁 Recurring
</Link>

</div>

)}



<Link
href="/admin/football"
className="block mt-4 px-3 py-2 rounded-lg hover:bg-[#18181B]"
>
⚽ Football Rewards
</Link>


<Link
href="/admin/settings"
className="block mt-4 px-3 py-2 rounded-lg hover:bg-[#18181B]"
>
⚙️ System Settings
</Link>


</aside>

)}

</>

);

}
