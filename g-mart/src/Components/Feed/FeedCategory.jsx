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
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="card">
        <div className="flex justify-center items-center">
          <div className="2xl:mx-auto 2xl:container py-8 px-4 sm:px-5 xl:px-20 2xl:px-0 w-full">
            <div className="flex flex-col justify-center items-center space-y-6">
              <h1 className="text-2xl xl:text-3xl font-semibold leading-5 xl:leading-9 text-gray-800 dark:text-white">
                Shop By Category
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 w-full">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="relative group flex justify-center items-center h-full w-full bg-gray-100 rounded-lg shadow-md p-6">
                    <img
                      className="object-center object-cover h-full w-full"
                      src={`http://localhost:8000/${category.image}`}
                      alt={category.name}
                    />

                    <button
                      className="dark:bg-blue-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-blue-500"
                      onClick={(event) =>
                        handleCategoryClick(category.name, event)
                      }>
                      {category.name}
                    </button>

                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <p className="text-white text-2xl">{category.about}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
