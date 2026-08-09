"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Toast from "@/components/Toast";

const API = "https://alphabot-1.onrender.com";

export default function Settings(){

const user =
typeof window !== "undefined"
? JSON.parse(localStorage.getItem("user") || "{}")
: {};

const token =
typeof window !== "undefined"
? localStorage.getItem("token")
: null;


const [pin,setPin] = useState("");
const [pinOtp,setPinOtp] = useState("");
const [hasPin,setHasPin] = useState(false);
const [pinOtpSent,setPinOtpSent] = useState(false);

const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");

const [message,setMessage] = useState("");
const [loading,setLoading] = useState(false);


useEffect(()=>{

const loadPinStatus = async()=>{

try{

const res = await fetch(
`${API}/pin/status`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data = await res.json();

if(res.ok){
setHasPin(data.hasPin);
}

}catch(error){

console.log(error);

}

};

loadPinStatus();

},[token]);


const sendPinOTP = async()=>{

try{

setLoading(true);
setMessage("");

const res = await fetch(
`${API}/pin/send-pin-otp`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone:user.phone
})
}
);

const data = await res.json();

if(res.ok){

setPinOtpSent(true);
setMessage("PIN OTP sent to your email");

}else{

setMessage("❌ " + (data.message || "Failed to send PIN OTP"));

}

}catch(error){

setMessage("❌ Failed to send PIN OTP");

}finally{

setLoading(false);

}

};


const createTransactionPin = async()=>{

if(!/^\d{4}$/.test(pin)){

setMessage("❌ Transaction PIN must be exactly 4 digits");
return;

}

if(!pinOtp){

setMessage("❌ Enter the PIN OTP");
return;

}

try{

setLoading(true);
setMessage("");

const res = await fetch(
`${API}/pin/set`,
{
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
}
);

const data = await res.json();

if(res.ok){

setMessage(
hasPin
? "Transaction PIN changed successfully ✅"
: "Transaction PIN created successfully ✅"
);

setPin("");
setPinOtp("");
setPinOtpSent(false);
setHasPin(true);

}else{

setMessage("❌ " + (data.message || "Failed to update PIN"));

}

}catch(error){

setMessage("❌ Failed to update transaction PIN");

}finally{

setLoading(false);

}

};


const changePassword = async()=>{

if(!oldPassword || !newPassword){

setMessage("❌ Enter your old and new password");
return;

}

if(newPassword.length < 6){

setMessage("❌ New password must be at least 6 characters");
return;

}

try{

setLoading(true);
setMessage("");

const res = await fetch(
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

const data = await res.json();

if(res.ok){

setMessage("Password changed successfully ✅");

setOldPassword("");
setNewPassword("");

}else{

setMessage("❌ " + (data.message || "Password change failed"));

}

}catch(error){

setMessage("❌ Password change failed");

}finally{

setLoading(false);

}

};


const deleteAccount = async()=>{

if(!confirm("Delete your AlphaBot account permanently? This action cannot be undone.")){
return;
}

try{

setLoading(true);

const res = await fetch(
`${API}/users/delete-account`,
{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data = await res.json().catch(()=>({}));

if(res.ok){

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/login";

}else{

setMessage("❌ " + (data.message || "Failed to delete account"));

}

}catch(error){

setMessage("❌ Failed to delete account");

}finally{

setLoading(false);

}

};


return(

<main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto space-y-5">


<Link
href="/profile"
className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
>
← Back to Profile
</Link>


<div>

<p className="text-xs text-zinc-500 uppercase tracking-widest">
AlphaBot Account
</p>

<h1 className="text-3xl font-black mt-2">
Settings
</h1>

<p className="text-zinc-500 dark:text-zinc-400 mt-2">
Manage your account and security
</p>

</div>


<Toast
message={message}
type={
message.toLowerCase().includes("failed") ||
message.toLowerCase().includes("error") ||
message.includes("❌")
? "error"
: "success"
}
onClose={()=>setMessage("")}
/>


{/* SECURITY */}

<div className="bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

<div className="mb-5">

<h2 className="text-lg font-bold">
🔐 Transaction PIN
</h2>

<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
Protect payments made from your AlphaBot account.
</p>

</div>


<div className="bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 mb-4">

<p className="text-xs text-zinc-500">
Current status
</p>

<p className="font-bold mt-1">
{hasPin
? "✓ Transaction PIN is active"
: "⚠️ No transaction PIN set"}
</p>

</div>


<input
className="w-full p-4 rounded-2xl bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800 mb-3 text-black dark:text-white outline-none focus:border-yellow-400"
placeholder="4 digit PIN"
type="password"
inputMode="numeric"
maxLength="4"
value={pin}
onChange={(e)=>setPin(e.target.value.replace(/\D/g,""))}
/>


<button
onClick={sendPinOTP}
disabled={loading}
className="w-full bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-700 rounded-2xl py-4 font-bold mb-3 disabled:opacity-50"
>
{pinOtpSent ? "OTP Sent ✓" : "Send PIN OTP"}
</button>


{pinOtpSent && (

<input
className="w-full p-4 rounded-2xl bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800 mb-3 text-black dark:text-white outline-none focus:border-yellow-400"
placeholder="Enter PIN OTP"
value={pinOtp}
onChange={(e)=>setPinOtp(e.target.value)}
/>

)}


<button
onClick={createTransactionPin}
disabled={loading}
className="w-full bg-black dark:bg-white text-white dark:text-black rounded-2xl py-4 font-bold disabled:opacity-50"
>
{hasPin ? "Change Transaction PIN" : "Create Transaction PIN"}
</button>

</div>


{/* PASSWORD */}

<div className="bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

<h2 className="text-lg font-bold">
🛡️ Password
</h2>

<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-5">
Change the password used to access your AlphaBot account.
</p>


<input
className="w-full p-4 rounded-2xl bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800 mb-3 text-black dark:text-white outline-none focus:border-yellow-400"
placeholder="Current password"
type="password"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
/>


<input
className="w-full p-4 rounded-2xl bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800 mb-4 text-black dark:text-white outline-none focus:border-yellow-400"
placeholder="New password"
type="password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>


<button
onClick={changePassword}
disabled={loading}
className="w-full bg-black dark:bg-white text-white dark:text-black rounded-2xl py-4 font-bold disabled:opacity-50"
>
Update Password
</button>

</div>


{/* ACCOUNT */}

<div className="bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

<h2 className="text-lg font-bold">
👤 Account
</h2>

<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-5">
Manage your AlphaBot account.
</p>


<Link
href="/edit-profile"
className="block w-full text-center bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-700 rounded-2xl py-4 font-bold"
>
✏️ Edit Profile
</Link>

</div>


{/* DANGER ZONE */}

<div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-3xl p-6">

<h2 className="font-bold text-red-600 dark:text-red-400">
⚠️ Danger Zone
</h2>

<p className="text-sm text-red-500/80 dark:text-red-300/70 mt-2">
Deleting your account is permanent and cannot be undone.
</p>


<button
onClick={deleteAccount}
disabled={loading}
className="mt-5 w-full border border-red-500 text-red-500 dark:text-red-400 py-4 rounded-2xl font-bold disabled:opacity-50"
>
🗑️ Delete Account
</button>

</div>


</div>

</main>

);

}
