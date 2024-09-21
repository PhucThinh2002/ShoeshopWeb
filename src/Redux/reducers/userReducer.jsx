import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { http, TOKEN, USER_LOGIN, } from '../../util/setting'; 

const initialState = {
  userLogin: JSON.parse(localStorage.getItem('userLogin')) || null,
  profile: {},
  orderHistory: [], 
}
const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
      localStorage.setItem('userLogin', JSON.stringify(action.payload)); 
    },
    setUserLoginAction: (state,action) => {
      state.userLogin = action.payload;
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

export const {setUserLogin, clearUserLogin, setProfileAction, setOrderHistory, setUserLoginAction } = userSlice.actions;

export default userSlice.reducer;

export const loginActionAsync = (user) => async (dispatch) => {
  try {
    const response = await axios.post('https://apistore.cybersoft.edu.vn/api/Users/signin', user);
    const token = response.data.content.accessToken; 
    const userLogin = JSON.stringify(response.data.content);
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(USER_LOGIN, userLogin);

    // Nạp dữ liệu lên store
    dispatch(setUserLoginAction(response.data.content));
    dispatch(getProfileActionAsync()); 

    return { payload: response.data.content }; 
  } catch (error) {
    console.error('Login error', error);
    return { payload: null }; 
  }
};



export const registerActionAsync = (user) => async (dispatch) => {
  try {
    const response = await axios.post('https://apistore.cybersoft.edu.vn/api/Users/signup', user);
    if (response.data.content) {
      return response.data.content;
    }
  } catch (error) {
    console.error('Registration error', error);
    return false;
  }
};

export const getProfileActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await http.post('https://apistore.cybersoft.edu.vn/api/Users/getProfile', {}, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem(TOKEN)}`,
        },
      });
      const actionPayload = setProfileAction(res.data.content);
      dispatch(actionPayload);
    } catch (err) {
      console.log(err);
    }
  };
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

