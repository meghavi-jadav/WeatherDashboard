
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './CityList.css'


const API_KEY = "c84d90a747b71c83cfbfbafc752196b9";
const CITIES_API_URL = "https://countriesnow.space/api/v0.1/countries/population/cities"; 

const CityList = ({ setSelectedCity }) => {
const [weatherData, setWeatherData] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [citiesPerPage] = useState(10);
const [loadedCities, setLoadedCities] = useState(citiesPerPage); 
const [cities, setCities] = useState([]); 
const [filteredCities, setFilteredCities] = useState([]);
  
  

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
//console.log("cities",cities);

//---------------------------------------------//
// useEffect(() => {
//     const fetchWeatherData = async () => {
//         if (cities.length > 0) {
//             try {
//               const results = [...weatherData]; // Keep previously fetched data
//               let index = results.length; // Start fetching from where we left off
//               while (results.length < loadedCities && index < cities.length) {
//                     const city = cities[index];
//                     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEY}`);
 
//                     if (response.ok) {
//                       const data = await response.json();
//                       results.push(data); // Append new data
//                    } else {
//                        console.warn(`City not found: ${city}`);
//                   }
//                     index++;
//               }
 
//               setWeatherData(results); // Update state with previous and new data
//             } catch (error) {
//                  console.error("Error fetching weather data:", error);
//             }
//       }
//     };
 
//   fetchWeatherData();
// }, [loadedCities, cities]); 

  console.log("weather data",weatherData);

  
useEffect(() => {
  const fetchWeatherData = async () => {
    if (filteredCities.length > 0) {
      try {
        const results = [...weatherData]; // Keep previously fetched data
        let fetchedCities = results.map(w => w.name.toLowerCase());
        
        for (let city of filteredCities.slice(0, loadedCities)) {
          if (!fetchedCities.includes(city.toLowerCase())) {
            const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEY}`
            );
            if (response.ok) {
              const data = await response.json();
              if(data.main && typeof data.main.temp_min === 'number' && typeof data.main.temp_max === 'number'){
              results.push(data);
            }
            } else {
              console.warn(`City not found: ${city}`);
            }
          }
        }
 
        setWeatherData(results);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };
 
  fetchWeatherData();
}, [filteredCities, loadedCities]); // Re-fetch on search or load more


useEffect(() => {
  const fetchWeatherData = async () => {
      if (filteredCities.length > 0) {
          try {
              let results = [...weatherData]; // Keep previous weather data
let fetchedCities = results.map(w => w.name.toLowerCase());
              let newWeatherData = []; // Store only valid weather data
              let index = 0; // Start from the first filtered city

              while (newWeatherData.length < citiesPerPage && index < filteredCities.length) {
                  let city = filteredCities[index];

                  if (!fetchedCities.includes(city.toLowerCase())) {
                      const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEY}`
                      );

                      if (response.ok) {
                          const data = await response.json();
                          newWeatherData.push(data); // Store only valid data
                      } else {
                          console.warn(`City not found: ${city}`);
                      }
                  }

                  index++; // Move to the next city
              }

              // Update state with only valid cities
              setWeatherData(prev => [...prev, ...newWeatherData]);
          } catch (error) {
              console.error("Error fetching weather data:", error);
          }
      }
  };

  fetchWeatherData();
}, [filteredCities, loadedCities]); // Refetch when search/filter changes


//---------------------------------------------//
// const filteredCities = weatherData.filter(city =>
//   city.name && city.main && typeof city.main.temp_min === 'number' && typeof city.main.temp_max === 'number' &&
//   (searchTerm.length < 2 || city.name.toLowerCase().includes(searchTerm.toLowerCase()))
// );

// 
// console.log("weather data",weatherData);
// console.log("filtered cities",filteredCities);

useEffect(() => {
  if (searchTerm.length >= 2) {
    const newFilteredCities = cities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(newFilteredCities);
  } else {
    setFilteredCities(cities.slice(0, loadedCities)); // Show initial list when no search
  }
}, [searchTerm, cities, loadedCities]);


const loadMoreCities = () => {
  setLoadedCities(prev => Math.min(prev + citiesPerPage, cities.length)); 
  // Load more cities
};

// const reloadCities = () => {
//   setLoadedCities(10); // Load more cities
// };
//   const loadMoreCities = () => {
//     setLoadedCities(prev => Math.min(prev + citiesPerPage, filteredCities.length));
// };

// const displayedCities = filteredCities.slice(0, loadedCities).map(city => {
//   return weatherData.find(weather => weather.name === city);
// }).filter(city => city !== undefined);

// const displayedCities = filteredCities
//   .map(city => {
//     const weather = weatherData.find(w => w.name.toLowerCase() === city.toLowerCase());
//     return weather ? weather : { name: city, main: { temp_min: "N/A", temp_max: "N/A" } };
//       });

const displayedCities = filteredCities.map(city => {
  const weather = weatherData.find(w => w.name.toLowerCase() === city.toLowerCase());

  if (weather && weather.main && typeof weather.main.temp_min === 'number' && typeof weather.main.temp_max === 'number') {
    return weather; // Return weather data if it exists and has valid temperatures
  } else {
    return null; // Return null if weather data is missing or has invalid temperatures
  }
}).filter(city => city !== null); // Filter out null values

// const displayedCities = weatherData.filter(city => city.main && typeof city.main.temp_min === "number" && typeof city.main.temp_max === "number" );
// console.log("display cities",displayedCities);

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
        <table >
          <thead>
            <tr>
              <th>City</th>
              <th>Min Temp (&deg;C)</th>
              <th>Max Temp (&deg;C)</th>
            </tr>
          </thead>
          <tbody>
                {displayedCities.map((city, index) => {

                  return city.main?.temp_min != null && city.main?.temp_max != null ?(
                  <tr key={index}>
                    
                    <td><button onClick={() => setSelectedCity(city.name)}>{city.name}</button></td>
                    <td>{city.main?.temp_min || "N/A"}</td> 
                    <td>{city.main?.temp_max || "N/A"}</td>
                  </tr>):null
                  
              })}
          </tbody>
         
        </table>
      </div>

    {loadedCities <= filteredCities.length && (
      <div className="load-more-container">
          <button className="btn" onClick={loadMoreCities}>
              Load More
          </button>
      </div>
    
    )}

  </div>
);
};

export default CityList;







