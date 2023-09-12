const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//to register

router.post("/register", async (req, res) => {
  try {
    //generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save the data
    const user = await newUser.save();

    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// to login

router.post("/login", async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
