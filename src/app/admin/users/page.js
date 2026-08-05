"use client";

import {useEffect,useState} from "react";

export default function AdminUsers(){

const [users,setUsers]=useState([]);
const [search,setSearch]=useState("");


useEffect(()=>{

const loadUsers=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-1.onrender.com/admin/users",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();

setUsers(data);

};


loadUsers();

},[]);




const updateUserStatus = async(phone,action)=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
`https://alphabot-1.onrender.com/admin/user/${action}/${phone}`,
{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();


if(res.ok){

setMessage(data.message);


setUsers(users.map(user=>
user.phone===phone
?
{
...user,
status:action==="suspend"
?"suspended"
:"active"
}
:user
));


}else{

setMessage(data.message || "Failed");

}

};

const changeUserRole = async(phone,action)=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
`https://alphabot-1.onrender.com/admin/user/${action}/${phone}`,
{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();


if(res.ok){

setMessage(data.message);


setUsers(users.map(user=>
user.phone===phone
?
{
...user,
role:action==="upgrade"
?"admin"
:"user"
}
:user
));


}else{

setMessage(data.message || "Failed");

}

};



const deleteUserAccount = async(phone)=>{

const confirmDelete = confirm(
"Are you sure you want to delete this user?"
);

if(!confirmDelete) return;


const token=localStorage.getItem("adminToken");


const res=await fetch(
`https://alphabot-1.onrender.com/admin/user/${phone}`,
{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();


if(res.ok){

setMessage(data.message);

setUsers(users.filter(user=>user.phone!==phone));

}else{

setMessage(data.message || "Failed");

}

};


return(
<div className="min-h-screen bg-[#090d16] text-white p-4 md:p-6 space-y-6">

<h1 className="text-3xl font-bold text-white">
👥 AlphaBot Users
</h1>


<p>
Total Users: {users.length}
</p>

<input
className="bg-[#18181B] border border-zinc-800 rounded-xl p-3 w-full mt-5 text-white placeholder-zinc-500"
placeholder="Search by name or phone"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>


<div className="mt-5 space-y-4">


{users
.filter(user =>
(user.name || "").toLowerCase().includes(search.toLowerCase()) ||
(user.phone || "").includes(search)
)
.map(user=>(

<div
key={user._id}
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 shadow-lg"
>


<h2 className="font-bold">
{user.name || "No Name"}
</h2>


<p>
📱 Phone: {user.phone}
</p>


<a
href={`/admin/users/${user.phone}`}
className="bg-white text-black hover:bg-zinc-200 rounded-2xl px-3 py-2 inline-block mt-3 text-white"
>
👤 View Profile
</a>


<p>
📧 Email: {user.email || "None"}
</p>


<div className="flex gap-2 mt-3 flex-wrap">

<span className="px-3 py-1 rounded-full text-sm bg-zinc-800 text-zinc-200">
👤 {user.role || "user"}
</span>

<span className={`px-3 py-1 rounded-full text-sm ${
(user.status || "active") === "suspended"
? "bg-red-950 text-red-400"
: "bg-emerald-950 text-emerald-400"
}`}>
{(user.status || "active") === "suspended"
? "🔴 Suspended"
: "🟢 Active"}
</span>

</div>


<p className="text-sm text-zinc-500 mt-3">
Joined: {
user.createdAt
? new Date(user.createdAt).toDateString()
:"Unknown"
}
</p>


<div className="flex gap-2 flex-wrap mt-3">


{user.status==="suspended" ? (

<button
onClick={()=>updateUserStatus(user.phone,"activate")}
className="rounded-xl px-4 py-2 transition hover:scale-105 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
>
🟢 Activate
</button>

):(

<button
onClick={()=>updateUserStatus(user.phone,"suspend")}
className="rounded-xl px-4 py-2 transition hover:scale-105 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
>
🔴 Suspend
</button>

)}


</div>

<div className="flex gap-2 flex-wrap mt-3">

{user.role==="admin" ? (

<button
onClick={()=>changeUserRole(user.phone,"demote")}
className="rounded-xl px-4 py-2 transition hover:scale-105 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
>
⬇️ Demote Admin
</button>

):(

<button
onClick={()=>changeUserRole(user.phone,"upgrade")}
className="rounded-xl px-4 py-2 transition hover:scale-105 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
>
⬆️ Make Admin
</button>

)}

</div>

<div className="flex gap-2 flex-wrap mt-3">

<button
onClick={()=>deleteUserAccount(user.phone)}
className="rounded-xl px-4 py-2 transition hover:scale-105 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
>
🗑️ Delete User
</button>

</div>


</div>

))}


</div>


</div>
);

}
