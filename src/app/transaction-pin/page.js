"use client";

import { useState } from "react";
import Link from "next/link";

export default function TransactionPin(){

const [pin,setPin] = useState("");
const [message,setMessage] = useState("");


const createPin = async()=>{

try{

setMessage("Creating PIN...");


const user = JSON.parse(localStorage.getItem("user"));


const token = localStorage.getItem("token");


const res = await fetch(
"https://alphabot-1.onrender.com/pin/set",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`
},
body:JSON.stringify({
phone:user.phone,
pin
})
}
);


const data = await res.json();


if(res.ok){

setMessage("✅ " + data.message);

}else{

setMessage("❌ " + data.message);

}


}catch(error){

setMessage("❌ Connection error");

}

};


return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">

<div className="max-w-md mx-auto">

<h1 className="text-3xl font-bold">
🔐 Transaction PIN
</h1>

<p className="text-zinc-400 mt-2">
Create your 4 digit payment PIN
</p>


<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<input

type="password"

maxLength="4"

className="w-full bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"

placeholder="Enter 4 digit PIN"

value={pin}

onChange={(e)=>setPin(e.target.value)}

/>


<button

onClick={createPin}

className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"

>
Create PIN
</button>


<p className="text-center mt-4 text-zinc-300 text-sm">

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
