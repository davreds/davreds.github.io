const credentials = require('./credentials.js')
const request = require('request')

//Monterrey Latitud: 25.6714, Longitud: -100.309

function getWeather(latitude, longitde){
    const darkskyUrl = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitude + ',' + longitde + '/?lang=es'
    request.get(darkskyUrl, function(error, response){
        if(error){
            console.log(error);
        } else {
            let jsonReq = JSON.parse(response.body);
            let summary = jsonReq.hourly.summary;
            let temperature = Math.round(transform(jsonReq.currently.temperature))
            let probability = Math.round(jsonReq.currently.precipProbability*100)
            console.log(summary + " Actualmente estamos a " + temperature + "°C. Hay " + probability + "% probabilidad de lluvia.")
        }
    })
}

function getLocation(city){
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=' + credentials.MAPBOX_TOKEN
    request.get(mapboxUrl, function(error, response){
        if(error){
            console.log(error);
        } else{
            let jsonReq = JSON.parse(response.body)
            let latitude = jsonReq.features[0].center[1]
            let longitude = jsonReq.features[0].center[0]

            getWeather(latitude, longitude)
        }
    })
}

function transform(deg){
    return (deg - 32) * 5 / 9
}

getLocation('Monterrey')
