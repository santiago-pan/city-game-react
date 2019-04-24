import React, { Component } from "react";
import "./App.css";
import { Game } from "./components/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game {...{ frameRate: 25, cityWidth: 800, cityHeight: 480 }} />
      </div>
    );
  }
}

export default App;
