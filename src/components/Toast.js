
"use client";

import {useEffect} from "react";

export default function Toast({message,type="info",onClose}){

useEffect(()=>{

if(!message) return;

const timer=setTimeout(()=>{

if(onClose) onClose();

},2500);

return ()=>clearTimeout(timer);

},[message,onClose]);


if(!message) return null;


return(

<div
className={`
fixed
bottom-8
left-1/2
-translate-x-1/2
z-50
px-5
py-3
rounded-2xl
text-white
shadow-2xl
border
border-zinc-700
animate-bounce
${
type==="error"
?"bg-red-600"
:
type==="success"
?"bg-[#18181B]"
:
"bg-[#18181B]"
}
`}
>

{message}

</div>

);

}
