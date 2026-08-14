"use client";

import {useState,useEffect} from "react";

export default function PartnerSettings(){

const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");
const [email,setEmail]=useState("");
const [message,setMessage]=useState("");
const [profile,setProfile]=useState(null);



useEffect(()=>{

const loadProfile=async()=>{

const token=localStorage.getItem("partnerToken");

const res=await fetch(
"https://api.alphabothq.com/blog-partner/dashboard",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

if(res.ok){
setProfile(data);
}

};

loadProfile();

},[]);

const token =
typeof window !== "undefined"
? localStorage.getItem("blogToken")
: null;


const changePassword=async()=>{

const res=await fetch(
"https://api.alphabothq.com/blog-partner/change-password",
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

setMessage(data.message);

};



const updateEmail=async()=>{

const res=await fetch(
"https://api.alphabothq.com/blog-partner/update-email",
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
email
})
}
);

const data=await res.json();

setMessage(data.message);

};



return(
<div className="p-6">

<h1 className="text-2xl font-bold">
⚙️ Partner Settings
</h1>


{profile && (
<div className="mt-6 border p-4 rounded">

<h2 className="font-bold">
🔗 Referral Information
</h2>

<p>
Code: {profile.code}
</p>

<p className="break-all">
Link: {window.location.origin}{profile.referralLink}
</p>

</div>
)}



<div className="mt-6 border p-4 rounded">

<h2 className="font-bold">
Change Password
</h2>

<input
className="border p-2 w-full mt-3"
placeholder="Old password"
type="password"
onChange={e=>setOldPassword(e.target.value)}
/>


<input
className="border p-2 w-full mt-3"
placeholder="New password"
type="password"
onChange={e=>setNewPassword(e.target.value)}
/>


<button
onClick={changePassword}
className="bg-black text-white p-2 rounded mt-3"
>
Change Password
</button>

</div>



<div className="mt-6 border p-4 rounded">

<h2 className="font-bold">
Update Email
</h2>

<input
className="border p-2 w-full mt-3"
placeholder="New email"
type="email"
onChange={e=>setEmail(e.target.value)}
/>


<button
onClick={updateEmail}
className="bg-black text-white p-2 rounded mt-3"
>
Update Email
</button>

</div>


<p className="mt-4">
{message}
</p>

</div>
);

}
