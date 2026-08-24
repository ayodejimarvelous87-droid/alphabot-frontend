"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const quickServices = [
    ["👤", "Profile", "/profile"],
    ["💳", "ePIN", "/recharge-pin"],
    ["⚡", "Electricity", "/electricity"],
    ["📺", "TV", "/tv"],
    ["🌐", "Data", "/data"],
    ["📱", "Airtime", "/airtime"],
  ];

  const navItems = [
    ["/dashboard", "🏠", "Home"],
    ["/services", "🛠️", "Services"],
    ["/wallet", "💰", "Wallet"],
    ["/arena", "🏆", "Arena+"],
  ];

  const NavItem = ({ item }) => {
    const active = pathname === item[0];

    return (
      <Link
        href={item[0]}
        className={[
          "relative flex-1 min-w-0 h-full",
          "flex flex-col items-center justify-center gap-1",
          "transition-all duration-300 active:scale-90",
          active ? "text-yellow-400" : "text-zinc-500",
        ].join(" ")}
      >
        {active && (
          <span className="absolute top-2 w-1 h-1 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.9)]" />
        )}

        <span
          className={[
            "text-[18px] leading-none transition-transform duration-300",
            active ? "scale-110" : "",
          ].join(" ")}
        >
          {item[1]}
        </span>

        <span className="text-[9px] font-bold">
          {item[2]}
        </span>
      </Link>
    );
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 pointer-events-none">
      <div className="relative max-w-md mx-auto pointer-events-auto">

        {/* QUICK SERVICES */}
        <div
          className={[
            "absolute bottom-[91px] left-1/2 -translate-x-1/2",
            "w-[calc(100vw-28px)] max-w-[340px]",
            "rounded-[30px] p-4",
            "bg-[#101114]/98 backdrop-blur-2xl",
            "border border-zinc-800",
            "shadow-[0_25px_80px_rgba(0,0,0,0.65)]",
            "origin-bottom transition-all duration-300 ease-out",
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-8 scale-90 pointer-events-none",
          ].join(" ")}
        >

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <p className="text-white text-sm font-black">
                Quick Services
              </p>

              <p className="text-zinc-500 text-[10px] mt-1">
                Everything you need, one tap away
              </p>
            </div>

            <div className="px-2.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20">
              <span className="text-[8px] font-black text-yellow-400 tracking-wider">
                ALPHABOT
              </span>
            </div>
          </div>

          {/* 2 × 3 SERVICE GRID */}
          <div className="grid grid-cols-2 gap-3">
            {quickServices.map((item, index) => (
              <Link
                key={item[1]}
                href={item[2]}
                onClick={() => setOpen(false)}
                className={[
                  "group relative overflow-hidden",
                  "h-[76px] rounded-[22px]",
                  "bg-[#181A1E]",
                  "border border-zinc-800",
                  "flex items-center gap-3 px-4",
                  "active:scale-95",
                  "transition-all duration-300",
                  open
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-7 scale-90",
                ].join(" ")}
                style={{
                  transitionDelay: open
                    ? `${index * 65}ms`
                    : "0ms",
                }}
              >

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

                <div className="w-11 h-11 shrink-0 rounded-2xl bg-[#22252A] border border-zinc-700/70 flex items-center justify-center text-[22px] group-hover:scale-110 transition-transform duration-300">
                  {item[0]}
                </div>

                <div>
                  <span className="block text-[11px] font-black text-white">
                    {item[1]}
                  </span>

                  <span className="block text-[8px] text-zinc-500 mt-0.5">
                    Tap to open
                  </span>
                </div>

              </Link>
            ))}
          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="relative h-[68px]">

          {/* MAIN CURVED DOCK */}
          <div className="absolute inset-0 rounded-[28px] bg-[#0D0E10]/97 backdrop-blur-2xl border border-zinc-800 shadow-[0_15px_55px_rgba(0,0,0,0.6)]" />

          {/* CENTER NOTCH */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-[18px] w-[88px] h-[43px] rounded-b-[50px] bg-[#050505]" />

          <div className="relative h-full px-2 flex items-center">

            <NavItem item={navItems[0]} />
            <NavItem item={navItems[1]} />

            {/* FLOATING CORE */}
            <div className="relative shrink-0 w-[76px] h-full">

              {/* glow behind core */}
              <div
                className={[
                  "absolute left-1/2 -translate-x-1/2",
                  "-top-[34px]",
                  "w-[76px] h-[76px]",
                  "rounded-[24px]",
                  "bg-yellow-400/20 blur-xl",
                  "transition-all duration-500",
                  open ? "scale-125 opacity-100" : "scale-90 opacity-70",
                ].join(" ")}
              />

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-label="AlphaBot Core"
                className={[
                  "absolute left-1/2 -translate-x-1/2",
                  "-top-[29px]",
                  "w-[64px] h-[64px]",
                  "rounded-[22px]",
                  "bg-yellow-400 text-black",
                  "border-[5px] border-[#050505]",
                  "shadow-[0_10px_35px_rgba(250,204,21,0.3)]",
                  "flex items-center justify-center",
                  "active:scale-90 hover:scale-105",
                  "transition-all duration-300",
                  open ? "rotate-90 scale-105" : "rotate-0",
                ].join(" ")}
              >

                {/* 2 × 2 CORE MARK */}
                <div className="grid grid-cols-2 gap-[5px]">
                  <span className="w-[9px] h-[9px] rounded-[3px] bg-black" />
                  <span className="w-[9px] h-[9px] rounded-[3px] bg-black" />
                  <span className="w-[9px] h-[9px] rounded-[3px] bg-black" />
                  <span className="w-[9px] h-[9px] rounded-[3px] bg-black" />
                </div>

              </button>

            </div>

            <NavItem item={navItems[2]} />
            <NavItem item={navItems[3]} />

          </div>
        </nav>

        {/* BOTTOM GLOW */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-3 bg-yellow-400/5 blur-xl rounded-full" />

      </div>
    </div>
  );
}
