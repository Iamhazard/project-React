import React from "react";
import { Link } from "react-router-dom";

const Delivery = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl flex items-center justify-center text-cyan-100 space-x-2 lg:space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 lg:h-8 xl:h-10 w-6 lg:w-8 xl:w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {/* ... SVG path code ... */}
            </svg>
            <span className="text-xl lg:text-2xl xl:text-3xl font-bold">
              Page is under Construction
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center">
            Coming Soon
          </h1>
          <div className="flex flex-col items-center space-y-4 mt-24">
            <p className="text-gray-300 uppercase text-sm">
              Notify me when it's ready
            </p>
            <form className="w-full flex items-center">
              <input
                type="email"
                name="email"
                id="email"
                className="w-72 p-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-tl rounded-bl text-sm"
                placeholder="Email"
                autoComplete="off"
              />
              <button className="bg-blue-600 hover:bg-blue-700 py-2 px-6 text-gray-100 border border-blue-600 rounded-tr rounded-br text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="#" title="Facebook">
                <svg
                  className="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 transition duration-300"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 506.86 506.86">
                  {/* ... SVG path code ... */}
                </svg>
              </Link>
            </li>
            <li>
              <Link href="#" title="Twitter">
                <svg
                  className="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 transition duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 333333 333333"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fillRule="evenodd"
                  clipRule="evenodd">
                  {/* ... SVG path code ... */}
                </svg>
              </Link>
            </li>
            <li>
              <Link href="#" title="LinkedIn">
                <svg
                  className="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 transition duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 333333 333333"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fillRule="evenodd"
                  clipRule="evenodd">
                  {/* ... SVG path code ... */}
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
