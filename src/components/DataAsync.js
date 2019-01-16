import React, { Component } from "react";
import axios from "axios";
import { compose } from "recompose";
import {
  withMaybe,
  withEither,
  withNull,
  withEmpty,
  withLoadingIndicator,
  withError,
} from "./HocConditionalRender";
import ShowData from "./ShowData";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

class DataAsync extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(API + DEFAULT_QUERY);

      this.setState({
        hits: result.data.hits,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  render() {
    const { hits, isLoading, error } = this.state;
    const isEmptyConditionFn = props => !props.hits;
    const conditionFnlength = props => !props.hits.length;
    const isLoadingConditionFn = props => props.isLoading;
    const isErrorConditionFn = props => props.error;

    const HitsWithConditionalRendering = withError(
      withLoadingIndicator(
        withEmpty(withNull(ShowData, isEmptyConditionFn), isEmptyConditionFn)
      )
    );

    const EmptyMessage = () => (
      <tr>
        <td colSpan="0">There is no data to show</td>
      </tr>
    );

    const LoadingIndicator = () => (
      <div>
        <p>Loading data ...</p>
      </div>
    );

    const ErrorMessage = props => (
      <div>
        <p>{error.message}</p>
      </div>
    );

    const withConditionalRenderingsWithCompose = compose(
      withEither(isLoadingConditionFn, LoadingIndicator),
      withEither(isErrorConditionFn, ErrorMessage),
      withMaybe(isEmptyConditionFn),
      withEither(conditionFnlength, EmptyMessage)
    );

    const HitsWithConditionalRenderingWithCompose = withConditionalRenderingsWithCompose(
      ShowData
    );

    return (
      <div>
        <p>Hits With Conditional Rendering</p>
        <HitsWithConditionalRendering
          error={error}
          isLoading={isLoading}
          hits={hits}
        />
        <p>Hits With Conditional Rendering and compose</p>
        <HitsWithConditionalRenderingWithCompose
          error={error}
          isLoading={isLoading}
          hits={hits}
        />
      </div>
    );
  }
}

export default DataAsync;
