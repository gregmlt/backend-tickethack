var express = require("express");
var router = express.Router();
const moment = require("moment");

const Trip = require("../models/trips");

// ***************** ROUTE TO GET ALL TRIPS WHICH HAVE THE SAME DEPARTURE, ARRIVAL AND DATE

router.get("/:departure/:arrival/:date", async (req, res) => {
  const timestamp = req.params.date;
  const date = moment.unix(Number(timestamp)).format("YYYY-MM-DD");

  const allTrips = await Trip.find();
  const matchTrip = allTrips.filter(
    (trips) =>
      trips.departure.toLowerCase() === req.params.departure.toLowerCase() &&
      trips.arrival.toLowerCase() === req.params.arrival.toLowerCase() &&
      moment(trips.date).format("YYYY-MM-DD") === date
  );
  if (matchTrip != "") {
    // If at least 1 trip found
    res.json({ result: true, allTrips: matchTrip }); // Send all the trips found
  } else {
    // If no trips found
    res.json({ result: false, allTrips: "No trips found" });
  }
});

module.exports = router;
