import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import NavBar from "./NavBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "./Button";
import { BsSearch, BsFilm, BsSliders } from "react-icons/bs"
import { BiChevronLeft, BiChevronRight, BiToggleLeft, BiToggleRight} from "react-icons/bi"
import { FaChromecast } from "react-icons/fa"
import {GiFilmSpool } from "react-icons/gi"
import { CiYoutube } from "react-icons/ci"
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { FaPlay, FaTh, FaToggleOn, FaToggleOff} from "react-icons/fa";
import YouTube from "react-youtube"
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import NavMenu from "./Menu";
import Posters from "./Posters";
import MovieSlider from "./MovieSlider";
import Pages from "./Pages";
import {MdModeNight, MdLightMode} from "react-icons/md";
import GenreBox from "./GenreBox";






const myKey = '70aeaf6cc2f0f2330bec04f30130925d'

const App = () => {
  const Video_API = "https://api.themoviedb.org/3";
  const images = "https://image.tmdb.org/t/p/original"


  const [selected, setSelected] = useState({});
  const [SearchMovies, setSearchMovies] = useState('');
  const [Svideo, setSvideo] = useState([]);
  const [player, setPlayer] = useState(false);
  const [series, setSeries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [type, setType] = useState(true);
  const [Movieslide, setMovieslide] = useState([]);
  const [mode, setMode] = useState(true);
  const [movieOption, setMovieOPtion] = useState(true);
  const [genre, setGenre] = useState([0]);
 

 
  {/* each genre has a unique ID which is a number 
   
MOVIE
Action => 28,       Adventure=> 12,                Animation => 16, 
Comedy => 35,       Crime =>  80,                  Documentary =>  99, 
Drama =>  18,       Family => 10751,               Fantasy =>14, 
History=>36,        Horror => 27,                  Music => 10402, 
Mystery => 9648,    Romance => 10749, Science      Fiction 878
TV Movie =>  10770, Thriller => 53, War => 10752,  Western => 37

TV SHOW
Action & Adventure => 10759,   Animation => 16,   Comedy => 35,                  Crime  =>  80
Documentary => 99,             Drama => 18,       Family => 10751,               Kids  =>  10762
Mystery => 9648,               News  => 10763,    Reality  => 10764,             Sci-Fi & Fantasy => 10765
Soap  =>  10766,               Talk  =>  10767,    War & Politics  =>  10768  
Western  =>  37
*/}
  const GenreArray = [28, 16, 12, 27, 99, 10751, 878, 10770, 36, 10402, 35, 18, 10763, 10764, 10749, 10762, 10767, 10766, 10768, 10765];
  const MovieType = movieOption === true? 'movie' : 'tv';
  
  const GetVideo = async (SearchMovies) => {  
    const Type = SearchMovies ? "search" : "discover"
    const { data: { results } } = await axios.get(`${Video_API}/${Type}/${MovieType}`, {
      params: {
        page: 1,
        api_key: (`${myKey}`),
        with_genres: genre,
        query: SearchMovies
        
      }
    })
    setPlayer(false);
    setSvideo(results);
    GetTrailer(results[0]);
    setType(true);
    setMovieslide(results);
    
  } 
  const FetchVideo = async (id) => {
    const MovieType = movieOption === true? 'movie' : 'tv';
    const data  = await axios.get(`${Video_API}/${MovieType}/${id}`, {
      params: {
        api_key: (`${myKey}`),
        append_to_response: 'videos'
      }
    })
    return data
  }
  const GetTrailer = async (Svideo, slide) => {
    const {data} = await FetchVideo(Svideo.id)
    setSelected(data, Svideo, slide)
    setPlayer(false)
    console.log(data)
  }

  
  useEffect(() => {
  GetVideo();
  }, []);


  const Searcher = (e) => { e.preventDefault();
    setPlayer(false)
    GetVideo()
  }

  const RenderTrailer = () => {
    
    const FirstTrailer = selected.videos.results[0]?  selected.videos.results[0].key : selected.videos.results[0]
    const  OfficialTrailer =  selected.videos.results.find(vid => vid.name =='Official Trailer')? 
    selected.videos.results.find(vid => vid.name =='Official Trailer').key : selected.videos.results.find(vid => vid.name =='Official Trailer')
    const Trailer = OfficialTrailer? OfficialTrailer : FirstTrailer
  
    return (
      <YouTube
      videoId={Trailer}
      containerClassName={'PlayerContainer'}
      opts={{
        width: '100%',
        height: '300px',
        playerVars: {
          autoplay: 1,
          controls: 1
        }
      }} /> 
    )
  }



  const Modal = ({ selected }) => {
    return (
      <div className=" Mcontainer">
        {showModal && <div className="Modal text-dark   card  bg-light position-fixed">
          <ModalHeader >
            <button className="CloseModal text-dark" onClick={() => setShowModal(false)}>
              <AiOutlineClose />
            </button>
          </ModalHeader>
          <ModalBody>
            <div>

              <div className="MovieTrailer">
                {player && <div className="CloseBtn fs-5" onClick={() => setPlayer(false)}>
                  <AiOutlineClose />
                </div>}
                {selected.videos && player && RenderTrailer()}
              </div>

              {player ? '' : <button className="play-btn   d-flex align-items-center" onClick={() => setPlayer(true)}>
                <FaPlay /> Play Trailer
              </button>}

              <img src={selected.backdrop_path ? images + selected.backdrop_path : images + selected.poster_path} alt="" />


            </div>
            <div className="modal-text bg-light  text-black px-2">
              <h2 className="card-title">{selected.original_title}</h2>
              <p>{selected.overview}  </p>
            </div>


          </ModalBody>
          <ModalFooter className="px-2">
            <strong>Release Date: {selected.release_date}</strong>
          </ModalFooter>
        </div>}
      </div>
    );
  }


  const CardContainer_D = [/* Dark Mode for cards */ "sect text-light py-3  row w-100"];
  const CardContainer_L = [/* Light Mode for cards */ " sect text-light py-3 bg-light row w-100"];
  mode? CardContainer_L : CardContainer_D
  const HeaderStyly_D = [/* Dark Mode for cards */ "text-secondary py-0 fixed-top bg-black"]
  const HeaderStyly_L = [/* Light Mode for cards */ "text-secondary py-0 fixed-top bg-white"];
  const CardsHeadr = ["filter", "COLLECTIONS", "TRENDING", "TV SERIES", "ANIMATION", "Nollywood", "Bollywood", "Wrestling", "UFC"];
  const CardStyle = ["CardImg   col-lg-3 col-md-4 col-sm-6"];
  const MenuCards = ["CardImg      mx-2"];
  const MenuPosters = ["d-flex posters  my-1  Card-Container"];
  const Arrows = ( <div className="arrows d-flex justify-content-between">
                   <button className="arrows"><h2><BiChevronLeft className="text-danger"/></h2></button>  
                   <button className="arrows"><h2><BiChevronRight className="text-danger"/></h2></button> </div>)
  const DarkMode = ["bg-dark row dark"]
  const LightMode = ["bg-light row light"]
  const Mode = mode?  LightMode : DarkMode
  const GenreBtn = ["fs  rounded p-2  d-flex  d-lg-flex"]
  const SideBar = ["SideBar  py-5  justify-content-center col-lg-2 d-none  d-lg-block"]
  const SideBar_Menu = ["SideBar_Menu  py-1 justify-content-center  d-lg-none"]
  const sideBarContainer = ["sideBar-container justify-content-start d-lg-block  position-fixed"]
  const sideBarContainer_Menu = ["sideBar-container_Menu justify-content-start d-lg-none"]
  const [showFilter, setShowFilter] = useState(false);
  const formStyle = [ "input-container bg-info mx-1  d-flex  md-p-1  d-sm-flex d-none"]
  const InputContainer = ["d-flex align-items-center justify-content-between", ]



  return (
    <>
      <header className={mode? HeaderStyly_L : HeaderStyly_D}>
         
        {show&& <div className="Menu-container">
        <div className="menuHeader px-3  py-1  d-flex justify-content-between" > 
        {/* Genre Options buttons */}
           <div> <NavBar/> </div>
           {/* close menu button*/}
           <button onClick={() => setShow(false)} className="CloseMenu btn btn-outline-info   fs-5 " id="CloseMenu"> 
            <AiOutlineClose />
           </button>
       </div>

       {/* Menu navigation */}

       <div className="d-flex bg-black">
       <div className="accordion accordion-flush bg-black" id="accordionFlushExample">
  
       <div className="accordion-item bg-black text-info">
         <h2 className="accordion-header" id="flush-headingTwo">
           <button onClick={()=> GetVideo(setMovieOPtion(false))}   className="accordion-button collapsed bg-black text-info" type="button" data-bs-toggle="collapse"   data-bs-target={movieOption !==true? "#Tv_series" : "movies"} aria-expanded="false" aria-controls="flush-collapseTwo">
             Tv series
           </button>
         </h2>
         <div id="Tv_series" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
           <div class="accordion-body bg-dark">
           {movieOption !== true?
             <ul className="" aria-labelledby="dropdownMenuButton1">
               <li><a className="dropdown-item" href="#"> 
               <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[19]))}>
               
               <span className="fs-6 "> Sci-Fi & Fantasy  </span>
             </div> </a></li>
     
             <li><a className="dropdown-item" href="#"> 
               <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[4]))}>
               
               <span className="fs-6 "> Documentary  </span>
             </div> </a></li>
     
             <li><a className="dropdown-item" href="#"> 
               <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[15]))}>
               
               <span className="fs-6 "> Kids  </span>
             </div> </a></li>
     
             <li><a className="dropdown-item" href="#"> 
               <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[12]))}>
               
               <span className="fs-6 "> News  </span>
             </div> </a></li>
     
             <li><a className="dropdown-item" href="#"> 
               <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[19]))}>
               
               <span className="fs-6 "> Reality Tv  </span>
             </div> </a></li>
     
             </ul> : console.log('pls double click on Tv series')
           }
             
           </div>
         </div>
       </div>
       
     </div>
     
     
     
           <div className="accordion accordion-flush d-flex bg-black" id="accordionFlushExample">
       <div className="accordion-item  bg-black">
         <h2 className="accordion-header" id="flush-headingOne">
           <button onClick={()=> GetVideo(setMovieOPtion(true))}  className="accordion-button collapsed  bg-black text-info" type="button" data-bs-toggle="collapse" data-bs-target={movieOption? "#Movies" : "#Tv_series"} aria-expanded="false" aria-controls="flush-collapseOne">
             Movies
           </button>
         </h2>
         <div id="Movies" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
           <div className="accordion-body bg-dark ">
           {movieOption ?
             <ul className="" aria-labelledby="">
     
           <li><a className="" href="#"> 
           <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[0]))}>
           
           <span className="fs-6 "> Action  </span>
         </div> </a></li>
     
         <li><a className="" href="#"> 
           <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[8]))}>
           
           <span className="fs-6 "> Epic  </span>
         </div> </a></li>
     
         <li><a className="" href="#"> 
           <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[1]))}>
           
           <span className="fs-6 ">  Animation </span>
         </div> </a></li>
     
         <li><a className="" href="#"> 
           <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[14]))}>
           
           <span className="fs-6 "> Romance  </span>
         </div> </a></li>
     
         <li><a className="" href="#"> 
           <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[9]))}>
           
           <span className="fs-6 "> Musicals  </span>
         </div> </a></li>
     
           </ul> : console.log('pls double click on movies')
           }
           </div>
         </div>
       </div>
       
     </div>
       </div>

     <div className="row mx-2">
     {/* Collections col-1 */}
     <div className="" id="CardsContainer">
     <div className=""> 
     
     
   <div className={MenuPosters}  >
     {Svideo.map((Svideo) => <div className={ MenuCards}  key={Svideo.id} onClick={() => 
      GetTrailer(Svideo, series, setShowModal(true), setSelected(Svideo))}>
     <Posters Svideo={Svideo}/>
     </div>)}
    </div>
    {Arrows}
       {/* Scroll arrows */}
     <div className="text-light" style={{ display:'flex', position:'absolute', 
     width: '79%', justifyContent:'space-between', top:'301.5px', left:'30px', zIndex: '5',}}>
     </div>
    
 </div> 

 
     </div>
    
     
     </div> 
          
          
          </div> }

        <div className="m-3  d-flex  justify-content-between  align-items-center">
          <div className="logo"><NavBar /></div>
          
         
          <div /* search input & button */ className={InputContainer} id="inputMenu">
          {movieOption? (
            <form onSubmit={Searcher} className={formStyle} style={{boxShadow:'0 2px 2px'}}> 
          <input className="container-fluid bg-light"  type="text"
            placeholder="Search movies"
            value={SearchMovies}
            onChange={(e) => setSearchMovies(e.target.value)}
          />
          <button className="btn" onClick={() => GetVideo(SearchMovies)}>
            <BsSearch type="submit" />
          </button>

        </form>

          ) :  <Button name={
          <div className='text-light' onClick={''}> </div>} />  }
              
          <h4 /* dark and light mode toggle */>
          {mode? (<div className=" text-info" onClick={()=> {setMode(false)}}> <MdLightMode className="fs-5"/></div>)
            : <div className=" text-info" onClick={()=> {setMode(true)}}> <MdModeNight className="fs-5"/></div>}
          </h4>
            
            {/* menu */}
            <Button name={
              <h3 className="text-info fs-5">
                <FaTh onClick={() => setShow(true)} />
              </h3>} />
          </div>
        </div>
      </header>

      <main className="">
      
        <div className={Mode} id="main-container">
           {/*Side Bar with buttons, col */}
          <section className={SideBar}>
            <div className={sideBarContainer}>
            
           {/* Genre buttons rendered through GenreBox component */}
          <div className="col-md-4 text-white text-start" id="MenuHeaders">
          
          <GenreBox GenreBtn={GenreBtn} GetVideo={GetVideo} setGenre={setGenre} 
          setMovieOPtion={setMovieOPtion} setShowFilter={setShowFilter} movieOption={movieOption} 
          GenreArray={GenreArray}/>
        </div>
                
            </div>
          </section>
          {/* AsideRight Right side displaying movie cards */}
          <section className="AsideRight   position-relative  justify-content-center col-lg-10 my-4 col">
          
          <figure className="overview my-0 ">
            {/* Modal */}
             <Modal selected={selected} />
             {/* Rendering slides images */}
             <MovieSlider Movieslide={Movieslide}/>  
          </figure>
              {/* Moviecard rendering section */}
              <div className='row' id="CardContainer">
              
              {Svideo.map(Svideo => (<div key={Svideo.id} className={CardStyle} onClick={() => GetTrailer(Svideo, setShowModal(true))}>
                <MovieCard Svideo={Svideo} />
              </div>))} 
            </div>
            
            {/* Pagination, Prev and Next button/current page  */}
            <div className="d-flex pt-2 pb-5">
            <Pages setSvideo={setSvideo} selected={selected} genre={genre} Movieslide={Movieslide} MovieType={MovieType} 
            showGenre={''}/>
          </div>
          </section>
        </div>
      </main>

      <footer className="bg-dark">
      </footer>



    </>

  );
}

export default App