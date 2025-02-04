import React, { useState, useEffect } from 'react';
const apiKey = 'c84d90a747b71c83cfbfbafc752196b9';
const initialCities = ['London', 'New York', 'Tokyo', 'Mumbai', 'Paris', 'Berlin', 'Sydney', 'Toronto', 'Dubai', 'Singapore'];
 
export default function CityList({ onCityClick }) {
  const [cities, setCities] = useState(initialCities);
  const [temperatures, setTemperatures] = useState({});
  const [visibleCities, setVisibleCities] = useState(10);
 
  useEffect(() => {
    const fetchTemperatures = async () => {
      const temps = {};
      for (const city of cities) {
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        try {
          const response = await fetch(weatherUrl);
          if (!response.ok) {
            throw new Error(`City not found: ${city}`);
          }
          const data = await response.json();
          temps[city] = {
            high: data.main.temp_max,
            low: data.main.temp_min,
          };
        } catch (error) {
          console.error(error);
          temps[city] = { high: 'N/A', low: 'N/A' };
        }
      }
      setTemperatures(temps);
    };
 
    fetchTemperatures();
  }, [cities]);
 
  const handleLoadMore = () => {
    setVisibleCities((prev) => prev + 10);
  };
 
  return (
    <div className="citylist-container">
      <table className="city-table">
        <thead>
          <tr>
            <th>City</th>
            <th>High Temp (°C)</th>
            <th>Low Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          {cities.slice(0, visibleCities).map((city) => (
            <tr key={city} onClick={() => onCityClick(city)} className="city-row">
              <td>{city}</td>
              <td>{temperatures[city]?.high}°C</td>
              <td>{temperatures[city]?.low}°C</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleCities < cities.length && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}


// import React, { useState, useEffect } from 'react';

// const apiKey = 'c84d90a747b71c83cfbfbafc752196b9';
// const initialCities = ['London', 'New York', 'Tokyo', 'Mumbai', 'Paris', 'Berlin', 'Sydney', 'Toronto', 'Dubai', 'Singapore'];

// export default function CityList({ onCityClick }) {
//     const [cities, setCities] = useState(initialCities);
//     const [temperatures, setTemperatures] = useState({});
//     const [visibleCities, setVisibleCities] = useState(10);

//     useEffect(() => {
//         const fetchTemperatures = async () => {
//             const temps = {};
//             for (const city of cities) {
//                 const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//                 try {
//                     const response = await fetch(weatherUrl);
//                     if (!response.ok) {
//                         throw new Error(`City not found: ${city}`);
//                     }
//                     const data = await response.json();
//                     temps[city] = {
//                         high: data.main.temp_max,
//                         low: data.main.temp_min,
//                     };
//                 } catch (error) {
//                     console.error(error);
//                     temps[city] = {
//                         high: 'N/A',
//                         low: 'N/A',
//                     };
//                 }
//             }
//             setTemperatures(temps);
//         };

//         fetchTemperatures();
//     }, [cities]);

//     const handleLoadMore = () => {
//         setVisibleCities((prev) => prev + 10);
//     };

//     return (
//         <div className='citylist-container'>
//             {cities.slice(0, visibleCities).map((city) => (
//                 <div key={city} className='city' onClick={() => onCityClick(city)}>
//                     <h3>{city}</h3>
//                     <p>High: {temperatures[city]?.high}°C</p>
//                     <p>Low: {temperatures[city]?.low}°C</p>
//                 </div>
//             ))}
//             {visibleCities < cities.length && (
//                 <button onClick={handleLoadMore}>Load More</button>
//             )}
//         </div>
//     );
// }
