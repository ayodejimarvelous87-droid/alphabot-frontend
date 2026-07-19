"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function Support(){

const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);

const [chat,setChat]=useState([
{
from:"bot",
text:"Hello 👋 I'm AlphaBot AI Support. How can I help you?"
}
]);


const sendMessage = async(text)=>{

const userMessage = text || message;

if(!userMessage.trim()) return;


setChat(prev=>[
...prev,
{
from:"user",
text:userMessage
}
]);


setMessage("");
setLoading(true);


try{

const response = await fetch(
"https://alphabot-1.onrender.com/ai/chat",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:userMessage
})
}
);


const data = await response.json();


setChat(prev=>[
...prev,
{
from:"bot",
text:data.reply
}
]);


}catch(error){

setChat(prev=>[
...prev,
{
from:"bot",
text:"Sorry, AlphaBot AI is currently unavailable."
}
]);

}


setLoading(false);

};



const faqs=[
"How do I fund my wallet?",
"How do I buy data?",
"How do referral rewards work?",
"How do I reset my password?"
];


return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto">

<h1 className="text-3xl font-bold">
Alpha<span className="text-yellow-400">Bot</span> Support 🤖
</h1>


<p className="text-zinc-500 dark:text-zinc-400 mt-2">
AI assistance and customer support
</p>


<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">


<h2 className="font-bold text-xl">
AI Assistant 🤖
</h2>


<div className="mt-4 space-y-3 max-h-60 overflow-y-auto">

{chat.map((item,index)=>(

<div
key={index}
className={item.from==="user" ? "text-right":"text-left"}
>

<span className="inline-block bg-white dark:bg-black rounded-xl p-3 text-sm">
{item.text}
</span>

</div>

))}


{loading && (
<div className="text-left">
<span className="inline-block bg-white dark:bg-black rounded-xl p-3 text-sm">
Typing...
</span>
</div>
)}

</div>



<div className="flex gap-2 mt-5">

<input
className="flex-1 p-3 rounded-xl bg-white dark:bg-black border"
placeholder="Ask AlphaBot..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>


<button
onClick={()=>sendMessage()}
className="bg-yellow-400 text-black px-4 rounded-xl font-bold"
>
Send
</button>

</div>


</div>



<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">

<h2 className="text-xl font-bold">
WhatsApp Support 💬
</h2>

<p className="mt-3 text-zinc-500">
Need human assistance? Chat with our team.
</p>


<a
href="https://wa.me/2349037120624"
className="block text-center mt-5 bg-green-500 text-white py-3 rounded-xl font-bold"
>
Chat on WhatsApp
</a>

</div>



<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">

<h2 className="text-xl font-bold">
Frequently Asked Questions
</h2>


<div className="mt-4 space-y-3">

{faqs.map((faq,index)=>(

<button
key={index}
onClick={()=>sendMessage(faq)}
className="block w-full text-left text-zinc-500 hover:text-yellow-400"
>
• {faq}
</button>

))}

</div>

</div>


</div>


<BottomNav />

</main>

);

}
