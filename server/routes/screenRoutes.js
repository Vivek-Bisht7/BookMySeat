const express = require('express');
const router = express.Router();

const {addScreen,getScreensByTheatre} = require("../controllers/screenController");

router.post("/addScreen",addScreen);
router.get("/getScreensByTheatre/:theatreID",getScreensByTheatre);

module.exports = router;