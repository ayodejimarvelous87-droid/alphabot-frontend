"use client";

export default function PhoneInput({
value,
onChange,
beneficiaries=[],
service=""
}){

const matches = beneficiaries.filter(item =>
(item.beneficiary_phone || "").includes(value)
&& value.length > 1
&& (!service || item.service === service)
);


return (

<div className="w-full">

<div className="flex w-full overflow-hidden">

<div className="flex items-center px-3 bg-yellow-400 text-black border rounded-l-xl text-sm font-bold">
+234
</div>

<input
type="tel"
className="flex-1 min-w-0 p-3 rounded-r-xl bg-white dark:bg-black border"
placeholder="Phone number"
value={value}
onChange={(e)=>onChange(e.target.value)}
/>

</div>


{matches.length > 0 && (

<div className="mt-3 space-y-2">

{matches.map((item,index)=>(

<button
key={index}
type="button"
onClick={()=>onChange(item.beneficiary_phone)}
className="w-full text-left bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 border hover:border-yellow-400 transition"
>

<div className="flex justify-between">

<div>

<p className="font-bold">
{item.name}
</p>

<p className="text-sm text-zinc-500">
📞 {item.beneficiary_phone}
</p>

</div>


<div className="text-xl">

{
item.service==="data"
?
"🌐"
:
item.service==="airtime"
?
"📱"
:
item.service==="tv"
?
"📺"
:
"⚡"
}

</div>

</div>


<p className="text-xs text-yellow-500 mt-2 uppercase">
{item.service}
</p>


</button>

))}

</div>

)}

</div>

);

}
