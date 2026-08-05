"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";

export default function Page(){

const [phone,setPhone]=useState("");
const [provider,setProvider]=useState("");
  const [services,setServices]=useState([]);
  const [servicesLoading,setServicesLoading]=useState(true);
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);

  useEffect(()=>{

    const loadServices = async()=>{

      try{

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/betting/services`
        );

        const data = await res.json();

        if(Array.isArray(data)){
          setServices(data);

          if(data.length){
            setProvider(data[0].service);
          }
        }else{
          setServices([]);
        }

      }catch(error){

        console.log("Betting services error:", error.message);
        setServices([]);

      }finally{

        setServicesLoading(false);

      }

    };

    loadServices();

  },[]);



const fundBetting=async()=>{

try{

  if(!phone || !provider || !amount || !pin){
    setMessage("❌ Please fill all fields");
    return;
  }

  if(Number(amount) <= 0){
    setMessage("❌ Enter a valid amount");
    return;
  }

setLoading(true);
setMessage("Processing...");


const token=localStorage.getItem("token");


const res=await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/betting/fund`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
customer_id:phone,
service_id:provider,
amount:Number(amount),
pin
})
}
);


const data=await res.json();


  if(res.ok){

    setMessage(`✅ ${data.message || "Betting wallet funded successfully"}`);
    setAmount("");

  }else{

    if(
      data.message &&
      data.message.toLowerCase().includes("wait for 3 minutes")
    ){
      setMessage("⏳ Please wait before trying another betting funding.");
    }else{
      setMessage(
        `❌ ${data.message || data.error || "Betting request failed"}`
      );
    }

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
🎮 Betting
</h1>


<p className="text-zinc-400">
Fund your betting wallet instantly
</p>




<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">



<div>

<p className="text-xs text-zinc-500 mb-2">
Phone Number
</p>

<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>

</div>




<div>

<p className="text-xs text-zinc-500 mb-2">
Betting Platform
</p>


<select
  className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
  value={provider || services[0]?.service || ""}
  onChange={(e)=>setProvider(e.target.value)}
>

  {services.map((item)=>(
    <option
      key={item._id}
      value={item.service}
    >
      {item.service}
    </option>
  ))}
</select>

</div>




  <div className="flex gap-2 flex-wrap">
    {[100,200,500,1000].map((value)=>(
      <button
      key={value}
      type="button"
      onClick={()=>setAmount(String(value))}
      className="bg-zinc-800 px-4 py-2 rounded-xl text-sm hover:bg-zinc-700"
      >
        ₦{value}
      </button>
    ))}
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
onClick={fundBetting}
disabled={loading}
className="w-full bg-white text-black py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
>

{
loading
?"Processing..."
:"Fund Betting"
}

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
