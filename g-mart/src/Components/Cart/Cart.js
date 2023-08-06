import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import axiosClient from "../../axios";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [show, setShow] = useState(false);

  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // var totalCartPrice = 0;

  if (!localStorage.getItem("auth_token")) {
    history("/");
    swal.fire("Warning", "Login to goto Cart Page", "error");
  }

  useEffect(() => {
    let isMounted = true;

    axiosClient.get(`/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status === 401) {
          history("/");
          swal.fire("Warning", res.data.message, "error");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [history]);

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };
  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };
  function updateCartQuantity(cart_id, scope) {
    axiosClient.put(`/cart-updatequantity/${cart_id}/${scope}`).then((res) => {
      if (res.data.status === 200) {
        // swal("Success",res.data.message,"success");
      }
    });
  }

  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";

    axiosClient.delete(`/delete-cartitem/${cart_id}`).then((res) => {
      if (res.data.status === 200) {
        swal.fire("Success", res.data.message, "success");
        // thisClicked.closest("tr").remove();
        setCart((prev) => prev.filter((cart) => cart.id !== cart_id));
      } else if (res.data.status === 404) {
        swal.fire("Error", res.data.message, "error");
        // thisClicked.innerText = "Remove";
      }
    });
  };
  if (loading) {
    return <h4>Loading Product Detail...</h4>;
  }

  if (cart.length === 0) {
    return (
      <div className="card card-body py-5 text-center shadow-sm">
        <h4>Your Shopping Cart is Empty</h4>
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
      </div>
    );
  }

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

  return (
    <>
      <div>
        <div className="flex items-center justify-center py-8">
          <button
            onClick={() => setShow(!show)}
            className="py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white">
            Open Modal
          </button>
        </div>
        {show && (
          <div
            className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
            id="chec-div">
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
            <div
              className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
              id="checkout">
              <div className="flex md:flex-row flex-col justify-end" id="cart">
                <div
                  className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                  id="scroll">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                      <div className="w-1/4">
                        <img
                          src={`http://localhost:8000/${item.product.image}`}
                          alt={item.product.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                          RF293
                        </p>
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base font-black leading-none text-gray-800">
                            {item.name}
                          </p>
                          <div className="flex flex-row h-10 w-28 rounded-lg relative bg-transparent mt-1">
                            <button
                              onClick={() => handleDecrement(item.id)}
                              data-action="decrement"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                              name="custom-input-number"
                              value={item.product_qty}
                              readOnly
                            />

                            <button
                              onClick={() => handleIncrement(item.id)}
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className=" items-center justify-center w-20 bg-gray-300 font-semibold text-md text-gray-700">
                          {item.product_qty} Kg
                        </div>
                        <p className="w-96 text-xs leading-3 text-gray-600">
                          {item.about}
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex items-center">
                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                              Add to favorites
                            </p>
                            <p
                              onClick={(e) => deleteCartItem(e, item.id)}
                              className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                              Remove
                            </p>
                          </div>
                          <p className="text-base font-black leading-none text-gray-800">
                            Nrs.{item.product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                  <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                    <div>
                      <p className="text-4xl font-black leading-9 text-gray-800">
                        Summary
                      </p>
                      <div className="flex items-center justify-between pt-16">
                        <p className="text-base leading-none text-gray-800">
                          Subtotal
                        </p>
                        <p className="text-base leading-none text-gray-800">
                          Nrs.{calculateSubtotal()}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-5">
                        <p className="text-base leading-none text-gray-800">
                          Shipping
                        </p>
                        <p className="text-base leading-none text-gray-800">
                          Nrs.{calculateShipping()}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-5">
                        <p className="text-base leading-none text-gray-800">
                          Tax
                        </p>
                        <p className="text-base leading-none text-gray-800">
                          Nrs.{calculateTax()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                        <p className="text-2xl leading-normal text-gray-800">
                          Total <br></br>
                        </p>
                        <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                          Nrs.{calculateTotal()}
                        </p>
                      </div>

                      <Link
                        to="./checkout"
                        onClick={() => setShow(!show)}
                        className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {` /* width */
          #scroll::-webkit-scrollbar {
              width: 1px;
          }

          /* Track */
          #scroll::-webkit-scrollbar-track {
              background: #f1f1f1;
          }

          /* Handle */
          #scroll::-webkit-scrollbar-thumb {
              background: rgb(133, 132, 132);
          }
      `}
      </style>
    </>
  );
}

export default Cart;
