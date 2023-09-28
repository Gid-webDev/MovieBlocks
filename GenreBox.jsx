import React, { useState } from 'react'
import Button from "./Button";



const GenreBox = ({ GetVideo, setGenre, movieOption, thisGenre, setGenreName, mode}) => {
  
  return (
    <>
    <div className="sideBar-container py-2  d-flex d-lg-block  position-fixed" style={{overflowY:'auto', height:'82vh'}}>
      {thisGenre.map((genre, genreIndex)=> (genre, 
        <ul id='genre'  key={genreIndex.id} className={mode ? 'text-dark fw-medium' : 'text-light'}
        style={{cursor:'pointer', margin:'0 15px 0 0',
      }} 
        onClick={()=> GetVideo(setGenre(genre.id), setGenreName(genre.name))}>
          <li style={{listStyle:'none'}}> {genre.name} </li>
         <hr/>
        </ul>))}
   </div>
    </>
  )
}

export default GenreBox
