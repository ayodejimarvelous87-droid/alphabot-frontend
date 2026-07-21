"use client";

import { useState } from "react";

const API="https://alphabot-1.onrender.com";

export default function EditProfile(){

const user =
typeof window !== "undefined"
? JSON.parse(localStorage.getItem("user") || "{}")
: {};

const token =
typeof window !== "undefined"
? localStorage.getItem("token")
: null;


const [name,setName]=useState(user.name || "");
const [email,setEmail]=useState(user.email || "");

const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");

const [message,setMessage]=useState("");



const saveProfile=async()=>{

try{

const res=await fetch(
`${API}/users/profile/${user.phone}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
name,
email
})
}
);


const data=await res.json();


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




const changePassword=async()=>{

try{

const res=await fetch(
`${API}/users/change-password/${user.phone}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
oldPassword,
newPassword
})
}
);


const data=await res.json();


setMessage(
data.message || "Password changed successfully"
);


}catch(err){

setMessage("Password change failed");

}

};




return(

<main className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 pb-24">

<div className="max-w-md mx-auto bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<h1 className="text-2xl font-bold mb-6">
✏️ Edit Profile
</h1>



<input
className="w-full p-3 rounded-xl bg-white dark:bg-black border mb-4"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>


<input
className="w-full p-3 rounded-xl bg-white dark:bg-black border mb-4"
placeholder="Email"
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>



<button
onClick={saveProfile}
className="w-full bg-yellow-400 text-black p-3 rounded-xl font-bold"
>
Save Profile
</button>




<hr className="my-8"/>



<h2 className="text-xl font-bold mb-4">
🔐 Change Password
</h2>


<input
className="w-full p-3 rounded-xl bg-white dark:bg-black border mb-3"
placeholder="Old password"
type="password"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
/>


<input
className="w-full p-3 rounded-xl bg-white dark:bg-black border mb-3"
placeholder="New password"
type="password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>


<button
onClick={changePassword}
className="w-full bg-black dark:bg-white dark:text-black text-white p-3 rounded-xl font-bold"
>
Change Password
</button>



<p className="text-center mt-5 text-yellow-400">
{message}
</p>


</div>

</main>

);

}
