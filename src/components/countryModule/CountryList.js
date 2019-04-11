import React from 'react';
import 'antd/dist/antd.css';
import {List, Button, Skeleton, Typography, Icon} from 'antd';
import reqwest from 'reqwest';
import axios from 'axios';
import EditCountryModal from "./EditCountryModal";

const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const fakeDataUrl = `https://psa-dev.cfapps.io/services/api/v1/countries/`;
const {Text} = Typography;

class CountryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initLoading: true,
            visible: false,
            currentItem: {
                countryName: null,
                countryAbb: null,
                id: null
            },
            loading: false,
            // data: [],
            list: [],
        };
    }

    componentDidMount() {
        this.getData(this);
    }

    // getData = (callback) => {
    //     reqwest({
    //         url: fakeDataUrl,
    //         type: 'json',
    //         method: 'get',
    //         contentType: 'application/json',
    //         success: (res) => {
    //             callback(res);
    //         },
    //     });
    // };

    getData = self => {
        axios({
            method: 'get',
            // url: 'https://psa-dev.cfapps.io/services/api/v1/countries/',
            url: 'http://localhost:8080/services/api/v1/countries',
        }).then(response => {
            console.log(`${self.state}`);
            console.log(response);
            // const data = self.state.data.concat(response.data);
            self.setState({
                // data,
                list: response.data,
                initLoading: false,
                loading: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    showModal = (item) => {
        this.setState({currentItem: item, visible: true});
    };

    onLoadMore = () => {
        this.setState({
            loading: true,
            // list: this.state.data.concat([...new Array(count)].map(() => ({loading: true, name: {}}))),
        });
        this.getData(this);
    };

    editCountry = (values) => {
        values.countryName = values.countryName.toUpperCase();
        const self = this;
        values.countryAbb = values.countryAbb.toUpperCase();
        axios({
            method: 'put',
            // url: `https://psa-dev.cfapps.io/services/api/v1/countries/${this.state.currentItem.idCountry}/`,
            url: `http://localhost:8080/services/api/v1/countries/${this.state.currentItem.idCountry}/`,
            data:
            values,
            config: {headers: {'Content-Type': 'application/json'}}
        })
            .then(function (response) {
                for (var i = 0; i < self.state.list.length; i++) {
                    console.log(` ${self.state.list[i].idCountry == response.idCountry} ${response.data.idCountry}`);
                    if (self.state.list[i].idCountry == response.data.idCountry) {
                        const result = self.state.list;
                        result[i] = response.data;
                        self.setState({list: result})
                    }
                }
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    handleUpdate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
            this.editCountry(values)
        });

    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    removeCountry = (item) => {
        const self=this;

        axios({
            method: 'delete',
            // url: `https://psa-dev.cfapps.io/services/api/v1/countries/${this.state.currentItem.idCountry}/`,
            url: `http://localhost:8080/services/api/v1/countries/${item.idCountry}/`,
            config: {headers: {'Content-Type': 'application/json'}}
        })
            .then(function (response) {
                const  result = self.state.list.filter(function(value, index, arr){
                    return value.idCountry != item.idCountry ;
                });
               self.setState({list: result});
                console.log(response);
            })
            .catch(function (response) {

                console.log(response);
            });

    };

    render() {
        const {initLoading, loading, list} = this.state;
        const loadMore = !initLoading && !loading ? (
            <div style={{
                textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
                <Button onClick={this.onLoadMore}>loading more</Button>
            </div>
        ) : null;

        return (
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={this.state.list}
                renderItem={item => (
                    <List.Item actions={[<a href="#">
                        <Icon type="edit" onClick={() => this.showModal(item)}/></a>,
                        <a href="#">
                            <Icon
                                className="dynamic-delete-button"
                                type="delete"
                                onClick={() => this.removeCountry(item)}
                            />
                        </a>]}>

                        <div>
                            <EditCountryModal
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleUpdate}
                                currentItem={this.state.currentItem}
                            />
                        </div>
                        <Skeleton title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={<Text><Text strong>Country: </Text>{item.countryName}</Text>}
                                description={<Text><Text strong>Abb: </Text>{item.countryAbb}</Text>}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        );
    }
}

export default CountryList;
