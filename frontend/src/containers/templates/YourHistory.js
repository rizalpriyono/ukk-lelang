import React, { Component } from "react";
import Header from "../organisms/header/Masyarakat";
import MainContentYourHistory from "../organisms/mainContent/YourHistory";

class TawarBarang extends Component {
  render() {
    return (
      <div>
        <Header title="Your History" />
        <MainContentYourHistory />
      </div>
    );
  }
}

export default TawarBarang;
