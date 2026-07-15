"use client";

import { useState } from "react";

export default function Register(){

  const [form,setForm] = useState({
    name:"",
    phone:"",
    email:"",
    password:"",
    referralCode:""
  });

  const [message,setMessage] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const update=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const register=async()=>{

    try{

      const res = await fetch(
        "https://alphabot-i7p2.onrender.com/users/register",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(form)
        }
      );

      const data = await res.json();

      if(res.ok){

        setMessage("Registration successful");

        setTimeout(()=>{
          window.location.href="/login";
        },1500);

      }else{

        setMessage(data.message);

      }

    }catch(error){

      setMessage("Network error");

    }

  };

  return(

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Alpha<span className="text-yellow-400">Bot</span>
        </h1>

        <p className="text-center text-zinc-400 mt-2">
          Create your account
        </p>

        <input
          name="name"
          placeholder="Full name"
          className="w-full mt-6 p-3 rounded-xl bg-black border border-zinc-700"
          onChange={update}
        />

        <input
          name="phone"
          placeholder="Phone number"
          className="w-full mt-4 p-3 rounded-xl bg-black border border-zinc-700"
          onChange={update}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full mt-4 p-3 rounded-xl bg-black border border-zinc-700"
          onChange={update}
        />

        <div className="relative mt-4">

          <input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="w-full p-3 rounded-xl bg-black border border-zinc-700 pr-16"
            onChange={update}
          />

          <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>

        </div>

        <input
          name="referralCode"
          placeholder="Referral code (optional)"
          className="w-full mt-4 p-3 rounded-xl bg-black border border-zinc-700"
          onChange={update}
        />

        <button
          onClick={register}
          className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-bold active:scale-95 transition duration-150"
        >
          Create Account
        </button>

        <p className="text-center text-sm mt-4 text-zinc-400">
          {message}
        </p>

        <p className="text-center text-sm mt-6 text-zinc-400">
          Already have an account?
          <a href="/login" className="text-yellow-400 ml-1">
            Login
          </a>
        </p>

      </div>

    </main>

  );

}
