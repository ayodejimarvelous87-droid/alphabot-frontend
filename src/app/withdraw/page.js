"use client";

import {useState,useEffect} from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";

export default function Withdraw(){

const [phone,setPhone]=useState("");
const [amount,setAmount]=useState("");
const [bankName,setBankName]=useState("");
const [bankCode,setBankCode]=useState("");

const [accountNumber,setAccountNumber]=useState("");
const [accountName,setAccountName]=useState("");

const [savedAccount,setSavedAccount]=useState(false);

const [verifying,setVerifying]=useState(false);
const [verified,setVerified]=useState(false);
const [pin,setPin]=useState("");

const [balance,setBalance]=useState(0);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [feeRate,setFeeRate]=useState(1);


const toastType =
message.startsWith("❌") ||
message.includes("error") ||
message.includes("valid") ||
message.includes("Insufficient")
? "error"
: "success";


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

fetch(
`https://alphabot-1.onrender.com/users/withdraw-account/${user.phone}`,
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
)
.then(res=>res.json())
.then(data=>{

if(data.withdrawAccountNumber){
setBankName(data.withdrawBankName);
setBankCode(data.withdrawBankCode);
setAccountNumber(data.withdrawAccountNumber);
setAccountName(data.withdrawAccountName);
setSavedAccount(true);
setVerified(true);
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



const verifyAccount = async()=>{

if(accountNumber.length !== 10 || !bankCode){
return;
}

try{

setVerifying(true);

const res = await fetch(
"https://alphabot-1.onrender.com/bank/verify",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify({
accountNumber,
bankCode
})
}
);

const data = await res.json();

if(res.ok){

setAccountName(data.data.account_name);
setVerified(true);

}else{

setAccountName("");
setVerified(false);
setMessage("❌ Unable to verify account");

}

}catch(error){

setAccountName("");
setVerified(false);

}finally{

setVerifying(false);

}

};


const withdraw=async()=>{

try{

setLoading(true);


if(Number(amount)<=0){

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

<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto space-y-5">



<h1 className="text-3xl font-black">
💸 Withdraw
</h1>


<p className="text-zinc-400">
Transfer your AlphaBot balance to your bank account
</p>



<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">

<p className="text-xs text-zinc-500">
Available Wallet Balance
</p>

<h2 className="text-3xl font-black mt-2">
₦{balance.toLocaleString()}
</h2>

</div>




<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">



<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Withdrawal amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>




<div className="bg-[#050505] border border-zinc-800 rounded-2xl p-4">

<div className="flex justify-between text-sm">

<span className="text-zinc-400">
Withdrawal Fee
</span>

<span>
₦{fee.toLocaleString()}
</span>

</div>


<div className="flex justify-between mt-3 text-sm">

<span className="text-zinc-400">
Total Deduction
</span>

<span className="text-white font-bold">
₦{total.toLocaleString()}
</span>

</div>

</div>




<div className="bg-[#050505] border border-zinc-800 rounded-2xl p-4">

<p className="text-xs text-zinc-500">
Withdrawal Account
</p>

<h3 className="font-bold mt-2">
{bankName || "No account saved"}
</h3>

<p className="text-sm text-zinc-400 mt-1">
{accountName || "Save your personal bank account first"}
</p>

<p className="text-sm text-zinc-400">
{accountNumber || ""}
</p>

<a
href="/withdraw-account"
className="block mt-4 text-center bg-white text-black rounded-xl py-3 font-bold"
>
Change Withdrawal Account
</a>

</div>









<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Transaction PIN"
type="password"
maxLength="4"
value={pin}
onChange={(e)=>setPin(e.target.value)}
/>




<button
onClick={withdraw}
disabled={
loading ||
!amount ||
Number(amount)<=0 ||
!pin
}
className="w-full bg-white text-black py-3 rounded-xl font-bold disabled:bg-zinc-700 disabled:text-zinc-400"
>

{
loading
?
"Processing..."
:
"Withdraw Funds"
}

</button>


<Toast message={message} type={toastType}/>


</div>




<Link
href="/dashboard"
className="block text-center text-zinc-400 mt-6"
>
← Dashboard
</Link>



</div>


<BottomNav/>


</main>

);

}
