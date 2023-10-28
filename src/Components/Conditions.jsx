const Conditions = (props) => {
    const data = props.data
    const hourData = props.hourData
    return (
        <div className="conditions section">
            <h3>Air Condition</h3>
            <div className="conditions_flex">
            <div className="condition">
                <div>
                <i className='bi bi-thermometer-half'></i>
                <p>Feels Like</p>
                </div>
                <span>{data.current.feelslike_c}°</span>
            </div>
            <div className="condition">
                <div>
                <i class="bi bi-cloud-rain"></i>
                <p>Precipitation</p>
                </div>
                <span>{hourData.forecast.forecastday[0].day.totalprecip_mm} mm</span>
            </div>
            <div className="condition">
                <div>
                <i class="bi bi-droplet"></i>
                <p>Humidity</p>
                </div>
                <span>{data.current.humidity}%</span>
            </div>
            <div className="condition">
                <div>
                <i class="bi bi-wind"></i>
                <p>Wind</p>
                </div>
                <span>{data.current.wind_kph} km/h</span>
            </div>
            <div className="condition">
                <div>
                <i className="bi bi-sun"></i>
                <p>UV Index</p>
                </div>
                <span>{data.current.uv}</span>
            </div>
            <div className="condition">
                <div>
                <i class="bi bi-cloud-sun"></i>
                <p>Cloud</p>
                </div>
                <span>{data.current.cloud} %</span>
            </div>
            </div>
        </div>
    )
}

export default Conditions