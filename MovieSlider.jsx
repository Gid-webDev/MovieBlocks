import React, {useEffect, useRef, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import {FaPlay} from "react-icons/fa"
import MovieCard from './MovieCard';



  
    const images = "https://image.tmdb.org/t/p/original"



function MovieSlider({Movieslide}) {
    const timeRef = useRef(null);
    const [currSlide, setCurrSlide] = useState(0)
    const SlidesBtns = ["text-light d-flex justify-content-between px-3 position-relative Slides_Btns"]
    const MovieSlideStyles = { backgroundSize:'cover ', backgroundPosition:'top',
    
  }
    const getMovieSlideStyles = ( MovieSlideIndex) =>  ({
      ...MovieSlideStyles,
     backgroundImage:  `url('${images}${Movieslide[MovieSlideIndex].backdrop_path}') `,
     height:'420px', width:'100%',
      });

     const  MovieContainerStyle= {height:'420px', display:'flex',
      transition:'transform ease-out 1s', position:'absolute', 
    }
     const getMovieSlideContainerStyles= ()=>({
      ...MovieContainerStyle,
         width:'2000%', transform:`translateX(${ -(currSlide * 5)}%)`
      })


    function Prev (){
      const LastSlide = currSlide === Movieslide.length - 1
        const NewSlide = LastSlide?  0  : currSlide + 1
        setCurrSlide(NewSlide)
      }
      
      function Next () {
        const FirstSlide = currSlide === 0
        const NewSlide =  FirstSlide?  Movieslide.length - 1 : currSlide - 1
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
       <h2 className='text-light text-start py-1 px-4 bg-info  Trending-today'>
         Trending now
       </h2>
        <div style={{overflow:'hidden', height:'420px', display:'flex', width:'100%', position:'relative'}}>

        <figure id='slideImage' style={getMovieSlideContainerStyles()}> 
        {Movieslide.map((movieForEach, MovieSlideIndex)=> (<div key={Movieslide.id} 
          style={getMovieSlideStyles( MovieSlideIndex)}> 
          <div id='movieName'  className='fw-bold fs-1 px-4 text-light text-start position-absolute'>{Movieslide[MovieSlideIndex].title }</div>  </div>))
        }
    </figure>
    <div className={SlidesBtns}>
           <div id="btn" onClick={Prev}> <BiChevronLeft/></div>
           <div id="btn" onClick={Next}> <BiChevronRight/></div>
         </div>
        </div>

    

    </section>
      
    </div>
  )
}

export default MovieSlider
