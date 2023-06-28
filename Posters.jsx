import React from 'react'

const images = "https://image.tmdb.org/t/p/original/"

const Posters = ({Svideo}) => {
  return (
    <div>
    <div className="CardsContainer">
    <div className="Cards  image-fluid" >
    <img src={`${images}${Svideo.poster_path}` } alt=""/>
   
  </div>
   
</div>
    </div>
  )
}

export default Posters
