import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert2";

const ProductViews = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  // useEffect(() => {
  //   axiosClient
  //     .get("/available-quantity")
  //     .then((response) => {
  //       setAvailableQuantity(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product quantities:", error);
  //     });
  // }, []);
  // console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get(
          `/viewproductdetail/${product_id}`
        );
        const { data } = response;
        if (data.status === 200) {
          setProduct(data.product);
          setAvailableQuantity(+data.product.qty || 0);
        } else if (data.status === 404) {
          setError(data.message);
        }
      } catch (error) {
        console.error("API request failed:", error);
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < availableQuantity) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };
  // console.log(quantity, availableQuantity);

  const submitAddToCheckout = (e) => {
    e.preventDefault();
    if (product.qty <= 0) {
      swal.fire("Error", "Product is out of stock.", "error");
      return;
    }
    const data = {
      product_id: product.id,
      product_qty: quantity,
    };
    axiosClient.post(`/add-to-checkout`, data).then((res) => {
      if (res.data.status === 201) {
        //Created - Data Inserted
        alert("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        //Already added to cart
        alert("Success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        alert("Error", res.data.message, "error");
      } else if (res.data.status === 404) {
        //Not Found
        alert("Warning", res.data.message, "warning");
      }
    });
  };

  const submitAddToCart = (e) => {
    e.preventDefault();
    if (product.qty <= 0) {
      swal.fire("Error", "Product is out of stock.", "error");
      return;
    }
    const data = {
      product_id: product.id,
      product_qty: quantity,
    };
    axiosClient.post(`/add-to-cart`, data).then((res) => {
      if (res.data.status === 201) {
        //Created - Data Inserted
        alert("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        //Already added to cart
        alert("Success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        alert("Error", res.data.message, "error");
      } else if (res.data.status === 404) {
        //Not Found
        alert("Warning", res.data.message, "warning");
      }
    });
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <p>The requested product does not exist.</p>
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const availStock =
    +product.qty > 0 ? (
      <div>
        <label className="text-lg font-semibold">In Stock</label>
      </div>
    ) : (
      <div>
        <label>Out of stock</label>
      </div>
    );
  let packagingOption = null;

  if (product.category_id === 1 || product.category_id === 3) {
    packagingOption = (
      <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
        <p className="leading-relaxed mr-4">Packet</p>
        <div className="custom-number-input h-10 w-32">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              onClick={handleDecrement}
              data-action="decrement"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="number"
              className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none mx-1"
              name="custom-input-number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />

            <button
              onClick={handleIncrement}
              data-action="increment"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </div>
    );
  } else if (
    product.category_id === 2 ||
    product.category_id === 5 ||
    product.category_id === 6
  ) {
    packagingOption = (
      <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
        <p className="leading-relaxed mr-4"> kg</p>
        <div className="custom-number-input h-10 w-32">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              onClick={handleDecrement}
              data-action="decrement"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="number"
              className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none mx-1"
              name="custom-input-number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />

            <button
              onClick={handleIncrement}
              data-action="increment"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            src={`http://localhost:8000/${product.image}`}
            alt={product.name}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm text-gray-500 tracking-widest">
              Product Name
            </h2>
            <h1 className="text-gray-900 text-3xl font-medium mb-1">
              {product.name}
            </h1>
            <p className="leading-relaxed">{product.about}</p>
            <span className="leading-relaxed">Quantity={product.qty}</span>
            {availStock}
            {packagingOption}
            <div className="col-span-8 flex items-center">
              <h4 className="mb-1 text-lg font-bold text-gray-900">
                Nrs.{product.price}
                <s className="ml-2">Nrs:{product.original_price}</s>
              </h4>

              <button
                onClick={submitAddToCheckout}
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                Buy
              </button>
              <button
                onClick={submitAddToCart}
                className="flex ml-auto text-white bg-green-300 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductViews;
