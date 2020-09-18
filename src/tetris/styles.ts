import { StyleSheet } from "aphrodite";

export const styles = StyleSheet.create({
  container: {
    margin: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ":focus": {
      outline: 0,
    },
  },
  gameColumn: {
    padding: "10px",
  },
  infoColumn: {
    textAlign: "left",
    padding: "50px",
  },
  radio: {
    display: "block",
  },
});
