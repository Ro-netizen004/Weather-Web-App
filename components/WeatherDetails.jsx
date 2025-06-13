import {
  FaWind,
  FaEye,
  FaTachometerAlt,
  FaCloud,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaUmbrella,
  FaCloudRain
} from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

function WeatherDetails({label, data, unit}) {
    let icon

  switch (label.toLowerCase()) {
    case 'wind':
      icon = <FaWind className="weather-icon" size={24} />;
      break;
    case 'humidity':
      icon = <WiHumidity className="weather-icon" size={28} />;
      break;
    case 'visibility':
      icon = <FaEye className="weather-icon" size={24} />;
      break;
    case 'pressure':
      icon = <FaTachometerAlt className="weather-icon" size={24} />;
      break;
    case 'clouds cover':
      icon = <FaCloud className="weather-icon" size={24} />;
      break;
    case 'high':
      icon = <FaTemperatureHigh className="weather-icon" size={24} />;
      break;
    
    case 'low':
      icon = <FaTemperatureLow className="weather-icon" size={24} />;
      break;
    case 'rain':
      icon = < FaUmbrella className="weather-icon" size={24} />;
      break;
    default:
      icon = <FaCloudRain className="weather-icon" size={24} />;
      break;

  }

  return (
    <div className="weather-details-card">
      <div className="weather-header">
        {icon}
        <span className="weather-label">{label}</span>
      </div>
      <p>{data} {unit}</p>
    </div>
  );
}

export default WeatherDetails;