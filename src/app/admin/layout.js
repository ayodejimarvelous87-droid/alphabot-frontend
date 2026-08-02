"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({children}){

return (

<div className="min-h-screen bg-[#090d16] text-white">

<AdminSidebar />

<AdminTopbar />

<main className="w-full p-4 md:p-6">
{children}
</main>

</div>

);

}
