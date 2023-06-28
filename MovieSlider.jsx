import React, {useEffect, useRef, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import {FaPlay} from "react-icons/fa"



  
    const images = "https://image.tmdb.org/t/p/original"



function MovieSlider({Movieslide}) {
    const timeRef = useRef(null);
    const [currSlide, setCurrSlide] = useState(0)
    const SlidesBtns = ["text-light d-flex justify-content-between px-2 position-relative Slides_Btns"]
    const slideImage =  currSlide? ({ backgroundImage:  `url('${images}${Movieslide[currSlide].backdrop_path}') `}) : 
    ({ backgroundImage:  `url('${images}${Movieslide.backdrop_path}') `})

    const MovieDetails = <div>
          {/* dark overlay background for slides */}
          <div className="">
          <div className="container position-relative text-white   text-left">
            <h1>
            {Movieslide.original_title}
           </h1>
          </div>
         </div>
    </div>


    function Prev (){
        const FirstSlide = currSlide === 0
        const NewSlide =  FirstSlide?  Movieslide.length - 1 : currSlide - 1
        setCurrSlide(NewSlide)
        console.log(NewSlide)
      }
      
      
      function Next () {
        const LastSlide = currSlide === Movieslide.length - 1
        const NewSlide = LastSlide?  0  : currSlide + 1
        console.log(NewSlide)
        setCurrSlide(NewSlide)
      }

  
      useEffect(()=> {
        
       timeRef.current = setTimeout(() => {
        if (timeRef.current) {
            clearTimeout(timeRef.current)
        }
        Next();
       }, 5000)
       return() => clearTimeout(timeRef.current)
      });
  return (
    <div>
    <section>
        <figure id='slideImage' style={slideImage}>
        <div className={SlidesBtns}>
           <div id="btn" onClick={Prev}> <BiChevronLeft/></div>
            {/*  Player button  is hidden with display none property */}
            <button className="play-btnSlides fs-2  d-flex align-items-center  d-none" onClick={() => setPlayer(true)}>
            <FaPlay />
       </button>
           <div id="btn" onClick={Next}> <BiChevronRight/></div>
         </div>
         {MovieDetails}
    </figure>

    <figure className="overlay">
    
    </figure>
    

    </section>
    

      
    </div>
  )
}

export default MovieSlider
