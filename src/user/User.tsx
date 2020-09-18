import * as React from "react";
import { RouteComponentProps, Link } from "@reach/router";

export const User = (
  props: RouteComponentProps & { children?: React.ReactNode; userId?: string }
) => {
  return (
    <>
      <p>This is the user page for:</p>
      <h2>{props.userId}</h2>
      <p>Enter any name in the URL to open the page for that user!</p>
      <p>
        Example: <Link to="/user/Jerry%20Garcia">Jerry Garcia</Link>
      </p>
    </>
  );
};
