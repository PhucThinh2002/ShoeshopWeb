import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'; 
import { useDispatch } from 'react-redux';
import { registerActionAsync } from '../Redux/reducers/userReducer';
import '../assets/scss/Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
      gender: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      name: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
      gender: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      const result = await dispatch(registerActionAsync(values));
      if (result) {
        message.success('Đăng ký thành công. Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        message.error('Đăng ký thất bại, vui lòng thử lại.');
      }
    }    
    
  });

  return (
    <div className="container mt-5">
      <div className="form-container">
        <h2 className="text-center">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="passwordConfirm">Password Confirm</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                  <div className="text-danger">{formik.errors.passwordConfirm}</div>
                ) : null}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-danger">{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="form-group mb-3">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === 'male'}
                  /> Male
                </label>
                <label className="form-check-label ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === 'female'}
                  /> Female
                </label>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="text-danger">{formik.errors.gender}</div>
                ) : null}
              </div>
              <button type="submit" className="btn btn-primary w-25">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;