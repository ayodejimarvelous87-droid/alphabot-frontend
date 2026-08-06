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

