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
<div className="p-6">

<h1 className="text-2xl font-bold">
👥 AlphaBot Users
</h1>


<p>
Total Users: {users.length}
</p>

<input
className="border rounded-xl p-3 w-full mt-5"
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
className="border rounded-xl p-4"
>


<h2 className="font-bold">
{user.name || "No Name"}
</h2>


<p>
📱 Phone: {user.phone}
</p>


<a
href={`/admin/users/${user.phone}`}
className="border rounded-lg px-3 py-2 inline-block mt-3"
>
👤 View Profile
</a>


<p>
📧 Email: {user.email || "None"}
</p>


<p>
Role: {user.role || "user"}
</p>


<p>
Joined: {
user.createdAt
? new Date(user.createdAt).toDateString()
:"Unknown"
}
</p>


<p>
Status: {user.status || "active"}
</p>


<div className="flex gap-2 flex-wrap mt-3">


{user.status==="suspended" ? (

<button
onClick={()=>updateUserStatus(user.phone,"activate")}
className="border rounded-lg px-3 py-2"
>
🟢 Activate
</button>

):(

<button
onClick={()=>updateUserStatus(user.phone,"suspend")}
className="border rounded-lg px-3 py-2"
>
🔴 Suspend
</button>

)}


</div>

<div className="flex gap-2 flex-wrap mt-3">

{user.role==="admin" ? (

<button
onClick={()=>changeUserRole(user.phone,"demote")}
className="border rounded-lg px-3 py-2"
>
⬇️ Demote Admin
</button>

):(

<button
onClick={()=>changeUserRole(user.phone,"upgrade")}
className="border rounded-lg px-3 py-2"
>
⬆️ Make Admin
</button>

)}

</div>

<div className="flex gap-2 flex-wrap mt-3">

<button
onClick={()=>deleteUserAccount(user.phone)}
className="border rounded-lg px-3 py-2"
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
