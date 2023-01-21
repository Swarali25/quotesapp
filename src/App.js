import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Quotes from "./components/Quotes";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0,
    mode: "light",
  };
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };
  toggleMode = () => {
    if (this.state.mode === "light") {
      document.body.style.backgroundColor = "#444242";
      this.setState({
        mode: "dark",
        progress: 100,
      });
    } else {
      document.body.style.backgroundColor = "white";
      this.setState({
        mode: "light",
        progress: 100,
      });
    }
  };
  render() {
    return (
      <div>
        <Navbar
          mode={this.state.mode}
          toggleMode={this.toggleMode}
          setProgress={this.setProgress}
        />
        <LoadingBar color="#f11946" progress={this.state.progress} />
        <Quotes
          limit={10}
          minLength={60}
          setProgress={this.setProgress}
          mode={this.state.mode}
        />
      </div>
    );
  }
}
