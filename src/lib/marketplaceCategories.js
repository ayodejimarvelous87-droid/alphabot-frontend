export const MARKETPLACE_CATEGORIES = [
  {
    name: "Phones & Tablets",
    shipbubbleCategoryId: 77179563,
    filters: ["Price", "Brand", "Condition", "Storage", "RAM", "Network", "Operating System"],
  },
  {
    name: "Electronics",
    shipbubbleCategoryId: 77179563,
    filters: ["Price", "Brand", "Condition", "Type"],
  },
  {
    name: "Home & Furniture",
    shipbubbleCategoryId: 25590994,
    filters: ["Price", "Type", "Material", "Condition", "Colour"],
  },
  {
    name: "Fashion",
    shipbubbleCategoryId: 74794423,
    filters: ["Price", "Brand", "Size", "Gender", "Condition", "Colour"],
  },
  {
    name: "Beauty & Personal Care",
    shipbubbleCategoryId: 99652979,
    filters: ["Price", "Brand", "Type", "Gender", "Condition"],
  },
  {
    name: "Commercial Equipment",
    shipbubbleCategoryId: 67008831,
    filters: ["Price", "Equipment Type", "Brand", "Condition"],
  },
  {
    name: "Babies & Kids",
    shipbubbleCategoryId: 20754594,
    filters: ["Price", "Age Range", "Gender", "Condition", "Brand"],
  },
  {
    name: "Food",
    shipbubbleCategoryId: 24032950,
    filters: ["Price", "Food Type", "Location", "Condition"],
  },
  {
    name: "Medical Supplies",
    shipbubbleCategoryId: 57487393,
    filters: ["Price", "Type", "Brand", "Condition"],
  },
  {
    name: "Groceries",
    shipbubbleCategoryId: 2178251,
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
