const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3JhbnRtNDQiLCJhIjoiY2p5eWplc3RsMThmdDNsb2Jra2RyeTZzayJ9.mIYMnIvZlfvjIinTR4n3tw'
    request({url: url, json: true}, (err, {body}) => {
       if(err){
            callback('Unable to connect to location services!', undefined)
       }else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
       }else{
            data = {
                location: body.features[0].place_name,
                long: body.features[0].center[1],
                lat: body.features[0].center[0]
            }
            callback(undefined, data)
       }
    })
}

module.exports = geocode






