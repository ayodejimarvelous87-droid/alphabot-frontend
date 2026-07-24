"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function AdminLogin(){

const router = useRouter();

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");

const login=async()=>{

try{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
password
})
}
);


const data=await res.json();


if(!res.ok){

setError(data.message || "Login failed");
return;

}


localStorage.setItem(
"adminToken",
data.token
);


router.push("/admin");


}catch(error){

setError("Server error");

}

};


return(

<div className="min-h-screen flex items-center justify-center bg-black text-white">


<div className="bg-zinc-900 p-6 rounded-3xl w-80">


<h1 className="text-2xl font-bold mb-5">
👑 AlphaBot Admin Login
</h1>


{error && (
<p className="text-red-400 mb-3">
{error}
</p>
)}


<input
className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-3"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>


<input
className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-4"
placeholder="Password"
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button
onClick={login}
className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
Login
</button>


</div>


</div>

);

}
