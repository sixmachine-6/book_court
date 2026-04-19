const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
  game: {
    type: String,
    enum: ["volleyball", "badminton", "tennis", "basketball"],
    required: true,
  },

  courts: [
    {
      courtId: {
        type: Number,
        required: true,
      },

      // 🔥 Static slots (no booking info here)
      slots: [
        {
          type: String,
        },
      ],
    },
  ],
});

const Court = mongoose.model("Court", courtSchema);

module.exports = Court;
