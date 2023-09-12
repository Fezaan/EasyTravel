const router = require("mongoose").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
//to register

router.post("/register", async (req, res) => {
  try {
    //generate password
    //create new user
    //save the data
  } catch (err) {
    res.status(500).json(err);
  }
});

// to login

module.exports = router;
