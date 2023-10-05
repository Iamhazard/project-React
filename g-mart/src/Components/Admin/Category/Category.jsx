import React, { useState } from "react";
import axiosClient from "../../../axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categoryInput, setCategory] = useState({
    name: "",
    about: "",
    status: 0,
    error_list: [],
  });
  const navigate = useNavigate();
  const [picture, setPicture] = useState([]);
  const [errorlist, setError] = useState([]);
  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");
  console.log(errorlist);
  const handleNavigation = () => {
    navigate("/dashboard/Category/view-category");
  };

  const validateName = (name) => {
    if (!name) {
      return "Name is required";
    }

    return "";
  };
  const validateImage = (file) => {
    if (!file) {
      return "Image is required";
    }

    if (!/^image\/(jpeg|png)$/.test(file.type)) {
      return "Please select a valid image (JPEG or PNG)";
    }

    const maxSizeInBytes = 2 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return "Image size exceeds the maximum allowed size (2MB)";
    }

    return "";
  };

  const handleInput = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCategory({ ...categoryInput, [name]: value });

    if (name === "name") {
      const error = validateName(value);
      setNameError(error);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPicture(e.target.files[0]);
    const error = validateImage(file);
    setImageError(error);
    // e.target.value = "";

    // console.log({ image: e.target.files[0] });
  };
  // const data = {
  //   name: categoryInput.name,
  //   about: categoryInput.about,
  //   status: categoryInput.status,
  //   image: picture.image,
  // };

  const submitCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryInput.name);
    formData.append("about", categoryInput.about);
    formData.append("status", categoryInput.status);
    formData.append("image", picture);

    // console.log(picture);

    axiosClient
      .post(`/store-category`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("Server Response:", res);
        if (res.data.status === 200) {
          e.target.reset();
          alert("Success", res.data.message, "success");
          setPicture(null);
          setCategory({
            ...categoryInput,
            name: "",
            about: "",
            status: "",
          });
          setError([]);
        } else if (res.data.status === 422) {
          alert("allfield are mandatory", "", "error");
          setError(res.data.errors);
        }
      });
  };
  var display_errors = [];
  if (categoryInput.error_list) {
    display_errors = [categoryInput.error_list.name];
  }

  return (
    <>
      <header className="bg-white shadow">
        {display_errors.map((item, index) => {
          return (
            <p className="mb-1" key={index}>
              {item}
            </p>
          );
        })}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Category
          </h1>
        </div>
      </header>
      <form onSubmit={submitCategory} encType="multipart/form-data">
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter name"
                    />
                    <small className="text-red-500">{nameError}</small>
                  </div>
                  {categoryInput.error_list && (
                    <span className="text-red-500">
                      {categoryInput.error_list.name}
                    </span>
                  )}
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
                    name="image"
                    onChange={handleImage}
                  />
                  <small className="text-red-500">{imageError}</small>
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
                    id="status"
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
        <div className="space-x-4 mt-8">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
            Add Category
          </button>

          <button
            onClick={handleNavigation}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
            View category
          </button>
        </div>
      </form>
    </>
  );
};

export default Category;
