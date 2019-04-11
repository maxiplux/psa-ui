import React, {Component} from 'react';
import './countryStyle.css';
import 'antd/dist/antd.css';
import {Input, Button, Typography, Icon} from 'antd';
import CountryList from "./CountryList";
import CountryModal from "./CountryModal";
import * as axios from "axios";
import LoginComponent from "../loginComponent/LoginComponent";

const {Title} = Typography;

class MainCountryComponent extends Component {
    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    createCountry = (values) => {
        values.countryName = values.countryName.toUpperCase();
        values.countryAbb = values.countryAbb.toUpperCase();
        axios({
            method: 'post',
            url: 'http://localhost:8080/services/api/v1/countries/',
            data:
                values
            ,
            config: { headers: {'Content-Type': 'application/json' }}
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
            this.createCountry(values)
        });

    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div className="countryContainer">
                <Title>Country Module </Title>
                <div>
                    <Button type="primary" onClick={this.showModal}>New Country</Button>
                    <CountryModal
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                </div>
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