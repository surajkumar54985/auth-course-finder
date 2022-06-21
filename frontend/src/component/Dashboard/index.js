import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./static/css/card.css";
import App from "./DashBord";
import reportWebVitals from "./reportWebVitals";
import { SearchContextProvider } from "./context/searchContext";
import { AuthContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.hydrate(
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
