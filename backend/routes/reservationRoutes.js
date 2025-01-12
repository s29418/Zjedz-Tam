const express = require("express");
const router = express.Router();
const { getReservationById, getReservationsForRestaurant, getReservationsForUser, addReservation, updateReservation, deleteReservation  } = require("../controllers/reservationController");
const {verifyToken, verifyAdminOrRestaurantAdmin, verifyRegistered, verifyRole} = require("../middlewares/authMiddleware");

router.get("/restaurant/:restaurantId",verifyToken, verifyAdminOrRestaurantAdmin, getReservationsForRestaurant);
router.get("/user/:userId", verifyToken, verifyRegistered, getReservationsForUser);
router.get("/:reservationId", getReservationById);
router.post("/",verifyToken, verifyRegistered, addReservation);
router.put("/:reservationId",verifyToken, verifyAdminOrRestaurantAdmin, updateReservation);
router.delete("/:reservationId",verifyToken, verifyAdminOrRestaurantAdmin, deleteReservation);

module.exports = router;
