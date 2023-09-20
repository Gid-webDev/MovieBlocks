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
import SearchArea from "./SearchArea";
import GenresContainter from "./GenresContainter";
import * as myGenre from './AllGenre';






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
  const [mode, setMode] = useState(false);
  const [movieOption, setMovieOPtion] = useState(true);
  const [genre, setGenre] = useState('');

 

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
    setSearchMovies('')
    
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
        {showModal && <div className="Modal text-dark   card  bg-light position-fixed my-1">
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
  const [showInput, setShowInput] = useState(false);
  const NavContainer = ["d-flex align-items-center justify-content-between", ]
  /* large screen size Search / input accessories */
  const formStyleClassBig = ["input-container shadow bg-light mx-3  d-flex  d-lg-flex d-none"]
  const formStyle2 = {boxShadow:'0 2px 2px', maxWidth:'50vw'}
  const InputClassBig = ["container-fluid"]
  /* small screen search/input accessories */
  const formStyleClassSmall = ["d-lg-none rounded mx-2 bg-light position-fixed"]
  const formStyleSmall = {position:'absolute', width:'55%', zIndex:'5', boxShadow:' 0 1px 2px', 
  display:'flex', flex:'1', right:'0', border:'solid #111 0.6px', top:'60px', transform:'translatey(15px)',
  transition:'transform ease-out 0.5s' }
  const inputStyleSmall = ["container-fluid bg-light text-dark d-flex flex-1 rounded"]
  /* TV SERIES AND MOVIES GENRE (Option)LOGIC */
  const thisGenre = movieOption === true? myGenre.NewMoviesGenre : myGenre.NewTvGenre
  /*  STYLES FOR GENRES INSIDE THE MENU */
  const MoviesAndTv = {fontSize:'22px', cursor:'pointer', border:'solid 3px #202020', padding:'8px 24px'}

  const [ genreName, setGenreName] = useState()

 
  
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

     <div className="row mx-2">
      
   <div id="CardsContainer">
     <h2></h2>
   <div className={MenuPosters}  >
     {Svideo.map((Svideo) => <div className={ MenuCards}  key={Svideo.id} onClick={() => 
      GetTrailer(Svideo, series, setShowModal(true), setSelected(Svideo))}>
     <Posters Svideo={Svideo}/>
     </div>)}
    </div>   
    </div>
    
     
     </div> 
     <section /* GENRES FOR MOVIES AND TV SERIES INSIDE THE MENU */ >
         <div className="d-flex justify-content-between w-25 my-2 mx-3"> 
            <div style={MoviesAndTv} onClick={()=> setMovieOPtion(true)}> Movies</div> 
            <div style={MoviesAndTv} onClick={()=> setMovieOPtion(false)}> Tvserie</div> 
         </div>
         <div className="px-3">
         {  
          thisGenre.map((genreIndex)=> (
          <button className="m-1 btn btn-outline-info"  key={genreIndex.id} onClick={()=> 
            GetVideo(setGenre(genreIndex.id))}>
           {genreIndex.name}
          </button>))}
         </div> 
     </section>
          
          
          </div> }

        <div className="m-3  d-flex  justify-content-between  align-items-center">
          <div className="logo" onClick={()=>{setShowInput(false)}}>
            <NavBar />
          </div>
          
          {showInput === true? (
               ''
            ) : (
              <div /* button for showing search accessories for small and size screens */ 
               className="btn text-info d-lg-none " onClick={() => setShowInput(true) }
               style={{position:'absolute', right:'85px',}}>
               <BsSearch type="submit"/>
          </div>
            )}

          <div  className={NavContainer}>
          {/* search accessories large screens input & button */ }
            <SearchArea SearchMovies={SearchMovies} setSearchMovies={setSearchMovies} movieOption={movieOption}
             setMovieOPtion={setMovieOPtion} Searcher={Searcher} GetVideo={GetVideo} 
             InputClassBig={InputClassBig}  formStyle2={formStyle2} formStyleClassBig={formStyleClassBig}
             showInput={showInput} setShowInput={setShowInput}
            /> 

            {/* show search input and button for small to medium screen size*/
            showInput === true?  <SearchArea SearchMovies={SearchMovies} setSearchMovies={setSearchMovies} movieOption={movieOption}
            setMovieOPtion={setMovieOPtion} showInput={showInput} setShowInput={setShowInput} Searcher={Searcher}
            GetVideo={GetVideo} formStyleClassSmall={formStyleClassSmall} formStyleSmall={formStyleSmall}
            inputStyleSmall={inputStyleSmall} 
           /> : ''
         }

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

           <figure className="overview my-0 " onClick={()=>{setShowInput(false)}}>
            {/* Modal */}
             <Modal selected={selected} />
             {/* Rendering slides images */}
             <MovieSlider Movieslide={Movieslide} />  
          </figure>
              {/* Moviecard rendering section */}
              <div className='row' id="CardContainer" onClick={()=>{setShowInput(false)}}>
              
              {Svideo.map(Svideo => (<div key={Svideo.id} className={CardStyle} onClick={() => GetTrailer(Svideo, setShowModal(true))}>
                <MovieCard Svideo={Svideo} />
              </div>))} 
            </div>
            
            {/* Pagination, Prev and Next button/current page  */}
            <div className="d-flex pt-2 pb-5" onClick={()=>{setShowInput(false)}}>
            <Pages setSvideo={setSvideo} selected={selected} genre={genre} Movieslide={Movieslide} MovieType={MovieType} 
            showGenre={''}/>
          </div>
          </section>
        </div>
      </main>

      <footer className="bg-dark" onClick={()=>{setShowInput(false)}}>
      </footer>



    </>

  );
}

export default App