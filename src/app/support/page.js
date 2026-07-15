"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function Support(){

const [message,setMessage]=useState("");
const [chat,setChat]=useState([
{
from:"bot",
text:"Hello 👋 I'm AlphaBot AI Support. How can I help you?"
}
]);


const sendMessage=()=>{

if(!message.trim()) return;


setChat([
...chat,
{
from:"user",
text:message
},
{
from:"bot",
text:"Thanks for your message. Our support system is processing your request."
}
]);


setMessage("");

};


return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
Alpha<span className="text-yellow-400">Bot</span> Support 🤖
</h1>


<p className="text-zinc-500 dark:text-zinc-400 mt-2">
AI assistance and customer support
</p>



<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5">


<h2 className="font-bold text-xl">
AI Assistant 🤖
</h2>


<div className="mt-4 space-y-3 max-h-60 overflow-y-auto">

{chat.map((item,index)=>(

<div
key={index}
className={
item.from==="user"
? "text-right"
: "text-left"
}
>

<span className="inline-block bg-white dark:bg-black rounded-xl p-3 text-sm">
{item.text}
</span>

</div>

))}

</div>



<div className="flex gap-2 mt-5">

<input
className="flex-1 p-3 rounded-xl bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700"
placeholder="Ask AlphaBot..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>


<button
onClick={sendMessage}
className="bg-yellow-400 text-black px-4 rounded-xl font-bold"
>
Send
</button>


</div>


</div>




<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">


<h2 className="text-xl font-bold">
WhatsApp Support 💬
</h2>


<p className="text-zinc-500 dark:text-zinc-400 mt-3">
Need human assistance? Chat with our team.
</p>


<a
href="https://wa.me/234XXXXXXXXXX"
className="block text-center mt-5 bg-green-500 text-white py-3 rounded-xl font-bold"
>
Chat on WhatsApp
</a>


</div>



<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Frequently Asked Questions
</h2>


<ul className="mt-4 space-y-3 text-zinc-500 dark:text-zinc-400">

<li>• How do I fund my wallet?</li>
<li>• How do I buy data?</li>
<li>• How do referral rewards work?</li>
<li>• How do I reset my password?</li>

</ul>


</div>


</div>


<BottomNav />

</main>

);

}
