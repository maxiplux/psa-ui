import React from 'react';
import {Modal, Form, Input} from 'antd';


const CountryModal = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new country"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Country">
                            {getFieldDecorator('countryName', {
                                rules: [{required: true, message: 'Country name is required'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="Abb">
                            {getFieldDecorator('countryAbb', {
                                rules: [{required: true, message: 'Country abbreviation is required'}],
                            })
                            (<Input type="textarea"/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);


export default CountryModal;
