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
//=========================================================
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
//==============================================================
//Post Routes

//Make variable for id that will update
let id = 0;

app.post("/api/notes", (req, res) => {
  try {
    //Read in Note
    let note = fs.readFileSync("./db/db.json", "utf8");
    note = JSON.parse(note);
    //Use for loop to loop through body and assign id to note in db, adding by one
    for (let i = 0; i < db.length; i++) {
      id++;
    }
    req.body.id = id;
    note.push(req.body);
    //Write File to DB
    fs.writeFile("./db/db.json", JSON.stringify(note), "utf8",(err) => {
      if (err) throw err;
      console.log("Successfully wrote new note to db");
    });
    res.json(req.body);
  } catch (err) {
    throw err;
  }
})
//=======================================================================================
//Delete routes

app.delete("/api/notes/:id", (req, res) => {
  try {
    //Read in note
    let note = fs.readFileSync("./db/db.json", "utf8")
    note = JSON.parse(note);
    //need to filter note by id
    note = note.filter((note) => note.id != req.params.id);
    //Write new file to id
    fs.writeFile("./db/db.json", JSON.stringify(note), "utf8", (err) => {
      if (err) throw err;
      console.log("Successfully deleted note")
    })
    res.json(JSON.parse(note))
  } catch (err) {
    throw err;
  }
})



//Listen to Port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });