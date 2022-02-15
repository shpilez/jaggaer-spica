import React, { useState, useEffect } from "react";

import Article from "./components/article/Article";
import Header from "./components/header/Header";

import pageData from "./assets/data/data.json";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    body1: {
      color: "#353535",
      fontSize: 16,
      fontWeight: 700,
    },
    body2: {
      color: "#8d8d8d",
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.75,
    },
    subtitle1: {
      color: "#353535",
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      color: "#d15a4c",
      fontSize: 14,
      fontWeight: 700,
    },
  },
  palette: {
    background: {
      paper: "#efefef",
    },
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#d15a4c",
      light: "#8d8d8d",
      dark: "#6381f7",
    },
  },
});

const App = () => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(pageData);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {data && (
        <>
          <Header articleData={data.article} cartData={data.cart}></Header>
          <Article articleData={data.article}></Article>
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
