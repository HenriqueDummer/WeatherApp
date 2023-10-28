import { useEffect, useState } from 'react'

import Forecast from './Components/Forecast'
import TodayForecast from './Components/TodayForecast'
import Conditions from './Components/Conditions'

function App() {
  const [data, setData] = useState()
  const [hourData, setHourData] = useState()
  const [date, setDate] = useState()
  const [forecastData, setForecastData] = useState()
  const [autoComplete, setAutoComplete] = useState([])
  const [query, setQuery] = useState()
  const d = new Date()

  const fetchData = async (q) => {
    const url = q;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '9fd3f83237msh466cdb5efff2344p1485f6jsn29f9d07072c8',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options)
      const result = await response.json()
      return result
    } catch (error) {
      console.error(error)
    }
  } 


  const fetchCurrentData = async (q) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${q}`;
    
    const result = await fetchData(url)
    console.log(result)
    if(result){
      setData(result)
    }
  } 

  const fetchHourData = async (q, date) => {
    const url = `https://weatherapi-com.p.rapidapi.com/history.json?q=${q}&dt=${date}&lang=en`
    const result = await fetchData(url)
    if(result){
      setHourData(result)
    }
  }

  const fetchForecast = async (q) => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${q}&days=3`;
    const result = await fetchData(url)
    if(result){
      setForecastData(result)
    }
  }

  const fetchAutoComplete = async (q) => {
    const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${q}`;
    const result = await fetchData(url)
    setAutoComplete(result)
  }


  useEffect(() => {
    const success = async (position) => {
      const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      setDate(date)
      const lon = position.coords.longitude
      const lat = position.coords.latitude
      await fetchCurrentData(`${lat},${lon}`)
      await fetchHourData(`${lat},${lon}`, date)
      await fetchForecast(`${lat},${lon}`)
    }

    const error = () => {
      console.log(error)
    }

    navigator.geolocation.getCurrentPosition(success, error)

  },[])

  useEffect(() => {
    const fetchCitySuggestions = async () => {
      if (query) {
        try {
          await fetchAutoComplete(query)
        } catch (error) {
          console.error('Error fetching city suggestions:', error);
        }
      }
    };

    fetchCitySuggestions()
  },[query])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(query){
      fetchCurrentData(query)
      fetchHourData(query, date)
    }
  }
  
  const handleChange = (e) => {
    setQuery(e.target.value)
    console.log(autoComplete)
  }

  const handleClick = (q) => {
    fetchCurrentData(q)
    fetchHourData(q, date)
    fetchForecast(q)
    setAutoComplete([])
    setQuery('')
  }

  const resizeIcon = (url) => {
    const baseUrl = 'https://cdn.weatherapi.com/weather/128x128'
    const id = url.split('').slice(-7, -4).join('')
    const time = url.split('').slice(-13, -8).join('')

    return time === 'night' ? `${baseUrl}/${time}/${id}.png` : `${baseUrl}/day/${id}.png`

  }

  return (
    <>
      {data && hourData && forecastData ?
      <>
        <div className="main_container">
          <div className="glow_effect glow1"></div>
          <div className="glow_effect glow2"></div>
          <div className='today'>
            <div className="search_container">
              <div className="search">
                <input 
                  type="text"
                  placeholder='Search for cities' 
                  onChange={e => handleChange(e)}
                  value={query}
                />
                {autoComplete.length != 0 &&
                  <div className="suggestions">
                    {autoComplete.map((city) => {
                      console.log('autoComplete')
                      console.log(city)
                      return(
                        <button onClick={() => handleClick(city.name)} className="city">
                          <h2>{`${city.name},`} <span>{`${city.region}`}</span></h2>
                        </button>
                      )
                    })}
                  </div>
                  }
                </div>
                <button className='search_btn' onClick={e => handleSubmit(e)}>
                  <i className="bi bi-search"></i>
                </button>
            </div>
            <div className="header">
              <div className="header_text">
                <div>
                  <h1>{data.location.name}</h1>
                  <p>{data.current.condition.text}</p>
                </div>
                <div>
                  <h2>{data.current.temp_c}°C</h2>
                </div>
              </div>
              <div className="header_icon">
                <img src={resizeIcon(data.current.condition.icon)} alt="" />
              </div>
            </div>
            <TodayForecast hourData={hourData} />
            <Conditions hourData={hourData} data={data}/>
          </div>
         <Forecast forecastData={forecastData} />
          
        </div>
      </>
      :
      <>
        <div className="error_message">
          <h1>Something went wrong</h1>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/something-went-wrong-4344457-3613885.png" alt="" />
        </div>
      </>
      }
    </>
  )
}

export default App
