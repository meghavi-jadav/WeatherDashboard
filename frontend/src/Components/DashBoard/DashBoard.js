import React, { useState } from 'react';
import Slider from '../Slider/Slider.js';
import CityList from '../CityList/CityList.js';
import WikiPage from '../WikiPage/WikiPage.js';
import './DashBoard.css';
 
export default function DashBoard() {
  const [selectedCity, setSelectedCity] = useState("pune");
 
  return (
    <div className='main-container'>
      {/* Left Half - CityList */}
      <div className='left-half'>
        <div className='citylist-box'>
          <CityList setSelectedCity={setSelectedCity}  />
        </div>
      </div>
 
      {/* Right Half - Slider (40%) & WikiPage (60%) */}
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



// import React from 'react'
// import Slider from '../Slider/Slider.js'
// import CityList from '../CityList/CityList.js'
// import WikiPage from '../WikiPage/WikiPage.js'
// import SearchBar from '../SearchBar/SearchBar.js'
// import './DashBoard.css'

// export default function DashBoard() {
//   return (
//     <div className='main-container' >      
//       <div className='slider-component' id='slider'>
//         <Slider />
//       </div>
//       <div className='citylist-component' id='citylist'>
//         <CityList />
//       </div>
//       <div className='wikipage-component' id='wikipage'>
//         <WikiPage />
//       </div>
//       <div className='searchbar-component' id='searchbar'>
//         <SearchBar />
//       </div>
//     </div>
//   )
// }