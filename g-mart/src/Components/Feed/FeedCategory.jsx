import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Bubble Sort function
  const bubbleSort = (arr, property) => {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j][property] > arr[j + 1][property]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };
  useEffect(() => {
    // // Fetch category data from the backend
    // console.log("before API");
    axiosClient
      .get("/getCategory")
      .then((res) => {
        // console.log("API response:", res.data);
        if (res.data.status === 200) {
          setCategories(res.data.category);
          const sortedCategories = bubbleSort(res.data.category, "name");
          setCategories(sortedCategories);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, []);

  if (loading) {
    return (
      <h4 className="text-xl font-semibold text-blue-600/25 dark:text-blue-500/25 ">
        Loading categories...
      </h4>
    );
  }
  const handleCategoryClick = (categoryName, event) => {
    // Prevent the default button behavior
    event.preventDefault();
    // Navigate to the respective product page
    navigate(`/products/${categoryName}`);
  };

  return (
    <div className="bg-white rounded-lg  min-h-screen py-16 shadow-xl p-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center space-y-6">
          <h1 className="text-2xl xl:text-3xl font-semibold leading-5 xl:leading-9 text-gray-800 dark:text-white">
            Shop By Category
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition">
                <img
                  className="object-center object-cover h-40 w-full"
                  src={`http://localhost:8000/${category.image}`}
                  alt={category.name}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-600">{category.about}</p>
                  <button
                    className="mt-4 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={(event) =>
                      handleCategoryClick(category.name, event)
                    }>
                    {category.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
