import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DataTable from "./components/DataTable";
import Background from "./components/Background";
import DataAsync from "./components/DataAsync";
import ErrorBoundary from "./components/ErrorBoundary";

import YouTube from "react-youtube";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], loading: true };
  }

  componentDidCatch(error, errorInfo) {
    (function() {
      console.log(this);
    })();

    // Catch errors in any components below and re-render with error message
    console.log("componentDidCatch App");
    // You can also log error messages to an error reporting service here
  }

  componentDidMount() {
    var that = this;
    var API_key = "MY API KEY IS HERE (working) ";
    var channelID = "UCs3o4RhBiP2wcwqkZR2QVLw";
    var maxResults = 10;
    var url =
      "https://www.googleapis.com/youtube/v3/search?key=" +
      API_key +
      "&channelId=" +
      channelID +
      "&part=snippet,id&order=date&maxResults=" +
      maxResults;

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({ videos: data.items, loading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const cols = [
      { header: "ID", name: "id" },
      { header: "Name", name: "name" },
      { header: "Email", name: "email" },
    ];
    const rows = [
      { id: 5, name: "John", email: "john@example.com" },
      { id: 6, name: "Liam", email: "liam@example.com" },
      { id: 7, name: "Maya", email: "maya@example.com", someTest: 10 },
      {
        id: 8,
        name: "Oliver",
        email: "oliver@example.com",
        hello: "hello world",
      },
      { id: 25, name: "Amelia", email: "amelia@example.com" },
    ];

    return (
      <div className="App">
        <ErrorBoundary>
          <DataAsync />
          <DataTable rows={rows} cols={cols} />
          <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />
          <Background />
        </ErrorBoundary>
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default App;
