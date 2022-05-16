const mongoose = require("mongoose");
const express = require("express");
const routes = require("./src/routes/routes");
const config = require("./src/config/configuration");
const port = config.host.port || 9000;
const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// // Google Auth
// require("./src/helpers/passport");
// const passport = require("passport");
// const cookieSession = require("cookie-session");

try {
  //To recognize the incoming Request Object as a JSON Object
  // app.use(bodyParser.json());
  // app.use(cors());
  app.use(express.json());

  // To recognize the incoming Request Object as strings or arrays.
  app.use(express.urlencoded({ extended: true }));
  // app.use(bodyParser.urlencoded({ extended: true }));

  // const islogin = (res, req, next) => {
  //   if (req.user) {
  //     next();
  //   } else {
  //     res.sendStatus(401);
  //   }
  // };

  // // Passport
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.get("/failed", (req, res) => {
  //   res.send("Failed to login");
  // });
  // app.get("/good", (req, res) => {
  //   res.send(`Good to Go ${req.user}`);
  // });
  // app.use(
  //   cookieSession({
  //     name: "mock",
  //     keys: ["key1", "key2"],
  //   })
  // );

  // app.get(
  //   "/google",
  //   passport.authenticate("google", { scope: ["profile", "email"] })
  // );

  // app.get(
  //   "/google/callback",
  //   passport.authenticate("google", { failureRedirect: "/failed" }),
  //   function (req, res) {
  //     // Successful authentication, redirect home.
  //     res.redirect("/good");
  //   }
  // );

  // Create the database connection
  mongoose.connect(config.mongo.connectionString);

  // Connection events
  mongoose.connection.on("connected", () => {
    console.log(`Connected Succesfully`);
  });
  mongoose.connection.on("error", (err) => {
    console.log(`Mongoose default connection error: ${err}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected");
  });

  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "*");
    req.header("Content-Type", "application/json");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });

  app.use("/api", routes);

  app.listen(port);
} catch (error) {
  console.log(error.message, "Connection Error");
}
