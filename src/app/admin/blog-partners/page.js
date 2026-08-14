"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
        "https://api.alphabothq.com/blog-partner/all",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      console.log('BLOG PARTNERS DATA:', data);

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

              <Link
                href={`/admin/blog-partners/${partner._id}`}
                className="font-bold text-yellow-400 hover:underline"
              >
                {partner.name || partner.username || "Unnamed Partner"}
              </Link>

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
