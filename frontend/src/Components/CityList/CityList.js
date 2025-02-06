import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './CityList.css'


const API_KEY = "c84d90a747b71c83cfbfbafc752196b9";
const CITIES_API_URL = "https://countriesnow.space/api/v0.1/countries/population/cities"; 

const CityList = ({ setSelectedCity }) => {
const [weatherData, setWeatherData] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [citiesPerPage, setCitiesPerPage] = useState(10);
const [loadedCities, setLoadedCities] = useState(citiesPerPage); 
const [cities, setCities] = useState([]); 
  
  

useEffect(() => {
    const fetchCities = async () => {
      try {
          const response = await fetch(CITIES_API_URL);
          const data = await response.json();

          // Check if the response contains the expected data structure
          if (data && !data.error && Array.isArray(data.data)) {
              // Filter cities to include only those in India
              const indianCities = data.data
              .filter(city => city.country === "India") // Access the country property
              .map(city => city.city)
              .map(city=>city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s*\(.*?\)\s*/g, '') ); // Access the city name property
              setCities(indianCities); // Store the filtered city names
          } else {
            console.error("Unexpected data structure:", data);
          }
          
        

        } catch (error) {
        console.error("Error fetching city names:", error);
        }
    };

    fetchCities();
}, []);


useEffect(() => {
    const fetchWeatherData = async () => {
        if (cities.length > 0) {
            try {
              const results = [...weatherData]; 
              // Keep previously fetched data
              let index = results.length; 
              // Start fetching from where we left off
              while (results.length < loadedCities && index < cities.length) {
                    const city = cities[index];
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEY}`);
 
                    if (response.ok) {
                      const data = await response.json();
                      results.push(data); 
                      // Append new data
                   } else {
                       console.warn(`City not found: ${city}`);
                  }
                    index++;
              }
 
              setWeatherData(results); 
              // Update state with previous and new data
            } catch (error) {
                 console.error("Error fetching weather data:", error);
            }
      }
    };
 
  fetchWeatherData();
}, [loadedCities, cities]); 

  
  
//---------------------------------------------//
const filteredCities = weatherData.filter(city =>
  city.name && city.main && typeof city.main.temp_min === 'number' && typeof city.main.temp_max === 'number' &&
  (searchTerm.length < 2 || city.name.toLowerCase().includes(searchTerm.toLowerCase()))
);


const loadMoreCities = () => {
  setLoadedCities(prev => Math.min(prev + citiesPerPage, cities.length)); 
  // Load more cities
};

return (
  <div className="citylist-container">
    <input
      type="text"
      className="search-bar"
      placeholder="Search city..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Min Temp (&deg;C)</th>
              <th>Max Temp (&deg;C)</th>
            </tr>
          </thead>
          <tbody>
              {filteredCities.map((city, index) => (
                <tr key={index}>
                  <td><button onClick={() => setSelectedCity(city.name)}>{city.name}</button></td>
                  <td>{city.main?.temp_min || "N/A"}</td> 
                  <td>{city.main?.temp_max || "N/A"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

    {loadedCities <= filteredCities.length && (
      <div className="load-more-container">
          <button className="btn btn-primary" onClick={loadMoreCities}>
              Load More
          </button>
      </div>
    
    )}

  </div>
);
};

export default CityList;



