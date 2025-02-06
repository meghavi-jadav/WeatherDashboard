import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css";
import img1 from "./images/clear.png";
import img2 from "./images/cloud.png";
import img3 from "./images/haze.png";
import img4 from "./images/rain.png";
import img5 from "./images/smoke.png";

const cities = [
  { name: "Mumbai", img: img1 },
  { name: "Pune", img: img2 },
  { name: "Delhi", img: img3 },
  // Add more cities as needed
];

const Slider = () => {
  const [cityDetails, setCityDetails] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "c84d90a747b71c83cfbfbafc752196b9"; // Replace with your OpenWeather API key
      const fetchedData = {};

      for (const city of cities) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        fetchedData[city.name] = {
          temperature: data.main.temp,
          wind: data.wind,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          icon: data.weather.icon,
          details: data.weather[0].description,
        };
      }
      console.log(fetchedData);
      setCityDetails(fetchedData);
    };

    fetchWeatherData();
  }, []);

  const weatherImageMap = {
    clear: img1,
    cloud: img2,
    haze: img3,
    rain: img4,
    smoke: img5
  };

  return (
    <div className="slider-container">
    <Carousel
      data-bs-theme="dark"
      controls={false}
      interval={2000}
      pause="hover"
    >
      {cities.map((city, index) => {
        // Determine the weather condition for the current city
        const weatherCondition = cityDetails[city.name]?.details || "clear"; 
        // Default to "clear"

        // Get the corresponding image from the mapping object
        const imgSrc = weatherImageMap[weatherCondition] || img1; 
        // Default to clear if not found

        return (
          <Carousel.Item key={index} className="carousel">
            <div className="slider">
              <div className="top">
                <i className="fa-solid fa-location-dot"></i>
                <h5>{city.name}</h5>
              </div>

              <div className="mid">
                <div className="icon">
                  <img src={imgSrc} alt="weather-icon" />
                </div>
                <div className="details">
                  <h1>{cityDetails[city.name]?.temperature}°C</h1>
                  <h5>{weatherCondition}</h5>
                </div>
              </div>

              <div className="last">
                <p>Wind: {cityDetails[city.name]?.wind?.speed} m/s</p>
                <p>Humidity: {cityDetails[city.name]?.humidity}%</p>
                <p>Pressure: {cityDetails[city.name]?.pressure} mb</p>
              </div>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  </div>

  );
};

export default Slider;