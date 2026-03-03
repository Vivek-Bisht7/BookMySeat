const express = require('express');
const router = express.Router();

const upload = require("../middleware/multer");

const {addBanners , deleteAllBanners , getAllBanners} = require("../controllers/bannerController");

router.post("/addBanners",upload.fields([
    { name: "banner1", maxCount: 1 },
    { name: "banner2", maxCount: 1 },
    { name: "banner3", maxCount: 1 },
    { name: "banner4", maxCount: 1 },
    { name: "banner5", maxCount: 1 },
  ]), addBanners);
router.delete("/deleteAllBanners", deleteAllBanners);
router.get("/getBanners",getAllBanners)

module.exports = router;