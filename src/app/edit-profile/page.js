"use client";

import { useState } from "react";

export default function EditProfile(){

const user = JSON.parse(localStorage.getItem("user") || "{}");

const [name,setName] = useState(user.name || "");
const [email,setEmail] = useState(user.email || "");
const [message,setMessage] = useState("");

const saveProfile = async()=>{

try{

const res = await fetch(
"https://alphabot-i7p2.onrender.com/users/profile/update",
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify({
name,
email,
phone:user.phone
})
}
);

const data = await res.json();

if(res.ok){

localStorage.setItem(
"user",
JSON.stringify({
...user,
name,
email
})
);

setMessage("Profile updated successfully ✅");

}else{

setMessage(data.message || "Update failed");

}

}catch(err){

setMessage("Network error");

}

};


return(

<main className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">

<div className="max-w-md mx-auto bg-zinc-900 rounded-3xl p-6">

<h1 className="text-2xl font-bold mb-6">
Edit Profile
</h1>


<input
className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-4"
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Name"
/>


<input
className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-4"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Email"
/>


<button
onClick={saveProfile}
className="w-full bg-yellow-400 text-black p-3 rounded-xl font-bold"
>
Save Changes
</button>


<p className="mt-4 text-center text-yellow-400">
{message}
</p>


</div>

</main>

)

}
