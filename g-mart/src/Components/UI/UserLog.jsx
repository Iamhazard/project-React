import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios";

export const UserLog = () => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);

  const [error, setError] = useState(null);
  const { userId } = useParams();
  useEffect(() => {
    let isMounted = true;
    document.title = "Order Items";

    axiosClient.get(`/orderdetails`).then((res) => {
      if (isMounted) {
        if (res.data && res.data.status === 200) {
          setOrderDetails(res.data.orders || []);
          setLoading(false);
          setError(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My order
          </h1>
        </div>
      </header>
      <div className="bg-white rounded-md shadow-md p-4">
        <h2 className="text-xl font-bold leading-6 text-gray-900">
          Order details
        </h2>
        <div className="mt-4">
          {Array.isArray(orderDetails) && orderDetails.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking Number
                  </th>

                  <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>

                  <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((order) => {
                  return (
                    <tr key={order.order_id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.tracking_no}
                        <p className="text-sm leading-none">{order.order_id}</p>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.user_name}
                        </td>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <img
                          src={`http://localhost:8000/${order.product_image}`}
                          alt={order.product_name}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.product_name}
                        </td>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <p>Order Date: {order.order_date}</p>
                        {/* Add any other relevant order details you want to display */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Link to="">
                          <p className="leading-relaxed">{order.order}</p>
                          order
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>No order details found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLog;
