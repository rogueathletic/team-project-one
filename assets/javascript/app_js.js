$('body').attr("id", "begin");
// weather api
// function getWeather() {
//connect to firebase
$('#weatherResults').hide();
var token = "pk.eyJ1IjoiYW5kcmV3anRob21zZW4iLCJhIjoiY2pyNXFjam03MjlnNzQ0c2VzNjIzcWdhdyJ9.OgdsY8LjrFyxmcmOYXuAoA";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDj3IyQilG9_31NE5FHhFzVK_TJRNWcHEE",
  authDomain: "fitness-app-ecde0.firebaseapp.com",
  databaseURL: "https://fitness-app-ecde0.firebaseio.com",
  projectId: "fitness-app-ecde0",
  storageBucket: "fitness-app-ecde0.appspot.com",
  messagingSenderId: "669412677794"
};
firebase.initializeApp(config);
let fireDB = firebase.database();

// click function for getting weather conditions
$("#getWeather").on("click", getWeather);
function getWeather() {
  // Build URL
  var locationInput = $('#location').val();
  var ajaxUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    locationInput +
    "&appid=f4012622bd78ad3173b7526c476fb82a"; // test by throwing url into chrome
  
    $("#getWeather").click(
      function () {
        $("#location").val('');
      });

  // Make AJAX call.
  $.ajax({
    //objects made up of methods, properties, and key value pairs
    url: ajaxUrl,
    method: "GET"
  
  })

  // Deal with response data.
  .done(function(weatherData, status) {
      console.log(weatherData);
      dynamicBkgrnd(weatherData.main.temp);
      // Display results to user.
      var tempKelvin = weatherData.main.temp;
      var tempCelcius = tempKelvin - 273.15;
      var tempFarenheit = roundTwoDecimals(tempCelcius * 9 / 5 + 32);
      $('#temperature').text(tempFarenheit);
      $('#humidity').text(weatherData.main.humidity + '%');
      $('#visibility').text(weatherData.visibility);
      if (weatherData.hasOwnProperty('rain')) {   
         
        $('#rain').text(JSON.stringify(weatherData.rain));
      } else {
        $('#rain').text('No rain today. Great time for a run!');
      }
      $('#wind').text(weatherData.wind.speed + ' mph, ' + weatherData.wind.deg + ' deg');
      $('#weatherResults').show()
  });
}

function roundTwoDecimals(num) {
  return Math.floor((num * 100) / 100);
}

function reverseGeocode(coordinateString, callback) {
  var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    + coordinateString 
    + ".json?access_token="
    + token;

  $.ajax({
    url: url
  })
  .done(function(response) {
    console.log(response);
    var placeName = response.features[0].place_name;

    callback(placeName);
  })
}

  dynamicBkgrnd = function (kelvin) {
    var farenheight = Math.floor(1.8 * (kelvin - 273) + 32);
    console.log(farenheight);
    if (farenheight >= -99 && farenheight <= 0) {
        $('body').attr("id", "sub-zero");
        
    }
    if (farenheight >= 1 && farenheight <= 34) {
        $('body').attr("id", "freezing");
    }
    if (farenheight >= 35 && farenheight <= 45) {
        $('body').attr("id", "sub-fofi");
    } 
    else if (farenheight >= 46 && farenheight <= 55) {
        $('body').attr("id", "sub-fifi");
    } 
    else if (farenheight >= 56 && farenheight <= 65) {
        $('body').attr("id", "sub-sifi");
    } 
    else if (farenheight >= 66 && farenheight <= 75) {
        $('body').attr("id", "sub-sefi");
    } 
    else if (farenheight >= 76 && farenheight <= 85) {
        $('body').attr("id", "sub-eifi");
    } 
    else if (farenheight >= 86 && farenheight <= 95) {
        $('body').attr("id", "sub-nifi");
    } 
    else if (farenheight >= 96 && farenheight <= 200) {
        $('body').attr("id", "too-hot");
    } 
};