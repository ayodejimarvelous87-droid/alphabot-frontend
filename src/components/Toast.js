"use client";

export default function Toast({message,type="info"}){

if(!message) return null;

return(
<div
className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-white shadow-lg ${
type==="error"
? "bg-red-500"
: type==="success"
? "bg-green-500"
: "bg-zinc-900"
}`}
>
{message}
</div>
);

}
