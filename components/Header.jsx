import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import ChangeMode from './ChangeMode';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { useState, useEffect } from 'react';
import lightmode from "../images/sun.png"
import darkmode from "../images/moon.png"
const API_key = import.meta.env.VITE_API_KEY;

export default function Header({city, setCity, unit, setUnit}) {
  const { theme } = useContext(ThemeContext);
  const modeicon = theme==="dark" ? darkmode : lightmode

  const [searchInput, setSearchInput] = useState(city);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
  const timeoutId = setTimeout(() => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_key}`)
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(err => {
        console.error("Suggestion fetch failed:", err);
        setSuggestions([]);
      });
  }, 300); // debounce delay

  return () => clearTimeout(timeoutId);
}, [searchInput]);


  function onSubmit(event){
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const newInput = formData.get("city");  // extract input value
    setCity(newInput)
  }

  function toggleUnit(){
    setUnit(unit==="Celsius"? "Fahrenheit" : "Celsius")
  }

  function handleUseMyLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_key}`
      )
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch location info");
          return res.json();
        })
        .then(data => {
          if (data && data.length > 0) {
            const cityName = data[0].name;
            setCity(cityName);
            setSearchInput(cityName);
          } else {
            alert("Unable to determine your city from coordinates.");
          }
        })
        .catch(err => {
          console.error("Failed to get location:", err);
          alert("Failed to fetch location info.");
        });
    },
    (error) => {
      console.error(error);
      alert("Permission denied or error fetching location.");
    }
  );
}

  return (
    <div className="header-weather">
      <header className="header">
        <div className="location">
          <FaMapMarkerAlt />
          <p><span className="make-bold">{city}</span></p>
        </div>
        <div className="search-button-container">
          <form onSubmit={onSubmit} className ="search-form">
            <div className="search-wrapper">
              <input name="city" className="search-box" type="text" placeholder="Search city" value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}/>
              <FaSearch />
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setCity(item.name);
                        setSearchInput(item.name); 
                        setSuggestions([]); 
                      }}
                    >
                      {item.name}, {item.state ? `${item.state}, ` : ""}{item.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        <button onClick={handleUseMyLocation}>Use my location</button>
        </div>
        <div className="button-container">
          <button onClick={toggleUnit}>{unit === "Celsius" ? "°C to °F" : "°F to °C"}</button>
          <ChangeMode img={modeicon}
          theme ={theme==="dark"? "Dark" : "Light"}
          />
        </div>
      </header>
      
    </div>
  );
}
