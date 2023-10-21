import React from 'react';
import {
    Routes,
    Route
  } from "react-router-dom";
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ListPage from '../pages/products/list/ListPage';
import LogoutPage from '../pages/users/logout/LogoutPage';
import ProfilePage from '../pages/users/profile/ProfilePage';

const RoutesController = () => {
    return (
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/dashboard" Component={DashboardPage} />
        <Route path="/products/create" Component={DashboardPage} />
        <Route path="/products/list" Component={ListPage} />

        <Route path='/users/profile' Component={ProfilePage} />
        <Route path="/users/logout" Component={LogoutPage} />
      </Routes>
    )
    
}

export default RoutesController