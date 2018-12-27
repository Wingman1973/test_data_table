import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DataTable from "./components/DataTable";

class App extends Component {
  render() {
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

    return (
      <div className="App">
        <DataTable rows={rows} cols={cols} />
      </div>
    );
  }
}

export default App;
