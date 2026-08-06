"use client";

import {useEffect,useState,useRef} from "react";
import {useRouter} from "next/navigation";

export default function FootballChat(){

const router = useRouter();

const [messages,setMessages]=useState([]);
const [text,setText]=useState("");
const [loading,setLoading]=useState(false);
const [cooldown,setCooldown]=useState(false);

const activeFans = [
...new Set(messages.map(msg=>msg.user))
].length;
const [currentUser,setCurrentUser]=useState(null);

const chatEndRef = useRef(null);

useEffect(()=>{
  if(chatEndRef.current){
    chatEndRef.current.scrollIntoView({
      behavior:"smooth"
    });
  }
},[messages]);

const bottomRef = useRef(null);


const loadMessages = async()=>{

const token = localStorage.getItem("token");

if(!token){
router.push("/login");
return;
}


const res = await fetch(
"https://alphabot-1.onrender.com/football/chat",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data = await res.json();


if(Array.isArray(data)){
setMessages(data);
}

};



useEffect(()=>{

const user = JSON.parse(
localStorage.getItem("user")
);

setCurrentUser(user);

loadMessages();

const timer=setInterval(
loadMessages,
5000
);

return ()=>clearInterval(timer);

},[]);


useEffect(()=>{

bottomRef.current?.scrollIntoView({
behavior:"smooth"
});

},[messages]);



const reactToMessage = async(id,reaction)=>{

const token = localStorage.getItem("token");

await fetch(
`https://alphabot-1.onrender.com/football/chat/${id}/react`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
reaction
})
}
);

loadMessages();

};

const sendMessage = async()=>{

if(!text.trim() || cooldown) return;


const token = localStorage.getItem("token");


setLoading(true);
setCooldown(true);


const res = await fetch(
"https://alphabot-1.onrender.com/football/chat",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
message:text
})
}
);


const data = await res.json();


if(res.ok){

setText("");

setMessages(prev=>[
...prev,
data
]);

// Refresh chat to catch AI replies
setTimeout(()=>{
loadMessages();
},6000);

setTimeout(()=>{
loadMessages();
},15000);

}


setTimeout(()=>{
setCooldown(false);
},3000);

setLoading(false);

};



return(

<main className="
min-h-screen
bg-[#050505]
text-white
px-6
py-6
pb-24
">

<div className="max-w-md mx-auto">


<button
onClick={()=>router.push("/arena/football")}
className="
text-yellow-400
font-bold
mb-4
"
>
← Back to Arena
</button>


<div className="
bg-[#18181B]
border
border-zinc-800
rounded-3xl
p-5
shadow-xl
">

<p className="text-yellow-400 font-black text-sm">
⚽ AlphaBot Arena+
</p>

<h1 className="
text-3xl
font-black
mt-2
">
Football Chat Arena
</h1>

<p className="text-zinc-400 text-sm mt-3 flex items-center gap-2">

<span className="
w-2
h-2
bg-green-400
rounded-full
animate-pulse
">
</span>

{activeFans || 0} fans active

</p>

<p className="text-zinc-500 text-sm mt-1">
🔥 Discuss matches • 🏆 Predictions • ⚽ Football banter
</p>

<p className="text-green-400 text-sm mt-2">
🟢 Arena Live • Week Predictions Discussion
</p>

</div>


<div className="
mt-4
bg-[#18181B]
border
border-yellow-400/20
rounded-3xl
p-4
">

<p className="
text-yellow-400
font-black
text-sm
">
📌 Arena Rules
</p>

<p className="text-zinc-400 text-sm mt-3">
⚽ Keep it football<br/>
🚫 No spam or fake links<br/>
🤝 Respect other fans<br/>
🏆 Enjoy the competition
</p>

</div>



<p className="text-zinc-400 text-sm mt-2">
Discuss matches, predictions and football
</p>


<div className="
mt-6
bg-[#18181B]
border
border-zinc-800
rounded-3xl
p-4
h-[450px]
overflow-y-auto
space-y-3
">


{messages.map((msg)=>(

<div
key={msg._id}
className={`
flex
${currentUser?.id?.toString() === msg.user?.toString() ? "justify-end" : "justify-start"}
`}
>

<div
className={`
max-w-[80%]
rounded-2xl
p-3
${currentUser?.id?.toString() === msg.user?.toString()
? "bg-yellow-400 text-black"
: "bg-black border border-zinc-900 text-white"}
`}
>

<p className={`
font-bold
text-sm
${currentUser?.id?.toString() === msg.user?.toString()
? "text-black"
: "text-yellow-400"}
`}>
{currentUser?.id?.toString() === msg.user?.toString() ? "You" : `⚽ ${msg.name}`}
</p>

<p className="mt-1">
{msg.message}
</p>

<div className="flex gap-2 mt-3 text-xs">

<button onClick={()=>reactToMessage(msg._id,"fire")}>
🔥 {msg.reactions?.fire || 0}
</button>

<button onClick={()=>reactToMessage(msg._id,"laugh")}>
😂 {msg.reactions?.laugh || 0}
</button>

<button onClick={()=>reactToMessage(msg._id,"football")}>
⚽ {msg.reactions?.football || 0}
</button>

<button onClick={()=>reactToMessage(msg._id,"agree")}>
👍 {msg.reactions?.agree || 0}
</button>

</div>

<p className={`
text-[10px]
mt-2
${currentUser?.id?.toString() === msg.user?.toString()
? "text-black/60"
: "text-zinc-500"}
`}>
{new Date(msg.createdAt).toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})}
</p>

</div>

</div>

))}


</div>

<div ref={chatEndRef} />

<div className="flex gap-2 mt-4">


<textarea
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder="Type message..."
rows="1"
className="
flex-1
bg-[#18181B]
border
border-zinc-800
rounded-xl
px-4
py-3
resize-y
min-h-[45px]
max-h-32
"
/>


<button
onClick={sendMessage}
disabled={loading || cooldown}
className="
bg-yellow-400
text-black
font-bold
px-5
rounded-xl
"
>
Send
</button>


</div>


</div>

</main>

);

}
