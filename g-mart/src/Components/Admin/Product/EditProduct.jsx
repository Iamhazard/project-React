import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/solid";
//import { ImagetoBase64 } from "../../Utility/ImagetoBase64.js";
import axiosClient from "../../../axios.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = (props) => {
  const [categorylist, setCategorylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [picture, setPicture] = useState([]);
  const [productInput, setProductInput] = useState();
  // const [imageUrl, setImageUrl] = useState("");

  const handleImage = async (e) => {
    // setImageUrl(await ImagetoBase64(e.target.files[0]));
    setPicture(e.target.files[0]);
  };

  const [allcheckbox, setCheckboxes] = useState([]);

  const handleCheckbox = (e) => {
    e.persist();
    setCheckboxes({ ...allcheckbox, status: e.target.checked });
  };

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    axiosClient.get(`/all-category`).then((res) => {
      console.log(res.data);
      if (isMounted) {
        if (res.data.status === 200) {
          setCategorylist(res.data.categories);
        }
      }
    });
    axiosClient.get(`/edit-product/${id}`).then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.product);
        setProductInput(res.data.product);
        setCheckboxes(res.data.product);
      } else if (res.data.status === 404) {
        alert("Error", res.data.message, "error");
        navigate("/dashboard/product/view-product");
      }
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const updateProduct = async (data) => {
    const formData = new FormData();
    formData.append("category_id", data.category_id);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("original_price", data.original_price);
    formData.append("qty", data.qty);
    formData.append("about", data.about);
    formData.append("image", picture);
    formData.append("status", allcheckbox.status ? 1 : 0);
    axiosClient
      .post(`/update-product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("update sucessfull", res.data.message);
        } else if (res.data.status === 422) {
        } else if (res.data.status === 404) {
          alert("Error", res.data.message, "error");
          navigate("/dashboard/product/view-product");
        }
      });
  };
  if (loading) {
    return <h4>Edit Product Data Loading...</h4>;
  }
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Edit Product
          </h1>
        </div>
      </header>
      <div className="p-8 rounded border border-gray-200">
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <form onSubmit={handleSubmit(updateProduct)}>
          <div className="mt-8 grid lg:grid-cols-2 gap-4">
            <div>
              <label
                for="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Category
              </label>
              <select
                id="category_id"
                name=""
                {...register("category_id", {
                  required: "Category is required",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Choose a category</option>
                {/* <option value={categorylist}>Veg</option> */}
                {categorylist &&
                  categorylist.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label
                for=""
                className="text-sm text-gray-700 block mb-1 font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                {...register("name", {
                  required: true,
                  minLength: 2,
                })}
                defaultValue={productInput?.name || ""}
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="apples"
              />
              {errors.name && errors.name.type === "required" && (
                <p className="errorMsg">name is required.</p>
              )}
              {errors.name && errors.name.type === "minLength" && (
                <p className="errorMsg">
                  name should be at-least 2 characters.
                </p>
              )}
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
                  rows={3}
                  {...register("about", {
                    required: true,
                    minLength: 2,
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ddefaultValue={productInput?.about || ""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
            <div>
              <label
                for="price"
                className="text-sm text-gray-700 block mb-1 font-medium">
                Price
              </label>
              <input
                type="number"
                name="price"
                {...register("price", {
                  required: "price is required",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/, // Regular expression for price format (e.g., 12.34)
                    message: "Invalid price format",
                  },
                })}
                defaultValue={productInput?.price || ""}
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder=""
              />
              {errors.price && <p>{errors.price.message}</p>}
            </div>
            <div>
              <label
                for="price"
                className="text-sm text-gray-700 block mb-1 font-medium">
                Orginal Price
              </label>
              <input
                type="number"
                name="original_price"
                {...register("original_price", {
                  required: "original_price is required",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/, // Regular expression for price format (e.g., 12.34)
                    message: "Invalid price format",
                  },
                })}
                defaultValue={productInput?.original_price || ""}
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder=""
              />
              {errors.original_price && <p>{errors.original_price.message}</p>}
            </div>

            <div>
              <label
                for="quantity"
                className="text-sm text-gray-700 block mb-1 font-medium">
                Quantity
              </label>
              <input
                type="number"
                name="qty"
                {...register("qty", { required: true, min: 1 })}
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder=""
                defaultValue={productInput?.qty || ""}
              />
              {errors.qty && <span>Please enter a valid quantity.</span>}
            </div>
            <div className="form-group mb-3">
              <label>Status</label>
              <input
                type="checkbox"
                name="status"
                onChange={handleCheckbox}
                defaultChecked={allcheckbox.status === 1 ? true : false}
              />{" "}
              Status 0=shown/1=hidden
            </div>
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900">
                Upload photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>

                      <input
                        id="image"
                        name="image"
                        // {...register("image", {
                        //   required: "photo is required",
                        // })}
                        type={"file"}
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImage}
                        defaultValue={productInput?.picture || ""}
                      />
                      {/* <img
                        src={`http://localhost:8000/${imageUrl}`}
                        width="50px"
                        alt=""
                      /> */}
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-x-4 mt-8">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
              Add product
            </button>

            <Link
              to="/dashboard"
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
              Cancel Product
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
