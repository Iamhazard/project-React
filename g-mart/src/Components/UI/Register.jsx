import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../../axios";

import logo from "../Assets/logo.svg";
import swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      if (data.password !== data.password_confirmation) {
        setError("password_confirmation", {
          type: "manual",
          message: "Password confirmation does not match.",
        });
        swal.fire("Success", data.message, "success");
        return;
      }
      axiosClient.defaults.withCredentials = true;
      // axiosClient.get("/sanctum/csrf-cookie").then((response) => {
      axiosClient.post("/register", data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal.fire("Success", res.data.message, "success");
          navigate("/login");
        }
      });
    } catch (error) {
      if (error.response) {
        const { message, errors } = error.response.data;

        if (message) {
          setError("__html", {
            type: "manual",
            message: message,
          });
        }

        if (errors && errors.password) {
          setError("confirm_password", {
            type: "manual",
            message: errors.password[0],
          });
        }
      }
      console.log(error);
    }
  };
  const validateConfirmPassword = (value) => {
    const password = getValues("password");
    return value === password || "Password confirmation does not match.";
  };

  return (
    // <FormProvider {...methods}>
    <form
      onSubmit={handleSubmit(handleRegistration)}
      className="bg-grey-lighter min-h-screen flex flex-col font-sans text-gray-900 bg-gradient-to-br from-transparent to-green-100">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <Link to="/">
            <img
              className=" items-center justify-center h-10 w-10 rounded-full ring-2 ring-white"
              src={logo}
              alt=""></img>
          </Link>

          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          {errors.__html && (
            <div
              className="bg-red-500 rounded py-2 px-3 text-white"
              dangerouslySetInnerHTML={{ __html: errors.__html }}></div>
          )}
          <input
            type="text"
            name="name"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            {...register("name", {
              required: "please enter your Fullname",
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: "Please Enter A Valid Name",
              },
            })}
            placeholder="Full Name"
          />
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {errors?.name && errors.name.message}
          </span>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            {...register("email", {
              required: "Please Enter Your Email!",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please Enter A Valid Email!",
              },
            })}
            placeholder="Email"
          />
          {/* {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )} */}

          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {errors?.email && errors.email.message}
          </span>

          {/* <p>Current email value: {emailValue}</p> */}
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            {...register("password", {
              required: "Please Enter Your Password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long!",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "Password must contain at least one lowercase letter, one uppercase letter, and one number.",
              },
            })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {errors?.confirm_password && errors.confirm_password.message}
          </span>
          {/* <p>Current password value: {passwordValue}</p> */}
          <input
            id="password-confirmation"
            name="password_confirmation"
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            // Update the name attribute to "confirm_password"
            {...register("password_confirmation", {
              validate: validateConfirmPassword,
            })}
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            className="w-full text-center py-3 px-4 rounded shadow bg-white hover:bg-blue-500 text-gray-800 font-semibold focus:outline-none my-1">
            Create Account
          </button>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <Link
              className="no-underline border-b border-grey-dark text-grey-dark"
              to="#">
              Terms of Service
            </Link>{" "}
            and
            <Link
              className="no-underline border-b border-grey-dark text-grey-dark"
              to="#">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            to="/login">
            Log in
          </Link>
        </div>
      </div>
    </form>
    // </FormProvider>
  );
};

export default Register;
