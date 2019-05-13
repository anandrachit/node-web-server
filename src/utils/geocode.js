const request = require('request');

const GEOCODING_KEY = 'pk.eyJ1IjoiYW5hbmQtcmFjaGl0IiwiYSI6ImNqdW4xMXl3NjBoZ3MzeWx0dXgyM2tpYmUifQ.gAS2EAm6svzKtN14ECUH0Q';

const geocode = (address, callback) => {
    let url  = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${GEOCODING_KEY}`;

    request({url, json: true}, (error, {body: geoLocation}) => {
        if(error){
            callback('Unable to connect to Geocoding Services', undefined);
        } else if(geoLocation.features.length === 0) {
            callback('Invalid location provided. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: geoLocation.features[0].center[1],
                longitude: geoLocation.features[0].center[0],
                location: geoLocation.features[0].place_name
            });
        }
    });
}

module.exports = geocode;