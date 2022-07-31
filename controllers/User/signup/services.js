const User = require("./signupSchema");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

var createUser = async (req) => {
  return await User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        console.log("Email Already Exists");
        return "Email Exists";
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return err;
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log("User Created");
                return result;
              })
              .catch((err) => {
                console.log(err)
                return err;
              });
          }
        });
      }
    });
};
module.exports = createUser;
