import React, { useState } from 'react'
import Button from "./Button";



const GenreBox = ({GenreBtn, GetVideo, setGenre, movieOption, thisGenre, setGenreName}) => {
  
  return (
    <>
    <div className="sideBar-container py-2  d-flex d-lg-block  position-fixed" style={{overflowY:'auto', height:'82vh'}}>
      {thisGenre.map((genre, genreIndex)=> (genre, 
        <button className={GenreBtn} key={genreIndex.id} style={{margin:'8px'}} 
        onClick={()=> GetVideo(setGenre(genre.id), setGenreName(genre.name))}>
         {genre.name}
        </button>))}
   </div>
    </>
  )
}

export default GenreBox
