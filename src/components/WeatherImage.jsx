import React from 'react'
import Clear from '../assets/clear.png'
import Cloud from '../assets/cloud.png'
import Drizzle from '../assets/drizzle.png'
import Rain from '../assets/rain.png'
import Snow from '../assets/snow.png'
import './Weather.css'
const WeatherImage = ({ weatherData }) => {
  const iconChange = () => {
    if (
      weatherData.weather[0].icon === '01d' ||
      weatherData.weather[0].icon === '01n'
    ) {
      return Clear
    } else if (
      weatherData.weather[0].icon === '02d' ||
      weatherData.weather[0].icon === '02n'
    ) {
      return Cloud
    } else if (
      weatherData.weather[0].icon === '03d' ||
      weatherData.weather[0].icon === '03n'
    ) {
      return Drizzle
    } else if (
      weatherData.weather[0].icon === '04d' ||
      weatherData.weather[0].icon === '04n'
    ) {
      return Drizzle
    } else if (
      weatherData.weather[0].icon === '09d' ||
      weatherData.weather[0].icon === '09n'
    ) {
      return Rain
    } else if (
      weatherData.weather[0].icon === '010d' ||
      weatherData.weather[0].icon === '010n'
    ) {
      return Rain
    } else if (
      weatherData.weather[0].icon === '013d' ||
      weatherData.weather[0].icon === '013n'
    ) {
      return Snow
    } else return Clear
  }
  return (
    <div className='weather-image'>
      <img src={iconChange()} alt='Cloud' />
    </div>
  )
}

export default WeatherImage
