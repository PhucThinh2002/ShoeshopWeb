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
      "email": "",
      "password": "",
      "name": "",
      "gender": true, 
      "phone": ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Địa chỉ email không hợp lệ').required('required'),
      password: Yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('required'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('required'),
      name: Yup.string().required('required'),
      phone: Yup.string().required('required'),
      gender: Yup.boolean().required('required')
    }),
    onSubmit: async (values) => {
      const { passwordConfirm, ...registerData } = values;
      const result = await dispatch(registerActionAsync(registerData));
      if (result) {
        message.success('Đăng ký thành công. Vui lòng đăng nhập.');
        navigate('/login', { state: { user: result } });
      } else {
        message.error('Đăng ký thất bại, vui lòng thử lại.');
      }
    }
  });

  const handleGenderChange = (e) => {
    formik.setFieldValue('gender', e.target.value === 'male');
  };

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
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
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
                  required
                  autoComplete="new-password"
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
                />
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
                    onChange={handleGenderChange}
                    checked={formik.values.gender === true}
                  /> Male
                </label>
                <label className="form-check-label ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleGenderChange}
                    checked={formik.values.gender === false}
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
