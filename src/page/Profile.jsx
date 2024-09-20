import React, { useEffect, useState } from 'react';
import { Input, Form, Tabs, Table } from 'antd';
import { useSelector } from 'react-redux';
import '../assets/scss/Profile.scss';
import UpdateAvatar from '../Profile/UpdateAvatar';
import axios from 'axios';

const { TabPane } = Tabs;

const Profile = () => {
  const [profile, setProfile] = useState({});
  const orderHistory = useSelector(state => state.userReducer.orderHistory);

  const getProfileApi = async () => {
    try {
      const res = await axios({
        url: "https://apistore.cybersoft.edu.vn/api/Users/getProfile",
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("TOKEN"),
        },
      });

      setProfile(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfileApi();
  }, []);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (text, record) => (
        <img src={record.image} width={50} alt="Product" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text, record) => record.price.toLocaleString() + ' VND',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Total',
      render: (text, record) => (
        (record.price * record.quantity).toLocaleString() + ' VND'
      ),
    },
  ];

  const orderData = orderHistory.map(order => ({
    id: order.id,
    image: order.image, 
    name: order.name, 
    price: order.price, 
    quantity: order.quantity,
  }));


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="profile-header p-3 bg-gradient text-white rounded-top">
            <h4 className="text-left text-dark fs-1 fw-bold">Profile</h4>
          </div>
        </div>
      </div>

      <div className="row bg-white p-4 shadow-sm rounded-bottom">
        <div className="col-md-3 text-center">
          <UpdateAvatar />
        </div>

        <div className="col-md-9">
          <Form layout="vertical">
            <div className="row">
              <div className="col-md-6">
                <Form.Item label="Email">
                  <Input value={profile.email} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="Name">
                  <Input value={profile.name} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="Phone">
                  <Input value={profile.phone} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="Password">
                  <Input.Password value={profile.password} />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>

      <div className="mt-4">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Order History" key="1">
            <div className="order-section">
              {orderData.length === 0 ? (
                <p>No orders found</p>
              ) : (
                <Table
                  rowKey={'id'}
                  dataSource={orderData}
                  columns={columns}
                  pagination={false}
                />
              )}
            </div>
          </TabPane>
        </Tabs>

      </div>
    </div>
  );
};

export default Profile;
