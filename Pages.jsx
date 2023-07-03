import { useEffect, useState } from "react";
import axios from "axios";



const Pages = ({setSvideo, selected, Movieslide}) => {
    const Video_API = "https://api.themoviedb.org/3";
    const myKey = '70aeaf6cc2f0f2330bec04f30130925d';
    const [page2, setPage2] = useState([]);
    const [page3, setPage3] = useState([]);
    const [page4, setPage4] = useState([]);
    const [page5, setPage5] = useState([]);

    {/* page 2 */}
    const GetPage2 = async () => {
        const Type = "discover"
        const {data} = await axios.get(`${Video_API}/${Type}/movie`,{
            params: {
                page: 2,
                api_key: (`${myKey}`)
            }
        });
        console.log(data);
        setPage2(data.results);   
    }

    {/* page 3 */}
    const GetPage3 = async () => {
        const Type = "discover"
        const {data} = await axios.get(`${Video_API}/${Type}/movie`,{
            params: {
                page: 3,
                api_key: (`${myKey}`)
            }
        });
        console.log(data);
        setPage3(data.results);   
    }

    {/* page 3 */}
    const GetPage4 = async () => {
        const Type = "discover"
        const {data} = await axios.get(`${Video_API}/${Type}/movie`,{
            params: {
                page: 4,
                api_key: (`${myKey}`)
            }
        });
        console.log(data);
        setPage4(data.results);   
    }

    {/* page 5 */}
    const GetPage5 = async () => {
        const Type = "discover"
        const {data} = await axios.get(`${Video_API}/${Type}/movie`,{
            params: {
                page: 5,
                api_key: (`${myKey}`)
            }
        });
        console.log(data);
        setPage5(data.results);   
    }

    useEffect(()=>{
        GetPage2(); GetPage3(); GetPage4(); GetPage5();
    },[])

    return(
        <div>
         <button onClick={()=> {setSvideo(page2, selected, Movieslide)}}>2</button>
         <button onClick={()=> {setSvideo(page3, selected, Movieslide)}}>3</button>
         <button onClick={()=> {setSvideo(page4, selected, Movieslide)}}>4</button>
         <button onClick={()=> {setSvideo(page5, selected, Movieslide)}}>5</button>
        </div>
    )
}





export default Pages


    