"use client";

import {useState} from "react";
import Link from "next/link";

export default function AIPage(){

const [message,setMessage]=useState("");
const [chat,setChat]=useState([]);
const [loading,setLoading]=useState(false);


const askAI=async()=>{

if(!message.trim()) return;


const userMessage = message;

setChat(prev=>[
...prev,
{
role:"user",
text:userMessage
}
]);

setMessage("");

try{

setLoading(true);


const res=await fetch(
"https://api.alphabothq.com/ai/chat",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify({
message:userMessage
})
}
);


const data=await res.json();


setChat(prev=>[
...prev,
{
role:"ai",
text:data.reply || "No response"
}
]);


}catch(error){

setChat(prev=>[
...prev,
{
role:"ai",
text:"Orion connection failed"
}
]);

}finally{

setLoading(false);

}

};


return(

<main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8">

<div className="max-w-md mx-auto">


<Link
href="/dashboard"
className="text-yellow-500 font-semibold"
>
← Dashboard
</Link>


<div className="mt-6 bg-gradient-to-br from-zinc-100 via-white to-zinc-50 text-zinc-950 dark:from-zinc-900 dark:to-black dark:text-white rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xl">


<div className="flex items-center gap-3">

<div className="text-4xl">
🤖
</div>

<div>

<h1 className="text-2xl font-black">
Orion
</h1>

<p className="text-zinc-500 dark:text-zinc-400 text-sm">
Your AlphaBot support assistant
</p>

</div>

</div>



<div className="mt-6 h-[420px] overflow-y-auto space-y-4 bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-transparent rounded-2xl p-4">


{chat.length===0 && (

<div className="text-center text-zinc-500 text-sm mt-10">
HI 👋 I'M ORION. How can I help you today?
</div>

)}


{chat.map((item,index)=>(

<div
key={index}
className={
item.role==="user"
?
"flex justify-end"
:
"flex justify-start"
}
>

<div
className={
item.role==="user"
?
"bg-yellow-400 text-black rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]"
:
"bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]"
}
>

{item.text}

</div>

</div>

))}


{loading && (

<div className="flex justify-start">

<div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 py-3 text-zinc-500 dark:text-zinc-400">
Orion is typing...
</div>

</div>

)}


</div>



<div className="mt-4 space-y-3">


<textarea
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Message Orion..."
className="w-full p-3 rounded-xl bg-white text-zinc-950 border border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
/>



<button
onClick={askAI}
disabled={loading}
className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>

{loading ? "Thinking..." : "Send"}

</button>


</div>


</div>


</div>

</main>

);

}
