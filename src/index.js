// Loads express and storage library
//use Node-persist for storage
const express = require("express");
const storage = require("node-persist");
var path = require("path");

var counter = 0;
var app = express();

app.get("/visit", (req, res) => {
  counter++;
  storage.setItem("counter", counter).then(() => {
    res.json(counter);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
storage
  .init()
  .then(() => storage.getItem("counter"))
  .then((value) => {
    if (value > 0) {
      counter = value;
    } else {
      counter = 0;
    }
    app.listen(8080, "0.0.0.0");
  });
