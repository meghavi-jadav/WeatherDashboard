import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css";
import img1 from "./spune.jpg";

// Mocked API call to fetch city details
const fetchCityDetails = async (city) => {
  // Replace this with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: city, temperature: `${Math.floor(Math.random() * 30) + 20}°C`, description: "Sunny weather" });
    }, 1000);
  });
};

export default function Slider() {
  const [cities, setCities] = useState([
    { name: "Pune", img: img1 },
    { name: "Mumbai", img: img1 },
    { name: "Delhi", img: img1 }
  ]);

  const [cityDetails, setCityDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const details = {};
      for (const city of cities) {
        details[city.name] = await fetchCityDetails(city.name);
      }
      setCityDetails(details);
    };
    fetchData();
  }, [cities]);

  return (
    <div className="slider-container">
      <Carousel data-bs-theme="dark" controls={false} interval={2000} pause="hover">
        {cities.map((city, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={city.img} alt={`${city.name} slide`} />
            <Carousel.Caption>
              <h3>{city.name}</h3>
              <p>{cityDetails[city.name]?.temperature}</p>
              <p>{cityDetails[city.name]?.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}