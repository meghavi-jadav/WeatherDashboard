import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css";
import img1 from "./images/spune.jpg";
import img2 from "./images/mumbai.jpg";
import img3 from "./images/delhii.jpg";
 
// Mocked API call to fetch city details
const fetchCityDetails = async (city) => {
  // Replace this with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: city,
        temperature: `${Math.floor(Math.random() * 30) + 20}°C`,
        description: "Sunny weather",
      });
    }, 1000);
  });
};
 
export default function Slider() {
  const [cities, setCities] = useState([
    { name: "Pune", img: img1 },
    { name: "Mumbai", img: img2 },
    { name: "Delhi", img: img3 },
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
    <Carousel 
    data-bs-theme="dark"
    controls={false}
    interval={2500}
    pause="hover">
        {cities.map((city, index) => (
          <Carousel.Item key={index}>
            <div className="slider-image">
              <img className="d-block w-100" src={city.img} alt={`${city.name} slide`}/>
              <div className="overlay">
                <div className="city-info">
                  <h3>{city.name}</h3>
                  <p>{cityDetails[city.name]?.temperature}</p>
                </div>
              </div>
            </div> 
          </Carousel.Item>
        ))}
      </Carousel>
  );
}


// import React, { useEffect, useState } from 'react';

// const cities = ['Pune', 'Mumbai', 'Delhi'];
// const apiKey = 'c84d90a747b71c83cfbfbafc752196b9';

// export default function Slider() {
//   const [temperatures, setTemperatures] = useState({});

//   useEffect(() => {
//     const fetchTemperatures = async () => {
//       const temps = {};
//       for (const city of cities) {
//         const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//         const response = await fetch(weatherUrl);
//         const data = await response.json();
//         temps[city] = data.main.temp;
//       }
//       setTemperatures(temps);
//     };

//     fetchTemperatures();
//   }, []);

//   return (
//     <div className='slider-container'>
//       {cities.map((city) => (
//         <div key={city} className='city'>
//           <h3>{city}</h3>
//           <p>{temperatures[city]}°C</p>
//         </div>
//       ))}
//     </div>
//   );
// }
