"use client";

import {useEffect,useState} from "react";


export default function AdminElectricity(){

const [settings,setSettings]=useState([]);
const [message,setMessage]=useState("");



const loadSettings=async()=>{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/electricity-settings",
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




const save=async(item)=>{

const res=await fetch(

`https://alphabot-1.onrender.com/admin/electricity-settings/${item.disco}`,

{
method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
},

body:JSON.stringify({

fee:Number(item.fee),

active:item.active

})

}

);


setMessage(
res.ok
?"✅ Updated"
:"❌ Failed"
);

};



return(

<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
⚡ Electricity Management
</h1>

<p>{message}</p>


{settings.map((item,index)=>(

<div
key={item._id}
className="border rounded-xl p-4 mt-4"
>

<h2 className="font-bold">
{item.disco}
</h2>


<p>
Current Fee: ₦{item.fee}
</p>


<input
className="border p-2 mt-2 w-full"
type="number"
value={item.fee}
onChange={(e)=>{

const copy=[...settings];

copy[index].fee=
Number(e.target.value);

setSettings(copy);

}}
/>


<label className="block mt-3">

<input
type="checkbox"
checked={item.active}
onChange={(e)=>{

const copy=[...settings];

copy[index].active=
e.target.checked;

setSettings(copy);

}}
/>

 Active

</label>


<button
className="border rounded px-4 py-2 mt-3"
onClick={()=>save(item)}
>
Save
</button>


</div>

))}


</div>

);

}
