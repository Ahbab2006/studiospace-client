
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

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

    try {
        const response = await fetch(
            "http://localhost:5000/api/studios",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
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

        alert("Studio added successfully!");

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
        alert(error.message);
    }
};



    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-2">
                Add Your Studio
            </h1>

            <p className="text-gray-500 mb-8">
                Share your creative workspace with creators.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="block font-medium mb-2">
                        Studio Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter studio name"
                        required
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3"
                    >
                        <option value="">Select category</option>
                        <option value="Photo Studio">Photo Studio</option>
                        <option value="Film Stage">Film Stage</option>
                        <option value="Podcast Lounge">Podcast Lounge</option>
                        <option value="Music Suite">Music Suite</option>
                        <option value="Workshop">Workshop</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block font-medium mb-2">
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
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
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
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-2">
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
                        className="w-full border rounded-lg p-3"
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Opening Time */}
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
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    {/* Closing Time */}
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
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Location / Address
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter studio location"
                        required
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Studio Image URL
                    </label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Amenities
                    </label>
                    <input
                        type="text"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        placeholder="WiFi, AC, Lighting, Parking"
                        required
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Studio Overview
                    </label>
                    <textarea
                        name="overview"
                        value={formData.overview}
                        onChange={handleChange}
                        placeholder="Describe your studio..."
                        rows="5"
                        required
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                >
                    Add Studio
                </button>

            </form>
        </main>
    );
}
