"use client";

import {useEffect,useState} from "react";

export default function AdminProfits(){

const [data,setData]=useState({
totalSales:0,
totalCost:0,
totalProfit:0,
airtimeProfit:0,
records:[]
});

const [message,setMessage]=useState("");


useEffect(()=>{

const load=async()=>{

try{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/profits",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
}
}
);


const result=await res.json();


if(res.ok){

setData(result);

}else{

setMessage(result.message || "Failed");

}


}catch(error){

setMessage("Connection error");

}

};

load();

},[]);



return(

<div className="p-6">


<h1 className="text-3xl font-bold">
📈 Revenue & Profit
</h1>


<p>{message}</p>


<div className="grid gap-4 mt-6">


<div className="border rounded-xl p-5">
<h2>Total Sales</h2>
<p className="text-2xl font-bold">
₦{data.totalSales}
</p>
</div>


<div className="border rounded-xl p-5">
<h2>Provider Cost</h2>
<p className="text-2xl font-bold">
₦{data.totalCost}
</p>
</div>


<div className="border rounded-xl p-5">
<h2>Total Profit</h2>
<p className="text-2xl font-bold">
₦{data.totalProfit}
</p>
</div>


<div className="border rounded-xl p-5">
<h2>Airtime Profit</h2>
<p className="text-2xl font-bold">
₦{data.airtimeProfit}
</p>
</div>


</div>


<h2 className="font-bold mt-8">
Profit Records
</h2>


{data.records.map((item)=>(

<div
key={item._id}
className="border rounded-xl p-4 mt-3"
>

<p>
Service: {item.service}
</p>


<p>
Sales: ₦{item.customerAmount}
</p>


<p>
Cost: ₦{item.providerCost}
</p>


<p>
Profit: ₦{item.profit}
</p>


<p>
Date: {new Date(item.createdAt).toLocaleString()}
</p>


</div>

))}


</div>

);

}
