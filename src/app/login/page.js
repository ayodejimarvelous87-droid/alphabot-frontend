"use client";

import { useState } from "react";
import PhoneInput from "@/components/PhoneInput";
import Toast from "@/components/Toast";
import { startAuthentication } from "@simplewebauthn/browser";

export default function Login(){

  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
const [toast,setToast] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);


  const biometricLogin = async () => {

    try {

      if (!phone) {
        setMessage("Enter your phone number first");
        return;
      }

      setLoading(true);
      setMessage("Starting fingerprint login...");

      const optionsRes = await fetch(
        "https://api.alphabothq.com/biometric/login/options",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            phone
          })
        }
      );

      const options = await optionsRes.json();

      if (!optionsRes.ok) {
        throw new Error(
          options.message ||
          "Fingerprint login is not available"
        );
      }

      setMessage("Touch your fingerprint sensor...");

      const authenticationResponse =
        await startAuthentication({
          optionsJSON: options
        });

      const verifyRes = await fetch(
        "https://api.alphabothq.com/biometric/login/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            phone,
            ...authenticationResponse
          })
        }
      );

      const data = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(
          data.message ||
          "Fingerprint login failed"
        );
      }

      if (!data.token) {
        throw new Error(
          "Fingerprint login did not return a token"
        );
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.removeItem("biometricToken");

      setMessage("");
      setToast("✅ Fingerprint login successful");

      setLoading(false);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 700);

    } catch (error) {

      console.error(
        "BIOMETRIC LOGIN ERROR:",
        error
      );

      setLoading(false);

      setMessage(
        error.message ||
        "Fingerprint login failed"
      );

    }

  };


  const login = async()=>{

    try{

      setLoading(true);
      setMessage("");

      const res = await fetch(
        "https://api.alphabothq.com/users/login",
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
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setToast("✅ Login successful");

          setLoading(false);

          setTimeout(()=>{
            window.location.href="/dashboard";
          },1000);


      }else{

        setMessage(data.message);
        setLoading(false);

      }


    }catch(error){

      setLoading(false);
      console.log("LOGIN ERROR:",error);
      setMessage(error.message);

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


        {/* LOGO */}

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
          Welcome Back
        </h1>


        <p className="
        text-center
        text-zinc-400
        text-sm
        mt-2
        ">
          Login to your AlphaBot account securely.
        </p>



        <div className="mt-8">

          <PhoneInput
          value={phone}
          onChange={(value)=>setPhone(value)}
          />

        </div>



        <div className="relative mt-4">

          <input

          className="
          w-full
          bg-[#050505]
          border
          border-zinc-800
          rounded-xl
          px-4
          py-3.5
          text-white
          placeholder:text-zinc-500
          focus:outline-none
          focus:border-zinc-400
          transition
          pr-20
          "

          placeholder="Password"

          type={
            showPassword
            ?
            "text"
            :
            "password"
          }

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          />


          <button

          type="button"

          onClick={()=>setShowPassword(!showPassword)}

          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-zinc-400
          text-sm
          "

          >

          {
            showPassword
            ?
            "Hide"
            :
            "Show"
          }

          </button>


        </div>



        <button

        onClick={login}

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
          "Logging in..."
          :
          "Login"
        }

        </button>


        <button

        type="button"

        onClick={biometricLogin}

        disabled={loading}

        className="
        w-full
        mt-3
        bg-zinc-900
        border
        border-zinc-700
        text-white
        py-3.5
        rounded-xl
        font-bold
        hover:bg-zinc-800
        transition
        disabled:opacity-50
        "

        >

        {
          loading
          ?
          "Please wait..."
          :
          "👆 Use Fingerprint"
        }

        </button>



        <p className="
        text-center
        text-sm
        mt-4
        text-zinc-400
        ">
          {message}
        </p>



        <div className="
        text-center
        mt-6
        space-y-3
        text-sm
        ">


          <a
          href="/forgot-password"
          className="text-zinc-400"
          >
            Forgot password?
          </a>



          <p className="text-zinc-400">

            Don't have an account?

            <a
            href="/register"
            className="
            ml-1
            text-white
            font-semibold
            "
            >
              Create account
            </a>

          </p>


        </div>


      </div>


    <Toast
message={toast}
type="success"
onClose={()=>setToast("")}
/>

</main>

  );

}
