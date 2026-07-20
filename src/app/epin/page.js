"use client";

import {useState} from "react";

export default function EPin(){

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("mtn");
const [amount,setAmount]=useState("");
const [quantity,setQuantity]=useState(1);
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [epinResult,setEpinResult]=useState(null);
const [loading,setLoading]=useState(false);


const buyEPin=async()=>{

try{

setLoading(true);
setEpinResult(null);

const token=localStorage.getItem("token");

const res=await fetch(
"https://alphabot-1.onrender.com/epin/buy",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone,
network,
amount:Number(amount),
quantity:Number(quantity),
pin
})
}
);


const data=await res.json();


if(!res.ok){
throw new Error(data.message || "Purchase failed");
}


setMessage("✅ ePIN purchased successfully");

setEpinResult(data.epin);


}catch(err){

setMessage("❌ "+err.message);

}finally{

setLoading(false);

}

};


return(
<main className="p-5">
<div className="max-w-md mx-auto space-y-4">

<h1 className="text-3xl font-bold">
💳 ePIN
</h1>


<input className="w-full p-3 border rounded"
placeholder="Phone"
value={phone}
onChange={e=>setPhone(e.target.value)}
/>


<select className="w-full p-3 border rounded"
value={network}
onChange={e=>setNetwork(e.target.value)}
>
<option value="mtn">MTN</option>
<option value="glo">Glo</option>
<option value="airtel">Airtel</option>
<option value="9mobile">9mobile</option>
</select>


<input className="w-full p-3 border rounded"
placeholder="Amount"
value={amount}
onChange={e=>setAmount(e.target.value)}
/>


<input className="w-full p-3 border rounded"
placeholder="Quantity"
value={quantity}
onChange={e=>setQuantity(e.target.value)}
/>


<input className="w-full p-3 border rounded"
placeholder="Transaction PIN"
type="password"
maxLength="4"
value={pin}
onChange={e=>setPin(e.target.value)}
/>


<button
disabled={loading}
onClick={buyEPin}
className="w-full bg-yellow-400 p-3 rounded font-bold"
>
{loading?"Processing...":"Buy ePIN"}
</button>


<p>{message}</p>


{epinResult && (

<div className="p-4 border rounded bg-green-50">

<h2 className="font-bold text-xl">
🎉 Your Recharge PIN
</h2>


<p>
Network: {epinResult.network.toUpperCase()}
</p>


<p>
PIN:
</p>

<div className="text-2xl font-bold">
{epinResult.pins.join(", ")}
</div>


<p className="mt-2">
Dial *311*PIN# to recharge
</p>


<p>
Order: {epinResult.order_id || "Processing"}
</p>

</div>

)}


</div>
</main>
)

}
