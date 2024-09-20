import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./page/Home";
import Layout from "./component/Layout";
import Cart from "./page/Cart";
import Detail from "./page/Detail";
import Login from "./page/Login";
import Register from "./page/Register";
import Search from "./page/Search";
import Profile from "./page/Profile";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="detail/:productId" element={<Detail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="search" element={<Search />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
