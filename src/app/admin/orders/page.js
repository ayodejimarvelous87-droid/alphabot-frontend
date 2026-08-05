"use client";

import {useEffect,useState} from "react";

export default function AdminOrders(){

const [orders,setOrders]=useState([]);
const [message,setMessage]=useState("");


const loadOrders=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-1.onrender.com/admin/orders",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();


if(res.ok){

setOrders(data);

}else{

setMessage(data.message || "Unable to load orders");

}

};



useEffect(()=>{

loadOrders();

},[]);



return(

<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
📦 Orders Management
</h1>


<p className="mt-3">
{message}
</p>


<div className="space-y-4 mt-6">


{orders.map(order=>(

<div
key={order._id}
className="border rounded-xl p-5"
>


<p>
📱 User: {order.phone}
</p>


<p>
📦 Product: {order.productName}
</p>


<p>
💰 Amount: ₦{order.amount}
</p>


<p>
📌 Status: {order.status}
</p>


<p>
📅 Date: {new Date(order.createdAt).toLocaleString()}
</p>


</div>

))}


</div>


</div>

);

}
