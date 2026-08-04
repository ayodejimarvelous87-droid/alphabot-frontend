
"use client";

export default function Settings(){

const deleteAccount=async()=>{

const token=localStorage.getItem("token");

if(!confirm("Delete your account permanently?")) return;

const res=await fetch(
"https://alphabot-1.onrender.com/users/delete-account",
{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
}
);

if(res.ok){
localStorage.removeItem("token");
window.location.href="/login";
}

};

return(
<div className="min-h-screen bg-[#050505] text-white px-6 py-10">

<div className="max-w-xl mx-auto">

<div className="
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-6
">

<h1 className="text-2xl font-bold">
⚙️ Settings
</h1>

<p className="text-zinc-400 mt-2">
Manage your account
</p>

<div className="
mt-6
border
border-red-900
rounded-2xl
p-4
">

<h2 className="font-bold text-red-400">
Danger Zone
</h2>

<button
onClick={deleteAccount}
className="
mt-4
w-full
border
border-red-500
text-red-400
py-3
rounded-xl
font-bold
"
>
🗑️ Delete Account
</button>

</div>

</div>

</div>

</div>
);

}
