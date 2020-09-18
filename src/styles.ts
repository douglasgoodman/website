import { StyleSheet } from "aphrodite";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    backgroundColor: "#aaaaaa",
    color: "#eeeeee",
    flexDirection: "column",
    padding: 20,
  },
  title: {
    fontStyle: "italic",
    fontWeight: 900,
    fontSize: 60,
  },
  navbar: {
    margin: 20,
  },
  content: {},
  footer: {},
  link: {
    color: "#086079",
    marginRight: "20px",
    textDecoration: "none",
    fontSize: 25,
    fontWeight: 600,
    ":hover": {
      color: "#08607966",
      textDecoration: "underline",
    },
  },
});
