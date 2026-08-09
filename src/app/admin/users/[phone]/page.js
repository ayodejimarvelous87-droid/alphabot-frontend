"use client";

import {useEffect,useState} from "react";
import {useParams} from "next/navigation";
import Toast from "@/components/Toast";

export default function AdminUserDetails(){

const params = useParams();

const phone = decodeURIComponent(params.phone);





const [data,setData] = useState(null);
const [message,setMessage] = useState("");
const [toast,setToast] = useState("");
const [amount,setAmount] = useState("");

const [membership,setMembership] = useState(null);
const [membershipLoading,setMembershipLoading] = useState(true);
const [membershipAction,setMembershipAction] = useState(false);
const [membershipDuration,setMembershipDuration] = useState("30");



useEffect(()=>{

const load = async()=>{

const token = localStorage.getItem("adminToken");

const res = await fetch(
`https://alphabot-1.onrender.com/admin/user/${phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const result = await res.json();


if(res.ok){

setData(result);

}else{

setMessage(result.message || "Failed");

}

};


if(phone){
load();
}

},[phone]);



useEffect(()=>{

const loadMembership = async()=>{

try{

const token = localStorage.getItem("adminToken");

const res = await fetch(
`https://alphabot-1.onrender.com/admin/user/membership/${phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const result = await res.json();

if(res.ok){

setMembership(result);

}else{

setMessage(result.message || "Unable to load membership");

}

}catch(error){

console.log(error);

setMessage("Unable to load membership");

}finally{

setMembershipLoading(false);

}

};

if(phone){
loadMembership();
}

},[phone]);


const walletAction = async(type)=>{


      
const token = localStorage.getItem("adminToken");

const res = await fetch(
`http://localhost:5000/admin/wallet/${type}`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone,
amount,})
}
);


const result = await res.json();


setToast("✅ " + (result.message || "Done"));


if(result.wallet){

setData({
...data,
wallet:result.wallet
});

}

};



if(message){

return <div className="p-4 md:p-6 space-y-6">{message}</div>;

}


if(!data){

return <div className="p-4 md:p-6 space-y-6">Loading...</div>;

}



const transactions = data.transactions || [];
const orders = data.orders || [];
const withdrawals = data.withdrawals || [];


const totalDeposits = transactions
.filter(tx=>tx.direction==="credit")
.reduce(
(sum,tx)=>sum + Number(tx.amount || 0),
0
);


const totalSpent = transactions
.filter(tx=>tx.direction==="debit")
.reduce(
(sum,tx)=>sum + Number(tx.amount || 0),
0
);


const totalWithdrawn = withdrawals
.reduce(
(sum,item)=>sum + Number(item.amount || 0),
0
);



return(

<div className="p-4 md:p-6 space-y-6">


<h1 className="text-3xl font-bold">
👤 User Profile
</h1>



<div className="border rounded-xl p-5 mt-5">

<h2 className="font-bold text-xl">
Account Information
</h2>

<p>
Name: {data.user.name}
</p>

<p>
Phone: {data.user.phone}
</p>

<p>
Email: {data.user.email || "N/A"}
</p>

<p>
Role: {data.user.role}
</p>

<p>
Status: {data.user.status}
</p>

</div>




<div className="border rounded-xl p-5 mt-5">

<h2 className="font-bold text-xl">
📊 Account Summary
</h2>

<p>
💰 Balance: ₦{Number(data.wallet?.balance || 0).toLocaleString()}
</p>

<p>
⬆️ Total Deposits: ₦{totalDeposits}
</p>

<p>
🛒 Total Spent: ₦{totalSpent}
</p>

<p>
💸 Total Withdrawn: ₦{totalWithdrawn}
</p>

<p>
📜 Transactions: {transactions.length}
</p>

<p>
📦 Orders: {orders.length}
</p>

</div>





<div className="border border-zinc-800 rounded-2xl p-5 mt-5 bg-[#101012]">

<h2 className="font-bold text-xl">
👑 Membership Management
</h2>

{membershipLoading ? (

<p className="text-zinc-400 mt-3">
Loading membership...
</p>

) : (

<>

<div className="mt-4 p-4 rounded-xl bg-[#18181B] border border-zinc-800">

<p className="text-sm text-zinc-500">
Current membership
</p>

<p className={`text-2xl font-black mt-1 ${
membership?.user?.accountTier === "gold"
? "text-yellow-400"
: membership?.user?.accountTier === "silver"
? "text-zinc-300"
: "text-zinc-500"
}`}>
{membership?.user?.accountTier === "gold"
? "🥇 GOLD"
: membership?.user?.accountTier === "silver"
? "🥈 SILVER"
: "NORMAL"}
</p>

{membership?.user?.accountTierExpiresAt && (
<p className="text-sm text-zinc-400 mt-2">
Expires: {
new Date(
membership.user.accountTierExpiresAt
).toLocaleDateString()
}
</p>
)}

</div>


<div className="mt-4">

<label className="text-sm text-zinc-400">
Membership duration
</label>

<input
type="number"
min="1"
max="3650"
className="bg-[#050505] text-white border border-zinc-800 rounded-xl p-3 block mt-2 w-full"
value={membershipDuration}
onChange={(e)=>setMembershipDuration(e.target.value)}
/>

<p className="text-xs text-zinc-600 mt-1">
Duration is added to the existing expiry if the membership is still active.
</p>

</div>


<div className="flex gap-2 flex-wrap mt-4">

<button
disabled={membershipAction}
className="px-4 py-2 rounded-xl bg-zinc-200 text-black font-bold hover:bg-white disabled:opacity-50"
onClick={async()=>{

const token = localStorage.getItem("adminToken");

const days = Number(membershipDuration);

if(!Number.isInteger(days) || days <= 0 || days > 3650){
setToast("❌ Duration must be between 1 and 3650 days");
return;
}

if(!confirm(`Upgrade ${phone} to SILVER for ${days} days?`)){
return;
}

setMembershipAction(true);

try{

const res = await fetch(
`https://alphabot-1.onrender.com/admin/user/tier/${phone}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
tier:"silver",
durationDays:days
})
}
);

const result = await res.json();

if(!res.ok){
throw new Error(result.message || "Failed to upgrade membership");
}

setToast("🥈 " + result.message);

setMembership({
success:true,
user:{
...membership.user,
accountTier:result.accountTier,
accountTierExpiresAt:result.accountTierExpiresAt
},
history:membership.history || []
});

}catch(error){

setToast("❌ " + error.message);

}finally{

setMembershipAction(false);

}

}}
>
🥈 Upgrade to Silver
</button>


<button
disabled={membershipAction}
className="px-4 py-2 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 disabled:opacity-50"
onClick={async()=>{

const token = localStorage.getItem("adminToken");

const days = Number(membershipDuration);

if(!Number.isInteger(days) || days <= 0 || days > 3650){
setToast("❌ Duration must be between 1 and 3650 days");
return;
}

if(!confirm(`Upgrade ${phone} to GOLD for ${days} days?`)){
return;
}

setMembershipAction(true);

try{

const res = await fetch(
`https://alphabot-1.onrender.com/admin/user/tier/${phone}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
tier:"gold",
durationDays:days
})
}
);

const result = await res.json();

if(!res.ok){
throw new Error(result.message || "Failed to upgrade membership");
}

setToast("🥇 " + result.message);

setMembership({
success:true,
user:{
...membership.user,
accountTier:result.accountTier,
accountTierExpiresAt:result.accountTierExpiresAt
},
history:membership.history || []
});

}catch(error){

setToast("❌ " + error.message);

}finally{

setMembershipAction(false);

}

}}
>
🥇 Upgrade to Gold
</button>


<button
disabled={membershipAction}
className="px-4 py-2 rounded-xl bg-red-950 text-red-400 border border-red-900 font-bold hover:bg-red-900 disabled:opacity-50"
onClick={async()=>{

if(!confirm(`Remove premium membership from ${phone}?`)){
return;
}

const token = localStorage.getItem("adminToken");

setMembershipAction(true);

try{

const res = await fetch(
`https://alphabot-1.onrender.com/admin/user/tier/${phone}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
tier:"normal"
})
}
);

const result = await res.json();

if(!res.ok){
throw new Error(result.message || "Failed to remove membership");
}

setToast("✅ " + result.message);

setMembership({
success:true,
user:{
...membership.user,
accountTier:"normal",
accountTierExpiresAt:null
},
history:membership.history || []
});

}catch(error){

setToast("❌ " + error.message);

}finally{

setMembershipAction(false);

}

}}
>
🚫 Remove Membership
</button>

</div>


<div className="mt-6">

<h3 className="font-bold">
📜 Membership History
</h3>

{(!membership?.history || membership.history.length === 0) ? (

<p className="text-sm text-zinc-500 mt-2">
No membership history.
</p>

) : (

<div className="mt-3 space-y-2">

{membership.history.map((item,index)=>(

<div
key={item._id || index}
className="border border-zinc-800 rounded-xl p-3 bg-[#18181B]"
>

<div className="flex items-center justify-between gap-3">

<span className="font-bold uppercase">
{item.tier || "membership"}
</span>

<span className="text-xs text-zinc-500">
{item.status || "unknown"}
</span>

</div>

<p className="text-sm text-zinc-400 mt-1">
Duration: {item.durationDays || "—"} days
</p>

<p className="text-xs text-zinc-600 mt-1">
{item.createdAt
? new Date(item.createdAt).toLocaleString()
: ""}
</p>

</div>

))}

</div>

)}

</div>

</>

)}

</div>


<div className="border rounded-xl p-5 mt-5">

<h2 className="font-bold text-xl">
💰 Wallet Management
</h2>

<p>
Current Balance: ₦{Number(data.wallet?.balance || 0).toLocaleString()}
</p>


<input
className="bg-[#050505] text-white border border-zinc-800 rounded-xl p-2 block mt-3 w-full"
placeholder="💰 Amount (NGN)"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>



<button
className="bg-emerald-600 text-white px-4 py-2 mt-3 mr-2 rounded"
onClick={()=>walletAction("add")}
>
Add Funds
</button>


<button
className="bg-red-600 text-white px-4 py-2 mt-3 rounded"
onClick={()=>{
if(confirm("Deduct this amount?")){
walletAction("deduct");
}
}}
>
Deduct Funds
</button>


</div>



<div className="mt-6">

<h2 className="text-xl font-bold">
📜 Transaction History
</h2>


{transactions.length === 0 && (
<p>No transactions</p>
)}


{transactions.map(tx=>(

<div
key={tx._id}
className="bg-[#18181B] border border-zinc-800 rounded-3xl p-4 mt-3"
>

<p>
Type: {tx.type}
</p>

<p>
Amount: ₦{tx.amount}
</p>

<p>
Direction: {tx.direction}
</p>

<p>
Description: {tx.description}
</p>

<p>
Date: {new Date(tx.createdAt).toLocaleString()}
</p>

</div>

))}


</div>






<div className="mt-6">

<h2 className="text-xl font-bold">
📦 Orders History
</h2>


{orders.length===0 && (
<p>No orders</p>
)}


{orders.map(order=>(

<div
key={order._id}
className="bg-[#18181B] border border-zinc-800 rounded-3xl p-4 mt-3"
>

<p>
Product: {order.productName}
</p>

<p>
Amount: ₦{order.amount}
</p>

<p>
Status: {order.status}
</p>

</div>

))}


</div>






<div className="mt-6">

<h2 className="text-xl font-bold">
💸 Withdrawal History
</h2>


{withdrawals.length===0 && (
<p>No withdrawals</p>
)}


{withdrawals.map(item=>(

<div
key={item._id}
className="bg-[#18181B] border border-zinc-800 rounded-3xl p-4 mt-3"
>

<p>
Amount: ₦{item.amount}
</p>

<p>
Bank: {item.bankName}
</p>

<p>
Account: {item.accountNumber}
</p>

<p>
Status: {item.status}
</p>

</div>

))}


</div>



<Toast
message={toast}
onClose={()=>setToast("")}
/>

</div>


);

}

