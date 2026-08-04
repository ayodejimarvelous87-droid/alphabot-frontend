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
"https://alphabot-1.onrender.com/blog-partner/dashboard",
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
"https://alphabot-1.onrender.com/blog-partner/change-password",
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
"https://alphabot-1.onrender.com/blog-partner/update-email",
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

<main className="
min-h-screen
bg-[#050505]
text-white
px-6
py-10
">

<div className="max-w-md mx-auto">


<div className="
w-14
h-14
rounded-2xl
bg-black
border
border-zinc-700
flex
items-center
justify-center
mb-6
">

<span className="
text-3xl
font-black
bg-gradient-to-br
from-white
to-zinc-400
bg-clip-text
text-transparent
">
A
</span>

</div>


<h1 className="
text-3xl
font-black
">
⚙️ Partner Settings
</h1>

<p className="text-zinc-400 mt-2">
Manage your AlphaBot partner account.
</p>



{profile && (

<div className="
mt-6
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-5
">

<h2 className="font-bold text-xl">
🔗 Referral Information
</h2>


<p className="mt-4 text-zinc-400">
Referral Code
</p>

<p className="font-bold">
{profile.code}
</p>


<p className="mt-4 text-zinc-400">
Referral Link
</p>

<p className="break-all text-sm">
{window.location.origin}{profile.referralLink}
</p>


</div>

)}




<div className="
mt-6
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-5
">


<h2 className="font-bold text-xl">
🔐 Change Password
</h2>


<input
className="
w-full
mt-4
p-3.5
rounded-xl
bg-[#050505]
border
border-zinc-800
outline-none
"
placeholder="Old password"
type="password"
onChange={e=>setOldPassword(e.target.value)}
/>


<input
className="
w-full
mt-3
p-3.5
rounded-xl
bg-[#050505]
border
border-zinc-800
outline-none
"
placeholder="New password"
type="password"
onChange={e=>setNewPassword(e.target.value)}
/>


<button
onClick={changePassword}
className="
w-full
bg-white
text-black
font-bold
py-3
rounded-xl
mt-4
"
>
Change Password
</button>


</div>




<div className="
mt-6
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-5
">


<h2 className="font-bold text-xl">
📧 Update Email
</h2>


<input
className="
w-full
mt-4
p-3.5
rounded-xl
bg-[#050505]
border
border-zinc-800
outline-none
"
placeholder="New email"
type="email"
onChange={e=>setEmail(e.target.value)}
/>


<button
onClick={updateEmail}
className="
w-full
bg-white
text-black
font-bold
py-3
rounded-xl
mt-4
"
>
Update Email
</button>


</div>



<p className="
mt-5
text-center
text-zinc-400
">
{message}
</p>



<button
className="mt-4 w-full border border-red-500 text-red-400 py-3 rounded-xl font-bold"
onClick={async()=>{
const token=localStorage.getItem("partnerToken");

if(!confirm("Delete your account permanently?")) return;

const res=await fetch(
"https://alphabot-1.onrender.com/users/delete-account",
{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
}
);

if(res.ok){
localStorage.removeItem("partnerToken");
window.location.href="/partner/login";
}

}}
>
🗑️ Delete Account
</button>
</div>

</main>

);

}
