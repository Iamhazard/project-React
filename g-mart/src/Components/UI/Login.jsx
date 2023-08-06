import React, { useState } from "react";
import logo from "../Assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import axiosClient from "../../axios";
import { useStateContext } from "../../Context/ContextProvider";

const Login = () => {
  const navigate = useNavigate();

  const { setUserToken, setCurrentUser } = useStateContext();

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axiosClient.defaults.withCredentials = true;

    // axiosClient.get("/sanctum/csrf-cookie").then((response) => {
    axiosClient
      .post(`/login`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setUserToken(res.data.token);
          setCurrentUser(res.data.username);
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal.fire("Success", res.data.message, "success");
          if (res.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/category");
          }
        } else if (res.data.status === 401) {
          swal.fire("Warning", res.data.message, "warning");
        } else {
          setLogin({
            ...loginInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    // });
  };

  return (
    <div className="bg-grey-lighter font-sans text-gray-900 bg-gradient-to-br from-transparent to-green-100 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        </Link>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={loginSubmit}
          className="space-y-6"
          action="#"
          method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={handleInput}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span>{loginInput.error_list?.email}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleInput}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span>{loginInput.error_list?.password}</span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
