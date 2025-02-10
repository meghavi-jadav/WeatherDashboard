import React, { useState } from 'react';
import Slider from '../Slider/Slider.js';
import CityList from '../CityList/CityList.js';
import WikiPage from '../WikiPage/WikiPage.js';
import './DashBoard.css';
 
export default function DashBoard() {
  const [selectedCity, setSelectedCity] = useState("pune");
 
  return (
    <div className='main-container' >
      <div className='left-half'>
        <div className='citylist-box'>
          <CityList setSelectedCity={setSelectedCity}  />
        </div>
      </div>
 
      <div className='right-half'>
        <div className='slider-box'>
          <Slider />
        </div>
        <div className='wikipage-box'>
          <WikiPage selectedCity={selectedCity} />
        </div>
      </div>
    </div>
  );
}