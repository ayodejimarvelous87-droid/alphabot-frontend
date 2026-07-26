"use client";

import {useState} from "react";
import Link from "next/link";

export default function AIPage(){

const [message,setMessage]=useState("");
const [reply,setReply]=useState("");
const [loading,setLoading]=useState(false);


const askAI=async()=>{

if(!message)return;

try{

setLoading(true);

const res=await fetch(
"https://alphabot-1.onrender.com/ai/chat",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message
})
}
);

const data=await res.json();

setReply(data.reply || "No response");

}catch(error){

setReply("AI connection failed");

}finally{

setLoading(false);

}

};


return(
<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">

<div className="max-w-md mx-auto">

<Link
href="/dashboard"
className="text-yellow-500 font-semibold"
>
← Dashboard
</Link>


<div className="mt-8 bg-gradient-to-br from-zinc-900 to-black text-white rounded-3xl p-6 border border-zinc-800 shadow-xl">

<div className="text-5xl">
🤖
</div>

<h1 className="text-3xl font-black mt-5">
AlphaBot AI
</h1>


<p className="text-zinc-400 mt-3">
Ask questions and get help from AlphaBot AI.
</p>


<textarea
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Ask AlphaBot anything..."
className="w-full mt-5 p-3 rounded-xl bg-white text-black"
/>


<button
onClick={askAI}
disabled={loading}
className="mt-4 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
{loading ? "Thinking..." : "Ask AI"}
</button>


{reply && (
<div className="mt-5 bg-zinc-800 rounded-xl p-4 text-sm">
{reply}
</div>
)}


</div>


</div>

</main>
);

}
