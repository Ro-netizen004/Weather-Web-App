import Header from "./components/Header"
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import { useState } from 'react';
import { createContext } from "react";


export const ThemeContext = createContext(null)
function App() {

  const [city, setCity] = useState("Dhaka, Bangladesh");

  const [theme, setTheme] = useState("light")

  const [unit, setUnit] = useState ("Celsius")
  
  const appStyle = {
    backgroundColor: theme === "dark" ? "#121212" : "#f9f9f9",
    color: theme === "dark" ? "#eee" : "#111",
    minHeight: "100vh", // so background fills the screen
    fontFamily: "'Lucida Sans', 'Lucida Grande', sans-serif",
    padding: "0",
    margin: "0",
    transition: "background-color 0.3s ease"
  };

  function toggleTheme(){
    setTheme(curr => (curr==="dark"? "light" : "dark")) 
  }
  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme} style={appStyle}>
        <Header city ={city} setCity ={setCity} unit ={unit} setUnit ={setUnit}/>
        <CurrentWeather city ={city} unit ={unit}/>
        <Footer />
      </div>
      </ThemeContext.Provider>
  )
}

export default App
