"use client";

import { useState } from "react";

export default function Login() {

  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const login = async()=>{

    try{

      const res = await fetch(
        "https://alphabot-i7p2.onrender.com/users/login",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            phone,
            password
          })
        }
      );

      const data = await res.json();

      if(!res.ok){
        setMessage(data.message || "Login failed");
        return;
      }

      if(data.token){

        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));

        setMessage("Login successful");

        window.location.href="/dashboard";

      }else{

        setMessage(data.message);

      }

    }catch(error){

      setMessage(error.message);

    }

  };

  return(

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Alpha<span className="text-yellow-400">Bot</span>
        </h1>

        <p className="text-center text-zinc-400 mt-2">
          Login to your account
        </p>

        <input
          className="w-full mt-8 p-3 rounded-xl bg-black border border-zinc-700"
          placeholder="Phone number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        />

        <div className="relative mt-4">

          <input
            className="w-full p-3 rounded-xl bg-black border border-zinc-700 pr-16"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>

        </div>

        <button
          onClick={login}
          className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-bold"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4 text-zinc-400">
          {message}
        </p>

      </div>

    </main>

  );

}
