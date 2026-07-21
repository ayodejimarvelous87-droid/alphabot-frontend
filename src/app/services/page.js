"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Services(){

const [products,setProducts]=useState([]);
const [loading,setLoading]=useState(true);


const getServiceLink=(type)=>{

const routes={
"airtime":"/airtime",
"data":"/data",
"electricity":"/electricity",
"tv":"/tv",
"betting":"/betting",
"exam-pin":"/exam-pin",
"airtime-cash":"/airtime-cash",
"bank":"/bank",
"mifi":"/data"
};

return routes[type] || "/services";

};



useEffect(()=>{

fetch("https://alphabot-1.onrender.com/products")

.then(res=>res.json())

.then(data=>{

setProducts(data);
setLoading(false);

})

.catch(()=>{

setLoading(false);

});

},[]);



return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto">

<h1 className="text-3xl font-bold">
Services 🛠️
</h1>

<p className="text-zinc-500 mt-2">
Choose any AlphaBot service
</p>


<div className="grid grid-cols-2 gap-4 mt-8">


<Link
href="/arena"
className="bg-yellow-400 text-black rounded-3xl p-5 hover:scale-105 active:scale-95 transition"
>

<div className="text-4xl">
🏆
</div>

<h2 className="font-bold mt-4">
Arena+
</h2>

<p className="text-xs mt-2">
Football predictions & rewards
</p>

</Link>

<Link
href="/tv"
className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 hover:border-yellow-400 active:scale-95 transition duration-150"
>
<div className="text-4xl">
📺
</div>
<h2 className="font-bold mt-4">
TV
</h2>
<p className="text-xs text-zinc-500 mt-2">
DStv, GOtv & Startimes subscriptions
</p>
</Link>


{loading ? (

<p className="text-zinc-500 mt-5">
Loading services...
</p>

) : (

(products.filter(product=>product.type!=="tv")).map((product)=>(

<Link
key={product._id}
href={getServiceLink(product.type)}
className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 hover:border-yellow-400 active:scale-95 transition duration-150"
>

<div className="text-4xl">
🛒
</div>

<h2 className="font-bold mt-4">
{product.name}
</h2>

<p className="text-xs text-zinc-500 mt-2">
{product.network} • {product.type}
<br/>
₦{product.price}
</p>

</Link>

))

)}


</div>

</div>

<BottomNav />

</main>

);

}
