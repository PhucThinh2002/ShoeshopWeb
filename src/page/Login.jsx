import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginActionAsync } from '../Redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userReducer.userLogin);

  const frmLogin = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      const result = await dispatch(loginActionAsync(values));
      if (result.payload) { 
        message.success('Đăng nhập thành công!'); 
        navigate('/'); 
      } else {
        message.error('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
      }
    }
  });

  useEffect(() => {
    if (userLogin) {
      navigate('/'); 
    }
  }, [userLogin, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-form card p-4">
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={frmLogin.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={frmLogin.handleChange}
              value={frmLogin.values.email}
              required
            />
            <div className="invalid-feedback">Please enter a valid email address.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={frmLogin.handleChange}
              value={frmLogin.values.password}
              required
            />
            <div className="invalid-feedback">Please enter a valid password.</div>
          </div>
          <button type="submit" className="btn btn-primary w-100">LOGIN</button>
        </form>
        <div className="mt-3 text-center">
          <a href="/register" className="btn btn-outline-secondary w-100 mb-2">Register now?</a>
          <a href="#" className="btn btn-outline-secondary w-100">Continue with Facebook</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
