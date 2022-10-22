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
        fetchWeather(data[0].lat, data[0].lon);
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
    console.log(request);
    return request;
}

function fetchWeather(lat,lon)
{
    fetch(createWeatherAPIRequest(lat,lon))
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        //console.log(JSON.stringify(data, null, 4));
        // data.list.forEach(entry => {
        //     console.log(JSON.stringify(entry,null,4));
        // });
        console.log(JSON.stringify(data.list[0],null,4));
        console.log(data.list[0].dt_txt);
        console.log(data.list[1].dt_txt); //tomorrow
        console.log(data.list[9].dt_txt); //the day after tomorrow
        console.log(data.list[17].dt_txt); //three days from now
        console.log(data.list[25].dt_txt);//4 days from now
        console.log(data.list[33].dt_txt); //5 days from now
        //this is the 6th day in the future dont need this
        console.log(data.list[39].dt_txt);
        console.log("***************************");
        //this retrieves the noon time weather for 
        //the next five days
        for(let i = data.list.length -1-2; i >0; i-=8)
        {
            console.log(data.list[i].dt_txt);
        }

    })
}