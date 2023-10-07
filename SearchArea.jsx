import React from 'react'
import {ImSearch} from 'react-icons/im'

const SearchArea = ({showInput, inputStyleSmall, setShowInput, Searcher, setShow, show,
    SearchMovies, setSearchMovies, movieOption, setMovieOPtion, GetVideo, setCurrentPage,
    formStyleSmall, formStyleClassSmall, formStyleClassBig, formStyle2, InputClassBig}) => {
 
    
  return (
    <>
    <form onSubmit={Searcher} className={`${formStyleClassSmall}/ ${formStyleClassBig}`}
    style={{...formStyleSmall, formStyle2}}> 
  <input className={`${inputStyleSmall} /${InputClassBig}`} 
  style={{}}
    type="text"
    placeholder="Search for movies &... "
    value={SearchMovies}
    onChange={(e) => setSearchMovies(e.target.value)}
  />
  <button className="btn rounded-0 shadow-none text-black" style={{zIndex:'10'}} onClick={() => 
    GetVideo(SearchMovies, setShowInput(false, setShow(false)), setCurrentPage(1)) }>
    <ImSearch type="submit"  className='fs-5 text-black' style={{zIndex:'6'}} />
  </button>
</form>
    </>
  )
}

export default SearchArea
