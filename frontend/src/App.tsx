import React from "react";

import { Header } from "./Header";
import { HomePage } from "./HomePage";

function App() {
  return (
    <div id='main-body-wrapper'>
      <Header />
      <br/>
      <div id='main-content-wrapper'>
        <HomePage />
      </div>
    </div>
  );
}

export default App;
