
const images = "https://image.tmdb.org/t/p/original/"


const MovieCard = ({Svideo}) => {
    return(
        <div className="CardsContainer">
            <div className="Cards  image-fluid bg-black" >
            <img src={`${images}${Svideo.poster_path}` } alt=""/>
           <div className="py-3"> 
           <strong>
             Title: {Svideo.original_title}   {Svideo.original_name}<br/>
             Released: {Svideo.release_date}    {Svideo.first_air_date}
           </strong>
           </div>
          </div>
           
        </div>
    );
    
}

export default MovieCard