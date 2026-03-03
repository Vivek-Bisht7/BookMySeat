const express = require('express');
const router = express.Router();

const {addShow , getShowsByMovie , getShowById} = require('../controllers/showController');

router.post("/addShow",addShow);
router.get("/:movieId", getShowsByMovie);
router.get("/getShow/:id",getShowById)

module.exports = router;