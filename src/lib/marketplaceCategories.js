export const MARKETPLACE_CATEGORIES = [
  {
    name: "Vehicles",
    filters: [
      "Price",
      "Make",
      "Model",
      "Year",
      "Mileage",
      "Condition",
      "Transmission",
      "Fuel Type",
    ],
  },
  {
    name: "Property",
    filters: [
      "Price",
      "Property Type",
      "Location",
      "Bedrooms",
      "Bathrooms",
      "Furnished",
      "Listing Type",
    ],
  },
  {
    name: "Phones & Tablets",
    filters: [
      "Price",
      "Brand",
      "Condition",
      "Storage",
      "RAM",
      "Network",
      "Operating System",
    ],
  },
  {
    name: "Electronics",
    filters: [
      "Price",
      "Brand",
      "Condition",
      "Type",
    ],
  },
  {
    name: "Home & Furniture",
    filters: [
      "Price",
      "Type",
      "Material",
      "Condition",
      "Colour",
    ],
  },
  {
    name: "Fashion",
    filters: [
      "Price",
      "Brand",
      "Size",
      "Gender",
      "Condition",
      "Colour",
    ],
  },
  {
    name: "Beauty & Personal Care",
    filters: [
      "Price",
      "Brand",
      "Type",
      "Gender",
      "Condition",
    ],
  },
  {
    name: "Services",
    filters: [
      "Price",
      "Service Type",
      "Location",
    ],
  },
  {
    name: "Repair",
    filters: [
      "Price",
      "Repair Type",
      "Device Type",
      "Location",
    ],
  },
  {
    name: "Commercial Equipment",
    filters: [
      "Price",
      "Equipment Type",
      "Brand",
      "Condition",
    ],
  },
  {
    name: "Leisure & Activities",
    filters: [
      "Price",
      "Activity Type",
      "Condition",
      "Location",
    ],
  },
  {
    name: "Babies & Kids",
    filters: [
      "Price",
      "Age Range",
      "Gender",
      "Condition",
      "Brand",
    ],
  },
  {
    name: "Food",
    filters: [
      "Price",
      "Food Type",
      "Location",
      "Condition",
    ],
  },
  {
    name: "Animals & Pets",
    filters: [
      "Price",
      "Animal Type",
      "Breed",
      "Age",
      "Location",
    ],
  },
  {
    name: "Jobs",
    filters: [
      "Job Type",
      "Employment Type",
      "Location",
      "Salary",
    ],
  },
];

export const MARKETPLACE_CATEGORY_NAMES =
  MARKETPLACE_CATEGORIES.map((category) => category.name);

export const getMarketplaceCategory =
  (name) =>
    MARKETPLACE_CATEGORIES.find(
      (category) => category.name === name
    );
