const credentials = require('./credentials.js')
const request = require('request')

//Monterrey Latitud: 25.6714, Longitud: -100.309

function getWeather(latitude, longitde, callback){
    const darkskyUrl = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitude + ',' + longitde + '/?lang=es'
    request.get(darkskyUrl, function(error, response){
        if(error){
            callback("Error, servicio no disponible.", undefined);
        } else {
            let body = response.body
            if(body == "Forbidden\n"){
                callback("Error, las credenciales para acceder no son correctas.", undefined)
            } else{
                let jsonReq = JSON.parse(body);
                if(jsonReq["code"] == 400){
                    callback("Error, coordenadas no válidas.", undefined)
                }
                 else {
                    let summary = jsonReq.hourly.summary;
                    let temperature = Math.round(transform(jsonReq.currently.temperature))
                    let probability = Math.round(jsonReq.currently.precipProbability*100)
                    res = {sum: summary, temp: temperature, prob: probability}
                    callback(undefined, res)
                }
            }
        }
    })
}

function getLocation(city, callback){
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=' + credentials.MAPBOX_TOKEN
    request.get(mapboxUrl, function(error, response){
        if(error){
            callback("Error, servicio no disponible.", undefined)
        } else{
            let jsonReq = JSON.parse(response.body)
            if(jsonReq.message == "Not Authorized - Invalid Token"){
                callback("Error, las credenciales para acceder no son correctas.", undefined)
            } else if(jsonReq.features.length == 0){
                callback("Error, no se encontró la ubicación.", undefined)
            } else {
                let latitude = jsonReq.features[0].center[1]
                let longitude = jsonReq.features[0].center[0]
                res =  {lat: latitude, long: longitude}
                callback(undefined, res)
            }
        }
    })
}

function transform(deg){
    return (deg - 32) * 5 / 9
}

getLocation('Monterrey', function(error, response){
    if(error){
        console.log(error);
    } else {
        let latitude = response.lat
        let longitude = response.long
        getWeather(latitude, longitude, function(error, response){
            if(error){
                console.log(error);
            } else {
                console.log(response.sum + " Actualmente estamos a " + response.temp + "°C. Hay " + response.prob + "% probabilidad de lluvia.")
            }
        })
    }
})
