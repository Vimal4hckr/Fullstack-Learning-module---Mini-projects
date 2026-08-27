const cityInput=document.getElementById("cityInput");
const searchBtn=document.getElementById("searchBtn");
const message=document.getElementById("message");
const weatherResult=document.getElementById("weatherResult");
const cityName=document.getElementById("cityName");
const date=document.getElementById("date");
const weatherIcon=document.getElementById("weatherIcon");
const temperature=document.getElementById("temperature");
const condition=document.getElementById("condition");
const feelsLike=document.getElementById("feelsLike");
const humidity=document.getElementById("humidity");
const windSpeed=document.getElementById("windSpeed");
const rain=document.getElementById("rain");
const maxTemp=document.getElementById("maxTemp");
const minTemp=document.getElementById("minTemp");
weatherResult.style.display="none";
searchBtn.addEventListener("click",function(){
	const city=cityInput.value.trim();
	if(city===""){
		message.textContent="Please enter a city name";
		return;
	}
	getWeather(city);
});
cityInput.addEventListener("keypress",function(event){
	if(event.key==="Enter"){
		const city=cityInput.value.trim();
		if(city===""){
			message.textContent="Please enter a city name";
			return;
		}
		getWeather(city);
	}
});
async function getWeather(city){
	try{
		message.textContent="Loading...";
		weatherResult.style.display="none";
		const locationURL=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
		const locationResponse=await fetch(locationURL);
		if(!locationResponse.ok){
			throw new Error("Location request failed");
		}
		const locationData=await locationResponse.json();
		if(!locationData.results||locationData.results.length===0){
			throw new Error("City not found");
		}
		const location=locationData.results[0];
		const latitude=location.latitude;
		const longitude=location.longitude;
		const weatherURL=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
		const weatherResponse=await fetch(weatherURL);
		if(!weatherResponse.ok){
			throw new Error("Weather request failed");
		}
		const weatherData=await weatherResponse.json();
		const currentWeather=weatherData.current;
		const dailyWeather=weatherData.daily;
		cityName.textContent=`${location.name}, ${location.country}`;
		date.textContent=`Date: ${dailyWeather.time[0]}`;
		temperature.textContent=`${currentWeather.temperature_2m}°C`;
		feelsLike.textContent=`${currentWeather.apparent_temperature}°C`;
		humidity.textContent=`${currentWeather.relative_humidity_2m}%`;
		windSpeed.textContent=`${currentWeather.wind_speed_10m} km/h`;
		rain.textContent=`${currentWeather.precipitation} mm`;
		maxTemp.textContent=`${dailyWeather.temperature_2m_max[0]}°C`;
		minTemp.textContent=`${dailyWeather.temperature_2m_min[0]}°C`;
		const weatherInfo=getWeatherCondition(currentWeather.weather_code);
		condition.textContent=weatherInfo.text;
		weatherIcon.textContent=weatherInfo.icon;
		message.textContent="";
		weatherResult.style.display="block";
	}catch(error){
		message.textContent="Unable to get weather. Please try again.";
		console.log(error);
	}
}
function getWeatherCondition(code){
	if(code===0){
		return{text:"Clear Sky",icon:"☀️"};
	}
	if(code===1){
		return{text:"Mainly Clear",icon:"🌤️"};
	}
	if(code===2){
		return{text:"Partly Cloudy",icon:"⛅"};
	}
	if(code===3){
		return{text:"Overcast",icon:"☁️"};
	}
	if(code>=45&&code<=48){
		return{text:"Fog",icon:"🌫️"};
	}
	if(code>=51&&code<=55){
		return{text:"Drizzle",icon:"🌦️"};
	}
	if(code>=56&&code<=57){
		return{text:"Freezing Drizzle",icon:"🌧️"};
	}
	if(code>=61&&code<=65){
		return{text:"Rain",icon:"🌧️"};
	}
	if(code>=66&&code<=67){
		return{text:"Freezing Rain",icon:"🌧️"};
	}
	if(code>=71&&code<=75){
		return{text:"Snow",icon:"❄️"};
	}
	if(code===77){
		return{text:"Snow Grains",icon:"❄️"};
	}
	if(code>=80&&code<=82){
		return{text:"Rain Showers",icon:"🌦️"};
	}
	if(code>=85&&code<=86){
		return{text:"Snow Showers",icon:"🌨️"};
	}
	if(code>=95&&code<=99){
		return{text:"Thunderstorm",icon:"⛈️"};
	}
	return{text:"Unknown",icon:"🌍"};
}