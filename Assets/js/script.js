var openWeatheraddr = `api.openweathermap.org`;
var getWeatherheader = `data/2.5/forecast`;
var getLocationheader = `geo/1.0/direct`;
var apiKey = `bbf5c2a1b02397d4714e65580bf8fc45`;
var useMetric = false
var units = useMetric ?  `metric` : `imperial`;
var tempSym = useMetric ? `C` : `F`;
var speedSym = useMetric ? `KPH` : `MPH`;

var testCity = "Salt Lake City";

var inputBox = $('#cityInput');
var searchButton = $('#searchBtn');
console.log(inputBox);
console.log(searchButton);

console.log("script works");

searchButton.click(function(e){
    console.log("event fired");
    console.log(inputBox.val());
    testCity = inputBox.val();
    createGEOAPIRequest(testCity)
    requestWeather(testCity);

})

//this function takes a city name and returns the 5 day forecast for that city
function requestWeather(cityName)
{
    fetch(createGEOAPIRequest(cityName))
    .then(function (response){
        return response.json();
    }).then(function (data){
        //console.log(data);
        //console.log(data[0].lat);
        //console.log(data[0].lon);
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
    //console.log(request);
    return request;
}
function createWeatherAPIRequest(lattitued, longitude)
{
    let request = `https://${openWeatheraddr}/${getWeatherheader}?lat=${lattitued}&lon=${longitude}&appid=${apiKey}&units=${units}`
    //console.log(request);
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
        // console.log(JSON.stringify(data.list[0],null,4));
        // console.log(data.list[0].dt_txt);
        // console.log(data.list[1].dt_txt); //tomorrow
        // console.log(data.list[9].dt_txt); //the day after tomorrow
        // console.log(data.list[17].dt_txt); //three days from now
        // console.log(data.list[25].dt_txt);//4 days from now
        // console.log(data.list[33].dt_txt); //5 days from now
        // //this is the 6th day in the future dont need this
        // console.log(data.list[39].dt_txt);
        // console.log("***************************");
        //this retrieves the noon time weather for 
        //the next five days
        $(".weather_data").remove();
        let $weatherData = $('<div>');
        $weatherData.addClass('weather_data');

        console.log($weatherData);
        //for(let i = data.list.length -1-2; i >0; i-=8)
        for(let i =0 ; i <data.list.length -1-2; i+=8)
        {
            console.log(data.list[i].dt_txt);
            
            $weatherData.append(designHTMLfordata(data.list[i]));
        }
        $('main').append($weatherData);
        

    })
}


///this function takes an entry from the weather
///api list and creates the html elements it will go into
function designHTMLfordata(dataEntry)
{

    console.log(JSON.stringify(dataEntry, null, 2));
    let $card = $(`<div>`);
    $card.addClass('weather_card');
    
    
    //date
    let $dateHeader = $(`<h4>`);
    let date = dataEntry.dt_txt;
    date = date.split(" ")[0];
    date = date.split('-');
    date = `${date[1]}/${date[2]}/${date[0]}`;
    $dateHeader.text(date);

    //weather icon
    //https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
    //console.log(JSON.stringify(dataEntry.weather[0].icon, null, 2));
    let imglink = `http://openweathermap.org/img/wn/${dataEntry.weather[0].icon}@2x.jpg`;
   // console.log(imglink);
    let $icon = $('<img>');
    $icon.attr("scr", imglink);

    
    //temperature
    let temp = dataEntry.main.temp;
   // console.log(temp);
    let $temp = $( `<p>`);
    $temp.text(`Temp: ${temp}\u00B0${tempSym}`);
    
    //wind
    let wind = dataEntry.wind.speed;
    //console.log(wind);
    let $wind = $(`<p>`);
    $wind.text(`Wind: ${wind} ${speedSym}`);

    //humidity
    let humid = dataEntry.main.humidity;
    //console.log(humid);
    let $humid = $(`<p>`);
    $humid.text(`Humidity: ${humid}%`);
    
    $card.append($dateHeader);
    $card.append($icon);
    $card.append($temp);
    $card.append($wind);
    $card.append($humid);
    
    return $card;
}