"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MARKETPLACE_CATEGORY_NAMES,
  getMarketplaceCategory,
} from "@/lib/marketplaceCategories";
import { NIGERIA_STATES } from "@/lib/nigeriaStates";

const MARKETPLACE_TO_SHIPBUBBLE_CATEGORY = {
  "Phones & Tablets": 77179563,
  "Electronics": 77179563,
  "Home & Furniture": 25590994,
  "Fashion": 74794423,
  "Beauty & Personal Care": 99652979,
  "Commercial Equipment": 67008831,
  "Babies & Kids": 20754594,
  "Food": 24032950,
  "Medical Supplies": 57487393,
  "Groceries": 2178251,
};


export default function AddProductPage() {
  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [seller, setSeller] = useState(null);

  const [locationVerification, setLocationVerification] = useState({
    status: "idle",
    message: "",
    data: null,
  });

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: MARKETPLACE_CATEGORY_NAMES[0],
    image: "",
    images: Array(6).fill(null),
    description: "",
    stock: 0,
    deliveryDays: "",
    shipping: {
      categoryId: "",
      weight: "",
      length: "",
      width: "",
      height: "",
    },
    location: {
      state: "",
      exact: "",
    },
    attributes: {},
  });

  useEffect(() => {
    const state = String(form.location?.state || "").trim();
    const exact = String(form.location?.exact || "").trim();

    if (!state || exact.length < 3) {
      setLocationVerification({
        status: "idle",
        message: "",
        data: null,
      });
      return;
    }

    setLocationVerification({
      status: "checking",
      message: "Checking this location...",
      data: null,
    });

    const timer = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(
          "https://api.alphabothq.com/marketplace/orders/products/validate-location",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              state,
              exact,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success || !data.data?.addressCode) {
          setLocationVerification({
            status: "error",
            message:
              data.message ||
              "We could not verify this location with our shipping provider.",
            data: null,
          });
          return;
        }

        setLocationVerification({
          status: "verified",
          message: "Location verified",
          data: data.data,
        });

        setForm((current) => ({
          ...current,
          location: {
            ...current.location,
            state: data.data.state || state,
            exact: current.location?.exact || exact,
            addressCode: data.data.addressCode,
          },
        }));
      } catch (error) {
        console.error(
          "LIVE PRODUCT LOCATION VALIDATION ERROR:",
          error
        );

        setLocationVerification({
          status: "error",
          message: "Unable to verify this location right now.",
          data: null,
        });
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [form.location?.state, form.location?.exact]);

  const selectedCategoryConfig = getMarketplaceCategory(form.category);

  const calculateMarketplaceFee = (price) => {
    const amount = Number(price);

    if (!Number.isFinite(amount) || amount <= 0) {
      return { rate: 0, fee: 0, sellerReceives: 0 };
    }

    let rate;

    if (amount < 5000) {
      rate = 15;
    } else if (amount < 10000) {
      rate = 12;
    } else if (amount < 25000) {
      rate = 10;
    } else if (amount < 50000) {
      rate = 8;
    } else if (amount < 100000) {
      rate = 7;
    } else {
      rate = 5;
    }

    const fee = Number((amount * rate / 100).toFixed(2));
    const sellerReceives = Number((amount - fee).toFixed(2));

    return { rate, fee, sellerReceives };
  };

  const categoryFilters =
    selectedCategoryConfig?.filters?.filter(
      (filter) => filter !== "Price"
    ) || [];

  const updateAttribute = (name, value) => {
    setForm((current) => ({
      ...current,
      attributes: {
        ...current.attributes,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetch("https://api.alphabothq.com/marketplace/sellers/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Unable to load seller profile.");
        }

        return data;
      })
      .then((data) => {
        const seller = data.seller || (data._id ? data : null);

        if (seller) {
          setSeller(seller);
          setVerified(seller.status === "approved");

          const pickupState = String(
            seller.pickupAddress?.state || ""
          ).trim();

          if (pickupState) {
            const pickupCity = String(
              seller.pickupAddress?.city || ""
            ).trim();

            setForm((current) => ({
              ...current,
              location: {
                ...current.location,
                state: current.location?.state || pickupState,
                exact:
                  current.location?.exact ||
                  pickupCity,
              },
            }));
          }
        }
      })
      .catch((error) => {
        console.error("LOAD MARKETPLACE SELLER ERROR:", error);
        setVerified(false);
      });
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const uploadMarketplaceImage = async (index, file) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Each image must be 5 MB or smaller.");
      return;
    }

    const preview = URL.createObjectURL(file);

    setForm((current) => {
      const images = [...current.images];

      images[index] = {
        preview,
        url: "",
        publicId: "",
        uploading: true,
      };

      return {
        ...current,
        images,
      };
    });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        "https://api.alphabothq.com/uploads/marketplace-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success || !data.imageUrl || !data.publicId) {
        throw new Error(data.message || "Image upload failed.");
      }

      setForm((current) => {
        const images = [...current.images];

        images[index] = {
          preview,
          url: data.imageUrl,
          publicId: data.publicId,
          uploading: false,
        };

        return {
          ...current,
          images,
        };
      });
    } catch (error) {
      console.error("MARKETPLACE IMAGE UPLOAD ERROR:", error);

      URL.revokeObjectURL(preview);

      setForm((current) => {
        const images = [...current.images];
        images[index] = null;

        return {
          ...current,
          images,
        };
      });

      alert(error.message || "Unable to upload image. Please try again.");
    }
  };

  const removeMarketplaceImage = (index) => {
    setForm((current) => {
      const images = [...current.images];
      const image = images[index];

      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }

      images[index] = null;

      return {
        ...current,
        images,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImages = form.images.filter(
      (image) => image?.url && image?.publicId && !image.uploading
    );

    const imagesStillUploading = form.images.some(
      (image) => image?.uploading
    );

    if (
      !form.name ||
      !form.price ||
      !form.description ||
      Number(form.stock) < 1
    ) {
      alert(
        "Please complete the product details and enter at least 1 available unit."
      );
      return;
    }

    const descriptionLength = form.description.trim().length;

    if (descriptionLength < 50) {
      alert(
        `Product description must be at least 50 characters. You currently have ${descriptionLength}.`
      );
      return;
    }

    if (descriptionLength > 3000) {
      alert("Product description cannot exceed 3000 characters.");
      return;
    }

    if (imagesStillUploading) {
      alert("Please wait for all selected images to finish uploading.");
      return;
    }

    if (uploadedImages.length < 3) {
      alert("Please upload at least 3 product images.");
      return;
    }

    if (uploadedImages.length > 6) {
      alert("You can upload a maximum of 6 product images.");
      return;
    }

    const shippingCategoryId = Number(form.shipping.categoryId);
    const shippingWeight = Number(form.shipping.weight);
    const shippingLength = Number(form.shipping.length);
    const shippingWidth = Number(form.shipping.width);
    const shippingHeight = Number(form.shipping.height);

    if (
      !Number.isInteger(shippingCategoryId) ||
      shippingCategoryId < 1
    ) {
      alert("Please select a shipping category.");
      return;
    }

    if (
      !Number.isFinite(shippingWeight) ||
      shippingWeight <= 0
    ) {
      alert("Please enter a valid product weight greater than 0 kg.");
      return;
    }

    if (
      !Number.isFinite(shippingLength) ||
      shippingLength <= 0
    ) {
      alert("Please enter a valid package length greater than 0 cm.");
      return;
    }

    if (
      !Number.isFinite(shippingWidth) ||
      shippingWidth <= 0
    ) {
      alert("Please enter a valid package width greater than 0 cm.");
      return;
    }

    if (
      !Number.isFinite(shippingHeight) ||
      shippingHeight <= 0
    ) {
      alert("Please enter a valid package height greater than 0 cm.");
      return;
    }

    if (!form.location?.state?.trim()) {
      alert("Please select the product location state.");
      return;
    }

    if (!form.location?.exact?.trim()) {
      alert("Please enter the product area or location.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const locationRes = await fetch(
        "https://api.alphabothq.com/marketplace/orders/products/validate-location",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            state: form.location.state.trim(),
            exact: form.location.exact.trim(),
          }),
        }
      );

      const locationData = await locationRes.json();

      if (!locationRes.ok || !locationData.success) {
        alert(
          locationData.message ||
            "We could not verify this product location with our shipping provider."
        );
        return;
      }

      const validatedLocation = locationData.data;


      const res = await fetch(
        "https://api.alphabothq.com/marketplace/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name.trim(),
            price: Number(form.price),
            category: form.category,
            image: uploadedImages[0]?.url || "",
            images: uploadedImages.map((image) => ({
              url: image.url,
              publicId: image.publicId,
            })),
            description: form.description.trim(),
            stock: Number(form.stock),
            deliveryDays: Number(form.deliveryDays),
            shipping: {
              categoryId: shippingCategoryId,
              weight: shippingWeight,
              length: shippingLength,
              width: shippingWidth,
              height: shippingHeight,
            },
            location: validatedLocation,
            attributes: form.attributes,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to submit product.");
        return;
      }

      alert(
        "Product submitted successfully. It is now pending AlphaBot review."
      );

      window.location.href = "/marketplace/seller/products";
    } catch (error) {
      console.error("CREATE MARKETPLACE PRODUCT ERROR:", error);
      alert("Unable to submit product. Please try again.");
    }
  };

  if (!mounted) {
    return null;
  }

  if (!verified) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white flex items-center justify-center px-5">

        <div className="text-center max-w-sm">

          <div className="text-5xl">
            🔐
          </div>

          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-yellow-500 mt-5">
            SELLER ACCESS
          </p>

          <h1 className="text-xl font-black mt-2">
            Verification required
          </h1>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            Only verified AlphaBot sellers can list products on the
            marketplace.
          </p>

          <div className="mt-5 px-4 py-3 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800">

            <p className="text-[9px] uppercase tracking-[0.16em] font-black text-zinc-500">
              CURRENT STATUS
            </p>

            <p className="text-sm font-black mt-1">
              {seller?.status || "Not a seller"}
            </p>

          </div>

          <Link
            href="/marketplace/seller"
            className="inline-flex mt-5 bg-yellow-400 text-black px-5 py-3 rounded-xl text-xs font-black active:scale-[0.98] transition"
          >
            Back to Seller Profile
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] text-zinc-950 dark:text-white pb-12">

      <header className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">

        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">

          <Link
            href="/marketplace/seller"
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center active:scale-95 transition"
          >
            ←
          </Link>

          <div className="flex-1">

            <p className="text-[8px] font-black tracking-[0.18em] uppercase text-yellow-500">
              ALPHABOT
            </p>

            <h1 className="font-black text-sm">
              Add Product
            </h1>

          </div>

          <Link
            href="/marketplace/seller/products"
            className="text-[10px] font-black text-zinc-500"
          >
            My products
          </Link>

        </div>

      </header>

      <div className="max-w-2xl mx-auto px-4">

        {/* VERIFIED SELLER */}

        <section className="mt-5 rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-black p-5">

          <div className="flex items-center justify-between gap-3">

            <div>

              <p className="text-[9px] font-black tracking-[0.18em] uppercase text-yellow-400 dark:text-yellow-600">
                VERIFIED SELLER
              </p>

              <h2 className="text-xl font-black mt-2">
                {seller?.businessName || "Your Store"}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-2xl bg-green-500 text-white flex items-center justify-center text-xl">
              ✓
            </div>

          </div>

          <p className="text-xs opacity-60 mt-2 leading-5">
            You can list products because your seller profile has been
            verified by AlphaBot.
          </p>

        </section>

        {/* PRODUCT FORM */}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <div>
            <label className="text-xs font-black">
              Product name
            </label>

            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Wireless Headphones"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs font-black">
              Price
            </label>

            <input
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="8500"
              inputMode="numeric"
              type="number"
              min="0"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />

            {Number(form.price) > 0 && (() => {
              const { rate, fee, sellerReceives } =
                calculateMarketplaceFee(form.price);

              return (
                <div className="mt-2 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 px-4 py-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">
                      AlphaBot fee ({rate}%)
                    </span>
                    <span className="font-bold">
                      ₦{fee.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">
                      You receive
                    </span>
                    <span className="font-black">
                      ₦{sellerReceives.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          <div>
            <label className="text-xs font-black">
              Quantity available
            </label>

            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
              How many units of this product do you currently have?
            </p>

            <input
              value={form.stock}
              onChange={(e) => updateField("stock", e.target.value)}
              placeholder="e.g. 10"
              inputMode="numeric"
              type="number"
              min="1"
              step="1"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs font-black">
              Preparation time
            </label>

            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
              How many days do you need to prepare this product before handing it to the courier?
            </p>

            <input
              value={form.deliveryDays}
              onChange={(e) => updateField("deliveryDays", e.target.value)}
              placeholder="e.g. 2"
              inputMode="numeric"
              type="number"
              min="1"
              step="1"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
            <div>
              <label className="text-xs font-black">
                Shipping information
              </label>

              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                Enter the actual package details. These are used to calculate live courier delivery fees.
              </p>
            </div>

            <div>
              <label className="text-xs font-black">
                Weight per unit (kg)
              </label>

              <input
                value={form.shipping.weight}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    shipping: {
                      ...current.shipping,
                      weight: e.target.value,
                    },
                  }))
                }
                placeholder="e.g. 1.5"
                inputMode="decimal"
                type="number"
                min="0.01"
                step="0.01"
                className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-xs font-black">
                Package dimensions (cm)
              </label>

              <div className="grid grid-cols-3 gap-2 mt-2">
                <input
                  value={form.shipping.length}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      shipping: {
                        ...current.shipping,
                        length: e.target.value,
                      },
                    }))
                  }
                  placeholder="Length"
                  inputMode="decimal"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-3 text-sm outline-none focus:border-yellow-400"
                />

                <input
                  value={form.shipping.width}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      shipping: {
                        ...current.shipping,
                        width: e.target.value,
                      },
                    }))
                  }
                  placeholder="Width"
                  inputMode="decimal"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-3 text-sm outline-none focus:border-yellow-400"
                />

                <input
                  value={form.shipping.height}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      shipping: {
                        ...current.shipping,
                        height: e.target.value,
                      },
                    }))
                  }
                  placeholder="Height"
                  inputMode="decimal"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-3 text-sm outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-black">
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) => {
                const category = e.target.value;
                const shippingCategoryId =
                  MARKETPLACE_TO_SHIPBUBBLE_CATEGORY[category] || "";

                setForm((current) => ({
                  ...current,
                  category,
                  attributes: {},
                  shipping: {
                    ...current.shipping,
                    categoryId: shippingCategoryId,
                  },
                }));
              }}
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            >
              {MARKETPLACE_CATEGORY_NAMES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>


          </div>

          {categoryFilters.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#111111] p-4">

              <div className="mb-4">
                <p className="text-[9px] font-black tracking-[0.16em] uppercase text-yellow-500">
                  PRODUCT DETAILS
                </p>

                <h3 className="text-sm font-black mt-1">
                  {form.category} details
                </h3>

                <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-1">
                  Add details to help buyers find your product.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {categoryFilters.map((filterName) => (
                  <div key={filterName}>

                    <label className="text-xs font-black">
                      {filterName}
                    </label>

                    <input
                      value={form.attributes?.[filterName] || ""}
                      onChange={(e) =>
                        updateAttribute(filterName, e.target.value)
                      }
                      placeholder={`Enter ${filterName.toLowerCase()}`}
                      className="mt-2 w-full h-11 rounded-xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-3 text-xs outline-none focus:border-yellow-400"
                    />

                  </div>
                ))}

              </div>

            </div>
          )}

          {/* PRODUCT IMAGES */}

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] p-4">

            <div className="flex items-start justify-between gap-4">

              <div>
                <p className="text-[9px] font-black tracking-[0.16em] uppercase text-yellow-500">
                  PRODUCT IMAGES
                </p>

                <h3 className="text-sm font-black mt-1">
                  Add your product photos
                </h3>

                <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-1 leading-4">
                  Upload at least 3 images. You can add up to 6.
                  Each image must be 5 MB or smaller.
                </p>
              </div>

              <div className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-[10px] font-black">
                {form.images.filter((image) => image?.url).length}/6
              </div>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">

              {form.images.map((image, index) => (

                <div
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                >

                  {image?.preview ? (
                    <>
                      <img
                        src={image.preview}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {image.uploading && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-7 h-7 mx-auto rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            <p className="text-[9px] font-black mt-2">
                              UPLOADING
                            </p>
                          </div>
                        </div>
                      )}

                      {!image.uploading && (
                        <button
                          type="button"
                          onClick={() => removeMarketplaceImage(index)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center text-xs font-black"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          ×
                        </button>
                      )}

                      {index < 3 && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/70 text-white text-[8px] font-black">
                          REQUIRED
                        </div>
                      )}
                    </>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer active:scale-[0.98] transition">

                      <span className="w-11 h-11 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xl">
                        +
                      </span>

                      <span className="text-[9px] font-black mt-2 text-zinc-500 dark:text-zinc-400">
                        {index < 3 ? "ADD IMAGE" : "OPTIONAL"}
                      </span>

                      {index < 3 && (
                        <span className="text-[8px] text-yellow-500 font-black mt-1">
                          REQUIRED
                        </span>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            uploadMarketplaceImage(index, file);
                          }

                          e.target.value = "";
                        }}
                      />

                    </label>
                  )}

                  {image?.url && !image.uploading && (
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById(
                          `marketplace-image-replace-${index}`
                        );

                        input?.click();
                      }}
                      className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-[8px] font-black"
                    >
                      REPLACE
                    </button>
                  )}

                  <input
                    id={`marketplace-image-replace-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        uploadMarketplaceImage(index, file);
                      }

                      e.target.value = "";
                    }}
                  />

                </div>

              ))}

            </div>

            <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-4 leading-4">
              The first 3 image slots are required. Clear, well-lit product
              photos help buyers understand what they are purchasing.
            </p>

          </div>

          <div>
            <label className="text-xs font-black">
              Stock
            </label>

            <input
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={(e) => updateField("stock", e.target.value)}
              placeholder="Enter available stock"
              inputMode="numeric"
              className="mt-2 w-full h-12 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          {/* LOCATION */}

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] p-4">

            <div className="mb-4">
              <p className="text-[9px] font-black tracking-[0.16em] uppercase text-yellow-500">
                LOCATION
              </p>

              <h3 className="text-sm font-black mt-1">
                Where is this product located?
              </h3>

              <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-1">
                Tell buyers where the product is stored. Your verified pickup address is used automatically for courier collection.
              </p>
            </div>

            {seller?.pickupAddress?.validated &&
              seller?.pickupAddress?.state && (
                <div className="mb-4 rounded-2xl border border-yellow-200 dark:border-yellow-900/40 bg-yellow-50/70 dark:bg-yellow-950/20 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-yellow-600 dark:text-yellow-400">
                        Courier pickup location
                      </p>
                      <p className="mt-1 text-xs font-bold">
                        {seller.pickupAddress.city
                          ? `${seller.pickupAddress.city}, `
                          : ""}
                        {seller.pickupAddress.state}
                      </p>
                    </div>

                    <span className="shrink-0 text-[9px] font-black text-green-600 dark:text-green-400">
                      ✓ VERIFIED
                    </span>
                  </div>

                  <p className="mt-1 text-[9px] leading-4 text-zinc-500 dark:text-zinc-400">
                    Shipbubble will use this verified address when checking courier availability.
                  </p>
                </div>
              )}

            <div>
              <label className="text-xs font-black">
                State
              </label>

              <select
                value={form.location?.state || ""}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    location: {
                      ...current.location,
                      state: e.target.value,
                      addressCode: null,
                    },
                  }))
                }
                className="mt-2 w-full h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
              >
                <option value="">
                  Select state
                </option>

                {NIGERIA_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="text-xs font-black">
                Area / location
              </label>

              <input
                value={form.location?.exact || ""}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    location: {
                      ...current.location,
                      exact: e.target.value,
                      addressCode: null,
                    },
                  }))
                }
                placeholder="e.g. Ikeja, Allen Avenue"
                className="mt-2 w-full h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 text-sm outline-none focus:border-yellow-400"
              />

              {locationVerification.status === "checking" && (
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    Checking this location with our shipping provider...
                  </span>
                </div>
              )}

              {locationVerification.status === "verified" && (
                <div className="mt-2 rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-950/20 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-green-600 dark:text-green-400">
                      ✓ Location verified
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-green-700 dark:text-green-300">
                    {locationVerification.data?.exact ||
                      "This location was recognised by our shipping provider."}
                  </p>

                  <p className="mt-1 text-[11px] text-green-700/80 dark:text-green-300/80">
                    Courier availability for the actual buyer's destination
                    will be confirmed at checkout.
                  </p>
                </div>
              )}

              {locationVerification.status === "error" && (
                <div className="mt-2 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 px-3 py-2">
                  <p className="text-xs font-bold text-red-600 dark:text-red-400">
                    ⚠ Location could not be verified
                  </p>

                  <p className="mt-1 text-xs text-red-700 dark:text-red-300">
                    {locationVerification.message}
                  </p>
                </div>
              )}

              {seller?.pickupAddress?.validated &&
                seller?.pickupAddress?.city && (
                  <button
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        location: {
                          ...current.location,
                          state:
                            current.location?.state ||
                            seller.pickupAddress.state ||
                            "",
                          exact: seller.pickupAddress.city,
                        },
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-dashed border-yellow-300 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/10 px-3 py-2 text-left"
                  >
                    <p className="text-[9px] font-black uppercase tracking-[0.12em] text-yellow-600 dark:text-yellow-400">
                      Suggested pickup area
                    </p>
                    <p className="mt-1 text-xs font-bold">
                      {seller.pickupAddress.city}
                    </p>
                    <p className="mt-1 text-[9px] text-zinc-500 dark:text-zinc-400">
                      Tap to use your verified courier pickup area
                    </p>
                  </button>
                )}

              <p className="text-[9px] text-zinc-500 mt-2">
                Enter the area, neighbourhood or other useful location details buyers can use to identify where the product is located.
              </p>
            </div>

          </div>


          <div>
            <label className="text-xs font-black">
              Product description
            </label>

            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Tell buyers what the product is and give them the important
              information they need before ordering.
            </p>

            <div className="mt-3 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
                Include these details
              </p>

              <div className="mt-2 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                <p>• Product overview — What is the product?</p>
                <p>• Key features — What makes it useful or special?</p>
                <p>• Uses / benefits — What can buyers use it for?</p>
                <p>• What's included — What exactly will the buyer receive?</p>
                <p>• Condition — New, used, refurbished, etc.</p>
                <p>• Important notes — Anything buyers should know before ordering.</p>
              </div>
            </div>

            <textarea
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value.slice(0, 3000))
              }
              placeholder={`Product overview:
Describe what the product is and what it does.

Key features:
•
•
•

Uses / benefits:
•
•

What's included:
•

Condition:
New / Used / Refurbished

Important notes:
Add anything buyers should know before ordering.`}
              maxLength={3000}
              rows={10}
              className="mt-3 w-full rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4 text-sm outline-none focus:border-yellow-400 resize-none"
            />

            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span
                className={
                  form.description.trim().length < 50
                    ? "text-zinc-400 dark:text-zinc-500"
                    : "text-green-600 dark:text-green-400"
                }
              >
                Minimum 50 characters
              </span>

              <span
                className={
                  form.description.length >= 3000
                    ? "font-bold text-red-500"
                    : "text-zinc-400 dark:text-zinc-500"
                }
              >
                {form.description.length}/3000
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-yellow-400 text-black text-xs font-black active:scale-[0.98] transition"
          >
            Submit product for review →
          </button>

        </form>

        {/* REVIEW NOTICE */}

        <section className="mt-6 rounded-2xl bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 p-4">

          <p className="text-xs font-black">
            🛡️ Product review
          </p>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 leading-5">
            Products are not published immediately. AlphaBot will review
            your listing before it becomes visible to marketplace buyers.
          </p>

        </section>

      </div>

    </main>
  );
}
