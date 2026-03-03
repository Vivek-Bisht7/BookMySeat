const express = require('express');
const router = express.Router();

const upload = require("../middleware/multer");

const {addMovie, getAllMovie , getMovie} = require("../controllers/movieController");

router.post("/addMovie",upload.single("poster"),addMovie);
router.get("/getAllMovie",getAllMovie);
router.get("/getMovie/:id",getMovie);

module.exports = router;