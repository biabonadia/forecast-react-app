import React, {useState} from 'react';
import "./Weather.css";

import WeatherInfo from "./WeatherInfo";
import axios from "axios";
export default function Weather(props){

const [information, setInformation]=useState({ready:false});
const[city,setCity]=useState(props.cityName);

  function handleSubmit(event){
event.preventDefault();
giveCity()
    }

function updateCity(event){
    setCity(event.target.value);
}

function giveCity(){
    const apiKey="e3344368d6f3c228b3b3ea166c8bbbdf";

let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(url).then(handleApi);
}

function acessLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(giveMyLocation);

}

function giveMyLocation(position){
    let id ="e3344368d6f3c228b3b3ea166c8bbbdf";
let lat =Math.round(position.coords.latitude);
let lon =Math.round(position.coords.longitude);
let unit ="metric";
let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${id}`;

axios.get(url).then(handleApi);
}



function handleApi(response){
    
setInformation({
    ready:true,
   date: new Date(response.data.dt * 1000),
    temperature: response.data.main.temp,
city:response.data.name,
humidity:response.data.main.humidity,
wind:response.data.wind.speed,
max:response.data.main.temp_max,
min:response.data.main.temp_min,
description:response.data.weather[0].description,
icon:response.data.weather[0].icon,
});

}

if (information.ready) {return (<div className="Weather">
<form className="row form" onSubmit={handleSubmit}>
    <input className="col-4 searchCity" type="search" placeholder="Enter a city" onChange={updateCity}/>
    <input className="col-2 btn btn-primary submit" type="submit" value="Search"/>
  
    <button className="col-2 btn btn-warning location" onClick={acessLocation}>📍 Location</button>
</form>
<WeatherInfo data={information}/>
    
    

    
  
    </div>);
    
}

    else{ giveCity()

return "Loading....";
}
}