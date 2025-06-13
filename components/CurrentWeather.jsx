import { useEffect, useState, useRef } from "react";
import WeatherDetails from "./WeatherDetails";
import HourlyForecastCard from "./HourlyForecast";
const API_key = import.meta.env.VITE_API_KEY;

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function convertTemperature(value, unit) {
  return unit === "Celsius"
    ? value
    : ((value * 9) / 5 + 32);
}

function WeatherCard({city, unit}) {

  const forecastScrollRef = useRef(null);

  const scrollLeft = () => {
    forecastScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    forecastScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };
  const [coordinates, setCoordinates] = useState({ lat: 23.7643863, lon: 90.3890144 });
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecastInfo, setForecastInfo] = useState(null);

  useEffect(() => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_key}`)
      .then(res => res.json())
      .then(data => {
        const { lat, lon } = data[0];
        setCoordinates({ lat, lon });
      })
      .catch(err => console.error("Geocoding fetch failed:", err));
  }, [city]);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_key}&units=metric`)
      .then(res => res.json())
      .then(data => {
        setWeatherInfo(data);
      })
      .catch(err => console.error("Weather fetch failed:", err));
  }, [coordinates]);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_key}&units=metric`)
      .then(res => res.json())
      .then(data => {
        setForecastInfo(data);
      })
      .catch(err => console.error("Forecast fetch failed:", err));
  }, [coordinates]);

  if (!weatherInfo || !weatherInfo.main || !weatherInfo.weather) {
    return <div className="weather-card"><p>Loading weather...</p></div>;
  }

  if (!forecastInfo || !forecastInfo.list) {
    return <div className="weather-card"><p>Loading forecast...</p></div>;
  }


  const forecast_components = forecastInfo.list.map((data, index) => {
    let lastPart = data.dt_txt.split(' ').pop();
    const convertedTemp = convertTemperature(data.main.temp, unit).toFixed(1);
    if(index===0){
      return (
        <HourlyForecastCard
          time={`Today, ${lastPart}`}
          temp={convertedTemp}
          icon={data.weather[0].icon}
          description={data.weather[0].description}
          unit={unit === "Celsius" ? "°C" : "°F"}
        />
      )
    }
    if (lastPart === "00:00:00") {
      return (
        <HourlyForecastCard
          key={index}
          time={data.dt_txt}
          temp={convertedTemp}
          icon={data.weather[0].icon}
          description={data.weather[0].description}
          unit={unit === "Celsius" ? "°C" : "°F"}
        />
      )
    } else {
      return (
        <HourlyForecastCard
          key={index}
          time={lastPart}
          temp={convertedTemp}
          unit={unit === "Celsius" ? "°C" : "°F"}
          icon={data.weather[0].icon}
          description={data.weather[0].description}
        />
      )
    }
  })

  return (
    <>
      <div className="weather-data-layout">
        <div className="weather-card">
          <div className="weather-body">
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                alt={weatherInfo.weather[0].description}
                width={100}
                height={100}
              />
            </div>

            <div className="weather-info">
              <h3>{city}</h3>
              <h1>{convertTemperature(weatherInfo.main.temp, unit).toFixed(1)}°{unit === "Celsius" ? "C" : "F"}</h1>
              <p>Feels like {convertTemperature(weatherInfo.main.feels_like, unit).toFixed(1)} °{unit === "Celsius" ? "C" : "F"}</p>
              <div className="weather-footer">
                <b>{toTitleCase(weatherInfo.weather[0].description)}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="weather-details-container">
          <WeatherDetails label="Wind" data={weatherInfo.wind.speed} unit="m/s" />
          <WeatherDetails label="Humidity" data={weatherInfo.main.humidity} unit="%" />
          <WeatherDetails label="Visibility" data={weatherInfo.visibility} unit="m" />
          <WeatherDetails label="Pressure" data={weatherInfo.main.pressure} unit="hPa" />
          <WeatherDetails label="Clouds Cover" data={weatherInfo.clouds.all} unit="%" />
          <WeatherDetails 
            label="High" data={convertTemperature(weatherInfo.main.temp_max, unit).toFixed(1)} 
            unit={unit === "Celsius" ? "°C" : "°F"}  />
          <WeatherDetails 
            label="Low" data={convertTemperature(weatherInfo.main.temp_min, unit).toFixed(1)} 
            unit={unit === "Celsius" ? "°C" : "°F"}  />
          <WeatherDetails label="Rain 1h" data={weatherInfo.rain?.["1h"] || 0} unit="mm" />
        </div>
      </div>

      <h2>3 hourly forecast for 5 days</h2>
      <div className="forecast-scroll-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>◀</button>

        <div className="forecast-container" ref={forecastScrollRef}>
          {forecast_components}
        </div>

        <button className="scroll-button right" onClick={scrollRight}>▶</button>
      </div>
    </>
  );
}

export default WeatherCard;
