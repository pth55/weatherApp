import React, { useEffect, useRef, useState } from 'react';
import './WeatherCard.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import cloud_icon from "../assets/cloud.png"

function WeatherCard() {
    // local state for storing all weather info
    const [weather, setWeather] = useState({}); 

    const inputCity = useRef();

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }


    const search = async (city) => {
        if(city === "") {
            alert("LOOK AT YOUR CITY NAME! IT'S EMPTY 😑");
        }
        else {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_KEY}`;
                const data = await fetch(url);
                const res = await data.json();
                // what if user entered wrong city name then res is empty
                if(!data.ok) {
                    alert(res.message);
                    return;
                }

                const icon = allIcons[res.weather[0].icon] || clear_icon;
                const final_data = {
                    icon: icon,
                    name: res.name,
                    temp: Math.floor((res.main.temp - 273.15)),
                    humidity: res.main.humidity,
                    wind_speed: res.wind.speed
                }
    
                // update the state
                setWeather(final_data);
            } catch(e) {
                setWeather(false);
                console.error("ERROR WHILE FETCHING DATA FROM BE!!");
            }
        }
    }

    // we have to call this search function when component get's loaded
    useEffect(() => {
        search("Egypt");
    }, []);

    return(
        <div className='card'>
            <div className='search-bar'>
                {/* ref is used to get the input value into inputCity */}
                <input ref={inputCity} type="text" placeholder='Enter City Name'/>

                <img src={search_icon} alt="not found" onClick={() => search(inputCity.current.value)}/>
            </div>
            {/* <div className='weather-data'> */}
            {/* </div> */}
            
            {/* ternary operator if data is false - mean there is no data then we have to display empty details */}
            {weather?<>
                <img className='weather-icon' src={weather.icon} alt="not found" />
                <p className='temp'>{weather.temp}°C</p>
                <p className='location'>{weather.name}</p>
                <div className='weather-data'>
                    <div className="col">
                        <img src={humidity_icon} alt="not found" />
                        <div>
                            <p>{weather.humidity}% </p> <span>Humidity</span>
                        </div>
                    </div>

                    <div className="col">
                        <img src={wind_icon} alt="not found" />
                        <div>
                            <p>{weather.wind_speed} km/h </p> <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </>:<></>
            }
        </div>
    )
}

export default WeatherCard;

