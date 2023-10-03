import React from 'react'
import {BsSearch} from 'react-icons/bs'

const SearchArea = ({showInput, inputStyleSmall, setShowInput, Searcher, 
    SearchMovies, setSearchMovies, movieOption, setMovieOPtion, GetVideo, setCurrentPage,
    formStyleSmall, formStyleClassSmall, formStyleClassBig, formStyle2, InputClassBig}) => {
 
    
  return (
    <>
    <form onSubmit={Searcher} className={`${formStyleClassSmall}/ ${formStyleClassBig}`}
    style={{...formStyleSmall, formStyle2}}> 
  <input className={`${inputStyleSmall} /${InputClassBig}`} 
  style={{}}
    type="text"
    placeholder="Search movies"
    value={SearchMovies}
    onChange={(e) => setSearchMovies(e.target.value)}
  />
  <button className="btn rounded-0 shadow-none text-secondary" onClick={() => 
    movieOption === true? GetVideo(SearchMovies, setShowInput(false), setCurrentPage(1), setMovieOPtion(true)) : 
    GetVideo(SearchMovies, setShowInput(false), setCurrentPage(1), setMovieOPtion(false))}>
    <BsSearch type="submit" />
  </button>
</form>
    </>
  )
}

export default SearchArea
