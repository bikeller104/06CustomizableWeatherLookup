var openWeatheraddr = `api.openweathermap.org`;
var getWeatherheader = `data/2.5/forecast`;
var getLocationheader = `geo/1.0/direct`;
var apiKey = `bbf5c2a1b02397d4714e65580bf8fc45`;
var units = `metric`;


var testCity = "Salt Lake City";

console.log("script works");
createGEOAPIRequest(testCity)
requestWeather(testCity);

//this function takes a city name and returns the 5 day forecast for that city
function requestWeather(cityName)
{
    fetch(createGEOAPIRequest(cityName))
    .then(function (response){
        return response.json();
    }).then(function (data){
        console.log(data);
        console.log(data[0].lat);
        console.log(data[0].lon);
    })
}
/*
    take the city name and create a geo api call to return the
    longitude and latitude of the city. this funciton returns
    the request link string
*/
function createGEOAPIRequest(cityName, limit = 1)
{
    let request = `https://${openWeatheraddr}/${getLocationheader}?q=${cityName}&limit=${limit}&appid=${apiKey}`
    console.log(request);
    return request;
}
function createWeatherAPIRequest(lattitued, longitude)
{
    let request = `https://${openWeatheraddr}/${getWeatherheader}?lat=${lattitued}&lon=${longitude}&appid=${apiKey}&units=${units}`
}