import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FCBB13",
    },
    secondary: {
      main: "#ff8500",
      light: "#ffb644",
      dark: "#c55600",
      contrastText: "#000000",
    },
    error: {
      main: "#A21C2B",
    },
  },
});

export default theme;
