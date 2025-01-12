const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.get("/restaurant/:restaurantId", reservationController.getReservationsForRestaurant);
router.get("/user/:userId", reservationController.getReservationsForUser);
router.get("/:reservationId", reservationController.getReservationById);
router.post("/", reservationController.addReservation);
router.put("/:reservationId", reservationController.updateReservation);
router.delete("/:reservationId", reservationController.deleteReservation);

module.exports = router;
