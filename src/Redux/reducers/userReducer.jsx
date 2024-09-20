import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../util/setting'; 

const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    userLogin: JSON.parse(localStorage.getItem('userLogin')) || null,
    profile: null,
    orderHistory: [], 
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
      localStorage.setItem('userLogin', JSON.stringify(action.payload)); 
    },
    setProfileAction: (state, action) => {
      state.profile = action.payload;
    },
    setOrderHistory: (state, action) => {
      state.orderHistory = action.payload;
    },
    clearUserLogin: (state) => {
      state.userLogin = null;
      localStorage.removeItem('userLogin'); 
    },
  },
});

export const { setUserLogin, clearUserLogin, setProfileAction, setOrderHistory } = userSlice.actions;

export default userSlice.reducer;

export const loginActionAsync = (user) => async (dispatch) => {
  try {
    const response = await axios.post('https://apistore.cybersoft.edu.vn/api/Users/signin', user);
    if (response.data.content) {
      dispatch(setUserLogin(response.data.content));
      return { payload: response.data.content }; 
    }
  } catch (error) {
    console.error('Login error', error);
    return { payload: null }; 
  }
};

export const registerActionAsync = (user) => async (dispatch) => {
  try {
    const response = await axios.post('https://apistore.cybersoft.edu.vn/api/Users/signup', user);
    return response.data.content; 
  } catch (error) {
    console.error('Registration error', error);
    return null;
  }
};




export const updateProfileActionAsync = (updatedProfile) => {
  return async (dispatch) => {
    try {
      const res = await http.post('https://apistore.cybersoft.edu.vn/api/Users/updateProfile', updatedProfile);
      dispatch(setProfileAction(res.data.content));
      console.log('Profile updated successfully:', res.data.content);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };
};

export const updateAvatarActionAsync = (avatar) => {
  return async (dispatch) => {
    try {
      const response = await http.post('https://apistore.cybersoft.edu.vn/api/Users/uploadavatar', avatar);
      dispatch(setUserLogin(response.data.content));
    } catch (error) {
      console.error(error);
    }
  };
};

