import React,{useState,useEffect} from 'react';
import './Weather.css'
function Weather(){
  //initially cityName is empty
  const [cityName,setCityName]=useState('');
  //initially search is Dhaka that is seen in search box
  const [search,setSearch]=useState('Dhaka');
  //change the text in search bar
  const Searching=(event)=>{
     setSearch(event.target.value);
  }
  //end of search bar

  //real time search and get data from api
  useEffect(()=>{
    const getApi=async ()=>{
      //fetch data and sotre in url
      const url =`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6e7281902b194650f81042fe428c9dd0`;
      //wait untill the data fetch and sotre in response
      const response = await fetch(url);
      //see response in console
      console.log('fetch url',response);
      //arrange response in json format
      const responseJson= await response.json();
      //see responseJson in console
      console.log('responseJson',responseJson);
      //see responseJson.main in console
      console.log('responseJson.main', responseJson.main);
      //set city responseJson
      setCityName(responseJson);
      //see responseJson.weather in console
      console.log('responseJson.weather',responseJson.weather)
    }
    //call getApi
    getApi();
  },[search])//when searching this will render
//end of useEffect
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
