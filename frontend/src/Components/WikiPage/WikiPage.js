import React, {useEffect, useState} from 'react'
import './WikiPage.css'
 
const WikiPage = ({ selectedCity }) => {
 selectedCity = selectedCity.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s*\(.*?\)\s*/g, '');
  
  const [WikiPage, setWikiPage] = useState(null);
 
  
 useEffect(() => {
  const fetchWikipedia = async () => {
 
    if (!selectedCity) return;
    
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedCity}`;
    try{
      const response = await fetch(wikiUrl);
      const data = await response.json();
 
      if(data.content_urls){
        setWikiPage(data.content_urls.desktop.page);
      }else{
        setWikiPage("")
      }
    }catch(error){
      console.error("Error Fetching the wikipedia page");
      setWikiPage("");
    }
  };
  fetchWikipedia();}, [selectedCity]);
  return (
    <div className='wikipage-container'>
      {/* <h1>Wikipedia Page</h1> */}      
      {WikiPage && (
        <div className='wikipage'>
          <iframe
            className='iframe'
            id="wiki"
            src={WikiPage}
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
 
