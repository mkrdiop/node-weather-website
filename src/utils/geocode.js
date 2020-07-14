const request = require ('request')

const geocode = (address, callback) =>{
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFya2V0cGxhY2VsaXN0IiwiYSI6ImNrYnlxdG5qZTEwNXQycW1zczloamhqZ3IifQ.9J3K9RlUxQI-wr1ipnZJHw'
    request ({url: geocodeURL, json:true}, (error, response)=>{
        if (error){
            callback('Unable to connect to location services!')
        } else if (response.body.features.length === 0){
            callback('Unable to find location try another search!', undefined)


        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name

            })


        }


    })
    

}

module.exports = geocode