import React, { useEffect, useState } from 'react';
import './WikiPage.css';
import parse from 'html-react-parser';

const WikiPage = ({ selectedCity , mode} ) => {
  // Normalize city name for Wikipedia API compatibility
  const normalizedCity = selectedCity
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s*\(.*?\)\s*/g, '');

  const [wikiContent, setWikiContent] = useState('');

  useEffect(() => {
    const fetchWikipediaContent = async () => {
      if (!normalizedCity) return;

      const apiUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${normalizedCity}&prop=text&origin=*`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.parse && data.parse.text) {
          setWikiContent(data.parse.text['*']);
        } else {
          setWikiContent('Content not found.');
        }
      } catch (error) {
        console.error('Error fetching Wikipedia content:', error);
        setWikiContent('Failed to load content.');
      }
    };

    fetchWikipediaContent();
  }, [normalizedCity]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [wikiContent]);

  return (
    <div className={mode === "light" ? "wikipage-container-light" : "wikipage-container-dark"}>
      {wikiContent ? (
        <div className="wiki-content">
          <h2>{selectedCity}</h2>
          {parse(wikiContent)}
        </div>
      ) : (
        <p>Loading Wikipedia content...</p>
      )}
    </div>
  );
};

export default WikiPage;


// import React, { useEffect, useState } from "react";
 
// const WikiPage = ({ selectedCity }) => {
//   const [content, setContent] = useState("Loading...");
 
//   useEffect(() => {
//     if (!selectedCity) return;
 
//     const fetchWikiContent = async () => {
//       try {
// const response = await fetch(`https://en.wikipedia.org/wiki/${selectedCity}`);
//         const html = await response.text();
 
//         // Parse the response text into a DOM structure
//         const parser = new DOMParser();
        
//         const doc = parser.parseFromString(html, "text/html");
//         console.log(doc);
//         // Extract only the content inside the `.mw-page-container`
//         const wikiContent = doc.querySelector(".mw-page-container-inner");
//         console.log(wikiContent);
//         setContent(wikiContent ? wikiContent.innerHTML : "Content not found.");
//       } catch (error) {
//         console.error("Error fetching Wikipedia page:", error);
//         setContent("Error loading content.");
//       }
//     };
 
//     fetchWikiContent();
//   }, [selectedCity]);
 
//   return (
//     <div className="wikipage-box" dangerouslySetInnerHTML={{ __html: content }} />
//   );
// };
 
// export default WikiPage;


// import React, {useEffect, useState} from 'react'
// import './WikiPage.css'
 
// const WikiPage = ({ selectedCity }) => {
//  selectedCity = selectedCity.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s*\(.*?\)\s*/g, '');
  
//   const [WikiPage, setWikiPage] = useState('');
 
  
//  useEffect(() => { 
//     if (!selectedCity) return;
//     const fetchWikipedia = async () => {
//     const wikiUrl = `https://en.wikipedia.org/wiki/${selectedCity}`;
//     // const wikiUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(selectedCity)}&format=json&origin=*`;
//     try{
//       const response = await fetch(wikiUrl);
//       // const data = await response.json();
//       const htmlText = await response.text();

//       const parser = new DOMParser();
//       const doc = parser.parseFromString(htmlText, 'text/html');
//       const content = doc.querySelector('mw-page-container-inner');
 
//       if(content){
//         setWikiPage(content.innerHTML);
//       }
//       // else{
//       //   setWikiPage('<p>Wikipedia page not found</p>');
//       // }
//     }catch(error){
//       console.error("Error Fetching the wikipedia page", error);
//       setWikiPage('<p>Error Loading Content</p>');
//     }
//   };
//   fetchWikipedia();}, [selectedCity]);
//   return (
//     <div className='wikipage-container'>
//       {/* <h1>Wikipedia Page</h1> */}      
//       {/* {WikiPage && (
//           // <iframe
//           //   className='iframe'
//           //   id="wiki"
//           //   src={WikiPage}
//           //   width="100%"
//           //   height="320px"
//           //   title='Wikipedia Page'
//           // ></iframe>
//           <embed src={WikiPage} width="100%" height="320px"></embed>
//       )} */}
//       {/* <div className='wiki-content' dangerouslySetInnerHTML={{__html: WikiPage}}> */}

//       <embed src={WikiPage} width="100%" height="320px"></embed>
//     </div>
//   );
// };

// export default WikiPage;


// import React, {useEffect, useState} from 'react'
// import './WikiPage.css'
 
// const WikiPage = ({ selectedCity }) => {
//  selectedCity = selectedCity.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s*\(.*?\)\s*/g, '');
  
//   const [WikiPage, setWikiPage] = useState(null);
 
  
//  useEffect(() => {
//   const fetchWikipedia = async () => {
 
//     if (!selectedCity) return;
    
//     const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedCity}`;
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
//   fetchWikipedia();}, [selectedCity]);
//   return (
//     <div className='wikipage-container'>
//       {/* <h1>Wikipedia Page</h1> */}      
//       {WikiPage && (
//           <iframe
//             className='iframe'
//             id="wiki"
//             src={WikiPage}
//             width="100%"
//             height="320px"
//             title='Wikipedia Page'
//           ></iframe>
//       )}
//     </div>
//   );
// };

// export default WikiPage;
 
