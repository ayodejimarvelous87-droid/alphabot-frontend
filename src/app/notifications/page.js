"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function Notifications(){

const [notifications,setNotifications]=useState([]);
const [user,setUser]=useState(null);
const [loading,setLoading]=useState(true);


useEffect(()=>{

const savedUser = JSON.parse(localStorage.getItem("user"));
setUser(savedUser);

const token = localStorage.getItem("token");

if(!savedUser) return;


fetch(
`https://alphabot-1.onrender.com/notifications/${savedUser.phone}`,
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



const markRead=async(id)=>{

await fetch(
`https://alphabot-1.onrender.com/notifications/read/${id}`,
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

if(!user) return;


await fetch(
`https://alphabot-1.onrender.com/notifications/read-all/${user.phone}`,
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



return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto">

<h1 className="text-3xl font-bold mb-2">
🔔 Notifications
</h1>

<p className="text-zinc-500 mb-6">
Stay updated with AlphaBot activities.
</p>

<button
onClick={markAllRead}
className="mb-6 bg-yellow-400 text-black font-bold px-5 py-3 rounded-2xl"
>
Mark all read
</button>

{loading && (
<p className="text-zinc-400">
Loading notifications...
</p>
)}

{!loading && notifications.length===0 && (
<div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">
No notifications yet 🚀
</div>
)}

<div className="space-y-4">

{notifications.map(item=>(

<div
key={item._id}
onClick={()=>markRead(item._id)}
className={`rounded-3xl p-5 cursor-pointer ${
item.read
?
"bg-zinc-100 dark:bg-zinc-900"
:
"bg-yellow-50 dark:bg-zinc-800 border border-yellow-400"
}`}
>

<div className="flex justify-between items-start gap-3">

<h2 className="font-bold text-lg">
{item.title}
</h2>

{!item.read && (
<span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">
NEW
</span>
)}

</div>

<p className="mt-3 text-sm leading-6">
{item.message}
</p>

<div className="flex justify-between mt-4 text-xs text-zinc-500">

<span>
{item.type}
</span>

<span>
{new Date(item.createdAt).toLocaleString()}
</span>

</div>

</div>

))}

</div>

</div>

<BottomNav/>

</main>

);

}
