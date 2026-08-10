"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Toast from "@/components/Toast";

import {
  getBiometricStatus,
  enableBiometric,
  authenticateWithBiometric,
  disableBiometric
} from "@/lib/biometric";

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

const [biometricEnabled,setBiometricEnabled] = useState(false);
const [twoFactorEnabled,setTwoFactorEnabled] = useState(false);
const [twoFactorSetup,setTwoFactorSetup] = useState(false);
const [twoFactorQrCode,setTwoFactorQrCode] = useState("");
const [twoFactorSecret,setTwoFactorSecret] = useState("");
const [twoFactorCode,setTwoFactorCode] = useState("");
const [twoFactorLoading,setTwoFactorLoading] = useState(false);

const [biometricLoading,setBiometricLoading] = useState(false);




const setupTwoFactor = async () => {

  try {

    setTwoFactorLoading(true);
    setMessage("Generating 2FA setup...");

    const res = await fetch(
      `${API}/2fa/setup`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message ||
        "Unable to start 2FA setup"
      );
    }

    setTwoFactorQrCode(
      data.qrCode || ""
    );

    setTwoFactorSecret(
      data.secret || ""
    );

    setTwoFactorSetup(true);
    setTwoFactorCode("");

    setMessage(
      "Scan the QR code with your authenticator app."
    );

  } catch (error) {

    setMessage(
      "❌ " +
      (error.message ||
       "Unable to start 2FA setup")
    );

  } finally {

    setTwoFactorLoading(false);

  }

}

const verifyTwoFactorSetup = async () => {

  if (!/^\d{6}$/.test(twoFactorCode)) {

    setMessage(
      "❌ Enter the 6-digit authenticator code"
    );

    return;
  }

  try {

    setTwoFactorLoading(true);
    setMessage("Verifying authenticator code...");

    const res = await fetch(
      `${API}/2fa/verify-setup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          code: twoFactorCode
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message ||
        "Invalid authenticator code"
      );
    }

    setTwoFactorEnabled(true);
    setTwoFactorSetup(false);
    setTwoFactorQrCode("");
    setTwoFactorSecret("");
    setTwoFactorCode("");

    setMessage(
      "Two-factor authentication enabled successfully ✅"
    );

  } catch (error) {

    setMessage(
      "❌ " +
      (error.message ||
       "2FA verification failed")
    );

  } finally {

    setTwoFactorLoading(false);

  }

}

const disableTwoFactor = async () => {

  if (!/^\d{6}$/.test(twoFactorCode)) {

    setMessage(
      "❌ Enter your 6-digit authenticator code"
    );

    return;
  }

  try {

    setTwoFactorLoading(true);
    setMessage("Disabling 2FA...");

    const res = await fetch(
      `${API}/2fa/disable`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          code: twoFactorCode
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message ||
        "Unable to disable 2FA"
      );
    }

    setTwoFactorEnabled(false);
    setTwoFactorSetup(false);
    setTwoFactorCode("");
    setTwoFactorQrCode("");
    setTwoFactorSecret("");

    setMessage(
      "Two-factor authentication disabled successfully"
    );

  } catch (error) {

    setMessage(
      "❌ " +
      (error.message ||
       "Unable to disable 2FA")
    );

  } finally {

    setTwoFactorLoading(false);

  }

}

useEffect(()=>{


const loadTwoFactorStatus = async () => {

  try {

    const res = await fetch(
      `${API}/2fa/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message ||
        "Unable to check 2FA status"
      );
    }

    setTwoFactorEnabled(
      !!data.enabled
    );

  } catch (error) {

    console.error(
      "2FA status error:",
      error
    );

  }

};


;


;


;


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

const loadBiometricStatus = async () => {

  try {

    const data = await getBiometricStatus();

    setBiometricEnabled(
      !!data.enabled
    );

  } catch(error) {

    console.log(
      "Biometric status:",
      error
    );

  }

};

loadBiometricStatus();
loadTwoFactorStatus();

},[token]);


const setupFingerprint = async () => {

  try {

    setBiometricLoading(true);
    setMessage("");

    const data =
      await enableBiometric();

    if (data.verified) {

      setBiometricEnabled(true);

      setMessage(
        "Fingerprint payment enabled successfully ✅"
      );

    }

  } catch(error) {

    console.error(error);

    setMessage(
      "❌ " +
      (error.message ||
      "Fingerprint setup failed")
    );

  } finally {

    setBiometricLoading(false);

  }

};


const testFingerprint = async () => {

  try {

    setBiometricLoading(true);
    setMessage("");

    const data =
      await authenticateWithBiometric();

    if (data.verified) {

      setMessage(
        "Fingerprint verified successfully ✅"
      );

    }

  } catch(error) {

    console.error(error);

    setMessage(
      "❌ " +
      (error.message ||
      "Fingerprint verification failed")
    );

  } finally {

    setBiometricLoading(false);

  }

};


const removeFingerprint = async () => {

  if (
    !confirm(
      "Disable fingerprint payment on this account?"
    )
  ) {
    return;
  }

  try {

    setBiometricLoading(true);
    setMessage("");

    await disableBiometric();

    setBiometricEnabled(false);

    setMessage(
      "Fingerprint payment disabled successfully ✅"
    );

  } catch(error) {

    console.error(error);

    setMessage(
      "❌ " +
      (error.message ||
      "Unable to disable fingerprint")
    );

  } finally {

    setBiometricLoading(false);

  }

};


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


{/* BIOMETRIC */}

<div className="bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

<div className="mb-5">

<h2 className="text-lg font-bold">
👆 Fingerprint Payment
</h2>

<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
Use your fingerprint to authorize AlphaBot payments instead of entering your transaction PIN.
</p>

</div>


<div className="bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 mb-4">

<p className="text-xs text-zinc-500">
Current status
</p>

<p className="font-bold mt-1">
{biometricEnabled
  ? "✓ Fingerprint payment is enabled"
  : "⚠️ Fingerprint payment is not enabled"}
</p>

</div>


{!biometricEnabled ? (

<button
onClick={setupFingerprint}
disabled={biometricLoading || loading}
className="w-full bg-black dark:bg-white text-white dark:text-black rounded-2xl py-4 font-bold disabled:opacity-50"
>
{biometricLoading
  ? "Waiting for fingerprint..."
  : "👆 Enable Fingerprint Payment"}
</button>

) : (

<div className="space-y-3">

<button
onClick={testFingerprint}
disabled={biometricLoading || loading}
className="w-full bg-black dark:bg-white text-white dark:text-black rounded-2xl py-4 font-bold disabled:opacity-50"
>
{biometricLoading
  ? "Checking fingerprint..."
  : "👆 Test Fingerprint"}
</button>


<button
onClick={removeFingerprint}
disabled={biometricLoading || loading}
className="w-full border border-red-500 text-red-500 dark:text-red-400 rounded-2xl py-4 font-bold disabled:opacity-50"
>
Disable Fingerprint Payment
</button>

</div>

)}

</div>



{/* TWO-FACTOR AUTHENTICATION */}

<div className="
mt-8
p-5
rounded-2xl
border
border-zinc-800
bg-zinc-950
">

<h3 className="text-lg font-bold">
🔐 Two-Factor Authentication
</h3>

<p className="
text-sm
text-zinc-400
mt-2
">
Protect your AlphaBot account with an authenticator app.
</p>

<div className="mt-4">

{twoFactorEnabled ? (

<div>

<p className="
text-sm
text-green-400
font-semibold
mb-4
">
✓ Two-factor authentication is enabled
</p>

<input
type="text"
inputMode="numeric"
maxLength={6}
placeholder="Enter 6-digit authenticator code"
value={twoFactorCode}
onChange={(e)=>
setTwoFactorCode(
e.target.value.replace(/\D/g,"")
)
}
className="
w-full
bg-zinc-900
border
border-zinc-700
rounded-xl
px-4
py-3
text-white
"
/>

<button
type="button"
onClick={disableTwoFactor}
disabled={twoFactorLoading || loading}
className="
w-full
mt-3
bg-red-600
text-white
py-3
rounded-xl
font-bold
disabled:opacity-50
"
>
{twoFactorLoading
? "Processing..."
: "Disable 2FA"}
</button>

</div>

) : (

<div>

<p className="
text-sm
text-yellow-400
font-semibold
mb-4
">
⚠️ Two-factor authentication is not enabled
</p>

{!twoFactorSetup ? (

<button
type="button"
onClick={setupTwoFactor}
disabled={twoFactorLoading || loading}
className="
w-full
bg-white
text-black
py-3
rounded-xl
font-bold
disabled:opacity-50
"
>
{twoFactorLoading
? "Preparing..."
: "🔐 Set Up 2FA"}
</button>

) : (

<div>

<p className="
text-sm
text-zinc-300
mb-3
">
Open Google Authenticator, Microsoft Authenticator,
Authy, or another compatible authenticator app and
scan this QR code.
</p>

{twoFactorQrCode && (
<div className="
flex
justify-center
bg-white
p-4
rounded-xl
mb-4
">
<img
src={twoFactorQrCode}
alt="2FA QR code"
className="w-52 h-52"
/>
</div>
)}

{twoFactorSecret && (
<div className="mb-4">
<p className="
text-xs
text-zinc-400
mb-1
">
Can't scan the QR code? Enter this setup key manually:
</p>

<div className="
bg-zinc-900
border
border-zinc-700
rounded-xl
p-3
text-center
font-mono
text-sm
break-all
">
{twoFactorSecret}
</div>
</div>
)}

<input
type="text"
inputMode="numeric"
maxLength={6}
placeholder="Enter 6-digit code"
value={twoFactorCode}
onChange={(e)=>
setTwoFactorCode(
e.target.value.replace(/\D/g,"")
)
}
className="
w-full
bg-zinc-900
border
border-zinc-700
rounded-xl
px-4
py-3
text-white
"
/>

<button
type="button"
onClick={verifyTwoFactorSetup}
disabled={twoFactorLoading || loading}
className="
w-full
mt-3
bg-green-600
text-white
py-3
rounded-xl
font-bold
disabled:opacity-50
"
>
{twoFactorLoading
? "Verifying..."
: "Verify & Enable 2FA"}
</button>

</div>

)}

</div>

)}

</div>

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
