import React, { Fragment, Suspense, lazy } from "react";
import { ThemeProvider , CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";

const Main = lazy(() => import("./components/Main"));

function App() {  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Fragment />}>
          <Main />        
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
