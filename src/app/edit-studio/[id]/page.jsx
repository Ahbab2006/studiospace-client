"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


function EditStudioForm() {
    // const { id } = useParams();
    const params = useParams();
const id = params?.id;

console.log("Edit Studio ID:", id);

    const router = useRouter();

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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data: tokenData, error: tokenError } =
                await authClient.token();

            if (tokenError || !tokenData?.token) {
                throw new Error("Please login again!");
            }

            const response = await fetch(
                `http://localhost:5000/api/studios/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData.token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update studio");
            }

            alert("Studio updated successfully!");
            router.push("/my-listings");
            router.refresh();

        } catch (error) {
            console.error("Update studio error:", error);
            alert(error.message);
        }
    };




    useEffect(() => {
        const fetchStudio = async () => {
if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    setError("Invalid studio ID: " + id);
    setLoading(false);
    return;
}

            try {
                const response = await fetch(
                    `http://localhost:5000/api/studios/${id}`
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch studio");
                }

                const studio = result.data;

                setFormData({
                    title: studio.title || "",
                    category: studio.category || "",
                    hourlyRate: studio.hourlyRate || "",
                    securityDeposit: studio.securityDeposit || "",
                    maxCapacity: studio.maxCapacity || "",
                    openingTime: studio.openingTime || "09:00",
                    closingTime: studio.closingTime || "22:00",
                    location: studio.location || "",
                    image: studio.image || "",
                    amenities: Array.isArray(studio.amenities)
                        ? studio.amenities.join(", ")
                        : "",
                    overview: studio.overview || "",
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchStudio();
    }, [id]);

    if (loading) return <p>Loading studio information...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Studio</h1>

            {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Studio Title"
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    placeholder="Hourly Rate"
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    placeholder="Security Deposit"
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="number"
                    name="maxCapacity"
                    value={formData.maxCapacity}
                    onChange={handleChange}
                    placeholder="Max Capacity"
                    className="w-full border p-3 rounded-lg"
                />

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
        <label className="block font-medium mb-2">
            Opening Time
        </label>
        <input
            type="time"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
        />
    </div>

    <div>
        <label className="block font-medium mb-2">
            Closing Time
        </label>
        <input
            type="time"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
        />
    </div>
</div>

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    placeholder="Amenities"
                    className="w-full border p-3 rounded-lg"
                />

                <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    placeholder="Studio Overview"
                    className="w-full border p-3 rounded-lg"
                    rows="5"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
                >
                    Update Studio
                </button>
            </form>

        </main>
    );
}
export default function EditStudioPage() {
    return (
        <Suspense fallback={<p>Loading edit page...</p>}>
            <EditStudioForm />
        </Suspense>
    );
}