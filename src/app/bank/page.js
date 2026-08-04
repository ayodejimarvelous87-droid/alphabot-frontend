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

const [banks,setBanks]=useState([]);
const [bankSearch,setBankSearch]=useState("");
const [bankCode,setBankCode]=useState("");
const [verified,setVerified]=useState(false);
const [verifying,setVerifying]=useState(false);

const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);

const [transferSettings,setTransferSettings]=useState(null);



const loadBeneficiaries=async()=>{

try{

const res=await fetch(
`${API}/transfer/beneficiaries/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();


if(res.ok){

setBeneficiaries(data);

}


}catch(error){

console.log(error);

}

};


const loadBanks=async()=>{

try{

const res=await fetch(
`${API}/bank`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();


if(res.ok){

setBanks(data.data || []);

}


}catch(error){

console.log(error);

}

};




const loadTransferSettings=async()=>{

try{

const res=await fetch(
`${API}/transfer/settings`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();


if(res.ok){

setTransferSettings(data);

}


}catch(error){

console.log(error);

}

};


useEffect(()=>{

loadBeneficiaries();
loadBanks();
loadTransferSettings();

},[]);






const verifyAccount=async()=>{

try{

setVerifying(true);


const res=await fetch(
`${API}/bank/verify`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({

accountNumber,
bankCode

})

}
);


const data=await res.json();


if(res.ok){

setAccountName(
data.data.account_name
);

setVerified(true);
setMessage("✅ Account verified");

}else{

setMessage("❌ "+data.message);

}


}catch(error){

setMessage("❌ Verification failed");

}finally{

setVerifying(false);

}

};



useEffect(()=>{

if(
bankCode &&
accountNumber.length >= 10
){

verifyAccount();

}

},[bankCode,accountNumber]);



const saveBeneficiary=async()=>{

try{

const res=await fetch(
`${API}/transfer/beneficiary`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({

phone:user.phone,
bankName,
bankCode,
accountNumber,
accountName

})

}
);



const data=await res.json();


setMessage(
res.ok
?"✅ Bank account saved successfully"
:data.message
);


if(res.ok){

loadBeneficiaries();

}


}catch(error){

setMessage("❌ Connection error");

}

};






const sendMoney=async()=>{

try{

setLoading(true);
setMessage("Processing...");


const res=await fetch(
`${API}/transfer/send`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({

phone:user.phone,
bankCode,
accountNumber,
accountName,
amount:Number(amount),
pin,
idempotencyKey:"TRANSFER-"+Date.now()

})

}
);



const data=await res.json();


if(res.ok){

setMessage("✅ Money sent successfully");

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
🏦 Bank Transfer
</h1>


<p className="text-zinc-400">
Send money securely to any bank account
</p>


{
transferSettings && transferSettings.promoActive && (

<div className="bg-yellow-400 text-black rounded-2xl p-4 font-bold">
🎉 {transferSettings.promoMessage || "FREE TRANSFER TODAY 🚀"}
</div>

)

}


{
transferSettings && !transferSettings.promoActive && transferSettings.feeEnabled && (

<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4 text-zinc-300">
Transfer fee: ₦{transferSettings.transferFee}
</div>

)

}


{
transferSettings && !transferSettings.feeEnabled && (

<div className="bg-green-600 rounded-2xl p-4 font-bold">
🚀 No transfer fee currently
</div>

)

}




<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">


<h2 className="font-bold">
Save Beneficiary
</h2>


<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Search bank..."
value={bankSearch}
onChange={(e)=>setBankSearch(e.target.value)}
/>


<select
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
value={bankCode}
onChange={(e)=>{

const selected = banks.find(
bank=>bank.code===e.target.value
);

setBankCode(e.target.value);
setBankName(selected?.name || "");
setVerified(false);
setAccountName("");

}}
>

<option value="">
Select Bank
</option>


{
banks.filter(bank =>
bank.name.toLowerCase().includes(
bankSearch.toLowerCase()
)
).map(bank=>(

<option
key={bank.code}
value={bank.code}
>
{bank.name}
</option>

))
}

</select>


<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Account number"
value={accountNumber}
onChange={(e)=>setAccountNumber(e.target.value)}
/>



{verifying && (
<p className="text-blue-400">
Verifying account...
</p>
)}

{accountName && (
<p className="text-green-400">
✅ {accountName}
</p>
)}


<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Account name"
value={accountName}
readOnly
/>



<button
onClick={saveBeneficiary}
disabled={!verified}
className="w-full bg-blue-600 py-3 rounded-xl font-bold disabled:bg-zinc-700 disabled:text-zinc-400"
>
Save Bank Account
</button>


</div>





<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">


<h2 className="font-bold mb-3">
Select Beneficiary
</h2>



{

beneficiaries.length===0 && (

<p className="text-zinc-500 text-sm">
No saved accounts
</p>

)

}



{

beneficiaries.map((b)=>(


<button

key={b._id}

onClick={()=>setBeneficiaryId(b._id)}

className={`w-full text-left p-4 rounded-xl border mb-3 transition ${
beneficiaryId===b._id
?"bg-yellow-400 text-black border-yellow-400"
:"bg-[#050505] border-zinc-700"
}`}

>


<p className="font-bold">
{b.bankName}
</p>

<p className="text-sm">
{b.accountNumber}
</p>

<p className="text-xs opacity-70">
{b.accountName}
</p>


</button>


))

}


</div>






<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">



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

onClick={sendMoney}

disabled={loading}

className="w-full bg-white text-black py-3 rounded-xl font-bold"

>

{

loading
?"Processing..."
:"Send Money"

}

</button>




<p className="text-center text-sm text-zinc-400">
{message}
</p>


</div>



</div>


</main>

);

}
