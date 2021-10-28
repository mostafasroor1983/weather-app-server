const request = require("request");

// async request
const forcast = ({ lat, long } = {}, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=69762e8518372cf8d2891fe8749824ed&query=${lat},${long}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service!.", undefined);
    } else {
      if (body.request) {
        const tempreture = body.current.temperature;
        const feelslike = body.current.feelslike;
        const weather_descriptions = body.current.weather_descriptions[0];
        callback(
          undefined,
          `${weather_descriptions}. This is currently ${tempreture} degrees out. It feels like ${feelslike} degrees out `
        );
      } else if (!body.success) {
        const info = body.error.info;
        const type = body.error.type;
        callback(`${type} : ${info}`, undefined);
      }
    }
  });
};

module.exports = forcast;
