const express = require("express");
const authController = require("./../controllers/authController");
const bookController = require("./../controllers/bookController");
const router = express.Router();

router.route("/").get(bookController.getCourts);
router.route("/").post(authController.protect, bookController.bookCourt);
router.route("/bookings").get(bookController.getBookings);
router
  .route("/myBookings")
  .get(authController.protect, bookController.getMyBookings);
module.exports = router;
