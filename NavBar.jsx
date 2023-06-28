import {FaBars} from "react-icons/fa";
import Button from "./Button";
import {BsFillGridFill, BsSearch} from "react-icons/bs";
import { Alert } from "bootstrap";
import { useEffect, useState } from "react";



const NavContainer = (nav) => {
    return(
        <div className="navContainer">
          <div className="navComponent">
            {nav.logo}
            {nav.input}
            {nav.menu}
          </div>
        </div>

    );
}



const NavBar = ({}) => {
    return(
        <>
        
        <NavContainer 
          logo = {
            <div className="fs-4 text-info">
            <BsFillGridFill/><span className="fs-6">Movie Blocks</span>
            </div>}
           />

        
           
           
        </>
    );
}


export default NavBar