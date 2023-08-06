import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { FiAlignJustify } from "react-icons/fi";

import CartButton from "../Cart/CartButton";
import { Menu, Transition } from "@headlessui/react";
import { BiUserCheck } from "react-icons/bi";
import { useState } from "react";
import Swal from "sweetalert2";

import axiosClient from "../../axios";
import { useStateContext } from "../../Context/ContextProvider";

const Nav = () => {
  const navigate = useNavigate();

  // const [cartIconsShown, setCartIconsShown] = useState(false);

  //   const showIconCartHandler =()=>{
  //     setCartIconsShow(true);
  //   };

  //   const hideCartHandler=()=>{
  //  setCartIconsShown(false);
  //   };
  const menus = [
    { path: "/", name: "Home" },
    { path: "/category", name: "Category" },
    { path: "/delivery", name: "Delivery" },
    { path: "/about", name: "About us" },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [cartIsShown, setCartIsShown] = useState(true);

  const { currentUser, setCurrentUser, setUserToken } = useStateContext();

  const handleProfileResponse = (data) => {
    setCurrentUser({
      name: data.name,
      email: data.email,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setUserToken(token);
      axiosClient.get("/profile").then(({ data }) => {
        handleProfileResponse(data.user);
      });
    }
  }, [setUserToken]);

  // useEffect(() => {
  //   const token = localStorage.getItem("auth_token");
  //   if (token) {
  //     setUserToken(token);
  //     axiosClient.get("/profile").then(({ data }) => {
  //       setCurrentUser(data);
  //     });
  //   }
  // }, [navigate, setUserToken, setCurrentUser]);

  const showCartHandler = () => {
    setCartIsShown(true);
    navigate("/cart");
  };

  const logoutSubmit = (e) => {
    e.preventDefault();

    axiosClient.post(`/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        Swal.fire("Logout sucessfully", res.data.message, "success");
      }
    });
  };
  console.log(currentUser);

  return (
    <div
      className={`"w-full h-5/6 font-sans text-gray-900 bg-gradient-to-br from-transparent to-green-100 ${
        sidebarOpen ? "overflow-hidden h-screen" : ""
      }"`}>
      <nav className="flex justify-between items-center py-5 px-6 mx-auto max-w-screen-xl md:px-12 lg:px-16 xl:px-24">
        <a
          href="./"
          className="text-3xl md:text-4xl font-bold tracking-wide text-green-500">
          G-<span className="text-gray-900 font-bold">mart</span>
        </a>
        {/* <Example className="w-16" /> */}

        <div
          className={`inset-0 transition-all bg-white/70 backdrop-blur-xl z-20 md:static md:bg-transparent md:flex items-center justify-center space-y-8 md:space-y-0 md:space-x-8 flex-col md:flex-row lg:space-x-14 ${
            sidebarOpen ? "fixed flex " : "hidden"
          }`}>
          <ul className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 lg:md:-x-8">
            {menus.map((menu, index) => (
              <li
                className="text-lg md:text-base lg:text-lg font-medium group relative"
                key={index}>
                <NavLink
                  to={menu.path}
                  true
                  className={`${menu.path === "/" ? "text-green-500" : ""}`}
                  activeStyle={{ color: "green" }}>
                  {menu.name}
                </NavLink>
                <div className="h-0.5 bg-green-500 w-full absolute bottom-0 left-0 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </li>
            ))}
          </ul>
          {!currentUser.name && (
            <Link
              to="./login"
              className="flex justify-center items-center h-13 px-7 font-medium text-white bg-green-500 rounded-xl hover:shadow-primary transition-shadow duration-300 whitespace-nowrap md:w-32 lg:w-48">
              Sign in
            </Link>
          )}

          {cartIsShown}
          {/* {cartIsShown &&  onClose={hideCartHandler}} */}
          <CartButton className="md:w-32 lg:w-48" onClick={showCartHandler} />
          {currentUser.name && (
            <Menu as="div" className="relative ml-3">
              <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <BiUserCheck className="h-8 w-8 rounded-full" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 mt-2 w-55 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="userlog"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}>
                        {currentUser.name}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}>
                        {currentUser.email}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        onClick={logoutSubmit}
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}>
                        Logout
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>

        <button
          onClick={handleSidebarToggle}
          className={`block md:hidden relative z-30 ${
            sidebarOpen ? "open" : ""
          }`}>
          <FiAlignJustify className="w-8 h-8 fill-current text-gray-900" />
        </button>
      </nav>
    </div>
  );
};

export default Nav;
