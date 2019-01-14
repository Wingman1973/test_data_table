import React from "react";

const withHitsNull = (Component, field) => props =>
  !props[field] ? null : <Component {...props} />;

const withHitsEmpty = (Component, field) => props =>
  !props[field].length ? (
    <tr>
      <td colSpan="{!props[field].length}">There is no data to show</td>
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

export { withHitsNull, withHitsEmpty, withLoadingIndicator, withError };
