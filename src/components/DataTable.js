import React from "react";

const actionLink = () => {
  const handleClick = e => {
    e.preventDefault();
    console.log("The link was clicked.");
  };

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
};

const editCell = (id, e) => {
  console.log(`The button ${id} was clicked.`);
};

const renderButton = id => {
  return <button onClick={e => editCell(id, e)}>Edit Cell</button>;
};

const renderData = (rows, cols) =>
  rows.map(row => (
    <tr key={row.id}>
      {cols.map(col => (
        <td key={col.name}>{row[col.name]}</td>
      ))}
      <td key={row.id}>{actionLink()}</td>
      <td>{renderButton(row.id)}</td>
    </tr>
  ));

const renderEmptyState = cols => (
  <tr>
    <td colSpan={cols.length}>There is no data in this table</td>
  </tr>
);

const DataTable = props => {
  return (
    <table>
      <thead>
        <tr>
          {props.cols.map(col => (
            <th key={col.name}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.length > 0
          ? renderData(props.rows, props.cols)
          : renderEmptyState(props.cols)}
      </tbody>
    </table>
  );
};

export default DataTable;
