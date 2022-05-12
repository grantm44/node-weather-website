const request = require("request");

const forecast = (long, lat, callback) => {
  const url =
    "https://api.darksky.net/forecast/b880ec89a459b4c0aebfabfe76028434/" +
    lat +
    "," +
    long;

  request({ url: url, json: true }, (error, { body }) => {
    console.log(body.daily.data);
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. The high today is " +
          body.daily.data[0].temperatureHigh +
          " with a low of " +
          body.daily.data[0].temperatureLow +
          ". There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
