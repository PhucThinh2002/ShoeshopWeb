
import React from 'react';
import HeaderMenu from './HeaderMenu';
import AppFooter from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <HeaderMenu />
      <div style={{minHeight:600}} className='content'>
            <Outlet/>       
      </div>  
      <AppFooter />
    </div>
  );
};

export default Layout;
