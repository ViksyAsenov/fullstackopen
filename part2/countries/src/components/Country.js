import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.altSpellings[0].toLowerCase()}&APPID=${process.env.REACT_APP_WEATHER_KEY}`)
      .then(response => {
        const weatherData = response.data;
        setWeather([weatherData])
      }).catch(error => {
        console.log(error);
    })
  })

  let languages = []
  Object.keys(country.languages).forEach(key => {
      languages.push(country.languages[key])
  })

  let currentWeather = {}
  if (weather.length > 0) {
    currentWeather = weather[0].current
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>population: {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
      {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags['png']} alt="Country flag"></img>
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature: {currentWeather.temperature} Celcius</p>
      <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
    </div>
  )
}

export default Country