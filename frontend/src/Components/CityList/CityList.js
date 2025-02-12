
//importing necsessary modules and components
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CityList.css";
import Spinner from "react-bootstrap/Spinner";

//API key and URL
const API_KEY = process.env.REACT_APP_API_KEY;
const CITIES_API_URL = process.env.REACT_APP_API_URL;


//CityList component
const CityList = ({ setSelectedCity,mode}) => {
  //using states
  const [weatherData, setWeatherData] = useState([]); //for storing weather data
  const [searchTerm, setSearchTerm] = useState(""); //for storing search term
  const citiesPerPage = 10; //for storing number of cities per page
  const [loadedCities, setLoadedCities] = useState(citiesPerPage); //for storing number of loaded cities
  const [cities, setCities] = useState([]); //for storing city names
  const [filteredCities, setFilteredCities] = useState([]); //for storing filtered city names
  const [loading, setLoading] = useState(false); //for storing loading status

  //fetching city names from city names url and storing in cities state ----------------------------------------------------------------
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(CITIES_API_URL);
        const data = await response.json();

        // Check if the response contains the expected data structure(this is done to avoid any errors because the response was not proper)
        if (data && !data.error && Array.isArray(data.data)) {
          // Filter cities to include only those in India and remove any special characters for better search results
          const indianCities = data.data
            .filter((city) => city.country === "India") // Access the country property
            .map((city) => city.city)
            .map((city) =>
              city
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s*\(.*?\)\s*/g, "")
            );

          setCities(indianCities); // Store indian city names
        } else {
          console.error("Unexpected data structure in response:", data); //if the response is not proper , it will show this error
        }
      } catch (error) {
        console.error("Error fetching city names:", error);
      }
    };

    fetchCities();
  }, []);

  //fetching weather data for the cities and storing in weatherData state ----------------------------------------------------------------
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (filteredCities.length > 0) {
        //filtered cities is been set in the below useEffect
        try {
          let results = [...weatherData]; // Keep previous weather data in the results array
          let fetchedCities = results.map((w) => w.name.toLowerCase());//fetching the city names from the weather data to check if the city is already fetched
          let newWeatherData = []; // Store only valid weather data
          let index = 0; // Start from the first filtered city

          while (
            newWeatherData.length < citiesPerPage && // Load only the number of cities per page
            index < filteredCities.length//index should be less than the filtered cities length
          ) {
            let city = filteredCities[index];

            if (!fetchedCities.includes(city.toLowerCase())) {//if the city is not already fetched
              const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEY}`
              );

              if (response.ok) {
                const data = await response.json();
                newWeatherData.push(data); // Store only valid data
              } else if (response.status === 404) {
                console.clear();
                // throw new Error(`City not found: ${city}`);
                // console.warn(`City not found: ${city}`);
              } else {
                console.log("went something wrong");
              }
            }

            index++; // Move to the next city
          }

          // Update state with only valid cities
          setWeatherData((prev) => [...prev, ...newWeatherData]); //set the weather data
        } catch (error) {
          console.warn("Error fetching weather data:", error); //if any error occurs while fetching the weather data
        }
      }
    };

    fetchWeatherData();//calling the function
  }, [filteredCities, loadedCities]); // Refetch when search/filter changes
 

  //filtering the cities based on the search term -----------------------------------------------------------------
  useEffect(() => {
    if (searchTerm.length >= 2) {
      //if the search term length is greater than or equal to 2
      const newFilteredCities = cities.filter(
        (city) => city.toLowerCase().startsWith(searchTerm.toLowerCase()) // Filter cities based on search term
      );
      setFilteredCities(newFilteredCities); // Show filtered list when search term is entered
    } else {
      setFilteredCities(cities.slice(0, loadedCities)); // Show all cities when search term is empty but only loaded cities
    }
  }, [searchTerm, cities, loadedCities]); //refetch when search term or loaded cities changes

  

  //function to load more cities --------------------------------------------------------------------------------
  const loadMoreCities = () => {
    setLoading(true); // Show loading spinner
    setTimeout(() => {
      setLoadedCities((prev) => Math.min(prev + citiesPerPage, cities.length)); // Load more cities takes minimum of the two values
      setLoading(false);
    }, 1000);
  };

  //displaying the cities -----------------------------------------------------------------------------------------
  const displayedCities = filteredCities // Display only cities with valid weather data
    .map((city) => {
      const weather = weatherData.find(
        // Find weather data for the city
        (w) => w.name.toLowerCase() === city.toLowerCase() //find the weather data for the specific city using find to match the city name
      );

      if (
        weather &&
        weather.main &&
        typeof weather.main.temp_min === "number" && //extra check to make sure the data is valid
        typeof weather.main.temp_max === "number"
      ) {
        return weather; // Return weather data if it exists and has valid temperatures
      } else {
        return null; // Return null if weather data is missing or has invalid temperatures
      }
    })
    .filter((city) => city !== null); // Filter out cities which do not have null objects in the array

  //function to handle search input change ----------------------------------------------------------------------
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value)) {
      //only letters are allowed
      setSearchTerm(value); //set the search term
    }
  };

  //for displaying the list on top------------------------------------------------------------------------
  const tableRef = useRef(null); // Reference to the table element

  useEffect(() => {
    // Scroll to the bottom of the table when new cities are loaded
    if (tableRef.current) {
      // Check if the table element exists
      tableRef.current.scrollTop = tableRef.current.scrollHeight; // Scroll to the bottom of the table
    }
  }, [displayedCities]);

  //alert if no matches found------------------------------------------------------------------------------------
  useEffect(() => {
    const timeout = setTimeout(() => {if (searchTerm && filteredCities.length === 0) {
      // Check if search term is entered and no matches are found
      alert("No matches found!");
    }}, 500);

    return () => clearTimeout(timeout);
    
  }, [searchTerm, filteredCities]);

  return (
    <div className="citylist-container">
      {
        //loading spinner
        loading && (
          <Spinner
            className={
              mode === "light" ? "loader-icon-light" : "loader-icon-dark"
            }
            animation="border"
            role="status"
          ></Spinner>
        )
      }
      
      <input
      //search bar
        type="text"
        className={mode === "light" ? "search-bar-light" : "search-bar-dark"}
        placeholder="Search city..."
        value={searchTerm}
        pattern="[A-Za-z]*"
        title="Only letters are allowed"
        // onChange={(e) => setSearchTerm(e.target.value)}
        onChange={handleSearchInputChange}
      />
      <div className="table-container">
        <div style={{ maxHeight: "400px", overflowY: "auto" }} ref={tableRef}>
          <table
            className={mode === "light" ? "table-ct-light" : "table-ct-dark"}
          >
            <thead>
              <tr>
                <th
                  className={
                    mode === "light" ? "table-head-light" : "table-head-dark"
                  }
                >
                  City
                </th>
                <th
                  className={
                    mode === "light" ? "table-head-light" : "table-head-dark"
                  }
                >
                  Min Temp (&deg;C)
                </th>
                <th
                  className={
                    mode === "light" ? "table-head-light" : "table-head-dark"
                  }
                >
                  Max Temp (&deg;C)
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedCities.map((city, index) => (
                <tr
                  className={
                    mode === "light" ? "table-data-light" : "table-data-dark"
                  }
                  key={index}
                >
                  <td>
                    <button
                      className={
                        mode === "light"
                          ? "btn-cityname-light"
                          : "btn-cityname-dark"
                      }
                      onClick={() => setSelectedCity(city.name)}
                    >
                      {city.name}
                    </button>
                  </td>
                  <td>{city.main?.temp_min  || "N/A"}</td>
                  <td>{city.main?.temp_max || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {loadedCities <= filteredCities.length && (
        <div
          className={
            mode === "light"
              ? "load-more-container-light"
              : "load-more-container-dark"
          }
          disabled={loading}
        >
          <button className="btn" onClick={loadMoreCities}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CityList;


