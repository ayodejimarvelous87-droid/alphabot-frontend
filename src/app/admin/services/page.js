"use client";

import {useEffect,useState} from "react";


export default function AdminServices(){

const [settings,setSettings]=useState({});
const [message,setMessage]=useState("");


const loadSettings=async()=>{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/services",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
}
}
);


const data=await res.json();

setSettings(data);

};


useEffect(()=>{

loadSettings();

},[]);



const save=async(service)=>{

let payload={};


if(service==="electricity"){

payload={
electricityProfit:
settings.electricityProfit || 0
};

}


if(service==="tv"){

payload={
tvProfit:
settings.tvProfit || 0
};

}


if(service==="betting"){

payload={
bettingFee:
settings.bettingFee || 0
};

}


if(service==="recurring"){

payload={
recurringFee:
settings.recurringFee || 0
};

}


if(service==="airtime-cash"){

payload={
airtimeCashProfit:
settings.airtimeCashProfit || 0
};

}



const res=await fetch(
`https://alphabot-1.onrender.com/admin/services/${service}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
},
body:JSON.stringify(payload)
}
);


setMessage(
res.ok
?"✅ Saved"
:"❌ Failed"
);


};


const field=(name,label)=>(
<div className="mt-3">

<label className="block font-bold">
{label}
</label>

<input
className="border p-2 rounded w-full"
type="number"
value={settings[name] || ""}
onChange={(e)=>
setSettings({
...settings,
[name]:Number(e.target.value)
})
}
/>

</div>
);



return(

<div className="p-6">

<h1 className="text-2xl font-bold">
⚙️ Service Management
</h1>

<p>{message}</p>


<div className="border rounded-xl p-5 mt-5">

<h2 className="font-bold">
⚡ Electricity
</h2>

{field(
"electricityProfit",
"Profit Amount"
)}

<button
className="border rounded px-4 py-2 mt-3"
onClick={()=>save("electricity")}
>
Save Electricity
</button>

</div>



<div className="border rounded-xl p-5 mt-5">

<h2 className="font-bold">
📺 TV Subscription
</h2>

{field(
"tvProfit",
"Profit Amount"
)}

<button
className="border rounded px-4 py-2 mt-3"
onClick={()=>save("tv")}
>
Save TV
</button>

</div>



<div className="border rounded-xl p-5 mt-5">

<h2 className="font-bold">
🎲 Betting
</h2>

{field(
"bettingFee",
"Fee"
)}

<button
className="border rounded px-4 py-2 mt-3"
onClick={()=>save("betting")}
>
Save Betting
</button>

</div>



<div className="border rounded-xl p-5 mt-5">

<h2 className="font-bold">
🔁 Recurring
</h2>

{field(
"recurringFee",
"Fee"
)}

<button
className="border rounded px-4 py-2 mt-3"
onClick={()=>save("recurring")}
>
Save Recurring
</button>

</div>


<div className="border rounded-xl p-5 mt-5">

<h2 className="font-bold">
💳 Airtime Cash
</h2>

{field(
"airtimeCashProfit",
"AlphaBot Profit (%)"
)}

<button
className="border rounded px-4 py-2 mt-3"
onClick={()=>save("airtime-cash")}
>
Save Airtime Cash
</button>

</div>


</div>

);

}
