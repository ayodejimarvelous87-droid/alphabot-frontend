import Link from "next/link";

export default function Home(){

return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">


<nav className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">

<h1 className="text-2xl font-bold">
Alpha<span className="text-yellow-400">Bot</span>
</h1>


<div className="flex gap-5 text-sm text-zinc-300">

<Link href="/about">
About
</Link>

<Link href="/contact">
Contact
</Link>

<Link href="/login">
Login
</Link>

</div>


</nav>




<section className="px-6 py-24 text-center">


<h2 className="text-5xl font-bold">
Smart Digital Payments
<br/>
Made Simple
</h2>



<p className="text-zinc-400 mt-6 max-w-xl mx-auto">

AlphaBot provides wallet, airtime, data and digital
payment solutions in one secure platform.

</p>



<div className="mt-8 flex justify-center gap-4">


<Link
href="/register"
className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold"
>
Get Started
</Link>


<Link
href="/login"
className="border border-zinc-700 px-8 py-3 rounded-full"
>
Login
</Link>


</div>


</section>




<section className="px-6 pb-20">

<h3 className="text-2xl font-bold mb-6">
Our Services
</h3>



<div className="grid grid-cols-2 md:grid-cols-4 gap-4">


{[
"Airtime",
"Data",
"Wallet",
"Bills"
].map(service=>(


<div
key={service}
className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center"
>

{service}

</div>


))}


</div>


</section>




<footer className="border-t border-zinc-800 px-6 py-8 text-zinc-400">


<div className="flex flex-wrap gap-5 justify-center text-sm">


<Link href="/about">
About
</Link>


<Link href="/contact">
Contact
</Link>


<Link href="/terms">
Terms
</Link>


<Link href="/privacy">
Privacy
</Link>


</div>



<p className="text-center mt-6 text-xs">
© {new Date().getFullYear()} AlphaBot. All rights reserved.
</p>


</footer>



</main>

)

}
