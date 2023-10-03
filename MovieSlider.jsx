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
      overflow:'hidden', height:'420px', display:'flex', width:'100%', position:'relative', 
      boxShadow:'3px 3px 3px', top:'-8px', alignItems:'center'
  })
  const MovieSlideStyles = { backgroundSize:'cover ', backgroundPosition:'top', }
    const getMovieSlideStyles = ( MovieSlideIndex) =>  ({
      ...MovieSlideStyles,
     backgroundImage:  `url('${images}${Movieslide[MovieSlideIndex].backdrop_path}') `,
     height:'410px', width:'100%',
      });

     const  MovieContainerStyle= {height:'420px', display:'flex',
      transition:'transform ease-out 0.4s,', position:'absolute',
    }
     const getMovieSlideContainerStyles= ()=>({
      ...MovieContainerStyle,
         width:'2000%', transform:`translateX(${ -(currSlide * 5)}%)`,
         
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
       }, 3500)
       return() => clearTimeout(timeRef.current)
      });
  return (
    <div>
    <section>
        <div style={getContainerSlide()}>

        <figure id='slideImage' style={getMovieSlideContainerStyles()}> 
        {Movieslide.map((movieForEach, MovieSlideIndex)=> (<div key={MovieSlideIndex} 
          style={getMovieSlideStyles( MovieSlideIndex)} onLoad={()=> setMovieName(movieForEach.name)}> 
          <div id='movieName' style={{top:'340px'}}
          className='fw-bold fs-1 text-start w-100 text-start position-relative'>
          <div id='slideInfo' style={{height:'90px', display:'flex', alignItems:'center'}}
          className={mode ===true? 'text-light bg-dark  px-5' : 
          'text-dark bg-light px-4'}>
               <p className='fs-1'>
                 {movieOption? (Movieslide[MovieSlideIndex].original_title) :
                  Movieslide[MovieSlideIndex].original_name
                } 
               </p>    
          </div>
                  

          </div> 
   </div>))
        }
    </figure>
    <div className={SlidesBtns} >
           <div id="btn" onClick={Next} style={{top:'35%'}}> 
           <BiChevronLeft/>
           </div>
           <div id="btn" onClick={Prev} style={{right:'-11px', top:'35%'}}> 
           <BiChevronRight/>
           </div>
         </div>
        </div>

    

    </section>
      
    </div>
  )
}

export default MovieSlider
