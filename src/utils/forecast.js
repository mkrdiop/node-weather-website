 
const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const forecastURL='http://api.weatherstack.com/current?access_key=b38673263338e73e3991ad28b97d88c4&query='+latitude +','+longitude
        
    request({ url: forecastURL, json: true }, (error, response) =>{

        if (error){
            callback('Unable to connected to the weather server', undefined)

        } else if(response.body.error){
            callback('Unable to find location',undefined)


        }else {
            callback(undefined, {
                summary:response.body.current.weather_descriptions[0],
                temperature:response.body.current.temperature,
                feelslike:response.body.current.feelslike,
                icon:response.body.current.weather_icons[0],
                location: response.body.location.name
            })
            //console.log(body.daily.data[0].summary+' It is currently ' + body.current.temperature +' degres . it feels lik '+ body.current.feelslike +' degree')


        }
        //const data=JSON.parse(response.body)

    } )



}

module.exports=forecast





