import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Policy from "./components/pages/Policy";
import Pagenotfound from "./components/pages/Pagenotfound";
import Register from "./components/pages/Auth/Register";
import Login from "./components/pages/Auth/Login";
import Dashboard from "./components/pages/user/Dashboard";
import Private from "./components/Routes/Private";
import ForgetPassword from "./components/pages/Auth/ForgetPassword";
import AdminPrivate from "./components/Routes/AdminPrivate";
import AdminDashboard from "./components/pages/Admin/AdminDashboard";
import AdminCategory from "./components/pages/Admin/AdminCategetory";
import AdminProduct from "./components/pages/Admin/AdminProduct";
import User from "./components/pages/Admin/User";
import Profile from "./components/pages/user/Profile";
import Order from "./components/pages/user/Order";
import AllProduct from "./components/pages/Admin/AllProduct";
import AdminUpdateProduct from "./components/pages/Admin/AdminUpdateProduct";
import Search from "./components/pages/Search";
import ProductDetails from "./components/pages/productDetails";
import Categories from "./components/pages/Categories";
import CategoriesProduct from "./components/pages/CategoriesProduct";
import CartPage from "./components/pages/cartPage";
import AdminOrders from "./components/pages/Admin/AdminOrders";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoriesProduct />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="/dashboard/user/profile" element={<Profile />} />
          <Route path="/dashboard/user/orders" element={<Order />} />
        </Route>
        <Route path="/dashboard" element={<AdminPrivate />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<AdminCategory />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/create-product" element={<AdminProduct />} />
          <Route path="admin/allProduct" element={<AllProduct />} />
          <Route path="admin/product/:slug" element={<AdminUpdateProduct />} />
          <Route path="admin/users" element={<User />} />
        </Route>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
};

export default App;
