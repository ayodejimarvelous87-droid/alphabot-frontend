
"use client";

import {useEffect,useState,use} from "react";

export default function BlogPartnerDetails({params}){

const {id}=use(params);

const [partner,setPartner]=useState(null);
const [loading,setLoading]=useState(true);
const [users,setUsers]=useState([]);
const [saving,setSaving]=useState(false);
const [commissionRate,setCommissionRate]=useState("");
const [status,setStatus]=useState("");


useEffect(()=>{
loadPartner();
},[]);


async function loadUsers(){

try{

const token=localStorage.getItem("adminToken");

const res=await fetch(
`https://alphabot-1.onrender.com/blog-partner/admin/${id}/users`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setUsers(Array.isArray(data) ? data : []);

}catch(error){

console.log(error);

}

}


async function loadPartner(){

try{

const res=await fetch(
`https://alphabot-1.onrender.com/blog-partner/${id}`
);

const data=await res.json();

setPartner(data);
setCommissionRate(data.commissionRate || 0);
setStatus(data.status || "active");


}catch(err){

console.log(err);

}

setLoading(false);

}


async function updatePartner(){

try{

setSaving(true);

const res=await fetch(
`https://alphabot-1.onrender.com/blog-partner/admin/${id}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
commissionRate,
status
})
}
);


const data=await res.json();

if(res.ok){

setPartner(data.partner);

alert("✅ Partner updated");

}


}catch(err){

alert("Update failed");

}finally{

setSaving(false);

}

}



if(loading){

return <div className="p-6">Loading...</div>;

}


if(!partner){

return <div className="p-6">Partner not found</div>;

}


return (

<div className="space-y-6">

<h1 className="text-3xl font-bold">
👤 {partner.name}
</h1>


<div className="rounded-3xl border border-zinc-800 p-6 space-y-4">

<p>📧 Email: {partner.email}</p>

<p>🔗 Referral Code: {partner.code}</p>

<p>👥 Total Users: {partner.totalUsers || 0}</p>

<p>💰 Total Earned: ₦{partner.totalEarned || 0}</p>

<p>📈 Total Generated: ₦{partner.totalGenerated || 0}</p>

<p>💎 Commission (30%): ₦{partner.totalCommission || 0}</p>


<div>

<label>
📊 Commission Rate (%)
</label>

<input
type="number"
value={commissionRate}
onChange={(e)=>setCommissionRate(e.target.value)}
className="w-full mt-2 p-3 rounded-xl bg-black border border-zinc-700"
/>

</div>


<div>

<label>
⚡ Partner Status
</label>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
className="w-full mt-2 p-3 rounded-xl bg-black border border-zinc-700"
>

<option value="active">
Active
</option>

<option value="inactive">
Inactive
</option>

</select>

</div>


<button
onClick={updatePartner}
disabled={saving}
className="bg-yellow-400 text-black font-bold px-5 py-3 rounded-xl"
>

{saving ? "Saving..." : "Save Changes"}

</button>


</div>


<div className="rounded-3xl border border-zinc-800 p-6 space-y-3">

<h2 className="font-bold text-xl">
👥 Referral Users ({users.length})
</h2>

{
users.length===0 ? (

<p className="text-zinc-500">
No users referred yet.
</p>

) : (

users.map((user)=>(

<div
key={user._id}
className="border-b border-zinc-800 pb-3"
>

<p className="font-bold">
{user.name}
</p>

<p>
📱 {user.phone}
</p>

<p>
📧 {user.email}
</p>

</div>

))

)
}

</div>


<div className="rounded-3xl border border-zinc-800 p-6 space-y-3">

<h2 className="font-bold text-xl">
🏦 Payout Details
</h2>

<p>Bank: {partner.bankName || "Not set"}</p>

<p>Account Name: {partner.accountName || "Not set"}</p>

<p>Account Number: {partner.accountNumber || "Not set"}</p>

</div>


</div>

);

}
