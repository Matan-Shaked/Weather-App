const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const urlWeather = `http://api.weatherstack.com/current?access_key=36b22dea6b16a9ae2d918621f7e29fad&query=${latitude},${longitude}&units=m`;

  request({ url: urlWeather, json: true }, (error, response) => {
    if (error) {
      return callback(`Unable to connect to weather service.`, undefined);
    }

    if (response.body.error) {
      return console.log(`Unable to find location.`);
    }

    callback(undefined, {
      city: response.body.location.name,
      country: response.body.location.country,
      region: response.body.location.region,
      degrees: response.body.current.temperature,
      wind: response.body.current.wind_speed,
      windDirection: response.body.current.wind_dir,
      weatherImage: response.body.current.weather_icons[0],
      description: response.body.current.weather_descriptions[0],
      humidity: response.body.current.humidity,
      feelsLike: response.body.current.feelslike,
      UVIndex: response.body.current.uv_index,
      precipitation: response.body.current.precip,
    });
  });
};

module.exports = forecast;
