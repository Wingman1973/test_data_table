import React from "react";

const withMaybe = conditionalRenderingFn => Component => props =>
  conditionalRenderingFn(props) ? null : <Component {...props} />;

const withEither = (
  conditionalRenderingFn,
  EitherComponent
) => Component => props =>
  conditionalRenderingFn(props) ? (
    <EitherComponent />
  ) : (
    <Component {...props} />
  );

const withNull = (Component, conditionFn) => props =>
  !conditionFn ? null : <Component {...props} />;

const withEmpty = (Component, conditionFn) => props =>
  !conditionFn.length ? (
    <tr>
      <td colSpan="{!props.length}">There is no data to show</td>
    </tr>
  ) : (
    <Component {...props} />
  );

const withLoadingIndicator = Component => ({ isLoading, ...others }) =>
  isLoading ? (
    <div>
      <p>Loading data ...</p>
    </div>
  ) : (
    <Component {...others} />
  );

const withError = Component => ({ error, ...others }) =>
  error ? <p>{error.message}</p> : <Component {...others} />;

export {
  withMaybe,
  withEither,
  withNull,
  withEmpty,
  withLoadingIndicator,
  withError,
};
