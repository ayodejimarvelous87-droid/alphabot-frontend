"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({children}){

return (

<div className="min-h-screen bg-[#050505] text-white">

<AdminSidebar />

<div className="md:ml-64">

<AdminTopbar />

<main className="p-4 md:p-8">

{children}

</main>

</div>

</div>

);

}
