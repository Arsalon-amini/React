import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters"; //custom component

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Counters />
      </main>
    </React.Fragment>
  );
}

export default App;
