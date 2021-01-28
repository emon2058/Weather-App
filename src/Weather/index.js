import React,{useState,useEffect} from 'react';
import './Weather.css'
function Weather(){
  const [cityName,setCityName]=useState('');
  const [search,setSearch]=useState('Dhaka');

  const Searching=(event)=>{
     setSearch(event.target.value);
  }
  useEffect(()=>{
    const getApi=async ()=>{
      const url =`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6e7281902b194650f81042fe428c9dd0`;
      const response = await fetch(url);
      console.log(response);
      const responseJson= await response.json();
      console.log('dfdf'+ responseJson.main);
      setCityName(responseJson);
      console.log('qq'+responseJson.weather)
    }
    getApi();
  },[search])
  return(
    <div className="Weather">
      <div className={`Container ${(typeof cityName.main!="undefined")?((cityName.weather[0].main=='Clear')?'Clear' :
      ((cityName.weather[0].main=='Clouds')? 'Clouds' :
      (((cityName.weather[0].main=='Haze') || (cityName.weather[0].main=='Fog') || (cityName.weather[0].main=='Smoke')||(cityName.weather[0].main=='Mist'))? 'Haze' :
      (((cityName.weather[0].main=='Rain')||(cityName.weather[0].main=='Drizzle'))?'Rain':((cityName.weather[0].main==('Snow'))?'Snowy' :
      (((cityName.weather[0].main=='Sunny')||(cityName.weather[0].main=='Hot'))?'Sunny':((cityName.weather[0].main=='Wind')?'Wind':'Default'))))))):'Default'}`}>
        <div className="Search">
          <input type="text" onChange={Searching} value={search} placeholder="enter city name"/>
        </div>
        <h1 className="City">{search}</h1>
        {!cityName ||(typeof cityName.main=="undefined")? (<p>No Data Found</p>) : (
          <>
            <div className="CurrentTemp">
              {cityName.main.temp}°C
            </div>
            <div className="Description">
              Feels Like : {cityName.weather[0].description}
            </div>
            <div>
              <span className="Max_Temp">Max {cityName.main.temp_max}°C</span>
              <span className="Min_Temp">Min {cityName.main.temp_min}°C</span>
            </div>
        </>
      )}
      </div>
    </div>
  )
}

export default Weather;
