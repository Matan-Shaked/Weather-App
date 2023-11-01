const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=a3c5a74a73897e48578f96e714f38208&query=${encodeURIComponent(
    address
  )}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another serach", undefined);
    } else {
      const latitude = body.data[0].latitude;
      const longitude = body.data[0].longitude;
      const region = body.data[0].region;
      const country = body.data[0].country;
      const name = body.data[0].name;
      const placeName = `${name}, ${region}, ${country}`;
      callback(undefined, {
        latitude,
        longitude,
        location: placeName,
      });
    }
  });
};

module.exports = geocode;
