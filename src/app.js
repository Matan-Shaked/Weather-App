const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const viewDirectory = path.join(__dirname, "../templates/views");
console.log(path.join(__dirname, "../templates/views"));

const partialDirectory = path.join(__dirname, "../templates/partials");
console.log(path.join(__dirname, "../templates/partials"));

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
app.set("views", viewDirectory);
hbs.registerPartials(partialDirectory);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Matan Shaked",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Matan Shaked",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText:
      "For any questions about the GoOutWeather app, you are welcome to contact with me via email shkedo24@gmail.com.",
    name: "Matan Shaked",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: `You must provide a valid address` });
  }

  geocode(req.query.address, (error, geocodeData = {}) => {
    if (error) {
      return res.send({ error: error });
    }

    forecast(
      geocodeData.latitude,
      geocodeData.longitude,
      (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }

        const {
          city,
          country,
          region,
          degrees,
          wind,
          windDirection,
          weatherImage,
          description,
          humidity,
          feelsLike,
          UVIndex,
        } = forecastData;
        const { latitude, longitude, label } = geocodeData;

        res.send({
          city,
          country,
          region,
          degrees,
          wind,
          windDirection,
          weatherImage,
          description,
          humidity,
          feelsLike,
          UVIndex,
          latitude,
          longitude,
          label,
          address: req.query.address,
        });
        // res.send({
        //   city: forecastData.city,
        //   country: forecastData.country,
        //   region: forecastData.region,
        //   degrees: forecastData.degrees,
        //   wind: forecastData.wind,
        //   windDirection: forecastData.windDirection,
        //   weatherImage: forecastData.weatherImage,
        //   description: forecastData.description,
        //   humidity: forecastData.humidity,
        //   feelsLike: forecastData.feelsLike,
        //   UVIndex: forecastData.UVIndex,
        //   latitude: geocodeData.latitude,
        //   longitude: geocodeData.longitude,
        //   label: geocodeData.label,
        //   address: req.query.address,
        // });
      }
    );
  });
});

app.get("/help/*", (req, res) => {
  res.render("Help article not found");
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorText: "Page not found.",
    name: "Matan Shaked",
  });
});

//
app.listen(port, () => {
  console.log(`server is up on ${port}!`);
});
