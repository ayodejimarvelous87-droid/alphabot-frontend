"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Toast from "@/components/Toast";

export default function PartnerForgotPassword(){

const router=useRouter();

const [email,setEmail]=useState("");
const [otp,setOtp]=useState("");
const [newPassword,setNewPassword]=useState("");
const [step,setStep]=useState(1);
const [toast,setToast]=useState("");
const [loading,setLoading]=useState(false);


const sendOTP=async()=>{

setLoading(true);

try{

const res=await fetch(
"https://api.alphabothq.com/blog-partner/send-reset-otp",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email})
}
);

const data=await res.json();

if(res.ok){

setToast("✅ OTP sent to your email");
setStep(2);

}else{

setToast("❌ "+data.message);

}

}catch(e){

setToast("❌ Network error");

}

setLoading(false);

};



const resetPassword=async()=>{

setLoading(true);

try{

const res=await fetch(
"https://api.alphabothq.com/blog-partner/verify-reset-otp",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
otp,
newPassword
})
}
);


const data=await res.json();


if(res.ok){

setToast("✅ Password reset successful");

setTimeout(()=>{
router.push("/partner/login");
},1200);


}else{

setToast("❌ "+data.message);

}


}catch(e){

setToast("❌ Network error");

}

setLoading(false);

};



return(

<main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-5">


<div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6">


<h1 className="text-3xl font-bold text-center">
Partner Password Reset
</h1>


{step===1 && (

<div className="grid gap-4 mt-6">

<input
placeholder="Partner email"
type="email"
className="p-3 rounded-xl bg-black border border-zinc-700"
value={email}
onChange={e=>setEmail(e.target.value)}
/>


<button
onClick={sendOTP}
disabled={loading}
className="bg-white text-black py-3 rounded-xl font-bold"
>
{loading?"Sending...":"Send OTP"}
</button>


</div>

)}



{step===2 && (

<div className="grid gap-4 mt-6">


<input
placeholder="OTP"
className="p-3 rounded-xl bg-black border border-zinc-700"
value={otp}
onChange={e=>setOtp(e.target.value)}
/>


<input
placeholder="New password"
type="password"
className="p-3 rounded-xl bg-black border border-zinc-700"
value={newPassword}
onChange={e=>setNewPassword(e.target.value)}
/>


<button
onClick={resetPassword}
disabled={loading}
className="bg-white text-black py-3 rounded-xl font-bold"
>
{loading?"Resetting...":"Reset Password"}
</button>


</div>

)}


<p
className="text-center mt-6 text-zinc-400 underline cursor-pointer"
onClick={()=>router.push("/partner/login")}
>
Back to login
</p>


</div>


<Toast
message={toast}
onClose={()=>setToast("")}
/>


</main>

);

}
