const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=36b22dea6b16a9ae2d918621f7e29fad&query=${encodeURIComponent(
    latitude,
    longitude
  )}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another serach", undefined);
    } else {
      const temparture = body.current.temperature;
      const description = body.current.weather_descriptions[0];
      const feelslike = body.current.feelslike;
      const windSpeed = body.current.wind_speed;
      const humidity = body.current.humidity;

      callback(
        undefined,
        `Right now it is ${description}. The wind speed is ${windSpeed} miles per second. The humidity is ${humidity}%. It is currently ${temparture} degrees outside. It feels like ${feelslike} degrees outside.`
      );
    }
  });
};

module.exports = forecast;
