"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Notifications(){

const [notifications,setNotifications]=useState([]);
const [loading,setLoading]=useState(true);


useEffect(()=>{

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if(!user) return;


fetch(
`https://alphabot-main.onrender.com/notifications/${user.phone}`,
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

setLoading(false);

});


},[]);



const markRead = async(id)=>{

await fetch(
`https://alphabot-main.onrender.com/notifications/read/${id}`,
{
method:"PUT",
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);


setNotifications(prev=>
prev.map(item=>
item._id===id
?
{...item,read:true}
:
item
)
);

};

const markAllRead=async()=>{

await fetch(
"https://alphabot-main.onrender.com/notifications/read-all",
{
method:"PUT",
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

setNotifications(prev=>
prev.map(item=>({...item,read:true}))
);

};





const getIcon=(type)=>{
if(type==="wallet") return "💰";
if(type==="referral") return "🎁";
if(type==="warning") return "⚠️";
return "🔔";
};

const getTime=(date)=>{
if(!date) return "";
const diff=Math.floor((Date.now()-new Date(date))/60000);
if(diff < 1) return "Just now";
if(diff === 1) return "1 minute ago";
return `${diff} minutes ago`;
};


return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto">

<h1 className="text-3xl font-bold">
🔔 Notifications
</h1>

<p className="text-zinc-500 mt-2">
Your AlphaBot updates
</p>

<button
onClick={markAllRead}
className="mt-5 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
✅ Mark all as read
</button>



<div className="mt-8 space-y-4">

{loading ? (

<p className="text-zinc-400">
Loading...
</p>

) : notifications.length===0 ? (

<div className="text-center bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">
<p className="text-3xl">🔔</p>
<p className="font-bold mt-3">No notifications yet</p>
<p className="text-zinc-400 mt-2 text-sm">We will keep you updated with AlphaBot news, rewards and offers.</p>
</div>

) : (

notifications.map((item)=>(

<div
key={item._id}
onClick={()=>markRead(item._id)}
className={`bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 cursor-pointer ${
item.read ? "" : "border border-yellow-400"
}`}
>

<h2 className="font-bold">
{getIcon(item.category)} {item.title || "Notification"}
</h2>

<p className="text-zinc-500 mt-1">
{item.message}
</p>

<p className="text-xs text-zinc-400 mt-2">
🕒 {getTime(item.createdAt)}
</p>



{!item.read && (
<p className="text-yellow-400 text-xs mt-2">
Unread
</p>
)}


</div>

))

)}

</div>


<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-8"
>
← Dashboard
</Link>


</div>

<BottomNav />

</main>

);

}
