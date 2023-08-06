import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios";
// import swal from "sweetalert";

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([null]);

  useEffect(() => {
    let isMounted = true;

    axiosClient.get(`/view-category`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setCategorylist(res.data.categories);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteCategory = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axiosClient.delete(`/delete-category/${id}`).then((res) => {
      if (res.data.status === 200) {
        alert("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        alert("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  if (loading || categorylist === null) {
    return (
      <h4 className="text-xl font-semibold text-blue-600/25 dark:text-blue-500/25 ">
        View category Loading...
      </h4>
    );
  }

  return (
    <>
      <div className="max-w-6xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-6xl tracking-widest text-gray-500 md:text-lg dark:text-gray-400">
          View Category
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
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {categorylist &&
              categorylist.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link
                      to={`/dashboard/Category/edit-category/${item.id}`}
                      className="bg-green-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={(e) => deleteCategory(e, item.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Link
          to="/dashboard/category"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add category
        </Link>
      </div>
    </>
  );
}

export default ViewCategory;
