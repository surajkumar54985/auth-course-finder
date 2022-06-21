import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { Fragment,useEffect, useState } from "react";
import FormPage from "./component/Form";
import Login from "./component/Login";
import DashBoard from "./component/Dashboard/Dashboard";
import DashBord from "./component/Dashboard/DashBord";
import Header from "./component/Header";

function App() {
  const [loggedin,setIsloggedin] = useState(false);
  // const loggedin = localStorage.getItem("loggedin");
  const token = localStorage.getItem("Token");
  console.log(loggedin);
  console.log(token);


  const logoutHandler = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("loggedin");
    const loggedin = localStorage.getItem("loggedin");
    setIsloggedin(loggedin);
    console.log(loggedin);
    console.log(token);
  };

  useEffect(() => {
    const loggedin = localStorage.getItem("loggedin");
    setIsloggedin(loggedin);
  },[]);

  return (
    <Router>{console.log(loggedin," b4 header")}
      <Header loggedin={loggedin} token={token} logoutHandler={logoutHandler} />
      <Routes>
        <Route exact path="/" element={loggedin ? <DashBord /> : <FormPage />} />
        <Route exact path="/login" element={<Login setIsloggedin={setIsloggedin} />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React, { Component } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// // import {Switch} from'react-router-dom'
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import FormPage from './component/Form';
// import Login from './component/login';

// class App extends Component {
//   render() {
//     return (
//     <Router>
//         <div>
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <ul className="navbar-nav mr-auto">
//             <li><Link to={'/signup'} className="nav-link">sign up</Link></li>
//             <li><Link to={'/login'} className="nav-link">login</Link></li>
//           </ul>
//           </nav>
//           <hr />
//           <Routes>
//               <Route path='/signup'>
//                 <FormPage />
//               </Route>
//               <Route path='/login'>
//                 <Login />
//               </Route>
//           </Routes>
//         </div>
//       </Router>
//     );
//   }
// }

// export default App;
