import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../axios";

function ViewOrders() {
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]);
  const { orderId } = useParams();

  useEffect(() => {
    let isMounted = true;
    document.title = "Order Items";

    axiosClient.get(`/admin/view-orders/${orderId}`).then((res) => {
      if (isMounted) {
        if (res.data && res.data.status === 200) {
          setOrderItems(res.data.data?.orderItems || []);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [orderId]);
  console.log(orderItems);
  let displayOrderItems;
  if (loading) {
    return <h4>Loading Order Items...</h4>;
  } else {
    displayOrderItems = orderItems.map((item) => (
      <tr key={item.id}>
        <td className="border-b px-4 py-2">{item.id}</td>
        <td className="border-b px-4 py-2">{item.product_id}</td>
        <td className="border-b px-4 py-2">{item.product_name}</td>
        <td className="border-b px-4 py-2">{item.qty}</td>
        <td className="border-b px-4 py-2">{item.price}</td>
      </tr>
    ));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Items - Order {orderId}</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">ID</th>
            <th className="border-b px-4 py-2">Product ID</th>
            <th className="border-b px-4 py-2">Name</th>
            <th className="border-b px-4 py-2">Quantity</th>
            <th className="border-b px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>{displayOrderItems}</tbody>
      </table>
    </div>
  );
}

export default ViewOrders;
