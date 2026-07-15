"use client";

import Link from "next/link";

export default function BottomNav(){

return(

<div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-white">


<Link href="/dashboard" className="text-center text-xs">
<div className="text-xl">🏠</div>
Home
</Link>


<Link href="/services" className="text-center text-xs">
<div className="text-xl">🛠️</div>
Services
</Link>


<Link href="/wallet" className="text-center text-xs">
<div className="text-xl">💳</div>
Wallet
</Link>


<Link href="/support" className="text-center text-xs">
<div className="text-xl">🤖</div>
Support
</Link>


<Link href="/profile" className="text-center text-xs">
<div className="text-xl">👤</div>
Profile
</Link>


</div>

);

}
