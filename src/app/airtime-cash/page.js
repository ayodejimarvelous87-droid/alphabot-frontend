"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import Toast from "@/components/Toast";

export default function Page(){

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("MTN");
const [amount,setAmount]=useState("");
const [otp,setOtp]=useState("");
const [sessionId,setSessionId]=useState("");
const [otpSent,setOtpSent]=useState(false);
const [otpVerified,setOtpVerified]=useState(false);
const [message,setMessage]=useState("");
const [toast,setToast]=useState("");
const [loading,setLoading]=useState(false);
const [requests,setRequests]=useState([]);


const token=()=>{
return localStorage.getItem("token");
};


const loadRequests=async()=>{

try{

const user=JSON.parse(localStorage.getItem("user"));

if(!user?.phone) return;


const res=await fetch(
`https://alphabot-1.onrender.com/airtime-cash/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token()}`
}
}
);


const data=await res.json();

if(Array.isArray(data)){
setRequests(data);
}


}catch(error){

console.log(error);

}

};


useEffect(()=>{

loadRequests();

},[]);



const generateOTP=async()=>{

try{

setLoading(true);
setMessage("Sending OTP...");


const res=await fetch(
"https://alphabot-1.onrender.com/airtime-cash/generate-otp",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token()}`
},
body:JSON.stringify({

networkName:network,

sender:phone

})

}
);


const data=await res.json();


if(res.ok){

setOtpSent(true);

setToast("✅ OTP sent to your airtime line");

}else{

setMessage(`❌ ${data.message}`);

}


}catch(error){

setMessage("❌ Connection error");

}finally{

setLoading(false);

}

};



const verifyOTP=async()=>{

try{

setLoading(true);
setMessage("Verifying OTP...");


const res=await fetch(
"https://alphabot-1.onrender.com/airtime-cash/verify-otp",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token()}`
},
body:JSON.stringify({

networkName:network,

sender:phone,

otp

})

}
);


const data=await res.json();


if(res.ok){

setSessionId(
data.data.sessionId
);

setOtpVerified(true);

setToast("✅ OTP verified");

}else{

setMessage(`❌ ${data.message}`);

}


}catch(error){

setMessage("❌ Connection error");

}finally{

setLoading(false);

}

};



const convert=async()=>{

try{

setLoading(true);
setMessage("Converting airtime...");


const res=await fetch(
"https://alphabot-1.onrender.com/airtime-cash/convert",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token()}`
},
body:JSON.stringify({

phone,

networkName:network,

amount:Number(amount),

sessionId

})

}
);


const data=await res.json();


if(res.ok){

setMessage(
`✅ ${data.message}. Received ₦${data.cashAmount}`
);

setAmount("");

loadRequests();


}else{

setMessage(`❌ ${data.message}`);

}


}catch(error){

setMessage("❌ Connection error");

}finally{

setLoading(false);

}

};



return(

<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto space-y-5">


<h1 className="text-3xl font-black">
💵 Airtime Cash
</h1>


<p className="text-zinc-400">
Convert unused airtime into cash
</p>



<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">


<p className="text-xs text-zinc-500">
Phone Number
</p>


<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>



<p className="text-xs text-zinc-500">
Network Provider
</p>


<select
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
value={network}
onChange={(e)=>setNetwork(e.target.value)}
>

<option>MTN</option>
<option>AIRTEL</option>
<option>GLO</option>
<option>9MOBILE</option>

</select>



{
!otpSent &&

<button
onClick={generateOTP}
disabled={loading}
className="w-full bg-white text-black py-3 rounded-xl font-bold"
>
Generate OTP
</button>

}



{
otpSent && !otpVerified &&

<>

<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Enter OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
/>


<button
onClick={verifyOTP}
disabled={loading}
className="w-full bg-white text-black py-3 rounded-xl font-bold"
>
Verify OTP
</button>

</>

}



{
otpVerified &&

<>

<div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-3 text-sm text-yellow-300">
⚠️ Please enter your SIM airtime transfer PIN.
<br/>
This is your network airtime PIN, not your AlphaBot transaction PIN.
</div>


<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Airtime amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<p className="text-xs text-yellow-400">
⚠️ Minimum airtime conversion amount is ₦50
</p>


<button
onClick={convert}
disabled={loading}
className="w-full bg-white text-black py-3 rounded-xl font-bold"
>
Convert Airtime
</button>

</>

}



<p className="text-center text-sm text-zinc-400">
{message}
</p>


</div>



<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5">

<h2 className="font-bold text-lg mb-4">
📄 My Airtime Cash Requests
</h2>


{
requests.length===0

?

<p className="text-zinc-500 text-sm">
No requests yet
</p>

:

requests.map((item)=>(

<div
key={item._id}
className="border-b border-zinc-800 py-3"
>

<p>
{item.network} - ₦{item.amount}
</p>

<p className="text-sm text-zinc-400">
Cash Amount: ₦{item.cashAmount}
</p>

<p>
Status: {item.status==="approved" ? "✅ Approved":"⏳ Pending"}
</p>

</div>

))

}


</div>


<Link
href="/dashboard"
className="block text-center text-zinc-400 mt-6"
>
← Dashboard
</Link>


</div>

<Toast
message={toast}
type="success"
onClose={()=>setToast("")}
/>

</main>

);

}
