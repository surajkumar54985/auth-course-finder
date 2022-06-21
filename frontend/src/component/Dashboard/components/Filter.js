import React, { useContext, useState, useReducer} from "react";

import "../static/css/filter.css";
import SearchContext from "../context/searchContext";

const Filter = () => {

  const ctx = useContext(SearchContext);


  // const courseReducer = (state,action) => {
    
  // };
  
  // const [Course,dispatchCourse] = useReducer(courseReducer, {
  //   value : ''
  // });




  const [Course, setCourse] = useState('');
  const [ChildSubject, setChildSubject] = useState('');
  const [Date, setDate] = useState('');
  const [Self, setSelf] = useState(false);


  const searchCourseHandler = (e) => {
    e.preventDefault();
    setCourse(e.target.value);
    // localStorage.setItem(ctx.course,ctx.stCourse(e.target.value.toLowerCase()));
    // return stCourse(e.target.value.toLowerCase());
    // (e.target.value);
  };

  const searchChildSubjectHandler = (e) => {
    e.preventDefault();
    setChildSubject(e.target.value);
    // (e.target.value);
  };

  const searchDateHandler = (e) => {
    e.preventDefault();
    // const newDate = new Date(e.target.value.replace("-","").replace("-",""))
    ctx.stDate(e.target.value);
    // console.log(newDate);
    // (e.target.value);
  };

  const searchSelfHandler = (e) => {
    e.preventDefault();
    setSelf(e.target.checked);
    ctx.stSelf(Self);
    ctx.stDate('');
    // (e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    ctx.stCourse(Course);
    ctx.stChildsub(ChildSubject);
  
    // ctx.stSelf(Self);
    // return ctx;
  };

  const resetHandlar = () => {
    ctx.stCourse("");
    ctx.stChildsub("");
    ctx.stSelf(false);
    ctx.stDate('');
    setCourse("");
    setChildSubject("");
    setSelf("");
  };

  // console.log(ctx);

  return (
    <div className="container">
      <div className="m-4">
        <form className="text-center" onSubmit={submitHandler} onReset={resetHandlar}>
          <div className="row align-items-center justify-content-center g-3">
            <div className="col-auto">
              <label className="visually-hidden" for="inputEmail"></label>
              <input
                type="search"
                className="form-control border-radius"
                placeholder="Course"
                value={Course}
                onChange={searchCourseHandler}
              />
            </div>
            <div className="col-auto">
              <label className="visually-hidden" for="inputEmail"></label>
              <input
                type="search"
                className="form-control border-radius"
                placeholder="Child subject"
                value={ChildSubject}
                onChange={searchChildSubjectHandler}
              />
            </div>
            <div className="col-auto">
              <label className="visually-hidden" for="start">
                Date
              </label>
              <input
                type="date"
                pattern="\d{2}-\d{2}-\d{4}"
                className="form-control border-radius"
                placeholder="dd-mm-yyyy"
                value={Date}
                aria-label="Search"
                onChange={searchDateHandler}
              />
            </div>
            <div className="col-auto">
              <div className="form-control form-check border-radius">
                <div className="padding-left-10px">
                  <label className="form-check-label" for="checkRemember">
                    Self paced
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkRemember"
                    checked={Self}
                    aria-label="self paced"
                    onChange={searchSelfHandler}
                  />
                </div>
              </div>
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn"
                style={{ border: "1px solid #0d6efd", color: "#0d6efd" }}
              >
                Search
              </button>
            </div>
            <div className="col-auto">
              <button
                type="reset"
                className="btn"
                style={{ border: "1px solid red", color: "red" }}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;

// <nav className="navbar navbar-expand-lg navbar-expand-md my-3 navbar-collapse-sm navbar-light ">
//                 <div className="container  p-2">
//                 <div
//                     className="navbar-collapse collapse  d-flex justify-content-around show"
//                     id="navbarSupportedContent"
//                 >
//                     <form className=" d-flex ">
//                     <input
//                         className="form-control rounded-pill me-2 mx-auto marg"
//                         type="search"
//                         placeholder="Course"
//                         aria-label="Search"
//                     />
//                     <input
//                         className="form-control rounded-pill mx-auto me-2 marg"
//                         type="search"
//                         placeholder="Child subject"
//                         aria-label="Search"
//                     />
//                     <input
//                         className="form-control rounded-pill me-2 marg"
//                         type="date"
//                         placeholder="Date"
//                         aria-label="Search"
//                     />
//                     <div className="form-control rounded-pill me-2 mx-auto marg">
//                         <input
//                         className="form-check-input  mx-auto me-2 marg"
//                         type="checkbox"
//                         placeholder="self paced"
//                         aria-label="self paced"
//                         />
//                         <label className="form-check-label" for="flexCheckDefault">
//                         Self paced
//                         </label>
//                     </div>

//                     <button className="btn btn-outline-primary" type="submit">
//                         Search
//                     </button>
//                     <button
//                         className="btn btn-outline-danger mx-3"
//                         type="reset"
//                     >
//                         Reset
//                     </button>
//                     </form>
//                 </div>
//                 </div>
//             </nav>
