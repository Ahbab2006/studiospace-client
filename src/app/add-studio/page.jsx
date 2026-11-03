
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddStudioPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    openingTime: "09:00",
    closingTime: "22:00",
    location: "",
    image: "",
    amenities: "",
    overview: "",
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login before adding a studio.");
      return;
    }

    setLoading(true);

    

try {
const tokenData = await authClient.token();
const token = tokenData?.data?.token;

if (!token) {
  throw new Error("Authentication token not found.");
}

const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/studios`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...formData,
      hostEmail: session?.user?.email,
      hostName: session?.user?.name,
    }),
  }
);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add studio");
      }

    toast.success("Studio added successfully!");

router.push("/my-listings");

      setFormData({
        title: "",
        category: "",
        hourlyRate: "",
        securityDeposit: "",
        maxCapacity: "",
        openingTime: "09:00",
        closingTime: "22:00",
        location: "",
        image: "",
        amenities: "",
        overview: "",
      });
    } catch (error) {
      console.error("Add studio error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500";

  const labelClass =
    "mb-2 block font-semibold text-slate-700 dark:text-slate-200";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 transition-colors duration-300 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            Add Your Studio
          </h1>

          <p className="text-slate-600 dark:text-slate-400">
            Share your creative workspace with creators.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        >

          {/* Studio Title */}
          <div>
            <label className={labelClass}>
              Studio Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter studio name"
              required
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select category</option>
              <option value="Photo Studio">Photo Studio</option>
              <option value="Film Stage">Film Stage</option>
              <option value="Podcast Lounge">Podcast Lounge</option>
              <option value="Music Suite">Music Suite</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Hourly Rate (৳)
              </label>

              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="e.g. 500"
                min="1"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Security Deposit (৳)
              </label>

              <input
                type="number"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                placeholder="e.g. 1000"
                min="0"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Maximum Capacity */}
          <div>
            <label className={labelClass}>
              Maximum Capacity
            </label>

            <input
              type="number"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              placeholder="e.g. 10 people"
              min="1"
              required
              className={inputClass}
            />
          </div>

          {/* Opening and Closing Time */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Opening Time
              </label>

              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Closing Time
              </label>

              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>
              Location / Address
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter studio location"
              required
              className={inputClass}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className={labelClass}>
              Studio Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className={inputClass}
            />
          </div>

          {/* Amenities */}
          <div>
            <label className={labelClass}>
              Amenities
            </label>

            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="WiFi, AC, Lighting, Parking"
              required
              className={inputClass}
            />

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Separate amenities using commas.
            </p>
          </div>

          {/* Studio Overview */}
          <div>
            <label className={labelClass}>
              Studio Overview
            </label>

            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              placeholder="Describe your studio..."
              rows="5"
              required
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding Studio..." : "Add Studio"}
          </button>

        </form>
      </div>
    </main>
  );
}