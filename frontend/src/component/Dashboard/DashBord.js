import "./App.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CardBox from "./components/cardBox";

// import Card from './components/card';
import axios from "axios";
import Header from "./components/header";
import Pagination from "./components/pagination";
import { useContext, useEffect, useState } from "react";
import Filter from "./components/Filter";
import SearchContext, { SearchContextProvider } from "./context/searchContext";

import AuthContext, { AuthContextProvider } from "./context/authContext";


function DashBord() {
  const [loader, setLoader] = useState(false);

  // const currPage = 0;
  const [currPage, setCurrPage] = useState(0);

  const ctx = useContext(SearchContext);

  const [course, stCourse] = useState("");
  const [childsub, stChildsub] = useState("");
  const [date, stDate] = useState("");
  const [self, stSelf] = useState("");
  const [auth, setAuth] = useState(false);

  // console.log(ctx);

  // const arr = Object.keys(auth).map((key) => [key, auth[key]]);

  // const isAuthenticated = auth;

  const Actx = useContext(AuthContext);

  // setAuth(Actx.auth.isAuthenticated);

  console.log(Actx);

  // const auth = true;
  // const auth = Actx.auth.isAuthenticated;

  // console.log(auth.isAuthenticated);
  // console.log(auth);

  const showCards = () => {
    return (
      <CardBox
        setLoader={setLoader}
        currPage={currPage}
        setCurrPage={setCurrPage}
      />
    );
  };

  const showFilter = () => {
    return (
      <SearchContextProvider>
        <Filter />
      </SearchContextProvider>
    );
  };

  

  const showPagination = () => {
    return <Pagination setCurrPage={setCurrPage} currPage={currPage} />;
  };

  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <div className="container">
          <SearchContextProvider>
            {<Filter />}
            {<div className="container Cards">{showCards()}</div>}
            {loader && (
              <div>
                <div className="loading">
                  <div>Loading...</div>
                  <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            )}
            {showPagination()}
          </SearchContextProvider>
        </div>
      </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default DashBord;
