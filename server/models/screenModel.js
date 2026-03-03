const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  seatLayout: {
    rows: {
      type: Number,
      required: true,
      default: 6,
    },

    cols: {
      type: Number,
      required: true,
      default: 8,
    },

    aisleAfter: {
      type: [Number], // after which column to add space
      default: [2, 4],
    },
  },

  seatTypes: {
    type: [
      {
        name: {
          type: String, // VIP / Regular / Recliner
          required: true,
        },

        rows: {
          type: [Number], // which rows belong to this type
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        color: {
          type: String, // UI purpose only
        },
      },
    ],
    default: [
      {
        name: "VIP",
        rows: [0, 1],
        price: 250,
        color: "border-blue-500",
      },
      {
        name: "Regular",
        rows: [2, 3],
        price: 400,
        color: "border-yellow-600",
      },
      {
        name: "Recliner",
        rows: [4, 5],
        price: 600,
        color: "border-purple-500",
      },
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model("Screen", screenSchema);