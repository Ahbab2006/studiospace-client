
"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function BookingForm() {
  const searchParams = useSearchParams();

  // States
  const [studioId, setStudioId] = useState("");
  const [hourlyRate, setHourlyRate] = useState(0);

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // Get studio information from URL
  useEffect(() => {
    const id = searchParams.get("studioId");
    const rate = searchParams.get("hourlyRate");

    if (id) {
      setStudioId(id);
    }

    if (rate) {
      setHourlyRate(Number(rate));
    }
  }, [searchParams]);

  // Convert time to minutes
  const startMinutes = startTime
    ? Number(startTime.split(":")[0]) * 60 +
      Number(startTime.split(":")[1])
    : 0;

  const endMinutes = endTime
    ? Number(endTime.split(":")[0]) * 60 +
      Number(endTime.split(":")[1])
    : 0;

  // Calculate duration
  const totalHours =
    endMinutes > startMinutes
      ? (endMinutes - startMinutes) / 60
      : 0;

  // Calculate total price
  const totalPrice = totalHours * hourlyRate;

  // Today's date
  const today = new Date().toLocaleDateString("en-CA");

  // Booking Handler
  const handleBooking = async (event) => {
    event.preventDefault();

    setMessage("");
    setError(false);

    if (!studioId) {
      setError(true);
      setMessage(
        "Studio ID missing. Please open a studio and click Book Now."
      );
      return;
    }

    if (!hourlyRate || hourlyRate <= 0) {
      setError(true);
      setMessage(
        "Invalid studio hourly rate. Please reopen the studio page."
      );
      return;
    }

    if (!bookingDate) {
      setError(true);
      setMessage("Please select a booking date.");
      return;
    }

    if (bookingDate < today) {
      setError(true);
      setMessage("Please select a valid future date.");
      return;
    }

    if (
      !startTime ||
      !endTime ||
      endMinutes <= startMinutes
    ) {
      setError(true);
      setMessage(
        "End time must be later than start time."
      );
      return;
    }

    setLoading(true);

    try {
      // Step 1: Authentication

const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        studioId,
        bookingDate,
        startTime,
        endTime,
    }),
});

const result = await response.json();

if (!response.ok || !result.success) {
    throw new Error(result.message || "Booking failed.");
}


      // Success
      setMessage(
        `Booking request submitted! Status: ${
          result.data.status
        }. Total: ৳${Number(
          result.data.totalPrice
        ).toLocaleString()}`
      );

      setBookingDate("");
      setStartTime("");
      setEndTime("");

    } catch (err) {
      setError(true);
      setMessage(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-md sm:p-8">

        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Book a Studio
        </h1>

        <p className="mb-8 text-gray-600">
          Choose your preferred date and time to book a studio.
        </p>

        {/* Message */}
        {message && (
          <div
            role="alert"
            className={`mb-6 rounded-lg p-4 ${
              error
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleBooking}
          className="space-y-6"
        >

          {/* Studio ID */}
          <div>
            <label
              htmlFor="studioId"
              className="mb-2 block font-medium text-gray-700"
            >
              Studio ID
            </label>

            <input
              id="studioId"
              type="text"
              value={studioId}
              readOnly
              placeholder="Open a studio and click Book Now"
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
              required
            />
          </div>

          {/* Hourly Rate */}
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-gray-600">
              Studio Hourly Rate
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-700">
              ৳{Number(hourlyRate).toLocaleString()} / hour
            </p>
          </div>

          {/* Booking Date */}
          <div>
            <label
              htmlFor="bookingDate"
              className="mb-2 block font-medium text-gray-700"
            >
              Booking Date
            </label>

            <input
              id="bookingDate"
              type="date"
              value={bookingDate}
              onChange={(event) =>
                setBookingDate(event.target.value)
              }
              min={today}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Start and End Time */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <label
                htmlFor="startTime"
                className="mb-2 block font-medium text-gray-700"
              >
                Start Time
              </label>

              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(event) =>
                  setStartTime(event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="mb-2 block font-medium text-gray-700"
              >
                End Time
              </label>

              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(event) =>
                  setEndTime(event.target.value)
                }
                min={startTime || undefined}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

          </div>

          {/* Total Calculation */}
          <div className="rounded-lg bg-blue-50 p-4">

            <p className="text-sm text-gray-600">
              Total Booking Duration
            </p>

            <p className="mt-1 text-xl font-bold text-blue-700">
              {totalHours > 0
                ? `${totalHours} hours`
                : "Select a valid time"}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Estimated Total Price
            </p>

            <p className="text-2xl font-bold text-blue-700">
              ৳{totalPrice.toLocaleString()}
            </p>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Booking..."
              : "Confirm Booking"}
          </button>

        </form>
      </div>
    </main>
  );
}

// Main Booking Page
export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <p className="py-20 text-center text-gray-600">
          Loading booking form...
        </p>
      }
    >
      <BookingForm />
    </Suspense>
  );
}
