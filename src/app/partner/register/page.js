"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function PartnerRegister(){

const router = useRouter();

const [form,setForm]=useState({
name:"",
email:"",
password:""});

const [message,setMessage]=useState("");

const submit=async(e)=>{
e.preventDefault();

console.log("REGISTER DATA", form);

try{

const res=await fetch(
"https://alphabot-1.onrender.com/blog-partner/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
}
);

const data=await res.json();

console.log("REGISTER RESPONSE", data);

setMessage(data.message);

if(res.ok){
router.push(
"/partner/verify?email="+form.email
);
}

}catch(error){

console.log(error);
setMessage("Registration failed");

}

};


return(
<main className="
min-h-screen
bg-[#050505]
text-white
flex
items-center
justify-center
px-6
py-10
">


<div className="
w-full
max-w-md
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-8
shadow-[0_20px_50px_rgba(0,0,0,0.5)]
">


<div className="
flex
justify-center
mb-6
">

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

</div>


<h1 className="
text-3xl
font-bold
text-center
">
Blog Partner Registration
</h1>

<p className="
text-center
text-zinc-400
text-sm
mt-2
">
Join AlphaBot as a referral partner.
</p>

<form
onSubmit={submit}
className="grid gap-3 mt-5"
>

<input
placeholder="Blog name"
className="w-full mt-4 p-3.5 rounded-xl bg-[#050505] border border-zinc-800 focus:border-zinc-400 outline-none"
value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}
/>

<input
placeholder="Email"
type="email"
className="w-full mt-4 p-3.5 rounded-xl bg-[#050505] border border-zinc-800 focus:border-zinc-400 outline-none"
value={form.email}
onChange={e=>setForm({...form,email:e.target.value})}
/>

<input
placeholder="Password"
type="password"
className="w-full mt-4 p-3.5 rounded-xl bg-[#050505] border border-zinc-800 focus:border-zinc-400 outline-none"
value={form.password}
onChange={e=>setForm({...form,password:e.target.value})}
/>




<button className="
w-full
mt-5
bg-white
text-black
py-3
rounded-xl
font-bold
">
Register
</button>

</form>

<p>{message}</p>

</div>


</main>
);

}
