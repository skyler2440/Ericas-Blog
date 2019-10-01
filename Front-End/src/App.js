import React from "react";

import "./App.css";
import Header from "./components/nav/Header";
import AppRouter from "./utils/AppRouter";

function App(props) {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Header />

      <AppRouter props={props} />
    </div>
  );
}
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
export default App;
