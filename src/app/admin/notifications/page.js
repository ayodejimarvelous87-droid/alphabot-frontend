"use client";

import {useEffect,useState} from "react";


export default function AdminNotifications(){

const [notifications,setNotifications]=useState([]);

const [title,setTitle]=useState("");
const [message,setMessage]=useState("");
const [status,setStatus]=useState("");


const loadNotifications = async()=>{

try{

const res = await fetch(
"https://alphabot-1.onrender.com/notifications/admin"
);

const data = await res.json();

if(Array.isArray(data)){
setNotifications(data);
}

}catch(error){

console.log(error);

}

};


useEffect(()=>{

loadNotifications();

},[]);



const sendNotification = async()=>{

const token = localStorage.getItem("adminToken");


const res = await fetch(
"https://alphabot-1.onrender.com/admin/notifications/broadcast",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
title,
message,
type:"info"
})
}
);


const data = await res.json();


if(res.ok){

setStatus(`✅ Sent to ${data.sent} users`);

setTitle("");
setMessage("");

}else{

setStatus(data.message || "Failed");

}

};



return(

<div className="p-6 space-y-8">


<div>

<h1 className="text-3xl font-bold">
🔔 Admin Notifications
</h1>

<p className="mt-2">
Recent AlphaBot alerts
</p>


<div className="mt-5 space-y-3">

{
notifications.length === 0 ?

<p>No notifications yet.</p>

:

notifications.map((item)=>(
<div
key={item._id}
className="p-4 rounded-xl bg-[#18181B] border border-zinc-800"
>

<h2 className="font-bold">
{item.title}
</h2>

<p className="mt-2">
{item.message}
</p>

<p className="text-sm mt-2 text-zinc-500">
{new Date(item.createdAt).toLocaleString()}
</p>

</div>
))

}

</div>

</div>



<div>

<h1 className="text-3xl font-bold">
📢 Broadcast Notification
</h1>


<input
className="border rounded-xl p-3 w-full mt-5"
placeholder="Notification title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>


<textarea
className="border rounded-xl p-3 w-full mt-4 h-32"
placeholder="Write your message..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>


<button
onClick={sendNotification}
className="border rounded-xl px-5 py-3 mt-4"
>
🚀 Send To All Users
</button>


<p className="mt-3">
{status}
</p>


</div>


</div>

);

}
