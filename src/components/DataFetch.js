import React, { Component } from "react";
import {
  withHitsNull,
  withHitsEmpty,
  withLoadingIndicator,
  withError,
} from "./HocConditionalRender";
import ShowData from "./ShowData";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

class AxiosData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API + DEFAULT_QUERY)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => this.setState({ hits: data.hits, isLoading: false }))
      .catch(error => {
        console.log("ERROR AXIOS DATA: ", error);
        this.setState({ error, isLoading: false });
      });
  }

  render() {
    const { hits, isLoading, error } = this.state;
    const WithHitsNull = withHitsNull(ShowData, "hits");
    const WithHitsEmpty = withHitsEmpty(WithHitsNull, "hits");
    const WithIsLoading = withLoadingIndicator(WithHitsEmpty);
    const WithError = withError(WithIsLoading);

    return <WithError error={error} isLoading={isLoading} hits={hits} />;
  }
}

export default AxiosData;
