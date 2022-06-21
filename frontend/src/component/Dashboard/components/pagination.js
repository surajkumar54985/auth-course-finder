import React, { useContext } from "react";
import SearchContext from "../context/searchContext";

const Pagination = ({currPage,setCurrPage}) => {

    const ctx = useContext(SearchContext);
    // console.log(ctx);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item page-link" onClick={() => {if(currPage>1)
                    {
                        setCurrPage(currPage-1);
                    }}}>&laquo;</li>
                <li className="page-item page-link">{currPage}</li>
                <li className="page-item page-link" onClick={() => (setCurrPage(currPage+1))}>{currPage+1}</li>
                <li className="page-item page-link" onClick={() => (setCurrPage(currPage+2))}>{currPage+2}</li>
                <li className="page-item page-link" onClick={() => {setCurrPage(currPage+1);}}>&raquo;</li>
            </ul>
        </nav>
    );
}

export default Pagination;