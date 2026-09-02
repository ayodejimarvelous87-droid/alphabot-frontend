"use client";

import Link from "next/link";

import { useEffect, useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";

export default function Notifications(){

const [notifications,setNotifications]=useState([]);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(true);
const [activeFilter,setActiveFilter]=useState("all");



useEffect(()=>{

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));


if(!user){

// No user session means there is nothing to load.
// eslint-disable-next-line react-hooks/set-state-in-effect
setMessage("User session expired");
setLoading(false);
return;

}


fetch(
`https://api.alphabothq.com/notifications/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

.then(res=>res.json())

.then(data=>{

if(Array.isArray(data)){
setNotifications(data);
}

setLoading(false);

})

.catch(()=>{

setMessage("Unable to load notifications");
setLoading(false);

});


},[]);




const markRead = async(id)=>{

const token=localStorage.getItem("token");


setNotifications(prev=>

prev.map(item=>

item._id===id

?

{...item,read:true}

:

item

)

);



try{

await fetch(
`https://api.alphabothq.com/notifications/read/${id}`,
{
method:"PATCH",
headers:{
Authorization:`Bearer ${token}`
}
}
);


}catch(error){

setMessage("Failed to update notification");

}


};


const markAllRead = async()=>{

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if(!user) return;

setNotifications(prev=>
prev.map(item=>({
...item,
read:true
}))
);

try{

await fetch(
`https://api.alphabothq.com/notifications/read-all/${user.phone}`,
{
method:"PATCH",
headers:{
Authorization:`Bearer ${token}`
}
}
);

}catch(error){

setMessage("Failed to mark all as read");

}

};





const filteredNotifications=useMemo(()=>{

return notifications.filter(item=>{

if(activeFilter==="all") return true;

if(activeFilter==="unread") return !item.read;

if(activeFilter==="marketplace"){
return [
"marketplace_order",
"marketplace_payment",
"marketplace_delivery",
"marketplace_completed"
].includes(item.type);
}

return item.type===activeFilter;

});


},[notifications,activeFilter]);




const icons={

wallet:"💳",

payment:"⚡",

reward:"🏆",

marketplace_order:"🛍️",
marketplace_payment:"💰",
marketplace_delivery:"🚚",
marketplace_completed:"✅",

default:"🔔"

};



return(

<main className="
min-h-screen
bg-white text-black
dark:bg-[#0A0A0A] dark:text-white
px-4 py-8 pb-28
">


<div className="max-w-md mx-auto">


<header className="mb-6">


<div className="flex justify-between items-center">


<h1 className="text-3xl font-black">
Notifications 🔔
</h1>


<span className="
text-xs
font-bold
px-3 py-1
rounded-full
bg-yellow-400
text-black
">

{notifications.filter(n=>!n.read).length} Unread

</span>


</div>



<p className="text-zinc-500 dark:text-zinc-400 mt-2">
Stay updated with your AlphaBot activities
</p>

{
notifications.some(n=>!n.read) && (

<button
onClick={markAllRead}
className="
mt-4
text-sm
bg-yellow-400
text-black
px-4
py-2
rounded-xl
font-bold
"
>

Mark All as Read

</button>

)
}


</header>





{!loading && notifications.length>0 && (

<div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">


{
[
["all","All"],
["unread","Unread"],
["wallet","Wallet"],
["payment","Payments"],
["reward","Rewards"],
["marketplace","Marketplace"]

].map(tab=>(


<button

key={tab[0]}

onClick={()=>setActiveFilter(tab[0])}

className={`
px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap

${
activeFilter===tab[0]

?

"bg-yellow-400 text-black"

:

"bg-zinc-100 dark:bg-[#1A1A1E] text-zinc-500 border border-zinc-800"

}

`}

>

{tab[1]}

</button>


))

}


</div>

)}






{loading ? (


<div className="space-y-3">

{
[1,2,3].map(i=>(

<div
key={i}
className="
h-28
rounded-3xl
bg-zinc-200
dark:bg-[#1A1A1E]
animate-pulse
"
/>

))

}

</div>



) : filteredNotifications.length===0 ? (


<div className="
mt-5
bg-zinc-100
dark:bg-[#121214]
border border-zinc-200
dark:border-zinc-800
rounded-3xl
p-10
text-center
">


<div className="text-4xl">
🔔
</div>


<p className="font-bold mt-3">
No notifications yet
</p>


<p className="text-sm text-zinc-500 mt-2">
We will notify you about wallet, services and rewards.
</p>


</div>



) : (



<div className="space-y-3">


{
filteredNotifications.map(item=>(


<Link

href={`/notifications/${item._id}`}

key={item._id}

className={`
relative
overflow-hidden
rounded-3xl
p-4
border

${
item.read

?

"bg-[#1A1A1E] border-zinc-800"

:

"bg-[#1A1A1E] border-yellow-400/40 shadow-lg shadow-yellow-400/5"

}

`}

>


{!item.read && (

<div className="
absolute
left-0
top-0
bottom-0
w-1
bg-yellow-400
"/>

)}



<div className="flex gap-3">


<div className="
w-10 h-10
rounded-2xl
bg-yellow-400/10
flex items-center justify-center
text-xl
">

{icons[item.type] || icons.default}

</div>




<div className="flex-1">


<div className="flex justify-between gap-2">


<h2 className="font-bold text-sm">

{item.title || "AlphaBot Update"}

</h2>



{!item.read && (

<span className="
text-[10px]
font-bold
text-yellow-400
">

NEW

</span>

)}


</div>




<p className="
text-sm
text-zinc-400
mt-2
">

{item.message}

</p>




<div className="
flex justify-between
items-center
mt-4
pt-3
border-t
border-zinc-800
">


<span className="text-xs text-zinc-500">

{new Date(item.createdAt).toLocaleString()}

</span>



{!item.read && (

<button

onClick={()=>markRead(item._id)}

className="
text-xs
bg-yellow-400
text-black
px-3 py-2
rounded-xl
font-bold
"

>

Read

</button>

)}


</div>



</div>


</div>



</Link>


))

}



</div>


)}




<Toast message={message} type="error"/>


</div>


<BottomNav/>


</main>

);

}
