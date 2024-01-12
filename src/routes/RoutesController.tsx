import React from 'react';
import {
    Routes,
    Route
  } from "react-router-dom";
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ListPage from '../pages/products/list/ListPage';
import CreatePage from '../pages/products/create/CreatePage';
import LogoutPage from '../pages/users/logout/LogoutPage';
import ProfilePage from '../pages/users/profile/ProfilePage';
import EditProductPage from '../pages/products/edit/EditProductPage';
import CreateClientPage from '../pages/clients/create/CreatePage';
import EditClientPage from '../pages/clients/edit/EditPage';
import ListClientPage from "../pages/clients/list/ListPage"

const RoutesController = () => {
    return (
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/dashboard" Component={DashboardPage} />

        <Route path="/products/create" Component={CreatePage} />
        <Route path="/products/list" Component={ListPage} />
        <Route path="/product/:id" Component={EditProductPage} />

        <Route path='/clients/list' Component={ListClientPage} />
        <Route path='/clients/create' Component={CreateClientPage} />
        <Route path='/client/:id' Component={EditClientPage} />

        <Route path='/users/profile' Component={ProfilePage} />
        <Route path="/users/logout" Component={LogoutPage} />
      </Routes>
    )
    
}

export default RoutesController