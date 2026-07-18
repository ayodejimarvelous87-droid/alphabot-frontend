"use client";

export default function PhoneInput({
value,
onChange,
placeholder="Phone number"
}){

return (

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

);

}
