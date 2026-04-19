import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useCourtDetails } from "./../hooks/useCourtDetails";
import { useBookCourt } from "../hooks/useBookCourt";
import { useBookings } from "../hooks/useBookings";
import "react-datepicker/dist/react-datepicker.css";

export default function Court() {
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { courts, isLoading } = useCourtDetails();
  const { book, isPending } = useBookCourt();

  // 🔥 sports from backend
  const sports = courts?.map((item) => item.game) || [];

  useEffect(() => {
    if (courts?.length && !selectedSport) {
      setSelectedSport(courts[0].game);
    }
  }, [courts, selectedSport]);

  const selectedGameData = courts?.find((item) => item.game === selectedSport);

  const availableCourts = selectedGameData?.courts || [];

  const slots = selectedCourt?.slots || [];

  const formattedDate = date?.toISOString().split("T")[0];

  const { bookings = [] } = useBookings({
    game: selectedSport,
    courtId: selectedCourt?.courtId,
    date: formattedDate,
  });

  const bookingMap = {};
  bookings.forEach((b) => {
    bookingMap[b.slot] = b.user?.email;
  });

  function handleConfirmBooking() {
    if (!selectedCourt || !slot || !date) return;

    book({
      game: selectedSport,
      courtNumber: selectedCourt.courtId,
      date: formattedDate,
      slot,
    });

    setOpenModal(false);
  }

  // ✅ FIX: image mapping (no dynamic string path)
  const images = {
    badminton: "/badminton.jpg",
    tennis: "/tennis.jpg",
    volleyball: "/volleyball.jpg",
    basketball: "/basketball.jpg",
  };

  // ✅ FIX: preload images once
  useEffect(() => {
    Object.values(images).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white lg:mx-10">
      <div className="grid md:grid-cols-2 grid-cols-1">
        {/* LEFT IMAGE */}
        <div className="h-80 md:h-screen">
          <img
            src={images[selectedSport]}
            alt="sport"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="p-6 flex flex-col space-y-6 ">
          {/* SPORTS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => {
                  setSelectedSport(sport);
                  setSelectedCourt(null);
                  setSlot("");
                }}
                className={`px-4 py-2 rounded-xl ${
                  selectedSport === sport ? "bg-blue-600" : "bg-gray-800"
                }`}
              >
                {sport}
              </button>
            ))}
          </div>

          {/* COURTS */}
          <div>
            <h2>Select Court</h2>
            <div className="flex gap-3 flex-wrap">
              {availableCourts.map((court) => (
                <button
                  key={court.courtId}
                  onClick={() => {
                    setSelectedCourt(court);
                    setSlot("");
                  }}
                  className={`px-4 py-2 rounded-xl ${
                    selectedCourt?.courtId === court.courtId
                      ? "bg-green-600"
                      : "bg-gray-800"
                  }`}
                >
                  Court {court.courtId}
                </button>
              ))}
            </div>
          </div>

          {/* DATE */}
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-sm text-white">Select Date</h2>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              minDate={new Date()}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl"
              placeholderText="Pick a date"
            />
          </div>

          {/* SLOT */}
          <div>
            <h2 className="mb-2">Select Time Slot</h2>

            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              disabled={!selectedCourt}
              className="w-full bg-gray-800 p-3 rounded-lg"
            >
              <option value="">Select Slot</option>

              {slots.map((s) => {
                const bookedBy = bookingMap[s];
                const isBooked = !!bookedBy;

                return (
                  <option key={s} value={s} disabled={isBooked}>
                    {s} {isBooked ? `Booked by ${bookedBy.split("@")[0]}` : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* BOOK BUTTON */}
          <button
            onClick={() => setOpenModal(true)}
            disabled={!date || !slot || !selectedCourt}
            className={`py-3 rounded-xl ${
              date && slot && selectedCourt ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-2xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

            <p>Sport: {selectedSport}</p>
            <p>Court: {selectedCourt?.courtId}</p>
            <p>Date: {formattedDate}</p>
            <p>Slot: {slot}</p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="flex-1 py-2 bg-gray-600 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmBooking}
                disabled={isPending}
                className="flex-1 py-2 bg-green-600 rounded-xl"
              >
                {isPending ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
