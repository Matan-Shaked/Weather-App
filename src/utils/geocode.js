const request = require("postman-request");

const geocode = (address, callback) => {
  const urlGeocode = `http://api.positionstack.com/v1/forward?access_key=a3c5a74a73897e48578f96e714f38208&query=${encodeURIComponent(
    address
  )}&limit=1`;

  request({ url: urlGeocode, json: true }, (error, response) => {
    if (error) {
      return callback(`Unable to connect to location service.`, undefined);
    }

    if (response.body.error) {
      return callback(`Unable to find location.`, undefined);
    }

    callback(undefined, {
      latitude: response.body.data[0].latitude,
      longitude: response.body.data[0].longitude,
      label: response.body.data[0].label,
    });
  });
};

module.exports = geocode;
