const Theatre = require("../models/theatreModel");

const addTheatre = async (req, res) => {
  try {
    const { name, city, address, type, facilities } = req.body;

    if (!name || !city || !address || !type) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const theatre = await Theatre.create({
      name,
      city,
      address,
      type,
      facilities,
    });

    res.status(201).json({
      success: true,
      message: "Theatre added successfully",
      theatre,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().sort({ createdAt: -1 });

    res.status(200).json(theatres);
  } catch (error) {
    console.error("Error fetching theatres:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch theatres",
    });
  }
};

module.exports = { addTheatre ,getAllTheatres};