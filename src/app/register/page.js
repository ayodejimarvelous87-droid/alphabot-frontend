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



        {[
          ["name","Full name"],
          ["phone","Phone number"],
          ["email","Email"],
          ["password","Password"],
          ["referralCode","Referral code (optional)"]
        ].map(([name,placeholder])=>(

          <input
            key={name}
            name={name}
            placeholder={placeholder}
            type={name==="password"?"password":"text"}
            className="w-full mt-4 p-3 rounded-xl bg-black border border-zinc-700"
            onChange={update}
          />

        ))}



        <button
          onClick={register}
          className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-bold"
        >
          Create Account
        </button>


        <p className="text-center text-sm mt-4 text-zinc-400">
          {message}
        </p>


      </div>


    </main>

  );

}
