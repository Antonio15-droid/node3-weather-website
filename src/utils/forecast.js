const request = require('request');
const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=5636392d38491baced61736d4c5f4a68&query=' +
    latitude +
    ' , ' +
    longitude +
    '&units=f';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. ' +
          `It is currently ` +
          body.current.temperature +
          ' degrees out. It feels like there is a ' +
          body.current.feelslike +
          '% chance of rain.'
      );
    }
  });
};
module.exports = forecast;
