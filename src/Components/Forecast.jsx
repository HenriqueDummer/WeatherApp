const Forecast = (props) => {
    const forecastData = props.forecastData
    return(
        <div className="forecast_container section">
        <h3>3-DAY FORECAST</h3>
        <div className="forecast_display">
        {forecastData &&
          forecastData.forecast.forecastday.map((day) => {
            return (
              <div key={day.date} className="forecast">
                <p>{day.date.slice(-5)}</p>
                <div>
                  <img src={day.day.condition.icon} alt="" />
                  <p>{day.day.condition.text}</p>
                </div>
                <p className='temp'>{`${Math.round(day.day.maxtemp_c)}/`}<span>{`${Math.round(day.day.mintemp_c)}`}</span></p>
              </div>
            )
            
          })
        }
        </div>
      </div>
    )
}

export default Forecast