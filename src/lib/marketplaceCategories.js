export const MARKETPLACE_CATEGORIES = [
  {
    name: "Phones & Tablets",
    filters: ["Price", "Brand", "Condition", "Storage", "RAM", "Network", "Operating System"],
  },
  {
    name: "Electronics",
    filters: ["Price", "Brand", "Condition", "Type"],
  },
  {
    name: "Home & Furniture",
    filters: ["Price", "Type", "Material", "Condition", "Colour"],
  },
  {
    name: "Fashion",
    filters: ["Price", "Brand", "Size", "Gender", "Condition", "Colour"],
  },
  {
    name: "Beauty & Personal Care",
    filters: ["Price", "Brand", "Type", "Gender", "Condition"],
  },
  {
    name: "Commercial Equipment",
    filters: ["Price", "Equipment Type", "Brand", "Condition"],
  },
  {
    name: "Babies & Kids",
    filters: ["Price", "Age Range", "Gender", "Condition", "Brand"],
  },
  {
    name: "Food",
    filters: ["Price", "Food Type", "Location", "Condition"],
  },
  {
    name: "Medical Supplies",
    filters: ["Price", "Type", "Brand", "Condition"],
  },
  {
    name: "Groceries",
    filters: ["Price", "Type", "Brand", "Condition"],
  },
];

export const MARKETPLACE_CATEGORY_NAMES =
  MARKETPLACE_CATEGORIES.map((category) => category.name);

export const getMarketplaceCategory =
  (name) =>
    MARKETPLACE_CATEGORIES.find(
      (category) => category.name === name
    );
