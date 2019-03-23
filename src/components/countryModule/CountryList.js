import React from 'react';
import 'antd/dist/antd.css';
import {List, Button, Skeleton, Typography, Icon} from 'antd';
import reqwest from 'reqwest';

const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const fakeDataUrl = `https://psa-dev.cfapps.io/services/api/v1/countries/`;
const { Text } = Typography;

class CountryList extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    };

    componentDidMount() {
        this.getData((res) => {
            this.setState({
                initLoading: false,
                data: res,
                list: res,
            });
        });
    }

    getData = (callback) => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res);
            },
        });
    };

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                list: data,
                loading: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    };

    render() {
        const { initLoading, loading, list } = this.state;
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
                dataSource={list}
                renderItem={item => (
                    <List.Item actions={[<a href="/some/valid/uri"><Icon type="edit" /></a>, <a href="/some/valid/uri"><Icon type="delete" /></a>]}>
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
