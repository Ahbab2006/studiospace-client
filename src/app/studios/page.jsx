"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudiosPage() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load studios.");
        }

        setStudios(result.data || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  const categories = [
    "All",
    ...new Set(studios.map((studio) => studio.category).filter(Boolean)),
  ];

  const filteredStudios = studios.filter((studio) => {
    const searchMatch =
      studio.title?.toLowerCase().includes(search.toLowerCase()) ||
      studio.location?.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || studio.category === category;

    return searchMatch && categoryMatch;
  });

  if (loading) {
    return <div className="py-20 text-center">Loading studios...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Explore Studios
          </h1>
          <p className="mt-3 text-gray-600">
            Find the perfect creative space for your next project.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search by studio name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {filteredStudios.length === 0 ? (
          <div className="rounded-xl bg-white py-16 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No studios found
            </h2>
            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <article
                key={studio._id}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {studio.image ? (
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-gray-200 text-gray-500">
                    No Image Available
                  </div>
                )}

                <div className="p-5">
                  <span className="text-sm font-medium text-blue-600">
                    {studio.category}
                  </span>

                  <h2 className="mt-2 text-xl font-bold text-gray-900">
                    {studio.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    📍 {studio.location}
                  </p>

                  <p className="mt-3 font-semibold text-gray-900">
                    ৳{Number(studio.hourlyRate).toLocaleString()} / hour
                  </p>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/studios/${studio._id}`}
                      className="flex-1 rounded-lg border border-blue-600 px-3 py-2 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50"
                    >
                      View Details
                    </Link>

                    <Link
                      href={`/booking?studioId=${studio._id}&hourlyRate=${studio.hourlyRate}`}
                      className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}