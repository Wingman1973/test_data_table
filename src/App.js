import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import DataTable from "./components/DataTable";
import Background from "./components/Background";
import DataAsync from "./components/DataAsync";
import ShowYouTube from "./components/ShowYouTube";
import withFetching from "./components/DataWithFetching";
import ErrorBoundary from "./components/ErrorBoundary";

class App extends Component {
  componentDidCatch(error, errorInfo) {
    (function() {
      console.log(this);
    })();
    // Catch errors in any components below and re-render with error message
    console.log("componentDidCatch App");
    // You can also log error messages to an error reporting service here
  }

  render() {
    const API = "https://hn.algolia.com/api/v1/search?query=";
    const DEFAULT_QUERY = "redux";
    const DataWithHOC = withFetching(API + DEFAULT_QUERY)(DataAsync);

    return (
      <div className="App">
        <ErrorBoundary>
          <DataWithHOC />
          <DataTable />
          <ShowYouTube />
          <Background />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
