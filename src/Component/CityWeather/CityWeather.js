import React, { useEffect, useState } from "react";
import ClearIcon from "../../ImagesAndIcons/Sunny.png"
import RainyIcon from "../../ImagesAndIcons/Rainy.png"
import CloudsIcon from "../../ImagesAndIcons/Clouds.png"
import FogIcon from "../../ImagesAndIcons/Fog.png"
import SnowIcon from "../../ImagesAndIcons/Sunny.png"
import ThunderstormIcon from "../../ImagesAndIcons/Thunderstorm.png"
import ClearSky from "../../ImagesAndIcons/ClearSky.jpg"
import RainySky from "../../ImagesAndIcons/RainySky.jpg"
import Cloudy from "../../ImagesAndIcons/Cloudy.jpg"
import Foggy from "../../ImagesAndIcons/Foggy.jpg"
import Snowy from "../../ImagesAndIcons/Snowy.jpg"
import Thunder from "../../ImagesAndIcons/ThunderStorm.jpg"
import './CityWeather.css';
import useWeatherData from '../../Context/Context.js'


const APIKEY = process.env.REACT_APP_API_KEY;

export default function CityWeather(){
    const {data,setData} = useWeatherData();
    const [weatherData,setWeatherData] = useState(null)
    const [units,setUnits] = useState("metric")


    const handleCloseBtn = ()=>{
        setWeatherData("")
        setData({...data,cityName:""})
    }

    const weatherAssets = {
        '01d': { icon: ClearIcon, background: ClearSky },
        '01n': { icon: ClearIcon, background: ClearSky },
        '02d': { icon: CloudsIcon, background: Cloudy },
        '02n': { icon: CloudsIcon, background: Cloudy },
        '03d': { icon: CloudsIcon, background: Cloudy },
        '03n': { icon: CloudsIcon, background: Cloudy },
        '04d': { icon: CloudsIcon, background: Cloudy },
        '04n': { icon: CloudsIcon, background: Cloudy },
        '09d': { icon: RainyIcon, background: RainySky },
        '09n': { icon: RainyIcon, background: RainySky },
        '10d': { icon: RainyIcon, background: RainySky },
        '10n': { icon: RainyIcon, background: RainySky },
        '11d': { icon: ThunderstormIcon, background: Thunder },
        '11n': { icon: ThunderstormIcon, background: Thunder },
        '13d': { icon: SnowIcon, background: Snowy },
        '13n': { icon: SnowIcon, background: Snowy },
        '50d': { icon: FogIcon, background: Foggy },
        '50n': { icon: FogIcon, background: Foggy },
    };

    const getWeatherAssets = () => {
        const iconKey = weatherData && weatherData.weather[0].icon;
        return weatherAssets[iconKey] || null;
    };
    
    useEffect(()=>{
        if (data.cityName) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.cityName}&units=${units}&appid=${APIKEY}`)
            .then(res=>res.json())
            .then(res=>setWeatherData(res))
            .catch(error=>console.error(error))
        }
    },[data.cityName,units])

    return (
        weatherData && weatherData.cod === 200?
        <section id="WeatherMain"
        style={{ backgroundImage: `url(${getWeatherAssets()?.background})`,color: weatherData.weather[0].main==="Clear"?"rgb(28, 26, 26)":"rgb(240, 250, 250)"}}>

            <h1 id="cityName">{data.cityName && data.cityName}</h1>

            <button id="closeBtn" onClick={handleCloseBtn}>X</button>

            <div id="units"
                onClick={() => setUnits(units === "metric" ? 'imperial' : 'metric')}>{units === "metric" ? `Imperial` : `Metric`}</div>

            <div id="weatherDataBox">
                <div id="temp">{`Temp: ${weatherData.main.temp}\u00B0${units === "metric" ? `C` : 'F'}`}</div>

                <div id="weather">{`Weather: ${weatherData.weather[0].main}`} <img id="weatherIcon" src={getWeatherAssets()?.icon} alt="weatherIcon" /></div>

                <div id="description">{`Weather Desc: ${weatherData.weather[0].description}`}</div>

                <div>{`Humidity: ${weatherData.main.humidity}%`}</div>

                <div>{`Wind Speed: ${weatherData.wind.speed} ${units === "metric" ? `meter/sec` : 'miles/hr'}`}</div>

                <div>{`Atmospheric Pressure: ${weatherData.main.pressure} hPa`}</div>

                <div>{`Max/Min Temp: ${weatherData.main.temp_max}\u00B0${units === "metric" ? `C` : 'F'}/${weatherData.main.temp_min}\u00B0${units === "metric" ? `C` : 'F'}`}</div>


            </div>

        </section>:
        <section id="wrongInputMain">
            <p>
                { weatherData && weatherData.cod==="404" && weatherData.message}
            </p>
        </section>
    )
}