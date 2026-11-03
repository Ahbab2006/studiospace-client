"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";



export default function MyListingsPage() {
    const { data: session } = authClient.useSession();

    const [studios, setStudios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");




    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this studio?"
        );

        if (!confirmDelete) return;

        try {
            const { data: tokenData, error: tokenError } =
                await authClient.token();

            if (tokenError || !tokenData?.token) {
                throw new Error("Please login again!");
            }

            const response = await fetch(
                `http://localhost:5000/api/studios/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData.token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete studio");
            }

            setStudios((prevStudios) =>
                prevStudios.filter((studio) => studio._id !== id)
            );

            alert("Studio deleted successfully!");
        } catch (error) {
            console.error("Delete studio error:", error);
            alert(error.message);
        }
    };

    // এখানে পরের ধাপে useEffect লিখব

    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchMyListings = async () => {
            try {
                setLoading(true);

                const { data: tokenData, error: tokenError } =
                    await authClient.token();

                if (tokenError || !tokenData?.token) {
                    throw new Error("Please login again!");
                }

                const response = await fetch(
                    "http://localhost:5000/api/studios/my-listings",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenData.token}`,
                        },
                    }
                );

                const result = await response.json();

                console.log("My Listings API Status:", response.status);
                console.log("My Listings API Response:", result);

                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch listings");
                }

                setStudios(result.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyListings();
    }, [session?.user?.email]);



    return (
        <main className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">
                My Studio Listings
            </h1>

            {loading && <p>Loading your studios...</p>}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && studios.length === 0 && (
                <p>You haven t added any studios yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studios.map((studio) => (
                    <div
                        key={studio._id}
                        className="border rounded-xl overflow-hidden shadow-sm"
                    >
                        <img
                            src={studio.image}
                            alt={studio.title}
                            className="w-full h-52 object-cover"
                        />

                        <div className="p-5">
                            <h2 className="text-xl font-bold">
                                {studio.title}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                {studio.category}
                            </p>

                            <p className="mt-2">
                                Location: {studio.location}
                            </p>

                            <p className="font-semibold mt-2">
                                ৳{studio.hourlyRate} / hour
                            </p>

                            <Link
                                href={`/studios/${studio._id}`}
                                className="inline-block mt-4 text-blue-600 font-semibold"
                            >
                                View Details
                            </Link>

                            <div className="flex gap-3 mt-4">
                              
                                <Link
                                    href={`/edit-studio/${studio._id}`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(studio._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </main>
    );


}