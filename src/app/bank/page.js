"use client";

import {useState,useEffect} from "react";

const API="https://alphabot-1.onrender.com";

export default function Page(){

const user =
typeof window !== "undefined"
? JSON.parse(localStorage.getItem("user") || "{}")
: {};

const token =
typeof window !== "undefined"
? localStorage.getItem("token")
: null;


const [bankName,setBankName]=useState("");
const [accountNumber,setAccountNumber]=useState("");
const [accountName,setAccountName]=useState("");
const [beneficiaryId,setBeneficiaryId]=useState("");
const [beneficiaries,setBeneficiaries]=useState([]);
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");

const loadBeneficiaries=async()=>{

const res=await fetch(`${API}/transfer/beneficiaries/${user.phone}`,{
headers:{
Authorization:`Bearer ${token}`
}
});

const data=await res.json();

if(res.ok){
setBeneficiaries(data);
}

};


useEffect(()=>{

const load=async()=>{
await loadBeneficiaries();
};

load();

},[]);



const saveBeneficiary=async()=>{

const res=await fetch(`${API}/transfer/beneficiary`,{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone:user.phone,
bankName,
accountNumber,
accountName
})
});

const data=await res.json();

setMessage(data.message);

if(res.ok){
setMessage("Bank account saved successfully");
}

};


const sendMoney=async()=>{

const res=await fetch(`${API}/transfer/send`,{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone:user.phone,
beneficiaryId,
amount,
pin
})
});

const data=await res.json();

setMessage(data.message);

};


return(

<main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-5 py-8">

<div className="max-w-md mx-auto">

<h1 className="text-3xl font-bold mb-2">
🏦 Bank Transfer
</h1>

<p className="text-zinc-400 mb-6">
Send money to any bank
</p>


<input
className="w-full p-3 border rounded-xl mb-3"
placeholder="Bank name"
value={bankName}
onChange={(e)=>setBankName(e.target.value)}
/>


<input
className="w-full p-3 border rounded-xl mb-3"
placeholder="Account number"
value={accountNumber}
onChange={(e)=>setAccountNumber(e.target.value)}
/>


<input
className="w-full p-3 border rounded-xl mb-4"
placeholder="Account name"
value={accountName}
onChange={(e)=>setAccountName(e.target.value)}
/>


<button
onClick={saveBeneficiary}
className="w-full bg-blue-500 text-white p-3 rounded-xl font-bold mb-6"
>
Save Bank Account
</button>

<div className="mb-4">
<p className="font-bold mb-2">Select Bank Account</p>
{beneficiaries.map((b)=>(
<button
key={b._id}
onClick={()=>setBeneficiaryId(b._id)}
className={`w-full p-3 rounded-xl border mb-2 text-left ${beneficiaryId===b._id?"bg-yellow-400 text-black":""}`}
>
{b.bankName} - {b.accountNumber}<br/>
{b.accountName}
</button>
))}
</div>

<input
className="w-full p-3 border rounded-xl mb-3"
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>


<input
className="w-full p-3 border rounded-xl mb-4"
placeholder="Transaction PIN"
type="password"
value={pin}
onChange={(e)=>setPin(e.target.value)}
/>


<button
onClick={sendMoney}
className="w-full bg-yellow-400 text-black p-3 rounded-xl font-bold"
>
Send Money
</button>


<p className="text-center mt-5">
{message}
</p>


</div>

</main>

);

}
