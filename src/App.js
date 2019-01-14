import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import DataTable from "./components/DataTable";
import Background from "./components/Background";
import DataAsync from "./components/DataAsync";
import ShowYouTube from "./components/ShowYouTube";
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
    return (
      <div className="App">
        <ErrorBoundary>
          <DataAsync />
          <DataTable />
          <ShowYouTube />
          <Background />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
