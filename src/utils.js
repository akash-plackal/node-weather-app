const request = require("request");

// =================== geo Data ==================

const geoData = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmF2aWt1bWFyOTk5MCIsImEiOiJjbDM1amVya2swNXZmM2tudTY3ampsdHNpIn0.Gjxb6_iCjtvvm7F1779ueQ&limit=1`;

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("weather service unaviaiable", undefined);
    } else if (res.body.features === 0) {
      callback("incorrect weather location", undefined);
    } else {
      const geoLocation = res.body;
      const lat = geoLocation.features[0].center[1];
      const long = geoLocation.features[0].center[0];
      const place = geoLocation.features[0].place_name;

      callback(undefined, { place, lat, long });
    }
  });
};

// ================== forecast =============

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=23b84d7c0cdb0c3a8f0178b2255818cd&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("weather report not reachable", undefined);
    } else {
      callback(undefined, res.body);
    }
  });
};

module.exports = { geoData, forecast };
