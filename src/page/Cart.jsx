import React, { useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeQuantityProductAction, deleteProductAction } from '../Redux/reducers/cartReducer';
import { setOrderHistory } from '../Redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import useLoginCheck from '../hooks/useLoginCheck';

const Cart = () => {
  const cartStore = useSelector(state => state.cartSliceReducer.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ModalComponent } = useLoginCheck();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (value, record) => (
        <img src={record.image} width={50} alt="Product" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (value, record) => (
        <>
          <Button
            className="btn btn-dark me-2"
            onClick={() => {
              const payload = { id: record.id, quantity: 1 };
              dispatch(changeQuantityProductAction(payload));
            }}
          >
            +
          </Button>
          {value}
          <Button
            className="btn btn-dark ms-2"
            onClick={() => {
              const payload = { id: record.id, quantity: -1 };
              dispatch(changeQuantityProductAction(payload));
            }}
          >
            -
          </Button>
        </>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Total',
      render: (value, record) => (
        (record.price * record.quantity).toLocaleString()
      ),
    },
    {
      title: 'Action',
      render: (value, record) => (
        <>
          <Button
            className="btn btn-primary me-2"
            onClick={() => {
              // edit action
              console.log('Edit:', record.id);
            }}
          >
            Edit
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              dispatch(deleteProductAction(record.id));
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleSubmitOrder = async () => {
    try {
      const orderData = cartStore.map(item => ({
        id: item.id,
        image: item.image, 
        name: item.name, 
        price: item.price, 
        quantity: item.quantity,
      }));
  
      const response = await axios.post('https://apistore.cybersoft.edu.vn/api/Users/order', orderData);
  
      if (response.status === 200) {
        message.success('Đặt hàng thành công');
        dispatch(setOrderHistory(orderData)); 
      } else {
        message.error('Đặt hàng thất bại');
      }
    } catch (error) {
      console.error('Error submit', error);
      message.error('Đã xảy ra lỗi khi gửi đơn hàng.');
    }
  };
  

  return (
    <>
      <div className="container mt-3">
        <h3>Cart</h3>
        <Table
          rowKey={'id'}
          dataSource={cartStore}
          columns={columns}
          pagination={false}
        />
        <div className="text-end mt-3">
          <Button
            type="primary"
            size="large"
            onClick={handleSubmitOrder}
          >
            Submit Order
          </Button>
        </div>
      </div>
      {ModalComponent}
    </>
  );
};

export default Cart;
