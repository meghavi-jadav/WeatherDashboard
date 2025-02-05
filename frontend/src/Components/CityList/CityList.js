// CityList.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './CityList.css';

const API_KEY = "c84d90a747b71c83cfbfbafc752196b9";
const CITIES_API_URL = "https://countriesnow.space/api/v0.1/countries/population/cities"; 

const CityList = ({ setSelectedCity }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [citiesPerPage, setCitiesPerPage] = useState(10);
  const [loadedCities, setLoadedCities] = useState(10); 
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(CITIES_API_URL);
        const data = await response.json();
        if (data && !data.error && Array.isArray(data.data)) {
          const indianCities = data.data
            .filter(city => city.country === "India")
            .map(city => city.city);
          setCities(indianCities);
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
          const requests = cities.slice(0, loadedCities).map(city =>
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEY}`)
              .then(response => response.json())
          );

          const results = await Promise.all(requests);
          setWeatherData(results);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [loadedCities, cities]);

  const filteredCities = weatherData.filter(city =>
    searchTerm.length < 2 || city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCities = filteredCities.slice(0, loadedCities);

  const loadMoreCities = () => {
    setLoadedCities(prev => Math.min(prev + citiesPerPage, cities.length));
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
        <table className="table">
          <thead>
            <tr>
              <th>City</th>
              <th>Min Temp (&deg;C)</th>
              <th>Max Temp (&deg;C)</th>
            </tr>
          </thead>
          <tbody>
            {currentCities.map((city, index) => (
              <tr key={index}>
                <td><button id="cityname-button" onClick={() => setSelectedCity(city.name)}>{city.name}</button></td>
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


// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import './CityList.css'

// const API_KEY = "c84d90a747b71c83cfbfbafc752196b9";
// const CITIES_API_URL = "https://countriesnow.space/api/v0.1/countries/population/cities"; 

// const CityList = () => {
//   const [weatherData, setWeatherData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [citiesPerPage, setCitiesPerPage] = useState(10);
//   const [loadedCities, setLoadedCities] = useState(10); 
//   const [cities, setCities] = useState([]); // State to hold city names

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await fetch(CITIES_API_URL);
//         const data = await response.json();
    
//         // Check if the response contains the expected data structure
//         if (data && !data.error && Array.isArray(data.data)) {
//           // Filter cities to include only those in India
//           const indianCities = data.data
//             .filter(city => city.country === "India") // Access the country property
//             .map(city => city.city); // Access the city name property
    
//           setCities(indianCities); // Store the filtered city names
//         } else {
//           console.error("Unexpected data structure:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching city names:", error);
//       }
//     };

//     fetchCities();
//   }, []);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       if (cities.length > 0) {
//         try {
//           const requests = cities.slice(0, loadedCities).map(city =>
//             fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEY}`)
//               .then(response => response.json())
//           );

//           const results = await Promise.all(requests);
//           setWeatherData(results);
//         } catch (error) {
//           console.error("Error fetching weather data:", error);
//         }
//       }
//     };

//     fetchWeatherData();
//   }, [loadedCities, cities]); // Fetch weather data whenever loadedCities or cities change

//   console.log(weatherData)
 

//   const filteredCities = weatherData.filter(city =>
//     searchTerm.length < 2 || city.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const currentCities = filteredCities.slice(0, loadedCities); // Show only loaded cities

//   const loadMoreCities = () => {
//     setLoadedCities(prev => Math.min(prev + citiesPerPage, cities.length)); // Load more cities
//   };

//   console.log(loadedCities, filteredCities.length)
//   return (
//     <div className="citylist-container">
//       <input
//         type="text"
//         className="search-bar"
//         placeholder="Search city..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div className="table-container">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>City</th>
//               <th>Min Temp (&deg;C)</th>
//               <th>Max Temp (&deg;C)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentCities.map((city, index) => (
//               <tr key={index}>
//                 <td>{city.name}</td>
//                 <td>{city.main?.temp_min || "N/A"}</td>
//                 <td>{city.main?.temp_max || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Load More Button */}
//       {loadedCities <= filteredCities.length && (
//         <div className="load-more-container">
//           <button className="btn btn-primary" onClick={loadMoreCities}>
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CityList;

