const cityInput=document.getElementById("cityInput");
const searchBtn=document.getElementById("searchBtn");
const message=document.getElementById("message");
const weatherResult=document.getElementById("weatherResult");
const cityName=document.getElementById("cityName");
const weatherIcon=document.getElementById("weatherIcon");
const temperature=document.getElementById("temperature");
const condition=document.getElementById("condition");
const humidity=document.getElementById("humidity");
const windSpeed=document.getElementById("windSpeed");
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
		const locationData=await locationResponse.json();
		if(!locationData.results){
			throw new Error("City not found");
		}
		const location=locationData.results[0];
		const latitude=location.latitude;
		const longitude=location.longitude;
		const weatherURL=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
		const weatherResponse=await fetch(weatherURL);
		const weatherData=await weatherResponse.json();
		const currentWeather=weatherData.current;
		cityName.textContent=`${location.name}, ${location.country}`;
		temperature.textContent=`${currentWeather.temperature_2m}°C`;
		humidity.textContent=`${currentWeather.relative_humidity_2m}%`;
		windSpeed.textContent=`${currentWeather.wind_speed_10m} km/h`;
		const weatherInfo=getWeatherCondition(currentWeather.weather_code);
		condition.textContent=weatherInfo.text;
		weatherIcon.textContent=weatherInfo.icon;
		message.textContent="";
		weatherResult.style.display="block";
	}catch(error){
		message.textContent="City not found. Please try again.";
		console.log(error);
	}
}
function getWeatherCondition(code){
	if(code===0){
		return {text:"Clear Sky",icon:"☀️"};
	}
	if(code>=1&&code<=3){
		return {text:"Cloudy",icon:"🌤️"};
	}
	if(code>=45&&code<=48){
		return {text:"Fog",icon:"🌫️"};
	}
	if(code>=51&&code<=57){
		return {text:"Drizzle",icon:"🌦️"};
	}
	if(code>=61&&code<=67){
		return {text:"Rain",icon:"🌧️"};
	}
	if(code>=71&&code<=77){
		return {text:"Snow",icon:"❄️"};
	}
	if(code>=80&&code<=82){
		return {text:"Rain Showers",icon:"🌦️"};
	}
	if(code>=95){
		return {text:"Thunderstorm",icon:"⛈️"};
	}
	return {text:"Unknown",icon:"🌍"};
}