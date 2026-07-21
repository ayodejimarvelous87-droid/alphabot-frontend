"use client";

import {useState,useEffect} from "react";
import Link from "next/link";

export default function Withdraw(){

const [phone,setPhone]=useState("");
const [amount,setAmount]=useState("");
const [bankName,setBankName]=useState("");
const [accountNumber,setAccountNumber]=useState("");
const [accountName,setAccountName]=useState("");
const [pin,setPin]=useState("");

const [balance,setBalance]=useState(0);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [feeRate,setFeeRate]=useState(1);


useEffect(()=>{

const user=JSON.parse(localStorage.getItem("user"));

if(user?.phone){
setPhone(user.phone);

fetch(
`https://alphabot-1.onrender.com/wallet/balance/${user.phone}`,
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
)
.then(res=>res.json())
.then(data=>{
if(data.balance!==undefined){
setBalance(data.balance);
}
});

}

fetch("https://alphabot-1.onrender.com/settings")
.then(res=>res.json())
.then(data=>{
if(data.withdrawalFeeRate!==undefined){
setFeeRate(data.withdrawalFeeRate);
}
});
},[]);



const fee = Number(amount || 0) * (feeRate / 100);
const total = Number(amount || 0) + fee;

const withdraw=async()=>{

try{

setLoading(true);
if(Number(amount) <= 0){
setMessage("❌ Enter a valid amount");
setLoading(false);
return;
}

if(total > balance){
setMessage("❌ Insufficient wallet balance");
setLoading(false);
return;
}

setMessage("Processing...");


const res=await fetch(
"https://alphabot-1.onrender.com/withdrawal",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify({

phone,
bankName,
accountNumber,
accountName,
amount:Number(amount),
pin

})
}
);


const data=await res.json();


if(res.ok){

setMessage("✅ Withdrawal successful");

}else{

setMessage("❌ "+data.message);

}


}catch(error){

setMessage("❌ Connection error");

}finally{

setLoading(false);

}

};



return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">

<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
💸 Withdraw
</h1>


<p className="text-zinc-500 mt-2">
Available balance: ₦{balance.toLocaleString()}
</p>


<div className="mt-8 bg-zinc-900 rounded-3xl p-6">


<input
className="w-full p-3 rounded-xl bg-white text-black"
placeholder="Withdrawal amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>
<p className="text-sm text-zinc-300 mt-3">
Fee: ₦{fee.toLocaleString()}
<br/>
Total deduction: ₦{total.toLocaleString()}
</p>



<input
className="w-full mt-4 p-3 rounded-xl bg-white text-black"
placeholder="Bank name"
value={bankName}
onChange={(e)=>setBankName(e.target.value)}
/>


<input
className="w-full mt-4 p-3 rounded-xl bg-white text-black"
placeholder="Account number"
value={accountNumber}
onChange={(e)=>setAccountNumber(e.target.value)}
/>


<input
className="w-full mt-4 p-3 rounded-xl bg-white text-black"
placeholder="Account name"
value={accountName}
onChange={(e)=>setAccountName(e.target.value)}
/>


<input
className="w-full mt-4 p-3 rounded-xl bg-white text-black"
placeholder="Transaction PIN"
type="password"
maxLength="4"
value={pin}
onChange={(e)=>setPin(e.target.value)}
/>


<button
onClick={withdraw}
disabled={loading}
className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"
>

{loading ? "Processing..." : "Withdraw"}

</button>


<p className="text-center mt-4 text-sm">
{message}
</p>


</div>


<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-8"
>
← Dashboard
</Link>


</div>

</main>

);

}
