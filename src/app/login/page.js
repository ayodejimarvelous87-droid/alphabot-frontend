"use client";

import { useState } from "react";
import PhoneInput from "@/components/PhoneInput";
import Toast from "@/components/Toast";

export default function Login() {

  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const [showPassword,setShowPassword] = useState(false);
const [loading,setLoading] = useState(false);

  const login = async()=>{

    try{
      setLoading(true);
      setMessage("");

        console.log("LOGIN DATA:", {phone, password});
      const res = await fetch(
        "https://alphabot-1.onrender.com/users/login",
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
          setLoading(false);
        return;
      }

      if(data.token){

        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));

          setLoading(false);
        setMessage("Login successful");

        window.location.href="/dashboard";

      }else{

        setMessage(data.message);
          setLoading(false);

      }

    }catch(error){

        setLoading(false);
        console.log("LOGIN ERROR:", error); setMessage(error.message);

    }

  };

  return(

    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex items-center justify-center px-6">

      <Toast message={message} type="error" />
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Alpha<span className="text-yellow-400">Bot</span>
        </h1>

        <p className="text-center text-zinc-400 mt-2">
          Login to your account
        </p>

        <div className="mt-8">
          <PhoneInput
            value={phone}
            onChange={(value)=>setPhone(value)}
          />
        </div>

        <div className="relative mt-4">

          <input
            className="w-full p-3 rounded-xl bg-white text-black dark:bg-black dark:text-white border border-zinc-700 pr-16"
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
          className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-bold active:scale-95 transition duration-150"
            disabled={loading} >
            {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4 text-zinc-400">
          {message}
        </p>

        <div className="text-center mt-6 space-y-3 text-sm">

          <a href="/forgot-password" className="text-yellow-400">
            Forgot password?
          </a>

          <p className="text-zinc-400">
            Don't have an account?
            <a href="/register" className="text-yellow-400 ml-1">
              Create account
            </a>
          </p>

        </div>

      </div>

    </main>

  );

}
