import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { css } from "aphrodite";
import { styles } from "./styles";

export const About = (props: RouteComponentProps) => {
  return (
    <div className={css(styles.container)}>
      <p>Some links!</p>
      <a
        href="https://github.com/douglasgoodman/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      <a
        href="https://www.linkedin.com/in/douglastgoodman"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
};
