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

setError("");
setLoading(true);


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

setError(
"Unable to connect to the server. Please try again."
);

}


setLoading(false);

};



const verifyOTP=async()=>{

if(loading) return;


setError("");
setLoading(true);


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

setError(data.message || "OTP verification failed");
setLoading(false);
return;

}


localStorage.setItem(
"adminToken",
data.token
);


router.push("/admin");


}catch(error){

setError(
"Unable to verify OTP. Try again."
);

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
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
disabled={loading}
/>


<input
className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-4"
placeholder="Password"
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
disabled={loading}
/>


<button
onClick={login}
disabled={loading}
className={`w-full py-3 rounded-xl font-bold transition ${
loading
?"bg-yellow-700 scale-95"
:"bg-yellow-400 text-black hover:scale-105 active:scale-95"
}`}
>
{loading ? "Checking..." : "Continue"}
</button>

</>

)}



{step === 2 && (

<>

<p className="text-sm text-zinc-400 mb-4">
OTP sent to your admin email.
</p>


<input
className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-4"
placeholder="Enter 6 digit OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
maxLength="6"
disabled={loading}
/>


<button
onClick={verifyOTP}
disabled={loading}
className={`w-full py-3 rounded-xl font-bold transition ${
loading
?"bg-yellow-700 scale-95"
:"bg-yellow-400 text-black hover:scale-105 active:scale-95"
}`}
>
{loading ? "Verifying..." : "Verify OTP"}
</button>

</>

)}


</div>

</div>

);

}
