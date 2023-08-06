import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axios";
import swal from "sweetalert2";
import KhaltiCheckout from "khalti-checkout-web";
import config from "../khalti/config";

const Checkout = () => {
  const Cites = ["Kathmandu", "Bhaktapur", "lalitpur", "Chitwan", "Pokhara"];
  const Areas = [
    "Kathmandu-Newroad",
    "Bhaktapur-durbarsquare",
    "lalitpur-patan",
    "Chitwan-Narayangarh",
    "Chitwan-Bharatpur",
    "Chitwan-Gondrang",
    "Chitwan-Tandi",
    "pokhara-04",
  ];
  const [checkoutInput, setCheckoutInput] = useState({
    fullName: "",
    phone: "",
    email: "",
    Areas: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const States = ["Bagmati", "Gandakai"];
  const [menu, setMenu] = useState(false);

  const [error, setError] = useState("");
  const product = {};
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const changeText = (value, type) => {
    setMenu(false);
    setCheckoutInput((prevState) => ({
      ...prevState,
      [type]: value,
    }));
    setError("");
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach((item) => {
      const price = parseFloat(item.product.price);
      const quantity = item.product_qty;
      if (!isNaN(price) && !isNaN(quantity)) {
        subtotal += price * quantity;
      }
    });
    return subtotal.toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const taxRate = 0.1; // Assuming tax rate is 10%
    const tax = subtotal * taxRate;
    return tax.toFixed(2);
  };

  const calculateShipping = () => {
    return "30.00"; // Assuming fixed shipping cost of $30.00
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const shipping = calculateShipping();
    const total = parseFloat(subtotal) + parseFloat(tax) + parseFloat(shipping);
    return total.toFixed(2);
  };

  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let isMounted = true;

    axiosClient.get(`/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status === 401) {
          navigate("/");
          swal.fire("Warning", res.data.message, "error");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  var checkout = new KhaltiCheckout({
    ...config,
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        axiosClient
          .post(`/validate-order`, {
            fullName: checkoutInput.fullName,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            Areas: checkoutInput.Areas,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            payment_mode: "khalti",
            payment_id: "",
          })
          .then((res) => {
            if (res.data.status === 200) {
              swal.fire(
                "Order Placed Successfully",
                res.data.message,
                "success"
              );
              setError([]);
              navigate("/sucess");
            } else if (res.data.status === 422) {
              swal.fire("All fields are mandetory", "", "error");
              setError(res.data.errors);
            }
          });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
    },
  });

  const submitOrder = (e, payment_mode) => {
    e.preventDefault();
    // console.log("Performing checkout...");
    // if (!city || !Area || !state || !email || !phoneNumber || !fullName) {
    //   setError("Please select city, area, and state.");
    // } else {
    //   // console.log("Checkout success!");
    //   setError("");
    // }

    var data = {
      fullName: checkoutInput.fullName,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      Areas: checkoutInput.Areas,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
      payment_mode: payment_mode,
      payment_id: "",
    };

    // minimum transaction amount must be 10, i.e 1000 in paisa.

    switch (payment_mode) {
      case "cod":
        axiosClient
          .post(`/place-order`, data)
          .then((res) => {
            if (res.data.status === 200) {
              swal.fire(
                "Order Placed Successfully",
                res.data.message,
                "success"
              );
              setError([]);
              navigate("/sucess");
            } else if (res.data.status === 422) {
              swal.fire("All fields are mandetory", "", "error");
              setError(res.data.errors);
            }
          })
          .catch((error) => {
            // Handle error if the request fails
            console.log("Error:", error);
            setError(
              "An error occurred during the checkout process. Please try again."
            );
          });
        break;

      case "KHA":
        checkout.show({ amount: parseInt(calculateTotal() * 100) });

        //   axiosClient.post(`/validate-order`, data).then((res) => {
        //     if (res.data.status === 200) {

        //       setError([]);
        //     } else if (res.data.status === 422) {
        //       swal.fire("All fields are mandetory", "", "error");
        //       setError(res.data.errors);
        //     }
        //   });
        break;

      default:
        break;
    }
  };
  // let checkout = new KhaltiCheckout(config);

  if (loading) {
    return <h4>Loading Checkout...</h4>;
  }

  if (cart.length === 0) {
    return (
      <div className="card card-body py-5 text-center shadow-sm">
        <h4>Your Shopping Cart is Empty</h4>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
        <div className="flex flex-col justify-start items-start w-full space-y-9">
          <div className="flex justify-start flex-col items-start space-y-2">
            <button className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
              <svg
                className="fill-stroke"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.91681 7H11.0835"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7L5.25014 9.33333"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7.00002L5.25014 4.66669"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link to="/category">
                <p className="text-sm leading-none">Back</p>
              </Link>
            </button>
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Checkout
            </p>
            <p className="text-base leading-normal sm:leading-4 text-gray-600">
              Home {">"} Category {">"} Product {">"} Cart {">"} Checkout
            </p>
          </div>

          <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
            <div className=" flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
              <div className="flex flex-col justify-start items-start w-full space-y-4">
                <p className="text-xl md:text-2xl leading-normal text-gray-800">
                  {product.name}
                </p>
                <p className="text-base font-semibold leading-none text-gray-600">
                  {product.price}
                </p>
              </div>
              <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto"></div>
            </div>
            <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={checkoutInput.email}
                  onChange={handleInput}
                />
                <small className="text-danger">{error.email}</small>
              </div>
              <div className="flex flex-row justify-center items-center mt-6">
                <hr className="border w-full" />
                <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">
                  Details
                </p>
                <hr className="border w-full" />
              </div>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    value={checkoutInput.phone}
                    onChange={handleInput}
                  />
                  <small className="text-danger">{error.phone}</small>
                </div>
              </div>

              <label className="mt-8 text-base leading-4 text-gray-800">
                Full Name
              </label>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="name"
                    name="fullName"
                    placeholder="Full Name"
                    value={checkoutInput.fullName}
                    onChange={handleInput}
                  />
                  <small className="text-danger">{error.city}</small>
                </div>
              </div>

              <label className="mt-8 text-base leading-4 text-gray-800">
                State
              </label>
              <div className="mt-2 flex-col">
                <div className="relative">
                  <button
                    name="state"
                    onChange={handleInput}
                    value={checkoutInput.state}
                    className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                    type="email">
                    {checkoutInput.state}
                  </button>
                  <small className="text-danger">{error.state}</small>
                  <svg
                    onClick={() => setMenu(!menu)}
                    className={
                      "transform  cursor-pointer absolute top-4 right-4 " +
                      (menu ? "rotate-180" : "")
                    }
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.5 5.75L8 10.25L12.5 5.75"
                      stroke="#27272A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    className={
                      "mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " +
                      (menu ? "block" : "hidden")
                    }>
                    {States.map((state) => (
                      <div
                        key={state}
                        className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2"
                        onClick={() => changeText(state, "state")}>
                        {state}
                      </div>
                    ))}
                  </div>
                </div>

                <label className="mt-8 text-base leading-4 text-gray-800">
                  City
                </label>
                <div className="mt-2 flex-col">
                  <div className="relative">
                    <button
                      name="city"
                      onChange={handleInput}
                      value={checkoutInput.city}
                      className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                      type="email">
                      {checkoutInput.city}
                    </button>
                    <small className="text-danger">{error.city}</small>
                    <svg
                      onClick={() => setMenu(!menu)}
                      className={
                        "transform  cursor-pointer absolute top-4 right-4 " +
                        (menu ? "rotate-180" : "")
                      }
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.5 5.75L8 10.25L12.5 5.75"
                        stroke="#27272A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      className={
                        "mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " +
                        (menu ? "block" : "hidden")
                      }>
                      {Cites.map((city) => (
                        <div
                          key={city}
                          className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2"
                          onClick={() => changeText(city, "city")}>
                          {city}
                        </div>
                      ))}
                    </div>
                  </div>
                  <label className="mt-8 text-base leading-4 text-gray-800">
                    Areas
                  </label>
                  <div className="mt-2 flex-col">
                    <div className="relative">
                      <button
                        name="Areas"
                        onChange={handleInput}
                        value={checkoutInput.Areas}
                        className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                        type="email">
                        {checkoutInput.Areas}
                      </button>
                      <small className="text-danger">{error.Areas}</small>
                      <svg
                        onClick={() => setMenu(!menu)}
                        className={
                          "transform  cursor-pointer absolute top-4 right-4 " +
                          (menu ? "rotate-180" : "")
                        }
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3.5 5.75L8 10.25L12.5 5.75"
                          stroke="#27272A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div
                        className={
                          "mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " +
                          (menu ? "block" : "hidden")
                        }>
                        {Areas.map((Area) => (
                          <div
                            key={Area}
                            className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2"
                            onClick={() => changeText(Area, "Areas")}>
                            {Area}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <br></br>
                    <input
                      name="zipcode"
                      value={checkoutInput.zipcode}
                      onChange={handleInput}
                      className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="number"
                      placeholder="ZIP"
                    />

                    <small className="text-danger">{error.zipcode}</small>
                  </div>
                </div>

                <div>
                  <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">
                    Cash on delivery
                  </p>
                  <button
                    onClick={(e) => submitOrder(e, "cod")}
                    className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                    <div>
                      <p className="text-base leading-4">
                        Pay Rs.{calculateTotal()}
                      </p>
                    </div>
                  </button>
                </div>

                <button
                  onClick={(e) => submitOrder(e, "KHA")}
                  className="mt-8 border border-transparent hover:border-gray-300 bg-purple-600 hover:bg-purple-700 text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                  <div>
                    <p className="text-base leading-4">Pay by khalti</p>
                  </div>
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
