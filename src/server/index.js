const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { Console } = require("console");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // Middleware
app.use(bodyParser.json());
app.use(express.static("dist")); // Initialize the main project folder

console.log(__dirname);

// THE Meaning Cloud API Base Url & API KEY
const BASE_URL = "https://api.meaningcloud.com/sentiment-2.1";
const API_KEY = process.env.MeaningCloud_API_KEY;
console.log(`MY API  Key is : ${process.env.MeaningCloud_API_KEY}`); // Check the API key
let User_URL = []; //article Url input form User

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve('src/client/views/index.html'))
});

// POST ROUTE
// Post func. has path of /api & with function
app.post("/api", async function (req, res) {
  User_URL = req.body.url; // form user as input
  const meaningCloudUrlAPI = `${BASE_URL}?key=${API_KEY}&url=${User_URL}&lang=en`;
  const response = await fetch(meaningCloudUrlAPI);
  try {
    const APIData = await response.json();
    res.send(APIData);
  } catch (error) {
    console.log(error);
  }
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
