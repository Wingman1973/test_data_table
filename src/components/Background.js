import React, { Component } from "react";

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    //this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=500", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, cors, *same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: "omit", // include, *same-origin, omit
      //   headers: {
      //     "Content-Type": "application/json",
      //     // "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   redirect: "follow", // manual, *follow, error
      //   referrer: "no-referrer", // no-referrer, *client
      //   body: JSON.stringify(results), // body data type must match "Content-Type" header
    })
      .then(results => {
        if (results.ok) {
          return results.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => {
        let pictures = data.results.map(pic => {
          return (
            <div key={pic.login.salt}>
              <img
                src={pic.picture.medium}
                alt={pic.name.firts + " " + pic.name.last}
              />
            </div>
          );
        });

        this.setState({ pictures: pictures });
        console.log("state", this.state.pictures);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }
  render() {
    return <div>{this.state.pictures}</div>;
  }
}

export default Background;
