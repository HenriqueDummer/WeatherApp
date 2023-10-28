const TodayForecast = (props) => {
    const hourData = props.hourData
    return(
        <div className="today_foracast section">
        <h3>Today's Forecast</h3>
        <div className="forecast_flex">
          {
            hourData.forecast.forecastday[0].hour.map((hour) => {
              let formatedHour = hour.time.split('').slice(-5, -3).join('')
              if(formatedHour % 3 === 0 && formatedHour > 5){
                return ( 
                  <div key={hour.time} className="hour_forecast">
                    <span>{hour.time.split('').slice(-5).join('')}</span>
                    <img src={hour.condition.icon} alt="" />
                    <p>{Math.round(hour.temp_c)}°</p>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    )
}

export default TodayForecast