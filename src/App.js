import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import CountryContainer from "./components/countryModule/CountryContainer";


class App extends Component {
  render() {
    return (
      <div>
        <CountryContainer/>
      </div>
    );
  }
}

export default App;
