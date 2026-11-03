"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);


  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(bookingId);

      const tokenData = await authClient.token();
      const token = tokenData?.data?.token || tokenData?.token;

      if (!token) {
        throw new Error("Please log in first.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Cancellation failed.");
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setCancellingId(null);
    }
  };



  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const tokenData = await authClient.token();
        const token = tokenData?.data?.token || tokenData?.token;

        if (!token) {
          setError("Please log in to see your bookings.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
          }/bookings/my-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load bookings.");
        }

        setBookings(result.data || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your bookings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          My Bookings
        </h1>

        <p className="mb-8 text-gray-600">
          View all your studio bookings in one place.
        </p>

        {error ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No bookings yet
            </h2>
            <p className="mt-2 text-gray-500">
              Your studio bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    {booking.studioTitle || "Studio"}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">Date:</span>{" "}
                    {booking.bookingDate}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">Time:</span>{" "}
                    {booking.startTime} – {booking.endTime}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Duration:
                    </span>{" "}
                    {booking.totalHours} hours
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Total Price:
                    </span>{" "}
                    <span className="font-bold text-blue-700">
                      ৳{Number(booking.totalPrice).toLocaleString()}
                    </span>
                  </p>

                  <p className="break-all text-sm text-gray-400">
                    Booking ID: {booking._id}
                  </p>

             
{["pending", "confirmed"].includes(booking.status) && (
  <button
    onClick={() => handleCancelBooking(booking._id)}
    disabled={cancellingId === booking._id}
    className="mt-5 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
  >
    {cancellingId === booking._id
      ? "Cancelling..."
      : "Cancel Booking"}
  </button>
)}


                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}