import React, { Component } from "react";
import axios from "axios";
import {
  withHitsNull,
  withHitsEmpty,
  withLoadingIndicator,
  withError,
} from "./HocConditionalRender";
import ShowData from "./ShowData";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

class DataAxios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(API + DEFAULT_QUERY)
      .then(result =>
        this.setState({
          hits: result.data.hits,
          isLoading: false,
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        })
      );
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

export default DataAxios;
