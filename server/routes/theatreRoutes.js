const express = require('express');
const router = express.Router();

const {addTheatre , getAllTheatres} = require("../controllers/theatreController");

router.post("/addTheatre",addTheatre);
router.get("/getAllTheatres",getAllTheatres);

module.exports = router;