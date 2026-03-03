const Screen = require("../models/screenModel");
const Theatre = require("../models/theatreModel");

const addScreen = async (req, res) => {
  try {
    const { theatre, name, seatLayout, seatTypes } = req.body;

    
    if (!theatre || !name) {
      return res.status(400).json({
        success: false,
        message: "Theatre and screen name are required",
      });
    }

    const theatreExists = await Theatre.findById(theatre);
    if (!theatreExists) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    const existingScreen = await Screen.findOne({
      theatre,
      name,
    });

    if (existingScreen) {
      return res.status(400).json({
        success: false,
        message: "Screen with this name already exists in this theatre",
      });
    }

    const newScreen = await Screen.create({
      theatre,
      name,
      seatLayout: seatLayout || undefined, // use defaults if not provided
      seatTypes: seatTypes || undefined,   // use defaults if not provided
    });

    return res.status(201).json({
      success: true,
      message: "Screen added successfully",
      data: newScreen,
    });

  } catch (error) {
    console.error("Add Screen Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while adding screen",
    });
  }
};

const getAllScreens = async (req, res) => {
  try {
    const screens = await Screen.find()
      .populate("theatre", "name city")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: screens.length,
      data: screens,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch screens",
    });
  }
};

const getScreensByTheatre = async (req, res) => {
  try {
    const { theatreID } = req.params;

    const theatreExists = await Theatre.findById(theatreID);

    if (!theatreExists) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    const screens = await Screen.find({ theatre: theatreID })
      .select("name seatLayout seatTypes createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: screens.length,
      data: screens,
    });

  } catch (error) {
    console.error("Get Screens Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching screens",
    });
  }
};

module.exports = {addScreen,getScreensByTheatre};