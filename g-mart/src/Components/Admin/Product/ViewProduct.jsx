import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios";

const ViewProduct = () => {
  const [loading, setLoading] = useState(true);
  const [viewProduct, setProduct] = useState(true);

  useEffect(() => {
    let isMounted = true;
    document.title = "View Product";

    axiosClient.get(`/view-product`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.products);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  var display_Productdata = "";
  if (loading) {
    return (
      <h4 className="text-xl font-semibold text-blue-600/25 dark:text-blue-500/25 ">
        View Products Loading...
      </h4>
    );
  } else {
    display_Productdata = viewProduct.map((item) => {
      const quantityDisplay = item.qty < 0 ? "Out of stock" : item.qty;
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category ? item.category.name : ""}</td>
          <td>{item.name}</td>
          <td>{quantityDisplay}</td>

          <td>{item.price}</td>
          <td>
            <img
              src={`http://localhost:8000/${item.image}`}
              width="50px"
              alt={item.name}
            />
          </td>
          <td>
            <Link
              to={`/dashboard/category/view-product/edit-product/${item.id}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </Link>
          </td>
          <td>{item.status === 0 ? "Visible" : "Hidden"}</td>
        </tr>
      );
    });
  }
  return (
    <>
      <div className="max-w-6xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-6xl tracking-widest text-gray-500 md:text-lg dark:text-gray-400">
          View Product
        </h5>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {display_Productdata}
            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr> */}
          </tbody>
        </table>

        <Link
          to="/dashboard/product"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add product
        </Link>
      </div>
    </>
  );
};

export default ViewProduct;
