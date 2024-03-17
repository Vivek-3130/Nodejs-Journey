const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

// HTML RENDERING
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files (like CSS)

// ROUTES
let newItems = [];

app.get("/", (req, res) => {
    let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options)
    res.render("index", { day: day, newListItems: newItems })
});

app.post("/", (req, res) => {
    let newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    newItems.splice(checkedItemId, 1);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
