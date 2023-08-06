// import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import leaf from "../Assets/leaf.png";
import veg from "../Assets/veg.png";
import dish from "../Assets/dish.png";

import aa1 from "../Assets/aa1.jpg";
import aa2 from "../Assets/aa2.jpg";
import aa3 from "../Assets/aa3.jpg";
import { AiFillStar } from "react-icons/ai";
import da from "../Assets/driver.png";
import { BsFillLightningFill } from "react-icons/bs";
import { useStateContext } from "../../Context/ContextProvider";

const Home = () => {
  const imageUrls = [aa1, aa2, aa3];
  const { currentUser } = useStateContext();

  //   const [cartIsShown, setCartIsShown] = useState(false);
  //  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const hideCartHandler = () => {
  //   setCartIsShown(false);
  // };

  return (
    <div className="flex flex-wrap-reverse gap-y-24 justify-between py-12 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="relative z-10 md:w-1/2 w-full">
        <img
          className="absolute top-0 right-0 md:-top-4 md:-right-8 w-24 h-auto"
          src={leaf}
          alt=""
        />
        <span className="flex items-center px-1 text-xl text-green">
          {" "}
          <span className="font-medium text-green-500">100% Orgainc </span>
        </span>
        <h1 className="pt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight whitespace-nowrap">
          {" "}
          Healthy Lifestyle <br />
          is your only
          <br />
          <span className="whitespace-nowrap text-green">
            {" "}
            Fair Advantages{" "}
          </span>
        </h1>
        <p className="pt-8 sm:text-lg max-w-md font-normal text-gray-600 leading-relaxed">
          G-mart offer a wide range of products including fresh Green vegtbles
          ,dairy,baked goods and Fruits{" "}
        </p>
        <div class="flex pt-8 space-x-4 sm:space-x-6">
          <Link
            to="/register"
            className="flex justify-center items-center w-full sm:w-auto h-13 px-8 bg-green font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300">
            Get started
          </Link>
          {currentUser && (
            <Link
              to="/category"
              class="flex justify-center items-center w-full sm:w-auto h-13 px-8 font-medium text-gray-900 border border-gray-900 rounded-xl whitespace-nowrap hover:shadow-xl transition-shadow duration-300">
              Explore menu
            </Link>
          )}
        </div>

        <div className="flex pt-20">
          <img className="w-24" src={veg} alt="" />
          <div className="pt-5 pl-3">
            <div className="text-xl font-bold leading-relaxed">
              <Link to="/products/Vegtables">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Buy now
                </button>
              </Link>
            </div>
            <div className="inline-flex text-gray-600 leading-relaxed">
              peope loved this🍳{" "}
            </div>
            <div className="font-bold text-green leading-relaxed">
              15+ green vegtbles & fruits
            </div>
          </div>
          {/* <div>
              <div class="flex md:hidden pt-8 justify-end space-x-1 font-bold">
                <span>Powered by</span>
                <Example />
              </div>
              <span>Hazard</span>
            </div> */}
        </div>
      </div>
      <div class="relative md:w-1/2 w-full flex flex-col justify-between">
        <img
          class="w-96 lg:w-full drop-shadow-2xl self-center lg:self-end"
          src={dish}
          alt=""
        />
        <div class="absolute right-0 lg:-right-6 top-0 lg:top-28 flex flex-col py-5 px-7 rounded-2xl shadow-xl bg-white/80 backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
          <div className="flex -space-x-3">
            {imageUrls.map((imageUrl, index) => (
              <div
                key={index}
                className="w-13 h-13 rounded-full border-4 border-white object-cover overflow-hidden">
                <img src={imageUrl} alt="" />
              </div>
            ))}
          </div>
          <div className="pt-3 font-bold">Happy customer</div>
          <div className="flex items-center text-gray-600 leading-relaxed">
            <AiFillStar className="w-5 h-5" />
            <span className="">+1k Ratings</span>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 md:bottom-32 lg:bottom-16 flex bg-white/80 rounded-2xl shadow-xl backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
          <img className="w-auto h-20 self-end" src={da} alt="" />
          <div className="pr-7 pl-2 py-5">
            <div class="font-bold">Fast delivery</div>
            <div className="text-gray-600 leading-relaxed">
              30 mins delivery 🚀
            </div>
          </div>
        </div>
        <div class="hidden md:flex justify-end space-x-1 font-bold">
          <span>Powered by</span>
          <BsFillLightningFill class="w-6 h-6 text-gray-900 fill-current" />
          <span>Hazard</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
