import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ProductTab = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
    axiosClient
      .get(`/fetchproducts/${name}`)
      .then((res) => {
        if (res.data.status === 200) {
          setProducts(res.data.product_data.product);
          setFilteredProducts(res.data.product_data.product);
          const sortedProduct = bubbleSort(
            res.data.product_data.product,
            "name"
          );
          setProducts(sortedProduct);
        } else if (res.data.status === 404) {
          navigate("/ProductTab");
          alert("Warning", res.data.message, "error");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, [name, navigate]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.about.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <h4 className="text-xl font-semibold text-blue-600/25 dark:text-blue-500/25">
        Loading products...
      </h4>
    );
  }

  return (
    <div className="bg-grey-lighter font-sans text-gray-900 bg-gradient-to-br from-transparent to-green-100 flex min-h-full flex-3 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link
                    to={`/viewproductdetail/${name}/${product.id}`}
                    className="text-blue-500 hover:text-blue-600">
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.about}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTab;
