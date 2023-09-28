import React, {useEffect, useRef, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"



  
    const images = "https://image.tmdb.org/t/p/original"
function MovieSlider({Movieslide, setMovieName, movieName,  mode, movieOption, genreName}) {
    const timeRef = useRef(null);
    const [currSlide, setCurrSlide] = useState(0)

    const DarkMode = {color:'#000'}
    const LightMode = {color:'#fff'}
    const genreColor = mode === true? {color:'white'} : 
    {color:'rgba(0, 202, 255, 0.95)'}
    /* MOVIE & TV HEADER STYLES */
    const Mode = mode ===true? LightMode : DarkMode
    const movieHeader= ()=> ({
      ...Mode, textTransform:'capitalize', display:'flex', alignItems:'center',
    })
    const genreNameStyle =()=>({
      ...genreColor, backgroundColor:'#111', borderRadius:'20px', padding:'0px 14px', 
       fontSize:'17px',
    })
    const SlidesBtns = ["text-light d-flex justify-content-between px-3 position-relative Slides_Btns"]
    const getContainerSlide = () => ({
      overflow:'hidden', height:'420px', display:'flex', width:'100%', position:'relative', boxShadow:'3px 3px 3px'
  })
  const MovieSlideStyles = { backgroundSize:'cover ', backgroundPosition:'top', }
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
       }, 5000)
       return() => clearTimeout(timeRef.current)
      });
  return (
    <div>
    <section>
        <div style={getContainerSlide()}>

        <figure id='slideImage' style={getMovieSlideContainerStyles()}> 
        {Movieslide.map((movieForEach, MovieSlideIndex)=> (<div key={Movieslide.id} 
          style={getMovieSlideStyles( MovieSlideIndex)} onLoad={()=> setMovieName(movieForEach.name)}> 
          <div id='movieName' style={{bottom:'0px'}}
          className='fw-bold fs-1 w-100   text-start position-absolute'>
          <div id='slideInfo' className={mode ===true? 'text-light bg-dark py-1 px-4' : 'text-dark bg-light py-1 px-4'}>
               <p className='fs-2'>
                 {movieOption? (Movieslide[MovieSlideIndex].original_title) :
                  Movieslide[MovieSlideIndex].original_name
                } 
               </p>    
          </div>
                  

          </div> 
   </div>))
        }
    </figure>
    <div className={SlidesBtns}>
           <div id="btn" onClick={Next}> <BiChevronLeft/></div>
           <div id="btn" onClick={Prev}> <BiChevronRight/></div>
         </div>
        </div>

    

    </section>
      
    </div>
  )
}

export default MovieSlider
