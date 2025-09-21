const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");
const authRoutes = require("./routes/auth");
const irregularRoutes = require("./routes/irregular");
const vocabularyRoutes = require("./routes/vocabulary");
const separableRoutes = require("./routes/separable");
const stativeRoutes = require("./routes/stative");
const gerundRoutes = require("./routes/gerund");
const infinitiveRoutes = require("./routes/infinitive");
const phrasesRoutes = require("./routes/phrases");
const keys = require("./config/keys");
const app = express();

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected."))
  .catch((error) => console.log(error));

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/irregular", irregularRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/separable", separableRoutes);
app.use("/api/gerund", gerundRoutes);
app.use("/api/infinitive", infinitiveRoutes);
app.use("/api/phrases", phrasesRoutes);
app.use("/api/stative", stativeRoutes);

/*if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/dist/private-dictionary"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(
        "../",
        "client",
        "dist",
        "private-dictionary",
        "browser",
        "index.html",
      ),
    );
  });
}*/

module.exports = app;
