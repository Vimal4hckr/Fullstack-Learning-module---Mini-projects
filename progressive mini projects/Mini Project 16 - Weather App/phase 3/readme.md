# Weather App — Phase 1
## Project Overview

This is a simple Weather App built using:

* HTML
* CSS
* JavaScript
* DOM
* Fetch API
* async/await
* JSON
* Open-Meteo API

The user enters a city name and the application displays the current weather information for that city.

## Phase 1 Goal

The main goal of Phase 1 is to learn how JavaScript can communicate with an external API and display the received data on a webpage.

The basic flow is:

```text
User enters city
	↓
JavaScript gets city name
	↓
Geocoding API finds city coordinates
	↓
Latitude and Longitude are received
	↓
Weather API is called
	↓
Weather data is received
	↓
JavaScript displays the weather
```

## Project Structure

```text
weather-app/
│
├── index.html
├── style.css
└── script.js
```

## 1. HTML

The HTML file creates the basic structure of the application.

It contains:

* Heading
* City input box
* Search button
* Weather result area
* Temperature
* Weather condition
* Humidity
* Wind speed
* Weather icon

Example:

```html
<input type="text" id="cityInput" placeholder="Enter city name">
<button id="searchBtn">Search</button>
```

The input allows the user to enter a city.

The button starts the weather search.

## 2. CSS

The CSS file controls the appearance of the Weather App.

It is used for:

* Page layout
* Background
* Weather card
* Input styling
* Button styling
* Text size
* Spacing
* Alignment

The CSS does not handle the weather data.

JavaScript handles the functionality.

## 3. JavaScript

JavaScript connects the HTML page with the weather API.

First, we select the HTML elements:

```javascript
const cityInput=document.getElementById("cityInput");
const searchBtn=document.getElementById("searchBtn");
const weatherResult=document.getElementById("weatherResult");
```

`document.getElementById()` allows JavaScript to access an HTML element using its `id`.

## 4. Getting the City Name

When the user clicks Search:

```javascript
searchBtn.addEventListener("click",function(){
	const city=cityInput.value.trim();
	getWeather(city);
});
```

The value entered by the user is stored in:

```javascript
const city=cityInput.value.trim();
```

For example, if the user enters:

```text
Chennai
```

then:

```javascript
city
```

contains:

```text
Chennai
```

## 5. What is an API?

API stands for:

**Application Programming Interface**

An API allows one application to communicate with another service.

Our Weather App does not contain weather information by itself.

Instead, it asks an external weather service for the information.

The process is:

```text
Weather App
	↓
API Request
	↓
Weather Service
	↓
API Response
	↓
Weather App
```

## 6. What is the Location URL?

The first API URL in our project is:

```javascript
const locationURL=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
```

This is called the **Geocoding API URL**.

Its purpose is to find the location of the city entered by the user.

It does NOT directly give us the weather.

It gives us information such as:

* City name
* Country
* Latitude
* Longitude

For example, if the user enters:

```text
Chennai
```

the URL becomes similar to:

```text
https://geocoding-api.open-meteo.com/v1/search?name=Chennai&count=1&language=en&format=json
```

## 7. Why Do We Need the Location API?

Weather data is commonly requested using geographical coordinates.

A city name alone is not enough for the weather API.

We first need:

```text
City
	↓
Latitude
Longitude
```

For example:

```text
Chennai
Latitude: 13.08
Longitude: 80.27
```

These coordinates can then be sent to the weather API.

## 8. Understanding the Location URL

The URL contains different parts.

```text
https://geocoding-api.open-meteo.com
```

This is the Open-Meteo Geocoding API server.

```text
/v1/search
```

This tells the API that we want to search for a location.

```text
name=
```

This tells the API which city we want to search for.

```javascript
${encodeURIComponent(city)}
```

This inserts the city entered by the user.

For example:

```javascript
city="Chennai"
```

becomes:

```text
name=Chennai
```

## 9. What is encodeURIComponent()?

We use:

```javascript
encodeURIComponent(city)
```

to safely place the user's city name inside a URL.

For example, a city can contain spaces or special characters.

Encoding converts those characters into a URL-safe format.

So instead of manually creating a URL, JavaScript builds it automatically.

## 10. What is count=1?

Our URL contains:

```text
count=1
```

This means we only want one search result.

For example, if the API finds multiple possible results, we ask it to return the first result.

## 11. What is language=en?

```text
language=en
```

tells the API that we want the location information in English.

## 12. What is format=json?

```text
format=json
```

means we want the API response in JSON format.

JSON is a common format used for exchanging data between applications.

## 13. Fetch API

We use JavaScript's `fetch()` function to request data from the API.

```javascript
const locationResponse=await fetch(locationURL);
```

This sends a request to the Location API.

The API sends a response back.

```text
JavaScript
	↓
fetch()
	↓
Location API
	↓
Response
```

## 14. What is async?

Our weather function is:

```javascript
async function getWeather(city){
```

`async` allows us to use `await` inside the function.

API requests take some time.

JavaScript should wait for the API response before trying to use the data.

## 15. What is await?

We use:

```javascript
const locationResponse=await fetch(locationURL);
```

`await` tells JavaScript to wait for the API request to finish.

Without waiting, JavaScript could try to use the data before the API has responded.

The basic idea is:

```text
Send request
	↓
Wait
	↓
Receive response
	↓
Continue
```

## 16. Converting Response to JSON

After receiving the response:

```javascript
const locationData=await locationResponse.json();
```

The API response is converted into JavaScript data.

Now we can access information from it.

For example:

```javascript
locationData.results
```

contains the search results.

## 17. Getting the Location

We use:

```javascript
const location=locationData.results[0];
```

`results` contains the location results.

`[0]` means:

**Get the first result.**

Then:

```javascript
const latitude=location.latitude;
const longitude=location.longitude;
```

gets the coordinates.

## 18. Weather URL

After getting the coordinates, we create the second API URL:

```javascript
const weatherURL=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
```

This API gives us the actual weather.

The flow is:

```text
Chennai
	↓
Location API
	↓
Latitude + Longitude
	↓
Weather API
	↓
Temperature + Humidity + Wind + Weather Code
```

## 19. Why Are There Two APIs?

We use two API requests because they perform two different jobs.

### API 1 — Geocoding

```text
City Name
	↓
Latitude + Longitude
```

### API 2 — Weather

```text
Latitude + Longitude
	↓
Weather Information
```

So:

```text
City
	↓
Geocoding API
	↓
Coordinates
	↓
Weather API
	↓
Weather
```

## 20. Weather Data

The weather API gives us values such as:

```text
Temperature
Humidity
Wind Speed
Weather Code
```

We access them using:

```javascript
const currentWeather=weatherData.current;
```

Then:

```javascript
currentWeather.temperature_2m
```

gets the temperature.

```javascript
currentWeather.relative_humidity_2m
```

gets the humidity.

```javascript
currentWeather.wind_speed_10m
```

gets the wind speed.

```javascript
currentWeather.weather_code
```

gets the weather code.

## 21. Displaying Data Using DOM

After receiving the data, JavaScript updates the HTML.

For example:

```javascript
temperature.textContent=`${currentWeather.temperature_2m}°C`;
```

This changes the temperature shown on the webpage.

Similarly:

```javascript
humidity.textContent=`${currentWeather.relative_humidity_2m}%`;
```

updates humidity.

And:

```javascript
windSpeed.textContent=`${currentWeather.wind_speed_10m} km/h`;
```

updates wind speed.

## 22. Weather Code

The API gives us a numerical weather code.

For example:

```text
0 → Clear Sky
1–3 → Cloudy
45–48 → Fog
51–57 → Drizzle
61–67 → Rain
71–77 → Snow
80–82 → Rain Showers
95+ → Thunderstorm
```

We convert these numbers into readable text using:

```javascript
function getWeatherCondition(code){
```

For example:

```javascript
if(code===0){
	return {text:"Clear Sky",icon:"☀️"};
}
```

If the weather code is `0`, the application displays:

```text
Clear Sky ☀️
```

## 23. Error Handling

API requests can fail.

For example:

* City does not exist
* Internet connection is unavailable
* API request fails
* Unexpected API response

Therefore, we use:

```javascript
try{
	// API code
}
catch(error){
	// Error code
}
```

If something goes wrong:

```javascript
message.textContent="City not found. Please try again.";
```

is displayed.

## 24. Enter Key

The user can also press Enter instead of clicking Search.

```javascript
cityInput.addEventListener("keypress",function(event){
	if(event.key==="Enter"){
		getWeather(city);
	}
});
```

This demonstrates how JavaScript can respond to keyboard events.

## 25. Important Concepts Learned in Phase 1

```text
document.getElementById()
	↓
DOM Selection
```

```text
addEventListener()
	↓
Events
```

```text
fetch()
	↓
API Request
```

```text
async / await
	↓
Asynchronous JavaScript
```

```text
response.json()
	↓
JSON Data
```

```text
try / catch
	↓
Error Handling
```

```text
textContent
	↓
Updating HTML
```

```text
encodeURIComponent()
	↓
URL Encoding
```

## 26. Phase 1 Learning Flow

```text
HTML
	↓
Create input and output elements
	↓
JavaScript
	↓
Read city name
	↓
Geocoding API
	↓
Get coordinates
	↓
Weather API
	↓
Get weather data
	↓
JSON
	↓
Extract values
	↓
DOM
	↓
Display weather
```

## 27. Phase 1 Completed Features

* City search
* Enter key search
* Location search
* Latitude and longitude retrieval
* Weather API request
* Temperature
* Humidity
* Wind speed
* Weather condition
* Weather icon
* Loading message
* Error handling

## 28. Important Note

You do **not** replace `locationURL` with your city or your own URL.

This:

```javascript
const locationURL=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
```

is the API endpoint.

The city changes automatically through:

```javascript
${encodeURIComponent(city)}
```

If the user enters:

```text
Chennai
```

the API searches for Chennai.

If the user enters:

```text
Mumbai
```

the API searches for Mumbai.

If the user enters:

```text
Delhi
```

the API searches for Delhi.

Therefore, the URL remains the same while the city value changes.

## Phase 1 Summary

In Phase 1, we learned how to build a basic Weather App and connect JavaScript to an external API.

The most important concept is:

```text
User Input
	↓
API Request
	↓
API Response
	↓
JSON
	↓
JavaScript
	↓
DOM
	↓
Webpage
```

This is the foundation for many real-world JavaScript applications.
