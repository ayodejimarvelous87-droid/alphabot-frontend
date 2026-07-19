"use client";

export default function PhoneInput({
value,
onChange,
beneficiaries=[],
placeholder="Phone number"
}){

const matches = beneficiaries.filter(item =>
(item.targetPhone || item.phone || "")
.includes(value)
&& value.length > 2
);

return (

<div className="w-full">

<div className="flex w-full overflow-hidden">

<div className="flex items-center px-3 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 border-r-0 rounded-l-xl text-sm">
+234
</div>

<input
type="tel"
className="flex-1 min-w-0 p-3 rounded-r-xl bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700"
placeholder={placeholder}
value={value}
onChange={(e)=>onChange(e.target.value)}
/>

</div>


{matches.length > 0 && (

<div className="mt-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden">

{matches.map((item,index)=>(

<button
key={index}
type="button"
onClick={()=>onChange(item.targetPhone || item.phone)}
className="block w-full text-left p-3 border-b dark:border-zinc-700"
>

{item.nickname || "Saved number"}  
<br/>
<span className="text-sm text-zinc-500">
{item.targetPhone || item.phone}
</span>

</button>

))}

</div>

)}

</div>

);

}
