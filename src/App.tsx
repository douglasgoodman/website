import * as React from "react";
import "./App.css";
import { RouteComponentProps, Link } from "@reach/router";

const App = (props: RouteComponentProps & { children?: React.ReactNode }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>douglasgoodman.net</h1>
        <div className="App-navbar">
          <Link className="App-link" to="/">
            Home
          </Link>
          <Link className="App-link" to="snake">
            Snake
          </Link>
          <Link className="App-link" to="about">
            About
          </Link>
          <Link className="App-link" to="user/doug">
            Doug
          </Link>
        </div>
      </header>
      <div className="App-content">{props.children}</div>
      <footer className="App-footer">
        <p>Copyright 2020 Doug</p>
      </footer>
    </div>
  );
};

export default App;
