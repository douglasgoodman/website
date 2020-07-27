import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import "./Tetris.css";
import { Game } from "./Game";
import { ThemeContext, Themes } from "./ThemeContext";

const ThemeOptions = [
  {
    name: "Original",
    value: Themes.original,
  },
  {
    name: "Original Flat",
    value: Themes.originalFlat,
  },
  {
    name: "Alternate",
    value: Themes.alternate,
  },
];

export const Tetris = (props: RouteComponentProps) => {
  const [currentTheme, setCurrentTheme] = React.useState(Themes.original);

  return (
    <ThemeContext.Provider value={currentTheme}>
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
            <form>
              {ThemeOptions.map((o) => (
                <label key={o.name}>
                  <input
                    checked={currentTheme === o.value}
                    type="radio"
                    value={o.name}
                    name="theme"
                    onChange={(event) => setCurrentTheme(o.value)}
                  />
                  {o.name}
                </label>
              ))}
            </form>
          </footer>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
