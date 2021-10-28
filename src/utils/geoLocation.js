const request = require("request");

const geoLocation = (location, callback) => {
  location = encodeURIComponent(location);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=1&access_token=sk.eyJ1Ijoic3Jvb3JvcmE5OTQiLCJhIjoiY2t2OG56cWQ4MG56ejJvbWdheTUyanZ4ZyJ9.EaMa17tFB_WExHp03GPAGA`;
  request({ url, json: true }, (error, { body }) => {
    const defaultCoordinates =  undefined;//{lat:0, long:0}
    if (error) {
      callback("Unable to connect to MapBox Service!.", defaultCoordinates);
    } else {
      if (body.message) {
        callback(body.message, defaultCoordinates);
      } else if (body.features.length > 0) {
        const long = body.features[0].center[0];
        const lat = body.features[0].center[1];
        const coordinates = { lat, long };
        callback(undefined, coordinates);
      } else {
        callback("No records found for your query...", defaultCoordinates);
      }
    }
  });
};

module.exports = geoLocation;
