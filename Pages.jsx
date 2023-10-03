import { useEffect, useState } from "react";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";



const Pages = ({setCurrentPage, currentPage, mode, }) => {
    const handlePrevPage = () => setCurrentPage((PrevPage)=> PrevPage - 1 )
    const handleNextPage = () => setCurrentPage((PrevPage)=> PrevPage + 1 )
    return(
        <div className="pagesBtn d-flex p-1 rounded " style={{scale:'1'}}>
        {currentPage !== 1? <div className={mode? "Page" : "Page text-light"} id="PrevPage"  
        onClick={handlePrevPage}> 
        <BsArrowLeftShort/> Prev</div> 
    :  null}
         
          <div className={mode? "btn  text-light" : 
          "Page text-info"} id="currentPage" style={{border:'0'}}>
            Page <span className="fw-bold">{currentPage}</span>
          </div>
          
         <div className={mode? "Page" : "Page text-light"}  id="NextPage" onClick={handleNextPage}> 
           Next <BsArrowRightShort/> 
         </div>
         
        </div>
    )
}





export default Pages


    