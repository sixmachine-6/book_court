const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    courtId: {
      type: Number,
      required: true,
    },
    date: {
      type: String, // "YYYY-MM-DD"
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// 🔥 Prevent double booking (VERY IMPORTANT)
bookingSchema.index(
  { game: 1, courtId: 1, date: 1, slot: 1 },
  { unique: true },
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
