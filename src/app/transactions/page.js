"use client";

import { useEffect, useState } from "react";

export default function Transactions(){

const [transactions,setTransactions]=useState([]);
const [loading,setLoading]=useState(true);



useEffect(()=>{

const token=localStorage.getItem("token");
const saved=localStorage.getItem("user");


if(!token || !saved){
window.location.href="/login";
return;
}


const user=JSON.parse(saved);


fetch(
`https://alphabot-i7p2.onrender.com/wallet/transactions/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(data=>{

setTransactions(data);
setLoading(false);

})
.catch(()=>{

setLoading(false);

});


},[]);



return(

<main className="min-h-screen bg-black text-white px-6 py-8">


<h1 className="text-3xl font-bold">
Transactions
</h1>


<p className="text-zinc-400 mt-2">
Your wallet activity
</p>



<div className="mt-8 space-y-4">


{loading && (

<p className="text-zinc-400">
Loading transactions...
</p>

)}



{!loading && transactions.length===0 && (

<p className="text-zinc-400">
No transactions yet
</p>

)}



{transactions.map((item)=>(


<div
key={item._id}
className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
>


<div className="flex justify-between">

<h3 className="font-bold">

{item.type}

</h3>


<span
className={
item.direction==="credit"
?
"text-green-400"
:
"text-red-400"
}
>

{item.direction==="credit"?"+":"-"}
₦{item.amount}

</span>


</div>



<p className="text-zinc-400 text-sm mt-2">

{item.description}

</p>



<p className="text-xs text-zinc-500 mt-2">

{new Date(item.createdAt).toLocaleString()}

</p>


</div>


))}


</div>


</main>

)

}
