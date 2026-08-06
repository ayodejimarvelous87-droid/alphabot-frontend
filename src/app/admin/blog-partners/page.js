"use client";

import { useEffect, useState } from "react";

export default function BlogPartnersPage(){

  const [partners,setPartners]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    loadPartners();
  },[]);

  async function loadPartners(){

    try{

      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        "https://alphabot-1.onrender.com/blog-partners/all",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setPartners(Array.isArray(data) ? data : []);

    }catch(err){
      console.log(err);
    }

    setLoading(false);

  }

  return(

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        👥 Blog Partners
      </h1>

      {loading ? (

        <p>Loading...</p>

      ) : partners.length===0 ? (

        <div className="rounded-xl border border-zinc-800 p-6">
          No blog partners found.
        </div>

      ) : (

        <div className="space-y-3">

          {partners.map((partner)=>(

            <div
              key={partner._id}
              className="rounded-xl border border-zinc-800 p-4"
            >

              <h2 className="font-bold">
                {partner.name || partner.username || "Unnamed Partner"}
              </h2>

              <p className="text-sm text-zinc-400">
                {partner.email || ""}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}
