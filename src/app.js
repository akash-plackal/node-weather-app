const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geoData, forecast } = require("./utils");
const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Akash",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Akash",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Akash",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "please provide an address",
    });
  } else {
    geoData(req.query.address, (err, { lat, long } = {}) => {
      if (err) {
        return res.send(err);
      } else {
        forecast(lat, long, (forecastErr, forecastData) => {
          if (forecastErr) {
            return res.send(forecastErr);
          }
          //   console.log(
          //     chalk.yellow.inverse(
          //       `${forecastData.current.weather_descriptions[0]} in ${forecastData.location.name}, ${forecastData.location.region} , ${forecastData.location.country}. It is currently ${forecastData.current.temperature} *C`
          //     )
          //   );

          res.send({
            description: `${forecastData.current.weather_descriptions[0]} ${forecastData.current.temperature} *C `,
            location: `${forecastData.location.name},${forecastData.location.region},${forecastData.location.country}`,
          });
        });
      }
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "you must provide a search term",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Akash",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Akash",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
