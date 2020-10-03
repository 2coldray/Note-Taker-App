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

//Get Routes

//Html home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

//notes html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//notes api
app.get("/api/notes", (req, res) => {
  res.json(db);
})




//Listen to Port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });