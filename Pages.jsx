import { useEffect, useState } from "react";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";
import axios from "axios";



const Pages = ({setSvideo, selected, movieOption, MovieType, showGenre, Svideo}) => {
    const Video_API = "https://api.themoviedb.org/3";
    const myKey = '70aeaf6cc2f0f2330bec04f30130925d';
   
    
    const [currentPage, setCurrentPage] = useState(1)
    const [Movieslide, setMovieslide] = useState([]);

    {/* Next page  */}
    const GetPage = async () => {
        const Type = "discover"
        const {data} = await axios.get(`${Video_API}/${Type}/${MovieType}`,{
            params: {
                page: (`${currentPage}`),
                api_key: (`${myKey}`),
            }
        })
          setSvideo(data.results, selected, movieOption, showGenre, Svideo);
          setMovieslide(data.results, selected, movieOption, showGenre, Svideo);
    }     



    useEffect(()=>{
        GetPage(); 
    },[currentPage])

    return(
        <div className="pagesBtn d-flex bg-info p-1 rounded m-2">
        {currentPage !== 1? <div className="Page" id="PrevPage"  onClick={() => setCurrentPage((PrevPage)=> PrevPage - 1 )}> 
        <BsArrowLeftShort/> Prev</div> 
    :  null}
         
          <div className="Page text-info" id="currentPage">
            Page <span className="text-info fw-bold">{currentPage}</span>
          </div>
         <div className="Page"  id="NextPage" onClick={() => setCurrentPage((PrevPage)=> PrevPage + 1 )}> Next <BsArrowRightShort/> </div>
         
        </div>
    )
}





export default Pages


    