import React from 'react';
import {Modal, Form, Input} from 'antd';
import FormItem from "antd/lib/form/FormItem";


const EditCountryModal = Form.create({name: 'form_in_modal'})(
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
                    title="Update the country"
                    okText="Update"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Id">
                            {getFieldDecorator('idCountry', {
                                initialValue:this.props.currentItem.idCountry,

                            })(
                                <Input   disabled/>
                            )}
                        </Form.Item>
                        <Form.Item label="Country">
                            {getFieldDecorator('countryName', {
                                initialValue:this.props.currentItem.countryName,
                                rules: [{required: true, message: 'Country name is required'}],
                            })(
                                <Input   />
                            )}
                        </Form.Item>
                        <Form.Item label="Abb">
                            {getFieldDecorator('countryAbb', {
                                initialValue:this.props.currentItem.countryAbb,
                                rules: [{required: true, message: 'Country abbreviation is required'}],
                            })
                            (<Input type="textarea" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);


export default EditCountryModal;

