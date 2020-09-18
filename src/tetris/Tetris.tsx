import * as React from "react";
import { styles } from "./styles";
import { RouteComponentProps } from "@reach/router";
import { Game } from "./Game";
import { ThemeContext, Themes } from "./ThemeContext";
import { css } from "aphrodite";

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
      <div className={css(styles.container)}>
        <div className={css(styles.gameColumn)}>
          <div>
            <Game />
          </div>
        </div>
        <div className={css(styles.infoColumn)}>
          <h3>Play Tetris!</h3>
          <p>Press spacebar to start!</p>
          <form>
            {ThemeOptions.map((o) => (
              <label key={o.name} className={css(styles.radio)}>
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
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
