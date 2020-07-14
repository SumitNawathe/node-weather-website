const request = require('request');

const forecast = function (latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=f967a735697355b71aa848d23ff1321e&query=' + 
            latitude + ',' + longitude + '&units=f';
    request({url, json: true}, (error, {body:data}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (data.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, 'The weather is ' + data.current.weather_descriptions[0] + 
                    '. It is currently ' + data.current.temperature + 
                    'F. It feels like ' + data.current.feelslike + 'F');
        }
    })
};

module.exports = forecast;
