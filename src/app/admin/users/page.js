"use client";

import { useEffect, useState } from "react";

export default function AdminUsers(){

  const [users,setUsers] = useState([]);

  useEffect(()=>{

    const loadUsers = async()=>{

      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        "https://alphabot-2.onrender.com/admin/users",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setUsers(data);

    };

    loadUsers();

  },[]);


  return (
    <div style={{padding:"30px"}}>

      <h1>👥 AlphaBot Users</h1>

      <p>Total Users: {users.length}</p>


      {users.map((user)=>(
        <div
          key={user._id}
          style={{
            border:"1px solid #ccc",
            padding:"15px",
            margin:"10px 0"
          }}
        >

          <p>Name: {user.name}</p>
          <p>Phone: {user.phone}</p>
          <p>Email: {user.email || "None"}</p>

        </div>
      ))}


    </div>
  );

}
