"use client";

import { useEffect, useState } from "react";

const API = "https://alphabot-1.onrender.com";

const NETWORKS = [
  {
    name: "MTN",
    key: "MTN",
    icon: "🟡",
  },
  {
    name: "Airtel",
    key: "AIRTEL",
    icon: "🔴",
  },
  {
    name: "Glo",
    key: "GLO",
    icon: "🟢",
  },
  {
    name: "9mobile",
    key: "9MOBILE",
    icon: "🟢",
  },
];

export default function NetworkStatus() {
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  const checkStatus = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`${API}/network-status`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to check network availability");
      }

      const data = await response.json();

      setPlans({
        airtime: data.airtime || null,
        dataPlans: data.dataPlans || {},
      });

      setLastChecked(
        data.checkedAt
          ? new Date(data.checkedAt)
          : new Date()
      );
    } catch (err) {
      console.error("Network status error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const getNetworkStatus = (network) => {
    return plans.dataPlans?.[network.key] || null;
  };

  const getAvailabilityLabel = (availability) => {
    if (availability === null || availability === undefined) {
      return "Unknown";
    }

    if (availability >= 90) {
      return "Operational";
    }

    if (availability >= 50) {
      return "Degraded";
    }

    return "Unavailable";
  };

  const getStatusColor = (availability) => {
    if (availability === null || availability === undefined) {
      return {
        dot: "bg-zinc-400",
        text: "text-zinc-500 dark:text-zinc-400"
      };
    }

    if (availability >= 90) {
      return {
        dot: "bg-green-500",
        text: "text-green-600 dark:text-green-400"
      };
    }

    if (availability >= 50) {
      return {
        dot: "bg-yellow-500",
        text: "text-yellow-600 dark:text-yellow-400"
      };
    }

    return {
      dot: "bg-red-500",
      text: "text-red-600 dark:text-red-400"
    };
  };

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => window.history.back()}
          className="mb-6 text-sm text-zinc-500 hover:text-black dark:hover:text-white"
        >
          ← Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-black">
            Network Status
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2 leading-7">
            Check the availability of supported mobile networks
            for AlphaBot airtime and data services.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800
                        bg-zinc-50 dark:bg-zinc-950 p-5 mb-6">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="font-bold">
                AlphaBot service availability
              </p>

              <p className="text-sm text-zinc-500 mt-1">
                {loading
                  ? "Checking availability..."
                  : error
                  ? "Unable to check availability"
                  : "Availability check completed"}
              </p>
            </div>

            <button
              onClick={checkStatus}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-black text-white
                         dark:bg-white dark:text-black font-bold text-sm
                         disabled:opacity-50"
            >
              {loading ? "Checking..." : "Refresh"}
            </button>

          </div>

          {lastChecked && !loading && !error && (
            <p className="text-xs text-zinc-500 mt-4">
              Last checked: {lastChecked.toLocaleTimeString()}
            </p>
          )}

        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 dark:border-red-900
                          bg-red-50 dark:bg-red-950/30 p-5 mb-6">
            <p className="font-bold text-red-600 dark:text-red-400">
              Status check unavailable
            </p>

            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
              AlphaBot could not retrieve the current service availability.
              Please try again shortly.
            </p>
          </div>
        )}

        <div className="space-y-4">

          {NETWORKS.map((network) => {
            const status = getNetworkStatus(network);

            const availability =
              typeof status?.availability === "number"
                ? status.availability
                : null;

            const label = getAvailabilityLabel(availability);
            const colors = getStatusColor(availability);

            return (
              <div
                key={network.key}
                className="rounded-2xl border border-zinc-200
                           dark:border-zinc-800 p-5
                           bg-white dark:bg-zinc-950"
              >

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {network.icon}
                    </div>

                    <div>
                      <p className="font-bold text-lg">
                        {network.name}
                      </p>

                      <p className="text-sm text-zinc-500 mt-1">
                        Airtime & Data
                      </p>
                    </div>
                  </div>

                  <div className="text-right">

                    {!loading && (
                      <div className="flex flex-col items-end gap-1">

                        <div className="flex items-center gap-2">

                          <span
                            className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}
                          />

                          <span
                            className={`font-bold text-sm ${colors.text}`}
                          >
                            {label}
                          </span>

                        </div>

                        <span className="text-lg font-black">
                          {availability !== null
                            ? `${availability}%`
                            : "—"}
                        </span>

                      </div>
                    )}

                    {loading && (
                      <span className="text-sm text-zinc-500">
                        Checking...
                      </span>
                    )}

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        <div className="mt-8 rounded-2xl border border-zinc-200
                        dark:border-zinc-800 p-5">

          <p className="font-bold">
            About network status
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-6">
            The status shown here reflects AlphaBot's current ability
            to retrieve supported network services. It does not
            guarantee that a mobile network has no outages or
            interruptions outside AlphaBot.
          </p>

        </div>

      </div>
    </main>
  );
}
