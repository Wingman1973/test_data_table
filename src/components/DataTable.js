import React from "react";

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

// const emptyCols = [];
// const emptyRows = [];

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
    <td>There is no data in this table</td>
  </tr>
);

const DataTable = () => {
  return (
    <table>
      <thead>
        <tr>
          {cols.map(col => (
            <th key={col.name}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? renderData(rows, cols) : renderEmptyState(cols)}
      </tbody>
    </table>
  );
};

export default DataTable;
