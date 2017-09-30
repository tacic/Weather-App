var APPID = "d2ace650b4df41f6d5f1ea94fc08da75";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function updateByZip(zip){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"zip=" + zip +
	"&APPID=" + APPID;
    sendRequest(url);
}

function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + APPID;
    sendRequest(url);    
}

function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var weather = JSON.parse(xmlhttp.responseText);
	    update(weather);
	}
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}

function degreesToDirection(degrees){
    if(degrees >= 348.75 && degrees < 11.25)
	return "N";
    if(degrees >= 11.25 && degrees < 33.75)
	return "NNE";
    if(degrees >= 33.75  && degrees < 56.25)
	return "NE";
    if(degrees >= 56.25  && degrees < 78.75)
	return "ENE";
    if(degrees >= 78.75  && degrees < 101.25)
	return "E";
    if(degrees >= 101.25  && degrees < 123.75)
	return "SE";
    if(degrees >= 123.75  && degrees < 146.25)
	return "SSE";
    if(degrees >= 146.25  && degrees < 168.75)
	return "S";
    if(degrees >= 191.25  && degrees < 213.75)
	return "SSW";
    if(degrees >= 213.75 && degrees < 236.25)
	return "SW";
    if(degrees >= 236.25  && degrees < 258.75)
	return "WSW";
    if(degrees >= 258.75  && degrees < 281.25)
	return "W";
    if(degrees >= 281.25  && degrees < 303.75)
	return "WNW";
    if(degrees >= 303.75  && degrees < 326.25)
	return "NW";
    if(degrees >= 326.25  && degrees < 348.75)
	return "NNW";
    
}

function kelvinToFahrenheit(k){
    return Math.round(k*(9/5)-459.67);
}

function kelvinToCelsius(k){
    return Math.round(k - 273.15);
}

function update(weather) {
    icon.src = "imgs/codes/" + weather.weather[0].id + ".png"
    humidity.innerHTML = weather.main.humidity;
    wind.innerHtml = weather.wind.speed;
    direction.innerHTML = degreesToDirection(weather.wind.deg);
    loc.innerHTML = weather.name;
    temp.innerHTML = kelvinToFahrenheit(weather.main.temp);
}

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

    icon.src = "imgs/codes/300.png";
    humidity.innerHTML = "35";
    wind.innerHTML = 7;
    direction.innerHTML = "SE";
    loc.innerHTML = "London";
    temp.innerHTML = "75";

    if(navigator.geolocation){
	var showPosition = function(position){
	    updateByGeo(position.coords.latitude, position.coords.longitude);
	}
	navigator.geolocation.getCurrentPosition(showPosition);
    } else {
	var zip = window.prompt("Could not discover your location. What is your zip code?");
	updateByZip(zip);
    }
    
}

