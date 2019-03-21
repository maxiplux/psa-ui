import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import CountryComponent from "./components/countryModule/CountryComponent";


class App extends Component {
  render() {
    return (
      <div>
        <CountryComponent/>
      </div>
    );
  }
}

export default App;
