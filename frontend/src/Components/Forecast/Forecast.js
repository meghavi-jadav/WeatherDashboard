import React from 'react'
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

const Forecast = ({selectedCity}) => {
    const [forecastData, setForecastData] = useState(null);

    const apiKey = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        const fetchForecast = async () => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric`
            );
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            // Filter the forecast data to get daily forecasts
            const dailyForecasts = data.list.filter((item, index) => index % 8 === 0);
            setForecastData(dailyForecasts);
          } catch (error) {
            console.error("Error fetching forecast data:", error);
          }
        };
    
        fetchForecast();
      }, [selectedCity, apiKey]);
    
      if (!forecastData) {
        return <div>Loading forecast...</div>;
      }
    
      return (
        <Grid container spacing={2}>
          {forecastData.map((forecast, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{new Date(forecast.dt * 1000).toLocaleDateString()}</Typography>
                  <Typography variant="body2">Temperature: {forecast.main.temp}°C</Typography>
                  <Typography variant="body2">
                    {forecast.weather[0].description}
                  </Typography>
                  <img
                    src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
}

export default Forecast