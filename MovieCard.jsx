
const images = "https://image.tmdb.org/t/p/original/"


const MovieCard = ({Svideo, mode, categoryOptions, genreName}) => {
    return(
        <div className="">
            <div className="Cards" style={{marginTop:'-20px', width:'110%'}}  >
            <img className="img-fluid" src={`${images}${Svideo.poster_path}` } alt=""/>
           <div className="text-start px-1"> 
        <p className={mode? 'fw-medium text-info': 'fw-light text-info'}
           style={{fontSize:'13px'}}> {categoryOptions} <br/>
           <span className={mode? ("text-dark text-start fs-6 fw-bold") :
           ("text-light text-start fs-6  fw-bold")  }>
             {Svideo.original_title}   {Svideo.original_name}
           </span> <br/>
           <span className={mode? "fw-light text-dark" : "fw-light text-light"} style={{fontSize:'13.5px'}}>
             Released {Svideo.release_date}    {Svideo.first_air_date} <br/>
           <span className={mode? 'text-info fw-medium' : 'text-info'}>
             {genreName}
           </span> 
           </span>
           </p>  
           <br/>
           
           </div>
          </div>
           
        </div>
    );
    
}

export default MovieCard