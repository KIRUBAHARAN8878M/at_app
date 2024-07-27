import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  // Define routes that should not display the Navbar
  const noNavbarRoutes = ['/login', '/register'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar role={userRole} />}
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
