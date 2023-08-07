import React from 'react'
import Button from "./Button";
import { BsSearch, BsFilm, BsSliders } from "react-icons/bs"
import {GiFilmSpool } from "react-icons/gi"



const GenreBox = ({GenreBtn, GetVideo, setGenre, setMovieOPtion, setShowFilter, movieOption }) => {
  const GenreArray = [28, 16, 12, 27, 99, 10751, 878, 10770, 36, 10402, 35, 18, 
                      10763, 10764, 10749, 10762, 10767, 10766, 10768, 10765];
  return (
    <div>
    <div className="sideBar-container  d-flex  justify-content-start d-lg-block   position-fixed">
      

         <Button name={
          <div className={GenreBtn} onClick={() => GetVideo( setMovieOPtion(false))}>
            <BsFilm />
            <span className="fs-6 "> Tv series  </span>
          </div>} /> 

          <Button name={
            <div className={GenreBtn} onClick={() => GetVideo( setMovieOPtion(true))}>
              <BsFilm />
              <span className="fs-6 "> Movies  </span>
            </div>} />

          
    
        {movieOption !== true? <Button name={
          <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[19]))}>
            <BsFilm />
            <span className="fs-6 "> Sci-Fi & Fantasy  </span>
          </div>} /> : <Button name={
            <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[0]))}>
              <BsFilm />
              <span className="fs-6 "> Action </span>
            </div>} />}    
   
   {movieOption !== true? <Button name={
    <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[4]))}>
      <BsFilm />
      <span className="fs-6 "> Documentary </span>
    </div>} /> : <Button name={
      <div className={GenreBtn} onClick={() => GetVideo( setGenre( GenreArray[8]))}>
        <BsFilm />
        <span className="fs-6 "> Epic Movies </span>
      </div>} />}        

    {movieOption !== true? <Button name={
      <div className={GenreBtn} onClick={()=> GetVideo(setGenre(GenreArray[15]))} >
        <BsFilm />
        <span className="fs-6 " > Kids show</span>
      </div>}
    /> : <Button name={
      <div className={GenreBtn} onClick={()=> GetVideo(setGenre(GenreArray[1]))} >
        <BsFilm />
        <span className="fs-6 " >Animation</span>
      </div>} />}
  
  {movieOption !== true? <Button name={
    <div className={GenreBtn} onClick={() => GetVideo(setGenre(GenreArray[12]))}>
      <BsFilm />
      <span className="fs-6 " > News </span>
    </div>}
  /> : <Button name={
    <div className={GenreBtn} onClick={() => GetVideo(setGenre(GenreArray[14]))}>
      <BsFilm />
      <span className="fs-6 " > Romance </span>
    </div>} />}

  {movieOption !== true? <Button name={
    <div className={GenreBtn} onClick={()=> GetVideo(setGenre(GenreArray[13]))} >
      <BsFilm />
      <span className="fs-6 " >Reality TV</span>
    </div>}
  /> : <Button name={
    <div className={GenreBtn} onClick={()=> GetVideo(setGenre(GenreArray[9]))} >
      <BsFilm />
      <span className="fs-6 " >Musicals</span>
    </div>} />}

    {movieOption !== true? <Button name={
      <div className={GenreBtn} onClick={()=> GetVideo(setGenre(GenreArray[16]))} >
        <BsFilm />
        <span className="fs-6 " >Talk show</span>
      </div>}
    /> : <Button name={
      <div className={GenreBtn} onClick={()=> GetVideo(setGenre(GenreArray[5]))} >
        <BsFilm />
        <span className="fs-6 " >Family</span>
      </div>} />}
    
</div>
    </div>
  )
}

export default GenreBox
