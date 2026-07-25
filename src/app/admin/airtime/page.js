



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
const [inventory,setInventory]=useState([]);
const [message,setMessage]=useState("");



const token =
typeof window !== "undefined"
?
localStorage.getItem("adminToken")
:
"";



const loadPrices=async()=>{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/airtime-prices",
{
headers:{
Authorization:`Bearer ${token}`
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



const loadInventory=async()=>{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/airtime-inventory",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();

setInventory(data);

};



useEffect(()=>{

loadPrices();
loadInventory();

},[]);



const savePrice=async(network)=>{

const item=prices[network];


const res=await fetch(

`https://alphabot-1.onrender.com/admin/airtime-prices/${network}`,

{
method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify(item)

}

);


setMessage(
res.ok
?
"✅ Airtime price saved"
:
"❌ Failed"
);


};



const saveLimit=async(item)=>{

const res=await fetch(

`https://alphabot-1.onrender.com/admin/airtime-inventory/${item.network}`,

{
method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({
limit:Number(item.limit)
})

}

);


if(res.ok){

setMessage(
"✅ Inventory limit updated"
);

loadInventory();

}else{

setMessage(
"❌ Failed to update limit"
);

}

};




return(

<div className="p-6">


<h1 className="text-2xl font-bold">
📱 Airtime Management
</h1>


<p className="mt-2">
{message}
</p>



<h2 className="text-xl font-bold mt-8">
💰 Airtime Pricing
</h2>



{networks.map(network=>{

const item=prices[network] || {
network,
providerPrice:0,
sellingPrice:0,
active:true
};


return(

<div
key={network}
className="border rounded p-4 mt-4"
>


<h3 className="font-bold">
{network}
</h3>


<p>
Provider Cost: ₦{item.providerPrice}
</p>


<p>
Profit: ₦{
Number(item.sellingPrice||0)
-
Number(item.providerPrice||0)
}
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
onClick={()=>savePrice(network)}
>

Save Price

</button>


</div>

)

})}



<h2 className="text-xl font-bold mt-10">
📦 Airtime Inventory
</h2>



{inventory.map(item=>(

<div
key={item.network}
className="border rounded p-4 mt-4"
>

<h3 className="font-bold">
{item.network}
</h3>


<p>
Stored Airtime: ₦{item.storedAmount}
</p>


<input
className="border p-2 mt-2"
type="number"
value={item.limit}
onChange={(e)=>{

setInventory(
inventory.map(inv=>
inv.network===item.network
?
{
...inv,
limit:Number(e.target.value)
}
:
inv
)
)

}}
/>



<button
className="bg-black text-white px-4 py-2 mt-3"
onClick={()=>saveLimit(item)}
>

Save Limit

</button>


</div>

))}



</div>

);

}
