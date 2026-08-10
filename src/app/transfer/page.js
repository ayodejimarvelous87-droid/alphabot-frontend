"use client";

import {useState,useEffect} from "react";
import Link from "next/link";
import { authenticateWithBiometric } from "@/lib/biometric";
import SuccessCelebration from "@/components/success-celebration";

export default function Transfer(){

const [banks,setBanks]=useState([]);

useEffect(()=>{

const loadBanks=async()=>{

try{

const res=await fetch(
"https://alphabot-1.onrender.com/bank",
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

const data=await res.json();

setBanks(data.data || []);

}catch(error){

console.log(error);

}

};

loadBanks();

},[]);


const [phone,setPhone]=useState("");

useEffect(()=>{

const savedUser = localStorage.getItem("user");

if(savedUser){

const user = JSON.parse(savedUser);

setPhone(user.phone);

}

},[]);

const [bank,setBank]=useState("");
const [searchBank,setSearchBank]=useState("");
const [accountNumber,setAccountNumber]=useState("");
const [accountName,setAccountName]=useState("");
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [biometricLoading,setBiometricLoading]=useState(false);
const [message,setMessage]=useState("");
const [showSuccess,setShowSuccess]=useState(false);
const [verified,setVerified]=useState(false);


const verifyAccount=async()=>{

if(!bank || accountNumber.length < 10){

setMessage("❌ Enter valid bank and account number");
return;

}

try{

const res=await fetch(
"https://alphabot-1.onrender.com/bank/verify",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify({
accountNumber,
bankCode:bank
})
}
);

const data=await res.json();

if(res.ok){

setAccountName(
data.data?.account_name || data.account_name || "Unknown"
);
setVerified(true);
setMessage(
"✅ Account verified: " +
(data.data?.account_name || data.account_name)
);

}else{

setMessage("❌ "+(typeof data.message==="object" ? JSON.stringify(data.message) : data.message));

}

}catch(error){

setMessage("❌ Verification failed");

}

};



const hasBiometricAuthorization =
typeof window !== "undefined" &&
!!localStorage.getItem("biometricToken");

const disabled =
!bank ||
!accountNumber ||
!accountName ||
!amount ||
Number(amount)<=0 ||
(!pin && !hasBiometricAuthorization) ||
!verified;



const transfer=async()=>{

if(disabled){

setMessage("❌ Complete transfer details");
return;

}

try{

setMessage("Processing transfer...");

const res = await fetch(
"https://alphabot-1.onrender.com/transfer/send",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify({
phone,
bankName:banks.find(item=>item.code===bank)?.name,
bankCode:bank,
accountNumber,
accountName,
amount:Number(amount),
pin: localStorage.getItem("biometricToken") ? undefined : pin,
biometricToken: localStorage.getItem("biometricToken") || undefined
})
}
);

const data = await res.json();

if(res.ok){

localStorage.removeItem("biometricToken");

setMessage("✅ Transfer successful");
setShowSuccess(true);
setTimeout(()=>setShowSuccess(false),3000);

}else{

setMessage("❌ "+(typeof data.message==="object" ? JSON.stringify(data.message) : data.message));

}

}catch(error){

setMessage("❌ Connection error");

}

};



return(
<>
<SuccessCelebration
show={showSuccess}
message="🎉 Transfer successful!"
/>


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


<input

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3 mb-3"

placeholder="Search bank..."

value={searchBank}

onChange={(e)=>setSearchBank(e.target.value)}

/>


<select

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"

value={bank}

onChange={(e)=>setBank(e.target.value)}

>

<option value="">
Choose bank
</option>

{
banks
.filter(item =>
item.name.toLowerCase().includes(searchBank.toLowerCase())
)
.map(item=>(

<option key={item.code + item.name} value={item.code}>
{item.name}
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

onClick={async()=>{

try{

setBiometricLoading(true);
setMessage("Touch your fingerprint...");

await authenticateWithBiometric();

setMessage("✅ Fingerprint verified. Tap Transfer Money.");

}catch(error){

localStorage.removeItem("biometricToken");
setMessage("❌ " + error.message);

}finally{

setBiometricLoading(false);

}

}}

disabled={biometricLoading}

className="w-full py-3 rounded-xl font-bold bg-zinc-900 border border-zinc-700 text-white mb-3"

>
{biometricLoading ? "Touch fingerprint..." : "👆 Use Fingerprint"}

</button>


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

</>
);

}
