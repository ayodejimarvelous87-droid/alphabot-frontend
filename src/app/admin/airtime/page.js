"use client";

import {useEffect,useState} from "react";


export default function AdminAirtime(){

const networks=[
"MTN",
"AIRTEL",
"GLO",
"9MOBILE"
];


const [prices,setPrices]=useState({});
const [message,setMessage]=useState("");



const loadPrices=async()=>{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/airtime-prices",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
}
}
);


const data=await res.json();


const result={};


networks.forEach(network=>{

const found=data.find(
(item)=>item.network===network
);


result[network]=found || {
network,
providerPrice:0,
sellingPrice:0,
active:true
};

});


setPrices(result);

};



useEffect(()=>{

loadPrices();

},[]);



const save=async(network)=>{

const item=prices[network];


const res=await fetch(

`https://alphabot-1.onrender.com/admin/airtime-prices/${network}`,

{
method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
},

body:JSON.stringify(item)

}

);


setMessage(
res.ok ? "✅ Saved":"❌ Failed"
);


};



return(

<div className="p-6">

<h1 className="text-2xl font-bold">
📱 Airtime Pricing
</h1>


<p>{message}</p>


{networks.map(network=>{

const item=prices[network] || {
network,
providerPrice:0,
sellingPrice:0,
profit:0,
active:true
};


return(

<div
key={network}
className="border rounded p-4 mt-4"
>


<h2 className="font-bold">
{network}
</h2>


<p>
Provider Cost: ₦{item.providerPrice}
</p>

<p className="mt-2">
Profit: ₦{Number(item.sellingPrice || 0) - Number(item.providerPrice || 0)}
</p>


<input
className="border p-2 mt-2"
type="number"
value={item.sellingPrice}
onChange={(e)=>
setPrices({
...prices,
[network]:{
...item,
sellingPrice:Number(e.target.value)
}
})
}
/>



<label className="block mt-2">

<input
type="checkbox"
checked={item.active}
onChange={(e)=>
setPrices({
...prices,
[network]:{
...item,
active:e.target.checked
}
})
}
/>

 Active

</label>



<button

className="bg-black text-white px-4 py-2 mt-3"

onClick={()=>save(network)}

>

Save

</button>


</div>

)

})}


</div>

);

}
