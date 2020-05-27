require("dotenv").config();
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../../webpack.dev");
const cors = require('cors');

const compiler = webpack(config);

const isDevEnvironment = process.env.NODE_ENV == "development";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Express server listening on port 3000!");
});

if (isDevEnvironment) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
}

if (!isDevEnvironment){
    app.use(express.static("dist"));
}

const geonamesAPIKey = "vildar8";
const weatherbitAPIKey = "e9490ed04f434ba89b45c5e326582cc6"

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.post("/travelPlan", (req, res) => {
  const geoURL = `http://api.geonames.org/postalCodeSearchJSON?maxRows=1&username=${geonamesAPIKey}&`
});