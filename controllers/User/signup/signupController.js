const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const {verifyToken}  = require("../login/verifyToken")

const User = require("./signupSchema");
const createUser = require("./services");

router.use(bodyParser.json());


///////////////////////////   SIGNUP  ////////////////////////////
/*  http://localhost:3000/user/signup    
{
  "email": "testing@gmail.com",
  "password":"testing"
}
*/
router.route("/signup").post( (req, res) => {
  //res.send(createUser(req))
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email Already Exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User Created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    }).catch(err => {
      console.log("testing")
    });
});

module.exports = router;
