# Weather App — Phase 2

## What Was Added

In Phase 2, we improved the Weather App by getting more weather information from the API and displaying it on the webpage.

## New Features

### 1. Feels Like Temperature

Added:

```text
Feels Like
```

This shows how the temperature actually feels.

JavaScript:

```javascript
feelsLike.textContent=`${currentWeather.apparent_temperature}°C`;
```

### 2. Maximum Temperature

Added today's maximum temperature.

```javascript
maxTemp.textContent=`${dailyWeather.temperature_2m_max[0]}°C`;
```

### 3. Minimum Temperature

Added today's minimum temperature.

```javascript
minTemp.textContent=`${dailyWeather.temperature_2m_min[0]}°C`;
```

### 4. Precipitation

Added the amount of precipitation.

```javascript
rain.textContent=`${currentWeather.precipitation} mm`;
```

### 5. Date

Added the current forecast date.

```javascript
date.textContent=`Date: ${dailyWeather.time[0]}`;
```

### 6. Better Weather Conditions

Phase 1 had basic weather conditions.

Phase 2 supports more weather codes:

```text
0 → Clear Sky
1 → Mainly Clear
2 → Partly Cloudy
3 → Overcast
45–48 → Fog
51–55 → Drizzle
56–57 → Freezing Drizzle
61–65 → Rain
66–67 → Freezing Rain
71–75 → Snow
77 → Snow Grains
80–82 → Rain Showers
85–86 → Snow Showers
95–99 → Thunderstorm
```

Each condition also has a suitable emoji.

### 7. Better Error Handling

We added a check for failed API requests.

```javascript
if(!locationResponse.ok){
	throw new Error("Location request failed");
}
```

And:

```javascript
if(!weatherResponse.ok){
	throw new Error("Weather request failed");
}
```

This helps detect problems when the API request fails.

### 8. Empty Search Validation

If the user clicks Search without entering a city:

```text
Please enter a city name
```

is displayed.

### 9. City Not Found Handling

If the API cannot find the requested city:

```text
Unable to get weather. Please try again.
```

is displayed.

## API Changes

In Phase 1, we requested basic current weather:

```text
Temperature
Humidity
Weather Code
Wind Speed
```

In Phase 2, we added:

```text
Feels Like Temperature
Precipitation
Maximum Temperature
Minimum Temperature
Date
```

## Current API Structure

The Weather API now requests:

```text
current:
	temperature
	apparent temperature
	humidity
	precipitation
	weather code
	wind speed

daily:
	maximum temperature
	minimum temperature
```

## Current Weather Data

We get current weather using:

```javascript
const currentWeather=weatherData.current;
```

Then we can access:

```javascript
currentWeather.temperature_2m
currentWeather.apparent_temperature
currentWeather.relative_humidity_2m
currentWeather.precipitation
currentWeather.weather_code
currentWeather.wind_speed_10m
```

## Daily Weather Data

We get daily information using:

```javascript
const dailyWeather=weatherData.daily;
```

Then:

```javascript
dailyWeather.temperature_2m_max[0]
```

gets today's maximum temperature.

```javascript
dailyWeather.temperature_2m_min[0]
```

gets today's minimum temperature.

```javascript
dailyWeather.time[0]
```

gets today's date.

## Phase 1 vs Phase 2

| Feature             | Phase 1 | Phase 2  |
| ------------------- | ------- | -------- |
| City Search         | ✅       | ✅        |
| Temperature         | ✅       | ✅        |
| Humidity            | ✅       | ✅        |
| Wind Speed          | ✅       | ✅        |
| Weather Condition   | Basic   | Improved |
| Weather Icon        | ✅       | ✅        |
| Feels Like          | ❌       | ✅        |
| Precipitation       | ❌       | ✅        |
| Maximum Temperature | ❌       | ✅        |
| Minimum Temperature | ❌       | ✅        |
| Date                | ❌       | ✅        |
| API Error Check     | Basic   | Improved |
| Empty Input Check   | ✅       | ✅        |
| Enter Key Search    | ✅       | ✅        |

## Concepts Learned

Phase 2 introduced:

```text
Multiple API parameters
	↓
Current weather data
	↓
Daily weather data
	↓
Arrays
	↓
Array indexing [0]
	↓
HTTP response checking
	↓
Better error handling
	↓
More DOM updates
```

## Phase 2 Result

The Weather App can now display:

```text
City
Date
Weather Icon
Weather Condition
Temperature
Feels Like Temperature
Humidity
Wind Speed
Rain / Precipitation
Maximum Temperature
Minimum Temperature
```