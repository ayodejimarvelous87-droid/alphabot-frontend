"use client";

import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";

export default function ServiceLayout({
icon,
title,
subtitle,
children,
message,
type="error"
}){

return (

<main className="
h-screen
overflow-hidden
bg-white text-black
dark:bg-[#0A0A0A] dark:text-white
px-3 py-3
">

<div className="max-w-md mx-auto h-full flex flex-col">


<header className="shrink-0 mb-2">

<h1 className="text-xl font-black">
{icon} {title}
</h1>

<p className="text-xs text-zinc-500 dark:text-zinc-400">
{subtitle}
</p>

</header>



<section className="
flex-1
overflow-hidden
bg-zinc-100
dark:bg-[#121214]
border border-zinc-200
dark:border-zinc-800
rounded-2xl
p-3
">


{children}


</section>



<Toast
message={message}
type={type}
/>


</div>


<BottomNav/>

</main>

);

}
