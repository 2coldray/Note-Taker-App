//Install Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
let db = require("./db/db.json");

//Create Express server
const app = express();

//Set Port
const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Html Get Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//Api Routes


//Listen to Port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });