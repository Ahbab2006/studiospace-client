"use client";

import { authClient } from "@/lib/auth-client";

export default function TestTokenPage() {
    const getToken = async () => {
        try {
            const { data, error } = await authClient.token();

            if (error) {
                console.error("Token Error:", error);
                alert("Token পাওয়া যায়নি। Console দেখো।");
                return;
            }

            if (data?.token) {
                console.log("Admin JWT Token:", data.token);
                alert("Token পাওয়া গেছে! Browser Console দেখো।");
            } else {
                console.log("Token response:", data);
                alert("Token পাওয়া যায়নি।");
            }
        } catch (error) {
            console.error("Token Error:", error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">
                Test Admin Token
            </h1>

            <button
                onClick={getToken}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                Get Admin Token
            </button>
        </div>
    );
}