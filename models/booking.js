const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
  trip: [{ type: mongoose.Schema.Types.ObjectId, ref: "trips" }],
});

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
