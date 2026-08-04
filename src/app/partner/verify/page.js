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

const res=await fetch(
"https://alphabot-1.onrender.com/blog-partner/verify-email",
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
<div className="p-6">

<h1 className="text-2xl font-bold">
📱 Verify SMS Code
</h1>

<p className="mt-2">
{email}
</p>

<form
onSubmit={verify}
className="grid gap-3 mt-5"
>

<input
placeholder="Enter SMS verification code"
className="border p-2"
value={otp}
onChange={e=>setOtp(e.target.value)}
/>

<button
className="bg-black text-white p-2 rounded"
disabled={loading}
>
{loading ? "Verifying..." : "Verify"}
</button>

</form>

<p>{message}</p>

</div>
);

}
