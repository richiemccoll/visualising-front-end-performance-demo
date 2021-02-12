import "regenerator-runtime/runtime.js";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import stores from "./stores/stores";
import LatestLaunches from "./components/LatestLaunches";
import Header from "./components/Header";
import { ThemeProvider } from "@project-zero/components";

function App() {
  return (
    <ThemeProvider>
      <Provider stores={{ ...stores }}>
        <Header />
        <LatestLaunches />
      </Provider>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
