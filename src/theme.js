//CSS

import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#78a1bb",
      dark: "#557285",
      light: "#b9e4ff",
      danger: "#f21e1e",
      text: "#fff",
    },
    secondary: {
      main: "#00ccbc",
      dark: "#00857b",
      light: "#75fff5",
      text: "#fff",
    },
  },
  root: {
    height: "100vh",
  },
  spacing: 1,
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",

    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  avatar: {},
  form: {
    width: "100%", // Fix IE 11 issue.
  },
});

export default theme;
