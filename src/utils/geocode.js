const request = require('request');

const geocode = function (address, callback) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + 
            encodeURIComponent(address) + 
            ".json?access_token=pk.eyJ1IjoibWFyaW9ibSIsImEiOiJja2M2dDltcDUwN2Z4MnlvZnlxeXY3ZGUxIn0.ln7UPVy5D_YDU5nBLa58TA&limit=1";
    request({url, json: true}, (error, {body: data}) => {
        if (error) {
            callback('Unable to connect to geocoding service.', undefined);
        } else if (data.features.length === 0) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            });
            // console.log('hello');
            // console.log(response.body);
            // const data = response.body.features[0].center;
            // console.log(data[0] + "   " + data[1]);
        }
    });
};

module.exports = geocode;
