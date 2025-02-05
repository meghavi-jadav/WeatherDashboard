// WikiPage.js
import React, { useEffect, useState } from 'react';
import './WikiPage.css';

const WikiPage = ({ selectedCity }) => {
  const [wikiPage, setWikiPage] = useState(null);

  useEffect(() => {
    const fetchWikipedia = async () => {
      if (!selectedCity) return;

      const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedCity}`;
      try {
        const response = await fetch(wikiUrl);
        const data = await response.json();

        if (data.content_urls) {
          setWikiPage(data.content_urls.desktop.page);
        } else {
          setWikiPage("");
        }
      } catch (error) {
        console.error("Error Fetching the Wikipedia page");
        setWikiPage("");
      }
    };

    fetchWikipedia();
  }, [selectedCity]);

  return (
    <div className='wikipage-container'>
      {/* <input
        type="text"
        placeholder="Enter City Name"
        value={selectedCity || ""}
        readOnly
      /> */}
      {wikiPage && (
        <div className='wikipage'>
          <iframe
            className='iframe'
            id="wiki"
            src={wikiPage}
            width="100%"
            height="320px"
            title='Wikipedia Page'
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default WikiPage;


// import React, {useState} from 'react'
// import './WikiPage.css'
 
// const WikiPage = () => {
 
//   const [city, setCity] = useState('');
//   const [WikiPage, setWikiPage] = useState(null);
 
//   // const fetchWeather = async () => {
//   //   const apiKey = "c84d90a747b71c83cfbfbafc752196b9"
//   //   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
 
//   //   try{
//   //     const response = await fetch(weatherUrl);
//   //     const data = await response.json();
//   //     setWeather(data);
 
//   //     fetchWeather(city);
//   //   }catch(error){
//   //     console.error("Error Fetching");
//   //   }
//   // };
 
//   const fetchWikipedia = async () => {
 
//     if (!city) return;
 
//     const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`;
//     try{
//       const response = await fetch(wikiUrl);
//       const data = await response.json();
 
//       if(data.content_urls){
//         setWikiPage(data.content_urls.desktop.page);
//       }else{
//         setWikiPage("")
//       }
//     }catch(error){
//       console.error("Error Fetching the wikipedia page");
//       setWikiPage("");
//     }
//   };
//   return (
//     <div className='wikipage-container'>
//       {/* <h1>Wikipedia Page</h1> */}
//       <input
//         type="text"
//         placeholder="Enter City Name"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//       <button onClick={fetchWikipedia} >Get Wikipedia Page</button>
//       {WikiPage && (
//         <div className='wikipage'>
//           {/* <h2>Wikipedia Page for {city}</h2> */}
//           <iframe
//           className='iframe'
//           id="wiki"
//             src = {WikiPage}
//             width="100%"
//             height="320px"
//             title='Wikipedia Page'
//           ></iframe>
//         </div>
//       )}
//     </div>    
//   );
// };
 
// export default WikiPage;
 
