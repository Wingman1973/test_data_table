import React, { Component } from "react";
import YouTube from "react-youtube";

class ShowYouTube extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], loading: true };
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

    return (
      <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default ShowYouTube;
