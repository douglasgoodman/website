import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "@reach/router";
import { About } from "./about";
import { User } from "./user";
import { Snake } from "./snake";
import { Tetris } from "./tetris";
import { Qbert } from "./qbert";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App path="/">
        <About path="about" />
        <Snake path="snake" />
        <Tetris path="tetris" />
        <Qbert path="qbert" />
        <User path="user/:userId" />
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
