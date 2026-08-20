export default function sitemap() {
  const baseUrl = "https://alphabothq.com";

  const resources = [
    "buy-data-nigeria",
    "cheap-data-nigeria",
    "awoof-data",
    "mtn-data",
    "airtel-data",
    "glo-data",
    "9mobile-data",
    "whatsapp-data",
    "data-bundles-nigeria",

    "best-vtu-nigeria",
    "buy-airtime-nigeria",
    "airtime-data-nigeria",
    "bills-payment-nigeria",
    "electricity-bills-nigeria",
    "tv-subscription-nigeria",

    "football-arena",
    "competitions",
    "team-rush",
    "leaderboards-rewards",

    "alphabot-api",
    "whatsapp-data-bot",
    "ai-features",
    "digital-payments",

    "account-security",
    "transaction-pin",
    "two-factor-authentication",
    "wallet-security",

    "referral-program",
    "partner-program",
    "alphabot-coins",
    "rewards",
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    ...resources.map((slug) => ({
      url: `${baseUrl}/resources/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
