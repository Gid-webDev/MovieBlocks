import { useEffect, useState } from "react"
import axios from "axios";
import {Naija, WWECard, UFCcard} from "./SpecialCard"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";






const images = "https://image.tmdb.org/t/p/original/"



    const buttonStyle = ["fs-1"]

/* WRESTLING SECTION */
export const Wrestling = ({wwe, mode, SpecialCollections, MovieType,
  Video_API, myKey, setWWE, GetTrailer, setShowInput, setShowModal,}) => {

  const [WWEPage, setWWEPage] = useState(1)
  const handlePrevPage = () => setWWEPage((PrevPage)=> PrevPage - 1 )
  const handleNextPage = () => setWWEPage((PrevPage)=> PrevPage + 1 )

  const GetWWE = async () => {
      const Type = "search"
      const {data: {results}} = await axios.get(`${Video_API}/${Type}/${MovieType}`,{
          params: {
              page:`${WWEPage}`,
              api_key: (`${myKey}`),
              query: 'wwe',
          }
      })
       setWWE(results)            
    }

 useEffect(()=>{
    GetWWE();
  },[WWEPage, MovieType]);

  const Mode = mode === true? {color:"#000"} : {color:'#fff'}
  const getPageStyles = () => ({
      ...Mode, alignItems:'center', display:'flex', margin:'0 10px', cursor:'pointer'
    })

  return(
    <section /* WRESTLING SECTION */ className="my-3 ,mx-2" onClick={()=> setShowInput(false)}>
    <p className={SpecialCollections}> Wrest<span className="text-info">ling</span> </p>
      <div className="WWE d-flex overflow-x-auto" style={{position:'relative', top:'-24px'}} >
       {wwe.map((wwe, wweIndex) => (<div key={wweIndex} style={{width:'', marginLeft:'20px' }}
       onClick={() => GetTrailer(wwe, setShowModal(true))} >
         <WWECard wwe={wwe} mode={mode}/>
       </div>))}
     </div>
     <div /* fLIP THROUGH PAGES */ className="pagesBtn d-flex rounded mx-2" style={{scale:'1'}}>
     {WWEPage !== 1? 
      <div style={getPageStyles()}   
     onClick={handlePrevPage}> 
     <BiChevronLeft className={buttonStyle} /> </div> 
     :  null}
     <div className={mode? "btn  text-light" : 
      "Page text-info"} id="currentPage" style={{border:'0'}}>
      Page <span className="fw-bold">{WWEPage}</span>
     </div>  
     <div style={getPageStyles()}  
     onClick={handleNextPage}> 
      <BiChevronRight className={buttonStyle}/> 
     </div>
  </div>
 </section>
  );
}


/* UFC SECTION */
export const UFCfight = ({UFC, setUFC, mode, SpecialCollections, MovieType,
  Video_API, myKey, GetTrailer, setShowInput, setShowModal}) => {

  const [UFCPage, setUFCPage] = useState(1)
  const handlePrevPage = () => setUFCPage((PrevPage)=> PrevPage - 1 )
  const handleNextPage = () => setUFCPage((PrevPage)=> PrevPage + 1 )

  const GetUFC = async () => {
  
  const Type = "search"
  const {data: {results}} = await axios.get(`${Video_API}/${Type}/${MovieType}`,{
      params: {
          page: `${UFCPage}`,
          api_key: (`${myKey}`),
          query: 'ufc',
      }
  })
   setUFC(results)             
}

 useEffect(()=>{
    GetUFC();
  },[UFCPage, MovieType]);

  const Mode = mode === true? {color:"#000"} : {color:'#fff'}
    const getPageStyles = () => ({
      ...Mode, alignItems:'center', display:'flex', margin:'0 10px', cursor:'pointer'
    })

  return(
    <section /* UFC SECTION */ className="my-3 ,mx-2" onClick={()=> setShowInput(false)}>
    <p className={SpecialCollections}> UFC<span className="text-info">...</span> </p>
      <div className="WWE d-flex overflow-x-auto" style={{position:'relative', top:'-24px'}} >
       {UFC.map((UFC, UFCIndex) => (<div key={UFCIndex} style={{width:'', marginLeft:'20px' }}
       onClick={() => GetTrailer(UFC, setShowModal(true))} >
         <UFCcard UFC={UFC} mode={mode}/>
       </div>))}
     </div>
     <div /* fLIP THROUGH PAGES */ className="pagesBtn d-flex rounded mx-2" style={{scale:'1'}}>
           {UFCPage !== 1? 
            <div style={getPageStyles()}   
           onClick={handlePrevPage}> 
           <BiChevronLeft className={buttonStyle} /> </div> 
           :  null}
           <div className={mode? "btn  text-light" : 
            "Page text-info"} id="currentPage" style={{border:'0'}}>
            Page <span className="fw-bold">{UFCPage}</span>
           </div>  
           <div style={getPageStyles()}  
           onClick={handleNextPage}> 
            <BiChevronRight className={buttonStyle}/> 
           </div>
        </div>
 </section>
  );
}

{/* NAIJA COLLECTIONS */}

export const Nigerian = ({naija, setNaija, mode, genreName, SpecialCollections, MovieType, 
  Video_API, myKey, GetTrailer, setShowInput, setShowModal,}) => {

  const [NaijaPage, setNaijaPage] = useState(1)

  const handlePrevPage = () => setNaijaPage((PrevPage)=> PrevPage - 1 )
  const handleNextPage = () => setNaijaPage((PrevPage)=> PrevPage + 1 )

  const Getnaija = async () => {
      const Type = "search"
      const {data: {results}} = await axios.get(`${Video_API}/${Type}/${MovieType}`,{
          params: {
              page: `${NaijaPage}`,
              api_key: (`${myKey}`),
              query: 'lagos',
          }
      })
       setNaija(results)            
    }

    const Mode = mode === true? {color:"#000"} : {color:'#fff'}
    const getPageStyles = () => ({
      ...Mode, alignItems:'center', display:'flex', margin:'0 10px', cursor:'pointer'
    })

useEffect(()=>{
    Getnaija();
  },[NaijaPage, MovieType]);

  return(
      <div>
      <section /* Naija SECTION */ className="py-2"  onClick={()=> setShowInput(false)}>
      <p className={SpecialCollections}> naija 
      <span className="text-info"> Mo</span>vies </p>
        <div className="WWE d-flex overflow-x-auto" style={{position:'relative', top:'-24px'}} >
          {naija.map((naija, naijaIndex) => (<div key={naijaIndex} style={{width:'', marginLeft:'20px' }}
          onClick={() => GetTrailer(naija, setShowModal(true))}>
          <Naija mode={mode} genreName={genreName} naija={naija}/>
         </div>))}
        </div>

        <div /* fLIP THROUGH PAGES */ className="pagesBtn d-flex rounded mx-2" style={{scale:'1'}}>
           {NaijaPage !== 1? 
            <div style={getPageStyles()}   
           onClick={handlePrevPage}> 
           <BiChevronLeft className={buttonStyle} /> </div> 
           :  null}
           <div className={mode? "btn  text-light" : 
            "Page text-info"} id="currentPage" style={{border:'0'}}>
            Page <span className="fw-bold">{NaijaPage}</span>
           </div>  
           <div style={getPageStyles()}  
           onClick={handleNextPage}> 
            <BiChevronRight className={buttonStyle}/> 
           </div>
        </div>
       </section>
      </div>
  );
}


     