import React, {Component} from 'react';
import './countryStyle.css';
import 'antd/dist/antd.css';
import {Input, Button, Typography, Icon} from 'antd';
import CountryList from "./CountryList";
import CountryModal from "./CountryModal";

const {Title} = Typography;

class MainCountryComponent extends Component {
    state = {visible: false};


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div className="countryContainer">
                <Title>Country Module <a href="/some/valid/uri" type="primary"><Icon type="form"/></a></Title>
                <Button type="primary" onClick={this.showModal} icon="form">
                    Create a Country
                </Button>
                <CountryModal visible={this.state.visible} onOkHandler={this.handleOk}  onCancelHandler={this.handleCancel}/>
                <br/>
                <Input className="style-input" placeholder="Country Name" id="searchByCountryName"/>
                <Input className="style-input" placeholder="Country Abb" id="searchByCountryAbb"/>
                <Button type="primary" icon="search">Search</Button>
                <CountryList/>
            </div>
        )
    }
}

export default MainCountryComponent;