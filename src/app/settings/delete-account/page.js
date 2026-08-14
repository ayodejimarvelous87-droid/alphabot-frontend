"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = "https://api.alphabothq.com";

const reasons = [
  "I no longer need AlphaBot",
  "I am having technical problems",
  "The service is too expensive",
  "I am not satisfied with the service",
  "I am switching to another service",
  "I have privacy or security concerns",
  "I created another account",
  "Other"
];

export default function DeleteAccountPage(){

  const router = useRouter();

  const [reason,setReason] = useState("");
  const [customReason,setCustomReason] = useState("");
  const [password,setPassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState(false);

  const handleDelete = async()=>{

    setError("");

    if(!reason){
      setError("Please select a reason before continuing.");
      return;
    }

    if(!password){
      setError("Please enter your login password.");
      return;
    }

    setLoading(true);

    try{

      const token =
        localStorage.getItem("token");

      if(!token){
        router.push("/login");
        return;
      }

      const finalReason =
        customReason.trim() || reason;

      const res = await fetch(
        `${API}/users/delete-account`,
        {
          method:"DELETE",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify({
            password,
            reason:finalReason
          })
        }
      );

      const data = await res.json();

      if(!res.ok){
        throw new Error(
          data.message ||
          "Unable to delete your account."
        );
      }

      setSuccess(true);

      // The backend has already revoked all tokens.
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setTimeout(()=>{
        router.push("/login");
      },1500);

    }catch(err){

      setError(
        err.message ||
        "Something went wrong. Please try again."
      );

    }finally{

      setLoading(false);

    }

  };


  if(success){

    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">

        <div className="w-full max-w-md text-center">

          <div className="text-6xl mb-6">
            💙
          </div>

          <h1 className="text-2xl font-bold mb-3">
            We’ll miss you
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400">
            Your AlphaBot account has been deleted successfully.
          </p>

        </div>

      </main>
    );

  }


  return (

    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-5 py-8">

      <div className="max-w-lg mx-auto">

        <button
          onClick={()=>router.back()}
          className="text-sm text-zinc-600 dark:text-zinc-400 mb-8"
        >
          ← Back
        </button>


        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            💙
          </div>

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            We’ll miss you
          </h1>

          <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Before you go, we would love to know what made you decide
            to leave AlphaBot.
          </p>

        </div>


        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800">

          <h2 className="font-semibold text-zinc-900 dark:text-white mb-4">
            Why are you leaving?
          </h2>


          <div className="space-y-3">

            {reasons.map((item)=>{

              const selected = reason === item;

              return (

                <button
                  key={item}
                  type="button"
                  onClick={()=>setReason(item)}
                  className={`
                    w-full text-left p-4 rounded-xl border transition
                    ${
                      selected
                        ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                    }
                  `}
                >

                  <div className="flex items-center gap-3">

                    <span
                      className={`
                        w-5 h-5 rounded-full border flex items-center justify-center
                        ${
                          selected
                            ? "border-red-500"
                            : "border-zinc-400"
                        }
                      `}
                    >
                      {selected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"/>
                      )}
                    </span>

                    <span className="text-sm text-zinc-800 dark:text-zinc-200">
                      {item}
                    </span>

                  </div>

                </button>

              );

            })}

          </div>


          <div className="mt-4">

            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              Tell us more
              <span className="text-zinc-400 font-normal">
                {" "} (optional)
              </span>
            </label>

            <textarea
              value={customReason}
              onChange={(e)=>setCustomReason(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Tell us what we could have done better..."
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 outline-none focus:border-red-500 resize-none"
            />

          </div>


          <div className="mt-6">

            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              Confirm your login password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 pr-20 outline-none focus:border-red-500"
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>


          {error && (

            <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>

          )}


          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={()=>router.back()}
              disabled={loading}
              className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 py-3 font-medium"
            >
              Go Back
            </button>


            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 rounded-xl bg-red-600 text-white py-3 font-semibold disabled:opacity-50"
            >
              {loading
                ? "Deleting..."
                : "Delete My Account"
              }
            </button>

          </div>

        </div>


        <p className="text-xs text-center text-zinc-500 mt-5 leading-relaxed">
          Account deletion is permanent. Your active login sessions
          will also be signed out.
        </p>

      </div>

    </main>

  );

}
