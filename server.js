const express = require("express");
const next = require("next");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, dir: "./client" });
const handle = app.getRequestHandler();

//routes declare
const authRouter = require("./routes/users");

//PORT
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  // Body parser middleware
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  // DB Config
  const db = require("./config/keys").mongoURI;

  // Connect to MongoDB
  mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

  //Routes
  authRouter(app, server);
  //dont touch!
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
