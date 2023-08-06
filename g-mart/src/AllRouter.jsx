import { createBrowserRouter } from "react-router-dom";

import About from "./Components/UI/About";
import Register from "./Components/UI/Register";

import Footer from "./Components/UI/Footer";
import Login from "./Components/UI/Login";
import DefaultLayout from "./Components/layout/DefaultLayout";
import Product from "./Components/Admin/Product/Product";
import Category from "./Components/Admin/Category/Category";
import Order from "./Components/Admin/Order/Order";
import React from "react";
import Home from "./Components/UI/Home";
import ProductItem from "./Components/UI/ProductItem";
import ViewProduct from "./Components/Admin/Product/ViewProduct";
import ViewCategory from "./Components/Admin/Category/ViewCategory";
import EditCategory from "./Components/Admin/Category/EditCategory";
import FeedCategory from "./Components/Feed/FeedCategory";
import Nav from "./Components/UI/Nav";
import EditProduct from "./Components/Admin/Product/EditProduct";
import ProductTab from "./Components/Feed/ProductTab";
import ProductView from "./Components/Feed/ProductView";
import Checkout from "./Components/Card/Checkout";
import Cart from "./Components/Cart/Cart";
import Sucess from "./Components/Card/Sucess";
import RelatedProduct from "./Components/Feed/RelatedProduct";
import { UserLog } from "./Components/UI/UserLog";
import Activity from "./Components/Admin/Activity";
import Profile from "./Components/Admin/Profile";

import ViewOrders from "./Components/Admin/Order/ViewOrders";
import Dashboard from "./Components/Admin/Dashboard";
import Delivery from "./Components/UI/Delivery";
const AllRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Fragment>
        <Nav />
        <Home />
        <Footer />
      </React.Fragment>
    ),
  },
  {
    path: "/dashboard",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/product",
        element: <Product />,
      },
      {
        path: "/dashboard/product",
        element: <Product />,
      },
      {
        path: "/dashboard/product/view-product",
        element: <ViewProduct />,
      },
      {
        path: "/dashboard/category/view-product/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "/dashboard/category/view-category",
        element: <ViewCategory />,
      },

      {
        path: "/dashboard/category",
        element: <Category />,
      },
      {
        path: "/dashboard/category/edit-category/:id",
        element: <EditCategory />,
      },
      {
        path: "/dashboard/order",
        element: <Order />,
      },
      {
        path: "/dashboard/activity",
        element: <Activity />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/view-order/:orderId",
        element: <ViewOrders />,
      },
    ],
  },

  {
    path: "/about",
    element: (
      <React.Fragment>
        {" "}
        <Nav />
        <About />
        <Footer />
      </React.Fragment>
    ),
  },

  {
    path: "/category",
    element: (
      <React.Fragment>
        <Nav />
        <FeedCategory />
        <Footer />
      </React.Fragment>
    ),
  },
  {
    path: "/products/:name",
    element: (
      <React.Fragment>
        <Nav />
        <ProductTab />
      </React.Fragment>
    ),
  },
  {
    path: "/viewproductdetail/:category_name/:product_id",
    element: (
      <React.Fragment>
        <Nav />
        <ProductView />
        <RelatedProduct />
      </React.Fragment>
    ),
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard/order",
    element: <Order />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product",
    element: <ProductItem />,
  },
  {
    path: "/cart/checkout",
    element: <Checkout />,
  },
  {
    path: "/sucess",
    element: <Sucess />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },

  {
    path: "/delivery",
    element: (
      <React.Fragment>
        <Nav />
        <Delivery />
      </React.Fragment>
    ),
  },
  {
    path: "/userlog",
    element: (
      <React.Fragment>
        <Nav />
        <UserLog />
      </React.Fragment>
    ),
  },
]);

export default AllRouter;
