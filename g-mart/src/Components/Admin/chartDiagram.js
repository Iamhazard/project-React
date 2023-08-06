import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import axiosClient from "../../axios";

const LineChart = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the backend API
    axiosClient
      .get("/getUsersTotalPrice")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  // Process data to extract Product and Qty information
  const data = orders.map((order) => ({
    product: order.products_info.split(",")[0].split(":")[1].trim(),
    quantity: parseInt(order.products_info.split(",")[1].split(":")[1].trim()),
  }));

  // Extract unique products and corresponding quantities
  const products = data.map((item) => item.product);
  const quantities = data.map((item) => item.quantity);

  const chartData = {
    labels: products,
    datasets: [
      {
        label: "Quantity",
        data: quantities,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
