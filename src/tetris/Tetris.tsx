import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import "./Tetris.css";
import { Game } from "./Game";

export const Tetris = (props: RouteComponentProps) => {
  return (
    <div className="Tetris">
      <div className="Tetris-grid">
        <header className="Tetris-header">
          <h3>Tetris</h3>
        </header>
        <div className="Tetris-main">
          <Game />
        </div>
        <footer className="Tetris-footer">
          <p>Play Tetris!</p>
          <p>Press spacebar to start!</p>
        </footer>
      </div>
    </div>
  );
};
