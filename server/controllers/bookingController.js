const { log } = require("console");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const razorpay = require("../utils/razorpay");
const crypto = require("crypto"); 
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

const lockSeats = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    if (!showId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Get show and populate screen
    const show = await Show.findById(showId).populate("screen");

    if (!show || !show.screen) {
      return res.status(404).json({ message: "Show or Screen not found" });
    }

    const now = new Date();

    // Check seat conflict
    const existingBooking = await Booking.findOne({
      show: showId,
      seats: { $in: seats },
      status: { $in: ["PENDING", "CONFIRMED"] },
      expiresAt: { $gt: now },
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "Some seats are already booked or locked",
      });
    }

    // Calculate total amount from screen pricing
    let totalAmount = 0;

    for (let seatNumber of seats) {
      const rowIndex = seatNumber.charCodeAt(0) - 65;

      const seatType = show.screen.seatTypes.find((type) =>
        type.rows.includes(rowIndex),
      );

      if (!seatType) {
        return res.status(400).json({
          message: `Invalid seat ${seatNumber}`,
        });
      }

      totalAmount += seatType.price;
    }
    //  Create booking with 5 min expiry
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const booking = await Booking.create({
      user: req.user._id,
      show: showId,
      seats,
      totalAmount,
      status: "PENDING",
      expiresAt,
    });

    return res.status(201).json({
      message: "Seats locked successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: "show",
        populate: [
          { path: "movie" },
          { path: "screen" },
          { path: "theatre" }
        ]
      });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createPaymentOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "CONFIRMED") {
      return res.status(400).json({ message: "Already paid" });
    }

    const options = {
      amount: booking.totalAmount * 100, // in paise
      currency: "INR",
      receipt: booking._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await Booking.findByIdAndUpdate(bookingId, {
      status: "CONFIRMED",
      paymentId: razorpay_payment_id,
    });

    return res.json({ success: true });
  }

  res.status(400).json({ success: false });
};

const getBookedSeats = async (req, res) => {
  try {
    const { showId } = req.params;

    const now = new Date();
    const expiryMinutes = 5;

    const bookings = await Booking.find({
      show: showId,
      $or: [
        { status: "CONFIRMED" },
        {
          status: "PENDING",
          createdAt: {
            $gt: new Date(now.getTime() - expiryMinutes * 60 * 1000)
          }
        }
      ]
    });

    const seats = [];

    bookings.forEach((booking) => {
      booking.seats.forEach((seat) => {
        seats.push({
          seatNumber: seat,
          status: booking.status
        });
      });
    });

    res.json(seats);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const downloadTicket = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate({
        path: "show",
        populate: [
          { path: "movie" },
          { path: "theatre" },
          { path: "screen" }
        ]
      });


    if (!booking || booking.status !== "CONFIRMED") {
      return res.status(400).json({ message: "Invalid or Unpaid Booking" });
    }

    const movie = booking.show?.movie;
    const theatre = booking.show?.theatre;
    const screen = booking.show?.screen;

    const doc = new PDFDocument({
      size: [320, 720],
      margin: 0
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Ticket-${bookingId}.pdf`
    );

    doc.pipe(res);

    doc.rect(0, 0, 320, 720).fill("#0f0f0f");

    doc.rect(0, 0, 320, 200).fill("#18181b");

    doc.fillColor("#ef4444")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("NOW SHOWING", 30, 40);

    doc.fillColor("#ffffff")
      .fontSize(22)
      .text(movie?.title?.toUpperCase() || "MOVIE", 30, 55, {
        width: 260
      });

    doc.fillColor("#a1a1aa")
      .fontSize(9)
      .font("Helvetica")
      .text(
        `${movie?.language || ""} • ${movie?.genre || ""}`,
        30,
        110
      );

    doc.fillColor("#ffffff")
      .fontSize(11)
      .font("Helvetica-Bold")
      .text(theatre?.name || "Theatre", 30, 135);

    doc.fillColor("#71717a")
      .fontSize(9)
      .font("Helvetica")
      .text(
        `${theatre?.city || ""} | Screen ${screen?.name || "N/A"}`,
        30,
        150
      );

    doc.circle(0, 200, 15).fill("#0f0f0f");
    doc.circle(320, 200, 15).fill("#0f0f0f");

    doc.moveTo(30, 200)
      .lineTo(290, 200)
      .dash(4, { space: 4 })
      .stroke("#27272a");

    const detailY = 230;

    doc.undash();

    doc.fillColor("#71717a")
      .fontSize(8)
      .text("DATE", 30, detailY);

    doc.fillColor("#ffffff")
      .fontSize(12)
      .text(
        new Date(booking.show.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }),
        30,
        detailY + 12
      );

    doc.fillColor("#71717a")
      .fontSize(8)
      .text("TIME", 170, detailY);

    doc.fillColor("#ffffff")
      .fontSize(12)
      .text(booking.show.time || "N/A", 170, detailY + 12);

    doc.fillColor("#71717a")
      .fontSize(8)
      .text("SEATS", 30, detailY + 60);

    doc.fillColor("#22c55e")
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(booking.seats.join(", "), 30, detailY + 72);

    doc.roundedRect(30, 360, 260, 60, 10).fill("#18181b");

    doc.fillColor("#71717a")
      .fontSize(8)
      .text("TOTAL PAID", 45, 375);

    doc.fillColor("#ffffff")
      .fontSize(16)
      .text(`Rupees : ${booking.totalAmount}`, 45, 390);

    doc.fillColor("#3f3f46")
      .fontSize(7)
      .text(`TXN: ${booking.paymentId || "N/A"}`, 30, 440);

    doc.roundedRect(40, 480, 240, 180, 15).fill("#ffffff");

    const qrData = JSON.stringify({
      bookingId: booking._id,
      seats: booking.seats
    });

    const qrImage = await QRCode.toDataURL(qrData);
    const qrBuffer = Buffer.from(qrImage.split(",")[1], "base64");

    doc.image(qrBuffer, 85, 500, { width: 150 });

    doc.fillColor("#000000")
      .fontSize(8)
      .font("Helvetica-Bold")
      .text("SCAN AT ENTRY", 40, 655, {
        align: "center",
        width: 240
      });

    doc.fillColor("#52525b")
      .fontSize(7)
      .font("Helvetica")
      .text(`Booking ID: ${booking._id}`, 30, 690);

    doc.end();

  } catch (err) {
    console.error("PDF Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { lockSeats ,getBookingById , createPaymentOrder , verifyPayment , getBookedSeats , downloadTicket};
