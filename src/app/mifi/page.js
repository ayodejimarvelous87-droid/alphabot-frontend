"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function Mifi(){

const [products,setProducts]=useState([]);

useEffect(()=>{

fetch("https://api.alphabothq.com/products")
.then(res=>res.json())
.then(data=>{
setProducts(
data.filter(p=>p.type==="mifi")
);
});

},[]);


return(
<main className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white px-4 py-6 pb-24">

<div className="max-w-md mx-auto">

<h1 className="text-2xl font-black">
📡 MiFi
</h1>

<div className="grid grid-cols-2 gap-3 mt-5">

{products.map(product=>(

<div
key={product._id}
className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4"
>

<div className="text-3xl">
📡
</div>

<h2 className="font-bold mt-2">
{product.name}
</h2>

<p className="text-sm text-zinc-500">
{product.network}
</p>

</div>

))}

</div>

</div>

<BottomNav />

</main>
)

}
