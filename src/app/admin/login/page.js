"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const login = async () => {

    try {

      const res = await fetch(
        "https://alphabot-2.onrender.com/admin/login",
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


      const data = await res.json();


      if(!res.ok){
        setError(data.message || "Login failed");
        return;
      }


      localStorage.setItem(
        "adminToken",
        data.token
      );


      router.push("/admin");

    } catch(err){

      setError("Server error");

    }

  };


  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="p-6 border rounded w-80">

        <h1 className="text-xl font-bold mb-4">
          👑 AlphaBot Admin Login
        </h1>


        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}


        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          className="border p-2 w-full mb-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button
          className="bg-black text-white p-2 w-full"
          onClick={login}
        >
          Login
        </button>


      </div>

    </div>
  );
}
