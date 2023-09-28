import React from 'react'

const images = "https://image.tmdb.org/t/p/original/"

const Posters = ({Svideo, genreName, categoryOptions}) => {
  return (
    <div className='row'>
      <div className="CardsContainer col-4 ">
       <div className="Cards" style={{}}>
          <img className='img-fluid' src={`${images}${Svideo.poster_path}` } alt=""/>
        </div> 
     </div>
        <div className='col'>
        <div className= "text-light text-start fs-5 px-2 fw-bold"> 
        <span className='fw-light fs-6 text-info'> {categoryOptions} </span> <br/>
        {Svideo.original_title}   {Svideo.original_name}<br/>
        <span className="fw-light fs-6">
        Released {Svideo.release_date}    {Svideo.first_air_date} <br/>
        <span className='text-info'>{genreName}</span> 
        </span>
        </div>
        </div>
    </div>
  )
}

export default Posters
