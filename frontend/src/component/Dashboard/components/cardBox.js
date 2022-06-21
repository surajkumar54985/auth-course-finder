import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "./card";
import "../static/css/card.css";
import SearchContext from "../context/searchContext";

const CardBox = ({ setLoader, currPage }) => {
  const [allData, setData] = useState([]);

  const cardsPerPage = 21;

  // const ctx = useContext(SearchContextProvider);

  const url = "https://nut-case.s3.amazonaws.com/coursessc.json";
  const ctx = useContext(SearchContext);
  

  const getData = () => {
    setLoader(true);
    const response = axios
      .get(url)
      .then((res) => {
        const ans = res.data;
        setData(ans);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
    // console.log(response)
    // return response.data;
  };

  useEffect(() => {
    getData();
  }, []);


  // console.log(response);

  // console.log(ctx.self);

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
};
// console.log(formatDate(('20th Feb, 2012')));

  const arr = Object.keys(allData).map((key) => [key, allData[key]]);
  let filterArr = arr
    .filter((item) => item[1]["Course Name"].includes(ctx.course))
    .filter((item) => item[1]["Child Subject"].includes(ctx.childsub))
    .filter((item) => {
      if (ctx.self && item[1]['Next Session Date'] == "Self paced") {
        return item;
      }
      else if (!ctx.self) {
        return item;
        // ctx.stSelf(true);
      }
    })
    .filter( function(item) {
      const req = item[1]["Next Session Date"].toString();
      const date = req;
      const filterDate = formatDate(date.replace("nd","").replace("rd","").replace("th",""));
      if(filterDate==ctx.date && ctx.date!=='')
      {
        return item;
      }
      else if(ctx.date==='')
      {
        return item;
      }
    });
  // arr.filter(arr => arr[1]["Course Name"].includes('J'));
  // console.log(filterArr.length);
    // .filter((item) => item[1]["Next Session Date"].includes(ctx.date))
    // .filter((item) => item[1]["Next Session Date"].includes(ctx.self));

    // console.log(filterArr);
    // console.log(filterArr.length);

  return filterArr
    .slice(currPage * cardsPerPage, (currPage + 1) * cardsPerPage)
    .map((props) => {
      return (
        <div className="Card">
          <Card
            courseId={props[1]["Course Id"]}
            courseName={props[1]["Course Name"]}
            pSubject={props[1]["Parent Subject"]}
            date={props[1]["Next Session Date"]}
            cSubject={props[1]["Child Subject"]}
            Provider={props[1]["Provider"]}
            College={props[1]["Universities/Institutions"]}
          />
        </div>
      );
    });
};

export default CardBox;

// {console.log((props[1]["Next Session Date"])
//         .replace("nd", "")
//         .replace("rd", "")
//         .replace("th", "")
//         .replace(" ","")
//         .replace(",","")
//         .replace(" ","")
//         .replace("Jan","01")
//         .replace("Feb","02")
//         .replace("Mar","03")
//         .replace("Apr","04")
//         .replace("May","05")
//         .replace("Jun","06")
//         .replace("Jul","07")
//         .replace("Aug","08")
//         .replace("Sep","09")
//         .replace("Oct","10")
//         .replace("Nov","11")
//         .replace("Dec","12")
//         )}

//             <Card
//                 courseId={props[1]["Course Id"]}
//                 courseName={props[1]["Course Name"]}
//                 pSubject={props[1]["Parent Subject"]}
//                 date={props[1]["Next Session Date"]}
//                 cSubject={props[1]["Child Subject"]}
//                 Provider={props[1]["Provider"]}
//                 College={props[1]["Universities/Institutions"]}
//             />

// arr.map((props) => { return(
//     <Card
//         courseId={props[1]["Course Id"]}
//         courseName={props[1]["Course Name"]}
//         pSubject={props[1]["Parent Subject"]}
//         date={props[1]["Next Session Date"]}
//         cSubject={props[1]["Child Subject"]}
//         Provider={props[1]["Provider"]}
//         College={props[1]["Universities/Institutions"]}
//     />);
// })
