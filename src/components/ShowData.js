import React from "react";

const ShowData = props => {
  return (
    <ul>
      {props.hits.map(hit => (
        <li key={hit.objectID}>
          <a href={hit.url}>{hit.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default ShowData;
