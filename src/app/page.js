import Link from "next/link";

export default function Home(){

  const services = [
    {
      name:"Airtime",
      desc:"Mobile top-up for all networks",
      icon:"📱"
    },
    {
      name:"Data",
      desc:"Fast internet bundles instantly",
      icon:"⚡"
    },
    {
      name:"Wallet",
      desc:"Secure digital payments",
      icon:"◈"
    },
    {
      name:"Bills",
      desc:"Electricity, TV and more",
      icon:"▣"
    }
  ];


  return(
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-zinc-700 flex items-center justify-center">
            <span className="text-xl font-black bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              A
            </span>
          </div>

          <h1 className="text-xl font-bold">
            AlphaBot
          </h1>

        </div>


        <div className="hidden md:flex gap-6 text-sm text-zinc-400">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
        </div>


      </nav>



      {/* HERO */}
      <section className="px-6 pt-20 pb-14 text-center max-w-4xl mx-auto">


        <h2 className="text-5xl md:text-6xl font-black leading-tight">

          Smart Digital
          <br/>

          <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            Payments Made Simple
          </span>

        </h2>


        <p className="mt-6 text-zinc-400 max-w-xl mx-auto leading-relaxed">

          AlphaBot provides wallet, airtime, data and digital payment solutions in one secure platform.

        </p>



        <div className="flex justify-center gap-4 mt-9">


          <Link
          href="/register"
          className="bg-white text-black px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition"
          >
            Get Started
          </Link>


          <Link
          href="/login"
          className="bg-[#18181B] border border-zinc-700 text-zinc-300 px-8 py-3.5 rounded-xl font-bold hover:border-zinc-400 transition"
          >
            Login
          </Link>


        </div>


      </section>





      {/* SERVICES */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">


        <h3 className="text-2xl font-bold mb-6">
          Everything you need
        </h3>



        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">


          {
            services.map((service)=>(
              <div
              key={service.name}
              className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 hover:border-zinc-500 transition"
              >

                <div className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center text-xl mb-4">
                  {service.icon}
                </div>


                <h4 className="font-bold">
                  {service.name}
                </h4>


                <p className="text-xs text-zinc-400 mt-2">
                  {service.desc}
                </p>


              </div>
            ))
          }


        </div>


      </section>





      {/* TRUST SECTION */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">


        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 text-center">


          <h3 className="text-xl font-bold">

            Built for simple and secure payments

          </h3>


          <p className="text-zinc-400 mt-3 text-sm">

            Manage your digital services with speed, security and intelligence.

          </p>


        </div>


      </section>




      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500">

        © {new Date().getFullYear()} AlphaBot. All rights reserved.

      </footer>



    </main>
  )
}
