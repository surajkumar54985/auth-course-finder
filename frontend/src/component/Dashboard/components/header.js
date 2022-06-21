import React from "react";
import "../static/css/header.css";
import { useContext } from "react";
import SearchContext from "../context/searchContext";
const Header = ({ auth, setAuth }) => {
  
  return (
    <div>
      <div className="navbar1">
        <div className="title">Course Finder</div>
        <span></span>
      </div>
    </div>
  );
};

export default Header;
