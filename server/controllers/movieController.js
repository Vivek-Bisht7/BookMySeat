const Movie = require("../models/movieModel");
const cloudinary = require("../config/cloudinary");

const addMovie = async (req, res) => {
  try {
    const { title, rating, language, genre, description, trailerCode } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Poster is required" });
    }

    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "movies" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });

    const newMovie = await Movie.create({
      title,
      rating,
      language,
      genre: JSON.parse(genre),
      description,
      trailerCode,
      poster: uploadedImage.secure_url,
    });

    res.status(201).json({
      success: true,
      movie: newMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllMovie = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: movies.length,
      movies,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    
    res.status(200).json({
      success: true,
      movie,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { addMovie, getAllMovie , getMovie};
