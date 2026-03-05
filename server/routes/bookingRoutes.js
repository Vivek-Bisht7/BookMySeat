const express = require('express');
const router = express.Router();
const { lockSeats , getBookingById , createPaymentOrder , verifyPayment , getBookedSeats , downloadTicket} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware")

router.post("/lock", authMiddleware, lockSeats);
router.get("/:id", authMiddleware, getBookingById);
router.post("/create-order", authMiddleware, createPaymentOrder);
router.post("/verify-payment", authMiddleware, verifyPayment);
router.get("/show/:showId/seats",authMiddleware,getBookedSeats);
router.get("/ticket/:bookingId", downloadTicket);

module.exports = router;