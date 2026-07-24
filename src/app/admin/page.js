"use client";

import Link from "next/link";

export default function AdminDashboard(){

return(

<div className="p-6">

<h1 className="text-3xl font-bold">
👑 AlphaBot Admin Panel
</h1>


<p className="mt-2">
Manage users, wallets, services and transactions.
</p>



<div className="grid gap-4 mt-8">


<Link
href="/admin/users"
className="border rounded-xl p-5"
>
👥 Users Management
</Link>


<Link
href="/admin/wallets"
className="border rounded-xl p-5"
>
💰 Wallet Control
</Link>


<Link
href="/admin/transactions"
className="border rounded-xl p-5"
>
📜 Transactions
</Link>


<Link
href="/admin/withdrawals"
className="border rounded-xl p-5"
>
💸 Withdrawals
</Link>


<div className="border rounded-xl p-5">

<h2 className="font-bold mb-3">
⚙️ Service Management
</h2>


<div className="grid gap-3">


<Link
href="/admin/products"
className="border rounded-xl p-4"
>
📶 Data Plans & Products
</Link>


<Link
href="/admin/airtime"
className="border rounded-xl p-4"
>
📱 Airtime Pricing
</Link>


<Link
href="/admin/profits"
className="border rounded-xl p-4"
>
📈 Revenue & Profit
</Link>


</div>

</div>


</div>



<div className="mt-8 border rounded-xl p-5">

<h2 className="font-bold">
⚙️ Admin Tools
</h2>


<p>
Control AlphaBot services, pricing and operations from here.
</p>


</div>


</div>

);

}
