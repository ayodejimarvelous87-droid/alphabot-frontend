







"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";

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
  const [otp,setOtp] = useState("");
  const [otpSent,setOtpSent] = useState(false);
  const [verified,setVerified] = useState(false);
  const [loading,setLoading] = useState(false);


  const update=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };


  const sendOTP=async()=>{

    if(!form.name || !form.phone || !form.email || !form.password){
      setMessage("Please fill all required fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try{

      const res=await fetch(
        "https://alphabot-1.onrender.com/users/send-registration-otp",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(form)
        }
      );

      const data=await res.json();

      if(res.ok){
        setOtpSent(true);
        setMessage("OTP sent to your email");
      }else{
        setMessage(data.message);
      }

    }catch(error){
      setMessage("Failed to send OTP");
    }

    setLoading(false);

  };


  const verifyOTP=async()=>{

    setLoading(true);
    setMessage("");

    try{

      const res=await fetch(
        "https://alphabot-1.onrender.com/users/verify-registration-otp",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            phone:form.phone,
            otp
          })
        }
      );

      const data=await res.json();

      if(res.ok){

        setVerified(true);
        setMessage("Email verified successfully");

      }else{

        setMessage(data.message);

      }


    }catch(error){

      setMessage("OTP verification failed");

    }

    setLoading(false);

  };


  const register=async()=>{

    if(!verified){

      setMessage("Verify OTP first");
      return;

    }

    setMessage("Registration completed");

    setTimeout(()=>{

      window.location.href="/login";

    },1500);

  };


  const inputStyle =
  "w-full mt-4 p-3.5 rounded-xl bg-[#050505] text-white border border-zinc-800 focus:border-zinc-400 outline-none transition placeholder:text-zinc-500";


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


        {/* LOGO */}

        <div className="flex justify-center mb-6">

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
          shadow-inner
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
          Create Account
        </h1>


        <p className="
        text-center 
        text-zinc-400 
        mt-2 
        text-sm
        ">
          Join AlphaBot and manage your digital payments securely.
        </p>


        <p className="
        text-center
        text-xs
        text-zinc-500
        mt-2
        ">
          Secure wallet • Fast payments • Digital services
        </p>



        <input
          name="name"
          placeholder="Full name"
          className={inputStyle}
          onChange={update}
        />


        <div className="mt-4">

          <PhoneInput
            value={form.phone}
            onChange={(value)=>
              setForm({
                ...form,
                phone:value
              })
            }
          />

        </div>


        <input
          name="email"
          type="email"
          placeholder="Email address"
          className={inputStyle}
          onChange={update}
        />



        <div className="relative">

          <input
            name="password"
            placeholder="Password"
            type={showPassword ? "text":"password"}
            className={`${inputStyle} pr-14`}
            onChange={update}
          />


          <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="
            absolute 
            right-4 
            top-8 
            text-zinc-400
            "
          >

            {
              showPassword
              ?
              <EyeOff size={18}/>
              :
              <Eye size={18}/>
            }

          </button>


          <p className="
          text-xs 
          text-zinc-500 
          mt-1
          ml-1
          ">
            Minimum 8 characters recommended
          </p>


        </div>




        <input
          name="referralCode"
          placeholder="Referral code (optional)"
          className={inputStyle}
          onChange={update}
        />




        {!otpSent ? (


          <button
          onClick={sendOTP}
          disabled={loading}
          className="
          w-full
          mt-6
          bg-white
          text-black
          py-3.5
          rounded-xl
          font-bold
          hover:scale-[1.02]
          transition
          disabled:opacity-50
          "
          >

          {
            loading
            ?
            "Sending..."
            :
            "Send Verification OTP"
          }

          </button>



        ) : (


          <div>


            <input
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            className={inputStyle}
            />



            <button
            onClick={verifyOTP}
            disabled={loading}
            className="
            w-full
            mt-4
            bg-white
            text-black
            py-3.5
            rounded-xl
            font-bold
            hover:scale-[1.02]
            transition
            "
            >

            {
              loading
              ?
              "Verifying..."
              :
              "Verify OTP"
            }


            </button>



          </div>


        )}



        {
          verified &&
          <button
          onClick={register}
          className="
          w-full
          mt-4
          bg-zinc-200
          text-black
          py-3.5
          rounded-xl
          font-bold
          "
          >
            Create Account
          </button>
        }




        <p className="
        text-center 
        text-sm 
        mt-5 
        text-zinc-400
        ">
          {message}
        </p>




        <p className="
        text-center 
        text-sm 
        mt-6 
        text-zinc-400
        ">

          Already have an account?

          <Link
          href="/login"
          className="
          text-white
          ml-1
          font-semibold
          "
          >
            Login
          </Link>

        </p>


      </div>


    </main>

  );

}
