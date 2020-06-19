import "regenerator-runtime/runtime.js";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import stores from "./stores/stores";
import LatestLaunches from "./components/LatestLaunches";
import Header from './components/Header';

function App() {
  return (
    <Provider stores={{ ...stores }}>
      <Header />
      <LatestLaunches />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
