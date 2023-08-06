import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios";

function Order() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "Orders";

    axiosClient.get(`/admin/orders`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setOrders(res.data.orders); // Assuming the array of orders is available under the "orders" key in the response data
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);
  // console.log(orders);
  let displayOrders = "";
  if (loading) {
    return <h4 className="text-center">View Orders loading.</h4>;
  } else {
    displayOrders =
      orders &&
      orders.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.tracking_no}</td>
            <td>{item.phone}</td>
            <td>{item.user_id}</td>

            <td>{item.email}</td>
            <td>{item.payment_mode}</td>
            <td>
              <Link
                to={`/dashboard/view-order/${item.id}`}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-sm transition-colors duration-300">
                view
              </Link>
            </td>
          </tr>
        );
      });
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Orders
          </h1>
        </div>
      </header>
      <div className="container mx-auto px-4 mt-3">
        <div className="bg-white shadow-md rounded-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold">View orders</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-100">ID</th>
                  <th className="px-4 py-2 bg-gray-100">Tracking No.</th>
                  <th className="px-4 py-2 bg-gray-100">Phone No.</th>
                  <th className="px-4 py-2 bg-gray-100">User Id</th>
                  <th className="px-4 py-2 bg-gray-100">Email</th>
                  <th className="px-4 py-2 bg-gray-100">Payment Mode</th>
                  <th className="px-4 py-2 bg-gray-100">Action</th>
                </tr>
              </thead>
              <tbody>{displayOrders}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
