"use client";

import Link from "next/link";

export default function AdminDashboard(){

  return (
    <div style={{padding:"30px"}}>

      <h1>👑 AlphaBot Admin Panel</h1>

      <p>Manage AlphaBot users, wallets, transactions and services.</p>


      <div style={{display:"grid",gap:"15px",marginTop:"30px"}}>

        <Link href="/admin/users">
          👥 Users
        </Link>


        <Link href="/admin/wallets">
          💰 Wallet Management
        </Link>


        <Link href="/admin/transactions">
          📜 Transactions
        </Link>


        <Link href="/admin/withdrawals">
          💸 Withdrawals
        </Link>


      </div>

    </div>
  );
}
