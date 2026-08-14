"use client";

import { useState } from "react";
import Link from "next/link";
import Toast from "@/components/Toast";

const API = "https://api.alphabothq.com";

export default function EditProfile() {

const user =
typeof window !== "undefined"
? JSON.parse(localStorage.getItem("user") || "{}")
: {};

const token =
typeof window !== "undefined"
? localStorage.getItem("token")
: null;

const [name,setName] = useState(user.name || "");
const [email,setEmail] = useState(user.email || "");
const [message,setMessage] = useState("");
const [loading,setLoading] = useState(false);
const [twoFactorCode,setTwoFactorCode] = useState("");

const saveProfile = async () => {

if(!name.trim()) {
setMessage("❌ Please enter your name");
return;
}

if(user?.twoFactorEnabled && !twoFactorCode.trim()) {
setMessage("❌ Authenticator code is required");
return;
}

if(
user?.twoFactorEnabled &&
!/^[0-9]{6}$/.test(twoFactorCode.trim())
) {
setMessage("❌ Enter a valid 6-digit authenticator code");
return;
}

try {

setLoading(true);
setMessage("");

const res = await fetch(
`${API}/users/profile/${user.phone}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
name:name.trim(),
email:email.trim(),
...(user?.twoFactorEnabled
? { code:twoFactorCode.trim() }
: {})
})
}
);

const data = await res.json();

if(!res.ok){
setMessage("❌ " + (data.message || "Update failed"));
return;
}

const updatedUser = {
...user,
name:name.trim(),
email:email.trim()
};

localStorage.setItem(
"user",
JSON.stringify(updatedUser)
);

setTwoFactorCode("");
setMessage("Profile updated successfully ✅");

} catch(error) {

console.log(error);
setMessage("❌ Network error");

} finally {

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
Edit Profile
</h1>

<p className="text-zinc-500 dark:text-zinc-400 mt-2">
Update your personal information
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


<div className="bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

<div className="flex items-center gap-4">

<div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white to-zinc-500 text-black flex items-center justify-center text-3xl font-black">

{name?.charAt(0)?.toUpperCase() || "A"}

</div>

<div>

<h2 className="text-xl font-bold">
{name || "AlphaBot User"}
</h2>

<p className="text-sm text-zinc-500 dark:text-zinc-400">
{user.phone || "No phone number"}
</p>

</div>

</div>

</div>


<div className="bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-5">

<div>

<label className="text-sm text-zinc-500 block mb-2">
Full Name
</label>

<input
className="w-full p-4 rounded-2xl bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800 text-black dark:text-white outline-none focus:border-yellow-400"
placeholder="Enter your full name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

</div>


<div>

<label className="text-sm text-zinc-500 block mb-2">
Email Address
</label>

<input
className="w-full p-4 rounded-2xl bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800 text-black dark:text-white outline-none focus:border-yellow-400"
placeholder="Enter your email address"
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

</div>


<div>

<label className="text-sm text-zinc-500 block mb-2">
Phone Number
</label>

<input
className="w-full p-4 rounded-2xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-500 cursor-not-allowed"
value={user.phone || ""}
disabled
/>

<p className="text-xs text-zinc-500 mt-2">
Your phone number is linked to your AlphaBot account and cannot be changed here.
</p>

</div>


{user?.twoFactorEnabled && (

<div className="rounded-2xl border border-yellow-400/40 bg-yellow-400/10 p-4 space-y-3">

<div>

<p className="text-sm font-bold">
🔐 Authenticator Verification
</p>

<p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
Two-factor authentication is enabled. Enter the 6-digit code from your authenticator app to save profile changes.
</p>

</div>

<input
className="w-full p-4 rounded-2xl bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800 text-black dark:text-white outline-none focus:border-yellow-400 text-center tracking-[0.4em] font-bold"
placeholder="000000"
inputMode="numeric"
maxLength={6}
value={twoFactorCode}
onChange={(e)=>
setTwoFactorCode(
e.target.value.replace(/\D/g,"").slice(0,6)
)
}
/>

</div>

)}

<div className="pt-2">

<p className="text-sm text-zinc-500">
Account Verification
</p>

<p className="mt-2 font-bold">
{user?.emailVerified
? "✓ Verified Account"
: "⏳ Verification Required"}
</p>

</div>


<button
onClick={saveProfile}
disabled={loading}
className="w-full bg-black dark:bg-white text-white dark:text-black rounded-2xl py-4 font-bold disabled:opacity-50"
>
{loading ? "Saving..." : "Save Changes"}
</button>

</div>


<Link
href="/settings"
className="block text-center bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 font-bold"
>
⚙️ Account Settings
</Link>


</div>

</main>

);

}
