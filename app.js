const express = require("express");
const app = express();
const db = require("./queries");

app.use(express.json());

//Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    info: "Node.js, Express, and Postgres API ",
  });
});

//ROUTES

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUser);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

module.exports = app;
