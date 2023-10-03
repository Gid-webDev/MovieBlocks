import { useState } from "react";
const images = "https://image.tmdb.org/t/p/original/"


export const Naija = ({naija, mode,}) => {
    return(
        <div className="">
            <div className="Cards mx-3 my-2" style={{ width:'105%'}}  >
            <img className="img-fluid" src={`${images}${naija.poster_path}` } alt=""/>
           <div className={mode? ("text-dark text-start fs-5 px-1 fw-bold") :
           ("text-light text-start fs-6 px-2 fw-bold")
            }  > 
           <span className="fw-light" style={{fontSize:'13.5px'}}>
           Date {naija.release_date}    {naija.first_air_date} <br/> 
           </span>
           </div>
          </div>     
        </div>
    );
    
}

export const WWECard = ({wwe, mode,}) => {
    const [currentPage, setCurrentPage] = useState(1)
    return(
        <div className="">
            <div className="Cards mx-3 my-2" style={{ width:'105%'}}  >
            <img className="img-fluid" src={`${images}${wwe.poster_path}` } alt=""/>
           <div className={mode? ("text-dark text-start fs-5 px-1 fw-bold") :
           ("text-light text-start fs-6 px-2 fw-bold")
            }  > 
           <span className="fw-light" style={{fontSize:'13.5px'}}>
           Date {wwe.release_date}    {wwe.first_air_date} <br/> 
           </span>
           </div>
          </div>     
        </div>
    );
    
}

export const UFCcard = ({UFC, mode}) => {
    return(
        <div className="">
            <div className="Cards mx-3 my-2" style={{ width:'105%'}}  >
            <img className="img-fluid" src={`${images}${UFC.poster_path}` } alt=""/>
           <div className={mode? ("text-dark text-start fs-5 px-1 fw-bold") :
           ("text-light text-start fs-6 px-2 fw-bold")
            }  > 
           <span className="fw-light" style={{fontSize:'13.5px'}}>
           Date {UFC.release_date}    {UFC.first_air_date} <br/>
           </span>
           </div>
          </div>
           
        </div>
    );
    
}




