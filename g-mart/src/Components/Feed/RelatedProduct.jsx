import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios";
import Swal from "sweetalert2";

const RelatedProduct = () => {
  const { product_id } = useParams();
  const [product, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 8) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };
  const submitAddToCart = (e, item) => {
    e.preventDefault();
    if (item.qty <= 0) {
      Swal.fire("Error", "Product is out of stock.", "error");
      return;
    }

    const data = {
      product_id: item.id,
      product_qty: quantity,
    };
    console.log(data);
    axiosClient.post(`/add-to-cart`, data).then((res) => {
      if (res.data.status === 201) {
        //Created - Data Inserted
        Swal.fire("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        //Already added to cart
        Swal.fire("Success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        Swal.fire("Error", res.data.message, "error");
      } else if (res.data.status === 404) {
        //Not Found
        Swal.fire("Warning", res.data.message, "warning");
      }
    });
  };
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
      .get(`/randomproducts/${product_id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setProducts(res.data.product_data.product);
          const sortedRandom = bubbleSort(
            res.data.product_data.product,
            "name"
          );
          setProducts(sortedRandom);
        } else if (res.data.status === 404) {
          // navigate("/ProductTab");
          alert("Warning: " + res.data.message, "Error");
        }
      })
      .catch((error) => {
        setError("API request failed:", error);
      });
  }, [product_id, navigate]);
  // console.log(product);
  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <p>The requested product does not exist.</p>
      </div>
    );
  }
  if (product === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="mt-6 text-center text-xl font-bold leading-6 tracking-tight text-gray-900">
        Other Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {product.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-md shadow-md p-4 flex flex-col items-center">
            {/* <Link to={`/viewproductdetail/${name}/${product.id}`}> */}
            <img
              src={`http://localhost:8000/${item.image}`}
              alt={item.name}
              className="w-32 h-32 object-contain"
            />
            {/* </Link> */}
            <h3 className="text-sm text-gray-700">
              <Link
                // to={`/viewproductdetail/${name}/${product.id}`}
                className="text-blue-500 hover:text-blue-600">
                {item.name}
              </Link>
            </h3>
            <div className="flex flex-row h-10 w-24 rounded-lg relative bg-transparent mt-1">
              <button
                onClick={handleDecrement}
                data-action="decrement"
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-6 rounded-l cursor-pointer outline-none flex items-center justify-center">
                <span className="text-xs font-semibold">−</span>
              </button>
              <input
                type="number"
                className="focus:outline-none text-center w-10 bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none mx-1"
                name="custom-input-number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button
                onClick={handleIncrement}
                data-action="increment"
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-6 rounded-r cursor-pointer flex items-center justify-center">
                <span className="text-xs font-semibold">+</span>
              </button>
            </div>

            <p className="text-gray-600">Nrs.{item.price}</p>

            <button
              onClick={(e) => submitAddToCart(e, item)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Buy now!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
