const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connectionDB = require("./database/db");

var cookieParser = require('cookie-parser')

app.use(cookieParser())
const port = process.env.PORT || 3000;
app.use(cors({
  origin:"http://localhost:3001",credentials:true
}));
//Controllers
const signup = require("./controllers/User/signup/signupController");
const login = require("./controllers/User/login/loginController");


//Routes
app.use("/user", signup);
app.use("/user", login);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running Fine on port ${port}`);
});
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send("get");
});