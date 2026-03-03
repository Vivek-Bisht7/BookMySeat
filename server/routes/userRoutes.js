const express = require('express');
const router = express.Router();

const {searchUser} = require('../controllers/userController');

router.get("/getUser/:userEmail",searchUser);

module.exports = router;
