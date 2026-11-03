"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


function StudioDetailsContent() {
  const { id } = useParams();

  const router = useRouter();

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/studios/${id}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Studio not found");
        }

        setStudio(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudio();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center py-20">Loading studio...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-20 text-red-500">
        {error}
      </p>
    );
  }

  if (!studio) {
    return <p className="text-center py-20">Studio not found.</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <img
        src={studio.image}
        alt={studio.title}
        className="w-full h-96 object-cover rounded-2xl"
      />

      <div className="mt-8">
        <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
          {studio.category}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mt-4">
          {studio.title}
        </h1>

        <p className="text-gray-500 mt-3">
          📍 {studio.location}
        </p>

        <p className="text-xl font-bold mt-5">
          ৳{studio.hourlyRate} / hour
        </p>

<button
  onClick={() => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    router.push(
      `/booking?studioId=${studio._id}&hourlyRate=${studio.hourlyRate}`
    );
  }}
  disabled={isPending}
  className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
>
  {isPending ? "Checking..." : "Book Now"}
</button>

        <p className="mt-5 text-gray-600">
          {studio.overview}
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Studio Information
          </h2>

          <p>Security Deposit: ৳{studio.securityDeposit}</p>
          <p>Maximum Capacity: {studio.maxCapacity} people</p>
          <p>Opening Time: {studio.openingTime || "Not specified"}</p>
          <p>Closing Time: {studio.closingTime || "Not specified"}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Amenities
          </h2>

          <div className="flex flex-wrap gap-2">
            {studio.amenities?.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 px-4 py-2 rounded-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function StudioDetailsPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading studio details...</p>}>
      <StudioDetailsContent />
    </Suspense>
  );
}