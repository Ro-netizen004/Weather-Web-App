function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function HourlyForecastCard({ time, temp, icon, description , unit}) {
  return (
    <div
      className="weather-card"
      style={{
        width: "600px",
        height: "250px", // decreased height
        margin: "10px",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="weather-body"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div className="weather-icon" style={{ marginBottom: "8px" }}>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            width={40} // smaller image
            height={40} // smaller image
          />
        </div>

        <h3
          style={{
            margin: "4px 0",
            fontSize: "1rem", // smaller font
            lineHeight: "1.1",
            textAlign: "center",
          }}
        >
          {time}
        </h3>
        <div
          className="weather-info"
          style={{
            textAlign: "center",
            fontSize: "1rem", // smaller font
            lineHeight: "1.3",
          }}
        >
          <h3 style={{ margin: "4px 0" }}>{temp}{unit}</h3>
          
          <p style={{ fontStyle: "italic", fontSize: "0.75rem", margin: "4px 0" }}>
            {toTitleCase(description)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HourlyForecastCard;
