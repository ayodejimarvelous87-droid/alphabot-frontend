"use client";

import {useEffect,useState} from "react";


export default function AdminTransfer(){

const API="https://alphabot-1.onrender.com";


const [settings,setSettings]=useState({

transferFee:10,
feeEnabled:true,
promoActive:false,
promoMessage:""

});


const [message,setMessage]=useState("");



const loadSettings=async()=>{

const res=await fetch(
`${API}/admin/transfer-settings`,
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





const save=async()=>{

const res=await fetch(
`${API}/admin/transfer-settings`,
{
method:"PUT",

headers:{
"Content-Type":"application/json",

Authorization:
`Bearer ${localStorage.getItem("adminToken")}`

},

body:JSON.stringify(settings)

}

);


setMessage(
res.ok
?
"✅ Transfer settings updated"
:
"❌ Update failed"
);

};





return(

<div className="p-4 md:p-6 space-y-6">


<h1 className="text-2xl font-bold">
🏦 Transfer Management
</h1>


<p className="mt-2">
{message}
</p>



<div className="border rounded-xl p-4 mt-5 space-y-4">


<label>
Transfer Fee (₦)
</label>


<input
className="border p-2 w-full"
type="number"
value={settings.transferFee}
onChange={(e)=>
setSettings({
...settings,
transferFee:Number(e.target.value)
})
}
/>



<label className="block">

<input
type="checkbox"
checked={settings.feeEnabled}
onChange={(e)=>
setSettings({
...settings,
feeEnabled:e.target.checked
})
}
/>

 Enable Transfer Fee

</label>




<label className="block">

<input
type="checkbox"
checked={settings.promoActive}
onChange={(e)=>
setSettings({
...settings,
promoActive:e.target.checked
})
}
/>

 Enable Promo

</label>




<input
className="border p-2 w-full"
placeholder="Promo message"
value={settings.promoMessage}
onChange={(e)=>
setSettings({
...settings,
promoMessage:e.target.value
})
}
/>




<button
className="border rounded px-4 py-2"
onClick={save}
>
Save
</button>



</div>


</div>

);

}
