import React,{useState} from "react";
import { Grid, TextField } from "@mui/material";
import './weatherApp.css';
import search2 from "../Assets/search2.png"
import Sunset from"../Assets/Sunset.png";
import Sunrise from"../Assets/Sunrise.png";
import humidity from"../Assets/humidity.png";
import Rain from"../Assets/Rain.png";
import wind from"../Assets/wind.png";
import sunny from"../Assets/sunny.png";
import sunnyCloud from"../Assets/sunnyCloud.png";
import sunnyCloudRain from"../Assets/sunnyCloudRain.png"
import Ncloud from"../Assets/Ncloud.png";
import Nclear from"../Assets/Nclear.png";
import NRcloud from"../Assets/NRcloud.png";



const WeatherApp=()=>{
   const [wimg, setwimg]=useState(sunny);
   const [Wind,setWind]=useState(0);
   const [Humidity,setHumidity]=useState(0);
   const [temp,SetTemp]=useState(25);
   const [Address,SetAddress]=useState("India");
   const [sunrise, SetSunrise]=useState("_");
   const [sunset, SetSunset]=useState("_");
   const [resAdd,setResAdd]=useState("India");
   const [show,setShow]=useState(false);

    
 const search = async ()=>{
  const element =document.getElementsByClassName("CityName");
  if(element[0].value==="")
{


    return 0;
}

let url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${element[0].value}?unitGroup=metric&key=K6PZS3S4PT5W4NMQB33KLF9H5&contentType=json`;
 let response=await fetch(url);
 let data =await response.json();
 if(!data){
    console.log("print")
    
 }
 setShow(true)
 
 console.log(data);
 console.log(data.currentConditions.conditions);

 setHumidity(data.currentConditions.humidity);
 setWind(data.currentConditions.windspeed);
 SetTemp(data.currentConditions.temp);
 SetAddress(data.address);
 SetSunrise(data.currentConditions.sunrise);
 SetSunset(data.currentConditions.sunset);
 setResAdd(data.resolvedAddress);

 if (data.currentConditions.icon==="clear-day"){
    setwimg(sunny); 
}
 else if(data.currentConditions.icon==="clear-night"){
     setwimg(Nclear);
 }
 //else if(data.currentConditions.icon==="Clear-day"){
   // setwimg(sunny);
// }
else if(data.currentConditions.icon==="rain"){
    setwimg(Rain);
}
else if(data.currentConditions.icon==="partly-cloudy-night"){
    setwimg(Ncloud);
}
else if(data.currentConditions.icon==="partly-cloudy-day"){
    setwimg(sunnyCloud);
}
else{
     setwimg(sunnyCloudRain);
}
    element[0].value="";

 }
    return(
        <>
<Grid item xs={12} lg={6} md={6}>
        <div className="container">
            <div className="top-bar">
                <input type="text" className="CityName" placeholder="Search"></input>
                <div className="search_Icon" onClick={()=>{ search() }} >
                    <img src={search2} alt="search_Icon"></img>

                </div>
                
             </div>
             <div disabled={!show}>
          <div className="weatherImg">
            <img src={wimg} alt="sunny_cloud"  className="image"></img>
          </div>
          <div className="weather_temp">{temp}°c</div>
          <div className="weather_location">{Address}</div>
          <div className="data-container">
            <div className="element"> 
            <img src={humidity} alt="" className="icon"/>
            <div className="data">
                <div className="humidity-percent" >{Humidity}%</div>
               <div className="text"> Humidity </div>
            </div>
            </div>
            <div className="element"> 
            <img src={wind}alt="" className="icon"/>
            <div className="data">
            <div className="wind-speed"  > {Wind}kms</div>
               <div className="text">WindSpeed </div>
            </div>
            </div>
            <div className="element"> 
            <img src={Sunrise}alt=" Sunrise" className="icon"/>
            <div className="data">
                <div className="Sunrise">{sunrise}</div>
               <div className="text">Sunrise </div>
            </div>
            </div>
            <div className="element"> 
            <img src={Sunset}alt="Sunrise" className="icon"/>
            <div className="data">
                <div className="Sunset">{sunset}</div>
               <div className="text">Sunset</div>
            </div>
            </div>
         
          </div>
          </div>
          
        </div>

        </Grid>
        </>
    )
}
export default WeatherApp;