 "use client";

import { useRouter } from "next/navigation";

const recentTransactions = [
  {
    id: 1,
    service: "Data",
    customer: "0803••••1234",
    amount: 350,
    profit: 50,
    status: "Successful",
    date: "Today, 10:42 AM",
  },
  {
    id: 2,
    service: "Airtime",
    customer: "0812••••5678",
    amount: 1000,
    profit: 50,
    status: "Successful",
    date: "Today, 9:18 AM",
  },
  {
    id: 3,
    service: "TV",
    customer: "0806••••9012",
    amount: 8500,
    profit: 500,
    status: "Successful",
    date: "Yesterday",
  },
];

const serviceStats = [
  { name: "Data", icon: "📶", sales: 24, profit: 1850 },
  { name: "Airtime", icon: "📱", sales: 18, profit: 900 },
  { name: "TV", icon: "📺", sales: 7, profit: 1200 },
  { name: "Electricity", icon: "⚡", sales: 5, profit: 450 },
  { name: "ePIN", icon: "🎫", sales: 3, profit: 300 },
];

export default function PartnerTransactions() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#050505] text-white px-5 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => router.push("/partner/dashboard")}
          className="text-zinc-400 hover:text-white text-sm mb-6"
        >
          ← Dashboard
        </button>

        <div>
          <div className="text-4xl">📊</div>

          <h1 className="text-3xl font-bold mt-3">
            Profit Dashboard
          </h1>

          <p className="text-zinc-400 mt-2">
            Track your reseller sales and profit.
          </p>
        </div>

        {/* Profit Summary */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

          <div className="
            col-span-2
            md:col-span-1
            bg-gradient-to-br
            from-[#202024]
            to-[#101012]
            border
            border-zinc-800
            rounded-3xl
            p-5
          ">
            <p className="text-zinc-400 text-sm">
              Total Profit
            </p>

            <p className="text-3xl font-bold mt-2">
              ₦8,500
            </p>

            <p className="text-xs text-green-400 mt-2">
              Lifetime
            </p>
          </div>

          <div className="
            bg-gradient-to-b
            from-[#18181B]
            to-[#101012]
            border
            border-zinc-800
            rounded-3xl
            p-5
          ">
            <p className="text-zinc-400 text-sm">
              Today
            </p>

            <p className="text-2xl font-bold mt-2">
              ₦450
            </p>
          </div>

          <div className="
            bg-gradient-to-b
            from-[#18181B]
            to-[#101012]
            border
            border-zinc-800
            rounded-3xl
            p-5
          ">
            <p className="text-zinc-400 text-sm">
              This Week
            </p>

            <p className="text-2xl font-bold mt-2">
              ₦2,750
            </p>
          </div>

          <div className="
            bg-gradient-to-b
            from-[#18181B]
            to-[#101012]
            border
            border-zinc-800
            rounded-3xl
            p-5
          ">
            <p className="text-zinc-400 text-sm">
              This Month
            </p>

            <p className="text-2xl font-bold mt-2">
              ₦6,200
            </p>
          </div>

        </section>

        {/* Sales Overview */}
        <section className="grid md:grid-cols-2 gap-4 mt-5">

          <div className="
            bg-gradient-to-b
            from-[#18181B]
            to-[#101012]
            border
            border-zinc-800
            rounded-3xl
            p-6
          ">
            <p className="text-zinc-400 text-sm">
              Total Sales
            </p>

            <p className="text-3xl font-bold mt-2">
              ₦125,400
            </p>

            <p className="text-zinc-500 text-sm mt-2">
              Across all reseller transactions
            </p>
          </div>

          <div className="
            bg-gradient-to-b
            from-[#18181B]
            to-[#101012]
            border
            border-zinc-800
            rounded-3xl
            p-6
          ">
            <p className="text-zinc-400 text-sm">
              Total Customers
            </p>

            <p className="text-3xl font-bold mt-2">
              57
            </p>

            <p className="text-zinc-500 text-sm mt-2">
              Customers who purchased through you
            </p>
          </div>

        </section>

        {/* Service Performance */}
        <section className="mt-8">

          <div>
            <h2 className="text-xl font-bold">
              Profit by Service
            </h2>

            <p className="text-zinc-500 text-sm mt-1">
              See which services are generating the most profit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

            {serviceStats.map((service) => (
              <div
                key={service.name}
                className="
                  bg-gradient-to-b
                  from-[#18181B]
                  to-[#101012]
                  border
                  border-zinc-800
                  rounded-3xl
                  p-5
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {service.icon}
                    </span>

                    <div>
                      <p className="font-bold">
                        {service.name}
                      </p>

                      <p className="text-xs text-zinc-500">
                        {service.sales} sales
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-green-400">
                    ₦{service.profit.toLocaleString()}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* Recent Transactions */}
        <section className="mt-8">

          <div className="flex items-end justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold">
                Recent Transactions
              </h2>

              <p className="text-zinc-500 text-sm mt-1">
                Your latest reseller sales and earnings.
              </p>
            </div>

          </div>

          <div className="
            mt-4
            bg-gradient-to-b
            from-[#18181B]
            to-[#101012]
            border
            border-zinc-800
            rounded-3xl
            overflow-hidden
          ">

            {recentTransactions.map((transaction, index) => (

              <div
                key={transaction.id}
                className={`
                  p-5
                  ${index !== recentTransactions.length - 1
                    ? "border-b border-zinc-800"
                    : ""
                  }
                `}
              >

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-4
                ">

                  <div className="flex items-center gap-3">

                    <div className="
                      w-11
                      h-11
                      rounded-2xl
                      bg-zinc-900
                      flex
                      items-center
                      justify-center
                      text-xl
                    ">
                      {transaction.service === "Data"
                        ? "📶"
                        : transaction.service === "Airtime"
                        ? "📱"
                        : "📺"
                      }
                    </div>

                    <div>
                      <p className="font-semibold">
                        {transaction.service}
                      </p>

                      <p className="text-xs text-zinc-500">
                        {transaction.customer}
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="font-bold">
                      ₦{transaction.amount.toLocaleString()}
                    </p>

                    <p className="text-sm text-green-400">
                      +₦{transaction.profit.toLocaleString()} profit
                    </p>

                  </div>

                </div>

                <div className="
                  flex
                  items-center
                  justify-between
                  mt-3
                  text-xs
                ">

                  <span className="text-zinc-500">
                    {transaction.date}
                  </span>

                  <span className="text-green-400">
                    {transaction.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* Bottom Navigation */}
        <nav className="
          mt-10
          border-t
          border-zinc-800
          pt-5
          flex
          justify-around
          gap-2
          text-xs
          text-zinc-500
        ">

          <button
            onClick={() => router.push("/partner/dashboard")}
            className="hover:text-white"
          >
            🏠
            <span className="block mt-1">
              Home
            </span>
          </button>

          <button
            onClick={() => router.push("/partner/services")}
            className="hover:text-white"
          >
            🛍️
            <span className="block mt-1">
              Services
            </span>
          </button>

          <button
            onClick={() => router.push("/partner/prices")}
            className="hover:text-white"
          >
            🏷️
            <span className="block mt-1">
              Prices
            </span>
          </button>

          <button
            className="text-white"
          >
            📊
            <span className="block mt-1">
              Profit
            </span>
          </button>

          <button
            onClick={() => router.push("/partner/settings")}
            className="hover:text-white"
          >
            ⚙️
            <span className="block mt-1">
              More
            </span>
          </button>

        </nav>

      </div>
    </main>
  );
}
