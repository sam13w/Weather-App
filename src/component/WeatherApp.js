import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
    const [search, setSearch] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_KEY = "22d9a9c6208129ed8787c07f17b851a0";

    const fetchWeather = async () => {
        if (!search) return;
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
            console.log(response.data);
            setWeatherData(response.data);
        } catch (err) {
            setError("City not found. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-app">
            <h1>Weather App</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search for a city..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <div className='search-btn'>
                <IoIosSearch onClick={fetchWeather} className="search-icon" />
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <h3>{Math.round(weatherData.main.temp)}°C</h3>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} km/h</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;