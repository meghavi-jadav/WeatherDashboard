import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
 
const API_KEY = "c84d90a747b71c83cfbfbafc752196b9";
const cities = ["London", "New York", "Tokyo", "Paris", "Berlin", "Sydney", "Toronto", "Mumbai", "Dubai", "Moscow", "Beijing", "Madrid", "Rome", "Seoul", "Bangkok", "Singapore", "Los Angeles", "Chicago", "Istanbul", "Cairo"];
 
const CityList = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const citiesPerPage = 10;
 
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const requests = cities.map(city =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
        );
        
        const results = await Promise.all(requests);
        setWeatherData(results);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, []);
 
  const filteredCities = weatherData.filter(city =>
  searchTerm.length < 2 || city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = filteredCities.slice(indexOfFirstCity, indexOfLastCity);
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <div className="container mt-4">
      {/* <h2 className="mb-4 text-center">Weather Forecast Dashboard</h2> */}
      
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <table className="table table-bordered">
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
              <td>{city.name}</td>
              <td>{city.main?.temp_min || "N/A"}</td>
              <td>{city.main?.temp_max || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(filteredCities.length / citiesPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
 
export default CityList;

// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const API_KEY = "c84d90a747b71c83cfbfbafc752196b9";

// const CityList = () => {
//   const [weatherData, setWeatherData] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const citiesPerPage = 10;

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await fetch('./city-list.json'); // Replace with your API endpoint
//         const cityList = await response.json();
//         setCities(cityList);
//       } catch (error) {
//         console.error("Error fetching city list:", error);
//       }
//     };

//     fetchCities();
//   }, []);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const requests = cities.map(city =>
//           fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
//             .then(response => response.json())
//         );

//         const results = await Promise.all(requests);
//         setWeatherData(results);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       }
//     };

//     if (cities.length > 0) {
//       fetchWeatherData();
//     }
//   }, [cities]);

//   const filteredCities = weatherData.filter(city =>
//     searchTerm.length < 2 || city.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastCity = currentPage * citiesPerPage;
//   const indexOfFirstCity = indexOfLastCity - citiesPerPage;
//   const currentCities = filteredCities.slice(indexOfFirstCity, indexOfLastCity);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mt-4">
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Search city..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>City</th>
//             <th>Min Temp (&deg;C)</th>
//             <th>Max Temp (&deg;C)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentCities.map((city, index) => (
//             <tr key={index}>
//               <td>{city.name}</td>
//               <td>{city.main?.temp_min || "N/A"}</td>
//               <td>{city.main?.temp_max || "N/A"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <nav>
//         <ul className="pagination justify-content-center">
//           {Array.from({ length: Math.ceil(filteredCities.length / citiesPerPage) }, (_, i) => (
//             <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
//               <button onClick={() => paginate(i + 1)} className="page-link">
//                 {i + 1}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default CityList;
