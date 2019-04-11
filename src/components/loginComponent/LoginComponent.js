import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import   './loginSytle.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import store from "../../Storage";
import {setUser} from "../../ActionsCreator";

class LoginComponent extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                 if ( values.userName === 'admin' &&   values.password ==='admin')
                {
                    store.dispatch(setUser( {id:1, username:'admin'}));
                }
            }
        });
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Link  to={{ pathname: '/forgotPassword' }}  > Forgot password </Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <Link  to={{ pathname: '/registration' }}  > register now! </Link>
                </Form.Item>
            </Form>
        );
    }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginComponent);
export  default  WrappedNormalLoginForm