const request = require('request');

const DARKSKY_KEY = '564c2aba86def9cb1eeba48a219a3359';

const forecast = (lat, long, callback) => {
    let url =  `https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${long}`;
    
    request({url, json: true}, (error, {body: forecast}) => {
        if(error){
            callback('Unable to connect to the Weather Service', undefined);
        } else if(forecast.code === 400){
            callback(forecast.error, undefined);
        } else {
            callback(undefined, {
                temperature: forecast.currently.temperature,
                rainProbability: forecast.currently.precipProbability
            });
        }
    })
}

module.exports = forecast;