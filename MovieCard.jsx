
const images = "https://image.tmdb.org/t/p/original/"


const MovieCard = ({Svideo, mode, categoryOptions, genreName}) => {
    return(
        <div className="">
            <div className="Cards" style={{marginTop:'-20px', width:'100%'}}  >
            <img className="img-fluid" src={`${images}${Svideo.poster_path}` } alt=""/>
           <div className={mode? ("text-dark text-start fs-5 px-1 fw-bold") :
           ("text-light text-start fs-5 px-2 fw-bold")
            } style={{scale:'0.87'}} > 
        <span className={mode? 'fw-medium fs- text-info': 'fw-light fs-6 text-info'}
           > {categoryOptions} </span>  <br/>
           {Svideo.original_title}   {Svideo.original_name}<br/>
           <span className="fw-light fs-6">
           Released: {Svideo.release_date}    {Svideo.first_air_date} <br/>
           <span className={mode? 'text-info fw-medium' : 'text-info'}>{genreName}</span> 
           </span>
           </div>
          </div>
           
        </div>
    );
    
}

export default MovieCard