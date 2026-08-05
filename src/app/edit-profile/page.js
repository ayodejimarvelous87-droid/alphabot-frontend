"use client";

import { useState, useEffect } from "react";
import Toast from "@/components/Toast";

const API="https://alphabot-1.onrender.com";

export default function EditProfile(){

const user =
typeof window !== "undefined"
? JSON.parse(localStorage.getItem("user") || "{}")
: {};

const token =
typeof window !== "undefined"
? localStorage.getItem("token")
: null;


const [name,setName]=useState(user.name || "");
const [email,setEmail]=useState(user.email || "");

const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");

const [message,setMessage]=useState("");
const [otp,setOtp]=useState("");

const [pin,setPin]=useState("");
const [pinOtp,setPinOtp]=useState("");
const [hasPin,setHasPin]=useState(false);
const [pinOtpSent,setPinOtpSent]=useState(false);





const checkPinStatus=async()=>{
try{
const res=await fetch(`${API}/pin/status`,{
headers:{
Authorization:`Bearer ${token}`
}
});

const data=await res.json();
setHasPin(data.hasPin);

}catch(error){
console.log(error);
}
};
useEffect(()=>{

const loadPinStatus = async()=>{
try{
const res = await fetch(`${API}/pin/status`,{
headers:{
Authorization:`Bearer ${token}`
}
});

const data = await res.json();
setHasPin(data.hasPin);

}catch(error){
console.log(error);
}
};

loadPinStatus();

},[token]);




const sendPinOTP=async()=>{
try{
const res=await fetch(`${API}/pin/send-pin-otp`,{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone:user.phone
})
});

const data=await res.json();

if(res.ok){
setPinOtpSent(true);
setMessage("Transaction PIN OTP sent to email");
}else{
setMessage(data.message);
}

}catch(error){
setMessage("Failed to send PIN OTP");
}
};

const createTransactionPin=async()=>{
try{

const res=await fetch(`${API}/pin/set`,{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone:user.phone,
pin,
otp:pinOtp
})
});

const data=await res.json();

if(res.ok){
setMessage(hasPin ? "Transaction PIN changed successfully ✅" : "Transaction PIN created successfully ✅");
}else{
setMessage(data.message);
}

}catch(error){
setMessage("Failed to create PIN");
}
};

const saveProfile=async()=>{



try{

const res=await fetch(
`${API}/users/profile/${user.phone}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
name,
email
})
}
);


const data=await res.json();


if(res.ok){

localStorage.setItem(
"user",
JSON.stringify({
...user,
name,
email
})
);

setMessage("Profile updated successfully ✅");

}else{

setMessage(data.message || "Update failed");

}


}catch(err){

setMessage("Network error");

}

};




const changePassword=async()=>{

try{

const res=await fetch(
`${API}/users/change-password/${user.phone}`,
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


setMessage(
data.message || "Password changed successfully"
);


}catch(err){

setMessage("Password change failed");

}

};




return(

<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto space-y-5">


{/* HEADER */}

<div>

<h1 className="text-3xl font-black">
⚙️ Account Settings
</h1>

<p className="text-zinc-400 mt-2">
Manage your AlphaBot profile and security
</p>

</div>




<Toast
message={message}
type={
message.toLowerCase().includes("failed") ||
message.toLowerCase().includes("error")
? "error"
: "success"
}
onClose={()=>setMessage("")}
/>


{/* PROFILE IDENTITY */}

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">


<div className="flex items-center gap-4">


<div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white to-zinc-500 text-black flex items-center justify-center text-3xl font-black">

{user?.name?.charAt(0) || "A"}

</div>


<div>

<h2 className="text-xl font-bold">
{user?.name || "AlphaBot User"}
</h2>

<p className="text-sm text-zinc-400">
{user?.phone}
</p>

<p className="text-xs text-zinc-500 mt-1">
{user?.email || "No email added"}
</p>

</div>


</div>



<div className="mt-5 pt-4 border-t border-zinc-800">

<p className="text-xs text-zinc-500">
Account Verification
</p>


<p className="mt-2 font-bold text-green-400">
{user?.emailVerified
? "✓ Verified Account"
: "⏳ Verification Required"}
</p>


</div>


</div>





{/* PROFILE INFORMATION */}

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">


<h2 className="text-lg font-bold mb-5">
👤 Personal Information
</h2>


<input
className="w-full p-4 rounded-2xl bg-[#050505] border border-zinc-800 mb-3 text-white"
placeholder="Full name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>



<input
className="w-full p-4 rounded-2xl bg-[#050505] border border-zinc-800 mb-3 text-white"
placeholder="Email address"
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>



<button
onClick={saveProfile}
className="w-full bg-white text-black rounded-2xl py-4 font-bold"
>
Save Changes
</button>


</div>





{/* TRANSACTION PIN */}

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">


<h2 className="text-lg font-bold mb-2">
🔐 Transaction Security
</h2>


<p className="text-sm text-zinc-400 mb-5">
Protect payments with your transaction PIN
</p>



<input
className="w-full p-4 rounded-2xl bg-[#050505] border border-zinc-800 mb-3 text-white"
placeholder="4 digit PIN"
type="password"
maxLength="4"
value={pin}
onChange={(e)=>setPin(e.target.value)}
/>



<button
onClick={sendPinOTP}
className="w-full bg-[#050505] border border-zinc-700 rounded-2xl py-4 font-bold mb-3"
>
Send PIN OTP
</button>



<input
className="w-full p-4 rounded-2xl bg-[#050505] border border-zinc-800 mb-3 text-white"
placeholder="PIN OTP"
value={pinOtp}
onChange={(e)=>setPinOtp(e.target.value)}
/>



<button
onClick={createTransactionPin}
className="w-full bg-white text-black rounded-2xl py-4 font-bold"
>
{hasPin ? "Change Transaction PIN" : "Create Transaction PIN"}
</button>


</div>





{/* PASSWORD */}

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">


<h2 className="text-lg font-bold mb-5">
🛡️ Password Protection
</h2>



<input
className="w-full p-4 rounded-2xl bg-[#050505] border border-zinc-800 mb-3 text-white"
placeholder="Old password"
type="password"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
/>



<input
className="w-full p-4 rounded-2xl bg-[#050505] border border-zinc-800 mb-3 text-white"
placeholder="New password"
type="password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>



<button
onClick={changePassword}
className="w-full bg-[#050505] border border-zinc-700 rounded-2xl py-4 font-bold"
>
Update Password
</button>


</div>








</div>

</main>

);




}