"use client";

import {useState} from "react";
import {useSearchParams,useRouter} from "next/navigation";

export default function PartnerVerify(){

const params=useSearchParams();
const router=useRouter();

const email=params.get("email");

const [otp,setOtp]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);

const verify=async(e)=>{
e.preventDefault();

  setLoading(true);

const res=await fetch(
"https://api.alphabothq.com/blog-partner/verify-email",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
otp
})
}
);

const data=await res.json();

setMessage(data.message);

if(res.ok){
router.push("/partner/login");
}

setLoading(false);

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

<div className="flex justify-center mb-6">
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

<h1 className="text-3xl font-bold text-center">
Verify Account
</h1>

<p className="text-center text-zinc-400 text-sm mt-2">
Enter the SMS code sent to
<br/>
{email}
</p>

<form
onSubmit={verify}
className="grid gap-3"
>

<input
className="
w-full
mt-8
p-3.5
rounded-xl
bg-[#050505]
border
border-zinc-800
focus:border-zinc-400
outline-none
"
placeholder="Enter verification code"
value={otp}
onChange={e=>setOtp(e.target.value)}
/>

<button
className="
w-full
mt-5
bg-white
text-black
py-3
rounded-xl
font-bold
"
disabled={loading}
>
{loading ? "Verifying..." : "Verify"}
</button>

</form>

<p className="text-red-400 mt-3 text-sm">
{message}
</p>

</div>

</main>

);
}
