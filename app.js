//Require modules and models

var express = require("express");
var models = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

//Set view engine

app.set("view engine", "ejs");

//Middleware

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect(301, "/chirps");
});

//Get all chirps
app.get("/chirps", function(req, res) {
  models
  .Chirp
  .findAll()
  .then(function(chirpsData) {
    res.render("index", {
      chirps: chirpsData
    });
  });
});

//Create new chirp
app.post("/chirps", function(req, res) {
  // Step 1: Gather data from form
  // Step 2: Insert row into DB
  // Step 3: Redirect back to show all chirps
  models
  .Chirp
  .create(req.body)
  .then(function() {
    res.redirect("/chirps");
  });
});

//Get specific chirp
app.get("/chirps/:id/edit", function(req, res) {
  // Step 1: Retrieve specific chirp from DB via its ID
  // Step 2: Render the edit template with the chirp data inside
  models
  .Chirp
  .findById(req.params.id)
  .then(function(chirpData) {
    res.render("edit", {
      chirp: chirpData
    });
  });
});

//Edit a chirp
app.put("/chirps/:id", function(req, res) {
  // Step 1: Find specific chirp in DB via its ID
  // Step 2: Perform update based on data from the form
  // Step 3: Redirect back to show all chirps
  models
  .Chirp
  .findById(req.params.id)
  .then(function(chirpData) {
    chirpData
    .updateAttributes(req.body)
    .then(function() {
      res.redirect("/chirps");
    });
  });
});

//Delete a chirp
app.delete("/chirps/:id", function(req, res) {
  // Hint: .destroy() is the function you call to remove a record from the DB
  // Step 1: Find chirp in DB via its ID
  // Step 2: Delete it from the DB
  // Step 3: Redirect back to show all chirps
  models
  .Chirp
  .findById(req.params.id)
  .then(function(chirpData) {
    chirpData
    .destroy()
    .then(function() {
      res.redirect("/chirps");
    });
  });
});

app.listen(process.env.PORT || 3000);
