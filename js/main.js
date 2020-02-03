/* -----------------------------------------------
   Set Up
   ----------------------------------------------- */

// attach initial page cover
$('body').append('<div class="cover"><p>Loading Weather Data</p></div>');

// randomize cards
// source: https://codereview.stackexchange.com/a/11984
function randomizeCards(){
  for (var $x=$("main li"), i=$x.length-1, j, temp; i>=0; i--) {
    j=Math.floor(Math.random()*(i+1)),
    temp=$x[i], $x[i]=$x[j], 
    $x[j]=temp;
  }
  $x.each(function(i, li) {
    $("main ul").append(li);
  });
}
randomizeCards();

// open links in a new window
$('a').attr('target','_blank');


/* -----------------------------------------------
   Function for retrieving the main weather info
   ----------------------------------------------- */

// Replace the lat/long below with the lat/long for your desired location.
// Get your city lat/long using https://www.latlong.net/
var latlong = '41.823990,-71.412834';
// unique API key
var apikey = 'c62e72d0f0cd19b5ef7f51b537e5ea5f';

// Access the DarkSky API for weather data. DO NOT EDIT THIS LINE.
$.getJSON('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/'+apikey+'/' + latlong)

// Display the weather content once it is loaded, not before.
.done(function(forecast) {
  // pause a second
  setTimeout(transitionToMain, 3000);
  // show transition message and wait again
  function transitionToMain(){
    $('.cover p').text('Thanks for your patience!');
    setTimeout(loadContent, 1000);
  }
  // finish up
  function loadContent(){
    // remove cover when data is ready
    $('.cover').addClass('slide');
  } 
	// display data
	displayData(forecast);
})

// Print the data object feturned from DarkSky for all the details
// DO NOT EDIT THIS LINE.
.always(function(forecast) {
	console.log(forecast);
});


/* -----------------------------------------------
   Function for displaying the main weather info
   ----------------------------------------------- */

// All of the data comes from the "forecast" object returned
// from the DarkSky API. Inspect this page in the browser
// for a full list of data that can be used using the methods below.

function displayData(forecast){

	// main data display units
  $('header .time').html(hourConverter(forecast.currently.time));
  $('header .day').html(displayDay(0));
  $('header .summary').html(forecast.currently.summary);
	$('.weather-info .temp').html(Math.round(forecast.currently.temperature)+'&deg;');

}


/* -----------------------------------------------
   Function for creating day of the week
   ----------------------------------------------- */

function displayDay(n){

	var d = new Date();
	var weekday = new Array();

	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	var dispDay = d.getDay() + n;

	// adjust number system for numbers over 6
	// subtract 7 from totals higher than 6
	// to keep the day numbers in the array range above
	if(dispDay > 6){
		dispDay = dispDay - 7;
	}

	return weekday[ dispDay ];

}


/* -----------------------------------------------
   Function for converting timestamp to readable text
   ----------------------------------------------- */

function hourConverter(h){
  // set up new date object
  var a = new Date(h * 1000);
  // convert date/time to simplified format
  var t = a.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  // use the following line for time with AM/PM
  return t;
}


/* -----------------------------------------------
   Slick Slider
   ----------------------------------------------- */

$('.slider').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});
