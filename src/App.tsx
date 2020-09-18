import * as React from "react";
import { css } from "aphrodite";
import { RouteComponentProps, Link } from "@reach/router";
import { styles } from "./styles";

const App = (props: RouteComponentProps & { children?: React.ReactNode }) => {
  return (
    <div className={css(styles.container)}>
      <header className={css(styles.header)}>
        <div className={css(styles.title)}>douglasgoodman.net</div>
        <div className={css(styles.navbar)}>
          <Link className={css(styles.link)} to="/">
            Home
          </Link>
          <Link className={css(styles.link)} to="snake">
            Snake
          </Link>
          <Link className={css(styles.link)} to="tetris">
            Tetris
          </Link>
          <Link className={css(styles.link)} to="qbert">
            Q*bert
          </Link>
          <Link className={css(styles.link)} to="about">
            About
          </Link>
          <Link className={css(styles.link)} to="user/doug">
            User page test
          </Link>
        </div>
      </header>
      <div className={css(styles.content)}>{props.children}</div>
      <footer className={css(styles.footer)}>
        <p>Copyright 2020 Douglas Goodman</p>
      </footer>
    </div>
  );
};

export default App;
