"use client";

export default function AdminTopbar(){

return (

<header className="
h-20
bg-[#101012]
border-b
border-zinc-800
flex
items-center
justify-between
px-6
md:px-8
">

<div>

<h2 className="
font-black
text-xl
tracking-tight
">
AlphaBot Admin
</h2>

<p className="
text-xs
text-zinc-500
mt-1
">
Control Center
</p>

</div>


<div className="
flex
items-center
gap-3
">

<div className="
hidden
md:block
bg-[#18181B]
border
border-zinc-800
rounded-xl
px-4
py-2
text-sm
text-zinc-400
">

Search

</div>


<div className="
bg-white
text-black
rounded-full
w-10
h-10
flex
items-center
justify-center
font-black
">

A

</div>


</div>


</header>

);

}
