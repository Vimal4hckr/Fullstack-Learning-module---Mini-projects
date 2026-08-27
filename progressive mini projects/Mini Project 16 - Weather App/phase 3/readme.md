# Weather App — Phase 3

## What Was Added

In Phase 3, the Weather App was upgraded to display a **5-day weather forecast**.

The main purpose of this phase is to learn how to work with **arrays, loops, and dynamically created DOM elements**.

## New Features

### 1. 5-Day Forecast

The application now displays weather information for the next 5 days.

Each day shows:

* Date
* Weather icon
* Weather condition
* Maximum temperature
* Minimum temperature

The API request now includes:

```text
forecast_days=5
```

This tells the API to return 5 days of forecast data.

### 2. Daily Weather Code

We added:

```text
daily=weather_code,temperature_2m_max,temperature_2m_min
```

This provides weather information for each day.

The data contains arrays such as:

```javascript
dailyWeather.time
dailyWeather.weather_code
dailyWeather.temperature_2m_max
dailyWeather.temperature_2m_min
```

### 3. Arrays

The forecast data is stored in arrays.

Example:

```javascript
dailyWeather.time
```

contains the dates.

```javascript
dailyWeather.temperature_2m_max
```

contains the maximum temperatures.

```javascript
dailyWeather.temperature_2m_min
```

contains the minimum temperatures.

Each array position represents the same day.

For example:

```text
Index 0
	↓
Today

Index 1
	↓
Tomorrow

Index 2
	↓
Day 3

Index 3
	↓
Day 4

Index 4
	↓
Day 5
```

### 4. forEach()

We use `forEach()` to go through each forecast day.

```javascript
dailyWeather.time.forEach(function(day,index){
```

`day` contains the current date.

`index` tells us the position of that date in the array.

For example:

```text
index = 0
	↓
First day

index = 1
	↓
Second day

index = 2
	↓
Third day
```

### 5. createElement()

Instead of writing all five forecast cards manually in HTML, JavaScript creates them.

```javascript
const card=document.createElement("div");
```

This creates a new `<div>` element.

We then add a class:

```javascript
card.className="forecast-card";
```

### 6. Creating Forecast Information

JavaScript creates the date:

```javascript
const dayName=document.createElement("h3");
```

Then adds the date:

```javascript
dayName.textContent=day;
```

The weather icon is also created dynamically:

```javascript
const icon=document.createElement("div");
```

The weather condition is created:

```javascript
const weatherText=document.createElement("p");
```

The maximum temperature is created:

```javascript
const max=document.createElement("p");
```

The minimum temperature is created:

```javascript
const min=document.createElement("p");
```

### 7. appendChild()

After creating the elements, we add them to the forecast card.

```javascript
card.appendChild(dayName);
card.appendChild(icon);
card.appendChild(weatherText);
card.appendChild(max);
card.appendChild(min);
```

Then the card is added to the forecast container:

```javascript
forecast.appendChild(card);
```

### 8. Dynamic DOM

This phase introduces an important concept:

**Dynamic DOM creation**

Instead of creating everything manually in HTML:

```text
HTML
	↓
Fixed content
```

we now create content using JavaScript:

```text
API Data
	↓
JavaScript
	↓
createElement()
	↓
appendChild()
	↓
HTML page
```

### 9. Clearing Old Forecast

When the user searches for another city, we need to remove the previous forecast.

We use:

```javascript
forecast.innerHTML="";
```

For example:

```text
Search Chennai
	↓
Chennai forecast displayed

Search Mumbai
	↓
Remove Chennai forecast
	↓
Display Mumbai forecast
```

## Phase 1 vs Phase 2 vs Phase 3

| Feature                | Phase 1 | Phase 2  | Phase 3  |
| ---------------------- | ------- | -------- | -------- |
| City Search            | ✅       | ✅        | ✅        |
| Temperature            | ✅       | ✅        | ✅        |
| Humidity               | ✅       | ✅        | ✅        |
| Wind Speed             | ✅       | ✅        | ✅        |
| Weather Condition      | Basic   | Improved | Improved |
| Weather Icon           | ✅       | ✅        | ✅        |
| Feels Like             | ❌       | ✅        | ✅        |
| Precipitation          | ❌       | ✅        | ✅        |
| Maximum Temperature    | ❌       | ✅        | ✅        |
| Minimum Temperature    | ❌       | ✅        | ✅        |
| Date                   | ❌       | ✅        | ✅        |
| 5-Day Forecast         | ❌       | ❌        | ✅        |
| Arrays                 | Basic   | Basic    | ✅        |
| forEach()              | ❌       | ❌        | ✅        |
| createElement()        | ❌       | ❌        | ✅        |
| appendChild()          | ❌       | ❌        | ✅        |
| Dynamic Forecast Cards | ❌       | ❌        | ✅        |

## New JavaScript Concepts

Phase 3 introduces:

```text
Arrays
	↓
Array Index
	↓
forEach()
	↓
createElement()
	↓
className
	↓
textContent
	↓
appendChild()
	↓
Dynamic DOM
```

## Phase 3 Data Flow

```text
User enters city
	↓
Geocoding API
	↓
Latitude + Longitude
	↓
Weather API
	↓
5 Days of Data
	↓
JavaScript Arrays
	↓
forEach()
	↓
Create Forecast Card
	↓
Add Data
	↓
appendChild()
	↓
Display Forecast
```

## Example

Suppose the API returns:

```text
Date:
2026-08-27
2026-08-28
2026-08-29
2026-08-30
2026-08-31
```

JavaScript loops through the dates:

```javascript
dailyWeather.time.forEach(function(day,index){
```

For every date, it creates a new forecast card.

The result is:

```text
5-Day Forecast

2026-08-27
☀️
Clear Sky
Max: 32°C
Min: 25°C

2026-08-28
🌤️
Mainly Clear
Max: 33°C
Min: 26°C

2026-08-29
🌧️
Rain
Max: 30°C
Min: 24°C
```

The actual values depend on the API response.

## Main Learning From Phase 3

The most important lesson in Phase 3 is:

**We can use JavaScript to create HTML elements dynamically based on data received from an API.**

This is a very important skill for building real applications.

For example, the same technique can later be used to create:

* Product cards
* Student records
* Employee lists
* Movie cards
* Recipe cards
* Shopping cart items
* Dashboard tables
* Search results

## Phase 3 Completed

The Weather App can now:

* Search for a city
* Get location coordinates
* Get current weather
* Display current weather
* Display today's information
* Display a 5-day forecast
* Create forecast cards dynamically
* Display different weather icons
* Handle API errors
* Handle empty input
* Search using the Enter key
