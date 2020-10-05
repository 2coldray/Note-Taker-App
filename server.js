//Install Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

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
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//notes html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Make variable for id that will update
const DB_PATH = "./db/db.json";
const getDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
const saveDB = (obj) => fs.writeFileSync(DB_PATH, JSON.stringify(obj));

//notes api
app.get("/api/notes", (req, res) => {
  //Read in Note
  let db = getDB();
  res.json(db);
});

//==============================================================
//Post Routes

app.post("/api/notes", (req, res) => {
  try {
    //Read in Note
    let db = getDB();

    //Set new ID
    let id;
    if(db.length){
      id = db[db.length - 1].id + 1;
    } else {
      id = 1;
    }

    req.body.id = id;

    //Add to data collection
    db.push(req.body);

    //Write File to DB
    saveDB(db);

    res.json(req.body);
  } catch (err) {
    console.log(err);
  }
});
//=======================================================================================
//Delete routes

app.delete("/api/notes/:id", (req, res) => {
  try {
    //Read in note
    let db = getDB();
    
    //need to filter note by id
    db = db.filter((note) => note.id != req.params.id);
    
    //Write new file to id
    saveDB(db);
    res.json(req.body);
  } catch (err) {
    throw err;
  }
});

//Listen to Port
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
