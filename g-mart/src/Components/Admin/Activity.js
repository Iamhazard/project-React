import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axiosClient from "../../axios";

const Activity = () => {
  const [loading, setLoading] = useState(true);
  const [userslist, setUserslist] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axiosClient.get(`/view-users`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setUserslist(res.data.users);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteUsers = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axiosClient.delete(`/delete-users/${id}`).then((res) => {
      if (res.data.status === 200) {
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        thisClicked.innerText = "Deleted";
      }
    });
  };

  const toggleAdminRole = (e, id, currentRole) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Processing";

    if (currentRole === 1) {
      removeAdmin(e, id, thisClicked);
    } else {
      appointAdmin(e, id, thisClicked);
    }
  };

  const appointAdmin = (e, id, buttonElement) => {
    axiosClient.put(`/appoint-admin/${id}`).then((res) => {
      if (res.data.status === 200) {
        buttonElement.innerText = "Remove Admin";
        buttonElement.classList.add("bg-red-500");
        buttonElement.classList.remove("bg-green-500");
        buttonElement.disabled = false;
        window.location.reload();
      } else if (res.data.status === 404) {
        // Error handling
      }
    });
  };

  const removeAdmin = (e, id, buttonElement) => {
    axiosClient.put(`/delete-admin/${id}`).then((res) => {
      if (res.data.status === 200) {
        buttonElement.innerText = "Assign Admin";
        buttonElement.classList.add("bg-green-500");
        buttonElement.classList.remove("bg-red-500");
        buttonElement.disabled = false;
        window.location.reload();
      } else if (res.data.status === 404) {
        // Error handling
      }
    });
  };

  let viewusers_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading Users...</h4>;
  } else {
    viewusers_HTMLTABLE = userslist.map((item) => {
      return (
        <tr key={item.id}>
          <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              type="button"
              onClick={(e) => toggleAdminRole(e, item.id, item.role_as)}
              className={`btn ${
                item.role_as === 1 ? "bg-red-500" : "bg-green-500"
              } hover:bg-opacity-75 text-white font-semibold px-4 py-2 rounded-md`}>
              {item.role_as === 1 ? "Remove Admin" : "Assign Admin"}
            </button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              type="button"
              onClick={(e) => deleteUsers(e, item.id)}
              className="btn bg-red-500 hover:bg-opacity-75 text-white font-semibold px-4 py-2 rounded-md">
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Activity
        </h1>
      </div>
      <div className="bg-white rounded-md shadow-md p-4">
        <div className="card mt-4">
          <div className="card-header flex items-center justify-between">
            <h4 className="text-xl font-bold leading-6 text-gray-900">
              Users List
            </h4>
            <Link
              to="/admin/add-users"
              className="btn bg-blue-500 hover:bg-opacity-75 text-white font-semibold px-4 py-2 rounded-md">
              Add Users
            </Link>
          </div>
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Appoint/Remove Admin
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>{viewusers_HTMLTABLE}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Activity;
