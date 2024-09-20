import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { updateProfileActionAsync } from '../Redux/reducers/userReducer';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleUpdateProfile = async (values) => {
    dispatch(updateProfileActionAsync(values));
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;