import React, { useState } from 'react';
import Slider from '../Slider/Slider.js';
import CityList from '../CityList/CityList.js';
import WikiPage from '../WikiPage/WikiPage.js';
import './DashBoard.css';
import Theme from '../Theme/Theme.js';
 
export default function DashBoard() {
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [mode , setMode] = useState("light");
  return (
    <div className='main-container'>
      <div className='toggle'>
      <Theme  setMode={setMode} mode={mode}/>
      
      </div>
   
      <div className='left-half'>
        <div className='citylist-box'>
          <CityList setSelectedCity={setSelectedCity}  />
        </div>
      </div>
 
      <div className='right-half'>
        <div className='slider-box'>
          <Slider mode={mode}/>
        </div>
        <div className='wikipage-box'>
          <WikiPage selectedCity={selectedCity} />
        </div>
      </div>
    </div>
  );
}