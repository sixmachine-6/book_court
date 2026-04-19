import { useMyBookings } from "../hooks/useMyBookings";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const { bookings, isLoading } = useMyBookings();
  const navigate = useNavigate();

  if (isLoading)
    return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>

        <button
          onClick={() => navigate("/courts")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm"
        >
          ← Back to Courts
        </button>
      </div>

      {/* EMPTY */}
      {bookings.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No bookings yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-md flex gap-4 items-center"
            >
              {/* 🔥 GAME IMAGE */}
              <img
                src={`./../${b.game}.jpg`} // 👈 make sure images exist
                alt={b.game}
                className="w-20 h-20 object-cover rounded-lg"
              />

              {/* CONTENT */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-green-400 mb-2">
                  {b.game.toUpperCase()}
                </h2>

                <p className="text-sm text-gray-300">
                  Court: <span className="text-white">{b.courtId}</span>
                </p>

                <p className="text-sm text-gray-300">
                  Date: <span className="text-white">{b.date}</span>
                </p>

                <p className="text-sm text-gray-300">
                  Slot: <span className="text-white">{b.slot}</span>
                </p>

                <div className="mt-2 text-xs text-gray-500">
                  Booked on: {new Date(b.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
