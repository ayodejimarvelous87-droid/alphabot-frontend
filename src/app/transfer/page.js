"use client";

import {useState} from "react";
import Link from "next/link";

export default function Transfer(){

const banks=[
"Access Bank",
"GTBank",
"First Bank",
"UBA",
"Zenith Bank",
"Moniepoint",
"Opay",
"Kuda Bank"
];


const [bank,setBank]=useState("");
const [accountNumber,setAccountNumber]=useState("");
const [accountName,setAccountName]=useState("");
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [verified,setVerified]=useState(false);


const verifyAccount=()=>{

if(!bank || accountNumber.length < 10){

setMessage("❌ Enter valid bank and account number");
return;

}

setAccountName("Account Holder");
setVerified(true);
setMessage("✅ Account verified");

};



const disabled =
!bank ||
!accountNumber ||
!accountName ||
!amount ||
Number(amount)<=0 ||
!pin ||
!verified;



const transfer=()=>{

if(disabled){

setMessage("❌ Complete transfer details");
return;

}

setMessage("Processing transfer...");

};



return(

<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto space-y-5">


<h1 className="text-3xl font-black">
🏦 Bank Transfer
</h1>


<p className="text-zinc-400">
Send money securely to any Nigerian bank
</p>




<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">



<div>

<p className="text-xs text-zinc-500 mb-2">
Select Bank
</p>


<select

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"

value={bank}

onChange={(e)=>setBank(e.target.value)}

>

<option value="">
Choose bank
</option>

{
banks.map(item=>(

<option key={item}>
{item}
</option>

))
}

</select>

</div>





<input

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"

placeholder="Account number"

value={accountNumber}

onChange={(e)=>setAccountNumber(e.target.value)}

 />





<button

onClick={verifyAccount}

className="w-full bg-blue-600 py-3 rounded-xl font-bold"

>

Verify Account

</button>






<div className="bg-[#050505] border border-zinc-800 rounded-xl p-3">

<p className="text-xs text-zinc-500">
Account Name
</p>

<p className="font-bold mt-1">
{accountName || "Not verified"}
</p>

</div>







<input

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"

placeholder="Amount"

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

 />






<input

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"

placeholder="Transaction PIN"

type="password"

maxLength="4"

value={pin}

onChange={(e)=>setPin(e.target.value)}

 />






<button

onClick={transfer}

disabled={disabled}

className={`w-full py-3 rounded-xl font-bold ${
disabled
?
"bg-zinc-700 text-zinc-400"
:
"bg-yellow-400 text-black"
}`}

>

Transfer Money

</button>





<p className="text-center text-sm text-zinc-400">
{message}
</p>



</div>





<Link

href="/dashboard"

className="block text-center text-zinc-400 mt-6"

>

← Dashboard

</Link>



</div>


</main>

);

}
