import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import NavBar from "./NavBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "./Button";
import { BsSearch,  } from "react-icons/bs"
import { BiChevronLeft, BiChevronRight,} from "react-icons/bi"
import { FaBars, FaChromecast } from "react-icons/fa"
import {GiFilmSpool } from "react-icons/gi"
import { CiYoutube } from "react-icons/ci"
import { AiOutlineClose, AiFillGithub, AiFillLinkedin, AiOutlineTwitter, AiFillFacebook, AiOutlineWhatsApp } from "react-icons/ai";
import axios from "axios";
import { FaPlay, FaSearch} from "react-icons/fa";
import YouTube from "react-youtube"
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import NavMenu from "./Menu";
import Posters from "./Posters";
import MovieSlider from "./MovieSlider";
import Pages from "./Pages";
import { MdLightMode} from "react-icons/md";
import {FaRegMoon} from "react-icons/fa"
import GenreBox from "./GenreBox";
import SearchArea from "./SearchArea";
import * as myGenre from './AllGenre';
import {Football, Nigerian, UFCfight, Wrestling} from "./MovieApi";
import {ImSearch} from 'react-icons/im'









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
  const [genre, setGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [wwe, setWWE] = useState([]);
  const [UFC, setUFC] = useState([]);
  const [naija, setNaija] = useState([]);
  const [UEFA, setUEFA] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [showcategory, setShowCategory] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [WWEPage, setWWEPage] = useState(1);
  const [UFCPage, setUFCPage] = useState(1);
  const [NaijaPage, setNaijaPage] = useState(1);
  const [UEFAPage, setUEFAPage] = useState(1);



 

  const GenreArray = [28, 16, 12, 27, 99, 10751, 878, 10770, 36, 10402, 35, 18, 10763, 10764, 10749, 10762, 10767, 10766, 10768, 10765];
  const MovieType = movieOption === true? 'movie' : 'tv';
  
  const GetVideo = async (SearchMovies) => {  
    const Type = SearchMovies ? "search" : "discover"
    const { data: { results } } = await axios.get(`${Video_API}/${Type}/${MovieType}`, {
      params: {
        page:  (`${currentPage}`),
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
    const {data} = await FetchVideo(Svideo.id, wwe.id, UFC.id)
    setSelected(data, Svideo, slide)
    setPlayer(false)
    console.log(data)
  }


  
  useEffect(() => {
  GetVideo();

  }, [currentPage, MovieType, genre] );

  

  const Searcher = (e) => { e.preventDefault();
    setPlayer(false);
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
      <div style={{display:'flex', justifyContent:'center', position:'relative', 
        width:'100%', right:'-6px', top:'0', zIndex:'10'}}>
        {showModal && <div id="modal_ID" style={{boxShadow:'0px 10px 10px',}}
           className="Modal text-dark   card  bg-light position-fixed my-1">
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
              <h2 className="card-title">{selected.original_title} {selected.original_name}</h2>
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
  const HeaderStyly_D = [/* Dark Mode for cards */ "bg-black text-secondary fixed-top"]
  const HeaderStyly_L = [/* Light Mode for cards */ "text-secondary py-0 fixed-top bg-black"];
  const CardsHeadr = ["filter", "COLLECTIONS", "TRENDING", "TV SERIES", "ANIMATION", "Nollywood", "Bollywood", "Wrestling", "UFC"];
  const CardStyle = ["CardImg "];
  const MenuCards = ["CardImg mx-2"];
  const MenuPosters = ["my-1  Card-Container"];
  const Arrows = ( <div className="arrows d-flex justify-content-between">
                   <button className="arrows"><h2><BiChevronLeft className="text-danger"/></h2></button>  
                   <button className="arrows"><h2><BiChevronRight className="text-danger"/></h2></button> </div>)
  const DarkMode = ["bg-black row dark"]
  const LightMode = ["bg-light row light"]
  const Mode = mode?  LightMode : DarkMode
  const GenreBtn = ["fs  rounded p-2  d-flex  d-lg-flex"]
  const SideBar = ["SideBar  py-5  justify-content-center col-lg-2 d-none  d-lg-block"]
  const SideBar_Menu = ["SideBar_Menu  py-1 justify-content-center  d-lg-none"]
  const sideBarContainer = ["sideBar-container justify-content-start d-lg-block  position-fixed"]
  const sideBarContainer_Menu = ["sideBar-container_Menu justify-content-start d-lg-none"]
  const NavContainer = ["d-flex align-items-center justify-content-between" ]
  /* large screen size Search / input accessories */
  const formStyleClassBig = ["input-container shadow bg-light mx-3  d-flex px-2 d-lg-flex d-none"]
  const formStyle2 = {boxShadow:'0 2px 2px', maxWidth:'60vw'}
  const InputClassBig = ["container-fluid"]
  /* small screen search/input accessories */
  const formStyleClassSmall = showInput ? ["d-lg-none rounded  bg-light position-fixed"] :
  ["d-lg-none rounded  bg-black position-fixed"]
  const formStyleSmall = showInput? {position:'absolute', width:'100%', zIndex:'5', boxShadow:'1px 0px 2px 2px rgba(0, 0, 0)', 
  display:'flex', flex:'1', right:'0', top:'0px', padding:'3px 0',
  transition:'0.8s',} : 
  {position:'absolute', width:'0%', zIndex:'-5', boxShadow:'1px 0px 2px 2px rgba(0, 0, 0)', 
  display:'flex', flex:'1', right:'10%', top:'0px', padding:'', transition:'0.8s'
   }
  const inputStyleSmall = showInput? ["container-fluid bg-light text-black fs-5 d-flex flex-1 rounded"] :
  ["container-fluid bg-black text-black fs-5 d-flex flex-1 rounded"]
  /* TV SERIES AND MOVIES GENRE (Option)LOGIC */
  const thisGenre = movieOption === true? myGenre.NewMoviesGenre : myGenre.NewTvGenre
  /*  STYLES FOR GENRES INSIDE THE MENU */
  const MoviesAndTv = showcategory === true? ({fontSize:'13.8px', cursor:'pointer', padding:'9px', minWidth:'80px', transition:'0.5s'}) :
  ({fontSize:'0px', cursor:'pointer', padding:'0px', minWidth:'80px', transition:'0.5s',})
  const categoryandGenreStyle = ("text-info px-2")
  const categoryOptions = movieOption === true? 'MOVIES' : 'TV Series'
  const categoryHover = {color:''}
  const onmouseover = () => ({
    ...categoryHover, cursor:'pointer'
  })
  const SpecialCollections = [mode? "text-start bg-black text-light fw-bold fs-2 px-2 py-1" : 
  "bg-light fw-bold fs-2 text-start text-dark px-2 py-1"]
  const myLinks = [
    {name: <AiFillGithub/>, link: "https://github.com/Gid-webDev"},
    {name: <AiFillLinkedin/>, link: "https://www.linkedin.com/in/gideon-nwabueze-83840b281/"},
    {name: <AiOutlineTwitter/>, link: "https://twitter.com/gid2gid?s=11&t=GbRBhIv6Ws3cplWUbCrU4Q"},
    {name: <AiFillFacebook/>, link: "https://web.facebook.com/Gidddy"},
    {name: <AiOutlineWhatsApp/>, link: "https://wa.me/2347031523129", label: "Chat on WhatsApp"}
  ]
  
 
   
  return (
    <>
      <header className={mode? HeaderStyly_L : HeaderStyly_D} style={{}}>
         
        {show&& <div className=" px-4 py-1" style={{overflowY:'hidden', height:'100vh', zIndex:'10'}}>
        <div className="menuHeader  py-1  d-flex justify-content-between" > 
           <div /* BRAND LOGO IS HIDDEN INSIDE THE MENU*/ className=" d-none"> 
             <NavBar/> 
            </div>
            
           <div  className=""
             style={{cursor:'pointer', width:'100%', display:'flex', alignItems:'center',
              justifyContent:'space-between', scale:'0.98'}}>
             <div /* SEARCH BUTTON TRIGGERS THE SEARCH INPUT */ className="">
             {showInput === true? (
              null
              ) : (
             <div /* button for showing search accessories for smallsize screens */ 
              className="btn text-info d-lg-none d-block" onClick={() => setShowInput(true) }
              style={{position:'absolute', top:'1px', scale:'1'}}>
              <ImSearch type="submit" style={{zIndex:'10', fontSize:'30px'}} />
             </div>
             )}
              <div /* show search input and button for small to medium screen size*/>
             <SearchArea SearchMovies={SearchMovies} setSearchMovies={setSearchMovies} movieOption={movieOption}
             setMovieOPtion={setMovieOPtion} showInput={showInput} setShowInput={setShowInput} Searcher={Searcher}
             GetVideo={GetVideo} formStyleClassSmall={formStyleClassSmall} formStyleSmall={formStyleSmall} setCurrentPage={setCurrentPage}
             inputStyleSmall={inputStyleSmall} setShow={setShow} show={show}
             />
             </div>
             </div> 
            <div /* close menu button*/ className="btn btn-info" style={{scale:'0.79', zIndex:'0'}}>
              <AiOutlineClose className="fs-4" onClick={()=> setShow(false)}/>
            </div>

           </div>
       </div>
     <div className=" d-flex justify-content-between px-3 py-1" onClick={()=> setShowInput(false)}>
     <h6 style={{marginRight:'0px'}} className="btn btn-outline-light my-2 d-flex align-items-center" 
        onClick={()=> showcategory === true? setShowCategory(false) : setShowCategory(true)}> 
         CATEGORY 
         <div className="d-flex mx-2 px-2 text-dark position-absolute bg-light rounded" style={{top:'62.5px', left:'40%', zIndex:'0' }}> 
          <div style={MoviesAndTv}  onClick={()=> GetVideo(setMovieOPtion(true, 
            setWWEPage(1), setUFCPage(1), setNaijaPage(1)), setUEFAPage(1), setShowCategory(false),)}>
           MOVIES
          </div> 
          <div style={MoviesAndTv}  onClick={()=> GetVideo(setMovieOPtion(false, 
            setWWEPage(1), setUFCPage(1), setNaijaPage(1), setUEFAPage(1)),  setShowCategory(false), )}> 
           TV SERIES
          </div> 
        </div>
     </h6>
     
      <h6 onClick={() => setShowCategory(false)}>
       <span className='text-info btn fw-bold px-2' style={{fontSize:'19px'}}> {genreName} </span>
      </h6>  
     </div>
     <div className=" row g-0 w-100 py-3"  style={{height:'80vh', overflow:'hidden'}} onClick={()=> setShowInput(false, setShowCategory(false))}>
     <section /* GENRES FOR MOVIES AND TV SERIES INSIDE THE MENU */  
     className="col-md-6">
     <ul  className="px-0 row mx-1 " 
     style={{justifyContent:'start', display:'flex', height:'80vh', overflowY:'auto', overflowX:'hidden'}} id="menuGenre"> 
     {  
      thisGenre.map( (genreIndex, genreId,)=> ( 
      <li className="m-1 text-start col-lg-6 fs-6 text-light"
      style={{placeContent:'center', placeItems:'center', listStyle:'none', 
      cursor:'pointer', lineHeight:'1'}} 
      key={genreId} 
      onClick={()=>  GetVideo(setGenre(genreIndex.id), setCurrentPage(1), setGenreName(genreIndex.name), setShowCategory(false))}>
         {genreIndex.name} <hr className="text-secondary"/>
      </li> ))}
     </ul> 
 </section>

 <section /* MENU WITH MOVIE CARDS RENDERED */ className=" col-md-6 d-md-flex justify-content-end d-none py-3"
 style={{overflow:'auto', height:'80vh',}} id="menuGenre">
  <div > 
    <div className={MenuPosters} >
        {Svideo.map((Svideo) => <div className={ MenuCards}  
        style={{border:'solid #ddd 0px', minWidth:'300px', scale:'0.8' , cursor:'pointer',
        boxShadow:'1px 1px 3px 1px rgba(255, 255, 255, 0.4)' }}
        key={Svideo.id} onClick={() => GetTrailer(Svideo, series, setShowModal(true), setSelected(Svideo))}>
       <Posters Svideo={Svideo} genreName={genreName} categoryOptions={categoryOptions} />
      </div>)}
    </div>   
  </div>     
  </section>
 </div>
    </div>}

        <div className="m-3  d-flex  justify-content-between  align-items-center">
          <div className="logo" onClick={()=>{setShowInput(false)}}>
            <NavBar />
          </div>
          
          

          <div  className={NavContainer} style={{minWidth:'85px'}}>
          

          {/* search accessories large screens input & button */ }
            <SearchArea SearchMovies={SearchMovies} setSearchMovies={setSearchMovies} movieOption={movieOption}
             setMovieOPtion={setMovieOPtion} Searcher={Searcher} GetVideo={GetVideo} 
             InputClassBig={InputClassBig}  formStyle2={formStyle2} formStyleClassBig={formStyleClassBig} 
             showInput={showInput} setShowInput={setShowInput} setCurrentPage={setCurrentPage} 
            /> 

          <h4 /* dark and light mode toggle */>
          {mode? (<div className=" text-info" onClick={()=> {setMode(false)}}> <MdLightMode className="fs-5" style={{cursor:'pointer'}} /></div>)
            : <div className=" text-info" onClick={()=> {setMode(true)}}> <FaRegMoon className="fs-6" style={{cursor:'pointer'}} />
            </div>}
          </h4>
            
            {/* menu */}
            <Button name={
              <h3 className="text-info  fs-5">
                <FaBars onClick={() => setShow(true)} className="fs-3" />
              </h3>} />
          </div>
        </div>
      </header> 

      <main className="">
        <div className={Mode} id="main-container">
        <div /* MODAL SPECIALLY FOR PLAYING TRAILER */ className="position-relative"
          style={{zIndex:'2000',}}>
          <Modal selected={selected} /> 
         </div>
         
           {/*Side Bar with buttons, col */}
          <section className={SideBar}>
            <div className={sideBarContainer}>
            
           {/* Genre buttons rendered through GenreBox component */}
          <div className="col-md-4 text-white text-start" id="MenuHeaders">
          
          <GenreBox GenreBtn={GenreBtn} GetVideo={GetVideo} setGenre={setGenre} 
          setMovieOPtion={setMovieOPtion} movieOption={movieOption} mode={mode}
          GenreArray={GenreArray} thisGenre={thisGenre} setGenreName={setGenreName}
          setCurrentPage={setCurrentPage} />
        </div>
                
            </div>
          </section>
          {/* AsideRight Right side displaying movie cards */} 
          <section className="AsideRight  position-relative  justify-content-center col-lg-10 my-4 col">

           <figure className="overview my-0 " onClick={()=>{setShowInput(false)}}>
           
             {/* Rendering slides images */}
             <MovieSlider Movieslide={Movieslide} categoryOptions={categoryOptions}
               mode={mode} movieOption={movieOption} genreName={genreName}/> 
          </figure>
              {/* Moviecard rendering section */}
              <div style={{marginTop:'435px', position:'relative', right:'-10px'}} onClick={()=>{setShowInput(false)}}>
              <h1 className={mode? ("text-start px-3 py-3 fs-1 fw-bold text-dark ") : 
              ("text-start px-1 py-3 fs-1 fw-medium text-light ")
            }>
            <span className="fs-1">Trend<span className="text-info">ing...</span></span>
             <span className="h6">{categoryOptions}</span>
             <span 
               className={mode? "fw-light text-info fs-6 fw-medium mx-2" : 
               "fw-medium text-info fs-6 mx-2"}>{genreName}
                 </span> 
              </h1>
               <div id="" className="row"  style={{ width:'100%'}}>
               {Svideo.map(Svideo => (<div key={Svideo.id} style={{scale:'1'}}
                className='col-lg-2 col-sm-3 col-6 py-3' onClick={() => GetTrailer(Svideo, setShowModal(true))} >
               <MovieCard style={{}} Svideo={Svideo} mode={mode} categoryOptions={categoryOptions} genreName={genreName}/>
             </div>))} 
               </div>
               
               {/* Pagination, Prev and Next button/current page  */}
            <div className="d-flex  justify-content-center" onClick={()=>{setShowInput(false), setShowInput(false)}}>
            <Pages setSvideo={setSvideo} selected={selected} genre={genre} Movieslide={Movieslide} MovieType={MovieType} 
            showGenre={''} setCurrentPage={setCurrentPage} mode={mode} currentPage={currentPage}/>
          </div>
            </div>


            <div className="" style={{scale:'0.95'}} onClick={()=> setShowInput(false)}>
    
             <section /* WRESTLING  */>
             <Wrestling wwe={wwe} setWWE={setWWE} naija={naija} mode={mode} Video_API={Video_API} 
               myKey={myKey} SpecialCollections={SpecialCollections} GetTrailer={GetTrailer}
               setShowInput={setShowInput} setShowModal={setShowModal} MovieType={MovieType}
               setWWEPage={setWWEPage} WWEPage={WWEPage}/>
             </section>
             
              <section /* UFC  */>
              <UFCfight UFC={UFC} setUFC={setUFC} naija={naija} mode={mode} Video_API={Video_API} 
               myKey={myKey} SpecialCollections={SpecialCollections} GetTrailer={GetTrailer}
               setShowInput={setShowInput} setShowModal={setShowModal} MovieType={MovieType}
               UFCPage={UFCPage} setUFCPage={setUFCPage}/>
              </section>

             <section /* Naija */>
              <Nigerian naija={naija} mode={mode} setNaija={setNaija} MovieType={MovieType}
               Video_API={Video_API} myKey={myKey} SpecialCollections={SpecialCollections}
               setShowInput={setShowInput} setShowModal={setShowModal} GetTrailer={GetTrailer}
               setNaijaPage={setNaijaPage} NaijaPage={NaijaPage}/>
             </section>

             <section /* UEFA */>
              <Football UEFA={UEFA} mode={mode} setUEFA={setUEFA} MovieType={MovieType}
               Video_API={Video_API} myKey={myKey} SpecialCollections={SpecialCollections}
               setShowInput={setShowInput} setShowModal={setShowModal} GetTrailer={GetTrailer}
               setUEFAPage={setUEFAPage} UEFAPage={UEFAPage}/>
             </section>

            </div>
             
          </section>
        </div>
      </main>

      <footer className="bg-black px-3"  onClick={()=>{setShowInput(false)}} 
      style={{position:'relative', minHeight:'', }}>
      <div className=" px-0 row"  style={{position:'relative', minHeight:'',
      display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div className=" col-lg-9 py-2" style={{display:'flex', placeItems:'center'}}>
           <div className=""
              style={{width:'45px', height:'45px', borderRadius:'50%', overflow:'hidden'}}>
              <img src="gid.jpg" alt="" className="img-fluid "/>
           </div> 
         <p className="fw-light fs-6 text-light mx-2 my-1 col text-start" style={{display:'inline'}}>
            <span style={{display:'inline'}}>
               <span  style={{fontSize:'14px',}}>
                  Proudly a product of gid.webdev.pro 
               </span> 
                &nbsp; &nbsp;
              <span className="text-info" style={{fontSize:'13px'}}>
                Copyright © 2023 Gid-webDev
              </span> 
            </span>   
         </p>
       </div>
      
      <div className="text-light my-2 mt-0 fs-2 d-flex justify-content-around col-lg-3" 
      style={{scale:'0.9',}}>
         {myLinks.map((myLink, myLinkindex) =>(<a key={myLinkindex} href={myLink.link} 
          target="_blank" aria-label={myLink.label} className="text-light">
           {myLink.name}
         </a>))}
       </div>
      </div>
      </footer>

    </>

  );
}

export default App