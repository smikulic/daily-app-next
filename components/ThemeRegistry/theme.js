import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    // light: will be calculated from palette.primary.main,
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
    primary: {
      main: "#41efcd",
      contrastText: "#181818",
    },
    secondary: {
      main: "#f199c0",
      contrastText: "#6a1fde",
    },
    warning: {
      main: "#eec22f",
    },
    error: {
      main: "#ff7777",
    },
    text: {
      secondary: "#878BAC",
      disabled: "#d6d7e0",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  // components: {
  //   MuiAlert: {
  //     styleOverrides: {
  //       root: ({ ownerState }) => ({
  //         ...(ownerState.severity === "info" && {
  //           backgroundColor: "#60a5fa",
  //         }),
  //       }),
  //     },
  //   },
  // },
});

export default theme;
