var express = require("express");
var router = express.Router();
const moment = require("moment");

const Trip = require("../models/trips");
const Cart = require("../models/carts");

//***************************** ADD NEW TRIP IN COLLECTION CART */
router.post("/post/onetrip", (req, res) => {
  const id = req.body.id.toString();
  Trip.findById(id).then((data) => {
    let tripToAdd = data;
    const newTrip = new Cart({
      id: tripToAdd._id,
    });

    newTrip.save().then(res.json({ result: true, product: "saved" }));
  });
});

//***************************** GET ALL TRIPS IN COLLECTION "CARTS" */
router.get("/get/alltrips", (req, res) => {
  Cart.find()
    .populate("id")
    .then((data) => {
      const allTrips = data;
      if (allTrips) {
        res.json({ result: true, allTrips });
      } else {
        res.json({ result: false, message: "no Trips" });
      }
    })
    .catch((error) => console.error(error));
});

//***************************** DELETE TRIP FROM COLLECTION "CARTS" */
router.delete("/delete/onetrip/:id", (req, res) => {
  const id = req.params.id.toString();
  Cart.deleteOne({ _id: id })
    .then((data) => res.json({ result: true, status: "city deleted" }))
    .catch((error) => console.error(error));
});

module.exports = router;
