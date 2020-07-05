import React, { Component } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    );
  }
}
