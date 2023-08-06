import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axiosClient from "../../axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export function LineChartData() {
  const [products, setProducts] = useState([]);

  const labels = useMemo(() => {
    return products.map((item) => item.name);
  }, [products]);

  const data = useMemo(() => {
    return products.map((item) => item.total_quantity);
  }, [products]);

  const Chartdata = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Dataset",
          data: data,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [data]);
  console.log(products);
  useEffect(() => {
    axiosClient
      .get("/available-quantity")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product quantities:", error);
      });
  }, []);

  console.log(Chartdata);
  return <Line options={options} data={Chartdata} />;
}
