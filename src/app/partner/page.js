"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function PartnerHome(){

const router = useRouter();

useEffect(()=>{

const token = localStorage.getItem("partnerToken");

if(token){
router.push("/partner/dashboard");
}else{
router.push("/partner/login");
}

},[]);

return(
<div className="p-6">
Loading...
</div>
);

}
