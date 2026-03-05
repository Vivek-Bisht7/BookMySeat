const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },

    show: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Show", 
        required: true 
    },

    seats: [{ 
        type: String, 
        required: true 
    }], 

    totalAmount: { 
        type: Number, 
        required: true 
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },

    paymentId: { 
        type: String 
    },

    expiresAt: {
      type: Date,
      required: true,
    },

  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
