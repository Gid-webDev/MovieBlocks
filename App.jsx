import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import NavBar from "./NavBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "./Button";
import { BsSearch, BsFilm, BsSliders } from "react-icons/bs"
import { BiChevronLeft, BiChevronRight, BiMoviePlay } from "react-icons/bi"
import { FaChromecast } from "react-icons/fa"
import { GiDramaMasks, GiFilmSpool } from "react-icons/gi"
import { CiYoutube } from "react-icons/ci"
import { AiOutlineClose } from "react-icons/ai"
import axios from "axios";
import { FaPlay, FaTh } from "react-icons/fa"
import YouTube from "react-youtube"
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import NavMenu from "./Menu";
import Posters from "./Posters";
import MovieSlider from "./MovieSlider";






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
  const [slide, setSlide] = useState([]);



  const GetVideo = async (SearchMovies) => {
    const Type = SearchMovies ? "search" : "discover"

    const { data: { results } } = await axios.get(`${Video_API}/${Type}/movie`, {
      params: {
        
        page: 1,
        api_key: (`${myKey}`),
        
        query: SearchMovies
      }
    })
    setPlayer(false)
    setSvideo(results);
    GetTrailer(results[0]);
    setType(true)
    setSlide(results)
    setMovieslide(results)
  }



 let Type = (type? 'movie' : 'tv')
  const FetchVideo = async (id) => {
    
    const { data } = await axios.get(`${Video_API}/${Type}/${id}`, {
      params: {
        api_key: (`${myKey}`),
        append_to_response: 'videos'
      }
    })
    return data
  }




  const GetTrailer = async (Svideo, series, slide) => {
    const data = await FetchVideo(Svideo.id)
    setSelected(data, Svideo, series, slide)
    setPlayer(false)
  }




  useEffect(() => {
    GetTvSeries(); GetVideo();
  }, []);


  const Searcher = (e) => {
    e.preventDefault();
    setPlayer(false)
  }

  const RenderTrailer = () => {
    const FirstTrailer = selected.videos.results[0].key; 
    const  OfficialTrailer = selected.videos.results.find(vid => vid.name =='Official Trailer');
    const Trailer = OfficialTrailer? OfficialTrailer.key : FirstTrailer 
  
    return (
      <YouTube
        videoId={Trailer? Trailer : <YouTube/>}
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


  const GetTvSeries = async (SearchMovies) => {
    const Type = SearchMovies ? "search" : "discover"

    const { data: { results } } = await axios.get(`${Video_API}/${Type}/tv`, {
      params: {
        
        page: 2,
        api_key: (`${myKey}`),
        
        query: SearchMovies
      }
    })
    setSeries(results);
    setPlayer(false);
    setType(false);
    setSvideo(results)
    
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


  const CardContainer = [" sect text-light py-3  my-4 mx-1  row"];
  const CardsHeadr = ["COLLECTIONS", "TRENDING", "TV SERIES", "ANIMATION"];
  const CardStyle = ["CardImg   col-lg-3 col-md-4 col-sm-6"];
  const MenuCards = ["CardImg      mx-2"];
  const MenuPosters = ["d-flex posters  my-3  Card-Container"];
  const Arrows = ( <div className="arrows d-flex justify-content-between">
                   <button className="arrows"><h2><BiChevronLeft className="text-danger"/></h2></button>  
                   <button className="arrows"><h2><BiChevronRight className="text-danger"/></h2></button> </div>)
  const SlidesBtns = ["text-light d-flex justify-content-between px-2 position-relative Slides_Btns"]
  const carouselContainer = ["carouselContainer" ]



  return (
    <>
      <header className=" text-secondary py-2 fixed-top">
         
        {show&& <div className="Menu-container">
        <div className="menuHeader px-4   d-flex justify-content-between" > 
           <div></div>
           <button onClick={() => setShow(false)} className="CloseMenu btn btn-outline-info   fs-5 " id="CloseMenu"> 
            <AiOutlineClose />
           </button>
       </div>

       {/* Modal */}
       <Modal selected={selected} />

     <div className={CardContainer}> 
         <h4>{CardsHeadr[1]}</h4>
       <div className={MenuPosters}  >
         {Svideo.map((Svideo) => <div className={ MenuCards} onClick={() => GetTrailer(Svideo, series, setShowModal(true))}><Posters Svideo={Svideo}/>
         </div>)}
        </div>
        {Arrows}
     </div> 
     

     <div className={CardContainer}> 
         <h4>{CardsHeadr[2]}</h4>
       <div className={MenuPosters}  >
         {series.map((Svideo) => <div className={ MenuCards}  onClick={() => GetTrailer(Svideo, series, setShowModal(true))}><Posters Svideo={Svideo} />
         </div>)}
        </div>
        {Arrows}
     </div> 

     <div className={CardContainer}> 
         <h4>{CardsHeadr[3]}</h4>
       <div className={MenuPosters}  >
         {series.map((Svideo) => <div className={ MenuCards} ><Posters Svideo={Svideo}/></div>)}
        </div> 
        {Arrows}
        
     </div> 
     

     
    
    
     
     
          
          <NavMenu/>
          </div> }

        <div className="m-4  d-flex  justify-content-between  align-items-center">
          <div className="logo"><NavBar /></div>
          
         
          <div className="d-flex align-items-center justify-content-between" id="inputMenu">
            <form onSubmit={Searcher} className="input-container bg-info rounded  d-flex p-1">
              <input type="text"
                placeholder="Search for movies"
                value={SearchMovies}
                onChange={(e) => setSearchMovies(e.target.value)}
              />
              <button className="btn" onClick={() => GetVideo(SearchMovies)}>
                <BsSearch type="submit" />
              </button>

            </form>

            <Button name={
              <h3 className="text-info">
                <FaTh onClick={() => setShow(true)} />
              </h3>} />
          </div>
        </div>
      </header>

      <main className="bg-dark">
      
        <div className="  row" id="main-container">
        
          <section className="SideBar  py-3  d-flex justify-content-center col-lg-2">
            <div className="sideBar-container    d-none d-sm-flex  justify-content-start d-lg-block   position-fixed">

              <Button name={
                <div className="fs  rounded p-2" onClick={() => GetVideo(setType())}>
                  <FaChromecast />
                  <span className="fs-6 " >  Trending </span>
                </div>} />

              <Button name={
                <div className="fs  rounded p-2  d-flex d-none  d-lg-flex" 
                onClick={()=> {setSvideo( series, setType(false))}}>
                  <BiMoviePlay />
                  <span className="fs-6 " >Tv Series </span>
                </div>}    
              />

              <Button name={
                <div className="fs  rounded p-2" onClick={() => alert('Filter has been disabled')}>
                  <BsSliders />
                  <span className="fs-6" > filter movies</span>
                </div>} />

              <Button name={
                <div className="fs  rounded p-2  d-flex d-none  d-lg-flex  d-md-flex" onClick={() => GetVideo('e', setType(false))}>
                  <BsFilm />
                  <span className="fs-6 "> Hollywood </span>
                </div>} />

              <Button name={
                <div className="fs  rounded p-2  d-flex d-none  d-lg-flex" onClick={() => GetVideo('wwe', setType())}>
                  <GiFilmSpool />
                  <span className="fs-6  " > Wrestling </span>
                </div>} />

              <Button name={
                <div className="fs  rounded p-2  d-flex d-none  d-lg-flex" onClick={() => GetVideo('bolly')}>
                  <BsFilm />
                  <span className="fs-6 " > Bollywood </span>
                </div>}
              />

              <Button name={
                <div className="fs  rounded p-2  d-flex d-none  d-lg-flex" onClick={() => GetVideo('ufc')}>
                  <BsFilm />
                  <span className="fs-6 " > UFC </span>
                </div>}
              />

              <Button name={
                <div className="fs  rounded p-2  d-flex d-none  d-lg-flex" onClick={() => GetVideo()}>
                  <CiYoutube />
                  <span className="fs-6 " >  Nollywood </span>
                </div>}
              />
            </div>
          </section>

          <section className="AsideRight   position-relative  justify-content-center col">
          
          
          <figure className="overview mt-4">
            {/* Modal */}
             <Modal selected={selected} />

             {/* Slide images */}
             <MovieSlider Movieslide={Movieslide}/>

             
          </figure>

              {/* Moviecard rendering section */}
              <div className={CardContainer}>
              <h2>{CardsHeadr[0]}</h2>
              {Svideo.map(Svideo => (<div key={Svideo.id} className={CardStyle} onClick={() => GetTrailer(Svideo, series, setShowModal(true))}>
                <MovieCard Svideo={Svideo} />
              </div>))}
            </div>

          </section>
        </div>
      </main>

      <footer className="bg-light">
      </footer>



    </>

  );
}

export default App