import React, { useEffect, useState } from "react";
import {BrowserRouter as Router,Routes,Route,Navigate,BrowserRouter,} from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Home from "./components/Home";
import Product from "./components/Product";
import MainFooter from "./components/MainFooter";
import About_Us from "./components/AboutUs";
import OrderStatus from "./components/OrderStatus";
import Userinfo from "./components/Userinfo";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import Header from "./Admin/components/Header";
import Products from "./Admin/components/Products";
import Orders from "./Admin/components/Orders";
import AddProduct from "./Admin/components/AddProduct";
import OrderComplete from "./Admin/components/OrderComplete";
import OrderCancle from "./Admin/components/OrderCancle";
import Dashboard from "./Admin/components/Dashboard";
import UpdateProduct from "./Admin/components/UpdateProduct";



function App() {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  useEffect(() => {
    // Check if the current route is /signup-signin
    setShowHeaderFooter(
      window.location.pathname !== "/signup" &&
        window.location.pathname !== "/signin" 
    );
  }, []);

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/userinfo" element={<Userinfo />} />
          <Route path="/about-us" element={<About_Us />} />
          <Route path="/orderstatus" element={<OrderStatus />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userinfo" element={<Userinfo />} />
        </Routes>
      </BrowserRouter> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
            setShowHeaderFooter={setShowHeaderFooter}/>
          <Route
            path="/products"
            element={<Product />}
            setShowHeaderFooter={setShowHeaderFooter}/>
          <Route
            path="/about-us"
            element={<About_Us />}
            setShowHeaderFooter={setShowHeaderFooter}/>
          <Route
            path="/orderstatus"
            element={<OrderStatus />}
            setShowHeaderFooter={setShowHeaderFooter}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userinfo" element={<Userinfo />} />


          <Route path="/header" element={<Header />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/ordercomplete" element={<OrderComplete />} />
          <Route path="/ordercancle" element={<OrderCancle />} />
          <Route path='/updateproduct/:id' element={<UpdateProduct />} />
          
          
        </Routes>
        {showHeaderFooter && (
          <>
            {/* <MainHeader />
            <MainFooter /> */}
            {/* <Header /> */}
          </>
        )}
      </Router>
    </>
  );
}

export default App;
