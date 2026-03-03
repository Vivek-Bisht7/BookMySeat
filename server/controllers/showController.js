const Show = require('../models/showModel');
const Theatre = require("../models/theatreModel");

const addShow = async (req,res)=>{
    try {
    const { movie, theatre, screen, date, time, price } = req.body;

    const existingShow = await Show.findOne({
      screen,
      date,
      time,
    });

    if (existingShow) {
      return res.status(400).json({
        success: false,
        message: "Show already exists for this screen at this time",
      });
    }

    const show = await Show.create({
      movie,
      theatre,
      screen,
      date,
      time,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Show created successfully",
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating show",
      error: error.message,
    });
  }
}

const getShowsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { city } = req.query;

    const shows = await Show.find({ movie: movieId })
      .populate({
        path: "theatre",
        select: "name city",
        match: city
          ? { city: { $regex: `^${city}$`, $options: "i" } }
          : {}
      })
      .sort({ date: 1 });

    const validShows = shows.filter(show => show.theatre);

    if (!validShows.length) {
      return res.status(404).json({ message: "No shows found" });
    }

    const dates = [...new Set(validShows.map(show => show.date))];

    const theatreMap = {};

    validShows.forEach(show => {
      const theatreId = show.theatre._id.toString();

      if (!theatreMap[theatreId]) {
        theatreMap[theatreId] = {
          _id: theatreId,
          name: show.theatre.name,
          showtimes: []
        };
      }

      theatreMap[theatreId].showtimes.push({
        _id: show._id,
        date: show.date,
        time: show.time
      });
    });

    res.status(200).json({
      dates,
      theatres: Object.values(theatreMap)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getShowById = async (req, res) => {
  try {
    const showId = req.params.id;

    const show = await Show.findById(showId)
      .populate({
        path: "movie",
        select: "title poster rating language genre description trailerCode",
      })
      .populate({
        path: "screen",
        select: "name seatLayout seatTypes",
        populate: {
          path: "theatre",
          select: "name city address type facilities",
        },
      });


    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json(show);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports= {addShow , getShowsByMovie , getShowById
};