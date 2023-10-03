import React from 'react'

const modal = () => {
  return (
    <div>
    <div id="modal_ID" style={{boxShadow:'0px 10px 10px',}}
    className="Modal text-dark   card  bg-light position-fixed my-1">
   <ModalHeader >
     <button className="CloseModal text-dark" onClick={() => setShowModal(false)}>
       <AiOutlineClose />
     </button>
   </ModalHeader>
   <ModalBody>
     <div>

       <div className="MovieTrailer">
         {player && <div className="CloseBtn fs-5" onClick={() => setPlayer(false)}>
           <AiOutlineClose />
         </div>}
         {selected.videos && player && RenderTrailer()}
       </div>

       {player ? '' : <button className="play-btn   d-flex align-items-center" onClick={() => setPlayer(true)}>
         <FaPlay /> Play Trailer
       </button>}

       <img src={selected.backdrop_path ? images + selected.backdrop_path : images + selected.poster_path} alt="" />


     </div>
     <div className="modal-text bg-light  text-black px-2">
       <h2 className="card-title">{selected.original_title} {selected.original_name}</h2>
       <p>{selected.overview}  </p>
     </div>


   </ModalBody>
   <ModalFooter className="px-2">
     <strong>Release Date: {selected.release_date}</strong>
   </ModalFooter>
 </div>
      
    </div>
  )
}

export default modal
