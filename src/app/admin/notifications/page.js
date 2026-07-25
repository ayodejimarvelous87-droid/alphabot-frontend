"use client";

import {useState} from "react";

export default function AdminNotifications(){

const [title,setTitle]=useState("");
const [message,setMessage]=useState("");
const [status,setStatus]=useState("");


const sendNotification=async()=>{

const token=localStorage.getItem("adminToken");


const res=await fetch(
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


const data=await res.json();


if(res.ok){

setStatus(
`✅ Sent to ${data.sent} users`
);

setTitle("");
setMessage("");

}else{

setStatus(data.message || "Failed");

}

};


return(

<div className="p-6">

<h1 className="text-3xl font-bold">
📢 Broadcast Notification
</h1>


<p className="mt-2">
Send announcements to all AlphaBot users.
</p>


<input
className="border rounded-xl p-3 w-full mt-6"
placeholder="Notification title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>


<textarea
className="border rounded-xl p-3 w-full mt-4 h-40"
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


<p className="mt-4">
{status}
</p>


</div>

);

}
