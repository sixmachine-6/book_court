const User = require("../models/userModel");
const Court = require("../models/courtModel");
const Booking = require("../models/bookingModel");

exports.getCourts = async (req, res) => {
  try {
    const courts = await Court.find();

    res.status(200).json({
      status: "success",
      results: courts.length,
      data: courts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch courts",
    });
  }
};

exports.bookCourt = async (req, res) => {
  try {
    const { game, courtNumber, date, slot } = req.body;

    const userId = req.user.id;

    // 🚫 Check if user already has a booking
    const userExisting = await Booking.findOne({ user: userId });

    if (userExisting) {
      return res.status(400).json({
        status: "fail",
        message: "User has already booked a slot",
      });
    }

    // 🔍 Check if slot already booked
    const existing = await Booking.findOne({
      game,
      courtId: courtNumber,
      date,
      slot,
    });

    if (existing) {
      return res.status(400).json({
        status: "fail",
        message: "Slot already booked",
      });
    }

    // ✅ Create booking
    const booking = await Booking.create({
      user: userId,
      game,
      courtId: courtNumber,
      date,
      slot,
    });

    res.status(201).json({
      status: "success",
      data: booking,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Slot already booked",
      });
    }

    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Booking failed",
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { game, courtId, date } = req.query;

    const bookings = await Booking.find({
      game,
      courtId,
      date,
    }).populate("user", "email"); // 🔥 IMPORTANT

    res.status(200).json({
      status: "success",
      data: bookings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 }) // upcoming first
      .lean();

    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: bookings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};
