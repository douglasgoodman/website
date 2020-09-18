import React from "react";
import { RouteComponentProps } from "@reach/router";
import { css } from "aphrodite";
import { styles } from "./styles";

export const Qbert = (props: RouteComponentProps) => {
  return (
    <div>
      <h3>Q*bert</h3>
      <div className={css(styles.content)}>
        <div className="Snake-main"></div>
      </div>
    </div>
  );
};
