
import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import fetch from "node-fetch";
import dotenv from 'dotenv'; // Import dotenv directly for configuration

dotenv.config(); // Configure environment variables
const __dirname = process.cwd(); // Optionally use `process.cwd()` as a fallback

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html")); // Use path.join for clarity (assuming path module is installed)
// });

app.get("/", (req, res) => {
  // No changes needed here, as the initial rendering doesn't require weather data
  let locDate = { temp: "Temp", disc: "Discription", location: "Location", humidity: "Humidity ", feel: "Feel ", speed: "Speed", imageUrl:"image" };
  res.render("index", { locDate: locDate,});
});


app.post("/", async (req, res) => {
  try {
    const location = await req.body.city;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Access API key from env
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    let data = await response.json();

    let locDate = {};

    const icon = data.weather[0].icon;
    locDate.imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; // Use correct variable name
    locDate.temp = Math.floor(data.main.temp);
    locDate.disc = data.weather[0].description;
    locDate.feel = data.main.feels_like;
    locDate.humidity = data.main.humidity;
    locDate.speed = data.wind.speed;
    locDate.location = location;


    console.log(locDate);
    res.render("index", { locDate: locDate,});


    //   res.write(`<h1>The current weather in ${location} is ${disc} </h1>`);
    //   res.write(`<h1>The current temprature ${temp} degree celcius</h1>`);
    //   res.write(`<img src = '${imageurl}'>`);
  } catch (err) {
    console.log(err);
    res.status(400).json({ data: 'not found!' })
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
