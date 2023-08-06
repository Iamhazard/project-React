import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios";
// import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const [picture, setPicture] = useState([]);
  const [categoryInput, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useNavigate();
  const handleImage = (e) => {
    //setPicture(e.target.files[0]);
    setPicture(e.target.files[0]);
    // e.target.value = "";

    // console.log({ image: e.target.files[0] });
  };
  const [error, setError] = useState([]);
  const { id } = useParams();
  const handleInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axiosClient.get(`/edit-category/${id}`).then((res) => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      } else if (res.data.status === 404) {
        alert("Error", res.data.message, "error");
        history("/dashboard/Category/view-category");
      }
      setLoading(false);
    });
  }, [id, history]);

  const updateCategory = (e) => {
    e.preventDefault();

    const data = categoryInput;
    const formData = new FormData();
    formData.append("image", picture);

    axiosClient.put(`/update-category`, formData, data).then((res) => {
      if (res.data.status === 200) {
        alert("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.status === 422) {
        alert("All fields are mandetory", "", "error");
        alert(res.data.errors);
      } else if (res.data.status === 404) {
        alert("Error", res.data.message, "error");
        history("/dashboard/Category/view-category");
      }
    });
  };
  if (loading) {
    return <h4>Loading Edit Category...</h4>;
  }
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Category
          </h1>
        </div>
      </header>
      <form onSubmit={updateCategory} id="CATEGORY_FORM">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <p className="mt-1 ml-7 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Category Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      value={categoryInput.name}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter name"
                    />
                    <small className="text-danger">{error.name}</small>
                  </div>
                </div>
                <div className="mt-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input">
                    Upload file
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    name="image/*"
                    onChange={handleImage}
                  />
                  <small className="text-danger">{error.image}</small>
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help">
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                  </p>
                </div>

                <div className="form-group mb-3">
                  <label>Status</label>
                  <input
                    type="checkbox"
                    name="status"
                    onChange={handleInput}
                    value={categoryInput.status}
                  />{" "}
                  Status 0=shown/1=hidden
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    onChange={handleInput}
                    value={categoryInput.about}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
          Add Category
        </button>
      </form>
    </>
  );
};

export default EditCategory;
