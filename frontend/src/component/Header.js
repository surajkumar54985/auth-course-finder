import React from "react";
import { Link } from "react-router-dom";
import './Form.css';

const Header = ({ loggedin, token, logoutHandler }) => {
  console.log(loggedin, "header");
  return (
    <div>
      <nav className="navbar1">
        <span className="title">Course Finder</span>
        <span style={{'float':'right','marginTop':'30px'}}>
          {loggedin ? (
            <ul className="navbar-nav mr-auto" style={{ color: "white" }}>
              <li className="nav-item" onClick={logoutHandler}>
                <Link to={"/login"} className="nav-lnk">
                    <button class="btn btn-light">log out</button>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-row mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-lnk">
                <button class="btn btn-light">sign up</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-lnk">
                    <button className="btn btn-light">login</button>
                </Link>
              </li>
            </ul>
          )}
        </span>
      </nav>
    </div>
  );
};

export default Header;
