import React, {useEffect, useRef, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import {FaPlay} from "react-icons/fa"
import MovieCard from './MovieCard';



  
    const images = "https://image.tmdb.org/t/p/original"



function MovieSlider({Movieslide}) {
    const timeRef = useRef(null);
    const [currSlide, setCurrSlide] = useState(0)
    const SlidesBtns = ["text-light d-flex justify-content-between px-3 position-relative Slides_Btns"]
    const slideImage =  currSlide?  ({ backgroundImage:  `url('${images}${Movieslide[currSlide].backdrop_path}') `})  : 
   (null)

    function Prev (){
        const FirstSlide = currSlide === 0
        const NewSlide =  FirstSlide?  Movieslide.length - 1 : currSlide - 1
        setCurrSlide(NewSlide)
      }
      
      function Next () {
        const LastSlide = currSlide === Movieslide.length - 1
        const NewSlide = LastSlide?  0  : currSlide + 1
        setCurrSlide(NewSlide)
      }

  
      useEffect(()=> {
        
       timeRef.current = setTimeout(() => {
        if (timeRef.current) {
            clearTimeout(timeRef.current)
        }
        Next();
       }, 4500)
       return() => clearTimeout(timeRef.current)
      });
  return (
    <div>
    <section>
       <h2 className='text-light text-start py-1 px-4 bg-info  Trending-today'>
         Trending now
       </h2>
        <figure id='slideImage' style={{...slideImage, }}> 
        <div className="container position-absolute  left-0  text-white   text-left">
          {/* dark overlay background for slides */}
          </div>
        <div className={SlidesBtns}>
        {currSlide? <div className='container position-absolute  px-4' id='MovieDetails'>
        <div className='fw-bold fs-1'> {Movieslide[currSlide].title } </div>
        <h6>Release date: {Movieslide[currSlide].release_date} <br/>
         Votes: <span className=' rating fs-5'>{Movieslide[currSlide].vote_average}</span> 
          </h6>
        </div> : null}
        
           <div id="btn" onClick={Prev}> <BiChevronLeft/></div>
            {/*  Player button  is hidden with display none property */}
            <button className="play-btnSlides fs-2  d-flex align-items-center  d-none" onClick={() => setPlayer(true)}>
            <FaPlay />
       </button>
           <div id="btn" onClick={Next}> <BiChevronRight/></div>
         </div>
    </figure>

    <figure className="overlay"></figure>
    </section>
      
    </div>
  )
}

export default MovieSlider
