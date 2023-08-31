import React, { useState } from 'react'
import './Weather.css'
import Humidity from '../assets/humidity.png'
import WeatherImage from './WeatherImage'
import Search from '../assets/search.png'
import Wind from '../assets/wind.png'
import weatherTempData from './weatherData.json'

export const Weather = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(weatherTempData)
  const handleCityChange = (event) => {
    setCity(event.target.value)
  }
  const createToast = (message, type) => {
    const toast = document.createElement('div')
    toast.classList.add('toast', type)
    toast.innerHTML = message
    document.body.appendChild(toast)
    setTimeout(() => {
      toast.remove()
    }, 3000)
  }

  const searchCity = async () => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
    if (city === '') {
      createToast('Please enter the city', 'error')
      return 0
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=Metric`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.cod === 200) {
        setWeatherData(data)
        console.log(data)
      } else if (data.cod === '404') {
        // handle city not found error
        createToast(`${data.message} Please check the input`, 'error')
      } else if (data.cod === 429) {
        // handle API rate limit exceeded error
        createToast(`API rate limit exceeded: ${data.message}`, 'error')
      } else {
        // handle other errors
        createToast(
          `An error occurred while fetching weather data: ${data.message}`,
          'error'
        )
      }
    } catch (error) {
      // handle network error
      createToast(`An error occurred: ${error.message}`, 'error')
    }
  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type='text'
          className='cityInput'
          placeholder='Search'
          onChange={handleCityChange}
        />
        <div
          className='search-icon'
          onClick={() => {
            searchCity()
          }}
        >
          <img src={Search} alt='Search' />
        </div>
      </div>
      <WeatherImage weatherData={weatherData} />

      <div className='weather-temp'>{Math.floor(weatherData.main.temp)}°C</div>
      <div className='weather-location'>{weatherData.name}</div>

      <div className='data-container'>
        <div className='element'>
          <img src={Humidity} alt='' className='icon' />
          <div className='data'>
            <div className='humidity-per'>{weatherData.main.humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>

        <div className='element'>
          <img src={Wind} alt='' className='icon' />
          <div className='data'>
            <div className='humidity-per'>
              {Math.floor(weatherData.wind.speed)} km/h
            </div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}
