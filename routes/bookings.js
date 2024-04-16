var express = require("express");
var router = express.Router();
const moment = require("moment");

const Cart = require("../models/carts");
const Booking = require("../models/bookings");

// *************************** DELETE ALL TRIPS FROM "CARTS" AND ADD ALL TRIPS TO "BOOKING"
router.post("/post/allTripsBooked", async (req, res) => {
  const allTrips = await Cart.find().populate("id");

  for (const trip of allTrips) {
    const newTrip = new Booking({
      id: trip.id[0]._id,
    });

    newTrip.save();

    Cart.deleteOne({ _id: trip._id.toString() }).exec();
  }
  res.json({ result: true, message: "all trips are booked" });
});

// ************************* GET ALL TRIPS BOOKED

router.get("/get/allTripsBooked", async (req, res) => {
  const allTripsBooked = await Booking.find().populate("id");
  res.json({ result: true, allTripsBooked });
});

module.exports = router;
