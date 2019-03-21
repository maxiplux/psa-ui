import React from 'react';
import './countryStyle.css';
import 'antd/dist/antd.css';
import {Input, Button, Typography} from 'antd';
import CountryList from "./CountryList";


const { Title } = Typography;

const CountryComponent = () => {
    return (
        <div className="countryContainer">
            <Title>Country Module</Title>
            <Input className="style-input" placeholder="Country Name"/>
            <Input className="style-input" placeholder="Country Abb"/>
            <Button type="primary">Add</Button>
            <CountryList/>
        </div>
    )
};

export default CountryComponent;