import React, { Component } from "react";
import Header from "../organisms/header/Masyarakat";
import MainContentTawar from "../organisms/mainContent/TawarBarang";

class TawarBarang extends Component {
  render() {
    const idBarang = this.props.match.params.idBarang;
    return (
      <div>
        <Header title="TawarBarang" />
        <MainContentTawar idBarang={idBarang} />
      </div>
    );
  }
}

export default TawarBarang;
