"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function AdminLogin(){

const router = useRouter();

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [otp,setOtp]=useState("");
const [step,setStep]=useState(1);
const [error,setError]=useState("");
const [loading,setLoading]=useState(false);


const login=async()=>{

if(loading) return;

setLoading(true);
setError("");

try{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
password
})
}
);


const data=await res.json();


if(!res.ok){

setError(data.message || "Login failed");
setLoading(false);
return;

}


if(data.requiresOTP){

setStep(2);
setLoading(false);
return;

}


localStorage.setItem(
"adminToken",
data.token
);

router.push("/admin");


}catch(error){

setError("Server error");

}

setLoading(false);

};




const verifyOTP=async()=>{

if(loading) return;

setLoading(true);
setError("");

try{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/verify-otp",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
otp
})
}
);


const data=await res.json();


if(!res.ok){

setError(data.message || "Invalid OTP");
setLoading(false);
return;

}


localStorage.setItem(
"adminToken",
data.token
);


router.push("/admin");


}catch(error){

setError("Server error");

}


setLoading(false);

};



return(

<div className="min-h-screen flex items-center justify-center bg-black text-white">


<div className="bg-zinc-900 p-6 rounded-3xl w-80">


<h1 className="text-2xl font-bold mb-5">
👑 AlphaBot Admin Login
</h1>


{error && (
<p className="text-red-400 mb-3 text-sm">
{error}
</p>
)}



{step === 1 && (

<>

<input
className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-3"
placeholder="Username or Phone Number"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>


<input
className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-4"
placeholder="Password"
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button
onClick={login}
disabled={loading}
className="w-full bg-[#18181B] text-white py-3 rounded-xl font-bold"
>
{loading ? "Checking..." : "Continue"}
</button>

</>

)}



{step === 2 && (

<>

<p className="text-sm text-zinc-400 mb-3">
OTP sent to admin email
</p>


<input
className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-4"
placeholder="Enter OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
/>


<button
onClick={verifyOTP}
disabled={loading}
className="w-full bg-[#18181B] text-white py-3 rounded-xl font-bold"
>
{loading ? "Verifying..." : "Verify OTP"}
</button>

</>

)}


</div>


</div>

);

}
