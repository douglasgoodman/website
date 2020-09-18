import { StyleSheet } from "aphrodite";

export const styles = StyleSheet.create({
  container: {
    margin: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ":focus": {
      outline: 0,
    },
  },

  grid: {
    backgroundColor: "#8abe7b",
    border: "solid 1px #8abe7b",
    color: "#8abe7b",
    fontFamily: "'Courier New', Courier, monospace",
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto 1fr auto",
    gridTemplateAreas: "'header header' 'main info' 'footer footer'",
    columnGap: "1px",
    rowGap: "1px",
  },

  header: {
    backgroundColor: "#000000",
    padding: "10px",
    gridArea: "header",
  },

  main: {
    backgroundColor: "#000000",
    gridArea: "main",
  },

  gameCanvas: {
    backgroundColor: "#000000",
    display: "block",
  },

  info: {
    backgroundColor: "#000000",
    padding: "10px",
    gridArea: "info",
  },

  footer: {
    backgroundColor: "#000000",
    padding: "10px",
    gridArea: "footer",
  },

  button: {
    minWidth: "200px",
    fontFamily: "'Courier New', Courier, monospace",
    backgroundColor: "transparent",
    color: "#8abe7b",
    padding: "10px 20px",
    border: "solid 1px #8abe7b",
    marginBottom: "5px",
    ":hover": {
      color: "tomato",
      border: "solid 1px tomato",
    },
    ":active": {
      color: "yellowgreen",
      border: "solid 1px yellowgreen",
    },
    ":focus": {
      outline: 0,
    },
  },
});
