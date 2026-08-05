"use client";

import Toast from "@/components/Toast";

import { useState, useEffect } from "react";

export default function ForgotPassword(){

const [email,setEmail]=useState("");
const [otp,setOtp]=useState("");
const [newPassword,setNewPassword]=useState("");
const [step,setStep]=useState(1);
const [message,setMessage]=useState("");
const [toast,setToast]=useState("");
const [loading,setLoading]=useState(false);
const [countdown,setCountdown]=useState(0);

useEffect(()=>{

if(countdown <= 0) return;

const timer = setInterval(()=>{

setCountdown((prev)=>prev - 1);

},1000);

return ()=>clearInterval(timer);

},[countdown]);


const sendOTP=async()=>{

try{

setLoading(true);

const res=await fetch(
"https://alphabot-1.onrender.com/users/send-reset-otp",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email
})
}
);


const data=await res.json();


if(res.ok){

setToast("✅ OTP sent to your email");
setCountdown(60);
setStep(2);

}else{

setMessage(data.message || "Failed to send OTP");

}


}catch(error){

setMessage("Network error");

}finally{

setLoading(false);

}

};



const verifyOTP=async()=>{

if(!otp || !newPassword){
setMessage("OTP and new password are required");
return;
}

if(newPassword.length < 6){
setMessage("Password must be at least 6 characters");
return;
}

try{

setLoading(true);

const res=await fetch(
"https://alphabot-1.onrender.com/users/verify-reset-otp",
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

window.location.href="/login";

},1500);


}else{

setMessage(data.message || "Reset failed");

}


}catch(error){

setMessage("Network error");

}finally{

setLoading(false);

}

};



return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex items-center justify-center px-6">

<div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">


<h1 className="text-3xl font-bold text-center">
Alpha<span className="text-yellow-400">Bot</span>
</h1>


<p className="text-center text-zinc-400 mt-2">
Reset your password
</p>



{step===1 && (

<>

<input
className="w-full mt-8 p-3 rounded-xl bg-white text-black dark:bg-black dark:text-white border border-zinc-700"
type="email"
placeholder="Email address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<button
onClick={sendOTP}
disabled={loading || countdown > 0}
className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-bold active:scale-95 transition duration-150 disabled:opacity-50"
>
{loading ? "Sending OTP..." : countdown > 0 ? `Resend code in ${countdown}s` : "Send OTP"}
</button>

</>

)}



{step===2 && (

<>

<input
className="w-full mt-8 p-3 rounded-xl bg-white text-black dark:bg-black dark:text-white border border-zinc-700"
placeholder="OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
/>

{countdown > 0 && (
<p className="text-center text-zinc-400 mt-3">
Resend code available in {countdown}s
</p>
)}


<input
className="w-full mt-4 p-3 rounded-xl bg-white text-black dark:bg-black dark:text-white border border-zinc-700"
placeholder="New password"
type="password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>


<button
onClick={verifyOTP}
disabled={loading}
className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-bold active:scale-95 transition duration-150 disabled:opacity-50"
>
{loading ? "Resetting..." : "Reset Password"}
</button>

</>

)}



<p className="text-center text-zinc-400 mt-4">
{message}
</p>


<a
href="/login"
className="block text-center text-yellow-400 mt-6"
>
← Back to Login
</a>


</div>

<Toast
message={toast}
type="success"
onClose={()=>setToast("")}
/>

</main>

);

}
