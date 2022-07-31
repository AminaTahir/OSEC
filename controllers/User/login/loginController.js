const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../signup/signupSchema");
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser')
router.use(bodyParser.json());
router.use(cookieParser())

///////////////////////////   LOGIN    ////////////////////////////
/*  http://localhost:3000/user/login    
{
  "email": "testing@gmail.com",
  "password":"testing"
}
*/
router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(409).json({
          message: "Auth Failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(409).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY || "Secret",
            {
              expiresIn: "1h",



            }
          );

          res.cookie("access_token", token, {

            httpOnly: true,

            maxAge: 2.592e+9,

            });
          return res.status(200).json({
            message: "Auth Successful",
            token: token,
          });
        }
        res.status(409).json({
          message: "Auth Failed",
        });
      });
    })
    .catch();
});

module.exports = router;
