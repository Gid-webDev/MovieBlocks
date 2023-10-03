import React, { useState } from 'react'
import Button from "./Button";



const GenreBox = ({ GetVideo, genreenre, selectedGenre,setSelectedGenre,  setGenre, movieOption, setCurrentPage, thisGenre, setGenreName, mode}) => {
  
  return (
    <>
    <div className="sideBar-container py-2  d-flex d-lg-block  position-fixed" style={{overflowY:'auto', height:'82vh'}}>
      {thisGenre.map((genre, genreIndex)=> (genre, 
        <ul id='genre'  key={genreIndex} className={mode ? 'text-dark fw-medium' : 'text-light'}
        style={{cursor:'pointer', margin:'0 15px 0 0',
      }} 
        onClick={()=> GetVideo(setGenre(selectedGenre), setGenreName(genre.name), selectedGenre(genre),
          setCurrentPage(1))}>
          <li style={{listStyle:'none'}}> {genre.name} </li>
         <hr/>
        </ul>))}
   </div>
    </>
  )
}

export default GenreBox
