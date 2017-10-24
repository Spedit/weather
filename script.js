/**
 * Created by Krzysiek on 01.10.2017.
 */
var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$( document ).ready(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = "lat=" + position.coords.latitude;
            var lon = "lon=" + position.coords.longitude;
            getWeather(lat, lon);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");

    }

    $("#tempunit").click(function () {
        var currentTempUnit = $("#tempunit").text();
        var newTempUnit = currentTempUnit == "C" ? "F" : "C";
        $("#tempunit").text(newTempUnit);
        if (newTempUnit == "F") {
            var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
            $("#temp").text(fahTemp + " " + String.fromCharCode(176));
        } else {
            $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
        }
    });

})

function getWeather(lat, lon) {
    var urlString = api + lat + "&" + lon;
    $.ajax({
        url: urlString, success: function (result) {
            $("#city").text(result.name + ", ");
            $("#country").text(result.sys.country);
            currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
            $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
            $("#tempunit").text(tempUnit);
            $("#desc").text(result.weather[0].main);
            /*var stat_icon = "<img src = '" + result.weather[0].icon + "' " + "alt='" + result.weather[0].main + "'>";
            $("#icon").html(stat_icon);*/
            IconGen(result.weather[0].main);

        }
    });
}
/*

 przykładowe dane z serwera

{
    "coord":
    {
        "lon":159, "lat":35
    },
    "weather":[{
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399"
    }],
    "base":"stations",

    "main":{
    "temp":22.59,
    "pressure":1027.45,
    "humidity":100,
    "temp_min":22.59,
    "temp_max":22.59,
    "sea_level":1027.47,
    "grnd_level":1027.45
    },
    "wind":{
        "speed":8.12,
        "deg":246.503
    },
    "rain":{
        "3h":0.45
    },
    "clouds":{
        "all":92
    },
    "dt":1499521932,
    "sys":{
        "message":0.0034,
        "sunrise":1499451436,
        "sunset":1499503246
    },
    "id":0,
    "name":"",
    "cod":200
}
*/


function IconGen(desc) {
    var desc = desc.toLowerCase()
    switch (desc) {
        case 'drizzle':
            addIcon(desc)
            break;
        case 'clouds':
            addIcon(desc)
            break;
        case 'rain':
            addIcon(desc)
            break;
        case 'snow':
            addIcon(desc)
            break;
        case 'clear':
            addIcon(desc)
            break;
        case 'thunderstom':
            addIcon(desc)
            break;
        default:
            $('div.clouds').removeClass('hide');
    }
}

function addIcon(desc) {
    $('div.' + desc).removeClass('hide');
}

