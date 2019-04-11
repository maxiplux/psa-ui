import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import CountryContainer from "./components/countryModule/CountryContainer";
import {Row, Col} from 'antd';
//import { Route, Router, Switch } from 'react-router-dom';
import WrappedForgotPasswordForm from "./components/loginComponent/ForgotPasswordFormComponent";


import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import WrappedNormalLoginForm from "./components/loginComponent/LoginComponent";
import WrappedRegistrationForm from "./components/loginComponent/RegistrationFormComponent";
import store from "./Storage";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {user:  store.getState().user};

        store.subscribe(() => {
            this.setState({
                user: store.getState().user
            });
        });
    }

    render() {
        if (this.state.user)
        {
            return (
                <Router>
                    <div>
                        <Switch>
                            <Route exact path='/' component={  CountryContainer }/>
                        </Switch>
                    </div>
                </Router>
            );
        }
        return (
            <Router>
                <div>
                    <Row align="middle">
                        <Col span={8}/>
                        <Col span={8}>
                            <Switch>
                                <Route exact path='/' component={WrappedNormalLoginForm}/>
                                <Route path='/registration' component={WrappedRegistrationForm}/>
                                <Route path='/forgotPassword' component={WrappedForgotPasswordForm}/>
                            </Switch>
                        </Col>
                        <Col span={8}/>
                    </Row>
                </div>
            </Router>
        );
    }
}

export default App;
