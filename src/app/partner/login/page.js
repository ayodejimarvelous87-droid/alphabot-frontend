"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Toast from "@/components/Toast";

export default function PartnerLogin(){

const router=useRouter();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [message,setMessage]=useState("");
  const [toast,setToast]=useState("");
const [loading,setLoading]=useState(false);


const login=async()=>{

setLoading(true);

try{

const res=await fetch(
"https://alphabot-1.onrender.com/blog-partner/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
}
);


const data=await res.json();


if(res.ok){

setToast("✅ Login successful");

localStorage.setItem(
"partnerToken",
data.token
);


localStorage.setItem(
"partner",
JSON.stringify(data.partner)
);


setTimeout(()=>{
  router.push("/partner/dashboard");
  },1000);


}else{

setMessage(data.message);

}

}catch(error){

console.log(error);
setMessage("Login failed. Try again.");

}

};


return(

<main className="
min-h-screen
bg-[#050505]
text-white
flex
items-center
justify-center
px-6
py-10
">


<div className="
w-full
max-w-md
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-8
shadow-[0_20px_50px_rgba(0,0,0,0.5)]
">


<div className="
flex
justify-center
mb-6
">

<div className="
w-14
h-14
rounded-2xl
bg-black
border
border-zinc-700
flex
items-center
justify-center
">

<span className="
text-3xl
font-black
bg-gradient-to-br
from-white
to-zinc-400
bg-clip-text
text-transparent
">
A
</span>

</div>

</div>


<h1 className="
text-3xl
font-bold
text-center
">
Partner Login
</h1>


<p className="
text-center
text-zinc-400
text-sm
mt-2
">
Access your AlphaBot partner dashboard.
</p>


<input
className="
w-full
mt-8
p-3.5
rounded-xl
bg-[#050505]
border
border-zinc-800
focus:border-zinc-400
outline-none
"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="
w-full
mt-4
p-3.5
rounded-xl
bg-[#050505]
border
border-zinc-800
focus:border-zinc-400
outline-none
"
placeholder="Password"
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button
className="
w-full
mt-5
bg-white
text-black
py-3
rounded-xl
font-bold
"
onClick={()=>{console.log("LOGIN CLICKED"); login();}}
>
{loading ? "Logging in..." : "Login"}
</button>


<p className="text-red-400 mt-3 text-sm">
{message}
</p>


<p
className="
mt-5
text-center
text-zinc-400
cursor-pointer
underline
"
onClick={()=>router.push("/partner/register")}
>

<p
className="
mt-5
text-center
text-zinc-400
cursor-pointer
underline
"
onClick={()=>router.push("/partner/forgot-password")}
>
Forgot password?
</p>


Create Blog Partner Account
</p>


</div>

<Toast
message={toast}
onClose={()=>setToast("")}
/>

</main>

);

}
